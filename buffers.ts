// Importing the 'Buffer' class from the 'buffer' module
import { Buffer } from "buffer";

// Creating a buffer with a specified size (in bytes)
const bufSize: number = 10;
const buffer: Buffer = Buffer.alloc(bufSize);

console.log(buffer); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buffer[0]); // 0

buffer[0] = 0xf4; // allocate 244 (hex) to buffer element 0

console.log(buffer); // <Buffer f4 00 00 00 00 00 00 00 00 00>
console.log(buffer[0]); // 244

// Writing data to the buffer
const dataToWrite: string = 'Hello, world!';
buffer.write(dataToWrite, 0, 'utf-8');

console.log(buffer); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72>