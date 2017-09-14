//alert("myFlappyBird.js");

var 

s_bird,
s_bg,
s_fg,
s_pipeNorth,
s_pipeSouth,
s_text,
s_score,//mission fail
s_score2,//mission success
s_splash,
s_buttons,
s_numberS,
s_numberB;


function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
};

//向Sprite类里添加方法draw
Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width, this.height);
};


//初始化Sprites,设置各个对象，找到在图上的相对位置
function initSprites(img) {

	//数值都被*2，*2后是图片实际的大小

	//bird是动画，所以用array
	s_bird = [
		new Sprite(img, 156, 115, 17, 12),
		new Sprite(img, 156, 128, 17, 12),
		new Sprite(img, 156, 141, 17, 12)
	];
	
	s_bg = new Sprite(img, 0, 0, 138, 114);
	s_bg.color = "#70C5CF";
	s_fg = new Sprite(img, 138, 0, 112,  56);
	
	s_pipeNorth = new Sprite(img, 251, 0, 26, 200);
	s_pipeSouth = new Sprite(img, 277, 0, 26, 200);
	
	s_text = {
		FlappyBird: new Sprite(img, 59, 114, 96, 22),
		GameOver:   new Sprite(img, 59, 136, 94, 19),
		GetReady:   new Sprite(img, 59, 155, 87, 22)
	}
	s_buttons = {
		Rate:  new Sprite(img,  79, 177, 40, 14),
		Menu:  new Sprite(img, 119, 177, 40, 14),
		Share: new Sprite(img, 159, 177, 40, 14),
		Score: new Sprite(img,  79, 191, 40, 14),
		Ok:    new Sprite(img, 119, 191, 40, 14),
		Start: new Sprite(img, 159, 191, 40, 14)
	}

	s_score  = new Sprite(img, 138,  56, 113, 58);//积分板fail
	s_score2 = new Sprite(img, 138,  206, 113, 58);//积分板success
	s_splash = new Sprite(img,   0, 114,  59, 49);

	s_numberS = new Sprite(img, 0, 177, 6,  7);
	s_numberB = new Sprite(img, 0, 188, 7, 10);

	//给s_numberS添加draw方法
	s_numberS.draw = s_numberB.draw = function(ctx, x, y, num, center, offset) {
		num = num.toString();
		var step = this.width + 2; //数字的宽度+2px, png上的位置

		//有问题！！！！！！！！！！！！！！！！！
		if(center){
			x=center - (num.length*step-2)/2;
		}
		if(offset){
			x+=step*(offset-num.length);
		}

		for (var i = 0, len = num.length; i < len; i++) {
			var n = parseInt(num[i]);
			ctx.drawImage(img, step*n, this.y, this.width, this.height,
				x, y, this.width, this.height)
			x += step;
		}
		
	}
}

var

canvas,
ctx,
width,
height,

fgpos=0,

frames = 0,
score = 0,
best = 0,

currentstate,

//Objects written as name value pairs
states={
	 Splash: 0, Game: 1, Score: 2 //开始界面 0， 游戏 1， 记分牌
},


okbtn,
splashImg,

