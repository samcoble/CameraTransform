// ! Memspc

						/*-- 2D Canvas Draw Functions --\
						\------------------------------*/
// Generic draw fns

function drawText(c, txt, x0, y0)
{
	c.fillStyle = "rgba(170, 98, 28, 255)"; 
	c.font = "12px Lucida Console";
	c.fillText(txt, x0, y0);
}

function drawRect(c, x, y, w, h)
{
	c.rect(x, y, w, h);
	ctx.fillStyle = "rgba(10,12,14,0.7)";
	ctx.fill();
}

function drawRectFrame(c, x, y, w, h)
{
	c.beginPath(); c.lineWidth = "0.1px";
	c.strokeStyle = "rgba(222, 222, 222, 0.2)"; 
	c.rect(x, y, w, h); c.stroke();
}

function drawDot(c, x, y, s)
{
	c.beginPath(); c.lineWidth = "2px";
	c.strokeStyle = "rgba(222, 222, 222, 215)"; 
	c.rect(x-s/2, y-s/2, s, s); c.stroke();

}

function drawLine(c, x0, y0, x1, y1)
{
	c.strokeStyle = "rgba(222, 222, 222, 215)"; 
	c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke(); 
}

function reDraw(c, ww, wh) {c.clearRect(0, 0, ww, wh);}

function drawPanel(c, x0, y0, x, y)
{
		c.rect(x0, y0, x-x0, y-y0);
		ctx.fillStyle = "rgba(10,12,14,0.7)";
		ctx.fill();
		c.beginPath(); c.lineWidth = "0.1px";
		c.strokeStyle = "rgba(222, 222, 222, 0.2)"; 
		c.rect(x0, y0, x-x0, y-y0); c.stroke();
}


// Mem_sum += on call   =>   problem

// remove old data and replace w/ new at location breaks mem_log
// call recreation of mem_log
// best do this in a brand new m2 and run separate transforms. Then send it as obj into m1. aka model edit.

// fix obj translation fn

//=============

// FIX later

// Use substr to get new obj from  data?
/// HERE   console.log(foo.data.subarray(0, 5));








						/*-- Var Decs --\
						\--------------*/

// !
var runTime_int = 1; // Time delay between frames as they render 
// !

var title_int = 350;

var date_now = 0;


var inner_window_width = document.getElementsByTagName("html")[0].clientWidth;
var inner_window_height = document.getElementsByTagName("html")[0].clientHeight;

var pi = 3.1415926538; // High definition PI makes a visible difference
var pi4 = 0.7071067811;

//var aim_floor = new Float32Array(4);


var player_look_dir = [pi/4, 0.1, 0];
var player_look_dir_i = [pi/4, 0.1, 0];
var aim_dir = [0.0, 0.0, 0.0];
var aim_dir_n = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];  // rt data
var mouseDataS = [0.0, 0.0]; // saved state
var mouseDataI = [0.0, 0.0]; // initial
var mouseDataD = [0.0, 0.0]; // delta
var mouseLock = 0; 
var fov_slide = 40.0;

var player_pos = [0.00001,0.00001,0.00001];
var w_player_pos = [0.00001,0.00001,0.00001];
var wf_player_pos = [0.00001,0.00001,0.00001];
var wt_player_pos = [0.00001,0.00001,0.00001];

var LookToggle = 0;

var lock_vert_mov = false;


						/*-- Key & Mouse event capture --\
						\-------------------------------*/


onmousemove = function(e)
{
	if (mouseLock)
		{
			player_look_dir = [ player_look_dir[0]+(e.movementX/inner_window_width * pi * 2) , player_look_dir[1]-(e.movementY/inner_window_width * pi * 2) , 0 ];
		} else {mouseData[0] = e.clientX; mouseData[1] = e.clientY;}
}


//--------------------------------//
// e.keyCode                      //
// d - 68  |  a - 65  | shft - 16 //
// w - 87  |  s - 83  | ctrl - 17 //
// f - 70  |  l - 76  | t - 84    //
// e.button                       //
// lmb - 0 |  mmb - 1  |  rmb - 2 //
//--------------------------------//

var keyInfo = [0,0,0,0,0,0,0,0,0,0,0,0];  //w,s,a,d,spc,lmb,mmb,rmb,shift,f,l,t
var el = document.getElementById("html");

// Seriously get rid of the if stacks on the cpu

el.onkeydown = function(e)
{
    e = e || window.event;
    // alert(e.keyCode);
    if (e.keyCode == 87) {keyInfo[0]=1;}
    if (e.keyCode == 83) {keyInfo[1]=1;}
    if (e.keyCode == 65) {keyInfo[2]=1;}
    if (e.keyCode == 68) {keyInfo[3]=1;}
    if (e.keyCode == 32) {keyInfo[4]=1;}
    if (e.keyCode == 16) {keyInfo[8]=1;}
    if (e.keyCode == 17) {keyInfo[9]=1;}
    if (e.keyCode == 70) {keyInfo[10]=1;}
    if (e.keyCode == 76) {keyInfo[11]=1;}
    if (e.keyCode == 84) {keyInfo[12]=1;}
};

