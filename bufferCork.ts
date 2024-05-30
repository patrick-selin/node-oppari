import { createWriteStream } from "fs";
const writeStream = createWriteStream("output.txt");
writeStream.write("Hello\n");
writeStream.cork();
writeStream.write("World\n");
setTimeout(() => {
  writeStream.uncork();
  writeStream.write("!");
  writeStream.end();
}, 5000);
