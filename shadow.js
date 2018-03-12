


	function shadow(id,speed){
			
			new Meng(id,speed);
		}
	

	function Meng(id,speed){
		//获取基本的操作盒子和对应的蒙版阴影
		
		this.box = document.getElementById(id);
		this.speed = speed/(parseInt(getStyle(this.box,"width"))/10);
		// alert(getStyle(this.box,"width"))
		this.box.style.position = "relative";
		this.box.style.overflow = "hidden";
		this.shadow = document.createElement("p");
		this.shadow.style.position = "absolute";
		this.shadow.style.width = getStyle(this.box,"width") ;
		this.shadow.style.height = getStyle(this.box,"height");
		this.shadow.style.left= getStyle(this.box,"width");
		this.shadow.style.top = getStyle(this.box,"height");
		this.shadow.style.background = "yellow";
		this.box.appendChild(this.shadow)

		var _this =  this;
		//盒子的鼠标滑入事件
		this.box.onmouseenter = function(ev){

			_this.selectWay(ev)
		}
		//划出事件
		this.box.onmouseleave = function(ev){
			_this.leaveWay(ev)
		}
	}
	// scrollleft指元素到body标签的距离

Meng.prototype.selectWay = function(ev){
	//定义判断哪个方向进入的条件，该值在对应的方向上进入数值最小
	this.inover = true;
	this.outover = true;
	var _this = this;
	
	this.leftInJudge =Math.abs(ev.offsetX);
	this.rightInJudeg = Math.abs(0-(ev.pageX-this.box.offsetLeft-parseInt(getStyle(this.box,"width"))));
	this.topInJudge = Math.abs(ev.offsetY);
	this.bottomInJudge =Math.abs(0-(ev.pageY-this.box.offsetTop-parseInt(getStyle(this.box,"height"))));
	
	//创建一个数组把上面的值放进去，我们后面要多次使用比较
	this.JudgeArr = [];
	this.JudgeArr.push(this.leftInJudge)
	this.JudgeArr.push(this.rightInJudeg)
	this.JudgeArr.push(this.topInJudge)
	this.JudgeArr.push(this.bottomInJudge)
	//第一个值小于其他所有值，那么即判断为从左边进入的\

	if(this.JudgeArr[0]<this.JudgeArr[1] && this.JudgeArr[0]<this.JudgeArr[2] && this.JudgeArr[0]<this.JudgeArr[3] ){

		this.setandGo("left")
	}
	if(this.JudgeArr[1]<this.JudgeArr[0] && this.JudgeArr[1]<this.JudgeArr[2] && this.JudgeArr[1]<this.JudgeArr[3] ){
		this.setandGo("right")
	}
	if(this.JudgeArr[2]<this.JudgeArr[0] && this.JudgeArr[2]<this.JudgeArr[1] && this.JudgeArr[2]<this.JudgeArr[3] ){
		this.setandGo("top")
	}
	if(this.JudgeArr[3]<this.JudgeArr[1] && this.JudgeArr[3]<this.JudgeArr[2] && this.JudgeArr[3]<this.JudgeArr[0] ){

		this.setandGo("bottom")
	}

}


//这个是进入盒子时设置的阴影移动效果，通过判断参数，来确定对应的方位
	Meng.prototype.setandGo = function(direction){
		switch (direction){
			case "left":{
				clearInterval(this.timer1);
				var _this = this;
				this.leftnum = -parseInt(getStyle(this.box,"width"));
				this.topnum = 0;
				// 如果移出结束了才可以执行移入动画
				var timer2 = setInterval(function(){
					
				},100)
				if(_this.outover){
					// 开始执行动画便把inover设置为false这样移出时移出动画不会执行，因为它为移出动画的执行条件
					_this.inover = false;
					_this.timer1 = setInterval(function(){
					_this.leftnum+=10; 
					if(_this.leftnum>=0){
						_this.inover = true;
						clearInterval(_this.timer1);
					}
				_this.shadow.style.left = _this.leftnum + "px";
				_this.shadow.style.top = _this.topnum + 'px';
				},_this.speed)
				}

				break;
			}
			case "right":{
				var _this = this;
				clearInterval(this.timer1);
				this.leftnum =parseInt(getStyle(this.box,"width"));
				this.topnum = 0;
				if(_this.outover){
					_this.inover = false;
				this.timer1 = setInterval(function(){
					_this.leftnum-=10;
					if(_this.leftnum<=0){
						_this.inover = true;
						clearInterval(_this.timer1);
					}
				_this.shadow.style.left = _this.leftnum + "px";
				_this.shadow.style.top = _this.topnum + 'px';
				},_this.speed)
			}
				break;
			}
			case "top":{
				var _this = this;
				this.leftnum=  0;
				clearInterval(this.timer1);
				this.topnum = -parseInt(getStyle(this.box,"height"));
				if(_this.outover){


					_this.inover = false;

				this.timer1 = setInterval(function(){
					_this.topnum+=10;
					if(_this.topnum>=0){
						_this.inover = true;
						clearInterval(_this.timer1);
					}
				_this.shadow.style.top = _this.topnum + "px";
				_this.shadow.style.left = _this.leftnum + "px";
				},_this.speed)
				}
				break;
			}


			case "bottom":{
				var _this = this;

				this.leftnum=  0;
				this.topnum =parseInt(getStyle(this.box,"height"));
				clearInterval(this.timer1);
				this.timer1 = setInterval(function(){
					//进入动画完了为false
					if(_this.outover){


					_this.inover = false;

					_this.topnum-=10;
					if(_this.topnum<=0){
						//到了临界点，进入动画完了为true
						_this.inover = true;
						clearInterval(_this.timer1);
					}
				_this.shadow.style.top = _this.topnum + "px";
				_this.shadow.style.left = _this.leftnum + "px";
					}
				},_this.speed)

				
				break;
			}
		}
		
	}




