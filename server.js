const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;
//const dashboard = require("./dashboard");
//const profile = require("./profile");
//const db = require('./db');
const bodyParser = require("body-parser");
const {signup,login} = require("./auth");
const {getProfile, getAllProfile, newProfile, updateProfile, deleteProfile}  = require("./profile");
const {searchKain, addKain, addKetebalan, addPola ,getKetebalan , getPola}  = require("./kain");

//const {authenticateUser, protected} = require("./api");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();


// auth & protected api login
router.post("/auth/signup", signup);
router.post("/auth/login", login);
//router.post("/api/authenticateuser" , authenticateUser)
//router.get("/api/protected" , protected)

// profile 
router.get("/profile" , getAllProfile),
router.get("/profile/:id" , getProfile),
router.post("/profile" , newProfile),
router.put("/profile/:id" , updateProfile),
router.delete("/profile/:id" , deleteProfile)

// kain 
router.post("/searchkain" , searchKain),
router.post("/kain" , addKain),
router.post("/ketebalan" , addKetebalan),
router.get("/ketebalan" , getKetebalan),
router.post("/pola" , addPola),
router.get("/pola" , getPola)


app.use(router);

//router.get("/api", api);


// profile 
//app.use("/profile", profile);

// dashboard
//app.use("/", dashboard);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
