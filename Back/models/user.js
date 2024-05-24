const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose; 

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['intern', 'supervisor', 'administrator', 'internship coordinator'],
      default: 'intern',
    },
    password: {
      type: String,
      required: true,
    },
    supervisedInterns: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",  
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};


// Export the model
module.exports = mongoose.model("User", userSchema);
