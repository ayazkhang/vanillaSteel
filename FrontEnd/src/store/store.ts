import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../reducers/inventorySlice';
import csvReducer from '../reducers/csvSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    csv: csvReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
