const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
require('./config/connect');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,
  {
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"],
  });

const users = {};

io.on('connection', (socket) => {
  socket.on('userConnected', (userId) => {
    users[userId] = socket.id;
    io.emit('UpdateUserStatus', users)
    console.log('User connected:', userId);
    console.log('Online users:', users);
  });

  socket.on('userDisconnect', (userId) => {
    delete users[userId];
    io.emit('Updatedisconnect', users)
    console.log('User disconnected:', userId);
    console.log('Online users:', users);

  });
});


app.use((req, res, next) => {
  res.io = io
  next()
});

const { routerUser } = require('./routes/userRouter');
const { routerSearch } = require('./routes/searchRouter');
const { routerAuth } = require('./routes/authRouter')
const { routerBlog } = require('./routes/blogRouter')
const { routerAdmin } = require('./routes/adminRouter')
const { routerNote } = require('./routes/noteRouter')
const { routerCourse } = require('./routes/courseRouter')
const {routerStatistcal}=require('./routes/statisticalRouter')
// Thiết lập body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
// Định tuyến
app.use(express.json());
app.use(routerUser, routerSearch, routerBlog,
  routerAuth, routerAdmin, routerNote, routerCourse,
  routerStatistcal);

// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));


const port = 3000;
server.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
