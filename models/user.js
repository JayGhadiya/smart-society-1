const mongoose = require("mongoose");
const Society = require("./society");
const bcrypt = require("bcrypt");
const moment = require("moment");
const saltRounds = 10;

// mongoose.connect("mongodb://localhost:27017/smartSocietyDB");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  blockNo: { type: String },
  contact: { type: String, min: 10, max: 10 },
  occupantType: { type: String, default: "owner" },
  society: { type: mongoose.Types.ObjectId }, // link to the society collection
  societyCode: { type: String, required: true }, // link to society collection
  date: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const password = "req.body.password";

bcrypt.hash(password, saltRounds, function (err, hash) {
  const user = new User({
    name: "rahul kacha",
    email: "rahulbkkfgdgf@gmail.com",
    password: hash,
    blockNo: "B173",
    contact: "8925164521",
    societyCode: "news624c25",
    date: moment().format("DD/MM/YYYY"),
  });

  // user.save((err, obj) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     Society.findOne({ societyCode: obj.societyCode }, (err, soc) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         User.findOneAndUpdate(
  //           { _id: obj._id },
  //           { society: soc._id },
  //           (err, newUser) => {
  //             if (err) {
  //               console.log(err);
  //             } else {
  //               console.log("successfully added " + newUser.name + ".");
  //             }
  //           }
  //         );
  //       }
  //     });
  //   }
  // });
});

function deleteUser(societyId) {
  User.deleteMany({ society: societyId }, (err, obj) => {
    if (err) {
      console.log(err);
    } else {
      console.log(obj);
    }
  });
}

module.exports = { User, deleteUser };
