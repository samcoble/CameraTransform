// ! Memspc

						/*-- 2D Canvas Draw Functions --\
						\------------------------------*/


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




						/*-- Var Decs --\
						\--------------*/

// !
var runTime_int = 10; // Time delay between frames as they render 
// !

var title_int = 350;


var inner_window_width = document.getElementsByTagName("html")[0].clientWidth;
var inner_window_height = document.getElementsByTagName("html")[0].clientHeight;

var pi = 3.1415926538; // High definition PI makes a visible difference
var pi4 = 0.7071067811;
//var aim_floor = new Float32Array(4);
var aim_floor = new Float32Array([0.00001,0.00001,0.00001,1, 0.00001,0.00001,0.00001,1, 0.00001,0.00001,0.00001,1]);

var player_look_dir = [pi/4, 0.1, 0];
var player_look_dir_i = [pi/4, 0.1, 0];
var aim_dir = [0.0, 0.0, 0.0];
var aim_dir_n = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];  // rt data
var mouseDataS = [0.0, 0.0]; // saved state
var mouseDataI = [0.0, 0.0]; // initial
var mouseDataD = [0.0, 0.0]; // delta
var mouseLock = 0; 
var fov_slide = 20.0;

var player_pos = [0.00001,0.00001,0.00001];
var w_player_pos = [0.00001,0.00001,0.00001];

var LookToggle = 0;
var inc = 0;


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
// e.button                       //
// lmb - 0 |  mmb - 1  |  rmb - 2 //
//--------------------------------//

var keyInfo = [0,0,0,0,0,0,0,0,0,0];  //w,s,a,d,spc,lmb,mmb,rmb,shift
var el = document.getElementById("html");

