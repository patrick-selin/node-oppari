const { Writable } = require("node:stream");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, filename }) {
    super({ highWaterMark });
    this.fileName = fileName;
  }
}
