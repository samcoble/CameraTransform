// ! Memspc

						/*-- 2D Canvas Draw Functions --\
						\------------------------------*/
// Generic draw fns

function drawText(c, txt, x0, y0)
{
	c.fillStyle = "rgba(170, 98, 28, 1.0)"; 
	c.font = "12px Lucida Console";
	c.fillText(txt, x0, y0);
}

function drawRect(c, rgba, x, y, w, h)
{
	c.rect(x, y, w, h);
	c.fillStyle = rgba;
	ctx.fill();
}

function drawRectFrame(c, rgba, x, y, w, h)
{
	c.beginPath();
	c.strokeStyle = rgba; 
	c.rect(x, y, w, h);
	c.lineWidth = 1; c.stroke();
}

function drawPanel(c, x, y, w, h) {drawRect(c, rgba_gray, x, y, w, h); drawRectFrame(c, rgba_lgray, x, y, w, h);}

function fillDot(c, rgba, x, y, s)
{
	c.fillStyle = rgba;
	c.fillRect(x-s/2, y-s/2, s, s);
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



/*
	I'm using javascript to do glsl things totally wrong. Some of this was for fun. I have to rewrite the entire thing with proper glsl from the start.
	With proper glsl I will be able to use an octree to efficiently link screen coordinates with image space.

	use objs for passing fn dat

	// To do:

	-	Fix save & load
	-	CLIPPING & OPTIMIZATION
	-	Quaternion fn. Replace all rotation functions. WEBGL fn for quat?
	-	First try making quaternion functions that calc ops with matrices. Useful later.
	-	Add dancing stick figures to every vertex immediately 


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

	Use bounding boxes on objs 4 physics

	I need vertex select & modification to seamlessly implement hud/hologram to world functions
	-	make a mem obj for a tool. m_vert_slct

	mean_ctr may work.

	store surface planes as their dir vec & any point on the plane






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
var obj_cyc = 9;
var grid_scale = 1;
var grid_scale_f = 1;


var rgba_r ="rgba(200, 50, 50, 0.6)";
var rgba_g ="rgba(50, 200, 50, 0.6)";
var rgba_b ="rgba(50, 50, 200, 0.9)";
var rgba_w = "rgba(255, 255, 255, 1.0)";
var rgba_w_flr = "rgba(222, 222, 222, 0.4)";
var rgba_y = "rgba(240, 240, 50, 1.0)";
var rgba_o = "rgba(245, 213, 63, 1.0)";
var rgba_ch = "rgba(50, 200, 50, 0.9)";
var rgba_lp = "rgba(40, 40, 40, 0.75)";
var rgba_gray = "rgba(10,12,14,0.7)";
var rgba_lgray = "rgba(222, 222, 222, 0.3)";

var rgbas = [rgba_r,rgba_g,rgba_b,rgba_w,rgba_o];
var _inter_rnd = [0.0, 0.0, 0.0];


const fileInput = document.getElementById('fileInput');


var _oh, f_look, f_dist, _inter;
var _nplns = [];
var _plr_world_pos = [];
var _plr_dtp = [];




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
	n: false,
	g: false,
	e: false,
	b: false,
	v: false,
	" ": false,
	control: false,
	shift: false,
	tab: false,
	lmb: false,
	mmb: false,
	rmb: false,
	tab: false,
	alt: false,
	meta: false,
	arrowup: false,
	arrowdown: false,
	arrowleft: false,
	arrowright: false
};

var key_map_prevent = 
{
	shift: false,
	tab: false,
	lmb: false,
	mmb: false,
	rmb: false,
	tab: false
};


// Generic js

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
	// blob binary large object
	const blob = new Blob([_tar], { type: 'application/octet-stream' });
	const _url = URL.createObjectURL(blob);

	// temp anchor
	const anchor = document.createElement('a');
	anchor.href = _url;
	anchor.download = "data"+mem_t_sum+".bin";

	// use .click() to trigger the download
	anchor.click();
	URL.revokeObjectURL(_url);
	key_map.p = false;
}

window.addEventListener('keydown', (event) => {
	
	const key = event.key.toLowerCase();
	if (key_map.hasOwnProperty(key))
	{
		key_map[key] = true;
		if (key_map_prevent.hasOwnProperty(key))
		{
			event.preventDefault();
		}
	}
});

window.addEventListener('keyup', (event) => {
	event.preventDefault();
	const key = event.key.toLowerCase();
		if (key_map.hasOwnProperty(key))
		{
			key_map[key] = false;
			if (key_map_prevent.hasOwnProperty(key))
			{
				event.preventDefault();
			}
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
		if (mouseLock)
		{
		    if ((fov_slide-e.deltaY/300) > 0 && !lock_vert_mov) {fov_slide += -e.deltaY/300};
		    if (lock_vert_mov) {hover_h += -e.deltaY*(key_map.shift+0.2)/14};
		} else if(runEvery(50)) {
			obj_cyc += e.deltaY/Math.pow((e.deltaY)*(e.deltaY), 0.5);
			if (obj_cyc>m_objs.length-1) {obj_cyc=0};
			if (obj_cyc<0) {obj_cyc=m_objs.length-1};
		}

	} else if (runEvery(200)) {
			grid_scale += -e.deltaY/Math.abs(e.deltaY);
			grid_scale_f = Math.pow(2, grid_scale);
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

function dot2(a,b)
{
	return a[0]*b[0] + a[1]*b[1];
}

function add3(a,b)
{
	return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
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
var _lgp = new Float32Array([0.0, 0.0, 0.0]);
var _pp = [-125,0,-125]; // Point on plane will be static
var plr_aim = new Float32Array([0.0,0.0,0.0,1]);
var _lp_world = new Float32Array([0.0,0.0,0.0,1]);
//const m_cube = new Float32Array([-1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
const m_cube = new Float32Array([0.0,0.0,0.0,1, -1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]);
const m_x = new Float32Array([0,0,0,1, 10,0,0,1]);
const m_y = new Float32Array([0,0,0,1, 0,10,0,1]);
const m_z = new Float32Array([0,0,0,1, 0,0,10,1]);
//const m_tri = new Float32Array([0,2,0,1,-1,0,-1,1,1,0,-1,1,1,0,1,1,-1,0,1,1]); //1,0,1,1,-1,0,-1,1,1,0,-1,1



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
var m_flr = setGrid(8*4, 8, 1, [4, 0, -4]);

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
	}
}

function mem_t_mov()
{
	var _tar = new Float32Array(mem_t_sum);
	for (i=0; i<m_t_objs.length; i++)
	{
		_tar[i*4+0] = m_t_objs[i][0]
		_tar[i*4+1] = m_t_objs[i][1]
		_tar[i*4+2] = m_t_objs[i][2]
		_tar[i*4+3] = m_t_objs[i][3]
	}
	m_t_objs.length = 0; mem_t_log.length = 0; mem_t_sum = 0;
	addMData(_tar);
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
addMData(_lp_world);  // 9




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


        //if (!mouseLock)
        //{
        	// drawPanel(ctx, 11, 190, 420, 190+m_objs.length*20);

        	// for (var i = 0; i < m_objs.length; i++)
        	// {
        	// 	drawText(ctx, "objAddr[" + mem_log[i][0] + "]   objSize[" + mem_log[i][1] + "]", 30, 200+i*15);
        	// }
        //}

		//drawPanel(ctx, in_win_w*tool_pnl_sw, in_win_h*(1-tool_pnl_sh), in_win_w*(1-tool_pnl_sw), in_win_h*(1-tool_pnl_sh*0.12));


		drawPanel(ctx, 11, 10, 410, 205);

		drawPanel(ctx, 11, 220, 330, 30+m_objs.length*15);

		drawText(ctx, "pos[" + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+"]", 30, 40);
		drawText(ctx, "aim[" + init_dat.data[mem_log[1][0]].toFixed(1) + ", " + init_dat.data[mem_log[1][0]+1].toFixed(1) + ", " + init_dat.data[mem_log[1][0]+3].toFixed(1)+"]", 220, 40);
		drawText(ctx, "pln_cyc: " + ["X-Plane","Y-Plane","Z-Plane"][pln_cyc], 30, 55);
		drawText(ctx, "grid_scale: " + grid_scale_f, 220, 55);

		drawText(ctx, "W,A,S,D, Shift(sprint), Space(up), X(down), R(plane)", 30, 75);
		drawText(ctx, "N(LOCK mov), Ctrl(mouse), Middle Mouse(camera & sku)", 30, 90);
		drawText(ctx, "Scroll(expand), F(place point), T(teleport), P(save)", 30, 105);
		drawText(ctx, "Scroll+LOCK(vert mov), V(last pnt), G(ground)", 30, 120);
		drawText(ctx, "Scroll+Shift(grid size), E(save obj), B(del obj)", 30, 135);
		drawText(ctx, "Scroll/Arrows(obj nav), RMB(go to pnt), Z(undo)", 30, 150);
		drawText(ctx, "TAB(near pnt by ctr)", 30, 165);
		

    	for (var i = 0; i < m_objs.length; i++)
    	{
			drawText(ctx, "objAddr[" + mem_log[i][0] + "]", 55, 245+i*15); //, 
			drawText(ctx, "objSize[" + mem_log[i][1] + "]", 170, 245+i*15); //, 
			if (i==obj_cyc) {drawText(ctx, "->", 30, 245+i*15);}
			if (i==obj_cyc) {drawText(ctx, "[B][V]", 280, 245+i*15);}
		}



		// bad 4 cpu fix

		var s = Math.pow(fov_slide, 2); // Arbitrary visual scaler

		// Draw packed verts
		for (var i = 1; i<m_objs.length; i++) // i find object
		{
			for (var j = 0; j<mem_log[i][1]/4; j++) // j finds vertex
			{
				if (init_dat.data[4*j+mem_log[i][0]+3] > 0 && init_dat.data[4*(j+1)+mem_log[i][0]+3] > 0) // Line clipping
				// if (1) // Clipping off
				{	
					if (i>8 && j != mem_log[i][1]/4-1)
					{
						if (i==obj_cyc) {
							drawLine(ctx,rgba_y, 1.0, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);
						} else {drawLine(ctx,rgba_w, 1.0, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);}
					}

					if (i >= 6 && i <= 8 && j == 0) {drawLine(ctx,rgbas[i-6], 0.5, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);}
					if (i == 2 && j != mem_log[i][1]/4-1) {drawLine(ctx,rgba_w, 0.4, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, init_dat.data[4*(j+1)+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*(j+1)+mem_log[i][0]+1]*s+in_win_hc);}
					// 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3)
					if (i==1) {
					fillDot(ctx, rgba_w_flr, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3), 0.7))}; 
					
				} // END OF LINE CLIP

				if (init_dat.data[4*j+mem_log[i][0]+3] > 0)
				{
					//if (i > 2)
					//{
						// if (key_map.mmb && i > 5) {drawText(ctx, j, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc);}
						// if (j == mem_log[i][1]/4-1) // Find last vertex
						// {
						// 	//drawText(ctx, "END " + j, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc-32, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc-18);
						// }
					//}
					if (i>2)
					{
						drawDot(ctx, rgbas[pln_cyc], 1, init_dat.data[4*j+mem_log[i][0]]*s+in_win_wc, init_dat.data[4*j+mem_log[i][0]+1]*s+in_win_hc, 1/Math.pow((init_dat.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3), 0.5));
					}
				}
			}
		}

		// Draw unpacked verts
		for (var i = 0; i<m_t_objs.length; i++)
		{
			for (var j = 0; j<mem_t_log[i][1]/4; j++) // fix me?
			{
				if (init_dat.data[4*j+mem_t_log[i][0]+3+mem_sum] > 0 && init_dat.data[4*(j+1)+mem_t_log[i][0]+3+mem_sum] > 0) // Clipping
				// if (1) // Clipping off
				{
					drawDot(ctx, rgba_w, 2, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc, 1/Math.pow((init_dat.data[4*j+mem_t_log[i][0]+3+mem_sum]*(0.03)).toFixed(3),0.7));
					if (i == m_t_objs.length-1)
					{
						drawText(ctx, "END " + i, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc-15, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc-18);
						
						//drawText(ctx, "[" + init_dat.data[4*j+mem_t_log[i][0]+mem_sum] + "] [" + init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum] + "] [" + init_dat.data[4*j+mem_t_log[i][0]+2+mem_sum], init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc-32, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc-18);
					} else {
						drawLine(ctx,rgba_b, 1.3, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc, init_dat.data[4*(j+1)+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*(j+1)+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc);
						if (key_map.mmb) {drawText(ctx, i, init_dat.data[4*j+mem_t_log[i][0]+mem_sum]*s+in_win_wc, init_dat.data[4*j+mem_t_log[i][0]+1+mem_sum]*s+in_win_hc-18);}
					}
				}
			}
		}

		// Draw box for _lp location :: function drawDot(c, rgba, lw, x, y, s)
		if (m_t_objs.length>0 && init_dat.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+3] > 0) {drawDot(ctx, rgba_lp, 1.3, init_dat.data[mem_sum+mem_t_log[mem_t_log.length-1][0]]*s+in_win_wc, init_dat.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+1]*s+in_win_hc, 15);}
		if (init_dat.data[mem_log[9][0]+3] > 0) {drawDot(ctx, rgba_lgray, 1.0, init_dat.data[mem_log[9][0]]*s+in_win_wc, init_dat.data[mem_log[9][0]+1]*s+in_win_hc, 8);}


		// Crosshair
		drawLine(ctx,rgba_ch,0.3,in_win_wc-crosshair_l,in_win_hc, in_win_wc+crosshair_l, in_win_hc);
		drawLine(ctx,rgba_ch,0.3,in_win_wc,in_win_hc-crosshair_l, in_win_wc, in_win_hc+crosshair_l);

		// if (read().x > 0.0) {
        //     discard;  // Discard the fragment
        // } 

		// turbojs.run(init_dat, `void main(void) {


		// 	commit(vec4(
		// 		read().x,
		// 		read().y,
		// 		read().z,
		// 		read().w
		// 		));


		// }`);	


		// for (var i = 0; i<m_t_objs.length; i++)
		// {
		// 	for (var j = 0; j<mem_t_log[i][1]/4; j++) // fix me?
		// 	{
							
		// 	}
		// }




	} // END OF drawIt()





	function Compute(init_dat)
	{

		/*
		________/\\\\\\\\\_______/\\\\\\_______/\\\\____________/\\\\__/\\\\\\\\\\\\\____/\\\________/\\\__/\\\\\\\\\\\\\\\__/\\\\\\\\\\\\\\\_        
		 _____/\\\////////______/\\\////\\\____\/\\\\\\________/\\\\\\_\/\\\/////////\\\_\/\\\_______\/\\\_\///////\\\/////__\/\\\///////////__       
		  ___/\\\/_____________/\\\/___\///\\\__\/\\\//\\\____/\\\//\\\_\/\\\_______\/\\\_\/\\\_______\/\\\_______\/\\\_______\/\\\_____________      
		   __/\\\______________/\\\_______\//\\\_\/\\\\///\\\/\\\/_\/\\\_\/\\\\\\\\\\\\\/__\/\\\_______\/\\\_______\/\\\_______\/\\\\\\\\\\\_____     
		    _\/\\\_____________\/\\\________\/\\\_\/\\\__\///\\\/___\/\\\_\/\\\/////////____\/\\\_______\/\\\_______\/\\\_______\/\\\///////______    
		     _\//\\\____________\//\\\_______/\\\__\/\\\____\///_____\/\\\_\/\\\_____________\/\\\_______\/\\\_______\/\\\_______\/\\\_____________   
		      __\///\\\___________\///\\\___/\\\____\/\\\_____________\/\\\_\/\\\_____________\//\\\______/\\\________\/\\\_______\/\\\_____________  
		       ____\////\\\\\\\\\____\///\\\\\\/_____\/\\\_____________\/\\\_\/\\\______________\///\\\\\\\\\/_________\/\\\_______\/\\\\\\\\\\\\\\\_ 
		        _______\/////////_______\//////_______\///______________\///__\///_________________\/////////___________\///________\///////////////__
		*/


		
		if (key_map.rmb && runEvery(350))
		{
			var _f; var _n_sku = 0; var _t1; var _d = 0;
			_f = Math.pow(Math.pow(init_dat.data[mem_log[obj_cyc][0]], 2) + Math.pow(init_dat.data[mem_log[obj_cyc][0]+1], 2), 0.5);
			for (let k = 0; k<mem_log[obj_cyc][1]/4; k++)
			{
				_t1 = Math.pow(Math.pow(init_dat.data[4*k+mem_log[obj_cyc][0]], 2) + Math.pow(init_dat.data[4*k+mem_log[obj_cyc][0]+1], 2), 0.5);
				if (_t1 < _f)
				{
					_f = _t1;
					_n_sku = k;
				}
			}
			for (var i = 0; i<m_t_objs.length; i++)
			{
				for (var j = 0; j<mem_t_log[i][1]/4; j++)
				{
					_t1 = Math.pow(Math.pow(init_dat.data[4*j+mem_t_log[i][0]+mem_sum], 2) + Math.pow(init_dat.data[4*j+mem_t_log[i][0]+mem_sum+1], 2), 0.5);
					if (_t1 < _f)
					{
						_f = _t1;
						_n_sku = i;
						_d = 1;
					}
				}
			}
			if (_d==1)
			{
				_lp[0] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-4)];
				_lp[1] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-3)];
				_lp[2] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-2)];
				_lp_world[0] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-4)];
				_lp_world[1] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-3)];
				_lp_world[2] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-2)];
			}
			if (_d==0)
			{
				_lp[0] = m_objs[obj_cyc][4*_n_sku];
				_lp[1] = m_objs[obj_cyc][4*_n_sku+1];
				_lp[2] = m_objs[obj_cyc][4*_n_sku+2];
				_lp_world[0] = m_objs[obj_cyc][4*_n_sku];
				_lp_world[1] = m_objs[obj_cyc][4*_n_sku+1];
				_lp_world[2] = m_objs[obj_cyc][4*_n_sku+2];
			}
		}


		//asdfasdf
		if (key_map.tab && runEvery(350))
		{
			var _f = []; var _n_sku = 0; var _t1 = [0, 0, 0]; var _d = 0; var _t2; 
			//_f = Math.pow(Math.pow(init_dat.data[mem_log[obj_cyc][0]], 2) + Math.pow(init_dat.data[mem_log[obj_cyc][0]+1], 2), 0.5);
			for (let i = 1; i<mem_log.length; i++)
			{
				_t1 = [0, 0, 0];
				if (i==1) {_t1 = add3(_t1, [init_dat.data[mem_log[0][0]], init_dat.data[mem_log[i][0]+1], init_dat.data[mem_log[i][0]+2]]); _f = Math.pow(Math.pow(_t1[0], 2) + Math.pow(_t1[1], 2), 0.5);}
				for (let k = 0; k<mem_log[i][1]/4; k++)
				{
					_t1 = add3(_t1, [init_dat.data[4*k+mem_log[i][0]], init_dat.data[4*k+mem_log[i][0]+1], init_dat.data[4*k+mem_log[i][0]+2]]);
				}
				var _l = scale(_t1, 1/(mem_log[i][1]));
				_t2 = Math.pow(Math.pow(_l[0], 2) + Math.pow(_l[1], 2), 0.5);
				if (_t2 < _f)
				{
					_f = _t2;
					_n_sku = i;
					_d = 1;
				}
			}
			obj_cyc = _n_sku;
		}


		if (key_map.p && runEvery(350)) {downloadSaveFile();}

		if (key_map.b && runEvery(350) && obj_cyc > 9)
		{
			if (obj_cyc == m_objs.length-1)
			{
				m_objs.splice(-1);	mem_log.splice(-1); obj_cyc = obj_cyc-1;
			} else {
				let _ts = mem_log[obj_cyc][1];
				for (var i = obj_cyc+1; i<mem_log.length; i++)
				{
					mem_log[i][0] = mem_log[i][0]-_ts;

					//if (i == mem_log.length-1) {m_objs.splice(obj_cyc, 1); mem_log.splice(obj_cyc, 1);}
				}
				m_objs.splice(obj_cyc, 1); mem_log.splice(obj_cyc, 1);
			}
		}

		// ref: m_objs[m_objs.length-1][(mem_log[m_objs.length-1][1]-4)]
		if (key_map.v && runEvery(350))
		{
			if (!isNaN(m_objs[obj_cyc][(mem_log[m_objs.length-1][1]-4)]))
			{
					_lp[0] = m_objs[obj_cyc][(mem_log[m_objs.length-1][1]-4)];
					_lp[1] = m_objs[obj_cyc][(mem_log[m_objs.length-1][1]-3)];
					_lp[2] = m_objs[obj_cyc][(mem_log[m_objs.length-1][1]-2)];
			}
		}




		if (key_map.arrowdown && runEvery(200)) {if (obj_cyc==m_objs.length-1) {obj_cyc=0} else {obj_cyc++;}}
		if (key_map.arrowup && runEvery(200)) {if (obj_cyc==0) {obj_cyc=m_objs.length-1} else {obj_cyc-=1;}}

		if (key_map.e && runEvery(350)) {mem_t_mov(); key_map.e = false;} // m_t_objs.length = 0; mem_t_log.length = 0; obj_cyc = mem_log.length-1;
		
		if (key_map.p && runEvery(350)) {downloadSaveFile();}

		if (key_map.n && runEvery(500)) {lock_vert_mov = !lock_vert_mov;}
		if (lock_vert_mov) {player_pos[1] = -hover_h;}

		if (key_map.r && runEvery(200)) {if (pln_cyc==2) {pln_cyc=0} else {pln_cyc++;}}
		if (key_map.q && runEvery(200)) {if (pln_cyc==0) {pln_cyc=2} else {pln_cyc-=1;}}

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

		if (key_map[" "]) {player_pos[1] -= 0.3*(1+key_map.shift*5);}  // r u 4? srs mane key_map[" "]
		if (key_map.x) {player_pos[1] += 0.3*(1+key_map.shift*5);}
		


		if (key_map.control || key_map.alt || key_map.meta)
		{
			mouseLock = 0;
			document.exitPointerLock();
			key_map.meta = false; key_map.alt = false;
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

		// Use gpu here w/ the right size array32

		_oh = dot(player_pos,[0,1,0,1]);
		f_look = rot_y_pln(rot_x_pln([0,0,1,1],-player_look_dir[1]),-player_look_dir[0]);
		f_dist = -_oh/dot(N,norm(f_look));
		_nplns = [[1,0,0],[0,1,0],[0,0,1]][pln_cyc]; // use pln_cyc to select norm vec from array of norm vecs
		_plr_world_pos = [player_pos[0],player_pos[1],player_pos[2]];
		_plr_dtp = [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]];
		_inter = lpi(_plr_dtp,_plr_world_pos,_pp,_nplns);


		m_objs[0][0] = _inter[0];
		m_objs[0][1] = _inter[1];
		m_objs[0][2] = _inter[2];
		m_objs[0][3] = 1;

		if (isNaN(m_objs[0][0])) {m_objs[0][0] = 0.0; m_objs[0][1] = 0.0; m_objs[0][2] = 0.0; m_objs[0][3] = 1.0;}



		if (!isNaN( _inter[0])) // Fix strange multiple key capture to place point. No run every here.
		{
			_inter_rnd = [roundTo(_lp[0], grid_scale_f), roundTo(_lp[1], grid_scale_f), roundTo(_lp[2], grid_scale_f)];

			if (key_map.lmb && mouseLock)
			{
				_lp[0] = _inter[0];
				_lp[1] = _inter[1];
				_lp[2] = _inter[2];
				_lp_world[0] = _inter_rnd[0];
				_lp_world[1] = _inter_rnd[1];
				_lp_world[2] = _inter_rnd[2];
			}


			// Place point F
			if (key_map.f && runEvery(250))
			{
				var np = new Float32Array([_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], 1.0]);
				addTData(np);
			}

			// Return to ground g
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
				m_obj_offs[3] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], grid_scale_f];
				m_obj_offs[4] = [0.0, -500.0, 0.0, grid_scale_f];
				m_obj_offs[5] = [0.0, -500.0, 0.0, grid_scale_f];
				break;
			case 1:
				m_obj_offs[3] = [0.0, -500.0, 0.0, grid_scale_f];
				m_obj_offs[4] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], grid_scale_f];
				m_obj_offs[5] = [0.0, -500.0, 0.0, grid_scale_f];
				break;
			case 2:
				m_obj_offs[3] = [0.0, -500.0, 0.0, grid_scale_f];
				m_obj_offs[4] = [0.0, -500.0, 0.0, grid_scale_f];
				m_obj_offs[5] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], grid_scale_f];
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




/*
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