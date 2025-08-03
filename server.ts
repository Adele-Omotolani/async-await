import os from "os";


console.log("os", os.platform());
console.log("cores", os.cpus());
console.log("Free Memory", os.freemem() / 1024 / 1024, "MB");

let storage = new Promise((resolve, reject) => {
  if (os.freemem() / 1024 / 1024 == 2) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

storage.then((message) => {
  console.log("This is in the then " + message);
}).catch((message) => {
  console.log("This is in the catch " + message);
});
