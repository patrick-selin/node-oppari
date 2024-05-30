import * as fs from "fs";

//
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

//
// Appending data asynchronously
fs.appendFile("output.txt", "\nAppended text", (err) => {
  if (err) throw err;
  console.log("Data has been appended");
});

// Appending data synchronously
fs.appendFileSync("outputSync.txt", "\nAppended text");
console.log("Synchronous data append complete");

//
// Creating a directory asynchronously
fs.mkdir("newDir2", (err) => {
  if (err) throw err;
  console.log("Directory created");
});

// Creating a directory synchronously
fs.mkdirSync("newDirSync");
console.log("Synchronous directory creation complete");
