
/*
	__/\\\\____________/\\\\__/\\\\\\\\\\\\\\\__/\\\\____________/\\\\_______________________/\\\\\\\\\\\____/\\\\\\\\\\\\\__________/\\\\\\\\\_        
	 _\/\\\\\\________/\\\\\\_\/\\\///////////__\/\\\\\\________/\\\\\\_____________________/\\\/////////\\\_\/\\\/////////\\\_____/\\\////////__       
	  _\/\\\//\\\____/\\\//\\\_\/\\\_____________\/\\\//\\\____/\\\//\\\____________________\//\\\______\///__\/\\\_______\/\\\___/\\\/___________      
	   _\/\\\\///\\\/\\\/_\/\\\_\/\\\\\\\\\\\_____\/\\\\///\\\/\\\/_\/\\\_____________________\////\\\_________\/\\\\\\\\\\\\\/___/\\\_____________     
	    _\/\\\__\///\\\/___\/\\\_\/\\\///////______\/\\\__\///\\\/___\/\\\________________________\////\\\______\/\\\/////////____\/\\\_____________    
	     _\/\\\____\///_____\/\\\_\/\\\_____________\/\\\____\///_____\/\\\___________________________\////\\\___\/\\\_____________\//\\\____________   
	      _\/\\\_____________\/\\\_\/\\\_____________\/\\\_____________\/\\\____________________/\\\______\//\\\__\/\\\______________\///\\\__________  
	       _\/\\\_____________\/\\\_\/\\\\\\\\\\\\\\\_\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_\///\\\\\\\\\\\/___\/\\\________________\////\\\\\\\\\_ 
	        _\///______________\///__\///////////////__\///______________\///__\///////////////____\///////////_____\///____________________\/////////__
*/


// set_mov    &    dyn_mov

// button to output linear obj to console

// enter key opens text overlay to search for function. goes like: [ENTER] type "link" [ENTER] -> link is member of table call it's function. Function stored in switch case calls obj_link();
	// and "link.k=l" rebinds link(); activator key to l. And if already bound swap.
	// if any part of text is contained by a list of syntax display those options below and what options exist after the dot operator 

// the tab alg can be applied compression relative to center. like a 3d mesh impacting the screen creating a focal lense. this would actually slightly help differentiate object's that are close together IN 2D. maybe..

// low call rate mean ctr map overlay BINGO
//		single Float32Array encodes x mean y mean x mean y mean x mean ...


// better isNan obj inspector to use where the extra time is worth doing the check ? might ruin program over time


/*
	Badly need to implement a structure and system for tools generally such that every tool overrides some keys.
		Points should be a point tool (Place point - F)
		Circle tool (Place circle - F) (I need a later formula to compress a 4 point circle to align with the grid)
		Center Expand (Start/Finish applied as delta - F)
		Dynamic Expand (Applies compression/expansion with 3 input numbers)
		Rotate around Axis (For now input into box with deg. Use point and plane line)
		Stacker tool (Accepts distance and stacks) (Two input boxes)

		I'm starting to notice animated effects require a temporary duplicate object to perform interpolation. Big system.

*/

/*
	I'm using javascript to do glsl things totally wrong. Some of this was for fun. I have to rewrite the entire thing with proper glsl from the start.
	With proper glsl I will be able to use an octree to efficiently link screen coordinates with image space.

	Might still be possible to salvage w/ my own api to fix the refresh rate limitation here. Pretty bad using setInterval (only for druggies). or worse javascript eval(); you can go to jail for this.
	Badly need to give lpi and other obj algs a go in glsl. Even worth doing until I redo api????

	Octree is a mem struct !? rewrite data or use new file type ig

	To continue adding groupings I'll just make the data format [x y z w g1 g2 gn...] [x y z w g1 g2 gn...] [x y z w g1 g2 gn...] ...

	// PROBABLY GOING TO DO SOON:

	-	Obj explode needs update.
			explode with c is done.
			if an obj has been exploded or one is drawn (m_t_objs.length > 0) then c now gets sku from point finder and allows (split obj, delete point, add point in sequence)

	-	Link settings
			Linear is done.
			Zigzag is for better wireframe viewing
			Poly type is the most common but makes the wire frame very busy

	-	Rotate around point
		
			make obj_rots[]
			sync w/ creation/deletion w/ [0,0,0] p,y,r in rads
			create animated circle rotator ( later input ang in deg -> converted to rads by Math.floor(in_rad/pi), and with modulo in_rad % pi )
			must make circle first ig..
			actually my expansion function was the same function except instead of rotating points that were translated to origin they're expanded.. so already half done.

	-	Sphere generation

	-	Surface generation
	
	-	Fix the Tab query alg. I have made it a 3d 2d near mean instead of 2d near mean.
	-	Shift + Tab for multi selection. Also make mouse selector

	-	Merge function: should already have the functions. Need to make a sequenced event (colorized). 3 keys. Start(finish). Abort. Select all non world. Maybe leave this for last????


	// PROBABLY NOT SO SOON

	-	Use a bezier function of n points. Dynamic integral function to find the arc length. arc_l/n provides the sections to be influenced by perp vectors &&&&!!!! the actual vertices of the curve. Divide by n and n/2. Go to n-n/2
	-	Maybe a separate self made api for handling the screen interface would be wise.
	-	It really needs 3d/2d simple text obj generation for real notepad capacity. Idk how to edit something like that other than detecting the objects vertices relative and essentially making a hash table. Easier to just store the string in the bg. More arrays...
	-	Effects and sounds.  Recreate similar Hl2 sounds.


	// MAYBE SOME TIME IN 2053 (after christ)

	-	CLIPPING & OPTIMIZATION
	-	Quaternion fn. Replace all rotation functions. WEBGL fn for quat?
	-	First try making quaternion functions that calc ops with matrices. Useful later.
	-	Add dancing stick figures to every vertex immediately. I will do this. Don't fuck with me.


	m_obj_offs = []; // [[dx,dy,dz], [dx,dy,dz], ...]
		place new grid overlay obj
		align cycle planes w/

	use mouse 2d dir vec to dot w/ list of screen buttons [x,y] to only check for intersection if any part is 'in'
		reducing menu cpu cost. also can skip entire obj in that case. probably just make a path log and find that mean dir

	add clipping sides & what happens if 3 points where 1 is out ?
		total points goes from 3 to 4. This can happen n times per poly. How deal w/ data??????

	obj_select(_r); where _r is radius from center screen to screen space points. Same dot sequence to sort?
		how about auto group points to 3d sectors and a single ray trace reveals some any quantity of data within the block.
		inconclusive. Math implies computation. blocks can't fail. 

	Holy shit there's an algorithm for this lmao. This always happens to me.
	https://en.wikipedia.org/wiki/Octree

	Use bounding boxes on objs 4 physics

	I need vertex select & modification to seamlessly implement hud/hologram to world functions
		make a mem obj for a tool. m_vert_slct

	store surface planes as their dir vec & any point on the plane. Have a list of planes basically. Localize all draw functionality to the plane allowing for direct modeling perp to the surface.
		even more wild: localize camera to surface (insane)

*/




						/*-- Var Decs --\
						\--------------*/

// !
//var runTime_int = 1; // Time delay between frames as they render // Replaced with requestanimationframe
var menuTime_int = 170;
var title_int = 350;
// !

// Timer
var date_now = 0;

// Maybe move this into DOM LOAD event instead and keep var init.
var in_win_w = document.getElementsByTagName("html")[0].clientWidth; var in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
var in_win_h = document.getElementsByTagName("html")[0].clientHeight; var in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;
const fileInput = document.getElementById('fileInput');

var screen_width, screen_height;

