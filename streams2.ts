const { pipeline } = require("node:stream");
const fs = require("node:fs/promises");

(async () => {
  console.time("copy");

  const srcFile = await fs.open("test.txt", "r");
  const destFile = await fs.open("dest.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile. createWriteStream();

  readStream.pipe(writeStream);
  console.log(readStream.readableFlowing);


  pipeline(readStream, writeStream, (err: Error) => {
    console.log(err);
    console.timeEnd("copy");
  });

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;

//     if (bytesRead !== readResult.buffer.length) {
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }

//   console.timeEnd("copy");
})();