bird = {

	x:60,
	y:0,

	frame:0,
	velocity:0,
	animation:[0,1,2,1],
	rotation: 0,
	radius:12,
	gravity: 0.25,
	_jump: 4.6,

	jump: function(){
		this.velocity = -this._jump;
	},


	update: function(){
		var n = currentstate === states.Splash ? 10 : 5; //开始画面比游戏画面翅膀速度慢
		//**
		//if (currentstate === states.Splash){
		//	n=10}else{
		//	n=5}
		this.frame += frames % n === 0 ? 1:0; //调整翅膀速度
		//**
		//if(frame % n === 0){
		//	this.frame = this.frame + 1}else{
		//	this.frame = this.frame + 0}
		this.frame %= this.animation.length;
		//this.frame = this.frame % this.animation.lenght; 帧总是再animation的范围内

		if (currentstate === states.Splash){
			this.y = height - 280 + 5*Math.cos(frames/10);//功能: 位置上下晃
		} else {
			this.velocity += this.gravity;//重力加速度
			this.y += this.velocity;

			if(this.y >= height - s_fg.height - 10){//如果小鸟碰到前景 y的正数为向下
				this.y = height - s_fg.height - 10;//小鸟停在前景
				if (currentstate===states.Game){//如果是游戏状态
					currentstate=states.Score;//跳到积分状态
				}
				this.velocity = this._jump;//速度等于跳的速度,不知道作用.固定速度，减少计算消耗？
			}

			if (this.velocity >= this._jump) {//如果速度大于等于跳
				//this.frame = 1;//不知道作用，无效
				this.rotation=Math.min(Math.PI/2, this.rotation + 0.3);
				//this.rotation=0.3;
			}else{
				this.rotation=-0.3;//rotation 负数为向上
			}

		}
	},

	draw:function(ctx){
		ctx.save();//储存当前ctx左上角的为基准点
		ctx.translate(this.x,this.y);//绘制基准点从游戏左上角移动到小鸟的位置
		ctx.rotate(this.rotation);//旋转ctx


		


		var n= this.animation[this.frame];
		s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2); //绘图以小鸟左上角为基准,再ctx内
		//s_bird[n].draw(ctx, this.x,this.y);

		//标记bird的碰撞体积
		/*
		ctx.fillStyle = "#f00"
		ctx.beginPath();
		ctx.arc(0,0,this.radius,0, 2*Math.PI);
		ctx.fill();
		*/
		ctx.restore();//重新设置最初的ctx左上角谓基准点
	}
},

pipes = {

	_pipes: [] ,//准备一个pipes的array

	reset:function(){//设pipes为空
		this._pipes = [];
	},

	update: function(){
		if(frames % 100 ===0){
			var _y = height - (s_pipeSouth.height + s_fg.height + 120 + 200*Math.random()); 
			//左上角为0,0.向上为负，向下为正。上管道上端的y的位置，总是一个负数，在游戏上边沿上方
			//alert(s_pipeSouth.height +"+"+s_fg.height+"+"+120+"+"+200*Math.random());
			//alert(_y);
			this._pipes.push({ //push  在array里添加新的pipes对象
				x:650, //障碍出现的位置
				y:_y,
				width: s_pipeSouth.width,
				height: s_pipeSouth.height
			})
		}
		for(var i=0, len = this._pipes.length; i< len; i++){
			var p = this._pipes[i];




			//碰撞检测，真的没看明白！
			if(i===0){

				score += p.x === bird.x ? 1:0;
				//**
				//if(p.x === bird.x){
				//	score = score +1}else{
				//	score = score + 0}

				var cx  = Math.min(Math.max(bird.x, p.x), p.x+p.width);
				var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.height);
				var cy2 = Math.min(Math.max(bird.y, p.y+p.height+80), p.y+2*p.height+80);

				var dx  = bird.x - cx;
				var dy1 = bird.y - cy1;
				var dy2 = bird.y - cy2;

				var d1 = dx*dx + dy1*dy1;
				var d2 = dx*dx + dy2*dy2;

				var r = bird.radius*bird.radius;

				if(r > d1 || r > d2){
					currentstate = states.Score;

					//console.log("bird x : "+ bird.x);
					//console.log("bird y : " + bird.y);
					//console.log("p x : "+p.x);
					//console.log("p y : "+p.y);

				}
			}

			p.x -= 2; //每个时间单位向左位移2px
			if(p.x < -p.width){//当最左边的pipe完全移出左边框时
				this._pipes.splice(i,1) //splice 删除i位置的1个对象 arrayObject.splice(index,howmany,item1,.....,itemX)
				i--;
				len--;
			}
		}
	},
	
	draw:function(ctx){
		for(var i=0, len = this._pipes.length; i< len; i++){
			var p = this._pipes[i];
			s_pipeSouth.draw(ctx,p.x, p.y);//朝南的水管(上方的)
			s_pipeNorth.draw(ctx,p.x, p.y+80+p.height);

		}
	}
};

function onpress(evt){//针对按钮的点击事件

	var mx=evt.offsetX, my = evt.offsetY; //鼠标点击的位置，先对于对象的左上角

	switch (currentstate) {
		case states.Splash:
			if(splashImg.x < mx && mx < splashImg.x + splashImg.width &&
				splashImg.y < my && my < splashImg.y + splashImg.height){
				currentstate = states.Game;
				bird.jump();
			}
			break;
		case states.Game:
			bird.jump();
			break;
		case states.Score:
			

			if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
				okbtn.y < my && my < okbtn.y + okbtn.height){
				pipes.reset();
				currentstate=states.Splash;
				bird.rotation=0;
				score = 0;
			}
			break;
	}
}


