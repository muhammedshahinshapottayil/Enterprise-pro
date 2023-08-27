const { connect } = require("nats");
class NatsWrapper {
  _client;
  get client() {
    if (!this._client) throw new Error("Cannot access before Nats connected");
    return this._client;
  }
  async connect(url) {
    return new Promise(async (resolve, reject) => {
      try {
        this._client = await connect({ servers: "http://0.0.0.0:4222" });
        console.log("nats connected successfully");
        resolve();
        process.on("SIGINT", () => {
          this.client.close();
        });
        process.on("SIGTERM", () => {
          this.client.close();
        });
      } catch (error) {
        console.log(error);
        console.log("Nats connection closed");
      }
    });
  }
}

const natsWrapper = new NatsWrapper();
module.exports = natsWrapper;
