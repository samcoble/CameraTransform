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
	c.beginPath();
	c.strokeStyle = "rgba(222, 222, 222, 0.2)"; 
	c.rect(x, y, w, h);
	c.lineWidth = 1; c.stroke();
}

function drawDot(c, rgba, lw, x, y, s)
{
	c.beginPath(); 
	c.strokeStyle = rgba;
	c.rect(x-s/2, y-s/2, s, s);
	c.lineWidth = lw; c.stroke();

}

function drawLine(c, rgba, lw, x0, y0, x1, y1)
{
	
	c.strokeStyle = rgba;
	c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1);
	c.lineWidth = lw; c.stroke(); 
}

function reDraw(c, ww, wh) {c.clearRect(0, 0, ww, wh);}

function drawPanel(c, x0, y0, x, y)
{
		c.rect(x0, y0, x-x0, y-y0);
		ctx.fillStyle = "rgba(10,12,14,0.7)";
		ctx.fill();
		c.beginPath();
		c.strokeStyle = "rgba(222, 222, 222, 0.2)"; 
		c.rect(x0, y0, x-x0, y-y0);
		c.lineWidth = 1; c.stroke();
}

/*
	I'm using javascript to do glsl things totally wrong. Some of this was for fun. I have to rewrite the entire thing with proper glsl from the start.
	With proper glsl I will be able to use an octree to efficiently link screen coordinates with image space.


	json load/save

	setup requestAnimationFrame

	m_obj_offs = []; // [[dx,dy,dz], [dx,dy,dz], ...]
		place new grid overlay obj
		align cycle planes w/

	use mouse 2d dir vec to dot w/ list of screen buttons [x,y] to only check for intersection if any part is 'in'
		reducing menu cpu cost. also can skip entire obj in that case. very faster.

	add clipping sides & what happens if 3 points where 1 is out ?
		total points goes from 3 to 4. This can happen n times per poly. How deal w/ data??????

	obj_select(_r); where _r is radius from center screen to screen space points. Same dot sequence to sort?
		how about auto group points to 3d sectors and a single ray trace reveals some any quantity of data within the block.
		inconclusive. Math implies computation. blocks can't fail. 

	Holy shit there's an algorithm for this lmao. This always happens to me.
	https://en.wikipedia.org/wiki/Octree

	Use bounding boxes on objs

	I need vertex select & modification to seamlessly implement hud/hologram to world functions



// Old Inverse Kinematic fn from way back
 
function array getIK(I:vector, F:vector, Arm1, Arm2, Yaw) {
    local Xc = (F:x() - I:x())*sin(90-Yaw) + (F:y() - I:y())*cos(90-Yaw) # Abs value this?
    local Yc = F:z() - I:z() # Abs value this?
    local HD = min(sqrt(Xc^2 + Yc^2), Arm1 + Arm2)
    local D = (Arm1^2 + Arm2^2 - HD^2)/(2*Arm1*Arm2)
    local Fye = atan(sqrt(1-D^2), D)
    local Banan = 180 - Fye
    local Beta = atan(Yc, Xc)
    local Alpha = atan(Arm2*sin(Banan), Arm1+Arm2*cos(Banan))
    local Theta1 = (Beta - Alpha)
    local A = vec(Arm1*cos(Theta1)*sin(90-Yaw), Arm1*cos(Theta1)*cos(90-Yaw), Arm1*sin(Theta1))+I
    local B = A + vec(Arm2*cos(Theta1+Banan)*sin(90-Yaw), Arm2*cos(Theta1+Banan)*cos(90-Yaw), Arm2*sin(Theta1+Banan))
    
    return array(Theta1, Banan, A, B)
}


*/

						/*-- Var Decs --\
						\--------------*/

// !
var runTime_int = 1; // Time delay between frames as they render // Replaced with requestanimationframe
// !

var title_int = 350;

var hover_h = 11.5;

var date_now = 0;


var in_win_w = document.getElementsByTagName("html")[0].clientWidth; var in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
var in_win_h = document.getElementsByTagName("html")[0].clientHeight; var in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;

var pi = 3.1415926538; // High definition PI makes a visible difference
var pi4 = 0.7071067811;



