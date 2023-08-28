const db = require("../models"); // gọi về model
const User = db.user; // gọi ra model user đặt tên là User
const FollowUser = db.follow_user; // gọi ra model follow_user đặt tên là FollowUser
const Noti = db.notification_user; // gọi ra model notification_user đặt tên là Noti
const Role = db.role; // gọi ra model role đặt tên là Role
const User_role = db.user_role; // gọi ra model user_role đặt tên là User_role
const bcrypt = require("bcryptjs"); // package bcrypt sử dụng trong việc mã hóa password
const fs = require("fs"); // package thao tác vs file 
const multer = require("multer"); // package sử dụng để thao tác upload file

// Được sử dụng để lưu trữ các tệp được tải lên trong thư mục uploads.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Hàm sử dụng để thao tác với file = multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // giới hạn dung lượng file 5MB
  },
});

// Sử dụng hàm để xóa file khỏi thư mục upload
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`File ${filePath} has been deleted`);
  });
}
// hàm lấy tất cả user 
const get_allUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user)
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

//hàm lấy user theo id
const get_byID = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
    const exitID = await User.findByPk(id);
    if (exitID) {
      return res.status(200).json(exitID);
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Hàm update fullname và ảnh đại diện nhận vào 2 đối số là rep và res
const updateInfo = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;

    // Thực hiện kiểm tra xem user có không
    const exists = await User.findByPk(id)
    if (exists) {
      upload.single("avatar")(req, res, async function (err) {
        const { fullname } = req.body
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(400).json({ message: err.message });
        }
        // Kiểm tra nếu có file ảnh mới được chọn
        if (req.file) {
          const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename
            }`;
          exists.avatar_name = req.file.filename
          exists.avatar = imageUrl;
          exists.fullname = fullname
          await exists.save();
          console.log(fullname)
          res.status(200).json({ message: "Cập nhập thành công", exists })
        } else {
          exists.fullname = fullname
          res.status(200).json({ message: "Cập nhập thành công", exists })
          await exists.save();
        }
      });

    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Hàm update password vào 2 đối số là rep và res
const updatePassword = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const { password, newpassword } = req.body;
    const id = req.params.id
    const existUser = await User.findByPk(id)
    if (existUser) {
      const isMatch = await bcrypt.compare(password, existUser.password)
      if (!isMatch) {
        return res.status(201).json({ message: "Mật khẩu cũ không đúng." })
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        await existUser.update({ password: hashedPassword })
        return res.status(200).json({ message: "Thành công" })
      }
    }
    else {
      res.status(202).json({ message: 'Không tồn tại user này' })
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}


// Thực hiện thêm mới ảnh avatar
const newAvatar = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
    // Thực hiện kiểm tra xem user có không
    const exists = await User.findByPk(id)
    if (exists) {
      upload.single("avatar")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: err.message });
        } else if (err) {
          return res.status(400).json({ message: err.message });
        }
        // Kiểm tra nếu có file ảnh mới được chọn
        if (req.file) {
          const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename
            }`;
          exists.avatar_name = req.file.filename
          exists.avatar = imageUrl;
          await exists.save();
          res.status(200).json({ message: "Cập nhập ảnh thành công" })
        }
      });
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
// Thực hiện việc xóa 1 user khỏi DB
const deleteUser = async (req, res) => {
  try {
    // hàm sẽ nhận 1 đối số id của user từ params của đường dẫn api
    const id = req.params.id;
    const existUser = await User.findByPk(id)
    if (existUser) {

    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
// GET danh sách follow 
const getFollow = async (req, res) => {
  try {
    const id = parseInt(req.query.id)
    const getList = await FollowUser.findAll({ where: { from_user: id } });
      return res.json(getList);
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
const getFollowbyMe = async(req,res)=>{
  try {
    const id = parseInt(req.query.id)
    const getList = await User.findAll({
      attributes:['id','fullname','avatar'],
      include:[{model:FollowUser,where:{from_user:id},attributes:['id']}]
    })
      return res.json(getList);
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
// Thêm hoặc xóa 1 follow
const handleFollow = async (req, res) => {
  try {
    const { to_user, from_user } = req.body
    const UserFollow = await FollowUser.findOne({ where: { to_user: to_user, from_user: from_user } })
   
    if (UserFollow) {
      const followed = await FollowUser.destroy({ where: { to_user, from_user } }) 
      
      return res.status(200).json({ message: "Huỷ follow thành công" })
     
    }
    else {
      const followent = await FollowUser.create({ to_user, from_user })
      
      return res.status(200).json({ message: "Follow thành công" })
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}


// Thực hiện việc thêm thông báo cho user
const createNotification = async (req, res) => {
  try {
    const { title_notification, content_notification, id_role } = req.body
    const existRole = await Role.findByPk(id_role)
    if (existRole) {
      //join user vs user_role
      const getUser = await User.findAll({
        attribute: ["id"],
        include: [{
          model: User_role,
          where: { id_role: id_role }
        }]
      })
      getUser.forEach(async element => {
        const noti = await Noti.create({ id_user: element.id, title_notification: title_notification, content_notification: content_notification, status_seen: false })
      });
      return res.status(200).json({ message: "Gửi thành công!" })
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

// Thực hiện xóa 1 thông báo
const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id // goi. ve`
    const existNoti = await Noti.findByPk(id)
    if (existNoti) {
      await existNoti.destroy()
      return res.status(200).json({ message: "Xoá thành công!" })
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}
module.exports = {
  get_allUser,
  get_byID,
  updateInfo,
  updatePassword,
  deleteUser,
  getFollow,
  handleFollow,
  createNotification,
  deleteNotification,
  newAvatar,
  getFollowbyMe
}
