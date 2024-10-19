import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./store/store";
import InventoryDashboard from "./components/inventory/InventoryDashboard";
import InventoryList from "./components/inventory/InventoryList"; // Adjust the path if needed
import { CssBaseline, Container, AppBar, Toolbar, Button, Card } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/inventory-list">Inventory List</Button>
          </Toolbar>
        </AppBar>
        <Card sx={{ width: '100%', mt: 2 }}> 
          <Routes>
            <Route path="/" element={<InventoryDashboard />} />
            <Route path="/inventory-list" element={<InventoryList />} />
          </Routes>
        </Card>
      </Router>
    </Provider>
  );
};

export default App;