el.onkeyup = function(e)
{
	e = e || window.event;
    if (e.keyCode == 87) {keyInfo[0]=0;}
    if (e.keyCode == 83) {keyInfo[1]=0;}
    if (e.keyCode == 65) {keyInfo[2]=0;}
    if (e.keyCode == 68) {keyInfo[3]=0;}
    if (e.keyCode == 32) {keyInfo[4]=0;}
    if (e.keyCode == 16) {keyInfo[8]=0;}
    if (e.keyCode == 17) {keyInfo[9]=0;}
    if (e.keyCode == 70) {keyInfo[10]=0;}
    if (e.keyCode == 76) {keyInfo[11]=0;}
    if (e.keyCode == 84) {keyInfo[12]=0;}
    
};

el.addEventListener('mousedown', function(e)
{
	if (e.button == 0) {keyInfo[5]=1;}
	if (e.button == 1) {e.preventDefault(); keyInfo[6]=1;}
	if (e.button == 2) {keyInfo[7]=1;}
});

el.addEventListener('mouseup', function(e)
{
	if (e.button == 0) {keyInfo[5]=0;}
	if (e.button == 1) {e.preventDefault(); keyInfo[6]=0;}
	if (e.button == 2) {keyInfo[7]=0;}
});

window.addEventListener("wheel", function(e)
{
    if ((fov_slide-e.deltaY/80) > 0) {fov_slide += -e.deltaY/80};
});

						/*-- Title meme fn --\
						\-------------------*/



let title = ".-'-._.-._mem_space_.-'-._.-._";


function makeTitle(_s)
{
	var _l = _s.length;
	var _o = "";
	_o = _o + _s.substring(_l-1,_l);
	for (var i = 1; i<=(_l-1); i++) {_o = _o + _s.substring(i-1,i);}
	return _o;
}


function dot(a,b)
{
	return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
}

var N = [0,1,0];


function norm(_p)
{
	_l = dot(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l, 1]);
}


function setTitle()
{
	title = makeTitle(title);
	document.title = title;
}


function runEvery(_ms) // works 100 honest #1 fav js fn rn
{
	var d_t = Date.now() - date_now; var _r = 0;
	if (d_t > _ms) {_r = 1; date_now = Date.now();} else {_r = 0;}
	return (_r);
}



						/*-- Placeholder 4d data generation --\
						\------------------------------------*/


// 2 many arrays pls fix
var m_objs = []; // [[n,...,],[n,...,],...]
var mem_log = []; // [start, size]
var mem_sum = 0;

var m2_objs = []; // [[n,...,],[n,...,],...]
var mem_log2 = []; // [start, size]
var mem_sum2 = 0;


var aim_floor = new Float32Array([0.00001,0.00001,0.00001,1, 0.00001,0.00001,0.00001,1, 0.00001,0.00001,0.00001,1, 0.00001,0.00001,0.00001,1]);
const m_cube = new Float32Array([-1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
// const m_tri = new Float32Array([0,2,0,1,-1,0,-1,1,1,0,-1,1,1,0,1,1,-1,0,1,1]); //1,0,1,1,-1,0,-1,1,1,0,-1,1
const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]); //30,0,30,30,-30,0,-30,30,30,0,-30,30

var _flr = 50; // Side length of square
var m_flr = new Float32Array(4*_flr*_flr);
var edit_sum = 0;

function setFlr() // fn: Create floor vertices
{
	for (var i = 0; i<_flr; i++)
	{
		for (var j = 0; j<_flr; j++)
		{	//	i <=> (i*10+j)
			m_flr[(i*_flr+j)*4]   = 5*i - _flr/2*5;
			m_flr[(i*_flr+j)*4+1] = 0;
			m_flr[(i*_flr+j)*4+2] = 5*j - _flr/2*5;
			m_flr[(i*_flr+j)*4+3] = 1;
		}
	}
}

var _ws = 5*_flr/2;
const m_map = new Float32Array([

		_ws,0,_ws,1,
		_ws,-_ws,_ws,1,
		-_ws,-_ws,_ws,1,
		-_ws,0,_ws,1,
		-_ws,0,-_ws,1,
		-_ws,-_ws,-_ws,1,
		_ws,-_ws,-_ws,1,
		_ws,0,-_ws,1,
		_ws,0,_ws,1,
		-_ws,0,_ws,1,
		-_ws,-_ws,_ws,1,
		-_ws,-_ws,-_ws,1,
		-_ws,0,-_ws,1,
		-_ws,-_ws,-_ws,1,
		-_ws,0,-_ws,1,
		_ws,0,-_ws,1,
		_ws,-_ws,-_ws,1,
		_ws,-_ws,_ws,1,



	]);


