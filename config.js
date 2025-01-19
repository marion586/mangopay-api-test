module.exports = {
    mongodb: {
    url: process.env.MONGODB_ADDON_URI || process.env.MONGODB_URL,
    databaseName: process.env.MONGODB_ADDON_DB || process.env.MONGODB_DATABASE,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

}