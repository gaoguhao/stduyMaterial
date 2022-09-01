import {reactive} from 'vue';
let tempBox=0;
let tempBoxId=0;
let tempfocusId='box0_0';
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
	console.log(e)
	switch (e){
		case 22:
		case 39:
		keychanges.move_right(focus_name);
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

const keychanges=reactive({
		move_right:function(focus_name){
			
		},
		changeMoveRight:function(value){
			this.move_right=value;
			console.log(this.move_right())
		}
	});

export default {tempBox,tempBoxId,tempfocusId,keychanges}