//存取文件的路由
var multer=require('multer')
var mkdir=require('../config/mkdir.js')
//控制文件的存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
	let url =req.body.url  
	mkdir.mkdirs('../data/'+url,err =>{
		console.log(err)
	})
    cb(null, './data/'+url)
  },
  filename: function (req, file, cb) {
	let name=req.body.name
	//正则表达式输出图片格式
	let type=file.originalname.replace(/.+\./,".")
	console.log(type)
    cb(null,name+Date.now()+type)
  }
})
 
var upload = multer({ storage: storage })
module.exports=function(app){
	app.post('/file/chatImg', upload.array('file', 9), function (req, res, next) {
		let data=req.files[0].filename	
		res.send(data)
	})
}