setFlr();

// 

var m1 = turbojs.alloc(20000); // Everything

//var m_edit = turbojs.alloc(4000); // Obj being modified
var m_t_objs = [];

	/*
	_____/\\\\\\\\\_____/\\\\\\\\\\\\_____/\\\\\\\\\\\\_______________/\\\\\\\\\\\\________/\\\\\\\\\_____/\\\\\\\\\\\\\\\_____/\\\\\\\\\____        
	 ___/\\\\\\\\\\\\\__\/\\\////////\\\__\/\\\////////\\\____________\/\\\////////\\\____/\\\\\\\\\\\\\__\///////\\\/////____/\\\\\\\\\\\\\__       
	  __/\\\/////////\\\_\/\\\______\//\\\_\/\\\______\//\\\___________\/\\\______\//\\\__/\\\/////////\\\_______\/\\\________/\\\/////////\\\_      
	   _\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\_______\/\\\___________\/\\\_______\/\\\_\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\_     
	    _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_\/\\\_______\/\\\___________\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_______\/\\\_______\/\\\\\\\\\\\\\\\_    
	     _\/\\\/////////\\\_\/\\\_______\/\\\_\/\\\_______\/\\\___________\/\\\_______\/\\\_\/\\\/////////\\\_______\/\\\_______\/\\\/////////\\\_   
	      _\/\\\_______\/\\\_\/\\\_______/\\\__\/\\\_______/\\\____________\/\\\_______/\\\__\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\_  
	       _\/\\\_______\/\\\_\/\\\\\\\\\\\\/___\/\\\\\\\\\\\\/_____________\/\\\\\\\\\\\\/___\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\_ 
	        _\///________\///__\////////////_____\////////////_______________\////////////_____\///________\///________\///________\///________\///__
	*/

function addMData(ar)
{
	m_objs[m_objs.length] = ar; // Append ar to m_objs
	mem_log.push([mem_sum, ar.length]);
	mem_sum += ar.length;
}

// New plan. Same struct. Second float 32 array. Set dat adds secondary itself at end of first mem_log. Should work. 

// function addVert(ar, _off) // Accepts Float32Array // _off = mem_log[2][0]
// {
// 	//m_objs[m_objs.length] = ar; // Append ar to m_objs
// 	//mem_log.push([mem_sum, ar.length]);
// 	m_edit.data[edit_sum*4+_off] = ar[0];
// 	m_edit.data[edit_sum*4+_off+1] = ar[1];
// 	m_edit.data[edit_sum*4+_off+2] = ar[2];
// 	m_edit.data[edit_sum*4+_off+3] = ar[3];
// 	edit_sum += 1;
// }



						/*-- PLACE DATA --\
						\----------------*/


addMData(m_flr);
addMData(aim_floor);
//addMdata(m_edit);
addMData(m_map);
addMData(m_cube);


//addMData(m_tri);



function setData()
{
	for (var j = 0; j<m_objs.length; j++)
	{
		for (var i = 0; i<m_objs[j].length/4; i++)
		{
			m1.data[i*4+mem_log[j][0]]   = m_objs[j][i*4+0];
			m1.data[i*4+1+mem_log[j][0]] = m_objs[j][i*4+1];
			m1.data[i*4+2+mem_log[j][0]] = m_objs[j][i*4+2];
			m1.data[i*4+3+mem_log[j][0]] = m_objs[j][i*4+3];
		}
	}
}





// function mov_obj(_i, _p)
// {
// 	for (var i = 0; i<mem_log[_i][1] /4; i++)
// 	{
// 		m_objs[i*4+mem_log[_i][0]]   = m_objs[i*4+mem_log[_i][0]]-_p[0];
// 		m_objs[i*4+1+mem_log[_i][0]] = m_objs[i*4+1+mem_log[_i][0]]-_p[1];
// 		m_objs[i*4+2+mem_log[_i][0]] = m_objs[i*4+2+mem_log[_i][0]]-_p[2];
// 		m_objs[i*4+3+mem_log[_i][0]] = m_objs[i*4+3+mem_log[_i][0]];
// 	}
// }



setData();

var canvas = document.getElementById("cv");
var ctx = canvas.getContext("2d");


canvas.addEventListener("click", async () => {
	await canvas.requestPointerLock();
	mouseLock = 1;
});


function rot_y_pln(_p,_r)
{
	var _p1 = [
		Math.cos(_r)*_p[0]+Math.sin(_r)*_p[2],
		_p[1],
		Math.cos(_r)*_p[2]-Math.sin(_r)*_p[0],
		_p[3]
	];

	return _p1;
}

function rot_x_pln(_p,_r)
{
	var _p2 = [
		_p[0],
		Math.cos(_r)*_p[1]-Math.sin(_r)*_p[2],
		Math.sin(_r)*_p[1]+Math.cos(_r)*_p[2],
		_p[3]
	];

	return _p2;
}

