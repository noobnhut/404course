const { Sequelize } =require("sequelize");
const sequelize = new Sequelize("404course","root",null,{
  host:"localhost", 
  dialect:"mysql",
  logging: false,
})
/*
hostname :files.000webhost.com,
port:21,
username:404learn,
password:404learn123+N
nma
*/

const ConnectDatabase = async()=>{
  try {
    await sequelize.authenticate();
    console.log("đã kết nối với database.");
  } catch (error) {
    console.error("kết nối thất bại", error);
  }
}
ConnectDatabase()