var pi = 3.1415926538; // High definition PI makes a visible difference
var pi4 = 0.7071067811; // My fav number
var pi2 = 6.2831853071



var player_look_dir = [0, 0, 0]; //-pi/12
var player_look_dir_i = [0, 0, 0];
var aim_dir = [0.0, 0.0, 0.0];
var aim_dir_n = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];  // rt data
var mouseDataS = [0.0, 0.0]; // saved state
var mouseDataI = [0.0, 0.0]; // initial
var mouseDataD = [0.0, 0.0]; // delta
var mouseLock = 0; 
var lookToggle = 0;

var fov_slide = 8.0; var s_fov = Math.pow(fov_slide, 2);

var crosshair_l = 5;
var crosshair_w = 0.4;

var player_pos = [0.0,-14.0,0]; // Having this many _player_pos need entire refactor, should use gpu
var w_player_pos = [0.0,0.0,0.0];
var wf_player_pos = [0.0,0.0,0.0];
var wt_player_pos = [0.0,0.0,0.0];
var _inter_rnd = [0.0, 0.0, 0.0];



var hover_h = 11.5;
var lock_vert_mov = false;
var pln_cyc = 1;
var obj_cyc = 0;
var grid_scale = 3; var grid_scale_f = 8;
var trns_lock = 0; var trns_obj_i = 0;
var world_obj_count = 0;
var menu_controls_lock = 0;
var link_lock = 0; var link_obj_i = 0;
var exp_lin_lock = 0; var exp_lin_obj_i = 0;

var stn_cir_tool = [8, 24, 0];
var stn_draw = [true, true];


var menu_q_pos = [250, 290];

// Premade color strings and color arrays

var rgba_r = "rgba(200, 50, 50, 0.6)";
var rgba_g = "rgba(50, 200, 50, 0.6)";
var rgba_b = "rgba(50, 50, 200, 1.0)";
var rgba_w = "rgba(255, 255, 255, 1.0)";
var rgba_w_flr = "rgba(222, 222, 222, 0.8)";
var rgba_y = "rgba(240, 240, 50, 1.0)";
var rgba_o = "rgba(245, 213, 63, 1.0)";
var rgba_ch = "rgba(50, 200, 50, 0.9)";
var rgba_lp = "rgba(40, 40, 40, 0.75)";
var rgba_gray = "rgba(10, 12, 14, 1.0)";
var rgba_lgray = "rgba(222, 222, 222, 0.3)";
var rgba_otext = "rgba(188, 118, 48, 1.0)";
var rgba_dtext = "rgba(111, 111, 111, 1.0)";

var rgbas = [rgba_r, rgba_g, rgba_b, rgba_w, rgba_o];
var rgbas_link = [rgba_y, rgba_b];
var rgbas_trans = [rgba_lgray, rgba_g];

var rgba_w_tri1 = "rgba(255, 255, 255, 0.2)";
var rgba_w_tri2 = "rgba(225, 225, 225, 0.2)";
var rgba_w_tri3 = "rgba(195, 195, 195, 0.2)";
var rgba_w_tri4 = "rgba(165, 165, 165, 0.2)";

var rgbas_tri = [rgba_w_tri1, rgba_w_tri2, rgba_w_tri3, rgba_w_tri4];

var _oh, f_look, f_dist, _inter;
var _nplns = [];
var _plr_world_pos = [];
var _plr_dtp = [];




						/*-- 2D Canvas Draw Functions --\
						\------------------------------*/


function drawText(c, rgba, ta, txt, x0, y0)
{
	c.textAlign = ta;
	c.fillStyle = rgba; 
	c.font = "12px Lucida Console";
	c.fillText(txt, x0, y0);
}

function drawRect(c, rgba, x, y, w, h)
{
	c.rect(x, y, w, h);
	c.fillStyle = rgba;
	c.fill();
}

function drawRectFrame(c, rgba, x, y, w, h)
{
	c.beginPath();
	c.strokeStyle = rgba; 
	c.rect(x, y, w, h);
	c.lineWidth = 1; c.stroke();
}

function drawPanel(c, rgba1, rgba2, x, y, w, h) {drawRect(c, rgba1, x, y, w, h); drawRectFrame(c, rgba2, x, y, w, h);}

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

function drawTriangle(c, p1x, p1y, p2x, p2y, p3x, p3y, rgba)
{
    c.beginPath();
    c.moveTo(p1x, p1y);
    c.lineTo(p2x, p2y);
    c.lineTo(p3x, p3y);
    c.closePath();
    c.fillStyle = rgba;
    c.fill();
}


						/*-- Key & Mouse event capture --\
						\-------------------------------*/



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
	y: false,
	c: false,
	m: false,
	l: false,
	"2": false,
	"3": false,
	" ": false,
	control: false,
	shift: false,
	enter: false,
	tab: false,
	lmb: false,
	mmb: false,
	rmb: false,
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
	q: false
};



onmousemove = function(e)
{
	if (mouseLock)
		{
			player_look_dir = [ player_look_dir[0]+0.4*(e.movementX/in_win_w * pi * 2) , player_look_dir[1]-0.4*(e.movementY/in_win_w * pi * 2) , 0 ];
		} else {mouseData[0] = e.clientX; mouseData[1] = e.clientY;}

	if (player_look_dir[0] > 2*pi) [player_look_dir[0] = 0.0]; // This is kinda wack need to refactor entire system for this
	if (player_look_dir[0] < -2*pi) [player_look_dir[0] = 0.0];
}


// Generic js

function downloadSaveFile()
{
    var t_sum = 0;
    for (var i = world_obj_count + 1; i < mem_log.length; i++) {t_sum += mem_log[i][1];}

    var _tar = new Float32Array(t_sum);
    var _ti = 0;  // Track total index in _tar

    for (var i = world_obj_count + 1; i < m_objs.length; i++)
    {
        for (var j = 0; j < mem_log[i][1] / 4; j++)
        {
            var _bi = _ti; var _i = _bi * 4;
            _tar[_i] = m_objs[i][j * 4];
            _tar[_i + 1] = m_objs[i][j * 4 + 1];
            _tar[_i + 2] = m_objs[i][j * 4 + 2];
            _tar[_i + 3] = i - world_obj_count; // The magic
            _ti++;
        }
    }

    // Convert Float32Array to ArrayBuffer
    var arrayBuffer = _tar.buffer;

    // blob binary large object
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    const _url = URL.createObjectURL(blob);

    // temp anchor
    const anchor = document.createElement('a');
    anchor.href = _url;
    anchor.download = "data" + _tar.length + ".bin";

    // use .click() to trigger the download
    anchor.click();
    URL.revokeObjectURL(_url);
    key_map.p = false;
}



window.addEventListener('keydown', (event) =>
{
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

window.addEventListener('keyup', (event) =>
{
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
		} else if(runEvery(50))
		{
			obj_cyc += e.deltaY/Math.pow((e.deltaY)*(e.deltaY), 0.5);
			if (obj_cyc>m_objs.length-1) {obj_cyc=0};
			if (obj_cyc<0) {obj_cyc=m_objs.length-1};
		}

	} else if (runEvery(200)) {
			grid_scale += -e.deltaY/Math.abs(e.deltaY);
			grid_scale_f = Math.pow(2, grid_scale);
	}
	s_fov = Math.pow(fov_slide, 2);
});




						/*-- Title meme fn --\
						\-------------------*/



let title = ".-'-._.-._.-'-._.-._space_mem_crystal_.-._.-'-._.-._.-'-._.-._doors_hath_many_.-._.-'-._.-._.-'-._silicon_bonsai_.-._";


