import mongoose from "mongoose";

const filledUserSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  formId: {
    type: String,
  },
  status: {
    type: String,
  },
  accuracy: {
    type: String,
  },
  details: {
    personalDetail: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
      },
      identificationNumber: {
        type: String,
      },
      dob: {
        type: Date,
      },
      gender: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
    },
    addressDetail: {
      addressline1: {
        type: String,
      },
      addressline2: {
        type: String,
      },
      country: {
        type: String,
      },
      zip: {
        type: Number,
      },
    },
    images: {
      face: {
        type: String,
      },
      passport: {
        type: String,
      },
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const FilledUser = mongoose.model("FilledUser", filledUserSchema);
export default FilledUser;
