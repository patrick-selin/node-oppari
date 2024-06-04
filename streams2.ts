(async () => {
  console.time("copy");

  const srcFile = await fs.open("text-gigantic.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readResult = await srcFile.read();
    bytesRead = readResult.bytesRead;
  }

  console.timeEnd("copy");
})();
