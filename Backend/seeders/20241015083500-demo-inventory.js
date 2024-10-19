'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  async up(queryInterface, Sequelize) {
    const results = [];
    
    const filePath = path.join(__dirname, '../docs/inventory.csv');

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({
          separator: ',',
          mapHeaders: ({ header }) => header.trim(),
        }))
        .on('data', (data) => {
          console.log('Raw data:', data);
          
          const length = parseFloat(data['Length (mm)']);
          const width = parseFloat(data['Width (mm)']); 
          const height = parseFloat(data['Height (mm)']); 
          const quantity = parseInt(data['Quantity'], 10);
          const weight = parseFloat(data['Weight (t)'])
          const thickness = parseFloat(data['Thickness (mm)']);
          const outerDiameter = parseFloat(data['Outer Diameter (mm)']);
          const wallThickness = parseFloat(data['Wall Thickness (mm)']); 
          const webThickness = parseFloat(data['Web Thickness (mm)']); 
          const flangeThickness = parseFloat(data['Flange Thickness (mm)']); 
          const certificates = parseFloat(data['Certificates']); 

          results.push({
            productNumber: data['Product Number'], 
            material: data['Material'], 
            form: data['Form'], 
            choice: data['Choice'], 
            grade: data['Grade'], 
            surface: data['Surface'] || '',
            finish: data['Finish'] || '',
            quantity: quantity || 0,
            weight: weight || 0,
            length: length || 0,
            width: width || 0,
            height: height || 0,
            thickness: thickness || 0,
            outerDiameter: outerDiameter || 0,
            wallThickness: wallThickness || 0,
            webThickness: webThickness || 0,
            flangeThickness: flangeThickness || 0,
            certificates: certificates || 0,
            location: data['Location'] || 'Default Location',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on('end', async () => {
          console.log('Results:', results);
          if (results.length > 0) {
            await queryInterface.bulkInsert('Inventories', results, {});
          } else {
            console.warn('No valid data to insert.');
          }
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inventories', null, {});
  },
};
