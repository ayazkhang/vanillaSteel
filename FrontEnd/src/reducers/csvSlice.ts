import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../config/config";

interface CsvState {
  filteredItems: any[];
  totalCount: number; 
  loading: boolean;
  error: string | null;
}

const initialState: CsvState = {
  filteredItems: [],
  loading: false,
  totalCount: 0,
  error: null,
};

export const uploadCsv = createAsyncThunk(
  'csv/uploadCsv',
  async ({ file, limit, offset }: { file: File, limit: number, offset: number }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('limit', String(limit));
    formData.append('offset', String(offset));

    try {
      const response = await axios.post(`${config.API_BASE_URL}/preferences/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.data);

      if (response.data.status === "success") {
        return {
          items: response.data.data.items,
          totalCount: response.data.data.totalCount,
        };
      } else {
        return rejectWithValue('Failed to filter inventory with CSV');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to upload CSV');
    }
  }
);

const csvSlice = createSlice({
  name: 'csv',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadCsv.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.filteredItems = [];
        state.totalCount = 0;
      })
      .addCase(uploadCsv.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredItems = action.payload.items;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upload CSV';
      });
  },
});

export default csvSlice.reducer;
