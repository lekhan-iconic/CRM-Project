import mongoose from "mongoose";

const AddingSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  company: { type: String, required: true },
  jobtitle: { type: String, required: true },
});

const AddingContactModel = mongoose.model("AddingContact", AddingSchema);

export default AddingContactModel;
