const db = require("../models"); // gọi về model
const User = db.user; // gọi ra model user đặt tên là User
const Blog = db.blog; // gọi ra model blog
const Tag = db.tag; // gọi ra model tag
const Comment = db.comment_blog; // gọi ra model comment blog
const Like = db.like_blog; // gọi ra model like blog
const Save = db.save_blog; // gọi ra model save blog
const ITEMS_PER_PAGE =9 ; // Số lượng mục trên mỗi trang

// hàm xử lý lấy ra danh sách blog
const getBlog = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại từ query string, mặc định là trang 1
    const status = req.query.status || 1
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const blogs = await Blog.findAndCountAll({
        attributes: ['id', 'title_blog', 'id_user','content_blog', 'status', 'img_blog', 'createdAt', 'updatedAt'],
        where:{status:status},
        order: [["id", "DESC"]],
        include: [
            { model: User, attributes: ['id', 'fullname','avatar'] },
            { model: Tag, attributes: ['id', 'nametag','status'] },
        ],
        offset: offset,
        limit: ITEMS_PER_PAGE,

    });

    const totalItems = blogs.count;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.json({
        blogs: blogs.rows,
        currentPage: page,
        totalPages: totalPages
    });
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

const getBlogByID = async (req,res)=>{
 try {
  const blogs = await Blog.findAll({
    attributes: ['id', 'title_blog', 'content_blog', 'status', 'img_blog', 'createdAt', 'updatedAt'],
    where:{id:req.params.id},
    order: [["id", "DESC"]],
    include: [
        { model: User, attributes: ['id', 'fullname','avatar'] },
        { model: Tag, attributes: ['id', 'nametag','status'] },
    ],
});
res.json(blogs)
 } catch (error) {
  console.log(error)
 }
}
// hàm xử lý thêm blog
const addBlog = async (req, res) => {
  try {
    const { id_user, id_tag, title_blog, content_blog,img_blog} = req.body;
    const existUser = await User.findByPk(id_user);
    const existTag = await Tag.findByPk(id_tag);
    if (existUser) {
      if (existTag) {
        const blog = await Blog.create({
          id_user: id_user,
          id_tag: id_tag,
          title_blog: title_blog,
          content_blog: content_blog,
          img_blog:img_blog,
          status: true,
        });
        return res.status(200).json({ message: "Tạo blog thành công!" });
      } else {
        return res.status(202).json({ message: "Chưa có tag!" });
      }
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý update blog
const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { id_tag, content_blog, title_blog,img_blog } = req.body;
    const existBlog = await Blog.findByPk(id);
    const existTag = await Tag.findByPk(id_tag);
    if (existBlog) {
      if (existTag) {
        const blog = await existBlog.update({
          id_tag: id_tag,
          title_blog: title_blog,
          img_blog:img_blog,
          content_blog: content_blog,
        });
        return res.status(200).json({ message: "Cập nhật blog thành công!" });
      }
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const existBlog = await Blog.findByPk(id);
    if (existBlog) {
      await Comment.destroy({ where: { id_blog: id } });
      await Like.destroy({ where: { id_blog: id } });
      await Save.destroy({ where: { id_blog: id } });
      await existBlog.destroy();
      return res.status(200).json({ message: "Xoá blog thành công!" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// Thực hiện thêm hoặc hủy thích blog
const handlelike = async (req, res) => {
  try {
    const { id_blog, id_user } = req.body;

    const exsitBlog = await Blog.findByPk(id_blog);
    const exsitUser = await User.findByPk(id_user);
    const exsitLike = await Like.findOne({
      where: {
        id_blog,
        id_user,
      },
    });

    if (exsitBlog && exsitUser) {
      if (exsitLike) {
        await exsitLike.destroy();
        res.status(200).json({ message: "Hủy thích thành công" });
      } else {
        await Like.create({ id_blog: id_blog, id_user: id_user });
        res.status(200).json({ message: "Thích thành công" });
      }
    } else {
      res.status(202).json({ message: "Thích thất bại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// Thực hiện lấy like
const getlike = async (req, res) => {
  try {
    const like = await Like.findAll();
    res.status(200).json(like);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
const  getlikebyId = async (req, res) => {
  try {
    const id =req.params.id
    const like = await Like.findAll({where:{id_blog:id}});
    res.status(200).json(like);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
const get_saveBlog = async (req, res) => {
  try {
    const save = await Save.findAll();
    res.json(save);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
const get_saveBlogByID = async (req, res) => {
  try {
    const id =req.params.id
    const save = await Save.findAll({where:{id_blog:id}});
    res.json(save);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
// thực hiện việc thêm hoặc hủy theo dõi blog
const handle_saveBlog = async (req, res) => {
  try {
    const { id_blog, id_user } = req.body;

    const exsitBlog = await Blog.findByPk(id_blog);
    const exsitUser = await User.findByPk(id_user);
    const exsitSave = await Save.findOne({
      where: {
        id_blog,
        id_user,
      },
    });
    if (id_blog && id_user) {
      if (exsitSave) {
        await exsitSave.destroy();
        res.status(200).json({ message: "Hủy theo dõi thành công" });
      } else {
        await Save.create({ id_blog: id_blog, id_user: id_user });
        res.status(200).json({ message: "Theo dõi thành công" });
      }
    } else {
      res.status(202).json({ message: "Theo dõi thất bại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// Thực hiện getComment
const getComment = async (req, res) => {
  try {
    const cmt = await Comment.findAll();
    res.status(200).json(cmt);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
const getCommentbyid= async (req, res) => {
  try {
    const id = req.params.id
    const cmt = await Comment.findAll({where:{id_blog:id}, include: [
      { model: User, attributes: ['id', 'fullname','avatar'] },
     
  ],}
     );
    res.status(200).json(cmt);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
// Thực hiện comment
const addComment = async (req, res) => {
  try {
    const { comment, id_blog, id_user } = req.body;
    const exsitBlog = await Blog.findByPk(id_blog);
    const existUser = await User.findByPk(id_user)
    if (exsitBlog && existUser ) {
      await Comment.create({
        id_blog: id_blog,
        id_user: id_user,
        comment: comment,
        id_reply: null,
      });
      res.status(200).json({ message: "Thêm bình luận thành công" });
    } else {
      res.status(202).json({ message: "Thêm bình luận thất bại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
// Thực hiện xóa comment
const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Tìm và xóa các reply có reply_id bằng id của comment
    await Comment.destroy({
      where: {
        reply_id: id
      }
    });

    // Tìm và xóa comment chính dựa trên id
    const exitCmt = await Comment.findByPk(id);
    if (exitCmt) {
      await exitCmt.destroy();
      res.status(200).json({ message: "Xóa bình luận thành công" });
    } else {
      res.status(202).json({ message: "Bình luận không tồn tại" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
};
// Thực hiện cập nhập
const updateComment = async (req, res) => {
  try {
    // nhận vào id của  comment
    const id = req.params.id;
    const { comment } = req.body;
    const exitCmt = await Comment.findByPk(id);
    if (exitCmt) {
      exitCmt.comment = comment;
      await exitCmt.save();
      res.status(200).json({ message: "Cập nhập bình luận thành công" });
    } else {
      res.status(202).json({ message: "Bình luận không tồn tại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
const get_replyComment = async(req,res)=>{
  try {
    const id = req.params.id
    const cmt = await Comment.findAll({where:{reply_id:id}, include: [
      { model: User, attributes: ['id', 'fullname','avatar'] },
     
  ],}
     );
    res.status(200).json(cmt);
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
}
// Thực hiện reply comment
const add_replyComment = async (req, res) => {
  try {
    const id = req.params.id; // id comment cap 1
    const { comment, id_user ,id_blog} = req.body;
    const exits = await Comment.findByPk(id);
    if (exits) {
      await Comment.create({
        comment: comment,
        id_user: id_user,
        id_blog:id_blog,
        reply_id: id,
      });
      res.status(200).json({ message: "Bình luận thành công" });
    } else {
      res.status(202).json({ message: "Bình luận không tồn tại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
// Thực hiện sửa reply
const update_replyComment = async (req, res) => {
  try {
    // nhận vào id của reply comment
    const id = req.params.id;
    const { comment } = req.body;

    const existingReply = await Comment.findByPk(id);

    if (existingReply) {
      existingReply.comment = comment;
      await existingReply.save();
      res
        .status(200)
        .json({ message: "Cập nhật bình luận phản hồi thành công" });
    } else {
      res.status(202).json({ message: "Bình luận phản hồi không tồn tại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
// Thực hiện xóa reply
const delete_replyComment = async (req, res) => {
  try {
    // nhận vào id của reply comment
    const id = req.params.id;
    const existingReply = await Comment.findByPk(id);

    if (existingReply) {
      await existingReply.destroy();
      res.status(200).json({ message: "Xóa bình luận phản hồi thành công" });
    } else {
      res.status(202).json({ message: "Bình luận phản hồi không tồn tại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};
module.exports = {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
  getlike,
  handlelike,
  get_saveBlog,
  handle_saveBlog,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  add_replyComment,
  delete_replyComment,
  update_replyComment,
  getBlogByID,
  getlikebyId,
  get_saveBlogByID,
  getCommentbyid,
  get_replyComment
};
