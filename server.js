const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { signup, login } = require("./auth");
const { getProfile, getAllProfile, newProfile, updateProfile, deleteProfile } = require("./profile");
const { searchKain, addKain, addKetebalan, addPola, getKetebalan, getPola } = require("./kain");
const { authenticateUser, protected } = require("./api");

require('dotenv').config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// auth & protected api login
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// profile 
router.get("/profile", authenticateUser, getAllProfile);
router.get("/profile/:id", authenticateUser, getProfile);
router.post("/profile", authenticateUser, newProfile);
router.put("/profile/:id", authenticateUser, updateProfile);
router.delete("/profile/:id", authenticateUser, deleteProfile);

// kain 
router.post("/searchkain", authenticateUser, searchKain);
router.post("/kain", authenticateUser, addKain);
router.post("/ketebalan", authenticateUser, addKetebalan);
router.get("/ketebalan", authenticateUser, getKetebalan);
router.post("/pola", authenticateUser, addPola);
router.get("/pola", authenticateUser, getPola);

// protected route example
//router.get("/api/protected", authenticateUser, protected);

app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
