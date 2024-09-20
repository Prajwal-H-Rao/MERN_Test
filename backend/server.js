const e = require("express");
const config = require("dotenv").config;
const cors = require("cors");

const connectToDb = require("./db/db.js");
const userModel = require("./models/user.js");
const path = require("path");
const multer = require("multer");

const employeeModel = require("./models/employee.js");

config();
const port = process.env.PORT || 5000;

const app = e();

app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use(e.static("./public/uploads"));

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const username = req.body.data.name;
    const extname = path.extname(file.originalname);
    cb(
      null,
      `${username}-${file.originalname.substring(
        0,
        file.originalname.length - extname.length
      )}${extname}`
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|png|jpeg/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      );
    }
  },
}).single("image");

//Login path
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user_from_database = await userModel.find({ username: username });

  if (user_from_database.length == 0)
    res.status(404).json({ message: "User does not exist" });

  if (password !== user_from_database.password) {
    res.status(405).json({ message: "Incorrect password" });
  }

  res.status(200).json({ message: "Logged in sucessfully" });
});

//new employee path

app.post("/upload", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { name, email, mobile, designation, gender, course } = req.body.data;
    const imageName = req.file.filename;
    console.log(req.file);

    const check_database = await employeeModel.findOne({
      name: name,
      email: email,
    });

    if (check_database != undefined)
      return res.status(500).json({ message: "User already exists" });

    const upload_to_database = new employeeModel({
      image: imageName,
      name: name,
      email: email,
      mobile: mobile,
      gender: gender,
      course: course,
      designation: designation,
    });

    const saved = await upload_to_database.save();
    if (saved) {
      return res.status(200).json({ message: "uploaded sucessfully" });
    } else return res.status(500).json({ message: "Internal error" });
  });
});

//edit employee
app.put("/update/:id", async (req, res) => {
  const profile = await employeeModel.findOneAndUpdate({ _id: req.params.id },req.body);
  if (profile != undefined) {
    const data = await employeeModel.find({});
    res
      .status(200)
      .json({
        message: `updated ${profile.name} successfully`,
        refreshedData: data,
      });
  } else res.status(404).json({ message: "profile not present" });
});
//delete employee
app.delete("/employee/:id", async (req, res) => {
  const profile = await employeeModel.findOneAndDelete({ _id: req.params.id });
  if (profile != undefined) {
    const data = await employeeModel.find({});
    res
      .status(200)
      .json({
        message: `deleted ${profile.name} successfully`,
        refreshedData: data,
      });
  } else res.status(404).json({ message: "profile not present" });
});

//get employee list
app.get("/list", async (req, res) => {
  const users = await employeeModel.find({});
  res.json(users);
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  connectToDb();
});
