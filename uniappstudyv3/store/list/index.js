import {reactive} from 'vue';
let tempBox=0;
let tempBoxId=0;
let tempfocusId='box0_0';
let tempNav="box0_0";
// #ifdef APP
	plus.key.addEventListener('keydown',event=>{
		let keyCode=event.keyCode;
		keyChange(keyCode)
	},false);
// #endif

// #ifndef APP
	window.document.onkeydown = function(evt) {
		 evt = evt || window.event||arguments.callee.caller.arguments[0];
		 var keyCode = evt.which || evt.keyCode;
		 keyChange(keyCode)
	}
// #endif
function keyChange(e){
	let focus_name= tempfocusId;
	//console.log(e)
	switch (e){
		case 22:
		case 39:
		move_right(focus_name);
			break;
		case 21:
		case 37:
		move_left(focus_name);
			break;
		case 20:
		case 40:
		move_down(focus_name);
			break;
		case 19:
		case 38:
		move_up(focus_name);
			break;
		case 13:
		case 66:
		move_entity(focus_name);
			break;		
		default:
			break;
	}
}

const list={
	state:reactive({
		focusId:"box1_0",
		boxId:0,
		box:1,
		indexNum:0,
		rightTop:0,
		navdatas:[{
			tittle:'浩瀚文学',
			selected:false,
			stated:0,
			focused:false,
			},
			{
			tittle:'启蒙儿歌',
			selected:true,
			stated:2,
			focused:false,
			},
			{
			tittle:'英文经典',
			selected:false,
			stated:1,
			focused:false,
			}],
		lists: [{
				url: '/static/c1.png',
				text: 'Grid 1',
				badge: '0',
				type: "primary"
			},
			{
				url: '/static/c2.png',
				text: 'Grid 2',
				badge: '1',
				type: "success"
			},
			{
				url: '/static/c3.png',
				text: 'Grid 3',
				badge: '99',
				type: "warning"
			},
			{
				url: '/static/c4.png',
				text: 'Grid 4',
				badge: '2',
				type: "error"
			},
			{
				url: '/static/c5.png',
				text: 'Grid 5'
			},
			{
				url: '/static/c6.png',
				text: 'Grid 6'
			},
			{
				url: '/static/c7.png',
				text: 'Grid 7'
			},
			{
				url: '/static/c8.png',
				text: 'Grid 8'
			},
			{
				url: '/static/c9.png',
				text: 'Grid 9'
			}
		]
	}),
	updateIndexNum:function(value){
		this.state.indexNum=value;
	},
	changeState:function(values){
		this.state.nowIndex=values;
	},
	sortNavdatas:function(){
		let temp=this.state.navdatas.sort((a,b)=>{return a.stated-b.stated});
		console.log(temp)
	},
	updateFocusId:function(values){
		this.state.focusId=values
	},
	updateBox:function(values){
		this.state.box=values
	},
	updateBoxId:function(values){
		this.state.boxId=values
	},
	//获取当前光标
	changeboxs:function(focus_name){
		tempBox = parseInt(focus_name.split("_")[0].match(/\d+/g));
		tempBoxId = parseInt(focus_name.split("_")[1]);
		//console.log(tempBoxId)
		this.updateBox(tempBox);
		this.updateBoxId(tempBoxId);
	},
	go_position: function(num, mobile, pos) {
		//console.log("num="+num+",mobile="+mobile)
		if(mobile == "left" || mobile == "right"){
			tempBoxId = mobile == "right" ? (tempBoxId + num) : (tempBoxId - num);
		}else if(mobile == "up" || mobile == "down") {
			tempBox = mobile == "down" ? (tempBox + num) : (tempBox - num);
			tempBoxId = pos;
		}
		tempfocusId = "box" + tempBox + "_" + tempBoxId;
		this.updateBox(tempBox);
		this.updateBoxId(tempBoxId);
		this.updateFocusId(tempfocusId);
		//console.log("tempBox="+tempBox+",tempBoxId="+tempBoxId+",tempfocusId="+tempfocusId)
	},
	focusInit:function(values){
		tempfocusId=values;
		this.changeboxs(values);
		tempNav="box0_"+this.state.indexNum;
	},
	changeRightTop:function(value){
		this.state.rightTop=value;
	}
}

function move_right(focus_name){
	//console.log(focus_name)
	list.changeboxs(focus_name);
	if(tempBox==0){
		list.go_position(1,"down",0);
	}else if(tempBox==1){
		if(tempBoxId<list.state.lists.length-1&&(tempBoxId+1)%4!=0){
			list.go_position(1,"right");
		}
	}
}

function move_left(focus_name){
	list.changeboxs(focus_name);
	if(tempBox==1){
		if(tempBoxId>0&&tempBoxId%4!=0){
			list.go_position(1,"left");
		}else{
			list.go_position(1,"up",0);
		}
	}
}

function move_up(focus_name){
	list.changeboxs(focus_name);
	if(tempBox==0&&tempBoxId>0){
		list.go_position(1,"left");
	}else if(tempBox==1){
		if(tempBoxId>3){
			console.log(tempBoxId)
			
			if(tempBoxId==list.state.lists.length-1){
				let tempTop=0;
				// #ifndef H5
				tempTop=list.state.rightTop+(750/1920*420)
				// #endif
				
				// #ifdef H5
					tempTop=list.state.rightTop+(1920/1920*420)
				// #endif
				list.changeRightTop(tempTop)
			}
			list.go_position(4,"left");
		}
	}
}

function move_down(focus_name){
	list.changeboxs(focus_name);
	if(tempBox==0&&tempBoxId<list.state.navdatas.length-1){
		list.go_position(1,"right");
	}else if(tempBox==1){
		if(tempBoxId<list.state.lists.length-1){
			if(tempBoxId+4<list.state.lists.length-1){
				list.go_position(4,"right");
			}else{
				let tempTop=0;
				// #ifndef H5
				tempTop=list.state.rightTop-(750/1920*420)
				// #endif
				
				// #ifdef H5
					tempTop=list.state.rightTop-(1920/1920*420)
				// #endif
				list.changeRightTop(tempTop)
				list.go_position(0,"down",list.state.lists.length-1);
			}	
		}
	}
}
function move_entity(focus_name){
	list.changeboxs(focus_name);
	if(tempBox==0){
		list.state.navdatas[tempNav.split('_')[1]].selected=false;
		list.state.navdatas[tempBoxId].selected=true;
		tempNav=focus_name;
		//list.go_position(1,"right");
		list.updateIndexNum(tempBoxId);
		console.log(list.state.navdatas)
	}
}
export default list;