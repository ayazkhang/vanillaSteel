import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/db';
interface InventoryAttributes {
  id?: number;
  productNumber: number;
  material: string;
  form: string;
  choice: string;
  grade: string;
  surface: string;
  finish: string;
  quantity: number;
  weight: number;
  length?: number; 
  width?: number; 
  height?: number; 
  thickness?: number; 
  outerDiameter?: number; 
  wallThickness?: number; 
  webThickness?: number; 
  flangeThickness?: number; 
  certificates?: string; 
  location: string;
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id'> {}

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: number;
  public productNumber!: number;
  public material!: string;
  public form!: string;
  public choice!: string;
  public grade!: string;
  public surface!: string;
  public finish!: string;
  public quantity!: number;
  public weight!: number;
  public length?: number; 
  public width?: number; 
  public height?: number; 
  public thickness?: number; 
  public outerDiameter?: number; 
  public wallThickness?: number; 
  public webThickness?: number; 
  public flangeThickness?: number; 
  public certificates?: string; 
  public location!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init(
  {
    productNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    form: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    choice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surface: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finish: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thickness: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    outerDiameter: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    wallThickness: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    webThickness: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    flangeThickness: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    certificates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Inventory',
  }
);

export default Inventory;
