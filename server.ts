// import os from "os";


// console.log("os", os.platform());
// console.log("cores", os.cpus());
// console.log("Free Memory", os.freemem() / 1024 / 1024, "MB");

// let storage = new Promise((resolve, reject) => {
//   if (os.freemem() / 1024 / 1024 == 2) {
//     resolve("Success");
//   } else {
//     reject("Failed");
//   }
// });

// storage.then((message) => {
//   console.log("This is in the then " + message);
// }).catch((message) => {
//   console.log("This is in the catch " + message);
// });




import express, { Request, Response } from "express";

const app = express();
const port = 4000;


app.get("/pizza", (req: Request, res: Response) => {
  let p = new Promise<string>((resolve, reject) => {
    let foodReady = true;

    if (foodReady) {
      resolve("Pizza is ready!");
    } else {
      reject("No food for you!");                 
    }
  });

  p.then((message) => {
    console.log("Success:", message);
    res.status(200).json({ status: "success", message });
  }).catch((error) => {
    console.log("Error:", error);
    res.status(500).json({ status: "error", message: error });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
