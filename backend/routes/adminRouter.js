const express = require("express");
const { getTag, addTag, check_tag, updateTag, deleteTag,
    check_blog, check_course,
    getRole, addRole, updateRole, deleteRole,
    changeRole, getUR ,deleteUR, getUByRole,
    getBanner, addBanner, updateBanner, deleteBanner} = require("../Controller/adminController")
const routerAdmin = express.Router();

routerAdmin.get('/api/tag/get', getTag);
routerAdmin.put('/api/tag/check/:id', check_tag);
routerAdmin.post('/api/tag/add', addTag);
routerAdmin.put('/api/tag/update/:id', updateTag);
routerAdmin.delete('/api/tag/delete/:id', deleteTag);

routerAdmin.put('/api/blog/check/:id',check_blog)

routerAdmin.put('/api/course/check/:id',check_course)

routerAdmin.get('/api/role/get',getRole)
routerAdmin.post('/api/role/add',addRole)
routerAdmin.put('/api/role/update/:id',updateRole)
routerAdmin.delete('/api/role/delete/:id',deleteRole)

routerAdmin.get('/api/roleuser/get',getUR);
routerAdmin.put('/api/roleuser/change',changeRole);
routerAdmin.delete('/api/roleuser/delete/:id',deleteUR)

routerAdmin.get('/api/banner/get',getBanner);
routerAdmin.post('/api/banner/add',addBanner);
routerAdmin.put('/api/banner/update/:id',updateBanner);
routerAdmin.delete('/api/banner/delete/:id',deleteBanner)

routerAdmin.post('/api/user/getByRole/:id',getUByRole);
module.exports = {
    routerAdmin
}