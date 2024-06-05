const { Writable } = require("node:stream");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
        if (err) {
            callback(err)
        } else {
            this.fd = fd;
        }
    })

    callback();
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);

 
  }
}

const stream = new FileWriteStream({ highWaterMark: 1800 });
stream.write(Buffer.from("this is some string"));
stream.end(Buffer.from("Our last write."));


stream.on("drain", () => {
    // todo
});