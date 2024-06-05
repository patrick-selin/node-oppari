const { Writable } = require("node:stream");
const fs = require("node:fs")

class FileWriteStream extends Writable {
    constructor({ highWaterMark, fileName }: { highWaterMark: number; fileName: string }) {
        super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
  }

  _construct(callback: (error?: Error) => void) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    // fs.write(this.fd, chunk, callback);
    this.chunks.push(chunk)
    this.chunksSize += chunk.length;

    if (this.chunnkSize)
  }
}

const stream = new FileWriteStream({
  highWaterMark: 1800,
  fileName: "test.txt",
});
stream.write(Buffer.from("this is some string"));
stream.end(Buffer.from("Our last write."));

stream.on("drain", () => {
  // todo
});
