import Inventory from "../modals/Inventory";
import { success, failed } from "../utility/responseArr";
import { FailedResponse, GetSuccessResponse, PostSuccessResponse, InventoryCreateAttributes } from "../utility/interfaces";
import { validateInventoryFields } from "../utility/utility";

export const get = async (limit:number, offset:number): Promise<GetSuccessResponse | FailedResponse> => {
  try {

    const [inventoryItems, totalCount] = await Promise.all([
      Inventory.findAll({
        offset: offset,
        limit: limit,
        order: [['weight', 'DESC']],
      }),
      Inventory.count()
    ]);

    const message = "All Inventory have been fetched successfully";
    return success(message, { items: inventoryItems, totalCount });

  } catch (error) {
    console.error(error);
    const errorMessage = "An error occurred while creating a Inventory";
    return failed(errorMessage);
  }
};

export const post = async (inventory:InventoryCreateAttributes): Promise<PostSuccessResponse | FailedResponse> => {
  try {
    
    const validationError = validateInventoryFields(inventory);
    if (validationError)
      return failed(validationError);

    const inventoryItem = await Inventory.create(inventory);
    const message = "Inventory has been created successfully";
    return success(message, inventoryItem);

  }catch (error) {
    
    const errorMessage = "An error occurred while creating a Inventory";

    return failed(errorMessage);
  }
};