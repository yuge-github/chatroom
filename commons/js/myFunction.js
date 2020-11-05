export default{
	//首页时间转换
	dateTime(date){	
		let old=new Date(date);
		let now=new Date();
		//获取具体时间
		let y=old.getFullYear()
		let m=old.getMonth()+1
		let d=old.getDate()
		let h=old.getHours()
		let mm=old.getMinutes()
		let s=old.getSeconds()
		
		let ny=now.getFullYear()
		let nm=now.getMonth()+1
		let nd=now.getDate()
		let nh=now.getHours()
		let nmm=now.getMinutes()
		let ns=now.getSeconds()
		//比较两个时间
		if(y==ny && m==nm && d==nd){
			if(h<10){
				h=+h;
			}
			if(nmm<10){
				mm='0'+mm;
			}
			
			return h+':'+mm
		}
		else if(y==ny && m==nm && d+1==nd){
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}		
			if(s<10){
				s='0'+s
			}
			return '昨天'+h+':'+mm
		}
		else if(y==y && m==m && d+2==d){
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}		
			return "前天"+h+':'+mm
		}
		else{
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}
			return `${y}-${m}-${d} ${h}:${mm}`
		}
	},
	chatTime(date){
		let old=new Date(date);
		let now=new Date();
		//获取具体时间
		let y=old.getFullYear()
		let m=old.getMonth()+1
		let d=old.getDate()
		let h=old.getHours()
		let mm=old.getMinutes()
		let s=old.getSeconds()
			
		let ny=now.getFullYear()
		let nm=now.getMonth()+1
		let nd=now.getDate()
		let nh=now.getHours()
		let nmm=now.getMinutes()
		let ns=now.getSeconds()
		//比较两个时间
		if(y==ny && m==nm && d==nd){
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}
			
			return h+':'+mm
		}
		else if(y==ny && m==nm && d+1==nd){
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}		
			if(s<10){
				s='0'+s
			}
			return '昨天'+h+':'+mm
		}
		else if(y==ny && m==nm && d+2==nd){
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}		
			return "前天"+h+':'+mm
		}
		else if(y!==ny){
			if(h<10){
				h='0'+h;
			}
			if(mm<10){
				mm='0'+mm;
			}
			return `${y}年${m}月${d}日 ${h}:${mm}`
		}else{
			return `${m}月${d}日 ${h}:${mm}`
		}
	},
	//间隔时间
	spaceTime(old,now){
		let oldT=new Date(old)
		let nowT=new Date(now)
		var oldTime=oldT.getTime()
		var nowTime=nowT.getTime()
		if(oldTime<(nowTime-1000*60*5)){
			// console.log(nowTime,oldTime)
			return nowT
		}else{
			// console.log(nowTime,oldTime)
			return ''
		}
	},
	
	backOne:function(){
		uni.navigateBack({
			delta:1
		});
	},

}