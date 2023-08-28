const db = require("../models"); // gọi về model

const Blog = db.blog; // gọi ra model blog
const Comment = db.comment_blog; // gọi ra model comment blog
const Like = db.like_blog; // gọi ra model like blog
const Save = db.save_blog; // gọi ra model save blog
const Tag = db.tag; // gọi ra model tag

const Course = db.course
const Index = db.index_course
const Index_Content = db.content_index_course
const Question = db.question_course
const Save_Course = db.save_course

const User = db.user; // gọi ra model user đặt tên là User
const Role = db.role; // gọi ra model role đặt tên là Role
const User_role = db.user_role; // gọi ra model user_role đặt tên là User_role

const sequelize = require('sequelize');
// Thống kê điểm tương tác -> comment
const chartCoursePoint = async (req, res) => {
    try {
        const get = await Question.findAll({
            attributes: ['id_course', [sequelize.fn('COUNT', 'Course.id'), 'point']],
            include: {
                model: Course,
                attributes: ['title_course']
            },
            group: ['id_course']
        });
        res.json(get)

    } catch (error) {
        console.log(error)
    }
}

// Thống kê số lượng đk của các khoá học
const chartCourseBySave = async (req, res) => {
    try {
        const getSave = await Save_Course.findAll({
            attributes: ['id_course', [sequelize.fn('COUNT', "Course.id"), 'subcribed']],
            order: [["subcribed", "DESC"]],
            include: {
                model: Course,
                attributes: ['title_course']
            },
            group: ['id_course'],


        });
        res.json(getSave)
    } catch (error) {
        console.log(error)
    }
}

// Thông kê lượt tương tác của blog
const chartBlog = async (req, res) => {
    try {
        const Blogger = await Blog.findAll({
            attributes: [
                'id','title_blog',
                [sequelize.literal('(SELECT COUNT(*) FROM like_blogs WHERE like_blogs.id_blog = blog.id)'), 'like_count'],
                [sequelize.literal('(SELECT COUNT(*) FROM comment_blogs WHERE comment_blogs.id_blog = blog.id)'), 'comment_count'],
                [sequelize.literal('(SELECT COUNT(*) FROM save_blogs WHERE save_blogs.id_blog = blog.id)'), 'save_count']
            ],
            group: ['blog.id']
        });
        res.json(Blogger);
    } catch (error) {
        console.log(error);
    }
};

// thong ke blog tung user
const chartBlogByUser = async (req, res) => {
    try {
        const getUserBlog = await Blog.findAll({
            attributes: ['id_user', [sequelize.fn('COUNT', "User.id"), 'point']],
            order: [["point", "DESC"]],
            include: {
                model: User,
                attributes: ['fullname']
            },
            group: ['id_user'],


        });
        res.json(getUserBlog)
    } catch (error) {
        console.log(error)
    }
}
//dem xem co bao nhieu user o moi role
const chartUserByRole = async (req, res) => {
    try {
        const GetUser_role = await Role.findAll({
            attributes: [
                'id', 'name_role',
                [sequelize.fn('COUNT', ('name_role')), 'count'],
            ],
            include: [
                {
                    model: User_role,
                    attributes: []
                },
            ],
            group: ['Role.id']

        });
        res.json(GetUser_role)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    chartCoursePoint,
    chartBlog,
    chartBlogByUser,
    chartCourseBySave,
    chartUserByRole,
}
