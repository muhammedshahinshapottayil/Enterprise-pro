import app from "../app";
import "dotenv/config";

const port = process.env.PORT || 4000;
app.set(port.toString(), port);
app.listen(port, () => {
  console.log("Running on ", port);
});
