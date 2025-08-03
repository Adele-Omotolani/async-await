import express, { Request, Response } from "express"

const app = express()
const port = 4000

app.use(express.json())//to read JSON from req.body

//userType

interface User{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

//dommy dataBase

let users:User[] = []

//create

app.post("/users",async(req:Request,res:Response)=>{
    try{
        const {firstName,lastName,email,password} = req.body
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"All input fields are required"});
        }
        const userExists = users.find((user)=>user.email === email);
        if(userExists){
            return res.status(409).json({mesage:"user already exists"})
        }
        const newUser:User = {
     id:users.length + 1,
    firstName,
    lastName,
    email,
    password
        }
        users.push(newUser)

         return res.status(201).json({mesage:"user created successfully",data:users})
    }catch(error){
        res.status(500).json({message:"internal server error"})
    }
})

//READ ALL USERS

app.get("/users",async(req:Request,res:Response)=>{
    try {
      return res
        .status(201)
        .json({ mesage: "user gotten successfully", data: users });
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
})

//UPDATE USER

app.patch("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password } = req.body;
    const findUser = users.find((e) => e.id === id);
    if (!findUser) {
      return res.status(404).json({ message: "user not found" });
    }
    if (firstName) findUser.firstName = firstName;
    if (lastName) findUser.lastName = lastName;
    if (email) findUser.email = email;
    if (password) findUser.password = password;

    return res.status(200).json({ message: "user updated", data: findUser });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
//DELETE
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const findUser = users.find((e) => e.id === id);
    if (!findUser) {
      return res.status(404).json({ message: "user not found" });
    }
    users = users.filter((e) => e.id !== id);
    return res.status(200).json({ message: "user deleted", data: users });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`server is runnning on http://localhost:${port}`);
});
