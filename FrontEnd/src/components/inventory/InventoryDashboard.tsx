import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { CircularProgress, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { uploadCsv } from '../../reducers/csvSlice';
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
    valueGetter: (row) => {
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
  const { filteredItems, loading: csvLoading, error: csvError, totalCount } = useSelector((state: RootState) => state.csv);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);

  useEffect(() => {
    if (csvFile) {
      const offset = paginationModel.page * paginationModel.pageSize;
      dispatch(uploadCsv({ file: csvFile, limit: paginationModel.pageSize, offset })); // Pass pagination params to uploadCsv
    }
  }, [dispatch, paginationModel, csvFile]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCsvFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (csvFile) {
      const offset = paginationModel.page * paginationModel.pageSize;
      dispatch(uploadCsv({ file: csvFile, limit: paginationModel.pageSize, offset }));
    }
  };

  if (csvLoading) {
    return <CircularProgress />;
  }

  if (csvError) {
    return <Typography color="error">{csvError}</Typography>;
  }

  return (
    <Paper sx={{ height: 'auto', width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>Upload CSV to Filter Inventory</Typography>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>Upload</Button>

      <Typography variant="h6" sx={{ marginTop: 2 }}>Matching Results:</Typography>
      {filteredItems.length > 0 ? (
        <DataGrid
          rows={filteredItems}
          columns={columns}
          rowCount={totalCount}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0, marginTop: 1 }}
        />
      ) : (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No matching results found.
        </Typography>
      )}
    </Paper>
  );
}