function makeTitle(_s)
{
	var _l = _s.length;
	var _o = "";
	_o = _o + _s.substring(_l-1,_l);
	for (var i = 1; i<=(_l-1); i++) {_o = _o + _s.substring(i-1,i);}
	return _o;
}

function setTitle()
{
	title = makeTitle(title);
	document.title = title;
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

function sub3(a,b)
{
	return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];
}

function len3(a)
{
	return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
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
    //return n>1 ? (Math.floor(value / n) * n) : (Math.round(value / n) * n);
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

var _lp = new Float32Array([0.0,0.0,0.0,1]);
var _lgp = new Float32Array([0.0, 0.0, 0.0]);
var _pp = [-125,0,-125]; // Point on plane will be static
var plr_aim = new Float32Array([0.0,0.0,0.0,1]);

var _lp_world = new Float32Array([0.0,0.0,0.0,1]);
var _lop_world = new Float32Array([0.0,0.0,0.0,1]);
var trans_f = new Float32Array([0.0,0.0,0.0,1]);
var exp_f = new Float32Array([0.0,0.0,0.0,1]);

//const m_cube = new Float32Array([-1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
const m_cube = new Float32Array([0.0,0.0,0.0,1, -1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]);
const m_x = new Float32Array([0,0,0,1, 8,0,0,1]);
const m_y = new Float32Array([0,0,0,1, 0,8,0,1]);
const m_z = new Float32Array([0,0,0,1, 0,0,8,1]);
//const m_tri = new Float32Array([0,2,0,1,-1,0,-1,1,1,0,-1,1,1,0,1,1,-1,0,1,1]); //1,0,1,1,-1,0,-1,1,1,0,-1,1



var _flr = 6*8; // Side length of square
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
						_ob[(i*_l+j)*4+1] = _s*i - _l/2*_s +_s/2 + _o[1];
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
						_ob[(i*_l+j)*4+1] = _s*i - _l/2*_s +_s/2 + _o[2];
						_ob[(i*_l+j)*4+2] = _o[2];
						_ob[(i*_l+j)*4+3] = 1;
						break;
			}

		}
	}
	return _ob;
}


function make_cir_obj(_d, _s, _o, _p) // divisions, scale, offset, plane : maybe fix z later
{
	// r = 2pi
	// s = x^2 + y^2
	// x = sqrt(s)*cos(r)	y = sqrt(s)*sin(r)

	var _r = pi2/_d;
	var _of = _o*pi2/360;
	var c_pnts = new Float32Array(4*_d+4);
	switch(_p)
	{
		case 0:
			for (var n = 0; n<=_d; n++)
			{
				c_pnts[n*4+0] = _lp_world[0];
				c_pnts[n*4+1] = _lp_world[1]+_s*Math.sin(_r*n+_of);
				c_pnts[n*4+2] = _lp_world[2]+_s*Math.cos(_r*n+_of);
			}
			m_objs_loadPoints(c_pnts);
			break;
		case 1:
			for (var n = 0; n<=_d; n++)
			{
				c_pnts[n*4+0] = _lp_world[0]+_s*Math.cos(_r*n+_of);
				c_pnts[n*4+1] = _lp_world[1];
				c_pnts[n*4+2] = _lp_world[2]+_s*Math.sin(_r*n+_of);
			}
			m_objs_loadPoints(c_pnts);
			break;
		case 2:
			for (var n = 0; n<=_d; n++)
			{
				c_pnts[n*4+0] = _lp_world[0]+_s*Math.cos(_r*n+_of);
				c_pnts[n*4+1] = _lp_world[1]+_s*Math.sin(_r*n+_of);
				c_pnts[n*4+2] = _lp_world[2];
			}
			m_objs_loadPoints(c_pnts);
			break;
	}
}


function splitObj(ar) // Accepts linear outputs array of 4d points
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
var m_flr = setGrid(8*4-2, 8, 1, [4, 0, 4]); // Fix this map & floor align with simple settings

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
		__/\\\\\\\\\\\\________/\\\\\\\\\_____/\\\\\\\\\\\\\\\_____/\\\\\\\\\_______________/\\\\\\\\\\\\\\\__/\\\\\_____/\\\_____/\\\\\\\\\\\___        
		 _\/\\\////////\\\____/\\\\\\\\\\\\\__\///////\\\/////____/\\\\\\\\\\\\\____________\/\\\///////////__\/\\\\\\___\/\\\___/\\\/////////\\\_       
		  _\/\\\______\//\\\__/\\\/////////\\\_______\/\\\________/\\\/////////\\\___________\/\\\_____________\/\\\/\\\__\/\\\__\//\\\______\///__      
		   _\/\\\_______\/\\\_\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\___________\/\\\\\\\\\\\_____\/\\\//\\\_\/\\\___\////\\\_________     
		    _\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_______\/\\\_______\/\\\\\\\\\\\\\\\___________\/\\\///////______\/\\\\//\\\\/\\\______\////\\\______    
		     _\/\\\_______\/\\\_\/\\\/////////\\\_______\/\\\_______\/\\\/////////\\\___________\/\\\_____________\/\\\_\//\\\/\\\_________\////\\\___   
		      _\/\\\_______/\\\__\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\___________\/\\\_____________\/\\\__\//\\\\\\__/\\\______\//\\\__  
		       _\/\\\\\\\\\\\\/___\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\___________\/\\\_____________\/\\\___\//\\\\\_\///\\\\\\\\\\\/___ 
		        _\////////////_____\///________\///________\///________\///________\///____________\///______________\///_____\/////____\///////////_____
	*/


var m1 = turbojs.alloc(20000); // Everything
for (i=0; i<m1.data.length; i++)
{
	m1.data[i] = 0.0;
}
var m_obj_offs = [];


function m_objs_loadPoints(ar) // Adds objects
{
	m_objs[m_objs.length] = ar; // Append ar to m_objs
	mem_log.push([mem_sum, ar.length]);
	mem_sum += ar.length;
	m_obj_offs.push([0.0, 0.0, 0.0, 1]);
}

function m_t_objs_loadPoint(ar) // Adds point to stack
{
	m_t_objs[m_t_objs.length] = ar;
	mem_t_log.push([mem_t_sum, ar.length]);
	mem_t_sum += ar.length;
}

function m_t_objs_loadPoints(ar)
{
	for (i=0; i<ar.length; i++)
	{
		m_t_objs[m_t_objs.length] = ar[i];
		mem_t_log.push([mem_t_sum, ar[i].length]);
		mem_t_sum += ar[i].length;
	}
}

