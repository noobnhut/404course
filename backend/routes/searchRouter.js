const express =require("express") ;
const {
    searchUser,
    searchBlog,
    searchCourse
}=require("../Controller/searchController")
const routerSearch = express.Router();
routerSearch.get("/api/user/search",searchUser);
routerSearch.get("/api/blog/search",searchBlog)
routerSearch.get("/api/course/search",searchCourse)
module.exports = {
    routerSearch
}