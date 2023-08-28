const db = require("../models"); // gọi về model
const User = db.user; // gọi ra model user đặt tên là User
const Blog = db.blog; // gọi ra model blog
const Course = db.course // gọi ra model course
const unidecode = require('unidecode');
// Tạo ra một cơ chế tìm kiếm có sử dụng thuật toán phù họp
const { Op } = require('sequelize');
// Hàm search blog
const searchBlog = async (req, res) => {
    try {
        const query = unidecode(req.query.q);

        const blogs = await Blog.findAll({
            where: {
              [Op.or]: [
                { title_blog: { [Op.like]: `%${query.toLowerCase()}%` } },
                { content_blog: { [Op.like]: `%${query.toLowerCase()}%` } }
              ]
            }
          });
          res.json(blogs)
    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Hàm search Course
const searchCourse = async (req, res) => {
    try {
      const query = unidecode(req.query.q);

        const courses = await Course.findAll({
            where: {
              [Op.or]: [
                { title_course: { [Op.like]: `%${query.toLowerCase() }%` } },
                { description_course: { [Op.like]: `%${query.toLowerCase() }%` } },
               
              ],
            }
          });
          res.json(courses)
    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

// Hàm tìm user theo email

const searchUser = async (req, res) => {
    try {

    } catch (error) {
        // trả thông báo lỗi về console
        console.log(error)
    }
}

module.exports = {
    searchUser,
    searchBlog,
    searchCourse
}