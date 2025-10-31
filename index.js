const express = require("express");
const path = require('path');
const { handleConnectDB } = require("./connection");
const Url = require("./models/url");
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');
const USER_ROLES = require('./enums/userRole');

//Routes
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8001;

handleConnectDB("mongodb://localhost:27017/short-url")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/url", restrictTo([USER_ROLES.NORMAL, USER_ROLES.ADMIN]), urlRouter);
app.use("/user", userRouter);
app.use("/", staticRoute);

app.get('/test', async (req, res) => {
    const allUrls = await Url.find({});
    return res.render('home', { urls: allUrls });
})

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: new Date() } } },
    { new: true }
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
