module.exports = ({ db }) => ({
  collection: "users",
  indexes: [
    { key: { email: 1 }, options: { unique: true } },
  ],
  async create(user) {
    console.log(db)
    const collection = db.collection(this.collection);
    return collection.insertOne(user);
  },
  async findUserByEmail(email) {
    const collection = db.collection(this.collection);
    return collection.findOne({ email });
  },
  async findById(id) {
    const collection = db.collection(this.collection);
    return collection.findOne({ id });
  },
  
});