document.addEventListener("DOMContentLoaded", function(event)
{

						/*-- GET&SET SCREEN DIMENSIONS --\
						\-------------------------------*/


	var screen_width = window.screen.width * window.devicePixelRatio;
	var screen_height = window.screen.height * window.devicePixelRatio;

	document.getElementById("cv").width = inner_window_width;
	document.getElementById("cv").height = inner_window_height;
	document.getElementsByTagName("body")[0].width = inner_window_width;
	document.getElementsByTagName("body")[0].height = inner_window_height;






	function drawIt(init_dat)
	{
		reDraw(ctx, inner_window_width, inner_window_height); // FIRST


		/*
		__/\\\\\\\\\\\\_______/\\\\\\\\\_________/\\\\\\\\\_____/\\\______________/\\\_        
		 _\/\\\////////\\\___/\\\///////\\\_____/\\\\\\\\\\\\\__\/\\\_____________\/\\\_       
		  _\/\\\______\//\\\_\/\\\_____\/\\\____/\\\/////////\\\_\/\\\_____________\/\\\_      
		   _\/\\\_______\/\\\_\/\\\\\\\\\\\/____\/\\\_______\/\\\_\//\\\____/\\\____/\\\__     
		    _\/\\\_______\/\\\_\/\\\//////\\\____\/\\\\\\\\\\\\\\\__\//\\\__/\\\\\__/\\\___    
		     _\/\\\_______\/\\\_\/\\\____\//\\\___\/\\\/////////\\\___\//\\\/\\\/\\\/\\\____   
		      _\/\\\_______/\\\__\/\\\_____\//\\\__\/\\\_______\/\\\____\//\\\\\\//\\\\\_____  
		       _\/\\\\\\\\\\\\/___\/\\\______\//\\\_\/\\\_______\/\\\_____\//\\\__\//\\\______ 
		        _\////////////_____\///________\///__\///________\///_______\///____\///_______ 
        */

		drawPanel(ctx, 25, 30, 435, 198);
		//
		var tool_pnl_sw = 0.64; var tool_pnl_sh = 0.07;
		
		drawPanel(ctx, inner_window_width*tool_pnl_sw, inner_window_height*(1-tool_pnl_sh), inner_window_width*(1-tool_pnl_sw), inner_window_height*(1-tool_pnl_sh*0.12));

		//drawLine(ctx,inner_window_width/2-3,inner_window_height/2, inner_window_width/2+3, inner_window_height/2);
		//drawLine(ctx,inner_window_width/2,inner_window_height/2-3, inner_window_width/2, inner_window_height/2+3);

		drawText(ctx, "player_look_dir | " + player_look_dir[0].toFixed(3) + " : " + player_look_dir[1].toFixed(3), 50, 60);
		drawText(ctx, "mouseDataD:     | " + mouseDataD[0].toFixed(3) + " : " + mouseDataD[1].toFixed(3), 50, 75);
		//
		drawText(ctx, "player_pos:     | " + player_pos[0].toFixed(3) + " : " + player_pos[1].toFixed(3) + " : " + player_pos[2].toFixed(3), 50, 105);
		//drawText(ctx, "m_objs[1]: " + m_objs[1][0].toFixed(3) + " : " + m_objs[1][1].toFixed(3) + " : " + m_objs[1][2].toFixed(3), 50, inner_window_height-120);
		drawText(ctx, "m1_objs[1]:     | " + init_dat.data[mem_log[1][0]].toFixed(3) + " : " + init_dat.data[mem_log[1][0]+1].toFixed(3) + " : " + init_dat.data[mem_log[1][0]+3].toFixed(3), 50, 120);
		//
		drawText(ctx, "W,A,S,D, Shift(down), Space(up), Scroll(fov'ish)", 50, 150);
		drawText(ctx, "Ctrl(unlock), Middle Mouse(drag camera & sku)", 50, 165);
		drawText(ctx, "F(place point), L(lock mov), T(teleport)", 50, 180); //, 

		// bad 4 cpu fix

		var s = fov_slide; // Arbitrary visual scaler
		for (var i = 0; i<m_objs.length; i++)
		{
			for (var j = 0; j<mem_log[i][1]/4; j++) // fix me?
			{
				if (init_dat.data[4*j+mem_log[i][0]+3] > 0 && init_dat.data[4*(j+1)+mem_log[i][0]+3] > 0) // Clipping
				// if (1) // Clipping off
				{
					if ( i != 1 ) {drawDot(ctx, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2, 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3),1.13));}
					else if ( j == 1 ) {

						//drawLine(ctx,inner_window_width/2-3,inner_window_height/2, inner_window_width/2+3, inner_window_height/2);
						drawLine(ctx,inner_window_width/2,inner_window_height/2+3 + init_dat.data[4*j+mem_log[i][0]+1]*s, inner_window_width/2, inner_window_height/2-3 + init_dat.data[4*j+mem_log[i][0]+1]*s);
						drawLine(ctx,inner_window_width/2+3,inner_window_height/2+init_dat.data[4*j+mem_log[i][0]+1]*s, inner_window_width/2-3, inner_window_height/2+init_dat.data[4*j+mem_log[i][0]+1]*s);
					}
					//drawDot(ctx, init_dat.data[4*j+mem_log[1][0]]*s+inner_window_width/2, init_dat.data[4*j+mem_log[1][0]+1]*s+inner_window_height/2);
					if (j == mem_log[i][1]/4-1)
					{
						drawText(ctx, "END " + j, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2-32, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2-18);
					} else {
					if (i != 0 && i != 1) {drawLine(ctx, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2, init_dat.data[4*(j+1)+mem_log[i][0]]*s+inner_window_width/2, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+inner_window_height/2);}
					if (keyInfo[6] && (mem_log[i][1]/4 < 100)) {drawText(ctx, j, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2-32, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2-18);}
					}
				}
			}
		}
	}



	function Compute(init_dat)
	{

		/*
		________/\\\\\\\\\_______/\\\\\_______/\\\\____________/\\\\__/\\\\\\\\\\\\\____/\\\________/\\\__/\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\_        
		 _____/\\\////////______/\\\///\\\____\/\\\\\\________/\\\\\\_\/\\\/////////\\\_\/\\\_______\/\\\_\///////\\\/////__\/\\\///////////__       
		  ___/\\\/_____________/\\\/__\///\\\__\/\\\//\\\____/\\\//\\\_\/\\\_______\/\\\_\/\\\_______\/\\\_______\/\\\_______\/\\\_____________      
		   __/\\\______________/\\\______\//\\\_\/\\\\///\\\/\\\/_\/\\\_\/\\\\\\\\\\\\\/__\/\\\_______\/\\\_______\/\\\_______\/\\\\\\\\\\\_____     
		    _\/\\\_____________\/\\\_______\/\\\_\/\\\__\///\\\/___\/\\\_\/\\\/////////____\/\\\_______\/\\\_______\/\\\_______\/\\\///////______    
		     _\//\\\____________\//\\\______/\\\__\/\\\____\///_____\/\\\_\/\\\_____________\/\\\_______\/\\\_______\/\\\_______\/\\\_____________   
		      __\///\\\___________\///\\\__/\\\____\/\\\_____________\/\\\_\/\\\_____________\//\\\______/\\\________\/\\\_______\/\\\_____________  
		       ____\////\\\\\\\\\____\///\\\\\/_____\/\\\_____________\/\\\_\/\\\______________\///\\\\\\\\\/_________\/\\\_______\/\\\\\\\\\\\\\\\_ 
		        _______\/////////_______\/////_______\///______________\///__\///_________________\/////////___________\///________\///////////////__
		*/

		if (keyInfo[11] && runEvery(500)) {lock_vert_mov = !lock_vert_mov;}
		if (lock_vert_mov) {player_pos[1] = -1.000001;}

		var keyVec = [keyInfo[3]-keyInfo[2], keyInfo[0]-keyInfo[1]];


		if (keyVec[1] != 0)
		{
			player_pos[0] += Math.sin(-player_look_dir[0])*keyVec[1]*0.3 * -1; // -1 temp ig
			player_pos[2] += Math.cos(-player_look_dir[0])*keyVec[1]*0.3 * -1;
			if (!lock_vert_mov) {player_pos[1] -= Math.sin(player_look_dir[1])*keyVec[1]*0.3;} // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir
		}

		if (keyVec[0] != 0)
		{
			player_pos[0] += Math.cos(player_look_dir[0])*keyVec[0]*0.3;
			player_pos[2] += Math.sin(player_look_dir[0])*keyVec[0]*0.3;
		}

		if (keyInfo[4]) {player_pos[1] += -0.3;}
		if (keyInfo[8]) {player_pos[1] += 0.3;}

		if (keyInfo[9])
		{
			mouseLock = 0;
			document.exitPointerLock();
		}

		if ((keyInfo[6] && !mouseLock) || document.ready)
		{
				if (!LookToggle)
				{
					mouseDataS[0] = mouseData[0]; mouseDataS[1] = mouseData[1];
					player_look_dir_i = player_look_dir;
				}
				LookToggle = 1;
				var dX = -mouseDataS[0]+mouseData[0]; var dY = mouseDataS[1]-mouseData[1]; // Temp flip of viewing movement
				mouseDataD[0] = dX; mouseDataD[1] = dY;
				player_look_dir = [ player_look_dir_i[0]+(dX/inner_window_width * pi * 2) , player_look_dir_i[1]+(dY/inner_window_width * pi * 2) , 0 ]; // ! width 4 both !

		} else 
		{
			if (LookToggle!=0)
			{
				mouseDataI[0] = mouseDataI[0]-mouseDataD[0];
				mouseDataI[1] = mouseDataI[1]-mouseDataD[1];
				LookToggle = 0;	
			}
		}


		/*

		__/\\\\\\\\\\\\\\\__/\\\________/\\\__/\\\\\_____/\\\____________/\\\\\\\\\\\\\_______/\\\\\\\\\_______/\\\\\\\\\______/\\\\\\\\\\\\\\\_        
		 _\/\\\///////////__\/\\\_______\/\\\_\/\\\\\\___\/\\\___________\/\\\/////////\\\___/\\\\\\\\\\\\\___/\\\///////\\\___\///////\\\/////__       
		  _\/\\\_____________\/\\\_______\/\\\_\/\\\/\\\__\/\\\___________\/\\\_______\/\\\__/\\\/////////\\\_\/\\\_____\/\\\_________\/\\\_______      
		   _\/\\\\\\\\\\\_____\/\\\_______\/\\\_\/\\\//\\\_\/\\\___________\/\\\\\\\\\\\\\/__\/\\\_______\/\\\_\/\\\\\\\\\\\/__________\/\\\_______     
		    _\/\\\///////______\/\\\_______\/\\\_\/\\\\//\\\\/\\\___________\/\\\/////////____\/\\\\\\\\\\\\\\\_\/\\\//////\\\__________\/\\\_______    
		     _\/\\\_____________\/\\\_______\/\\\_\/\\\_\//\\\/\\\___________\/\\\_____________\/\\\/////////\\\_\/\\\____\//\\\_________\/\\\_______   
		      _\/\\\_____________\//\\\______/\\\__\/\\\__\//\\\\\\___________\/\\\_____________\/\\\_______\/\\\_\/\\\_____\//\\\________\/\\\_______  
		       _\/\\\______________\///\\\\\\\\\/___\/\\\___\//\\\\\___________\/\\\_____________\/\\\_______\/\\\_\/\\\______\//\\\_______\/\\\_______ 
		        _\///_________________\/////////_____\///_____\/////____________\///______________\///________\///__\///________\///________\///________
		*/

		var _l_l = -Math.pow(dot(player_pos,player_pos), 0.5);
		var _oh = dot(player_pos,[0,1,0,1]);

		w_player_pos = rot_y_pln(player_pos, -pi/4);

		var _ang = Math.asin(_oh/_l_l);
		//console.log(_ang + " " + _oh + " " + _l_l + " " + Math.abs(_oh/_l_l).toFixed(3));

		wf_player_pos = rot_x_pln([0,0,_l_l,1], -_ang);
		//wf_player_pos = rot_x_pln(w_player_pos, -_ang);


		m_objs[1][0] = w_player_pos[0]*pi4;
		m_objs[1][1] = wf_player_pos[1]; //0.866025
		m_objs[1][2] = w_player_pos[2]*pi4;
		m_objs[1][3] = 1;


		var f_look = rot_y_pln(rot_x_pln([0,0,1,1],-player_look_dir[1]),-player_look_dir[0]-pi/4);
		var f_dist = -_oh/dot(N,norm(f_look));


		m_objs[1][4] = m_objs[1][0]+f_dist*f_look[0];
		m_objs[1][5] = m_objs[1][1]+f_dist*f_look[1];
		m_objs[1][6] = m_objs[1][2]+f_dist*f_look[2];
		m_objs[1][7] = 1;


		wt_player_pos = rot_y_pln([m_objs[1][4],m_objs[1][5],m_objs[1][6],1], pi/4);

		m_objs[1][8] = wt_player_pos[0];
		m_objs[1][9] = wt_player_pos[1];
		m_objs[1][10] = wt_player_pos[2];
		m_objs[1][11] = 1;


		if (keyInfo[10])
			{
				//mov_obj(2, [m_objs[1][4],m_objs[1][5],m_objs[1][6],m_objs[1][7]]);

				var np = new Float32Array([m_objs[1][4],m_objs[1][5],m_objs[1][6],m_objs[1][7]]);
				// var np = new Float32Array(
				// 	[
				// 		m_objs[1][4],m_objs[1][5],m_objs[1][6],m_objs[1][7],
				// 		m_objs[1][4]+0.5,m_objs[1][5],m_objs[1][6]+0.5,m_objs[1][7],
				// 		m_objs[1][4],m_objs[1][5],m_objs[1][6]-0.5,m_objs[1][7],
				// 		m_objs[1][4]-0.5,m_objs[1][5],m_objs[1][6]+0.5,m_objs[1][7],
				// 		m_objs[1][4],m_objs[1][5]-1,m_objs[1][6],m_objs[1][7]
				// 	]);
				
				if (runEvery(100)) {addMData(np);}



				
				//console.log(m_objs[2]);
			}



		if (keyInfo[12] && runEvery(1000))
		{
			player_pos[0] = m_objs[1][8];
			player_pos[1] = m_objs[1][9]-1;
			player_pos[2] = m_objs[1][10];
		}

		setData(); // Load all vertices



		// Translation - Last?
		turbojs.run(init_dat, `void main(void) {
		commit(vec4(
			read().x+read().z+${-player_pos[0]}, 
			read().y+${-player_pos[1]},
			read().z-read().x+${-player_pos[2]},
			read().w
		));
		}`);

		// Rotate around y-axis
		turbojs.run(init_dat, `void main(void) {
		#define PI 3.1415926538
		commit(vec4(
			cos(${player_look_dir[0]})*read().x+sin(${player_look_dir[0]})*read().z,
			read().y,
			cos(${player_look_dir[0]})*read().z-sin(${player_look_dir[0]})*read().x,
			read().w 
		));
		}`);

		// Rotate around x-axis (i can't believe dis)
		turbojs.run(init_dat, `void main(void) {
		commit(vec4(
			read().x,
			cos(${player_look_dir[1]})*read().y-sin(${player_look_dir[1]})*read().z,
			sin(${player_look_dir[1]})*read().y+cos(${player_look_dir[1]})*read().z,
			read().w 
		));
		}`);

		

		//console.log(init_dat.data[mem_log[1][0]].toFixed(3) + " " + init_dat.data[mem_log[1][0]+1].toFixed(3) + " " + init_dat.data[mem_log[1][0]+2].toFixed(3));


		// To do:

		//	Import verticies w/ json
		// 	CLIPPING & OPTIMIZATION
		//	Fix floating point clown fiesta. Handle zeros.
		//	Refactor keyboard keyInfo array.
		//	Convert keyVec into unit sphere.
		//	Quaternion no work. Replace all rotation functions. WEBGL fn for quat?
		//	Pass in multiple Float32 Arrays? => a+b store a size..
		//  It would be fun to inject a .dll into into the task bar and intercept the load&cache data transfer of the .ico 

		/*

		Define plane w/ [ n . (Q-P) = 0 ]

		After given theta: [ n . (Q-P) = ||N|| ||Q-P|| cos(theta) ]
		theta: ang between n & Q
		cos(theta) output pos & neg.
		Can obtain sign of cos(theta) w/o trig fn call only dot product *** !!!
 
 		Now to obtain intersection w/ plane.

 		Say: I = Q1 + t(Q2-Q1)

 		d1 = n . (Q1-P)
 		d2 = n . (Q2-P)

 		I = Q1 + t(Q2-Q1)
 		I-P = (Q1-P) + t( (Q2-P)-(Q1-P) )
 		n . (I-P) = n . (Q1-P) + t * ( n . (Q2-P) - n . (Q1-P) )    apply subs
		n . (I-P) = 0 ; on plane
		0 = d1 + t*(d2 - d1)
		t = d1 / (d2 - d1)  forget about trig fns bb

		So aprox using a 0.00001

		P is on plane at center of pin hole.

		n . (Q-P) = 0 takes P and four n planes 

		Because it's image space prior to horizontal/vertical expansions proportional to depth,
		[1 0 0] [-1 0 0] [0 1 0] [0 -1 0] are the clipping planes by normal vec
		Can also clip near and far.


		if n . (Q-P) > 0 then Q is "in" <=> z > 0
		if n . (Q-P) < 0 then Q is "out" <=> z < 0
		if n . (Q-P) = 0 then Q is "on" <=> z = 0








		*/



			/*-- Perspective Transfrom --\
			\---------------------------*/


		//${player_look_dir[1]}

		turbojs.run(init_dat, `void main(void) {

		#define PI 3.1415926538

		// float a = PI/6.;
		float a = PI/14.;

		float n = 0.015;
		float f = 500.01; // 

		commit(vec4(
			(read().x/tan(a/2.)),
			(read().y/tan(a/2.)),
			(read().z*((f+n)/(f-n))+(2.*n*f)/(2.-n)),
			(-read().z)
		));
		}`);	

		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			(read().x/read().w),
			(read().y/read().w),
			(read().z/read().w),
			read().w
			));
		}`);	


		drawIt(init_dat);
		return(init_dat);


	} // End of Compute()


	function runTime()
	{


		Compute(m1);

	}
	

	setInterval(runTime, runTime_int); 
	setInterval(setTitle, title_int); 

});





// Attempt at quaternion rotation

/*

function QuatMult(q1, q2)
{
	var q = [0,0,0,0];
		q =[q1[0]*q2[0]-q1[1]*q2[1]-q1[2]*q2[2]-q1[3]*q2[3],
	 		q1[1]*q2[0]+q1[0]*q2[1]-q1[3]*q2[2]+q1[2]*q2[3],
	 		q1[2]*q2[0]+q1[3]*q2[1]+q1[0]*q2[2]-q1[1]*q2[3],
	 		q1[3]*q2[0]-q1[2]*q2[1]+q1[1]*q2[2]+q1[0]*q2[3]];
	return q;
}

// This should work; use gpu ?

T = 1.0;
var n = [0.0,1.0,0.0];
var q1 = [Math.cos(T/2), Math.sin(T/2)*n[0], Math.sin(T/2)*n[1], Math.sin(T/2)*n[2]];
//var q2 = [Math.cos(T/2), -Math.sin(T/2)*n[0], -Math.sin(T/2)*n[1], -Math.sin(T/2)*n[2] ];
var q1_len = (Math.cos(T/2))^2 + (Math.sin(T/2)*n[0])^2 + (Math.sin(T/2)*n[1])^2 + (Math.sin(T/2)*n[2])^2;
var q2 = [Math.cos(T/2)/q1_len, -Math.sin(T/2)*n[0]/q1_len, -Math.sin(T/2)*n[1]/q1_len, -Math.sin(T/2)*n[2]/q1_len];
var v = [0,m1.data[0],m1.data[1],m1.data[2]];

var q3 = QuatMult(q1,v);
var qf = QuatMult(q3,q2);
m1.data[0] = qf[0]; m1.data[1] = qf[1]; m1.data[2] = qf[2]; m1.data[3] = qf[3]; 

*/

/*
function getMids(_t) // Fix: I forgot to translate each calculation
{
	var p0 = [
			(_t[0]-_t[4])/2,
			(_t[1]-_t[5])/2,
			(_t[2]-_t[6])/2,
			1
		];

	var p1 = [
			(_t[0]-_t[4*2])/2,
			(_t[1]-_t[4*2+1])/2,
			(_t[2]-_t[4*2+2])/2,
			1
		];

	var p2 = [
			(_t[0]-_t[4*3])/2,
			(_t[1]-_t[4*3+1])/2,
			(_t[2]-_t[4*3+2])/2,
			1
		];

	var p3 = [
			(_t[0]-_t[4*4])/2,
			(_t[1]-_t[4*4+1])/2,
			(_t[2]-_t[4*4+2])/2,
			1
		];

	// get midpoints bettwen verts (0 1, 1 2, 2 3, 3 0)

	var n0 = [
		(_t[0]-_t[4*1])/2,
		(_t[1]-_t[4*1+1])/2,
		(_t[2]-_t[4*1+2])/2,
		1
		];

	var n0_n = [
		_t[0],
		_t[1],
		_t[2],
		1
		];

	var n1 = [
		(_t[4*1]-_t[4*2])/2,
		(_t[4*1+1]-_t[4*2+1])/2,
		(_t[4*1+2]-_t[4*2+2])/2,
		1
		];

	var n1_n = [
		_t[4*1],
		_t[4*1+1],
		_t[4*1+2],
		1
		];


	var n2 = [
		(_t[4*2]-_t[4*3])/2,
		(_t[4*2+1]-_t[4*3+1])/2,
		(_t[4*2+2]-_t[4*3+2])/2,
		1
		];

	var n2_n = [
		_t[4*2],
		_t[4*2+1],
		_t[4*2+2],
		1
		];

	var n3 = [
		(_t[4*3]-_t[4*4])/2,
		(_t[4*3+1]-_t[4*4+1])/2,
		(_t[4*3+2]-_t[4*4+2])/2,
		1
		];

	var n4 = [
		(_t[4*4]-_t[4*1])/2,
		(_t[4*4+1]-_t[4*1+1])/2,
		(_t[4*4+2]-_t[4*1+2])/2,
		1
	];

	var n3_n = [
		_t[4*3],
		_t[4*3+1],
		_t[4*3+2],
		1
		];

	var n4_n = [
		_t[4*4],
		_t[4*4+1],
		_t[4*4+2],
		1
		];

	var p4 = [ // Tip of tri
		(-_t[4*2]-_t[4*4])/2,
		(_t[4*2+1]-_t[4*4+1])/2,
		(-_t[4*2+2]-_t[4*4+2])/2,
		1
	];


	//var t1 = new Float32Array(p4.concat(p0,p1,p2,p3));

	// Fix by taking absolute and fixing direction. Should work 100 
	// var t1 = new Float32Array(p2.concat(p4,n1,n1_n,n2)); //n3
	// var t2 = new Float32Array(p3.concat(p4,n2,n2_n,n3)); //n3
	// var t3 = new Float32Array(p0.concat(p4,n4,n3_n,n3)); //n3
	// var t4 = new Float32Array(p1.concat(n1,p4,n4,n4_n)); //n3
	// var t5 = new Float32Array(p0.concat(p1,p2,p3,n0_n)); //n3
	var t6 = new Float32Array(p2.concat(p4,n1,n1_n,n2,p3,p4,n2,n2_n,n3,p0,p4,n4,n3_n,n3,p1,n1,p4,n4,n4_n,p0,p1,p2,p3,n0_n));

	return t6;

	// returna 5 * 5 point triangles and das it

}
*/