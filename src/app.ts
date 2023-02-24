import dotenv from "dotenv";
import app from "./index";

dotenv.config();


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
