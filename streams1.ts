import * as fs from "fs";

//
// Reading a file using a readable stream
const readStream = fs.createReadStream("example.txt", { encoding: "utf8" });

// Handling 'data' event
readStream.on("data", (chunk) => {
  console.log("Read chunk:", chunk);
});

// Handling 'end' event
readStream.on("end", () => {
  console.log("Finished reading file");
});
