//验证身份
//引入token
const jwt=require('jsonwebtoken');
const secret='YGHS_WHA';
//生成token
exports.indentityToken=function(e){
	let payload={data:e};
	let token=jwt.sign(payload,secret,{expiresIn:60*60*1000*24})
	return token;
}
//解码token
exports.verifyToken=function(e){
	let payload=jwt.verify(e,secret);
	return payload;
}