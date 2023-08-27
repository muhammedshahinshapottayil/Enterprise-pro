const { Listener } = require("@enterprisepro/common");
const User = require("../../models/userModel");
class saveToChatListener extends Listener {
  subject = "user:saveToChat";
  queueGroupName = "get-user-unassigned-by-id";
  async onMessage(data, msg) {
    // data = await DB.getDataNotAssigned(data.data!);
    // msg.respond(JSON.stringify(data));
    const user = await User.create({
      _id: data?.data?.id,
      name: data?.data?.name,
      email: data?.data?.username,
      pic: data?.data?.profile_image,
    });
  }
}
module.exports = saveToChatListener;
