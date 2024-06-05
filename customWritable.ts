const { Writable } = require("node:stream");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
  }

  _write(chuk, encoding, callback) {
   // todo 
  }
}

const stream = new FileWriteStream({ highWaterMark: 1800 });
stream.write(Buffer.from("this is some string"));
stream.end(Buffer.from("Our last write."));
