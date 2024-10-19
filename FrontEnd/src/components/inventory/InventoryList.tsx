import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { fetchInventory } from '../../reducers/inventorySlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../hooks';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'productNumber', headerName: 'Product Number', width: 130 },
  { field: 'form', headerName: 'Form & Choice', width: 130,
    valueGetter: (value, row) => `${row.form || ''} ${row.choice || ''}`,
  },
  { field: 'grade', headerName: 'Grade & Surface', width: 150,
    valueGetter: (value, row) => `${row.grade || ''} ${row.surface || ''}`
  },
  { field: 'finish', headerName: 'Finish', width: 100 },
  {
    field: 'dimensions',
    headerName: 'Dimensions',
    width: 230,
    valueGetter: (value, row) => {
      const { length, width, height, thickness, outerDiameter, wallThickness } = row || {};
      let dimensions = '';
      if (length) dimensions += `L=${length}, `;
      if (width) dimensions += `W=${width}, `;
      if (height) dimensions += `H=${height}, `;
      if (thickness) dimensions += `T=${thickness}, `;
      if (outerDiameter) dimensions += `OD=${outerDiameter}, `;
      if (wallThickness) dimensions += `Wt=${wallThickness}, `;
      return dimensions.slice(0, -2);
    },
  },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'weight', headerName: 'Total Weight (tons)', width: 150 },
  { field: 'location', headerName: 'Location', width: 130 },
];

export default function InventoryDashboard() {
  const dispatch = useAppDispatch();
  const { items, loading, error, totalCount } = useSelector((state: RootState) => state.inventory);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const offset = paginationModel.page * paginationModel.pageSize;
    dispatch(fetchInventory({ limit: paginationModel.pageSize, offset }));
  }, [dispatch, paginationModel]); // Depend on paginationModel

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model); // This will trigger the useEffect above
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={items}
        columns={columns}
        rowCount={totalCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
