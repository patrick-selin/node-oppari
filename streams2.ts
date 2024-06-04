const fs = require("node:fs/promises");

(async () => {
  console.time("copy");
  const destFile = await fs.open("test.txt", "w");
  const result = await fs.readFile("text1.txt");

//   await destFile.write(result);

  console.timeEnd("copy");
})();


