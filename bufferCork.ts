import { createWriteStream } from "fs";
const writeStream = createWriteStream("output.txt");
writeStream.write("Helloo\n");
writeStream.cork();
writeStream.write("Worlds\n");
setTimeout(() => {
  writeStream.uncork();
  writeStream.write("!!");
  writeStream.end();
}, 5000);
