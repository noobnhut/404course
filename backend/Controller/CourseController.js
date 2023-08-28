const db = require("../models");
const Course = db.course;
const User = db.user;
const Index = db.index_course;
const Index_Content = db.content_index_course;
const ITEMS_PER_PAGE = 6; // Số lượng mục trên mỗi trang
const Question = db.question_course
const Save = db.save_course
const getAll = async (req, res) => {
  try {
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1; // Trang hiện tại từ query string, mặc định là trang 1

    const offset = (page - 1) * ITEMS_PER_PAGE;

    const courses = await Course.findAndCountAll({
      attributes: [
        "id",
        "id_user",
        "title_course",
        "description_course",
        "img_course",
        "status",
        "createdAt",
        "updatedAt",
      ],
      where: { status: status },
      order: [["id", "DESC"]],
      include: [
        { model: User, attributes: ["id", "fullname"] },
        {
          model: Index,
          attributes: ["id", "title_index", "description_index"],
          include: {
            model: Index_Content,
            attributes: [
              "id",
              "title_content",
              "description_content",
              "type",
              "link_video",
            ],
          },
        },
      ],
      offset: offset,
      limit: ITEMS_PER_PAGE,
    });

    const totalItems = courses.count;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.json({
      courses: courses.rows,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
  }
};

const getByid = async (req,res)=>{
  try {
    const id = req.params.id
    const result = await Course.findOne({where:{id},
      include: [
        { model: User, attributes: ["id", "fullname"] },
        {
          model: Index,
          attributes: ["id", "title_index", "description_index"],
          include: {
            model: Index_Content,
            attributes: [
              "id",
              "title_content",
              "description_content",
              "type",
              "link_video",
            ],
          },
        },
      ],})
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}


const getAllSave = async (req, res) => {
  try {
    const status = req.query.status;
    const page = parseInt(req.query.page) || 1; // Trang hiện tại từ query string, mặc định là trang 1
    const id =  parseInt(req.query.id)

    const offset = (page - 1) * ITEMS_PER_PAGE;

    const courses = await Save.findAndCountAll({
      attributes: [
        "id","id_user","id_course"
      ],
      order: [["id", "DESC"]],
      include: [
        { model: User, attributes: ["id", "fullname"] ,where:{id:id}}, 
        { model: Course,attributes:[ "id",
        "id_user",
        "title_course",
        "description_course",
        "img_course",
        "status",
        "createdAt",
        "updatedAt",]}
      ],
      offset: offset,
      limit: ITEMS_PER_PAGE,
    });

    const totalItems = courses.count;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.json({
      courses: courses.rows,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.log(error);
  }
};
const addCourse = async (req, res) => {
  try {
    const { id_user, title_course, description_course, img_course } = req.body;
    const exitst = await User.findByPk(id_user);
    if (exitst) {
      const course = await Course.create({
        id_user: id_user,
        title_course: title_course,
        description_course: description_course,
        img_course: img_course,
        status: true,
      });
      if (course) {
        res.status(200).json({ message: "Thêm thành công khóa học", course });
      }
    } else {
      res.status(202).json({ message: "Không tồn tại user này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_course, description_course, img_course } = req.body;
    const exits = await Course.findByPk(id);
    if (exits) {
      await exits.update({ title_course, description_course, img_course });
      res.status(200).json({ message: "Cập nhập thành công khóa học" });

    } else {
      res.status(202).json({ message: "Không tồn tại khóa học này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(202).json({ message: "Không tồn tại khóa học này" });
    }

    const exitsIndex = await Index.findAll({ where: { id_course: id } });

    await Promise.all(
      exitsIndex.map(async (element) => {
        await Index_Content.destroy({ where: { id_index: element.id } });
      })
    );
   
    await Index.destroy({ where: { id_course: id } });
    await Save.destroy({ where: { id_course: id } });
    await Question.destroy({ where: { id_course: id } });


    await course.destroy();
    res.status(200).json({ message: "Xóa thành công khóa học" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình xóa khóa học" });
  }
};


// Chỉ mục crud

const getIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await Course.findByPk(id);
    if (exits) {
      const get = await Index.findAll({ where: { id_course: id } });
      res.json(get);
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_index, description_index } = req.body;
    const exits = await Course.findByPk(id);
    if (exits) {
      const index = await Index.create({
        id_course: id,
        title_index: title_index,
        description_index: description_index,
      });
      res.status(200).json({ message: "Thêm thành công chỉ mục", index });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_index, description_index } = req.body;
    const exits = await Index.findByPk(id);
    if (exits) {
      await exits.update({
        title_index: title_index,
        description_index: description_index,
      });
      res.status(200).json({ message: "Cập nhập thành công chỉ mục" });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteIndex = async (req, res) => {
  try {
    const id = req.params.id;
    const exitsIndex = await Index.findByPk(id);
    const exitsContent = await Index_Content.findOne({
      where: { id_index: id },
    });
    if (exitsContent) {
      res.status(202).json({ message: "Không xóa được nội dung chỉ mục này" });
    } else if (exitsIndex) {
      await exitsIndex.destroy();
      res.status(200).json({ message: "Xóa thành công chỉ mục" });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

//content crud
const getContent = async (req, res) => {
  try {
    const get = await Index_Content.findAll();
    res.json(get);
  } catch (error) {
    console.log(error);
  }
};

const getbyIndex = async (req, res) => {
  try {
    const id = req.params.id
    const get = await Index_Content.findAll({where:{id_index:id}});
    res.json(get);
  } catch (error) {
    console.log(error);
  }
};

const addContent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_content, description_content, type, link_video } = req.body;
    const exits = await Index.findByPk(id);
    if (exits) {
      await Index_Content.create({
        id_index: id,
        title_content: title_content,
        description_content: description_content,
        type: type,
        link_video: link_video,
      });
      res.status(200).json({ message: "Thêm thành công nội dung" });
    } else {
      res.status(202).json({ message: "Không tồn tại chỉ mục này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateContent = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_content, description_content, link_video } = req.body;
    const exits = await Index_Content.findByPk(id);
    if (exits) {
      await exits.update({
        title_content: title_content,
        description_content: description_content,
        link_video: link_video,
      });
      res.status(200).json({ message: "Cập nhập thành công nội dung" });
    } else {
      res.status(202).json({ message: "Không tồn tại nội dung này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteContent = async (req, res) => {
  try {
    const id = req.params.id;
    const exits = await Index_Content.findByPk(id);
    if (exits) {
      exits.destroy();
      res.status(200).json({ message: "Xóa thành công nội dung" });
    } else {
      res.status(202).json({ message: "Không tồn tại nội dung này" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSave = async(req,res)=>{
  try {
    const result = await Save.findAll()
    res.json(result)
  } catch (error) {
    console.log(error)
  }
}

const handleSave = async(req,res)=>{
  try {
    const {id_course,id_user} = req.body
    const UserSave = await Save.findOne({where:{id_course:id_course,id_user:id_user}})
    if(UserSave)
    {
      const followed = await Save.destroy({where:{id_course,id_user}})
      return res.status(200).json({message:"Huỷ thành công"})

    }
    else
    {
      const followent = await Save.create({id_course,id_user})
      return res.status(200).json({message:"Lưu thành công"})
    }
  } catch (error) {
    // xuất lỗi ra trên console
    console.log(error)
  }
}

const getComment = async(req,res)=>{
  try {
    const id = req.params.id
    const result = await Question.findAll({where:{id_course:id},
      include:{
        model:User,
        attributes:['fullname','avatar']
      }})
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

const addQuestion = async(req,res)=>{
  try {
    const id = req.params.id
    const {content_question,id_user}=req.body
    const result = await Question.create({
      id_course:id,
      id_user:id_user,
      content_question:content_question
    })
    res.status(200).json({message:'Bình luận thành công'})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAll,
  addCourse,
  updateCourse,
  deleteCourse,
  getIndex,
  addIndex,
  updateIndex,
  deleteIndex,
  getContent,
  addContent,
  updateContent,
  deleteContent,
  getByid,
  getbyIndex,
  getSave,handleSave,
  getComment,addQuestion,
  getAllSave
};
