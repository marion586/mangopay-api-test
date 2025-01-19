module.exports = ({ db }) => ({
  collection: "tasks",
  indexes: [
    { key: { userId: 1 }, options: { unique: false } },
    { key: { status: 1 }, options: {} },
  ],
  async create(task) {
    const collection = db.collection(this.collection);
    return collection.insertOne(task);
  },
  async findTasksByUser(userId) {
    const collection = db.collection(this.collection);
    return collection.find({ userId }).toArray();
  },
  async updateTask(taskId, updates) {
    const collection = db.collection(this.collection);
    return collection.updateOne({ _id: taskId }, { $set: updates });
  },
  async findById(id) {
    const collection = db.collection(this.collection);
    return collection.findOne({ id })
  }
});