function mem_t_mov() // Puts m_t_objs into m_objs as single array 
{
	if (mem_t_sum != 0)
	{
		var _tar = new Float32Array(mem_t_sum);
		for (i=0; i<m_t_objs.length; i++)
		{
			_tar[i*4+0] = m_t_objs[i][0]
			_tar[i*4+1] = m_t_objs[i][1]
			_tar[i*4+2] = m_t_objs[i][2]
			_tar[i*4+3] = m_t_objs[i][3]
		}
		m_t_objs.length = mem_t_log.length = mem_t_sum = 0;
		m_objs_loadPoints(_tar);
	}
}

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


	/*
		__/\\\___________________/\\\\\__________/\\\\\\\\\_____/\\\\\\\\\\\\_______________/\\\\\\\\\\\\________/\\\\\\\\\_____/\\\\\\\\\\\\\\\_____/\\\\\\\\\____        
		 _\/\\\_________________/\\\///\\\______/\\\\\\\\\\\\\__\/\\\////////\\\____________\/\\\////////\\\____/\\\\\\\\\\\\\__\///////\\\/////____/\\\\\\\\\\\\\__       
		  _\/\\\_______________/\\\/__\///\\\___/\\\/////////\\\_\/\\\______\//\\\___________\/\\\______\//\\\__/\\\/////////\\\_______\/\\\________/\\\/////////\\\_      
		   _\/\\\______________/\\\______\//\\\_\/\\\_______\/\\\_\/\\\_______\/\\\___________\/\\\_______\/\\\_\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\_     
		    _\/\\\_____________\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\___________\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_______\/\\\_______\/\\\\\\\\\\\\\\\_    
		     _\/\\\_____________\//\\\______/\\\__\/\\\/////////\\\_\/\\\_______\/\\\___________\/\\\_______\/\\\_\/\\\/////////\\\_______\/\\\_______\/\\\/////////\\\_   
		      _\/\\\______________\///\\\__/\\\____\/\\\_______\/\\\_\/\\\_______/\\\____________\/\\\_______/\\\__\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\_  
		       _\/\\\\\\\\\\\\\\\____\///\\\\\/_____\/\\\_______\/\\\_\/\\\\\\\\\\\\/_____________\/\\\\\\\\\\\\/___\/\\\_______\/\\\_______\/\\\_______\/\\\_______\/\\\_ 
		        _\///////////////_______\/////_______\///________\///__\////////////_______________\////////////_____\///________\///________\///________\///________\///__
	*/


m_objs_loadPoints(plr_aim);      // 0
m_objs_loadPoints(m_flr);        // 1
m_objs_loadPoints(m_map);        // 2
m_objs_loadPoints(g_over_x);     // 3
m_objs_loadPoints(g_over_y);     // 4
m_objs_loadPoints(g_over_z);     // 5
m_objs_loadPoints(m_x);          // 6
m_objs_loadPoints(m_y);          // 7
m_objs_loadPoints(m_z);          // 8
m_objs_loadPoints(_lp_world);    // 9
m_objs_loadPoints(_lop_world);   // 10

world_obj_count = obj_cyc = m_objs.length-1;

setData();



var canvas = document.getElementById("cv");
var canvas_over = document.getElementById("cv_over");
var ctx = canvas.getContext("2d");

var ctx_o = canvas_over.getContext("2d");


// WTF IS THIS YO. Fix for mac users at some point if this doesn't already.
// const ratio = window.devicePixelRatio || 1;

ctx.scale(1, 1); ctx_o.scale(1, 1);


canvas_over.addEventListener("click", async () => 
{
	await canvas_over.requestPointerLock();
	mouseLock = 1;
});


window.addEventListener('resize', function()
{
	in_win_w = document.getElementsByTagName("html")[0].clientWidth; in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
	in_win_h = document.getElementsByTagName("html")[0].clientHeight; in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;
	document.getElementById("cv").width = document.getElementById("cv_over").width = in_win_w;
	document.getElementById("cv").height = document.getElementById("cv_over").height = in_win_h;
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;
});



