//新建目录的js
const fs=require('fs')
const path=require('path')

exports.mkdirs=function(pathname,callback){
	//判断是否是绝对路径
	pathname=path.isAbsolute(pathname) ? pathname : path.join(__dirname,pathname)
	//获取绝对路径
	pathname=path.relative(__dirname,pathname)
	let floders=pathname.split(path.sep)
	let pre='';
	floders.forEach(floder => {
		try{
			//没有异常，文件创建并提示
			let _stat =fs.statSync(path.join(__dirname,pre,floder));
			let hasMkdir=_stat && _stat.isDirectory();
			if(hasMkdir){
				callback
			}
		}catch(error){
			//抛出异常，不创建文件
			try{
				fs.mkdirSync(path.join(__dirname,pre,floder))
				callback && callback(null)
			}catch(error){
				callback && callback(error)
			}
		}
		//路径拼接
		pre=path.join(pre,floder);
	})
}