el.onkeydown = function(e)
{
    e = e || window.event;
    if (e.keyCode == 87) {keyInfo[0]=1;}
    if (e.keyCode == 83) {keyInfo[1]=1;}
    if (e.keyCode == 65) {keyInfo[2]=1;}
    if (e.keyCode == 68) {keyInfo[3]=1;}
    if (e.keyCode == 32) {keyInfo[4]=1;}
    if (e.keyCode == 16) {keyInfo[8]=1;}
    if (e.keyCode == 17) {keyInfo[9]=1;}
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
// var _pf = [
// 	player_pos[0] + f_dist*player_look_dir
// 	];


// t = -N . player_pos / N . player_look_dir

// aim_floor = player_pos + t*player_look_dir

function setTitle()
{
	title = makeTitle(title);
	document.title = title;
}



						/*-- Placeholder 4d data generation --\
						\------------------------------------*/


// 2 many arrays pls fix
var m_objs = []; // [[n,...,],[n,...,],...]
var mem_log = []; // [start, size]
var mem_sum = 0;

const m_cube = new Float32Array([-1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
// const m_tri = new Float32Array([0,2,0,1,-1,0,-1,1,1,0,-1,1,1,0,1,1,-1,0,1,1]); //1,0,1,1,-1,0,-1,1,1,0,-1,1
const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]); //30,0,30,30,-30,0,-30,30,30,0,-30,30

var _flr = 25; // Side length of square
var m_flr = new Float32Array(4*_flr*_flr);


function setFlr() // fn: Create floor vertices
{
	for (var i = 0; i<_flr; i++)
	{
		for (var j = 0; j<_flr; j++)
		{	//	i <=> (i*10+j)
			m_flr[(i*_flr+j)*4]   = i - _flr/2;
			m_flr[(i*_flr+j)*4+1] = 0;
			m_flr[(i*_flr+j)*4+2] = j - _flr/2;
			m_flr[(i*_flr+j)*4+3] = 1;
		}
	}
}

setFlr();

// 

var m1 = turbojs.alloc(20000);



function addMData(ar)
{
	m_objs[m_objs.length] = ar; // Append ar to m_objs
	mem_log.push([mem_sum, ar.length]);
	mem_sum += ar.length;
}



						/*-- PLACE DATA --\
						\----------------*/


addMData(m_flr);
addMData(aim_floor);
addMData(m_cube);



addMData(m_tri);




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


setData();

var canvas = document.getElementById("cv");
var ctx = canvas.getContext("2d");


canvas.addEventListener("click", async () => {
	await canvas.requestPointerLock();
	mouseLock = 1;
});

// x y T

function rot_y_pln(_p,_r)
{
	var _p1 = [
		Math.cos(_r)*_p[0]+Math.sin(_r)*_p[2],
		_p[1],
		Math.cos(_r)*_p[2]-Math.sin(_r)*_p[0],
		1
	];

	return _p1;
}

function rot_x_pln(_p,_r)
{
	var _p2 = [
		_p[0],
		Math.cos(_r)*_p[1]-Math.sin(_r)*_p[2],
		Math.sin(_r)*_p[1]+Math.cos(_r)*_p[2],
		1
	];

	return _p2;
}


function mov_obj(_i, _p)
{
	for (var i = 0; i<mem_log[_i][1] /4; i++)
	{
		m_objs[i*4+mem_log[_i][0]]   = m_objs[i*4+mem_log[_i][0]]+_p[0];
		m_objs[i*4+1+mem_log[_i][0]] = m_objs[i*4+1+mem_log[_i][0]]+_p[1];
		m_objs[i*4+2+mem_log[_i][0]] = m_objs[i*4+2+mem_log[_i][0]]+_p[2];
		m_objs[i*4+3+mem_log[_i][0]] = m_objs[i*4+3+mem_log[_i][0]];
	}
}


// var w_player_pos = [
// 		Math.cos(player_look_dir[1])*x-Math.sin(player_look_dir[1])*z
// 		y,
// 		Math.cos(player_look_dir[1])*z-Math.sin(player_look_dir[1])*x
// 		1
// 	];


// var w_player_pos = [
// 		x,
// 		Math.cos(yaw)*y-Math.sin(yaw)*z
// 		Math.sin(yaw)*y+Math.cos(yaw)*z
// 		1
// 	];


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




						/*-- Draw 2D data --\
						\------------------*/

	function drawIt(init_dat)
	{
		reDraw(ctx, inner_window_width, inner_window_height); // FIRST


						/*-- DRAW + DEBUG PANEL --\
						\------------------------*/

		drawRectFrame(ctx, 30 ,30,385,158);
		drawRect(ctx, 30 ,30,385,158);


		drawText(ctx, "player_look_dir | " + player_look_dir[0].toFixed(3) + " : " + player_look_dir[1].toFixed(3), 50, 60);
		drawText(ctx, "mouseDataD:     | " + mouseDataD[0].toFixed(3) + " : " + mouseDataD[1].toFixed(3), 50, 75);
		//
		drawText(ctx, "player_pos:     | " + player_pos[0].toFixed(3) + " : " + player_pos[1].toFixed(3) + " : " + player_pos[2].toFixed(3), 50, 105);
		//drawText(ctx, "m_objs[1]: " + m_objs[1][0].toFixed(3) + " : " + m_objs[1][1].toFixed(3) + " : " + m_objs[1][2].toFixed(3), 50, inner_window_height-120);
		drawText(ctx, "m1_objs[1]:     | " + init_dat.data[mem_log[1][0]].toFixed(3) + " : " + init_dat.data[mem_log[1][0]+1].toFixed(3) + " : " + init_dat.data[mem_log[1][0]+2].toFixed(3), 50, 120);
		//
		drawText(ctx, "W, A, S ,D, Shift(down), Space(up), Scroll(fov)", 50, 150);
		drawText(ctx, "Ctrl(unlock), Middle Mouse(drag camera & sku)", 50, 165);


		//



		var s = fov_slide; // Arbitrary visual scaler
		for (var i = 0; i<m_objs.length; i++)
		{
			for (var j = 0; j<mem_log[i][1]/4; j++) // fix me?
			{
				if (init_dat.data[4*j+mem_log[i][0]+3] > 0) // Clipping
				// if (1) // Clipping off
				{
					drawDot(ctx, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2, 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3),1.12));
					//drawDot(ctx, init_dat.data[4*j+mem_log[1][0]]*s+inner_window_width/2, init_dat.data[4*j+mem_log[1][0]+1]*s+inner_window_height/2);
					if (j == mem_log[i][1]/4-1)
					{
						drawText(ctx, "END " + j, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2-32, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2-18);
					} else {
					if (i != 0) {drawLine(ctx, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2, init_dat.data[4*(j+1)+mem_log[i][0]]*s+inner_window_width/2, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+inner_window_height/2);}
					if (keyInfo[6] && (mem_log[i][1]/4 < 100)) {drawText(ctx, j, init_dat.data[4*j+mem_log[i][0]]*s+inner_window_width/2-32, init_dat.data[4*j+mem_log[i][0]+1]*s+inner_window_height/2-18);}
					}
				}
			}
		}
	}



						/*-- Compute is runtime main --\
						\-----------------------------*/


	function Compute(init_dat, t_inc)
	{




		// Redo this in GLSL ? or later when I have a player_dat struct in m_objs

		// X = cos(Y) * cos(P)
		// Y = sin(Y) * cos(P)
		// Z = sin(P)

		// aim_dir = [
		// 	Math.cos(player_look_dir[0]-pi/4)*Math.cos(player_look_dir[1]-pi/4),
		// 	-Math.sin(player_look_dir[1]*2),
		// 	Math.sin(player_look_dir[0]-pi/4)*Math.cos(player_look_dir[1]-pi/4)
		// 	//-Math.sin(player_look_dir[0])*Math.cos(player_look_dir[0])
		// ];

		// aim_dir_n = [
		// 	aim_dir[0]/Math.sqrt(dot(aim_dir,aim_dir)),
		// 	aim_dir[1]/Math.sqrt(dot(aim_dir,aim_dir)),
		// 	aim_dir[2]/Math.sqrt(dot(aim_dir,aim_dir)),
		// 	1
		// 	]




		// aim_floor = [
		// 	m_objs[1][0]+f_dist*aim_dir[0],
		// 	player_pos[1]+f_dist*aim_dir[1],
		// 	-player_pos[2]+f_dist*aim_dir[2],
		// 	1
		// ];
		//console.log(m_objs[1]);

		// console.log(aim_floor[2]);
		// console.log(init_dat[mem_log[2][0]+2]);
		// console.log("...");


		var keyVec = [keyInfo[3]-keyInfo[2], keyInfo[0]-keyInfo[1]];


		if (keyVec[1] != 0)
		{
			player_pos[0] += Math.sin(-player_look_dir[0])*keyVec[1]*0.3 * -1; // -1 temp ig
			player_pos[2] += Math.cos(-player_look_dir[0])*keyVec[1]*0.3 * -1;
			player_pos[1] -= Math.sin(player_look_dir[1])*keyVec[1]*0.3; // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir
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
			//mov_obj(2,[m_objs[1][0],m_objs[1][1],m_objs[1][2]]);
			//test = new Float32Array([5.0,5.0,5.0]);
			//mov_obj(2, test);
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


		// init_dat.data[mem_log[1][0]+0] = player_pos[0];
		// console.log(init_dat.data[mem_log[1][0]+0]);
		// init_dat.data[mem_log[1][0]+1] = player_pos[1]+5;
		// init_dat.data[mem_log[1][0]+2] = player_pos[2];
		// init_dat.data[mem_log[1][0]+3] = player_pos[3];

		
		 //w_player_pos = rot_x_pln(rot_y_pln(player_pos, -pi/4), pi-player_look_dir[1]);
		// w_player_pos = rot(rot_y_pln(player_pos, -pi/4), 90-player_look_dir[1]);
		// var plr_dir = [];
		//var f_dist = -dot(N,w_player_pos)/dot(N,norm(aim_dir));
		// console.log(f_dist);


		//w_player_pos = rot_x_pln(rot_y_pln(player_pos, -pi/4), pi-player_look_dir[1]);
		//w_player_pos = rot_y_pln(player_pos, -pi/4);
		//var f_dist = -5.0;
		//var f_dist = m_objs[1][1];



		// aim_floor = [
		// 	-player_pos[2],
		// 	-player_pos[1],
		// 	-player_pos[0],
		// 	1
		// ];

		//var z_f_0 = [0,0,1,1];

		//w_player_pos = rot_x_pln[z_f_0, pi/2-player_look_dir[1]];

		//var z_f_2 = rot_y_pln[rot_x_pln[z_f_0, pi/2-player_look_dir[1]], player_look_dir[0]];

		//console.log(z_f_2);

		//w_player_pos = rot_y_pln[rot_x_pln[z_f_0, pi/2-player_look_dir[1]], player_look_dir[0]];

		//console.log(aim_floor);

		// m_objs[1][0] = w_player_pos[0];
		// m_objs[1][1] = w_player_pos[1];
		// m_objs[1][2] = w_player_pos[2];
		// m_objs[1][3] = 1;

		// m_objs[1][0] = w_player_pos[0]*0.707106;
		// m_objs[1][1] = w_player_pos[1]*1; //0.866025
		// m_objs[1][2] = w_player_pos[2]*0.707106;
		// m_objs[1][3] = 1;


		// m_objs[1][0] = w_player_pos[0]*1;
		// m_objs[1][1] = w_player_pos[1]; //0.866025
		// m_objs[1][2] = w_player_pos[2]*1;
		// m_objs[1][3] = 1;

		// m_objs[1][0] = player_pos[0];
		// m_objs[1][1] = player_pos[1]; //0.866025
		// m_objs[1][2] = player_pos[2];
		// m_objs[1][3] = 1;

			// player_pos[0] += Math.sin(-player_look_dir[0]+pi/4)*keyVec[1]*0.3 * -1; // -1 temp ig
			// player_pos[2] += Math.cos(-player_look_dir[0]+pi/4)*keyVec[1]*0.3 * -1;
			// player_pos[1] -= Math.sin(player_look_dir[1])*keyVec[1]*0.3; // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir

		// m_objs[1][4] = -m_objs[1][0]-f_dist*Math.sin(player_look_dir[0]);
		// m_objs[1][5] = m_objs[1][1]+f_dist*(Math.sin(player_look_dir[1]));
		// m_objs[1][6] = -m_objs[1][2]+f_dist*Math.cos(player_look_dir[0]);
		// m_objs[1][7] = 1;

		setData(); // Load all vertices

		//w_player_pos = get_w_pos(player_pos, player_look_dir);

		// m_objs[1][0] = w_player_pos[0];
		// m_objs[1][1] = w_player_pos[1];
		// m_objs[1][2] = w_player_pos[2];
		// m_objs[1][3] = 1.0;

		//if (player_look_dir[0] == 0) {player_look_dir[0] = 0.000001;} if (player_look_dir[1] == 0) {player_look_dir[1] = 0.000001;} // SUPER HOT FIX. Ig as long as 1px of arc > finite. Never really sticks ykwim


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
		//  It would be fun to inject a .dll into into the task bar and intercept the load&cache data transfer of the .





			/*-- Camera Transfrom --\
			\----------------------*/

		/*

		Finally solved problem. Create the inverse player_dat struct with begging x-y-z. All transforms except perspective

		*/


		turbojs.run(init_dat, `void main(void) {

		#define PI 3.1415926538

		// float a = PI/6.;
		float a = PI/24.;
		float n = 0.015;
		float f = 500.01;

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
				//console.log(m1.data[i*4+mem_log[j][0]]);// try return of compute ????
		//m1 = m0;
		//inc+=0.02;
		//console.log(inc);
		Compute(m1, inc);
		//console.log(m0);
		console.log(m1.data[mem_log[1][0]] + " " + m1.data[mem_log[1][0]+1] + " " + m1.data[mem_log[1][0]]+2);
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

//var T = t_inc;
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