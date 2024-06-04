(async () => {
  console.time("copy");

  const srcFile = await fs.open("text-gigantic.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readResult = await srcFile.read();
    bytesRead = readResult.bytesRead;

    if (bytesRead !== readResult.buffer.length) {
      const indexOfNotFilled = readResult.buffer.indexOf(0);
      const newBuffer = Buffer.alloc(indexOfNotFilled);
      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
      destFile.write(newBuffer);
    } else {
      destFile.write(readResult.buffer);
    }
  }

  console.timeEnd("copy");
})();
