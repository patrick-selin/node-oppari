const { Writable } = require("node:stream");
const fs = require("node:fs");

class FileWriteStream extends Writable {
  constructor({
    highWaterMark,
    fileName,
  }: {
    highWaterMark: number;
    fileName: string;
  }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
  }

  _construct(
    callback: (err?: NodeJS.ErrnoException | null, fd?: number) => void
  ) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd!;
        callback();
      }
    });
  }

  _write(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    // fs.write(this.fd, chunk, callback);
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunnkSize) {
      // todo
    }
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
