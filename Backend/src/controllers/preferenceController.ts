import { success, failed } from "../utility/responseArr";
import { FailedResponse, PostSuccessResponse } from "../utility/interfaces";
import { Op } from 'sequelize';
import Inventory from "../modals/Inventory";
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import { PreferenceCSVData } from '../types/preferenceCSVData';
import Preference from "../modals/Preference";
const upload = multer({ dest: 'uploads/' });

export const filterInventory = async (preferenceFile: any, limit: number, offset: number): Promise<PostSuccessResponse | FailedResponse> => {
  try {
    const results: PreferenceCSVData[] = [];
    const filePath = preferenceFile.path;

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(
          csv({
            separator: ',',
            mapHeaders: ({ header }) => header.trim(),
          })
        )
        .on('data', (data) => {
          results.push({
            material: data['Material'],
            form: data['Form'],
            choice: data['Choice'] || undefined,
            grade: data['Grade'],
            widthMin: data['Width (Min)'] ? parseFloat(data['Width (Min)']) : undefined,
            widthMax: data['Width (Max)'] ? parseFloat(data['Width (Max)']) : undefined,
            thicknessMin: data['Thickness (Min)'] ? parseFloat(data['Thickness (Min)']) : undefined,
            thicknessMax: data['Thickness (Max)'] ? parseFloat(data['Thickness (Max)']) : undefined,
          });
        })
        .on('end', async () => {
          try {

            await Promise.all(
              results.map(async (pref) => {
                await Preference.create({
                  material: pref.material,
                  form: pref.form,
                  choice: pref.choice,
                  grade: pref.grade,
                  widthMin: pref.widthMin,
                  widthMax: pref.widthMax,
                  thicknessMin: pref.thicknessMin,
                  thicknessMax: pref.thicknessMax,
                  uploadDate: new Date(),
                });
              })
            );

            const whereConditions = results.map((pref) => {
              const whereClause: any = {
                material: pref.material,
                form: pref.form,
                grade: pref.grade,
                thickness: {
                  [Op.between]: [pref.thicknessMin ?? 0, pref.thicknessMax ?? Number.MAX_VALUE],
                },
              };
              if (pref.widthMin !== undefined && pref.widthMax !== undefined) {
                whereClause.width = {
                  [Op.between]: [pref.widthMin, pref.widthMax],
                };
              }
              return whereClause;
            });

            const { rows: inventoryMatches, count: totalCount } = await Inventory.findAndCountAll({
              where: {
                [Op.or]: whereConditions,
              },
              limit: limit,
              offset: offset,
              order: [['weight', 'DESC']],
            });

            if (inventoryMatches.length > 0) {
              const message = "Matching inventory data found";
              resolve(success(message, { items: inventoryMatches, totalCount }));
              return success(message, { items: inventoryMatches, totalCount });
            } else {
              const errorMessage = "No matching inventory data found";
              resolve(failed(errorMessage));
              return failed(errorMessage);
            }
          } catch (error) {
            console.error("Error fetching inventory:", error);
            const errorMessage = "An error occurred while fetching inventory data";
            resolve(failed(errorMessage));
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error processing CSV:", error);
    const errorMessage = "An error occurred while processing the CSV file";
    return failed(errorMessage);
  }
};