var player_look_dir = [0, 0, 0]; //-pi/12
var player_look_dir_i = [0, 0, 0];
var aim_dir = [0.0, 0.0, 0.0];
var aim_dir_n = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];  // rt data
var mouseDataS = [0.0, 0.0]; // saved state
var mouseDataI = [0.0, 0.0]; // initial
var mouseDataD = [0.0, 0.0]; // delta
var mouseLock = 0; 
var fov_slide = 8.0;
var crosshair_l = 4;

var player_pos = [0.0,-3.0,0]; // Having this many _player_pos need entire refactor, should use gpu
var w_player_pos = [0.0,0.0,0.0];
var wf_player_pos = [0.0,0.0,0.0];
var wt_player_pos = [0.0,0.0,0.0];

var LookToggle = 0;

var lock_vert_mov = false;
var pln_cyc = 1;
var grid_scale = 2;



var rgba_r ="rgba(200, 50, 50, 215)";
var rgba_g ="rgba(50, 200, 50, 215)";
var rgba_b ="rgba(50, 50, 200, 215)";
var rgba_w = "rgba(222, 222, 222, 215)";
// var rgba_o = [170, 98, 28, 255];
var rgba_o = "rgba(238, 207, 63, 1)";

var rgbas = [rgba_r,rgba_g,rgba_b,rgba_w,rgba_o];
var _inter_rnd = [0.0, 0.0, 0.0];


const fileInput = document.getElementById('fileInput');








						/*-- Key & Mouse event capture --\
						\-------------------------------*/


onmousemove = function(e)
{
	if (mouseLock)
		{
			player_look_dir = [ player_look_dir[0]+0.4*(e.movementX/in_win_w * pi * 2) , player_look_dir[1]-0.4*(e.movementY/in_win_w * pi * 2) , 0 ];
		} else {mouseData[0] = e.clientX; mouseData[1] = e.clientY;}

	if (player_look_dir[0] > 2*pi) [player_look_dir[0] = 0.0]; // This is kinda wack need to refactor entire system for this
	if (player_look_dir[0] < -2*pi) [player_look_dir[0] = 0.0];
}


//--------------------------------//
// e.keyCode                      //
// d - 68  |  a - 65  | shft - 16 //
// w - 87  |  s - 83  | ctrl - 17 //
// f - 70  |  l - 76  | t - 84    //
// r - 82                         //
// e.button                       //
// lmb - 0 |  mmb - 1  |  rmb - 2 //
//--------------------------------//

var key_map =
{
	w: false,
	s: false,
	a: false,
	d: false,
	q: false,
	r: false,
	z: false,
	x: false,
	p: false,
	t: false,
	f: false,
	l: false,
	g: false,
	" ": false,
	control: false,
	shift: false,
	tab: false,
	lmb: false,
	mmb: false,
	rmb: false,
	tab: false
};


function downloadSaveFile()
{
	var _tar = new Float32Array(mem_t_sum); 

	for (i=0; i<m_t_objs.length; i++)
	{
		_tar[i*4+0] = m_t_objs[i][0]
		_tar[i*4+1] = m_t_objs[i][1]
		_tar[i*4+2] = m_t_objs[i][2]
		_tar[i*4+3] = m_t_objs[i][3]
	}

	const blob = new Blob([_tar], { type: 'application/octet-stream' });
	const _url = URL.createObjectURL(blob);

	// Create a temporary anchor element
	const anchor = document.createElement('a');
	anchor.href = _url;
	anchor.download = "data"+mem_t_sum+".bin";

	// Click event to trigger the download
	anchor.click();
	URL.revokeObjectURL(_url);
	key_map.p = false;
}

window.addEventListener('keydown', (event) => {
	event.preventDefault();
	const key = event.key.toLowerCase();
	if (key_map.hasOwnProperty(key)) {
		key_map[key] = true;
	}
});

window.addEventListener('keyup', (event) => {
	event.preventDefault();
	const key = event.key.toLowerCase();
		if (key_map.hasOwnProperty(key)) {
	key_map[key] = false;
	}
});

document.addEventListener('mousedown', function(e)
{
	if (e.button == 0) {key_map.lmb = true};
	if (e.button == 1) {key_map.mmb = true};
	if (e.button == 2) {key_map.rmb = true};
});