//鼠标滑出时的函数，同样是在重新获取一个值，这个值在它对应的方向上滑出时，才是最小，
Meng.prototype.leaveWay =  function(ev){
	//以下同上结构相同
	this.leftInJudge =Math.abs(ev.offsetX);
	this.rightInJudeg = Math.abs(ev.pageX-parseInt(getStyle(this.box,"width"))-this.box.offsetLeft);
	this.topInJudge = Math.abs(ev.offsetY);
	this.bottomInJudge = Math.abs(ev.pageY-parseInt(getStyle(this.box,"height"))-this.box.offsetTop);
	this.JudgeArr = [];
	this.JudgeArr.push(this.leftInJudge)
	this.JudgeArr.push(this.rightInJudeg)
	this.JudgeArr.push(this.topInJudge)
	this.JudgeArr.push(this.bottomInJudge)



	//从左滑出
	if(this.JudgeArr[0]<this.JudgeArr[1] && this.JudgeArr[0]<this.JudgeArr[2] && this.JudgeArr[0]<this.JudgeArr[3] ){
		//当从左边滑出时清掉滑入定时器，一个在加，一个在减

		
		var _this = this;
		//临界（消失）点时盒子负盒子宽度
		
		var getWidthF =-parseInt(getStyle(this.box,"width"));
		clearInterval(this.timer2);
		this.timer2 = setInterval(function(){
			// _this.outover =false;
			//因为当我们鼠标移出的时候移入动画不一定会完成，所以移出之后用一个及时器时时监听这个inover，如果
			// 完成了那么开始我们的移出动画
			if(_this.inover){
				_this.outover = false;
			_this.topnum = 0;
			// clearInterval(this.timer1)
		// clearInterval(this.timer2)
			_this.leftnum-=10;
			if(_this.leftnum <= getWidthF){
				_this.outover = true ;
				clearInterval(_this.timer2);
			}
			_this.shadow.style.left = _this.leftnum +"px";
			_this.shadow.style.top = _this.topnum;
			}
		},_this.speed)
		
	}





	//从右滑出
	if(this.JudgeArr[1]<this.JudgeArr[0] && this.JudgeArr[1]<this.JudgeArr[2] && this.JudgeArr[1]<this.JudgeArr[3] ){
		
		var _this = this;
		clearInterval(this.timer2);
		//临界（消失）点时盒子盒子宽度
		var getWidth =parseInt(getStyle(this.box,"width"));
		this.timer2 = setInterval(function(){
			if(_this.inover){
				_this.outover = false;
				_this.topnum = 0;
		// 		clearInterval(this.timer1)
		// clearInterval(this.timer2)
			_this.leftnum+=10;
			
			if(_this.leftnum >= getWidth){
				_this.outover = true;
				clearInterval(_this.timer2);

			}
			_this.shadow.style.left = _this.leftnum +"px";
			_this.shadow.style.top = _this.topnum;
			}
		},_this.speed)
	}
	//从上滑出
	if(this.JudgeArr[2]<this.JudgeArr[0] && this.JudgeArr[2]<this.JudgeArr[1] && this.JudgeArr[2]<this.JudgeArr[3] ){
		
		

		var _this = this;
		clearInterval(this.timer2);
		//临界（消失）点时盒子负盒子高度
		var getHeightF =-parseInt(getStyle(this.box,"height"));
		this.timer2 = setInterval(function(){

			if(_this.inover){
				_this.outover = false;
				this.leftnum = 0;
		// 		clearInterval(_this.timer1)
		// clearInterval(_this.timer2)
			_this.topnum-=10;
			
			if(_this.topnum <= getHeightF){
				_this.outover = true;
				clearInterval(_this.timer2);

			}
			_this.shadow.style.top = _this.topnum +"px";
			_this.shadow.style.left = _this.leftnum +"px";
			}
		},_this.speed)
		
	}
	//从下滑出
	if(this.JudgeArr[3]<this.JudgeArr[1] && this.JudgeArr[3]<this.JudgeArr[2] && this.JudgeArr[3]<this.JudgeArr[0] ){
	
		
		var _this = this;
		clearInterval(this.timer2);
		//临界（消失）点时盒子盒子高度
		var getHeight =parseInt(getStyle(this.box,"height"));
		this.timer2 = setInterval(function(){
			if(_this.inover){
				// clearInterval(this.timer1)
		// clearInterval(this.timer2)
			_this.outover = false;
			_this.leftnum = 0;
			_this.topnum+=10;
			
			if(_this.topnum >= getHeight){
				_this.outover = true;
				clearInterval(_this.timer2);

			}
			_this.shadow.style.top = _this.topnum +"px";
			_this.shadow.style.left = _this.leftnum +"px";
			}
		},_this.speed)
	}
}



	function getStyle(ele,styler){

			return window.getComputedStyle(ele,null)[styler]
	}





