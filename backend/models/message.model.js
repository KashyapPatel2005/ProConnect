import mongoose,{Schema} from "mongoose";


const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  encryptedText: String,
  time: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;