import * as fs from "fs";

// Reading a file asynchronously
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});

// Reading a file synchronously
const dataSync = fs.readFileSync("example.txt", "utf8");
console.log("Synchronous file content:", dataSync);

//
// Writing to a file asynchronously
fs.writeFile("output.txt", "Hello, Node.js!", (err) => {
  if (err) throw err;
  console.log("File has been written");
});

// Writing to a file synchronously
fs.writeFileSync("outputSync.txt", "Hello, Node.js!");
console.log("Synchronous file write complete");
