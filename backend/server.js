import e from "express";
import { config } from "dotenv";
import cors from "cors";

import connectToDb from "./db/db.js";
import  userModel from "./models/user.js";

config();
const port = process.env.PORT || 5000;

const app = e();

app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

//Login path
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user_from_database = await userModel.find({ username: username });
  
  if (user_from_database.length==0)
    res.status(404).json({ message: "User does not exist" });

  if(password!==user_from_database.password){
    res.status(405).json({message:"Incorrect password"})
  }

  res.status(200).json({message:"Logged in sucessfully"})
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  connectToDb();
});
