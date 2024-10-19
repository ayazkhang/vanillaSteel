import { InventoryCreateAttributes } from "./interfaces";

export const validateInventoryFields = (fields: InventoryCreateAttributes): string | null => {
  
  const {
    productNumber,
    material,
    form,
    choice,
    grade,
    surface,
    finish,
    quantity,
    weight
  } = fields;

  if (typeof productNumber !== 'number' || productNumber <= 0) {
    return "Invalid productNumber. Please provide a positive number.";
  }

  if (!material || typeof material !== 'string' || material.trim() === '') {
    return "Invalid material. Please provide a non-empty string.";
  }

  if (!form || typeof form !== 'string' || form.trim() === '') {
    return "Invalid form. Please provide a non-empty string.";
  }

  if (!choice || typeof choice !== 'string' || choice.trim() === '') {
    return "Invalid choice. Please provide a non-empty string.";
  }

  if (!grade || typeof grade !== 'string' || grade.trim() === '') {
    return "Invalid grade. Please provide a non-empty string.";
  }

  if (surface || typeof surface !== 'string') {
    return "Invalid surface. Please provide a non-empty string.";
  }

  if (!finish || typeof finish !== 'string') {
    return "Invalid finish. Please provide a non-empty string.";
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return "Invalid quantity. Please provide a positive number.";
  }

  if (weight && typeof weight !== 'number' || weight <= 0) {
    return "Invalid weight. Please provide a positive number.";
  }


  return null;
};