function main(){
	canvas = document.getElementById("canvas"); //选出一块区域作为画布，在上面作画
	canvasdiv = document.getElementById("CanvasDiv");
	width = window.innerWidth;
	height = window.innerHeight;

	//var evt = "touchstart" //Triggers when the user makes contact with the touch surface and creates a touch point inside the element the event is bound to.
	evt = "mousedown";
	if(width >= 700){
		width = 640; //游戏的宽度
		height = 480;
		canvas.style.border = "1px solid #000";

		//evt = "mousedown";
	}else if(width  < 700){
		width = 400; //游戏的宽度
		height = 480;
		canvas.style.border = "1px solid #000";

		//evt = "mousedown";
	}

	document.addEventListener(evt,onpress);

	canvas.width=width;
	canvas.height=height;
	ctx = canvas.getContext("2d");

	currentstate = states.Splash;

	//canvasdiv.appendChild(canvas); //在canvasid里加入画布

	var img = new Image();
	img.src = "res/Images/xiaofeilong25.png";

	img.onload = function(){ //加载完img触发
		
		initSprites(this);
		ctx.fillStyle = s_bg.color;

		okbtn={
			x:(width-s_buttons.Ok.width)/2,
			y:height-200, 
			width: s_buttons.Ok.width,
			height: s_buttons.Ok.height
		}

		splashImg={
			x: width/2- s_splash.width/2,
			y: height - 300,
			width: s_splash.width,
			height: s_splash.height
		}

		run();
	}
	

}

// 开始和更新游戏循环
function run() {
	var loop = function() {
		update();
		render(); 
		window.requestAnimationFrame(loop, canvas); //时间走起，每秒60帧
	}

	window.requestAnimationFrame(loop, canvas);//为什么调用两次

}

function update(){
	frames++;

	if (currentstate !== states.Score){
		fgpos = (fgpos - 2)%40;//每当为-40的时候，fg重绘到0
		
	} else {
		best = Math.max(best, score);
	}
	// 10: 8,6,4,2,0,8,6.... 位置循环！！！！！！！！！！！！！
	// 15: 13, 11 , 9, 7, 5, 3, 1 , 14, 12 ... 相当于速度 +-2 为方向

	if (currentstate === states.Game){
		pipes.update();
	}

	bird.update();
	

}

function render(){
	ctx.fillRect(0,0, width,height);

	//游戏背景， 三次
	s_bg.draw(ctx, 0, height-s_bg.height);
	s_bg.draw(ctx, s_bg.width, height-s_bg.height);
	s_bg.draw(ctx, s_bg.width*2, height-s_bg.height);

	s_bg.draw(ctx, 0, 0);
	s_bg.draw(ctx, s_bg.width, 0);
	s_bg.draw(ctx, s_bg.width*2, 0);
	
	s_bg.draw(ctx, 0, s_bg.height);
	s_bg.draw(ctx, s_bg.width, s_bg.height);
	s_bg.draw(ctx, s_bg.width*2, s_bg.height);
	pipes.draw(ctx);
	bird.draw(ctx);
	

	//前景， 三次
	s_fg.draw(ctx, fgpos,height-s_fg.height);
	s_fg.draw(ctx, fgpos+s_fg.width ,height-s_fg.height);
	s_fg.draw(ctx, fgpos+s_fg.width*2 ,height-s_fg.height);

	var width2= width/2;

	if(currentstate===states.Splash){
		s_splash.draw(ctx, splashImg.x, splashImg.y);
		s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width/2, height - 380);
	}
	if (currentstate === states.Score){
		s_text.GameOver.draw(ctx, width2-s_text.GameOver.width/2, height-400);
		if(score<1){
			s_score2.draw(ctx, width2-s_score2.width/2, height-340);
		}else{
			//TODO
			//draw another scoreboard!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			s_score.draw(ctx, width2-s_score.width/2, height-340);
		}
		
		s_buttons.Ok.draw(ctx,okbtn.x, okbtn.y);

		s_numberS.draw(ctx, width2-47, height-304, score, null, 10);
		s_numberS.draw(ctx, width2-47, height-262, best, null, 10);
	}else{
		s_numberB.draw(ctx, null, 20, score, width2);
	}

}
