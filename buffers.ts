// Importing the 'Buffer' class from the 'buffer' module
import { Buffer } from "buffer";

// Creating a buffer with a specified size (in bytes)
const bufSize: number = 10;
const buffer: Buffer = Buffer.alloc(bufSize);

console.log('Initial buffer:', buffer); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log('First byte of buffer:', buffer[0]); // 0

// Allocating a value to a buffer element
buffer[0] = 0xf4; // allocate 244 (hex) to buffer element 0

console.log('Buffer after setting first byte:', buffer); // <Buffer f4 00 00 00 00 00 00 00 00 00>
console.log('First byte of buffer after setting:', buffer[0]); // 244

// Writing data to the buffer
const dataToWrite: string = 'Hello, world!';
buffer.write(dataToWrite, 0, 'utf-8');

console.log('Buffer after writing data:', buffer); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72>
console.log('Buffer content as string:', buffer.toString('utf-8')); // Hello, wor

// Manipulating binary data in the buffer
for (let i = 0; i < buffer.length; i++) {
    buffer[i] = i;
}

console.log('Modified buffer:', buffer); // Modified buffer: <Buffer 00 01 02 03 04 05 06 07 08 09>

// Converting buffer to hexadecimal string
const hexString: string = buffer.toString('hex');
console.log('Buffer as hexadecimal string:', hexString); // Buffer as hexadecimal string: 00010203040506070809

// Creating a buffer from an array
const arrayBuffer: Buffer = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
console.log('Buffer from array:', arrayBuffer); // <Buffer 01 02 03 04 05>

// Creating a buffer from a string
const stringBuffer: Buffer = Buffer.from('Hello, world!', 'utf-8');
console.log('Buffer from string:', stringBuffer); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 21>

// Copying buffer data
const copyBuffer: Buffer = Buffer.alloc(10);
stringBuffer.copy(copyBuffer, 0, 0, 10);
console.log('Copied buffer:', copyBuffer); // <Buffer 48 65 6c 6c 6f 2c 20 77 6f 72>

// Slicing a buffer
const slicedBuffer: Buffer = stringBuffer.subarray(0, 5);
console.log('Sliced buffer:', slicedBuffer); // <Buffer 48 65 6c 6c 6f>