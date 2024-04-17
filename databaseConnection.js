const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(process.env.DB_URI)
      .then(() => {
        console.log("it is connected to DB successfully");
      })
      .catch(() => {
        console.log("db connection error " + err);
      });
  }
}

module.exports = new Database();
