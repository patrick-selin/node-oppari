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

//
// Writing to a file using a writable stream
const writeStream = fs.createWriteStream("output.txt");

// Writing data to the stream
writeStream.write("Hello, ");
writeStream.write("Node.js!");
writeStream.end(() => {
  console.log("Finished writing to file");
});

//
// Piping data from a readable stream to a writable stream
const inputStream = fs.createReadStream("example.txt");
const outputStream = fs.createWriteStream("pipedOutput.txt");
inputStream.pipe(outputStream);

// Handling 'finish' event
outputStream.on("finish", () => {
  console.log("Finished piping data");
});

//
// Example of a transform stream (converting text to uppercase)
import { Transform } from "stream";

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

// Creating a transform stream
const upperCaseTransform = new UpperCaseTransform();

// Piping data through the transform stream
const inputTransformStream = fs.createReadStream("example.txt");
const outputTransformStream = fs.createWriteStream("transformedOutput.txt");
inputTransformStream.pipe(upperCaseTransform).pipe(outputTransformStream);

// Handling 'finish' event
outputTransformStream.on("finish", () => {
  console.log("Finished transforming data");
});
