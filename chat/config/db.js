const mongoose = require("mongoose");
const natsWrapper = require("./nats-wrapper");
const saveToChatListener = require("../events/listeners/save-to-chat-listener");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/enterprisepro_chat",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    );

    await natsWrapper.connect();
    new saveToChatListener(natsWrapper.client).listen();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
