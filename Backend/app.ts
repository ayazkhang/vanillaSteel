import express from "express";
const cors = require('cors');
import inventoryRoutes from "./src/routes/inventory";
import preferenceRoutes from "./src/routes/preference";
import sequelize from "./config/db";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());



app.use('/api/inventory', inventoryRoutes);
app.use('/api/preferences', preferenceRoutes);

sequelize.sync();

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

