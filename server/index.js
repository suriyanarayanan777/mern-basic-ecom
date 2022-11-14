const express=require("express")
const app=express()
const mongoose=require("mongoose")
const UserModel = require("./models/user");

const cors = require("cors");
const UserRegisterModel = require("./models/userRegister");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sur8799:1adithyaN@cluster0.bm7sr.mongodb.net/merndb?retryWrites=true&w=majority",()=>{console.log("mongodb connected successfully")})

app.post("/register", async (req, res) => {
  console.log(req.body)
  const {email,username,password} = req.body;
  let user = await UserRegisterModel.findOne({ $or: [{ username }, { email }] });
  if (user) {
    console.log(user)
    return res.json({ status: 'Already in', error: 'User already exists' })
  }
  if(!user){
  const newUser = new UserRegisterModel(req.body);
  await newUser.save();
  return res.json({ status: 'ok', newUser})
  }

});


  app.post("/login", async (req, res) => {
    console.log(req.body)
    const {password} = req.body;
    const user = await UserRegisterModel.findOne({
      password
    })
    if (!user) {
      console.log("Invalid login")
      return res.json({ status: 'error', error: 'Invalid login credentials' })
    }
    if (user) {
      console.log(user)
      return res.json({ status: 'ok', user })
    }
    
  });

app.listen(5000,()=>{
    console.log("server runs perfectly")
})