// Obj load & unpack
fileInput.addEventListener('change', event => 
{
	const _fi = event.target.files[0];
	if (_fi)
	{
		const _r = new FileReader();
		_r.onload = event => {
			const _ab = event.target.result;
			const _fa = new Float32Array(_ab);
			var _gs = [0]; // indice map
			var _s = 1; // start
			for (var i=0; i<_fa.length/4; i++)
			{
				if (_fa[i*4+3] != _s) {_s++; _gs.push(i*4);}
			}
			for (var n=0; n<_gs.length; n++)
			{
				if (n!=_gs.length-1) {var _tar = Array.from(_fa.slice(_gs[n], _gs[n+1])); m_objs_loadPoints(new Float32Array(_tar));}
				if (n==_gs.length-1) {var _tar = Array.from(_fa.slice(_gs[_gs.length-1], _gs[_fa.length-1])); m_objs_loadPoints(new Float32Array(_tar));}
			}
		};
		_r.readAsArrayBuffer(_fi);
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

function del_obj(_i)
{
	if (obj_cyc == m_objs.length-1)
	{
		m_objs.splice(-1);	mem_log.splice(-1); m_obj_offs.splice(-1); obj_cyc = obj_cyc-1;
	} else {
		let _ts = mem_log[obj_cyc][1];
		for (var i = obj_cyc+1; i<mem_log.length; i++)
		{
			mem_log[i][0] = mem_log[i][0]-_ts;
		}
		m_objs.splice(obj_cyc, 1); mem_log.splice(obj_cyc, 1); m_obj_offs.splice(obj_cyc, 1);
	}
}

function trans_obj(_i)
{
	if (_i<=world_obj_count) {return;}
	var _fd;
	switch(trns_lock)
	{
		case 0:
			trans_f[0] = _lop_world[0] = _lp_world[0];
			trans_f[1] = _lop_world[1] = _lp_world[1];
			trans_f[2] = _lop_world[2] = _lp_world[2];
			trns_lock = 1; trns_obj_i = _i;
			break;

		case 1:
			_fd = sub(_lp_world, trans_f);
			for (var i=0; i<mem_log[trns_obj_i][1]/4; i++)
			{
				m_objs[trns_obj_i][i*4] = m_objs[trns_obj_i][i*4]+_fd[0];
				m_objs[trns_obj_i][i*4+1] = m_objs[trns_obj_i][i*4+1]+_fd[1];
				m_objs[trns_obj_i][i*4+2] = m_objs[trns_obj_i][i*4+2]+_fd[2];
			}
				m_obj_offs[trns_obj_i][0] = 0;
				m_obj_offs[trns_obj_i][1] = 0;
				m_obj_offs[trns_obj_i][2] =	0;
			trns_lock = 0; obj_cyc = trns_obj_i;
			break;
	}
}

function menu_tog_controls()
{
	switch(menu_controls_lock)
	{
		case 0:
			menu_controls_lock = 1;
			break;

		case 1:
			menu_controls_lock = 0;
			break;
	}
}

function m_objs_explode(_i)
{
	var _tp = [];
	for (var i=0; i<mem_log[_i][1]/4; i++)
	{
		_tp[i*4] = m_objs[_i][i*4];
		_tp[i*4+1] = m_objs[_i][i*4+1];
		_tp[i*4+2] = m_objs[_i][i*4+2];
		_tp[i*4+3] = m_objs[_i][i*4+3];
	}
	m_t_objs_loadPoints(splitObj(new Float32Array(_tp)));
	del_obj(_i);
}

function link_obj(_i) // Do I need to use float32array for everything what am I doing. Add 3 point poly mode.
{
	switch(link_lock)
	{
		case 0:
			link_obj_i = _i;
			link_lock = 1;
			break;
		case 1:
			if (mem_log[_i][1] != mem_log[link_obj_i][1] || _i == link_obj_i) {link_lock = 0; link_obj_i = 0; break;} //console.log("can't link");
			var _ia = JSON.stringify([m_objs[_i][0], m_objs[_i][1], m_objs[_i][2], 1, m_objs[link_obj_i][0], m_objs[link_obj_i][1], m_objs[link_obj_i][2], 1]);
			for (var i = 0; i<mem_log[_i][1]/4; i++)
			{
				//var _ob = Float32Array(8);
				var _ob = [];
				_ob = [m_objs[_i][i*4], m_objs[_i][i*4+1], m_objs[_i][i*4+2], 1, m_objs[link_obj_i][i*4], m_objs[link_obj_i][i*4+1], m_objs[link_obj_i][i*4+2], 1];
				if (i == mem_log[_i][1]/4-1)
				{ // Double nested to avoid unnecesarry second call to JSON.stringify()
					if (_ia != JSON.stringify(_ob))
					{m_objs_loadPoints(new Float32Array(_ob));}
				} else {m_objs_loadPoints(new Float32Array(_ob));}
			}
			link_obj_i = 0; link_lock = 0;
			break;
	}
}

function expand_obj(_i)
{
	switch(exp_lin_lock)
	{
		case 0:
			exp_lin_obj_i = _i;
			exp_f[0] = _lp_world[0];
			exp_f[1] = _lp_world[1];
			exp_f[2] = _lp_world[2];
			exp_lin_lock = 1;
			break;
		case 1:

			var _pm = [m_objs[exp_lin_obj_i][0], m_objs[exp_lin_obj_i][1], m_objs[exp_lin_obj_i][2]];
			for (var j=1; j<mem_log[exp_lin_obj_i][1]/4; j++)
			{
				_pm = add3([m_objs[exp_lin_obj_i][j*4], m_objs[exp_lin_obj_i][j*4+1], m_objs[exp_lin_obj_i][j*4+2]], _pm);
			}

			var _mc = scale(_pm, 1/(mem_log[exp_lin_obj_i][1]/4));
			var _d = sub(_lp_world, _mc);
			var _s = Math.pow(len3(sub(_lp_world, exp_f)),1/3);

			for (var i=0; i<mem_log[exp_lin_obj_i][1]/4; i++)
			{
				//c=====x--------------0
				//c--------------------0=====x
				//c--------------------0==========x
				//c==========x---------0

				m_objs[exp_lin_obj_i][i*4] = _mc[0]+_s*(m_objs[exp_lin_obj_i][i*4]-_mc[0]);
				m_objs[exp_lin_obj_i][i*4+1] = _mc[1]+_s*(m_objs[exp_lin_obj_i][i*4+1]-_mc[1]);
				m_objs[exp_lin_obj_i][i*4+2] = _mc[2]+_s*(m_objs[exp_lin_obj_i][i*4+2]-_mc[2]);

			}
			exp_lin_obj_i = 0; exp_lin_lock = 0;
			break;
	}
}



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


function drawOverlay(init_dat)
{
	ctx_o.clearRect(0, 0, in_win_w, in_win_h);


	//Crosshair
	drawLine(ctx_o, rgba_ch, crosshair_w, in_win_wc-crosshair_l,in_win_hc, in_win_wc+crosshair_l, in_win_hc);
	drawLine(ctx_o, rgba_ch, crosshair_w, in_win_wc,in_win_hc-crosshair_l, in_win_wc, in_win_hc+crosshair_l);

	// Maybe use
	// document.getElementsByClassName('stn_cir').item(0).style
	// or
	// var elements = document.querySelectorAll('.classhere');

    if (!mouseLock)
    {
    	var menu_inputs = document.querySelectorAll('.stn_');
        menu_inputs.forEach(function(e) {e.style.display = "block";});


    	// Large back pan
    	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]-10, menu_q_pos[1], 400, 633);
    	
    	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+1, menu_q_pos[1]+24, 383, 598);

    	///////////////////////////////

    	// Medium1 pan
    	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+6, menu_q_pos[1]+30, 180, 183);

    	// Medium1 pan
    	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+6, menu_q_pos[1]+230, 180, 183);

    	// Medium1 pan
    	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+195, menu_q_pos[1]+30, 184, 183);

    	///////////////////////////////

		// Large back pan
		drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+398, menu_q_pos[1], 180, 633);

    	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+404, menu_q_pos[1]+24, 161, 598);
    	//drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+411, menu_q_pos[1]+24, 159, 598);







		document.getElementById("stn_cir_d").style.left = (menu_q_pos[0]+101) + "px";
		document.getElementById("stn_cir_d").style.top = (menu_q_pos[1]+80) + "px";

		document.getElementById("stn_cir_s").style.left = (menu_q_pos[0]+101) + "px";
		document.getElementById("stn_cir_s").style.top = (menu_q_pos[1]+118) + "px";

		document.getElementById("stn_cir_o").style.left = (menu_q_pos[0]+101) + "px";
		document.getElementById("stn_cir_o").style.top = (menu_q_pos[1]+156) + "px";

		document.getElementById("stn_link_1").style.left = (menu_q_pos[0]+114) + "px";
		document.getElementById("stn_link_1").style.top = (menu_q_pos[1]+280) + "px";

		document.getElementById("stn_link_2").style.left = (menu_q_pos[0]+114) + "px";
		document.getElementById("stn_link_2").style.top = (menu_q_pos[1]+318) + "px";

		document.getElementById("stn_link_3").style.left = (menu_q_pos[0]+114) + "px";
		document.getElementById("stn_link_3").style.top = (menu_q_pos[1]+356) + "px";

		document.getElementById("stn_draw_l").style.left = (menu_q_pos[0]+308) + "px";
		document.getElementById("stn_draw_l").style.top = (menu_q_pos[1]+80) + "px";

		document.getElementById("stn_draw_s").style.left = (menu_q_pos[0]+308) + "px";
		document.getElementById("stn_draw_s").style.top = (menu_q_pos[1]+118) + "px";


		// While in menu with low call rate i'll set values here:

		stn_cir_tool[0] = parseFloat(document.getElementById("stn_cir_s").value); // Fix so that any float can be used....
		stn_cir_tool[1] = parseFloat(document.getElementById("stn_cir_d").value);
		stn_cir_tool[2] = parseFloat(document.getElementById("stn_cir_o").value);

		stn_draw[0] = document.getElementById("stn_draw_l").checked;
		stn_draw[1] = document.getElementById("stn_draw_s").checked;


    } else {

    	var menu_inputs = document.querySelectorAll('.stn_');
        menu_inputs.forEach(function(e) {e.style.display = "none";});
    }



	//var tool_pnl_sw = 0.64; var tool_pnl_sh = 0.07;
	//drawPanel(ctx_o, in_win_w*tool_pnl_sw, in_win_h*(1-tool_pnl_sh), in_win_w*(1-tool_pnl_sw), in_win_h*(1-tool_pnl_sh*0.12));
	

	document.getElementById("fileInput").style.position = "absolute";
	document.getElementById("fileInput").style.left = "174px";
	document.getElementById("fileInput").style.top = (62+menu_controls_lock*141)+"px";

	drawPanel(ctx_o, rgba_gray, rgba_lgray, 155, 10, 410, 88+menu_controls_lock*141);

	drawPanel(ctx_o, rgba_gray, rgba_lgray, 11, 10, 138, 25+m_objs.length*15);

	drawPanel(ctx_o, rgba_gray, rgba_lgray, -5, -5, 1, 1); // SUPER HOT FIX for panel 1px border. MAKES. ZERO. SENSE. I have tried everything this is actually globally broken right now.


	//drawRect(ctx_o, rgba_gray, 11, 10, 190, 25+m_objs.length*15);
	//drawRectFrame(ctx_o, rgba_lgray, 11, 10, 190, 25+m_objs.length*15);

	drawText(ctx_o, rgba_otext, "left", "pos[" + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+"]", 174, 34);
	drawText(ctx_o, rgba_otext, "right", "aim[" + init_dat.data[mem_log[1][0]].toFixed(1) + ", " + init_dat.data[mem_log[1][0]+1].toFixed(1) + ", " + init_dat.data[mem_log[1][0]+3].toFixed(1)+"]", 548, 34);
	drawText(ctx_o, rgba_otext, "left", "pln_cyc[" + ["X-Plane","Y-Plane","Z-Plane"][pln_cyc]+"]", 174, 49);
	drawText(ctx_o, rgba_otext, "right", "grid_scale[" + grid_scale_f+"]", 548, 49);

	if (menu_controls_lock)
	{
		drawText(ctx_o, rgba_otext, "left", "W,A,S,D, Shift(sprint), Space(up), X(down), R(plane)", 174, 69);
		drawText(ctx_o, rgba_otext, "left", "N(LOCK mov), Ctrl(mouse), Middle Mouse(camera & sku)", 174, 84);
		drawText(ctx_o, rgba_otext, "left", "Scroll(expand), F(place point), Y(teleport), P(save)", 174, 99);
		drawText(ctx_o, rgba_otext, "left", "Scroll+LOCK(vert mov), G(ground), RMB(go to pnt)", 174, 114);
		drawText(ctx_o, rgba_otext, "left", "Scroll+Shift(grid size), E(make obj), B(del obj)", 174, 129);
		drawText(ctx_o, rgba_otext, "left", "Scroll/Arrows(obj nav), V(mov obj), C(edit obj)", 174, 144);
		drawText(ctx_o, rgba_otext, "left", "Shift+T(dupe & mov), T(dupe obj), Q(menu)", 174, 159);
		drawText(ctx_o, rgba_otext, "left", "TAB(near mean ctr), 2(make cir), Z(undo)", 174, 174);
		drawText(ctx_o, rgba_otext, "left", "L(link objs), 3(scale by dist)", 174, 189);
	} else {
		drawText(ctx_o, "right", rgba_otext, "[M][keys]", 548, 80);
	}

    if (!mouseLock)
    {
		drawText(ctx_o, rgba_otext, "left", "[circle settings][2]", menu_q_pos[0]+23, menu_q_pos[1]+50);
		drawText(ctx_o, rgba_otext, "left", "[_scale_]", menu_q_pos[0]+23, menu_q_pos[1]+101);
		drawText(ctx_o, rgba_otext, "left", "[divider]", menu_q_pos[0]+23, menu_q_pos[1]+139);
		drawText(ctx_o, rgba_otext, "left", "[__off__]", menu_q_pos[0]+23, menu_q_pos[1]+177);

		drawText(ctx_o, rgba_otext, "left", "[link settings][L]", menu_q_pos[0]+23, menu_q_pos[1]+250);
		drawText(ctx_o, rgba_otext, "left", "[NO FUNCTION YET]", menu_q_pos[0]+23, menu_q_pos[1]+265);
		drawText(ctx_o, rgba_otext, "left", "[_linear_]", menu_q_pos[0]+23, menu_q_pos[1]+302);
		drawText(ctx_o, rgba_otext, "left", "[_zigzag_]", menu_q_pos[0]+23, menu_q_pos[1]+340);
		drawText(ctx_o, rgba_otext, "left", "[__poly__]", menu_q_pos[0]+23, menu_q_pos[1]+378);

		drawText(ctx_o, rgba_otext, "left", "[draw settings]", menu_q_pos[0]+213, menu_q_pos[1]+50);
		drawText(ctx_o, rgba_otext, "left", "[__lines__]", menu_q_pos[0]+213, menu_q_pos[1]+101);
		drawText(ctx_o, rgba_otext, "left", "[_surface_]", menu_q_pos[0]+213, menu_q_pos[1]+140);
	}



	for (var i = 0; i < m_objs.length; i++)
	{
		//drawText(ctx_o, "objAddr[" + mem_log[i][0] + "]", 30, 34+i*15); //, 
		if (i<=world_obj_count) {drawText(ctx_o, rgba_dtext, "left", "objSize[" + mem_log[i][1] + "]", 44, 34+i*15);} 
		if (i>world_obj_count) {drawText(ctx_o, rgba_otext, "left", "objSize[" + mem_log[i][1] + "]", 44, 34+i*15);} 
		if (i==obj_cyc) {drawText(ctx_o, rgba_otext, "left", "->", 25, 34+i*15);} // drawText(ctx_o, rgba_otext, "left", "[B][C][V]", 124, 34+i*15);
	}


	//drawTriangle(ctx_o, 400, 500, 700, 600, 500, 700, rgba_r);


}

