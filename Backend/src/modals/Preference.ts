import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/db';

interface SteelCoilAttributes {
  id?: number;
  material: string;
  form: string;
  grade: string;
  choice?: string; 
  widthMin?: number;
  widthMax?: number;
  thicknessMin?: number;
  thicknessMax?: number;
  uploadDate?: Date;
}

interface SteelCoilCreationAttributes extends Optional<SteelCoilAttributes, 'id'> {}

class Preference extends Model<SteelCoilAttributes, SteelCoilCreationAttributes> implements SteelCoilAttributes {
  public id!: number;
  public material!: string;
  public form!: string;
  public grade!: string;
  public choice?: string;
  public widthMin?: number;
  public widthMax?: number;
  public thicknessMin?: number;
  public thicknessMax?: number;
  uploadDate?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Preference.init(
  {
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    form: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    choice: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    widthMin: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
    },
    widthMax: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
    },
    thicknessMin: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
    },
    thicknessMax: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
    },  
    uploadDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Preference',
    tableName: 'Preferences',
  }
);

export default Preference;
