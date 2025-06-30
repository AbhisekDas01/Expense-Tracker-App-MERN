import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { CLIENT_URL, PORT } from "./config/env.js";

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Database
import connectDB from './config/db.js'

//routes
import authRouter from "./routes/auth.route.js";
import incomeRouter from "./routes/income.route.js";
import expenseRouter from "./routes/expense.route.js";
import dashboardRouter from "./routes/dashboard.route.js";


const app = express();

//middleware to handle cors 
app.use(
    cors({
        origin: CLIENT_URL || '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)   
app.use(express.json());

app.use("/api/v1/auth" , authRouter);
app.use('/api/v1/income' , incomeRouter);
app.use('/api/v1/expense' , expenseRouter);
app.use('/api/v1/dashboard' , dashboardRouter);

app.get('/' , (req ,res) => {
    return res.send("<h1>Server is started</h1>")
})

//serve uploads folder (when user request to get the images in the folder )
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.listen(PORT || 5000 , () => {
    console.log(`Server is running on http://localhost:${PORT || 5000}` );

    connectDB();
});