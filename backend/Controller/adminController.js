// CRUD Tags - Duyện blogs - Duyệt tags - Duyệt course - CRUD banner - Các function Thống kê - CRUD role - user role
const db = require("../models");
const Tag = db.tag;
const Blog = db.blog
const Course = db.course
const Role = db.role
const User_role = db.user_role
const Banner = db.banner
const User = db.user
const fs = require("fs"); // package thao tác vs file 
const multer = require("multer"); // package sử dụng để thao tác upload file
// Được sử dụng để lưu trữ các tệp được tải lên trong thư mục uploads.
const ITEMS_PER_PAGE = 5; // Số lượng mục trên mỗi trang

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
// CRUD tags
const getTag = async (req, res) => {
    try {
        const tag = await Tag.findAll();
        res.json(tag)
    } catch (error) {
        console.log(error)
    }
}
const addTag = async (req, res) => {
    try {
        const { nametag } = req.body
        const exits = await Tag.findOne({ where: { nametag } });
        if (exits) {
            res.status(202).json({ message: 'Tồn tại tag này trong hệ thống' })
        }
        else {
            await Tag.create({ nametag: nametag, status: false })
            res.status(200).json({ message: 'Thêm thành công' })
        }
    } catch (error) {
        console.log(error)
    }
}
const check_tag = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await Tag.findByPk(id);
        if (exits) {
            exits.status = true
            await exits.save();
            res.status(200).json({ message: 'Duyệt thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại tag này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateTag = async (req, res) => {
    try {
        const id = req.params.id;
        const { nametag } = req.body
        const exits = await Tag.findByPk(id);
        if (exits) {
            exits.nametag = nametag
            await exits.save();
            res.status(200).json({ message: 'Cập nhập thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại tag này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteTag = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await Tag.findByPk(id);
        const exitsBlog = await Blog.findOne({ where: { id_tag: id } })
        if (exitsBlog) {
            res.status(202).json({ message: 'Tag đang dùng bởi blog, không thể cập nhập' })
        }
        if (exits) {

            await exits.destroy();
            res.status(200).json({ message: 'Xóa thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại tag này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

//  Duyện blogs
const check_blog = async (req, res) => {
    try {
        const id = req.params.id
        const exits = await Blog.findByPk(id)
        if (exits) {
            exits.status = true
            await exits.save()
            res.status(200).json({ message: 'Duyệt thành công' })

        }
        else {
            res.status(202).json({ message: 'Không tồn tại blog này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

//  Duyện course
const check_course = async (req, res) => {
    try {
        const id = req.params.id
        const exits = await Course.findByPk(id)
        if (exits) {
            exits.status = true
            await exits.save()
            res.status(200).json({ message: 'Duyệt thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại khóa học này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

// CRUD role 
const getRole = async (req, res) => {
    try {
        const role = await Role.findAll();
        res.json(role)
    } catch (error) {
        console.log(error)
    }
}

const addRole = async (req, res) => {
    try {
        const { name_role } = req.body
        const exits = await Role.findOne({ where: { name_role } })
        if (exits) {
            res.status(202).json({ message: "Tồn tại role này" })
        }
        else {
            await Role.create({ name_role });
            res.status(200).json({ message: 'Thêm thành công role' })
        }
    } catch (error) {
        console.log(error)
    }
}

const updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { name_role } = req.body
        const exits = await Role.findByPk(id);
        const exitsUsed = await User_role.findOne({ where: { id_role: id } })
        if (exitsUsed) {
            res.status(202).json({ message: 'Role đang được dùng ,không thể cập nhập' })
        }
        if (exits) {
            exits.name_role = name_role
            await exits.save();
            res.status(200).json({ message: 'Cập nhập thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await Role.findByPk(id);
        const exitsUsed = await User_role.findOne({ where: { id_role: id } })
        if (exitsUsed) {
            res.status(202).json({ message: 'Role đang được dùng ,không thể cập nhập' })
        }
        if (exits) {
            await exits.destroy()
            res.status(200).json({ message: 'Xóa thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

// change role
const changeRole = async (req, res) => {
    try {
        const { id_role, id_user,id_ur } = req.body
        const exits = await User_role.findByPk(id_ur)
       
        if (exits) {
            exits.id_role = id_role
            exits.id_user = id_user
            exits.save()
            res.status(200).json({ message: 'Cập nhập thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại user role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}

const getUR = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại từ query string, mặc định là trang 1

        const offset = (page - 1) * ITEMS_PER_PAGE;
        const UR = await User_role.findAndCountAll({
            include: [
                {
                    model: Role,
                    attributes:['name_role','id'],
                    
                },
                {
                    model: User,
                    attributes: ['id', 'fullname']
                }
            ],
            offset: offset,
            limit: ITEMS_PER_PAGE,
        });
    
        const totalItems = UR.count;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        res.json({
            UR: UR.rows,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.log(error)
    }
}
const deleteUR = async (req, res) => {
    try {
        const id = req.params.id;
        const exits = await User_role.findByPk(id)
        if (exits) {
            await exits.destroy()
            res.status(200).json({ message: 'Xóa thành công' })
        }
        else {
            res.status(202).json({ message: 'Không tồn tại role này trong hệ thống' })
        }
    } catch (error) {
        console.log(error)
    }
}
const getUByRole = async(req,res)=>
{
try {
    const id = req.params.id;
    const get = await User.findAll({
        include: [{
          model: User_role,
          where: { id_role: id }
        }]
      });
     
    res.json(get);
} catch (error) {
    console.log(error)
}
}
const getBanner = async (req, res) => {
    try {
        const get = await Banner.findAll()
        res.json(get)
    } catch (error) {
        console.log(error)

    }
}

const addBanner = async (req, res) => {
    try {
        try {
            upload.single("avatar")(req, res, async function (err) {
                const { title_banner } = req.body
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ message: err.message });
                } else if (err) {
                    return res.status(400).json({ message: err.message });
                }
                // Kiểm tra nếu có file ảnh mới được chọn
                if (req.file) {
                    const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename
                        }`;
                    await Banner.create({title_banner: title_banner ,img_url: imageUrl, img_name: req.file.filename})
                    res.status(200).json({ message: "Thêm thành công" })
                }
            });
        } catch (error) {
            // xuất lỗi ra trên console
            console.log(error)
        }
    } catch (error) {
        console.log(error)

    }
}

const updateBanner = async (req, res) => {
    try {  
        upload.single("avatar")(req, res, async function (err) {
            const { title_banner } = req.body
            const id = req.params.id;
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }

            const Ubanner = await Banner.findByPk(id);
            // Kiểm tra nếu có file ảnh mới được chọn
            if (req.file) {
                const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                const imagePath = `./uploads/${Ubanner.img_name}`;
                deleteFile(imagePath);
                await Ubanner.update({ title_banner: title_banner, img_url: imageUrl, img_name: req.file.filename })
            } else {
                await Ubanner.update({ title_banner: title_banner });
            }
            return res.status(200).json({ message: `Cập nhật thành công ` });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await Banner.findByPk(id)

        if (banner.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy' });
        }
        const imagePath = `./uploads/${banner.img_name}`;
        deleteFile(imagePath);
        await banner.destroy();
        return res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Xóa thất bại' });
    }
}
module.exports = {
    getTag, addTag, check_tag, updateTag, deleteTag,
    check_blog, check_course, getRole, addRole, updateRole,
    deleteRole, changeRole, getUR, deleteUR,getUByRole,
    getBanner, addBanner, updateBanner, deleteBanner
}