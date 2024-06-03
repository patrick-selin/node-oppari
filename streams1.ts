// import * as fs from "fs";

// //
// // Reading a file using a readable stream
// const readStream = fs.createReadStream("example.txt", { encoding: "utf8" });

// // Handling 'data' event
// readStream.on("data", (chunk) => {
//   console.log("Read chunk:", chunk);
// });

// // Handling 'end' event
// readStream.on("end", () => {
//   console.log("Finished reading file");
// });

// //
// // Writing to a file using a writable stream
// const writeStream = fs.createWriteStream("output.txt");

// // Writing data to the stream
// writeStream.write("Hello, ");
// writeStream.write("Node.js!");
// writeStream.end(() => {
//   console.log("Finished writing to file");
// });

// //
// // Piping data from a readable stream to a writable stream
// const inputStream = fs.createReadStream("example.txt");
// const outputStream = fs.createWriteStream("pipedOutput.txt");
// inputStream.pipe(outputStream);

// // Handling 'finish' event
// outputStream.on("finish", () => {
//   console.log("Finished piping data");
// });

// //
// // Example of a transform stream (converting text to uppercase)
// import { Transform } from "stream";

// class UpperCaseTransform extends Transform {
//   _transform(chunk, encoding, callback) {
//     this.push(chunk.toString().toUpperCase());
//     callback();
//   }
// }

// // Creating a transform stream
// const upperCaseTransform = new UpperCaseTransform();

// // Piping data through the transform stream
// const inputTransformStream = fs.createReadStream("example.txt");
// const outputTransformStream = fs.createWriteStream("transformedOutput.txt");
// inputTransformStream.pipe(upperCaseTransform).pipe(outputTransformStream);

// // Handling 'finish' event
// outputTransformStream.on("finish", () => {
//   console.log("Finished transforming data");
// });

// //
// // Error handling for streams
// const errorStream = fs.createReadStream('nonexistent.txt');
// errorStream.on('error', (err) => {
//     console.error('Error reading file:', err);
// });

// read many
const fs = require("node:fs/promises");

(async () => {
  console.time("readBig");
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });

  const streamWrite = fileHandleWrite.createWriteStream();

  let split = "";

  streamRead.on("data", (chunk: Buffer) => {
    const nums = chunk.toString("utf-8").split("  ");

    if (Number(nums[nums.length - 2]) + 1 !== Number(nums[nums.length - 1])) {
      split = nums.pop()
    }

    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
    console.log(nums);
    // console.log(chunk)
    // console.log(chunk.length)
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });
})();
