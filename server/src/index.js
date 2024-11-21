// import express from "express";
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { registerUser } from './controllers/users.controllers.js';
// import { logginUsers } from './controllers/auth.controllers.js';
// import validateUserInformation from "./middleware/validateUserInformation.js";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: true,
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     credentials: true
// }));

// app.use(cookieParser());

// app.post("/users", validateUserInformation, registerUser);
// app.post("/auth/login", logginUsers);

// app.listen(4000, () => console.log(`Server running on port 4000...`));
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerUser } from './controllers/users.controllers.js';
import { logginUsers } from './controllers/auth.controllers.js';
import validateUserInformation from "./middleware/validateUserInformation.js";

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling CORS
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}));

// Middleware for parsing cookies
app.use(cookieParser());

// Route for user registration
app.post("/users", validateUserInformation, registerUser);

// Route for user login
app.post("/auth/login", logginUsers);

// Start the server
app.listen(4000, () => console.log(`Server running on port 4000...`));
