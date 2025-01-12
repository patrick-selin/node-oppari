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

//
// Reading directory contents asynchronously
fs.readdir(".", (err, files) => {
  if (err) throw err;
  console.log("Directory contents:", files);
});

// Reading directory contents synchronously
const filesSync = fs.readdirSync(".");
console.log("Synchronous directory contents:", filesSync);

//
// Removing a file asynchronously
fs.unlink("output.txt", (err) => {
  if (err) throw err;
  console.log("File removed");
});

// Removing a file synchronously
fs.unlinkSync("outputSync.txt");
console.log("Synchronous file removal complete");

// Removing a directory asynchronously
fs.rmdir("newDir", (err) => {
  if (err) throw err;
  console.log("Directory removed");
});

// Removing a directory synchronously
fs.rmdirSync("newDirSync");
console.log("Synchronous directory removal complete");

//
// Getting file information asynchronously
fs.stat("example.txt", (err, stats) => {
  if (err) throw err;
  console.log("File stats:", stats);
});

// Getting file information synchronously
const statsSync = fs.statSync("example.txt");
console.log("Synchronous file stats:", statsSync);

const nodeFunc = (buu)  => {
    console.log(buu)
}