function drawIt()
{
	Compute(m1);
	ctx.clearRect(0, 0, in_win_w, in_win_h);


	// Draw packed verts
	for (var i = 1; i<m_objs.length; i++) // i find object
	{

		if (stn_draw[1])
		{
			if (i>world_obj_count)
			{
				//for (var k = 0; k<(mem_log[i][1]/4 - (mem_log[i][1]/4)%3); k+=3)
				for (var k = 0; k<Math.floor(mem_log[i][1]/12); k++)
				{
					// p1x : m1.data[12*k+mem_log[i][0]]*s_fov+in_win_wc
					// p1y : m1.data[12*k+mem_log[i][0]+1]*s_fov+in_win_wc

					// p2x : m1.data[12*k+mem_log[i][0]+4]*s_fov+in_win_wc
					// p2y : m1.data[12*k+mem_log[i][0]+5]*s_fov+in_win_wc

					// p3x : m1.data[12*k+mem_log[i][0]+8]*s_fov+in_win_wc
					// p3y : m1.data[12*k+mem_log[i][0]+9]*s_fov+in_win_wc


					drawTriangle(ctx, m1.data[12*k+mem_log[i][0]]*s_fov+in_win_wc, m1.data[12*k+mem_log[i][0]+1]*s_fov+in_win_hc, m1.data[12*k+mem_log[i][0]+4]*s_fov+in_win_wc, m1.data[12*k+mem_log[i][0]+5]*s_fov+in_win_hc, m1.data[12*k+mem_log[i][0]+8]*s_fov+in_win_wc, m1.data[12*k+mem_log[i][0]+9]*s_fov+in_win_hc, rgbas_tri[k%3]);

				}
			}
		}

		for (var j = 0; j<mem_log[i][1]/4; j++) // j finds vertex
		{
			if (m1.data[4*j+mem_log[i][0]+3] > 0 && m1.data[4*(j+1)+mem_log[i][0]+3] > 0) // Line clipping
			// if (1) // Clipping off
			{	

				if (stn_draw[0])
				{
						if (i>world_obj_count && j != mem_log[i][1]/4-1)
						{
							if (i==obj_cyc || i==link_obj_i) {
								drawLine(ctx, rgbas_link[link_lock], 1.0, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, m1.data[4*(j+1)+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*(j+1)+mem_log[i][0]+1]*s_fov+in_win_hc);
							} else {

								// test draw tri here
								drawLine(ctx,rgba_w, 1, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, m1.data[4*(j+1)+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*(j+1)+mem_log[i][0]+1]*s_fov+in_win_hc);
							}
							//} else {drawLine(ctx,rgba_w, 1/Math.pow((m1.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3), 0.7), m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, m1.data[4*(j+1)+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*(j+1)+mem_log[i][0]+1]*s_fov+in_win_hc);}
						}
				}

				if (i >= 6 && i <= 8 && j == 0) {drawLine(ctx,rgbas[i-6], 0.5, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, m1.data[4*(j+1)+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*(j+1)+mem_log[i][0]+1]*s_fov+in_win_hc);}
				if (i == 2 && j != mem_log[i][1]/4-1) {drawLine(ctx,rgba_w, 0.4, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, m1.data[4*(j+1)+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*(j+1)+mem_log[i][0]+1]*s_fov+in_win_hc);}
				if (i==1) {
				fillDot(ctx, rgba_w_flr, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, 1/Math.pow((m1.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3), 0.7))}; 
				
			} // END OF LINE CLIP




			if (m1.data[4*j+mem_log[i][0]+3] > 0)
			{
				// if (i > 2)
				// {
				// 	if (key_map.mmb && i > 5) {drawText(ctx, j, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc);}
				// 	if (j == mem_log[i][1]/4-1) {drawText(ctx, "END " + j, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc-32, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc-18);}
				// }

				if (i>2)
				{
					drawDot(ctx, rgbas[pln_cyc], 1, m1.data[4*j+mem_log[i][0]]*s_fov+in_win_wc, m1.data[4*j+mem_log[i][0]+1]*s_fov+in_win_hc, 1/Math.pow((m1.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3), 0.5));
				}
			}
		}
	}

	// Draw unpacked verts
	for (var i = 0; i<m_t_objs.length; i++)
	{
		for (var j = 0; j<mem_t_log[i][1]/4; j++) // fix me?
		{
			if (m1.data[4*j+mem_t_log[i][0]+3+mem_sum] > 0 && m1.data[4*(j+1)+mem_t_log[i][0]+3+mem_sum] > 0) // Clipping
			// if (1) // Clipping off
			{
				drawDot(ctx, rgba_w, 2, m1.data[4*j+mem_t_log[i][0]+mem_sum]*s_fov+in_win_wc, m1.data[4*j+mem_t_log[i][0]+1+mem_sum]*s_fov+in_win_hc, 1/Math.pow((m1.data[4*j+mem_t_log[i][0]+3+mem_sum]*(0.03)).toFixed(3),0.7));
				if (i == m_t_objs.length-1)
				{
					drawText(ctx, rgba_otext, "left", "END " + i, m1.data[4*j+mem_t_log[i][0]+mem_sum]*s_fov+in_win_wc-17, m1.data[4*j+mem_t_log[i][0]+1+mem_sum]*s_fov+in_win_hc-18);
					} else {
					drawLine(ctx, rgba_b, 1.3, m1.data[4*j+mem_t_log[i][0]+mem_sum]*s_fov+in_win_wc, m1.data[4*j+mem_t_log[i][0]+1+mem_sum]*s_fov+in_win_hc, m1.data[4*(j+1)+mem_t_log[i][0]+mem_sum]*s_fov+in_win_wc, m1.data[4*(j+1)+mem_t_log[i][0]+1+mem_sum]*s_fov+in_win_hc);
					if (key_map.mmb) {drawText(ctx, rgba_otext, "left", i, m1.data[4*j+mem_t_log[i][0]+mem_sum]*s_fov+in_win_wc-3, m1.data[4*j+mem_t_log[i][0]+1+mem_sum]*s_fov+in_win_hc-18);}
				}
			}
		}
	}

	// Indicators
	if (m_t_objs.length>0 && m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+3] > 0) {drawDot(ctx, rgba_lp, 1.3, m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]]*s_fov+in_win_wc, m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+1]*s_fov+in_win_hc, 15);}

	if (m1.data[mem_log[9][0]+3] > 0) {drawDot(ctx, rgbas_trans[trns_lock], 1.0, m1.data[mem_log[9][0]]*s_fov+in_win_wc, m1.data[mem_log[9][0]+1]*s_fov+in_win_hc, 8);}

	if (trns_lock && m1.data[mem_log[10][0]+3] > 0) {drawDot(ctx, rgbas_trans[1], 1.0, m1.data[mem_log[10][0]]*s_fov+in_win_wc, m1.data[mem_log[10][0]+1]*s_fov+in_win_hc, 15);}



	requestAnimationFrame(drawIt);

} // END OF drawIt()


