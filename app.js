var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenvSafe = require("dotenv-safe");
var indexRouter = require("./routes/index");
const bodyParser = require('body-parser');
const {hooks} = require('./routes/hooks')

var walletRoutes = require("./routes/walletRoutes");
var usersRoutes =require('./routes/userRoutes')
var payInRoutes =require('./routes/payInRoutes')
var kycRoutes =require('./routes/kycRoutes')
var cardRoutes =require('./routes/cardRoute')
var cors = require('cors')
const { ApolloServer } = require('@apollo/server') ;
const { expressMiddleware }  = require('@apollo/server/express4');

const typeDefs = require("./graphql/schema");


const {updateUser} =require('./services/userService')

module.exports =  async (database) => {
const router = express.Router();

router.use(bodyParser.json());


dotenvSafe.config();

var app = express();

const models = {
    User: require('./models/User')({ db: database.db }),
    Task: require('./models/Task')({ db: database.db }),
  };

const server = new ApolloServer({
  typeDefs,
  resolvers: require("./graphql/resolvers")(models),
});

await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);

// Middleware
app.use(bodyParser.json({ limit: '10mb' })); // Supports large file
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/' , (req, res)=>{res.json({message: "message"})})
// app.use("/api", indexRouter);
app.use("/api/users", usersRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/payins", payInRoutes);
app.use("/api/kyc", kycRoutes);
app.use('/api/webhooks' ,hooks)
app.use('/api/card-registration' ,cardRoutes)

// catch 404 and forward to error handler
// Apollo Server for GraphQL

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

return app

}

