const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models");
const { Op } = require("sequelize");
const User = db.user;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const Role_User = db.user_role
const Role = db.role

const register = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body
    const exitsEmail = await User.findOne({ where: { email } });
    const exitsUsername = await User.findOne({ where: { username } });

    if (exitsEmail) {
      res.status(202).json({ message: "Địa chỉ email bị trùng lập" });
    }
    else if (exitsUsername) {
      res.status(202).json({ message: "Username bị trùng lại" });
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username: username,
        fullname: fullname,
        email: email,
        password: hashedPassword,
      })
      if (user) {
        const search = await Role.findOne({ where: { name_role: "Learner" } })
        await Role_User.create({ id_user: user.id, id_role: search.id })
        res.status(200).json({ message: "Đăng ký thành công", user });
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  const { password, itemlogin } = req.body;
  try {
    // Tìm kiếm khách hàng với email cung cấp
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: itemlogin },
          { username: itemlogin }
        ]
      },
    });
    if (!user) {
      return res.status(202).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // So sánh mật khẩu được cung cấp với mật khẩu đã được mã hóa
    if (!isMatch) {
      return res.status(202).json({
        message: "Mật khẩu không đúng",
      });
    }
    else {
      // Tạo JWT
      const searchrole = await Role_User.findOne(
        {
          where: { id_user: user.id }
        },
      );
      const rolename = await Role.findOne({ where: { id: searchrole.id_role } });
      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );
      res.json({
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: rolename.name_role,
        id_role: rolename.id,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(202).json({
      message: "Đăng nhập thất bại",
    });
  }
};

module.exports = {
  register,
  login
};