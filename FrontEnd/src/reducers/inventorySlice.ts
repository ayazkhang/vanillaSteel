import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../config/config";

interface InventoryItem {
  id: number;
  productNumber: number;
  material: string;
  form: string;
  choice: string;
  grade: string;
  surface: string;
  finish: string;
  quantity: number;
  weight: number;
  length: number | null;
  width: number | null;
  height: number | null;
  thickness: number | null;
  outerDiameter: number | null;
  wallThickness: number | null;
  location: string;
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
  totalCount: 0,
};

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async ({ limit, offset }: { limit: number; offset: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/inventory?limit=${limit}&offset=${offset}`);
      console.log(response.data.data);
      return {
        items: response.data.data.items,      
        totalCount: response.data.data.totalCount 
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch inventory');
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch inventory';
      });
  },
});

export default inventorySlice.reducer;