window.addEventListener('mouseup', function(e)
{
	if (e.button == 0) {key_map.lmb = false};
	if (e.button == 1) {key_map.mmb = false};
	if (e.button == 2) {key_map.rmb = false};
});

window.addEventListener("wheel", function(e)
{
	if (!key_map.shift)
	{
	    if ((fov_slide-e.deltaY/300) > 0 && !lock_vert_mov) {fov_slide += -e.deltaY/300};
	    if (lock_vert_mov) {hover_h += -e.deltaY*(key_map.shift+0.2)/14};
	} else {
		//if (runEvery(50)) {
		if (grid_scale>=1/4) {grid_scale += -e.deltaY/Math.abs(e.deltaY)/4;}
		if (grid_scale==0) {grid_scale += 1/4;}
	}
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

function sub(a,b)
{
	return [a[0]-b[0], a[1]-b[1], a[2]-b[2], 1];
}

function scale(a,s) {return [a[0]*s, a[1]*s, a[2]*s, 1];}

var N = [0,1,0];


function norm(_p)
{
	_l = dot(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l, 1]);
}

function lpi(p1,p2,pp,n)
{
	var d1 = dot(n,sub(p1,pp));
	var d2 = dot(n,sub(p2,pp));
	// t = d1 / (d2 - d1)
	var t = d1/(d2-d1);
	// I = p1 + t(p2-p1) // Where I is the intersection
	var _f = sub(p1,scale(sub(sub(p2,pp),sub(p1,pp)),t));
	return _f;
}

function roundTo(value, n)
{
    return Math.round(value / n) * n;
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

var m_t_objs = []; // [[n,...,],[n,...,],...]
var mem_t_log = []; // [start, size]
var mem_t_sum = 0;

var _lp = new Float32Array(3);
var _pp = [-125,0,-125]; // Point on plane will be static
var plr_aim = new Float32Array([0.0,0.0,0.0,1]);

//const m_cube = new Float32Array([-1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
const m_cube = new Float32Array([0.0,0.0,0.0,1, -1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]);
const m_x = new Float32Array([0,0,0,1, 10,0,0,1]);
const m_y = new Float32Array([0,0,0,1, 0,10,0,1]);
const m_z = new Float32Array([0,0,0,1, 0,0,10,1]);
// const m_tri = new Float32Array([0,2,0,1,-1,0,-1,1,1,0,-1,1,1,0,1,1,-1,0,1,1]); //1,0,1,1,-1,0,-1,1,1,0,-1,1



var _flr = 50; // Side length of square
//var m_flr = new Float32Array(4*_flr*_flr);
var edit_sum = 0;

function setGrid(_l, _s, _p, _o) // grid: side length, scale, plane, offset
{
	var _ob = new Float32Array(4*_l*_l);
	for (var i = 0; i<=_l; i++)
	{
		for (var j = 0; j<=_l; j++)
		{	//	i <=> (i*10+j)
			switch (_p)
			{
				case 0:
						_ob[(i*_l+j)*4] = _o[1];
						_ob[(i*_l+j)*4+1]   = _s*i - _l/2*_s +_s/2 + _o[1];
						_ob[(i*_l+j)*4+2] = _s*j - _l/2*_s +_s/2 + _o[2];
						_ob[(i*_l+j)*4+3] = 1;
						break;
				case 1:
						_ob[(i*_l+j)*4]   = _s*i - _l/2*_s +_s/2 + _o[0];
						_ob[(i*_l+j)*4+1] = _o[1];
						_ob[(i*_l+j)*4+2] = _s*j - _l/2*_s +_s/2 + _o[2];
						_ob[(i*_l+j)*4+3] = 1;
						break;
				case 2:
						_ob[(i*_l+j)*4] = _s*j - _l/2*_s +_s/2 + _o[1];
						_ob[(i*_l+j)*4+1]   = _s*i - _l/2*_s +_s/2 + _o[2];
						_ob[(i*_l+j)*4+2] = _o[2];
						_ob[(i*_l+j)*4+3] = 1;
						break;
			}

		}
	}
	return _ob;
}


function splitObj(ar)
{
    const r = [];
    const _s = Math.ceil(ar.length / 4);
    for (let i = 0; i < _s; i++)
    {
        const end = Math.min(i*4 + 4, ar.length);
        const chunk = ar.subarray(i*4, end);
        r.push(new Float32Array(chunk));
    }
    return r;
}


 // grid: side length, scale, plane, offset
var m_flr = setGrid(12*4, 4, 1, [2, 0, -2]);

var g_over_x = setGrid(15, 1, 0, [0, 0, 0]);
var g_over_y = setGrid(15, 1, 1, [0, 0, 0]);
var g_over_z = setGrid(15, 1, 2, [0, 0, 0]);


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
var m1 = turbojs.alloc(20000); // Everything
for (i=0; i<m1.data.length; i++)
{
	m1.data[i] = 0.0;
}
var m_obj_offs = [];


function addMData(ar)
{
	m_objs[m_objs.length] = ar; // Append ar to m_objs
	mem_log.push([mem_sum, ar.length]);
	mem_sum += ar.length;
	m_obj_offs.push([0.0, 0.0, 0.0, 1]);
}

function addTData(ar)
{
	m_t_objs[m_t_objs.length] = ar;
	mem_t_log.push([mem_t_sum, ar.length]);
	mem_t_sum += ar.length;
}

function addATData(ar)
{
	for (i=0; i<ar.length; i++)
	{
		m_t_objs[m_t_objs.length] = ar[i];
		mem_t_log.push([mem_t_sum, ar[i].length]);
		mem_t_sum += ar[i].length;
		//console.log(ar[i]);
	}
}



						/*-- PLACE DATA --\
						\----------------*/

addMData(plr_aim);    // 0
addMData(m_flr);      // 1
addMData(m_map);      // 2
addMData(g_over_x);   // 3
addMData(g_over_y);   // 4
addMData(g_over_z);   // 5
addMData(m_x);        // 6
addMData(m_y);        // 7
addMData(m_z);        // 8


//addMData(m_tri);



function setData() // Combine world and specific obj data set. Using mem_t_log as a clean space for obj modification
{
	for (var j = 0; j<(m_objs.length); j++)
	{
		for (var i = 0; i<m_objs[j].length/4; i++)
		{
			m1.data[i*4+mem_log[j][0]]   = m_objs[j][i*4+0]*m_obj_offs[j][3] + m_obj_offs[j][0];
			m1.data[i*4+1+mem_log[j][0]] = m_objs[j][i*4+1]*m_obj_offs[j][3] + m_obj_offs[j][1];
			m1.data[i*4+2+mem_log[j][0]] = m_objs[j][i*4+2]*m_obj_offs[j][3] + m_obj_offs[j][2];
			m1.data[i*4+3+mem_log[j][0]] = m_objs[j][i*4+3]*m_obj_offs[j][3];
		}
	}
	for (var j = 0; j<(m_t_objs.length); j++)
	{
		for (var i = 0; i<m_t_objs[j].length/4; i++)
		{
			m1.data[i*4+mem_t_log[j][0]+mem_sum]   = m_t_objs[j][i*4+0];
			m1.data[i*4+1+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i*4+1];
			m1.data[i*4+2+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i*4+2];
			m1.data[i*4+3+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i*4+3];
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


fileInput.addEventListener('change', event => {
	const _f = event.target.files[0];
	if (_f)
	{
		const _r = new FileReader();
		_r.onload = event => {
			const _ab = event.target.result;
			const _fa = new Float32Array(_ab);
			addATData(splitObj(_fa));
		};
		_r.readAsArrayBuffer(_f);
	}
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

	document.getElementById("cv").width = in_win_w;
	document.getElementById("cv").height = in_win_h;
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;


	var tool_pnl_sw = 0.64; var tool_pnl_sh = 0.07;



	function drawIt(init_dat)
	{
		reDraw(ctx, in_win_w, in_win_h); // FIRST


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


		drawPanel(ctx, 11, 10, 420, 185);

		drawPanel(ctx, in_win_w*tool_pnl_sw, in_win_h*(1-tool_pnl_sh), in_win_w*(1-tool_pnl_sw), in_win_h*(1-tool_pnl_sh*0.12));



		drawText(ctx, "pos[" + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+"]", 30, 40);
		//drawText(ctx, "player_look_dir  |  " + player_look_dir[0].toFixed(1) + " : " + player_look_dir[1].toFixed(1), 30, 55);
		drawText(ctx, "aim[" + init_dat.data[mem_log[1][0]].toFixed(1) + ", " + init_dat.data[mem_log[1][0]+1].toFixed(1) + ", " + init_dat.data[mem_log[1][0]+3].toFixed(1)+"]", 220, 40);
		drawText(ctx, "pln_cyc: " + ["X-Plane","Y-Plane","Z-Plane"][pln_cyc], 30, 55);
		drawText(ctx, "grid_scale: " + grid_scale, 220, 55);

		drawText(ctx, "W,A,S,D, Shift(sprint), Space(up), X(down), R(plane)", 30, 75);
		drawText(ctx, "L(LOCK mov), Ctrl(mouse), Middle Mouse(camera & sku)", 30, 90);
		drawText(ctx, "Scroll(expand), F(place point), T(teleport), P(save)", 30, 105); //, 
		drawText(ctx, "Scroll+LOCK(vert mov), Z(undo), G(ground)", 30, 120); //, 
		drawText(ctx, "Scroll+Shift(grid size), ", 30, 135); //, 

		// bad 4 cpu fix

		var s = Math.pow(fov_slide, 2); // Arbitrary visual scaler

		for (var i = 1; i<m_objs.length; i++) // i find object
		{
			for (var j = 0; j<mem_log[i][1]/4; j++) // j finds vertex
			{
				if (init_dat.data[4*j+mem_log[i][0]+3] > 0 && init_dat.data[4*(j+1)+mem_log[i][0]+3] > 0) // Line clipping
				// if (1) // Clipping off
				{	
					var _ts = in_win_hc/80/Math.pow( init_dat.data[4*j+mem_log[i][0]+3+mem_sum]*(0.03),0.17); // Remove or fix doesn't matter
					if (i>9)
					{
						drawLine(ctx,rgba_w, 0.5, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);
					}

					if (i >= 6 && i <= 8 && j == 0) {drawLine(ctx,rgbas[i-6], 0.5, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);}
					if (i == 2 && j != mem_log[i][1]/4-1) {drawLine(ctx,rgba_w, 0.4, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);}
					if (i==1) {drawDot(ctx, rgba_w, 1, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3),1.13))};
					
				} // END OF LINE CLIP

				if (init_dat.data[4*j+mem_log[i][0]+3] > 0)
				{
					if (i > 2)
					{
						if (key_map.mmb && i > 5) {drawText(ctx, j, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc);}
						if (j == mem_log[i][1]/4-1) // Find last vertex
						{
							drawText(ctx, "END " + j, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc-32, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc-18);
						}
					}
					if (i>2)
					{
						drawDot(ctx, rgbas[pln_cyc], 1.2, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3),1.13));
					}
				}

			}
		}

		for (var i = 0; i<m_t_objs.length; i++)
		{
			for (var j = 0; j<mem_t_log[i][1]/4; j++) // fix me?
			{
				if (init_dat.data[4*j+mem_t_log[i][0]+3+mem_sum] > 0 && init_dat.data[4*(j+1)+mem_t_log[i][0]+3+mem_sum] > 0) // Clipping
				// if (1) // Clipping off
				{
					drawDot(ctx, rgba_w, 2, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc, 1/Math.pow((init_dat.data[4*j+mem_t_log[i][0]+3+mem_sum]*(0.03)).toFixed(3),1.13));
					if (i == m_t_objs.length-1)
					{
						drawText(ctx, "END " + i, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc-18);
						
						//drawText(ctx, "[" + init_dat.data[4*j+mem_t_log[i][0]+mem_sum] + "] [" + init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum] + "] [" + init_dat.data[4*j+mem_t_log[i][0]+2+mem_sum], init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc-32, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc-18);
					} else {
						drawLine(ctx,rgba_b, 1.3, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc, init_dat.data[4*(j+1)+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*(j+1)+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc);
						if (key_map.mmb) {drawText(ctx, i, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc-18);}
					}
				}
			}
		}

		drawLine(ctx,rgba_g,0.3,in_win_wc-crosshair_l,in_win_hc, in_win_wc+crosshair_l, in_win_hc);
		drawLine(ctx,rgba_g,0.3,in_win_wc,in_win_hc-crosshair_l, in_win_wc, in_win_hc+crosshair_l);

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


		if (key_map.p && runEvery(350)) {downloadSaveFile();}

		if (key_map.l && runEvery(500)) {lock_vert_mov = !lock_vert_mov;}
		if (lock_vert_mov) {player_pos[1] = -hover_h;}

		if (key_map.r && runEvery(200)) {if (pln_cyc==2){pln_cyc=0} else {pln_cyc++;}}
		if (key_map.q && runEvery(200)) {if (pln_cyc==0){pln_cyc=2} else {pln_cyc-=1;}}

		var keyVec = [key_map.d-key_map.a, key_map.w-key_map.s];


		if (keyVec[1] != 0)
		{
			player_pos[0] += Math.sin(-player_look_dir[0])*keyVec[1]*0.6 * -1*(1+key_map.shift*3); // -1 temp ig
			player_pos[2] += Math.cos(-player_look_dir[0])*keyVec[1]*0.6 * -1*(1+key_map.shift*3);
			if (!lock_vert_mov) {player_pos[1] -= Math.sin(player_look_dir[1])*keyVec[1]*0.6*(1+key_map.shift*3);} // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir
		}

		if (keyVec[0] != 0)
		{
			player_pos[0] += Math.cos(player_look_dir[0])*keyVec[0]*0.6*(1+key_map.shift*3);
			player_pos[2] += Math.sin(player_look_dir[0])*keyVec[0]*0.6*(1+key_map.shift*3);
		}

		if (key_map[" "]) {player_pos[1] -= 0.3*(1+key_map.shift*5);}
		if (key_map.x) {player_pos[1] += 0.3*(1+key_map.shift*5);}
		


		if (key_map.control)
		{
			mouseLock = 0;
			document.exitPointerLock();
		}

		if ((key_map.mmb && !mouseLock) || document.ready) // ? wha
		{
				if (!LookToggle)
				{
					mouseDataS[0] = mouseData[0]; mouseDataS[1] = mouseData[1];
					player_look_dir_i = player_look_dir;
				}
				LookToggle = 1;
				var dX = -mouseDataS[0]+mouseData[0]; var dY = mouseDataS[1]-mouseData[1]; // Temp flip of viewing movement
				mouseDataD[0] = dX; mouseDataD[1] = dY;
				player_look_dir = [ player_look_dir_i[0]+(dX/in_win_w * pi * 2) , player_look_dir_i[1]+(dY/in_win_w * pi * 2) , 0 ]; // ! width 4 both !

		} else 
		{
			if (LookToggle!=0)
			{
				mouseDataI[0] = mouseDataI[0]-mouseDataD[0];
				mouseDataI[1] = mouseDataI[1]-mouseDataD[1];
				LookToggle = 0;	
			}
		}

		if (key_map.z && runEvery(140-key_map.shift*100) && m_t_objs.length!=0) {m_t_objs.splice(-1); mem_t_sum -= mem_t_log[mem_t_log.length-1][1]; mem_t_log.splice(-1);}


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



		var _oh = dot(player_pos,[0,1,0,1]);
		var f_look = rot_y_pln(rot_x_pln([0,0,1,1],-player_look_dir[1]),-player_look_dir[0]);
		var f_dist = -_oh/dot(N,norm(f_look));


		var _nplns = [[1,0,0],[0,1,0],[0,0,1]][pln_cyc]; // use pln_cyc to select norm vec from array of norm vecs

		var testp1 = [player_pos[0],player_pos[1],player_pos[2]]; // player pos world
		var testp2 = [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]]; // player pos world

		var _inter = lpi(testp2,testp1,_pp,_nplns);


		m_objs[0][0] = _inter[0];
		m_objs[0][1] = _inter[1];
		m_objs[0][2] = _inter[2];
		m_objs[0][3] = 1;

		if (isNaN(m_objs[0][0])) {m_objs[0][0] = 0.0; m_objs[0][1] = 0.0; m_objs[0][2] = 0.0; m_objs[0][3] = 1.0;}



		if (!isNaN( _inter[0]))
		{
			if (key_map.lmb || key_map.f)
			{
				_lp[0] = _inter[0];
				_lp[1] = _inter[1];
				_lp[2] = _inter[2];
			}

			_inter_rnd = [roundTo(_lp[0], grid_scale), roundTo(_lp[1], grid_scale), roundTo(_lp[2], grid_scale)];


			// Place point F
			if (key_map.f && runEvery(150))
			{
				var np = new Float32Array([_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], 1.0]);
				addTData(np);
			}

			// Return to floor y
			if (key_map.g && runEvery(350))
			{
				_lp[1] = 0;
				pln_cyc=1;
			}

			// Teleport T
			if (key_map.t && runEvery(350))
			{
				player_pos[0] = _inter[0];
				player_pos[1] = _inter[1]-4.5;
				player_pos[2] = _inter[2];
			}
		}

		_pp = [_lp[0], _lp[1], _lp[2]]; // Point on plane = last point placed
		switch(pln_cyc)
		{
			case 0:
				m_obj_offs[3] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], grid_scale];
				m_obj_offs[4] = [0.0, -500.0, 0.0, grid_scale];
				m_obj_offs[5] = [0.0, -500.0, 0.0, grid_scale];
				break;
			case 1:
				m_obj_offs[3] = [0.0, -500.0, 0.0, grid_scale];
				m_obj_offs[4] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], grid_scale];
				m_obj_offs[5] = [0.0, -500.0, 0.0, grid_scale];
				break;
			case 2:
				m_obj_offs[3] = [0.0, -500.0, 0.0, grid_scale];
				m_obj_offs[4] = [0.0, -500.0, 0.0, grid_scale];
				m_obj_offs[5] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], grid_scale];

				break;
		}



		setData(); // Load all vertices


		turbojs.run(init_dat, `void main(void) {

		// if (read().w == 0.0) {
        //     discard;  // Discard the fragment
        // }

		commit(vec4(
			read().x+float(${-player_pos[0]}), 
			read().y+float(${-player_pos[1]}),
			read().z+float(${-player_pos[2]}),
			1.0
		));
		}`);

		// Rotate around y-axis
		turbojs.run(init_dat, `void main(void) {
		float _yaw = float(${player_look_dir[0]});
		commit(vec4(
			cos(_yaw)*read().x+sin(_yaw)*read().z,
			read().y,
			cos(_yaw)*read().z-sin(_yaw)*read().x,
			read().w 
		));
		}`);

		// Rotate around x-axis (i can't believe dis)
		turbojs.run(init_dat, `void main(void) {
		float _pit = float(${player_look_dir[1]});
		commit(vec4(
			read().x,
			cos(_pit)*read().y-sin(_pit)*read().z,
			sin(_pit)*read().y+cos(_pit)*read().z,
			read().w 
		));
		}`);


		// To do:

		//	Import verticies w/ json
		// 	CLIPPING & OPTIMIZATION
		//	Quaternion fn. Replace all rotation functions. WEBGL fn for quat?
		//  First try making quaternion functions that calc ops with matrices. Useful later.
		//  Add dancing stick figures to every vertex immediately 

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

		//#define PI 3.1415926538
		//float a = PI/14.;

		// float n = 0.015;
		// float f = 500.01;

		//(   read().z * (f+n)/(f-n)+(2.*n*f)/(2.-n)   ),


		turbojs.run(init_dat, `void main(void) {

		// if (read().z > 0.0) {
        //     discard;  // Discard the fragment
        // }
		
		#define _S1 1.0000600006
		#define _S2 7.55682619647
		#define d 0.112672939


		commit(vec4(
			(read().x/d),
			(read().y/d),
			(read().z * _S1+_S2),
			(-read().z)
		));
		}`);	

		turbojs.run(init_dat, `void main(void) {

		// if (read().x > 0.0) {
        //     discard;  // Discard the fragment
        // } 


		if (read().w != 0.)
		{
			commit(vec4(
				(read().x/read().w),
				(read().y/read().w),
				(read().z/read().w),
				read().w
				));
			} else {
			commit(vec4(
				0,
				0,
				0,
				0
				));
			}

		}`);	


		drawIt(init_dat);
		return(init_dat);


	} // End of Compute()


	function runTime()
	{

		Compute(m1);
		//requestAnimationFrame(runTime);
	}

	runTime();
	
	setInterval(runTime, runTime_int); 
	setInterval(setTitle, title_int); 

});




