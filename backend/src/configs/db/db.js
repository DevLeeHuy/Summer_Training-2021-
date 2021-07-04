const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@firstmernproject.ueiid.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
(async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected😎");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = {
  getAll: function (model) {
    return model.find();
  },
};
