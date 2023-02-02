const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

//ROUTES
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const chatRoomRouter = require('./routes/chatRoom');
const deleteRouter = require('./routes/delete');

//MDDLEWARE
// const authenticationMiddleware = require('./middleware/jwt');

const app = express();
const PORT = process.env.PORT || 4000;

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', indexRouter);
// app.use('/users', userRouter);
// app.use('/room', chatRoomRouter);
// app.use('/delete', deleteRouter);

// ERROR HANDLER
app.use('*', (req, res, next) => {
  return res.status(404).json({
    sucess: false,
    message: 'End point does not exist',
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
