const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.set('trust proxy', 1); // VERY IMPORTANT for Render/HTTPS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'https://test-test-reg.vercel.app', // your frontend domain
  credentials: true, // allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const userRouter = require('./router/user.route');
app.use('/user', userRouter);

module.exports = app;
