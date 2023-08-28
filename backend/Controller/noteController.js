const db = require("../models"); // gọi về model
const Note = db.note;
const User = db.user;
const Note_img = db.note_img;
const ITEMS_PER_PAGE = 20; // Số lượng mục trên mỗi trang

// hàm xử lý lấy ra danh sách note
const getNote = async (req, res) => {
  try {
    // const note = await Note.findAll();
    // res.status(200).json(note);
    const page = parseInt(req.query.page) || 1; // Trang hiện tại từ query string, mặc định là trang 1
    const iduser = req.query.id;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const note = await Note.findAndCountAll({
      attributes: ["id", "title_note", "content_note",'createdAt'],
      where:{id_user:iduser},
      order: [["id", "DESC"]],
      include: [
        { model: User, attributes: ["id", "fullname"] },
        { model: Note_img, attributes: ["id", "img_url", "img_name"] },
      ],
      offset: offset,
      limit: ITEMS_PER_PAGE,
    });
    const totalItems = note.count;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.json({
      note: note.rows,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý thêm note
const addNote = async (req, res) => {
  try {
    const { title_note, content_note, id_user } = req.body;
    const exsitUser = await User.findByPk(id_user);
    const existNote = await Note.findOne({
      where: { title_note: title_note },
    });
    if (exsitUser) {
      if (existNote) {
        res.status(202).json({ message: "Ghi chú đã tồn tại" });
      } else {
        await Note.create({
          title_note: title_note,
          content_note: content_note,
          id_user: id_user,
        });
        res.status(200).json({ message: "Tạo ghi chú thành công" });
      }
    } else {
      res.status(202).json({ message: "Tạo ghi chú thất bại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý update note
const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title_note, content_note } = req.body;

    const existNote = await Note.findByPk(id);
    const exist = await Note.findOne({
      where: { title_note: title_note },
    });
    if (exist && exist.id !== existNote.id) {
      res.status(202).json({ message: "Tiêu đề ghi chú bị trùng lặp" });
    } else {
      if (existNote) {
        (existNote.title_note = title_note),
          (existNote.content_note = content_note);
        await existNote.save();
        res.status(200).json({ message: "Cập nhật ghi chú thành công" });
      } else {
        res.status(202).json({ message: "Ghi chú không tồn tại" });
      }
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

// hàm xử lý delete note
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const existNote = await Note.findByPk(id);
    if (existNote) {
      await existNote.destroy();
      res.status(200).json({ message: "Xóa ghi chú thành công" });
    } else {
      res.status(202).json({ message: "Ghi chú không tồn tại" });
    }
  } catch (error) {
    // trả thông báo lỗi về console
    console.log(error);
  }
};

module.exports = {
  getNote,
  addNote,
  updateNote,
  deleteNote,
};
