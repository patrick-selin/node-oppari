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
    this.writesCount = 0;
  }

  _construct(
    callback: (err?: NodeJS.ErrnoException | null, fd?: number) => void
  ) {
    fs.open(
      this.fileName,
      "w",
      (err: NodeJS.ErrnoException | null | undefined, fd: any) => {
        if (err) {
          callback(err);
        } else {
          this.fd = fd!;
          callback();
        }
      }
    );
  }

  _write(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunnkSize) {
      fs.write(
        this.fd,
        Buffer.concat(this.chunks),
        (err: Error | null | undefined) => {
          if (err) {
            return callback(err);
          }
          this.chunks = [];
          this.chunksSize = 0;
          ++this.writesCount;
          callback();
        }
      );
    } else {
      callback();
    }
  }

  _final(callback: (err?: NodeJS.ErrnoException | null) => void) {
    fs.write(
      this.fd,
      Buffer.concat(this.chunks),
      (err: NodeJS.ErrnoException | null) => {
        if (err) return callback(err);

        this.chunks = [];
        callback();
      }
    );
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
