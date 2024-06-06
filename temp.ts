// Importing required modules
const { Writable } = require("node:stream"); // Importing Writable class from the 'stream' module
const fs = require("node:fs"); // Importing 'fs' module for file system operations

// Custom Writable Stream class definition
class FileWriteStream1   extends Writable {
  // Constructor function to initialize the object
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark }); // Calling parent class constructor (Writable)

    // Assigning properties with provided values
    this.fileName = fileName; // File name to write data to
    this.fd = null; // File descriptor for the opened file
    this.chunks = []; // Array to store chunks of data to write
    this.chunksSize = 0; // Total size of chunks accumulated
    this.writesCount = 0; // Number of write operations performed
  }

  // Custom initialization method
  _construct(callback) {
    // Open the file in write mode
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        // If error, invoke the callback with the error
        callback(err);
      } else {
        // If successful, assign the file descriptor and invoke the callback
        this.fd = fd;
        callback();
      }
    });
  }

  // Custom write method to handle writing data to the stream
  _write(chunk, encoding, callback) {
    // Store the chunk and update the total size
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    // If the accumulated size exceeds the highWaterMark
    if (this.chunksSize > this.writableHighWaterMark) {
      // Write the concatenated chunks to the file
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err); // If error, invoke callback with the error
        }
        // Reset the chunks and size, increment writes count, and invoke callback
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      callback(); // If not exceeding highWaterMark, invoke callback
    }
  }

  // Custom finalization method to be called when all data has been written
  _final(callback) {
    // Write any remaining chunks to the file
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err); // If error, invoke callback with the error

      // Increment writes count, reset chunks, and invoke callback
      ++this.writesCount;
      this.chunks = [];
      callback();
    });
  }

  // Custom destruction method to clean up resources
  _destroy(error, callback) {
    console.log("Number of writes:", this.writesCount); // Log number of writes

    // If file descriptor exists, close the file
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error); // Invoke callback with error if any
      });
    } else {
      callback(error); // Invoke callback with error if no file descriptor
    }
  }
}

// Asynchronous function to test the custom stream
(async () => {
  console.time("writeMany"); // Start a timer

  // Create an instance of FileWriteStream
  const stream = new FileWriteStream1({
    highWaterMark: 1800,
    fileName: "test.txt",
  });

  let i = 0; // Initialize a counter variable

  const numberOfWrites = 1000000; // Define the number of writes

  // Function to perform many writes
  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8"); // Create a buffer with data

      // If it's the last write, end the stream with the buffer
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // If the stream's buffer is not full, write the buffer and increment the counter
      if (!stream.write(buff)) break;
      i++;
    }
  };

  writeMany(); // Initial write

  let d = 0; // Initialize a drain counter
  // When the stream's internal buffer is emptied, resume writing
  stream.on("drain", () => {
    ++d;
    writeMany();
  });

  // When the stream finishes writing, log the number of drains and end the timer
  stream.on("finish", () => {
    console.log("Number of drains:", d);
    console.timeEnd("writeMany");
  });
})();
