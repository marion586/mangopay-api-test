var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenvSafe = require("dotenv-safe");
var indexRouter = require("./routes/index");
const bodyParser = require('body-parser');

var walletRoutes = require("./routes/walletRoutes");
var usersRoutes =require('./routes/userRoutes')
var payInRoutes =require('./routes/payInRoutes')
var kycRoutes =require('./routes/kycRoutes')
const {updateUser} =require('./services/userService')
const router = express.Router();

router.use(bodyParser.json());
dotenvSafe.config();



var app = express();

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

app.use("/api", indexRouter);
app.use("/api/users", usersRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/payin", payInRoutes);
app.use("/api/kyc", kycRoutes);

router.post('/webhooks/kyc', async(req, res) => {
  const event = req.body;
    const userObject = {
      FirstName: "marion",
      LastName: "LastName",
      Email: "marionhooks@gmail.com",
      
    };

  await updateUser("user_m_01JHTM4QN5ZX5V6NTDQK9YWJPR", userObject);
  if (event.EventType === 'KYC_SUCCEEDED') {
    console.log('KYC document validation succeeded:', event);
    // Handle successful validation
  } else if (event.EventType === 'KYC_FAILED') {
    console.log('KYC document validation failed:', event);
    // Handle failed validation
  } else {
    console.log('Unhandled event:', event);
  }

  // Send 200 OK response to Mangopay
  res.status(200).send('OK');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
