interface Inventory {
  id: number;
  productNumber: number;
  material: string;
  form: string;
  choice: string;
  grade: string;
  surface: string;
  finish: string;
  quantity: number;
  totalWeight: number;
  length: number; 
  width: number; 
  height: number;
  thickness: number;
  outerDiameter: number;
  wallThickness: number;
  webThickness: number;
  flangeThickness: number;
  certificates: string;
  location: string;
}

export interface InventoryCreateAttributes {
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


export interface GetSuccessResponse {
  status: 'success';
  code: number
  message: string;
  data: Inventory[];
}


export interface PostSuccessResponse {
  status: 'success';
  code: number
  message: string;
  data: Inventory;
}

export interface FailedResponse {
  status: string;
  code: number,
  message: string,
  data: any,
}