/*
	__/\\\________/\\\__/\\\\\\\\\\\\\\\__/\\\______________/\\\__________________________/\\\\\\\\\_____        
	 _\/\\\_______\/\\\_\/\\\///////////__\/\\\_____________\/\\\________________________/\\\///////\\\___       
	  _\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\_______________________\///______\//\\\__      
	   _\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\_____\/\\\_____________\/\\\_________________________________/\\\/___     
	    _\/\\\/////////\\\_\/\\\///////______\/\\\_____________\/\\\______________________________/\\\//_____    
	     _\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\___________________________/\\\//________   
	      _\/\\\_______\/\\\_\/\\\_____________\/\\\_____________\/\\\_________________________/\\\/___________  
	       _\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\\\\\_\/\\\\\\\\\\\\\\\____________/\\\\\\\\\\\\\\\_ 
	        _\///________\///__\///////////////__\///////////////__\///////////////____________\///////////////__
*/

function Compute(init_dat)
{
	if (key_map["3"] && runEvery(300)) {expand_obj(obj_cyc);}

	if (key_map.l && runEvery(300)) {link_obj(obj_cyc);}

	if (key_map.enter && runEvery(100))
	{
			canvas.requestPointerLock();
			mouseLock = 1;
	}

	if (mouseLock && key_map["2"] && runEvery(300))
	{

		if (!isNaN(stn_cir_tool[0]) && !isNaN(stn_cir_tool[1]) && !isNaN(stn_cir_tool[2])) {make_cir_obj(Math.floor(stn_cir_tool[0]), stn_cir_tool[1], stn_cir_tool[2], pln_cyc);}
	}

	if (trns_lock)
	{
		if (!isNaN(mem_log[trns_obj_i][1]))
		{
			var _fd = sub(_lp_world, trans_f);
			for (var i=0; i<mem_log[trns_obj_i][1]/4; i++)
			{
				m_obj_offs[trns_obj_i][0] = _fd[0];
				m_obj_offs[trns_obj_i][1] = _fd[1];
				m_obj_offs[trns_obj_i][2] =	_fd[2];
			}
		}
	}
	
	if (key_map.rmb && runEvery(100))
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
		switch(_d)
		{
			case 0:
				_lp[0] = m_objs[obj_cyc][4*_n_sku];
				_lp[1] = m_objs[obj_cyc][4*_n_sku+1];
				_lp[2] = m_objs[obj_cyc][4*_n_sku+2];
				_lp_world[0] = m_objs[obj_cyc][4*_n_sku];
				_lp_world[1] = m_objs[obj_cyc][4*_n_sku+1];
				_lp_world[2] = m_objs[obj_cyc][4*_n_sku+2];
				break;
			case 1:
				_lp[0] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-4)];
				_lp[1] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-3)];
				_lp[2] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-2)];
				_lp_world[0] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-4)];
				_lp_world[1] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-3)];
				_lp_world[2] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-2)];
				break;
		}
	}

				// _inter_rnd[0] = m_objs[obj_cyc][4*_n_sku];
				// _inter_rnd[1] = m_objs[obj_cyc][4*_n_sku+1];
				// _inter_rnd[2] = m_objs[obj_cyc][4*_n_sku+2];
				// _inter_rnd[0] = m_objs[obj_cyc][4*_n_sku];
				// _inter_rnd[1] = m_objs[obj_cyc][4*_n_sku+1];
				// _inter_rnd[2] = m_objs[obj_cyc][4*_n_sku+2];

	// REMOVE THIRD 2D VALUE WTF AM I DOING

	if (key_map.tab && runEvery(75))
	{
		var _f = []; var _n_sku = 0; var _t1 = [0, 0, 0]; var _d = 0; var _t2; 
		for (var i = world_obj_count; i<mem_log.length; i++)
		{
			_t1 = [0, 0, 0];
			if (i==world_obj_count) {_t1 = add3(_t1, [init_dat.data[mem_log[0][0]], init_dat.data[mem_log[i][0]+1], init_dat.data[mem_log[i][0]+2]]); _f = Math.pow(Math.pow(_t1[0], 2) + Math.pow(_t1[1], 2), 0.5);}
			for (var k = 0; k<mem_log[i][1]/4; k++)
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


	// Delete obj by obj cycle & fix memory
	if (!trns_lock && key_map.b && runEvery(300-key_map.shift*180) && obj_cyc > world_obj_count) {del_obj(obj_cyc);}

	// Move obj to m_t_objs
	if (key_map.b && runEvery(300) && obj_cyc > world_obj_count) {m_objs_mod(obj_cyc);}


	if (key_map.m && runEvery(300)) {menu_tog_controls();}

	if (key_map.c && runEvery(300)) {m_objs_explode(obj_cyc);}

	if (key_map.arrowdown && runEvery(200)) {if (obj_cyc==m_objs.length-1) {obj_cyc=0} else {obj_cyc++;}}
	if (key_map.arrowup && runEvery(200)) {if (obj_cyc==0) {obj_cyc=m_objs.length-1} else {obj_cyc-=1;}}

	if (key_map.e && runEvery(120)) {mem_t_mov(); key_map.e = false;} // m_t_objs.length = 0; mem_t_log.length = 0; obj_cyc = mem_log.length-1;
	
	if (key_map.p && runEvery(350)) {downloadSaveFile();}

	if (key_map.n && runEvery(500)) {lock_vert_mov = !lock_vert_mov; hover_h = -player_pos[1];}
	if (lock_vert_mov) {player_pos[1] = -hover_h;}

	if (key_map.r && runEvery(200)) {if (pln_cyc==2) {pln_cyc=0;} else {pln_cyc++;}}
	// if (key_map.q && runEvery(200)) {if (pln_cyc==0) {pln_cyc=2} else {pln_cyc-=1;}}
	if (key_map.q && runEvery(200))
	{
		if (document.pointerLockElement !== null) {document.exitPointerLock(); mouseLock = 0;} else {canvas.requestPointerLock(); mouseLock = 1;};
	}

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
			if (!lookToggle)
			{
				mouseDataS[0] = mouseData[0]; mouseDataS[1] = mouseData[1];
				player_look_dir_i = player_look_dir;
			}
			lookToggle = 1;
			var dX = -mouseDataS[0]+mouseData[0]; var dY = mouseDataS[1]-mouseData[1]; // Temp flip of viewing movement
			mouseDataD[0] = dX; mouseDataD[1] = dY;
			player_look_dir = [ player_look_dir_i[0]+(dX/in_win_w * pi * 2) , player_look_dir_i[1]+(dY/in_win_w * pi * 2) , 0 ]; // ! width 4 both !

	} else 
	{
		if (lookToggle!=0)
		{
			mouseDataI[0] = mouseDataI[0]-mouseDataD[0];
			mouseDataI[1] = mouseDataI[1]-mouseDataD[1];
			lookToggle = 0;	
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

	// Use gpu here w/ the right size array32. Or can I even?

	// if (document.ready || (key_map.lmb || key_map.rmb || key_map.f || key_map.t || key_map.g))
	// {
		_oh = dot(player_pos,[0,1,0,1]);
		f_look = rot_y_pln(rot_x_pln([0,0,1,1],-player_look_dir[1]),-player_look_dir[0]);
		f_dist = -_oh/dot(N,norm(f_look));
		_nplns = [[1,0,0],[0,1,0],[0,0,1]][pln_cyc]; // use pln_cyc to select norm vec from array of norm vecs
		_plr_world_pos = [player_pos[0],player_pos[1],player_pos[2]];
		_plr_dtp = [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]];
		_inter = lpi(_plr_dtp,_plr_world_pos,_pp,_nplns);
	//}

	// m_objs[0][0] = _inter[0];
	// m_objs[0][1] = _inter[1];
	// m_objs[0][2] = _inter[2];
	// m_objs[0][3] = 1;

	if (isNaN(m_objs[0][0])) {m_objs[0][0] = 0.0; m_objs[0][1] = 0.0; m_objs[0][2] = 0.0; m_objs[0][3] = 1.0;}



	if (!isNaN( _inter[0])) // Fix nightmare here. I need a real plan first not just random tests
	{
		_inter_rnd = [roundTo(_lp[0], grid_scale_f), roundTo(_lp[1], grid_scale_f), roundTo(_lp[2], grid_scale_f)];


			// switch(pln_cyc)
			// {
			// 	case 0:
			// 		_inter_rnd = [_lp[0], roundTo(_lp[1], grid_scale_f), roundTo(_lp[2], grid_scale_f)];
			// 		break;
			// 	case 1:
			// 		_inter_rnd = [roundTo(_lp[0], grid_scale_f), _lp[1], roundTo(_lp[2], grid_scale_f)];
			// 		break;
			// 	case 2:
			// 		_inter_rnd = [roundTo(_lp[0], grid_scale_f), roundTo(_lp[1], grid_scale_f), _lp[2]];
			// 		break;
			// }

			// switch(pln_cyc)
			// {
			// 	case 0:
			// 		_lp[0] = _lp[0];
			// 		_lp[1] = _inter[1];
			// 		_lp[2] = _inter[2];
			// 	case 1:
			// 		_lp[0] = _inter[0];
			// 		_lp[1] = _lp[1];
			// 		_lp[2] = _inter[2];
			// 	case 2:
			// 		_lp[0] = _inter[0];
			// 		_lp[1] = _inter[1];
			// 		_lp[2] = _lp[2];
			// }


		if (key_map.lmb && mouseLock)
		{	
			_lp[0] = _inter[0];
			_lp[1] = _inter[1];
			_lp[2] = _inter[2];
			_lp_world[0] = _inter_rnd[0];
			_lp_world[1] = _inter_rnd[1];
			_lp_world[2] = _inter_rnd[2];
		}



		// Place point
		if (key_map.f && runEvery(150))
		{
			var np = new Float32Array([_lp_world[0], _lp_world[1], _lp_world[2], 1.0]);
			m_t_objs_loadPoint(np);
		}

		// Return to ground
		if (key_map.g && runEvery(200))
		{
			_lp[1] = 0; _lp_world[1] = 0;
			pln_cyc=1;
		}

		// Teleport
		if (key_map.y && runEvery(150))
		{
			player_pos[0] = _inter[0];
			if (!lock_vert_mov) {player_pos[1] = _inter[1]-14}; // Omit when vert mov locked
			player_pos[2] = _inter[2];
		}

		if (key_map.t && runEvery(350))
		{
			if (key_map.shift && !trns_lock)
			{
				m_objs_loadPoints(new Float32Array(m_objs[obj_cyc]));
				obj_cyc = m_objs.length-1;
				trans_obj(m_objs.length-1);

			} else if (!key_map.shift && !trns_lock)
			{
				m_objs_loadPoints(new Float32Array(m_objs[obj_cyc]));
				obj_cyc = m_objs.length-1;
			}

		}

		if (key_map.v && runEvery(350))
		{
			trans_obj(obj_cyc);
			//m_obj_offs[obj_cyc] = [_inter_rnd[0], _inter_rnd[1], _inter_rnd[2], 1];
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


	// drawIt();
	//return(init_dat);


} // End of Compute()


//function runTime()
//{

	//Compute(m1);
	//drawIt();
	//requestAnimationFrame(runTime);
//}


function menuTime()
{
	drawOverlay(m1);
}


document.addEventListener("DOMContentLoaded", function(event)
{

						/*-- GET&SET SCREEN DIMENSIONS --\
						\-------------------------------*/

	screen_width = window.screen.width * window.devicePixelRatio;
	screen_height = window.screen.height * window.devicePixelRatio;

	document.getElementById("cv").width = document.getElementById("cv_over").width = in_win_w;
	document.getElementById("cv").height = document.getElementById("cv_over").height = in_win_h;
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;

	document.getElementById("stn_draw_l").checked = true;
	document.getElementById("stn_draw_s").checked = true;

	Compute(m1);

	drawIt();

	//runTime();

	//setInterval(runTime, runTime_int); 
	setInterval(menuTime, menuTime_int); 
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