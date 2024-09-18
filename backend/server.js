import e from "express";
import { config } from "dotenv";
import cors from "cors";

import connectToDb from "./db/db.js";
import userModel from "./models/user.js";
import path from "path";
import multer from "multer";

config();
const port = process.env.PORT || 5000;

const app = e();

app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const username = req.body.data.name;
    const extname = path.extname(file.originalname);
    cb(null, `${username}-${Date.now()}${extname}`);
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
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const username = req.body;
    const imagePath = req.file.path;

    console.log(username,imagePath);

    res.send(`File uploaded successfully: ${req.file.path}`);
  });
});

//edit employee

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  connectToDb();
});
