const express = require("express");
const { 
    chartCoursePoint,
    chartBlog,
    chartBlogByUser,
    chartCourseBySave,
    chartUserByRole,
} = require("../Controller/statisticalController")
const routerStatistcal = express.Router();
routerStatistcal.get('/api/chart/coursepoint',chartCoursePoint)
routerStatistcal.get('/api/chart/chartCourseBySave',chartCourseBySave)
routerStatistcal.get('/api/chart/chartBlog',chartBlog)
routerStatistcal.get('/api/chart/chartBlogByUser',chartBlogByUser)
routerStatistcal.get('/api/chart/chartUserByRole',chartUserByRole)


module.exports = {
    routerStatistcal
}
