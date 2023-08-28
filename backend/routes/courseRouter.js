const express = require("express");
const {getAll,addCourse,updateCourse,deleteCourse,getByid,getAllSave,
    getIndex,addIndex,updateIndex,deleteIndex,getbyIndex,addQuestion,
    getContent,addContent,updateContent,deleteContent  ,getSave,handleSave,getComment} = require("../Controller/CourseController")
const routerCourse = express.Router();

routerCourse.get('/api/course/get',getAll)
routerCourse.get('/api/course/get/:id',getByid)
routerCourse.post('/api/course/add',addCourse)
routerCourse.put('/api/course/update/:id',updateCourse)
routerCourse.delete('/api/course/delete/:id',deleteCourse)
routerCourse.get('/api/course/getbysave',getAllSave)

routerCourse.get('/api/course/index/get/:id', getIndex)
routerCourse.post('/api/course/index/add/:id',addIndex)
routerCourse.put('/api/course/index/update/:id',updateIndex)
routerCourse.delete('/api/course/index/delete/:id',deleteIndex)

routerCourse.get('/api/course/index/content/get',getContent)
routerCourse.get('/api/course/index/content/get/:id',getbyIndex)
routerCourse.post('/api/course/index/content/add/:id',addContent)
routerCourse.put('/api/course/index/content/update/:id',updateContent)
routerCourse.delete('/api/course/index/content/delete/:id',deleteContent)

routerCourse.get('/api/course/save/get',getSave)
routerCourse.post('/api/course/save/handle',handleSave)

routerCourse.get('/api/course/question/get/:id',getComment)
routerCourse.post('/api/course/question/add/:id',addQuestion)

module.exports = {
    routerCourse
}