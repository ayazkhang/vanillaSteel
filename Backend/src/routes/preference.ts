import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import { Op } from 'sequelize';
import { PreferenceCSVData } from '../types/preferenceCSVData';
import { failed, success } from '../utility/responseArr';
import { filterInventory } from '../controllers/preferenceController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {

  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  try{

    const limit = req.body.limit ? parseInt(req.body.limit as string) : 10;
    const offset = req.body.offset ? parseInt(req.body.offset as string) : 0;
    const inventoryItems = await filterInventory(req.file, limit, offset);
    res.send(inventoryItems);
  
  } catch(error){
    
    const errorMessage = "An error occurred while creating a Inventory";
    res.status(500).send(failed(errorMessage));
  
  }

});

export default router;
