
/*
__/\\\\____________/\\\\__/\\\\\\\\\\\\\\\__/\\\\____________/\\\\_____/\\\\\\\\\\\____/\\\\\\\\\\\\\________/\\\\\\\\________/\\\_______/\\\__/\\\________/\\\__/\\\\\\\\\\\\\_        
 _\/\\\\\\________/\\\\\\_\/\\\///////////__\/\\\\\\________/\\\\\\___/\\\/////////\\\_\/\\\/////////\\\___/\\\///////________\///\\\___/\\\/__\///\\\____/\\\/__\//////////\\\__       
  _\/\\\//\\\____/\\\//\\\_\/\\\_____________\/\\\//\\\____/\\\//\\\__\//\\\______\///__\/\\\_______\/\\\_/\\\/__________________\///\\\\\\/______\///\\\/\\\/____________/\\\/___      
   _\/\\\\///\\\/\\\/_\/\\\_\/\\\\\\\\\\\_____\/\\\\///\\\/\\\/_\/\\\___\////\\\_________\/\\\\\\\\\\\\\/_/\\\______________________\//\\\\__________\///\\\/____________/\\\/_____     
    _\/\\\__\///\\\/___\/\\\_\/\\\///////______\/\\\__\///\\\/___\/\\\______\////\\\______\/\\\/////////__\/\\\_______________________\/\\\\____________\/\\\___________/\\\/_______    
     _\/\\\____\///_____\/\\\_\/\\\_____________\/\\\____\///_____\/\\\_________\////\\\___\/\\\___________\//\\\______________________/\\\\\\___________\/\\\_________/\\\/_________   
      _\/\\\_____________\/\\\_\/\\\_____________\/\\\_____________\/\\\__/\\\______\//\\\__\/\\\____________\///\\\__________________/\\\////\\\_________\/\\\_______/\\\/___________  
       _\/\\\_____________\/\\\_\/\\\\\\\\\\\\\\\_\/\\\_____________\/\\\_\///\\\\\\\\\\\/___\/\\\______________\////\\\\\\\\__/\\\__/\\\/___\///\\\_______\/\\\______/\\\\\\\\\\\\\\\_ 
        _\///______________\///__\///////////////__\///______________\///____\///////////_____\///__________________\////////__\///__\///_______\///________\///______\///////////////__
*/ // You exist in a .bin of floating point numbers.


// Make a pistol that shoots green lasers that bounce!
// Ray trace is done. Now to make it reflect and start a new trace -> keeps going until a defined amount of reflections. This would look cool inside a sphere! w/ no limit it'd probably crash lmao.
// I should make it a more general function to provide some interesting new functions.
// I have a feeling I can do a lot of what i'm doing here with glsl c. I'm only using it for the perspective transform. Silly but I can just port my js to c.
// I will make a second version of this game/app that accepts data from this one in the future ! I could even embed this game in another game lol.
// If I could convert font data into 2d -> 3d/2d text gen!
// I could also manually insert the alphabet as copied data from paint



//  @?@?@?@?@ If rotations use dir vec I can plug in my normal map to reorient the grid to surface.
//				this raises the question: how do you make a grid ON a plane (my grid only reveals what rounding looks like)
//					maybe try reversing the process.
//					if I have a grid of rounded points and I rotate the grid to a new plane: rot(round(point))
//					if poly plane is assumed a normal coordinate system moving to a new plane: rot(round(point))
//					the procedure of rotation around an arbitrary axis applies to many things,
//						conclusion: point on a plane -> rotate to original world plane at O -> round(point) -> apply inverse rotation


/*

	LONG TASK


	Wrap data increase to hold more layers
		r g b a comes first
		move groups after
	Z-buffer algorithm
	Grid normalization and offset with rmb
	Make a new obj bond algorithm.
	Push to top of stack function OR draw with reverse loop same thing
	Try making a list in real time of anything entirely behind another obj's triangles?
		try in 2d w/ triangle intersector later
	Obj cut hole
	Obj preview on screen below highlighted obj in mem
		Make new model view mem region
	Condense code structure / move fns
		Setup fn to perform a series of operations.
		Use where I have link_obj_i and pass fn color -> set index
	Mover should show bounding box w/ corners to drag size
	Outside of this I'm making a menu constructor. Starting to feel like TeX o_0
		All of the menu will be replaced with html because that makes sense.

	QUICK TASK
	Event log box would help
	Allow grid size to be changed by regenerating the grid to match round size.
	Color for bond obj

	Hey I noticed %3 ran faster. I could just multithread the draw loop and make it setting ...... 
	..................man I did this 9 years ago in C# on MAC to image track csgo lmao never got banned never got past no cursor input but worked on simulated image data in js
	- solution here is to pat gen something a head of time I do believe.
			fill array with indice map pointing to an even 1/n stack
			pickUp array basically takes the remaining fraction and draws it.
				example: n=5 -> use 4 even stacks to compute 4 renders at once
						 remainder here is 1 so I go through at original per second point sequence to finish w/ modulo even/odd offset

						 I put this in chatgpt and it couldn't split it for me. It probably could given a better prompt? Not even best code ai? Not sure honestly I tried everything it output
						 into the draw sequence and it couldn't get me the correct render sequence for halfing render loop.
						 simple concept to implement but it get's weird when i'm considering the modulo and referencing future points that may not exist yet.



I can make real physgun by compounding quaternions and ray trace AYYYYYYYYYYYYYYYYYYYYYYY
Make the planetary ico 
Assault cube old code
*/

/*
.reduce is a method that accumulates the values of an array into a single value (in this case, the sum of the squared components).
*/

//  @?@?@?@?@ Instead of clipping for side planes I could draw lines in two directions determined if x1>x2.... lol NO CLIPPING NEEDED
//		for a lil extra travel just offset
//		next step is using 2d data to clip away even more draw calls.  


// Use this to push to top stack? ar_f.set(ar); ar_f.set(meanctr_obj(ar), ar.length);


// modulo distributes with switch with for loop ez wow
/* for ex:

	for (i)
	{
		switch(i%3)
			case 0:
			case 1:
			case 2:
	}

	rayInterMap[] containing [Float32Array(4), Float32Array(4), ...] : clear entries upon calling another trace for now
	rayIMap[] populates data for poly loop to loop through allowing for poly color changes / indicators. Leading to a colorMap for tris.
		colors mapped as numbers converted by static array of colors.

*/
/*
	starting with 1 call to trace

	3 sides 3 vec a b c omni order thus equally in sign implies within poly

	sign is a/|a| , a/Math.abs(a) , Math.sign will be fastest? least ops w/ js calc sign

	for every entry, later refine to shorten loop. for ex: dot all [largest obj point from center (lrgp-ctr) premapped] w/ look_f (look dir)

		tri in order a b c (points) 

              b
             /\         n from dataset: obj_normalMaps
            / n \
           a     c

               b                     b                                     b
              /|\         =>        /|        <SHARED => SWAP SIGN>        |\
             / | \                 / |                                     | \
           a       c             a    (a-c)/2                       (a-c)/2    c

	maybe this is related in a sense to the barycentric coordinates. say I have a middle vector 
	point on poly can be on either one to confirm that it is inside 3 points
	two instances of comparing a series of signs IF the first one misses. So sometimes there is only one call! wow
	v01 = b-a                 ->        sub(b,a)
	v02 = (a-c)/2 - b         ->        sub(scale(sub(a,c),0.5),b)
	v03 = a - (a-c)/2         ->        sub(a, scale(sub(a,c),0.5))
	v11 = c-b                 ->        sub(c,b)
	v12 = (a-c)/2 - b         ->        sub(scale(sub(a,c),0.5),b)
	v13 = b - (a-c)/2         ->        sub(b, scale(sub(a,c),0.5))
	if     sign(a) == sign(b) && sign(b) == sign(c)   =>   push point to rayInterMap[] && rayIMap[]. wat

*/
/*
- DO NOW

	= Return nearest & in front of 
		First dot(sub(p, player_pos),f_look)
		getNearest(array of float32array(4), point testing from) -> nearest point
			or combine point to test from w/ a tiny offset to give it direction so first dot points w/ that plane

	= Make ray trace fn use inputs so I can call it to get data anywhere.

	= Strange some polys not detected by rays..?? may come from zigzag gen? should be considering it's visually parallel w/ data

	?@?@?@?@ mouse slow down for draw !!!!
	?@?@?@?@ END # is broken


	= Cut obj in half by plane!
		intersect/ray trace w/ plane between pairs. Just remove any other points and keep the intersections. Not sure if I can do this so easily w/ point order being critical

	= Bezier tool!!!!!!!!!!!!!!!!!!! ASAP.

	= add file name setting
	= interpolation framework for anim -> prerender

	= For linking lines a tool to collapse a line into one axis would be fantastic. For a dynamic tool: use start & end to define the line and move points to that line.
	= Spiral tool OR line gen tool w/ inputs => same as spiral w/ the right settings

	= Menu creation should be automated. Make system and slowly move existing into struct. Never update the html again.
		- a system can be styled like css in the end.

	= Make tab lock(show verts) a center and tab unlock but when unlocked it only querys for centers
	
	= m_obj_rot contains p,y,r and 0/1 if applied
		split obj query into 0/1

	= setData may be only needed to be set per other timing or only on data modification. Help lower cpu?

	= I need to push to the top of the stack instead of bottom so that rendering displays overlap properly
		- maybe make a second layer of m_objs that gets sorted by distance to fake clipping?
		- could just change a pat that mirrors m_objs and goes by centers. Update pat every 300ms.

	= To continue adding groupings I'll just make the data format [x y z w TYPE g1 g2 gn...] [x y z w TYPE g1 g2 gn...] [x y z w TYPE g1 g2 gn...] ...
		- objs can be marked by type.
			obj type logged on created and wrapped into download encode. Type will mark each point but after unwrapping each group's type will be all the same.

	= Enter key opens text overlay to search for function. goes like: [ENTER] type "link" [ENTER] -> link is member of table call it's function. Function stored in switch case calls obj_link();
		- and "link.k=l" rebinds link(); activator key to l. And if already bound swap. Block some keys maybe.
		- if any part of text is contained by a list of syntax display those options below and what options exist after the dot operator
		- find obj by would be amazing. by dist returns array of i's that will be modified w/ function 
		- this could provide the in game scripting w/o eval of js directly.
		- goTo(findBy).. bring(findBy).. scale(findBy)

	= Encode obj means into sectors by itor over x,y,z type loop with some set size by dividing size up into some number (4*4*4) => 64 sectors. Like a 2d grid but 3d.
		find their centers by excluding end and offset by half of number (2). map to table
			table
				[center pos, array of _i's]

- just noticed flying toward a point w/ crosshair doesn't bring you to that point... Aim down fly backwards ends up on a 45?? can't remember if intentional

- use a time delta for interpolation and player translation to avoid runtime speed fluctuations. so I need a timer for w a s d up down. 6 timers

- research k-d tree / octree
- ken joy probably made a lecture about it?

- make phys gun
	- okay gonna settle for 2d physgun
	- what if I pat gen for each 3d object so that I can loop through time to display a mimic of 3d but it's actually 2d and could be modified on the fly to something new.

- Make obj spawn list !!!!
- Need two tabs
- Need square tool
- Need rect cube tool
- Circle tool also needs to have options for half or n parts

- Grid upgrade: rotation of grid aligns with the slope of the diagonal/half way points between rounded grid points. This way everything stays in alignment.

- I realize now I actually need two patterns. And patterns of offsets can actually be very fast as they're not computed when running.
- premake a list w/ the right number pattern to use as index offset

- odd even switch with modulo
- can be used to gen a pat
- remember to try using loops of half duration that set twice as many things per op

*/

// Button to output linear obj to console. Model gun with game -> put into game -> model game with gun -> put into gun

// the tab alg can be applied compression relative to center. like a 3d mesh impacting the screen creating a focal lense. this would actually slightly help differentiate object's that are close together IN 2D. maybe..


/*
	Badly need to implement a struct system for tools generally such that every tool overrides some keys.
		Points should be a point tool (Place point - F)
		Circle tool (Place circle - F) (I need a later formula to compress a 4 point circle to align with the grid)
		Center Expand (Start/Finish applied as delta - F)
		Dynamic Expand (Applies compression/expansion with 3 input numbers)
		Rotate around Axis (For now input into box with deg. Use point and plane line)
		Stacker tool (Accepts distance and stacks) (Two input boxes)

		I'm starting to notice animated effects require a temporary duplicate object to perform interpolation.
*/

/*
	I'm using javascript to do glsl things totally wrong. Some of this was for fun. I have to rewrite the entire thing with proper glsl from the start.
	With proper glsl I will be able to use an octree to efficiently link screen coordinates with image space.

	Might still be possible to salvage w/ my own api to fix the refresh rate limitation here. Pretty bad using setInterval (only for druggies). or worse javascript eval(); you can go to jail for this.
	Badly need to give lpi and other obj algs a go in glsl. Even worth doing until I redo api????

	Octree is a mem struct !? rewrite data or use new file type ig


	// [[ PROBABLY GOING TO DO SOON ]]:

	-	Obj explode needs update.
			explode with c is done.
			if an obj has been exploded or one is drawn (m_t_objs.length > 0) then c now gets sku from point finder and allows (split obj, delete point, add point in sequence)

	-	Sphere generation
	-	Surface generation
	-	Shift + Tab for multi selection. Also make mouse selector

	-	Merge function: should already have the functions. Need to make a sequenced event (colorized). 3 keys. Start(finish). Abort. Select all non world.


	// [[ PROBABLY NOT SO SOON ]]

	-	Use a bezier function of n points. Dynamic integral function to find the arc length. arc_l/n provides the sections to be influenced by perp vectors &&&&!!!! the actual vertices of the curve. Divide by n and n/2. Go to n-n/2
	-	Maybe a separate self made api for handling the screen interface would be wise.
	-	It really needs 3d/2d simple text obj generation for real notepad capacity. Idk how to edit something like that other than detecting the objects vertices relative and essentially making a hash table. Easier to just store the string in the bg. More arrays...
	-	Effects and sounds.  Recreate similar Hl2 sounds.


	// MAYBE SOME TIME IN 2053 (after christ)

	-	CLIPPING
	-	Add dancing stick figures to every vertex immediately. I will do this. Don't fuck with me.


	add clipping sides & what happens if 3 points where 1 is out ?
		total points goes from 3 to 4. This can happen n times per poly. How deal w/ data??????

	obj_select(_r); where _r is radius from center screen to screen space points. Same dot sequence to sort?
		how about auto group points to 3d sectors and a single ray trace reveals some any quantity of data within the block.
		inconclusive. Math implies computation. blocks can't fail. 

	Holy shit there's an algorithm for this lmao. This always happens to me.
	https://en.wikipedia.org/wiki/Octree

	Use bounding boxes on objs 4 physics


*/




						/*-- Var Decs --\
						\--------------*/

// !
var menuTime_int = 170;
var title_int = 350;
// !

// Timer
var date_now = 0;

// Maybe move this into DOM LOAD event instead and keep var init.
var in_win_w = document.getElementsByTagName("html")[0].clientWidth; var in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
var in_win_h = document.getElementsByTagName("html")[0].clientHeight; var in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;
const fileInput = document.getElementById('fileInput');
const stn_grid_s = document.getElementById('stn_grid_s');
var stn_menu_clearall = document.getElementById('stn_menu_clearall');
var stn_link_cboxes = document.querySelectorAll('.stn_link');
var stn_tab_query = document.querySelectorAll('.stn_tab');
var menu_inputs = document.querySelectorAll('._menu');
var menu_tab0 = document.querySelectorAll('._tab0');


var screen_width, screen_height;



var pi = 3.1415926538; // High definition PI makes a visible difference
var pi4 = 0.7071067811; // My fav number
var pi2 = 6.2831853071;

var player_speed = 0.5;
var player_speed_vert = 0.3; // Vertical travel speed
var player_speed_mult = 4; // Shift key

var player_look_dir = [0, 0, 0];
var player_look_dir_i = [0, 0, 0];
var aim_dir = [0.0, 0.0, 0.0];
var aim_dir_n = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];  // rt data
var mouseDataS = [0.0, 0.0]; // saved state
var mouseDataI = [0.0, 0.0]; // initial
var mouseDataD = [0.0, 0.0]; // delta
var mouseLock = 0; 
var lookToggle = 0;
var keyVec = [];
var fov_slide = 8.0; var s_fov = Math.pow(fov_slide, 2);

var crosshair_l = 5;
var crosshair_w = 0.4;

var player_pos = [0.0,-14.0,0];
var _inter_rnd = [0.0, 0.0, 0.0];
var _paint_track = [0.0, 0.0, 0.0];


var wpn_select = 0; 
var wpn_1, wpn_1_d;
var wpn_1_mc = [];

var hover_h = 11.5;
var lock_vert_mov = false;
var pln_cyc = 1;
var obj_cyc = 0;
var grid_scale = 3; var grid_scale_f = 8; var grid_scale_ar = [8, 8, 8];
var del_obj_lock = 0;
var trns_lock = 0; var trns_obj_i = 0; var stn_trns = [false, false, false];
var world_obj_count = 0;
var link_lock = 0; var link_obj_i = 0;
var bond_lock = 0; var bond_obj_i = 0;
var exp_lin_lock = 0; var exp_lin_obj_i = 0;

var _all_lock = 0; // Pass through color
var _all_lock_i = 0;


var stn_draw = [true, true];
var stn_cir_tool = [8, 24, 0];
var stn_link_tool = 1; // Default link pat
var paint_d = 0; var paint_n = 0;
var stn_paint_l = 1; var stn_paint_line_l = 8; var stn_paint_inf = false;

var _epsilon = 150;
var in_win_clip;
var one_time_fix = 1;


var menu_q_pos = [30, 240];
var menu_obj_pos = [11, 10];
var menu_keys_pos = [155, 10];
var menu_wpn_pos = [155, 10];

var menu_tab = 0;

// Premade color strings and color arrays

// #COLORS
var rgba_r = "rgba(200, 50, 50, 0.6)";
var rgba_g = "rgba(50, 200, 50, 0.6)";
var rgba_b = "rgba(50, 50, 200, 1.0)";
var rgba_w = "rgba(255, 255, 255, 1.0)";
var rgba_w_flr = "rgba(222, 222, 222, 0.8)";
var rgba_y = "rgba(240, 240, 50, 1.0)";
var rgba_o = "rgba(245, 213, 63, 1.0)";
var rgba_ch = "rgba(50, 200, 50, 0.9)";
var rgba_lp = "rgba(40, 40, 40, 0.75)";
//var rgba_dgray = "rgba(8, 10, 12, 1.0)"; o

// var rgba_dgray = "rgba(10, 12, 14, 1.0)";

var rgba_dgray = "rgba(11, 12, 15, 1.0)";
//var rgba_gray = "rgba(11, 13, 15, 1.0)"; o

//var rgba_gray = "rgba(15, 16, 18, 1.0)"; g
var rgba_gray = "rgb(17, 18, 21)";
//var rgba_mgray = "rgba(10, 12, 14, 1.0)"; o

var rgba_lgray = "rgba(222, 222, 222, 0.3)";
var rgba_otext = "rgba(194, 122, 52, 1.0)";
var rgba_dtext = "rgba(155, 155, 155, 1.0)";
var rgba_cindi = "rgb(183, 167, 101)";
var rgba_cindig = "rgb(152, 106, 179)";
var rgba_cindiga = "rgba(152, 106, 179, 0.9)";

var rgbas = [rgba_r, rgba_g, rgba_b, rgba_w, rgba_o];
var rgbas_link = [rgba_y, rgba_b, rgba_r, rgba_cindiga, rgba_lgray, rgba_g]; // main for loop
var rgbas_trans = [rgba_lgray, rgba_g];


var rgba_w_tri1 = "rgba(255, 255, 255, 0.2)";
var rgba_w_tri2 = "rgba(225, 225, 225, 0.2)";
var rgba_w_tri3 = "rgba(195, 195, 195, 0.2)";
var rgba_w_tri4 = "rgba(165, 165, 165, 0.2)";

// var rgba_w_tri1 = "rgba(255, 0, 0, 1)";
// var rgba_w_tri2 = "rgba(0, 225, 0, 1)";
// var rgba_w_tri3 = "rgba(0, 0, 195, 1)";
// var rgba_w_tri4 = "rgba(165, 0, 165, 1)";

var rgbas_tri = [rgba_w_tri1, rgba_w_tri2, rgba_w_tri3, rgba_w_tri4];


var _oh = [0,0,0,0];
var f_look = [0,0,0,0];
var f_dist = [0,0,0,0];
var _inter = [0,0,0,0];
var _nplns = [0,1,0];
var _plr_dtp = [0,0,0];

var g_dtp, g_pop, g_pao, g_rp, g_fp;

var obj_normalMaps = [];
var rayInterMap = [];

// Junk needs to be organized
var _gp = [0,0,0]; var _nps; var tse = 11; var _viewq = [];


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

function drawPanel(c, rgba1, rgba2, x, y, w, h)
{

	c.fillStyle = rgba1;
	c.strokeStyle = rgba2; 
	c.lineWidth = 1; 
	c.strokeRect(x, y, w, h);
	c.fillRect(x, y, w, h);
}

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

function drawCircle(c, rgba, lw, x, y, r)
{
    c.beginPath();
    c.strokeStyle = rgba;
    c.arc(x, y, r, 0, 2*pi); // x, y, radius, startAngle, endAngle
    c.lineWidth = lw; c.stroke();
}

function updateMenuPos()
{	//671 fix later
	menu_q_pos = [30, 240];
	menu_obj_pos = [in_win_w-150, 10];
	menu_keys_pos = [11, 10];
	menu_q_pos = [in_win_w/100*3, in_win_h/100*50 - 0.5*671];
	menu_wpn_pos = [in_win_w/100*3, in_win_h/100*90];

	in_win_clip = in_win_w+_epsilon;

	in_win_w = document.getElementsByTagName("html")[0].clientWidth; in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
	in_win_h = document.getElementsByTagName("html")[0].clientHeight; in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;
	document.getElementById("cv").width = document.getElementById("cv_over").width = in_win_w;
	document.getElementById("cv").height = document.getElementById("cv_over").height = in_win_h;
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;
}


						/*-- Key & Mouse event capture --\
						\-------------------------------*/

//#KEYMAP
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
	h: false,
	o: false,
	i: false,
	"1": false,
	"2": false,
	"3": false,
	"4": false,
	"5": false,
	"6": false,
	"7": false,
	" ": false,
	"/": false,
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

	if (player_look_dir[0] > pi) [player_look_dir[0] = -pi]; // This is kinda wack need to refactor entire system for this
	if (player_look_dir[0] < -pi) [player_look_dir[0] = pi];
}


// Generic js

function downloadSaveFile()
{
    var t_sum = 0;
    for (var i = world_obj_count + 1; i < mem_log.length; i++) {t_sum += (mem_log[i][1]-4);} // Remove center from size

    var _tar = new Float32Array(t_sum);
    var _ti = 0;  // Track total index in _tar

    for (var i = world_obj_count + 1; i < m_objs.length; i++)
    {
        for (var j = 0; j < mem_log[i][2]-1; j++) // Remove center
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

stn_menu_clearall.addEventListener('click', function(e)
{
	for (var i=world_obj_count+1; i<m_objs.length; i++)
	{
		del_world();
	}
});

stn_grid_s.addEventListener('change', function(e)
{
	if (checkNumber(this.value)) {grid_scale_f = this.value;}
});


stn_link_cboxes.forEach(function(e) // This worked out so damn good.
{
	e.addEventListener('change', function()
	{
		switch(this)
		{
			case stn_link_cboxes[0]:
				stn_link_cboxes[1].checked = stn_link_cboxes[2].checked = false;
				stn_link_tool = 0;
				break;
			case stn_link_cboxes[1]:
				stn_link_cboxes[0].checked = stn_link_cboxes[2].checked = false;
				stn_link_tool = 1;
				break;
			case stn_link_cboxes[2]:
				stn_link_cboxes[0].checked = stn_link_cboxes[1].checked = false;
				stn_link_tool = 2;
				break;
		}
	});
});

stn_tab_query.forEach(function(e) // This worked out so damn good.
{
	e.addEventListener('click', function()
	{
		switch(this)
		{
			case stn_tab_query[0]:
				menu_tab = 0;
				break;
			case stn_tab_query[1]:
				menu_tab = 1;
				break;
		}
	});
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
		    if (lock_vert_mov) {hover_h += -e.deltaY*(key_map.shift+0.2)/14}; // fix
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

function dot4(a,b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3];}
function dot(a,b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];}
function dot2(a,b) {return a[0]*b[0] + a[1]*b[1];}

function add2(a,b) {return [a[0]+b[0], a[1]+b[1]];}
function add3(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];}
//function add4(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]];} // quats
function add(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2], 1];}

function sub3(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];}
function sub(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2], 1];} // Must keep last 1 to make it easy to push. Keep in mind..

function len3(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);}
function len2(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]);}

function scale(a,s) {return [a[0]*s, a[1]*s, a[2]*s];} // Removed last 1 take note
function scale3(a,s) {return [a[0]*s, a[1]*s, a[2]*s];}
function scale2(a,s) {return [a[0]*s, a[1]*s];}

function norm(_p)
{
	_l = dot(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l]);
}

function norm4(_p) // Quaternion 
{
	_l = dot4(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l, _p[3]/_l]);
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

function cross(a,b) {return new Float32Array([a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]])};

function pIsEqual(p1, p2)
{
	if (p1[0] == p2[0] && p1[1] == p2[1] && p1[2] == p2[2]) {return true;} else {return false;}
}

function hasDuplicate(set, point)
{
    for (var existingPoint of set)
    {
        if (pIsEqual(existingPoint, point)) {return true;}
    }
    return false;
}

function roundTo(value, n) {return Math.round(value / n) * n;}

function roundPTo(p, n)
{
	return [Math.round(p[0] / n) * n, Math.round(p[1] / n) * n, Math.round(p[2] / n) * n, 1];
}

function runEvery(_ms) // works 100 honest #1 fav js fn rn
{
	var d_t = Date.now() - date_now; var _r = 0;
	if (d_t > _ms) {_r = 1; date_now = Date.now();} else {_r = 0;}
	return (_r);
}


function checkNumber(n)
{
	if (/^\d+(\.\d+)?$/.test(n)) {return n;} else {return false;}
}


function meanctr_obj(ar) // I think this work. I hope so.
{
    var _ob = splitObjS(ar);
    var uniquePoints = new Set();
    var _pm = [0, 0, 0, 0];
    for (var i = 0; i < _ob.length; i++)
    {
        var point = _ob[i];
        if (!hasDuplicate(uniquePoints, point))
        {
            _pm = add3(point, _pm);
            uniquePoints.add(point);
        }
    }
    var uniqueCount = uniquePoints.size;
    _pm[3] = 1;
    return uniqueCount === 0 ? new Float32Array(_pm) : new Float32Array(scale(_pm, 1 / uniqueCount));
}


						/*-- Placeholder 4d data generation --\
						\------------------------------------*/


var m_obj_offs = [];

// var m_obj_rots = [];


var m_objs = []; // [[n,...,],[n,...,],...]
var mem_log = []; // [start, size]
var mem_sum = 0;

var m_objs_ghost = []; // Cloned m_obj data

var m_t_objs = []; // [[n,...,],[n,...,],...]
var mem_t_log = []; // [start, size]
var mem_t_sum = 0;

var m_pre_objs = []; // [[n,...,],[n,...,],...]
var m_pre_log = []; // [start, size]
var m_pre_sum = 0;

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
//const m_gun = new Float32Array([0.0000,-28.0000,4.0000,1.0000,0.0000,-28.0000,-8.0000,1.0000,0.0000,-32.0000,-8.0000,1.0000,0.0000,-32.0000,4.0000,1.0000,0.0000,-28.0000,4.0000,1.0000,0.0000,-32.0000,4.0000,1.0000,0.0000,-32.0000,9.0000,1.0000,0.0000,-22.0000,9.0000,1.0000,0.0000,-22.0000,4.0000,1.0000,0.0000,-32.0000,4.0000,1.0000,0.0000,-32.0000,9.0000,1.0000,0.0000,-34.0000,10.0000,1.0000,0.0000,-33.0000,11.0000,1.0000,0.0000,-32.0000,9.0000,1.0000,0.0000,-29.2222,3.8889,0.0000]);
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


function splitObj(ar) // Accepts linear : outputs array of 4d points
{
    const r = [];
    const _s = Math.ceil(ar.length / 4) - 1; // - 1 cntr
    for (let i = 0; i < _s; i++)
    {
        const end = Math.min(i*4 + 4, ar.length);
        const chunk = ar.subarray(i*4, end);
        r.push(new Float32Array(chunk));
    }
    return r;
}

function splitObjS(ar) // special function for splitting obj w/ no center
{
    const r = [];
    const _s = Math.ceil(ar.length / 4); // - 1 cntr
    for (let i = 0; i < _s; i++)
    {
        const end = Math.min(i*4 + 4, ar.length);
        const chunk = ar.subarray(i*4, end);
        r.push(new Float32Array(chunk));
    }
    return r;
}

// grid: side length, scale, plane, offset
var m_flr = setGrid(8*4-2, 8, 1, [4, 0, 4]);

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
	// #DATAFNS

var m1 = turbojs.alloc(80000); // Everything
for (i=0; i<m1.data.length; i++)
{
	m1.data[i] = 0.0;
}


function m_objs_loadPoints(ar) // Adds objects, make add to stop stack fn
{
	if (ar.length > 4)
	{
		var ar_f = new Float32Array(ar.length + 4);
		ar_f.set(ar); ar_f.set(meanctr_obj(ar), ar.length);
		var ar_g = new Float32Array(ar.length + 4);
		ar_g.set(ar_f); // new ghost
		m_objs[m_objs.length] = ar_f; // Append ar to m_objs. m_objs.length points to end
		m_objs_ghost[m_objs_ghost.length] = ar_g;
		mem_log.push([mem_sum, ar_f.length, Math.floor(ar_f.length/4), Math.floor(ar_f.length/12)]);
		mem_sum += ar_f.length;
		obj_normalMaps.push(new Float32Array(ar.length + 4)); // Idk this works for now??

		// Need accurate size here: actual length found with ar.length or Math.floor(((ar.length + 4)/4-1)/2)-mem_log[i][2]%2
		// obj_normalMaps.push(new Float32Array(Math.floor(((ar.length + 4)/4-1)/2)-(ar.length + 4)/4%2));
		// obj_normalMaps.push(new Float32Array(Math.ceil(ar.length/2))); // idk fix this poo
		//obj_normalMaps.push(new Float32Array( 4*(Math.floor((ar.length/4-1)/2)-(ar.length/4)%2) ));
	} else {
		m_objs[m_objs.length] = ar;
		m_objs_ghost[m_objs_ghost.length] = ar;
		mem_log.push([mem_sum, ar.length, Math.floor(ar.length/4), Math.floor(ar.length/12)]);
		mem_sum += ar.length;
		obj_normalMaps.push(new Float32Array([0.0, 0.0, 0.0, 0.0]));
	}
	m_obj_offs.push([0.0, 0.0, 0.0, 1]);
	//obj_updateNormalMaps();
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
	paint_n = 0;
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

function packObj(ar) // Puts m_t_objs into m_objs as single array 
{
	var _tar = new Float32Array(ar.length*4);
	for (i=0; i<ar.length; i++)
	{
		_tar[i*4+0] = ar[i][0]
		_tar[i*4+1] = ar[i][1]
		_tar[i*4+2] = ar[i][2]
		_tar[i*4+3] = ar[i][3]
	}
	return _tar;
}

function cloneObj(ar) // Removes ctr pt from linear array
{
	var _tn = new Float32Array(ar.length-4);
	_tn.set(ar.subarray(0, ar.length-4));
	return _tn;
}

function setData() // Combine world and specific obj data set. Using mem_t_log as a clean space for obj modification. m_obj_offs creates temporary modification! animations!
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
m_objs_loadPoints(m_gun);        // 11


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


function pointerLockSwap()
{if (document.pointerLockElement !== null) {document.exitPointerLock(); mouseLock = 0;} else {canvas.requestPointerLock(); mouseLock = 1;};}


window.addEventListener('resize', function()
{

	
	updateMenuPos();
});

// Obj load & unpack
fileInput.addEventListener('change', event => 
{
	const _fi = event.target.files;
	loadFile(_fi[0]);
});

function loadFile(_fi)
{
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
}

function obj_updateNormalMaps()
{
	if (m_objs.length>world_obj_count+1) // xtra?
	{
		var p1, p2, p3, v1, v2, _cr;
		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
			for (var k=0; k<Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2; k++)
			{
					p1 = [m_objs[i][8*k], m_objs[i][8*k+1], m_objs[i][8*k+2]];
					p2 = [m_objs[i][8*k+4], m_objs[i][8*k+5], m_objs[i][8*k+6]];
					p3 = [m_objs[i][8*k+8], m_objs[i][8*k+9], m_objs[i][8*k+10]];
					

					//console.log(p1);
					// p1-p2, p3-p2
					//if (i==1) {console.log(p1 + " : " + p2 + " : " + p3);}
					v1 = sub3(p1,p2);
					v2 = sub3(p3,p2);
					// var _cr = cross(v1, v2); // Fix?
					_cr = cross(v1, v2); // Fix?
					//console.log(_cr);
					obj_normalMaps[i][4*k+0] = _cr[0];
					obj_normalMaps[i][4*k+1] = _cr[1];
					obj_normalMaps[i][4*k+2] = _cr[2];

					// Unreal it works lol.
					// Now to update updateRayInters with all results from lpi w/ by paralleling with m_objs again to query both m_objs and obj_normalMaps into the lpi that updates a list of points. Dynamic list for this one.
					// 2d mean could point to nearest 3 points as well making this a lot faster than doing this lol. or combine both and use the 2d to determine if it's center and if the planes are equal.??
					// if this doens't have to be updated so quickly I can do a test for if i'm in the poly instead at run time as my only rt data.
			}
		}
	}
}



// Just this one fn I copy paste. Wow it works too. Gotta review my barycentric coordinates lol
// I realized that my tri's are not with 90's so a dot w/ 3 vectors didn't work.
// I could just split each tri into two and still do it my way but this is good enough I guess.
function isPointInsideTriangle(p, p1, p2, p3)
{
    // Calculate vectors
    const v0 = sub3(p3, p1);
    const v1 = sub3(p2, p1);
    const v2 = sub3(p, p1);

    // Calculate dot products
    const dot00 = dot(v0, v0);
    const dot01 = dot(v0, v1);
    const dot02 = dot(v0, v2);
    const dot11 = dot(v1, v1);
    const dot12 = dot(v1, v2);

    // Calculate barycentric coordinates
    const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    // Check if point is inside the triangle
    return u >= 0 && v >= 0 && u + v <= 1;
}


function updateRayInters()
{
	if (m_objs.length>world_obj_count+1) // Remove?
	{
		obj_updateNormalMaps(); 
		rayInterMap.length = 0;
		var p1, p2, p3, v1, v2, v3, _cr, _int, _fn;
		for (var i=world_obj_count; i<m_objs.length; i++) // Removed +1 and i<m_objs.length instead of obj_normalMaps.length?????
		{
			if (mem_log[i][2]>2) // wat?
			{
				for (var k=0; k<Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2; k++) // Y no +1 w/ world count work??
				{
						// Replace this part w/ fn
						_oh = dot(player_pos,[0,1,0,1]);
						updateLook();

						f_dist = -_oh/dot([0,1,0],norm(f_look));
						_nplns = [[1,0,0],[0,1,0],[0,0,1]][pln_cyc]; // use pln_cyc to select norm vec from array of norm vecs
						_plr_dtp = [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]]; // player pos + look dir * 

						// n here
						_cr = [obj_normalMaps[i][4*k+0], obj_normalMaps[i][4*k+1], obj_normalMaps[i][4*k+2]];

						p1 = [m_objs[i][8*k], m_objs[i][8*k+1], m_objs[i][8*k+2]];
						p2 = [m_objs[i][8*k+4], m_objs[i][8*k+5], m_objs[i][8*k+6]];
						p3 = [m_objs[i][8*k+8], m_objs[i][8*k+9], m_objs[i][8*k+10]];

						v1 = sub3(p2,p1);
						v2 = sub3(p3,p2);
						v3 = sub3(p1,p3);

						_int = lpi(_plr_dtp, player_pos, p2, _cr);

						//can use create point like I did before ez
						if (isPointInsideTriangle(_int, p1, p2, p3))
						{
							//console.log("Point in TRI");
							//m_t_objs_loadPoint(new Float32Array([_int[0], _int[1], _int[2], 1.0]));
							rayInterMap.push(_int);
						}
				}
			}
		}
	}
}


function teleport_plr()
{
	switch(lock_vert_mov)
	{
		case false:
			player_pos[0] = _inter[0];
			player_pos[1] = _inter[1]-14;
			player_pos[2] = _inter[2];
			break;

		case true:
			player_pos[0] = 2*(_inter[0]-player_pos[0]) + player_pos[0];
			player_pos[2] = 2*(_inter[2]-player_pos[2]) + player_pos[2];
			player_look_dir[0] = (player_look_dir[0] + pi > 2 * pi) ? player_look_dir[0] - pi : player_look_dir[0] + pi; //flippero
			break;
	}
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

function rot_z_pln(_p,_r)
{
	var _p1 = [
		Math.cos(_r)*_p[0]-Math.sin(_r)*_p[1],
		Math.sin(_r)*_p[0]+Math.cos(_r)*_p[1],
		_p[2],
		_p[3]
	];
	return _p1;
}

function mir_w_pln(_p,_c)
{
	var _f;
	switch(_c)
	{
		case 0:
			_f = [
				-_p[0],
				_p[1],
				_p[2],
				_p[3]
			];
			break;
		case 1:
			_f = [
				_p[0],
				-_p[1],
				_p[2],
				_p[3]
			];
			break;
		case 2:
			_f = [
				_p[0],
				_p[1],
				-_p[2],
				_p[3]
			];
			break;
	}
	return _f;
}

// Rotation around arbitrary axis. Basically useless now that I have quats.
function rot_aa(_p, _v, _r) // _p must be local 
{
	// Ang from y axis must be arctan(y/x) y is literally opposite of x.
	// Reciprocal of opposite/adjacent gives the other angle (pi - ang)

	var _a1 = Math.atan(_v[0]/_v[2]); // x/z ang that moves to y pln
	var _d2 = Math.sqrt(_v[0]*_v[0] + _v[2]*_v[2]);
	var _a2 = Math.atan(_v[1]/_d2);	// ang that moves to z pln

	var _op1 = rot_y_pln(_p, -_a1);
	var _opz = rot_x_pln(_op1, -_a2);
	var _op4 = rot_z_pln(_opz, _r); // Apply our radians
	var _op5 = rot_x_pln(_op4, _a2);
	var _op6 = rot_y_pln(_op5, _a1);

	return _op6;
}

// The concepts of the math seem to imply the code structure.
// The beginning q1 0 * q2 0 - q1 1 * q2 is the beginning of the vector calc and the - q1 2 * q2 2 - q1 3 * q2 3 is the cross product

function multiplyQuaternions(q1, q2) // The scaler part of the quaternion comes first here ***
{
    const w = q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2] - q1[3] * q2[3];
    const x = q1[0] * q2[1] + q1[1] * q2[0] + q1[2] * q2[3] - q1[3] * q2[2];
    const y = q1[0] * q2[2] - q1[1] * q2[3] + q1[2] * q2[0] + q1[3] * q2[1];
    const z = q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1] + q1[3] * q2[0];
    return [w, x, y, z];
}


function makeQuaternion(_r, _a) // Radians, Axis
{
	// Quaternion (cos(theta/2), sin(theta/2) * V) converts to 4d array of data like this.
	// Implied if computed w/ matrices.
	var _q = [
	    Math.cos(_r / 2),
	    Math.sin(_r / 2) * _a[0],
	    Math.sin(_r / 2) * _a[1],
	    Math.sin(_r / 2) * _a[2]
	];
	return _q;
}


// Quat rot using matrix quat multiplier
function quatRot(_p, _q_ar) // Point to be rotated. Sequence of quaternions.
{
    var _fq = [1, 0, 0, 0]; // Initial quaternion for rotation accumulation
    for (var i = 0; i < _q_ar.length; i++) {
        _fq = multiplyQuaternions(_q_ar[i], _fq);
    }
	// Normalize it. Makes sense when you are adding many together.
	const _nq = norm4(_fq);
	// Make a vector quaternion / quaternion vector
    const _vq = [0, _p[0], _p[1], _p[2]]; // q w/ no scaler
    const _rq0 = multiplyQuaternions(_nq, _vq); // Must do this first (l2r)
    const _rq = multiplyQuaternions(_rq0, [
         _nq[0],
        -_nq[1],
        -_nq[2],
        -_nq[3]
    ]);
    return [_rq[1], _rq[2], _rq[3]];
}


function del_obj(_i)
{
	if (_i > world_obj_count)
	{
		if (obj_cyc == m_objs.length-1)
		{
			m_objs.splice(-1);	mem_log.splice(-1); m_obj_offs.splice(-1); m_objs_ghost.splice(-1); obj_cyc = obj_cyc-1;
		} else {
			var _ts = mem_log[obj_cyc][1];
			for (var i = obj_cyc+1; i<mem_log.length; i++)
			{
				mem_log[i][0] = mem_log[i][0]-_ts;
			}
			m_objs.splice(obj_cyc, 1); mem_log.splice(obj_cyc, 1); m_obj_offs.splice(obj_cyc, 1); m_objs_ghost.splice(obj_cyc, 1);
		}
	}
}

function del_world()
{
	m_objs.splice(world_obj_count+1);	mem_log.splice(world_obj_count+1); m_obj_offs.splice(world_obj_count+1); m_objs_ghost.splice(world_obj_count+1);
	fileInput.value = '';
}

function updateLook()
{
		_viewq = [makeQuaternion(-player_look_dir[1], norm([1,0.000001,0.000001])),
				  makeQuaternion(-player_look_dir[0], norm([0.000001,1,0.000001]))];
		f_look = quatRot( [0,0,1], _viewq );
}

function finishTrnsAnim(_i)
{
	for (var i=0; i<mem_log[_i][2]; i++)
	{
		m_objs[_i][i*4+0] = m_objs[_i][i*4+0]+roundTo(m_obj_offs[_i][0], grid_scale_f);
		m_objs[_i][i*4+1] = m_objs[_i][i*4+1]+roundTo(m_obj_offs[_i][1], grid_scale_f);
		m_objs[_i][i*4+2] = m_objs[_i][i*4+2]+roundTo(m_obj_offs[_i][2], grid_scale_f);
	}
}

function findbyctr_obj()
{
	if (m_objs.length > world_obj_count+1)
	{
		var _lt;
		var _i = world_obj_count+1;
		var _l = len2([m1.data[mem_log[world_obj_count+1][0]+mem_log[world_obj_count+1][1]-4]-in_win_wc, m1.data[mem_log[world_obj_count+1][0]+mem_log[world_obj_count+1][1]-3]-in_win_hc]);
		for (var i=world_obj_count+2; i<m_objs.length; i++)
		{
			_lt = len2([m1.data[mem_log[i][0]+mem_log[i][1]-4]-in_win_wc, m1.data[mem_log[i][0]+mem_log[i][1]-3]-in_win_hc]);
			if (_lt < _l) {_i = i; _l = _lt;}
		}
		return _i;
	} else {return world_obj_count;}
}

function getctr_obj(_i)
{
	var _c = new Float32Array(4);
	_c[0] = m_objs[_i][m_objs[_i].length-4];
	_c[1] = m_objs[_i][m_objs[_i].length-3];
	_c[2] = m_objs[_i][m_objs[_i].length-2];
	_c[3] = 1;
	return _c;
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
				if (!stn_trns[0]) {m_objs[trns_obj_i][i*4] = m_objs[trns_obj_i][i*4]+_fd[0];}
				if (!stn_trns[1]) {m_objs[trns_obj_i][i*4+1] = m_objs[trns_obj_i][i*4+1]+_fd[1];}
				if (!stn_trns[2]) {m_objs[trns_obj_i][i*4+2] = m_objs[trns_obj_i][i*4+2]+_fd[2];}
			}
				m_obj_offs[trns_obj_i][0] = 0;
				m_obj_offs[trns_obj_i][1] = 0;
				m_obj_offs[trns_obj_i][2] =	0;

				_lp[0] = _lp_world[0] = _inter_rnd[0];
				_lp[1] = _lp_world[1] = _inter_rnd[1];
				_lp[2] = _lp_world[2] = _inter_rnd[2];

			trns_lock = 0; obj_cyc = trns_obj_i;
			break;
	}
}

function m_obj_explode(_i)
{
	if (_i>world_obj_count)
	{
		var _tp = [];
		for (var i=0; i<mem_log[_i][2]; i++)
		{
			_tp[i*4] = m_objs[_i][i*4];
			_tp[i*4+1] = m_objs[_i][i*4+1];
			_tp[i*4+2] = m_objs[_i][i*4+2];
			_tp[i*4+3] = m_objs[_i][i*4+3];
		}
		m_t_objs_loadPoints(splitObj(new Float32Array(_tp)));
		del_obj(_i);
	}
}

function m_objs_bottom(_i)
{
	m_objs_loadPoints(cloneObj(m_objs[_i]));
	del_obj(_i);
}


// New plan way better. Shift elements along so that
//		first array's overlapping point is it's last.
//		second array's overlapping point is it's first.
//		wait this won't work for lines.
//		going with this for now
//		objs should be simply grouped to avoid this?

//		I can do two algs
//		one if list joins w/ itself once
//		another if no connected points
//		another if more than 1 connected point

//		difference in points from link generation needs to be the same !!!
//		my poly link needs fix
//		I give up. Just going to fix load/save encoding and group objs instead.
//		My final attempt should work but it didn't. I just can't waste more time on this one for now.

function bond_obj(_i)
{
	switch(_all_lock)
	{
		case 0: // Alternator
			console.log(_i);
			_all_lock_i = _i;
			_all_lock = 2;
			break;
		case 2:

			var _oi = splitObj(m_objs[_i]);
			var _of = splitObj(m_objs[_all_lock_i]);
			// Some for each practice
			var lap_oi = -1; var lap_of = -1;
			_oi.forEach((e1, i1) =>
			{
				_of.forEach((e2, i2) =>
				{
					if (pIsEqual(e1, e2))
					{lap_oi = i1; lap_of = i2;}
				});
				if (lap_oi != -1) {return;}
			});

			//console.log(lap_oi + " : " + lap_of);
			
			// shift around indexs so that it changes the order drawn to align with the overlap point and then just connect the two end to end removing the first point of second one

			//var _oi_half0 = _oi.slice(lap_oi);
			//var _oi_r = circularRotate(_oi, _oi.length-1 - lap_oi);

			//const endIndex = lap_oi+1; // Inclusive end index
			//const elementsToRemove = _oi.length - endIndex - 1;
			//const _oi_half1 = _oi.splice(endIndex + 1, elementsToRemove); // end. _oi is now beginning half

			var _f = [];

			_oi.push(_oi[_oi.length-1]);

			_oi.forEach(e1 =>
			{
				_f.push(e1);
			});

			_of.forEach(e1 =>
			{
				_f.push(e1);
			});

			// _oi_half1.forEach(e1 =>
			// {
			// 	_f.push(e1);
			// });

			// Now get tails in reverse

			// console.log(lap_oi);
			// console.log(lap_of);
			
			// var _of_tail = _of.slice(lap_of).reverse();

			// if ( (_oi_tail.length) %2 != 0)
			// {_oi_tail.push(_oi_tail[_oi_tail.length-1]);}

			// if ( (_of_tail.length) %2 == 0)
			// {_of_tail.push(_of_tail[_of_tail.length-1]);}

			// console.log(_of_tail);

			// // Now to push tails onto original arrays

			// _oi_tail.forEach(e1 =>
			// {
			// 	_oi.push(e1);
			// });

			// _of_tail.forEach(e1 =>
			// {
			// 	_of.push(e1);
			// });

			// console.log(_oi);
			// console.log(_of);

			// Using the reverse loop to construct final obj

			// for (var i = _of.length - 1; i >= 0; i--)
			// {
			// 	_oi.push(_of[i]);
			// }

			m_objs_loadPoints(packObj(_f));
			_all_lock = 0;
			break;
	}
}

function link_obj(_i, _t)
{
	switch(_all_lock)
	{
		case 0: // Alternator
			_all_lock_i = _i;
			_all_lock = 1;
			break;
		case 1:
			if (mem_log[_i][1] != mem_log[_all_lock_i][1] || _i == _all_lock_i) {_all_lock = 0; _all_lock_i = 0; break;} //console.log("can't link");
			var _of = [];
			var _o1 = splitObj(m_objs[_i]);
			var _o2 = splitObj(m_objs[_all_lock_i]);
			switch(_t)
			{
				case 0:
					var _ia = JSON.stringify([m_objs[_i][0], m_objs[_i][1], m_objs[_i][2], 1, m_objs[_all_lock_i][0], m_objs[_all_lock_i][1], m_objs[_all_lock_i][2], 1]);
					for (var i = 0; i<mem_log[_i][2]-1; i++)
					{
						var _ob = [];
						_ob = [m_objs[_i][i*4], m_objs[_i][i*4+1], m_objs[_i][i*4+2], 1, m_objs[_all_lock_i][i*4], m_objs[_all_lock_i][i*4+1], m_objs[_all_lock_i][i*4+2], 1];
						if (i == mem_log[_i][2]-2)
						{ // Double nested to avoid unnecesarry second call to JSON.stringify(). Dirty fix.
							if (_ia != JSON.stringify(_ob))
							{m_objs_loadPoints(new Float32Array(_ob));}
						} else {m_objs_loadPoints(new Float32Array(_ob));}
					}
					_all_lock_i = 0; _all_lock = 0;
					break;

				case 1:
					var _s = (mem_log[_i][2]-1) - 1; 
					for (var i = 0; i<_s; i++)
					{
						if (i==0) {_of.push(_o1[i]);} // Start not included in pat gen seq
						switch(i%2)
						{
							case 0: // even
								_of.push(_o2[i]);
								_of.push(_o2[i+1]);
								if (i==_s-1)
								{
									_of.push(_o1[i+1]);
									for (var j = _s-1; j>=0; j--)
									{
										switch(j%2)
										{
											case 0: // even
												_of.push(_o1[j]);
												if (j!=0) {_of.push(_o2[j]);} // omit last.
												break;
											case 1: // odd
												_of.push(_o2[j]);
												_of.push(_o1[j]);
												break;
										}
									}
								}
								break;

							case 1: // odd
								_of.push(_o1[i]);
								_of.push(_o1[i+1]);
								if (i==_s-1)
								{
									_of.push(_o2[i+1]);

									for (var j = _s-1; j>=0; j--)
									{
										console.log(j);
										switch(j%2)
										{
											case 0: // even
												_of.push(_o1[j]);
												if (j!=0) {_of.push(_o2[j]);} // omit last.
												break;
											case 1: // odd
												_of.push(_o2[j]);
												_of.push(_o1[j]);
												break;
										}
									}
								}
								break;
						}
					}
					m_objs_loadPoints(packObj(_of));
					_all_lock_i = 0; _all_lock = 0;
					break;

				case 2:
					for (var i = 0; i<mem_log[_i][2]-1; i++) // -1 remove center
					{
						if (i==0) {_of.push(_o1[i]);}
						_of.push(_o2[i]);
						if (i != mem_log[_i][2]-2) {_of.push(_o2[i+1]); _of.push(_o1[i]);  _of.push(_o1[i+1]);}
					}
					m_objs_loadPoints(packObj(_of));
					_all_lock_i = 0; _all_lock = 0;
					break;
			}
			break;
	}
}



function expand_obj(_i)
{
	switch(_all_lock)
	{
		case 0:
			_all_lock_i = _i;
			_all_lock = 3;
			exp_f[0] = _lp_world[0];
			exp_f[1] = _lp_world[1];
			exp_f[2] = _lp_world[2];
			break;
		case 3:
			var _mc = getctr_obj(_all_lock_i);
			var _d = sub(_lp_world, _mc);
			var _w = sub(_lp_world, exp_f);
			var _s = Math.pow(len3(sub(_lp_world, exp_f)),1/3);

			for (var k=0; k<_w.length; k++) {if(_w[k]==0){_w[k]=1;}else{_w[k] = Math.abs(_w[k]/_s);}}
			// for (var k=0; k<_w.length; k++) {if(_w[k]==0){_w[k]=1;}}

			//console.log(_w);

			//var _rs = []; var _re = []; var _rf = [];

			for (var i=0; i<mem_log[_all_lock_i][1]/4; i++)
			{
				//c=====x--------------0
				//c--------------------0=====x
				//c--------------------0==========x
				//c==========x---------0

				// console.log([m_objs[_all_lock_i][i*4]-_mc[0], m_objs[_all_lock_i][i*4+1]-_mc[1], m_objs[_all_lock_i][i*4+2]-_mc[1]]);
				// console.log(_mc);
				//_rs = [m_objs[_all_lock_i][i*4]-_mc[0], m_objs[_all_lock_i][i*4+1]-_mc[1], m_objs[_all_lock_i][i*4+2]-_mc[1]];

				// _rs = [m_objs[_all_lock_i][i*4], m_objs[_all_lock_i][i*4+1], m_objs[_all_lock_i][i*4+2]];
				// _re = scale3(_rs, 1/len3(_rs));
				// _rf = 
				// console.log(_rs);

				// m_objs[_all_lock_i][i*4]   = _mc[0] + _w[0]*(m_objs[_all_lock_i][i*4]  -_mc[0]);
				// m_objs[_all_lock_i][i*4+1] = _mc[1] + _w[1]*(m_objs[_all_lock_i][i*4+1]-_mc[1]);
				// m_objs[_all_lock_i][i*4+2] = _mc[2] + _w[2]*(m_objs[_all_lock_i][i*4+2]-_mc[2]);
				m_objs[_all_lock_i][i*4]   = _mc[0] + _w[0]*(m_objs[_all_lock_i][i*4]  -_mc[0]);
				m_objs[_all_lock_i][i*4+1] = _mc[1] + _w[1]*(m_objs[_all_lock_i][i*4+1]-_mc[1]);
				m_objs[_all_lock_i][i*4+2] = _mc[2] + _w[2]*(m_objs[_all_lock_i][i*4+2]-_mc[2]);

			}
			_all_lock_i = 0; _all_lock = 0;
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
	// #DRAW
	
function drawOverlay(init_dat)
{
	ctx_o.clearRect(0, 0, in_win_w, in_win_h);

	//obj_updateNormalMaps();

	if (wpn_select==1 && key_map.lmb==false && mouseLock) {obj_cyc = findbyctr_obj();}

	//Crosshair
	drawLine(ctx_o, rgba_ch, crosshair_w, in_win_wc-crosshair_l,in_win_hc, in_win_wc+crosshair_l, in_win_hc);
	drawLine(ctx_o, rgba_ch, crosshair_w, in_win_wc,in_win_hc-crosshair_l, in_win_wc, in_win_hc+crosshair_l);

	//Wpn select
	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_wpn_pos[0], menu_wpn_pos[1], 278, 70);
	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_wpn_pos[0]+6, menu_wpn_pos[1]+6, 62, 58);
	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_wpn_pos[0]+74, menu_wpn_pos[1]+6, 62, 58);
	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_wpn_pos[0]+142, menu_wpn_pos[1]+6, 62, 58);
	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_wpn_pos[0]+210, menu_wpn_pos[1]+6, 62, 58);

	drawPanel(ctx_o, rgba_dgray, rgba_gray, menu_wpn_pos[0]+7+wpn_select*68, menu_wpn_pos[1]+7, 60, 56); // Darklighter box


	document.getElementById("stn_menu_tab_0").style.left = (menu_q_pos[0]-1+11-6) + "px";
	document.getElementById("stn_menu_tab_0").style.top = (menu_q_pos[1]-15-1) + "px";

	document.getElementById("stn_menu_tab_1").style.left = (menu_q_pos[0]+150-6) + "px";
	document.getElementById("stn_menu_tab_1").style.top = (menu_q_pos[1]-15-1) + "px";


    if (!mouseLock)
    {


    	
        menu_inputs.forEach(function(e) {e.style.display = "block";});


		// Large back pan
		//drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+376, menu_q_pos[1]-24, 180, 662);

		// Large back pan
		//drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]-12, menu_q_pos[1]-24, 388, 662);
		drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]-12, menu_q_pos[1]-24, 550, 662);

		// bg left
		drawPanel(ctx_o, rgba_dgray, rgba_lgray, menu_q_pos[0], menu_q_pos[1]+18, 369, 606);

		// bg right

		drawPanel(ctx_o, rgba_dgray, rgba_lgray, menu_q_pos[0]+377, menu_q_pos[1]+18, 147, 606);

		///////////////////////////////

		if (menu_tab==0)
		{



			// Circle settings
			drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+11, menu_q_pos[1]+30, 170, 183);

			// Link settings
			drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+11, menu_q_pos[1]+230, 170, 183);

			// Translation settings
			drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+189, menu_q_pos[1]+230, 170, 183);

			// Draw Settings
			drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+189, menu_q_pos[1]+30, 170, 183);

			// Paint settings
			drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+11, menu_q_pos[1]+430, 170, 183);

			// Paint settings
			drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_q_pos[0]+189, menu_q_pos[1]+430, 170, 183);

			///////////////////////////////



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

			document.getElementById("stn_draw_l").style.left = (menu_q_pos[0]+296) + "px";
			document.getElementById("stn_draw_l").style.top = (menu_q_pos[1]+80) + "px";
			document.getElementById("stn_draw_s").style.left = (menu_q_pos[0]+296) + "px";
			document.getElementById("stn_draw_s").style.top = (menu_q_pos[1]+118) + "px";

			document.getElementById("stn_trns_x").style.left = (menu_q_pos[0]+296) + "px";
			document.getElementById("stn_trns_x").style.top = (menu_q_pos[1]+280) + "px";
			document.getElementById("stn_trns_y").style.left = (menu_q_pos[0]+296) + "px";
			document.getElementById("stn_trns_y").style.top = (menu_q_pos[1]+318) + "px";
			document.getElementById("stn_trns_z").style.left = (menu_q_pos[0]+296) + "px";
			document.getElementById("stn_trns_z").style.top = (menu_q_pos[1]+356) + "px";

			document.getElementById("stn_paint_inf").style.left = (menu_q_pos[0]+110) + "px";
			document.getElementById("stn_paint_inf").style.top = (menu_q_pos[1]+477) + "px";
			document.getElementById("stn_paint_l").style.left = (menu_q_pos[0]+101) + "px";
			document.getElementById("stn_paint_l").style.top = (menu_q_pos[1]+518) + "px";
			document.getElementById("stn_paint_line_l").style.left = (menu_q_pos[0]+101) + "px";
			document.getElementById("stn_paint_line_l").style.top = (menu_q_pos[1]+556) + "px";

			document.getElementById("stn_grid_s").style.left = (menu_q_pos[0]+279) + "px";
			document.getElementById("stn_grid_s").style.top = (menu_q_pos[1]+480) + "px";

			document.getElementById("stn_menu_clearall").style.left = (menu_q_pos[0]+386) + "px";
			document.getElementById("stn_menu_clearall").style.top = (menu_q_pos[1]+587) + "px";
		}




	   
			// While in menu with low call rate i'll set values here:

			/*========================================================*/
			/*================--------------------------==============*/
			/*================----- SET TOOL VALUES ----==============*/
			/*================--------------------------==============*/
			/*========================================================*/

		
			stn_cir_tool[0] = checkNumber(document.getElementById("stn_cir_s").value) != false ? parseFloat(document.getElementById("stn_cir_s").value) : stn_cir_tool[0];
			stn_cir_tool[1] = checkNumber(document.getElementById("stn_cir_d").value) != false ? parseFloat(document.getElementById("stn_cir_d").value) : stn_cir_tool[1];
			stn_cir_tool[2] = checkNumber(document.getElementById("stn_cir_o").value) != false ? parseFloat(document.getElementById("stn_cir_o").value) : stn_cir_tool[2];


			stn_draw[0] = document.getElementById("stn_draw_l").checked;
			stn_draw[1] = document.getElementById("stn_draw_s").checked;


			stn_trns[0] = document.getElementById("stn_trns_x").checked;
			stn_trns[1] = document.getElementById("stn_trns_y").checked;
			stn_trns[2] = document.getElementById("stn_trns_z").checked;


			stn_paint_inf = document.getElementById("stn_paint_inf").checked;

			stn_paint_l = checkNumber(document.getElementById("stn_paint_l").value) != false ? parseFloat(document.getElementById("stn_paint_l").value) : stn_paint_l;
			stn_paint_line_l = checkNumber(document.getElementById("stn_paint_line_l").value) != false ? parseFloat(document.getElementById("stn_paint_line_l").value) : stn_paint_line_l;


    } else {

        menu_inputs.forEach(function(e) {e.style.display = "none";});
        
    }

    if (menu_tab!=0)
    {
    	menu_tab0.forEach(function(e) {e.style.display = "none";});
    }


	document.getElementById("fileInput").style.position = "absolute";
	document.getElementById("fileInput").style.left = (menu_keys_pos[0]+15)+"px";
	document.getElementById("fileInput").style.top = (62)+"px"; // M keys menu expander


	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_keys_pos[0], menu_keys_pos[1], 410, 88); // Open file mover

	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_obj_pos[0], menu_obj_pos[1], 138, 25+m_objs.length*15);

	drawPanel(ctx_o, rgba_gray, rgba_lgray, -5, -5, 1, 1); // SUPER HOT FIX for panel 1px border. MAKES. ZERO. SENSE. I have tried everything this is actually globally broken right now.

	// Remove aim thing

	drawText(ctx_o, rgba_otext, "left", "pos[" + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+"]", menu_keys_pos[0]+15, 34);
	//drawText(ctx_o, rgba_otext, "right", "aim[" + ((init_dat.data[mem_log[1][0]]-in_win_wc)/s_fov).toFixed(1) + ", " + ((init_dat.data[mem_log[1][0]+1]-in_win_hc)/s_fov).toFixed(1) + ", " + init_dat.data[mem_log[1][0]+3].toFixed(1)+"]", menu_keys_pos[0]+398, 34);
	drawText(ctx_o, rgba_otext, "right", "aim[" + player_look_dir[0].toFixed(1) + ", " + player_look_dir[1].toFixed(1) + "]",  menu_keys_pos[0]+398, 34);
	drawText(ctx_o, rgba_otext, "left", "pln_cyc[" + [" X-Plane "," Y-Plane "," Z-Plane "][pln_cyc]+"]", menu_keys_pos[0]+15, 49);
	drawText(ctx_o, rgba_otext, "right", "grid_scale[" + grid_scale_f+"]", menu_keys_pos[0]+398, 49);

	if (!mouseLock && menu_tab==1)
	{
		drawText(ctx_o, rgba_otext, "left", "W,A,S,D, Shift(sprint), Space(up), B(down)", menu_q_pos[0]+14,menu_q_pos[1]+ 69-30);

		drawText(ctx_o, rgba_otext, "left", "Q(toggle unlock mouse)", menu_q_pos[0]+14,menu_q_pos[1]+ 84-30);

		drawText(ctx_o, rgba_otext, "left", "Scroll(expand)", menu_q_pos[0]+14,menu_q_pos[1]+ 99-30);

		drawText(ctx_o, rgba_otext, "left", "Scroll+LOCK(vert mov)", menu_q_pos[0]+14, menu_q_pos[1]+114-30);

		drawText(ctx_o, rgba_otext, "left", "Scroll+Shift(grid size)", menu_q_pos[0]+14, menu_q_pos[1]+129-30);

		drawText(ctx_o, rgba_otext, "left", "Scroll/Arrows(obj nav)", menu_q_pos[0]+14, menu_q_pos[1]+144-30);

		drawText(ctx_o, rgba_otext, "left", "Scroll+QMENU(select obj)", menu_q_pos[0]+14, menu_q_pos[1]+159-30);

		drawText(ctx_o, rgba_otext, "left", "TAB(near mean ctr)", menu_q_pos[0]+14, menu_q_pos[1]+174-30);

		drawText(ctx_o, rgba_otext, "left", "[Ctrl or Alt](both unlock mouse)", menu_q_pos[0]+14, menu_q_pos[1]+189-30);

		drawText(ctx_o, rgba_otext, "left", "/(print obj to console)", menu_q_pos[0]+14, menu_q_pos[1]+204-30);

		drawText(ctx_o, rgba_otext, "left", "Shift+T(dupe & mov & finish)", menu_q_pos[0]+14, menu_q_pos[1]+219-30);

		drawText(ctx_o, rgba_otext, "left", "G(send cursor to ground)", menu_q_pos[0]+14, menu_q_pos[1]+234-30);

		drawText(ctx_o, rgba_otext, "left", "RMB(go to pnt in current obj)", menu_q_pos[0]+14, menu_q_pos[1]+249-30);

		drawText(ctx_o, rgba_otext, "left", "5(mirror by pln)", menu_q_pos[0]+14, menu_q_pos[1]+264-30);

		drawText(ctx_o, rgba_otext, "left", "6(scale by dist)", menu_q_pos[0]+14, menu_q_pos[1]+279-30);

		drawText(ctx_o, rgba_otext, "left", "7(make cir)", menu_q_pos[0]+14, menu_q_pos[1]+294-30);

		drawText(ctx_o, rgba_otext, "left", "Shift+R(rot obj)", menu_q_pos[0]+14, menu_q_pos[1]+309-30);

		drawText(ctx_o, rgba_otext, "left", "N(LOCK mov)", menu_q_pos[0]+14, menu_q_pos[1]+324-30);

		drawText(ctx_o, rgba_otext, "left", "Q(menu)", menu_q_pos[0]+14, menu_q_pos[1]+339-30);

		drawText(ctx_o, rgba_otext, "left", "C(edit obj)", menu_q_pos[0]+14, menu_q_pos[1]+354-30);

		drawText(ctx_o, rgba_otext, "left", "V(mov obj)", menu_q_pos[0]+14, menu_q_pos[1]+369-30);

		drawText(ctx_o, rgba_otext, "left", "E(make obj)", menu_q_pos[0]+14, menu_q_pos[1]+384-30);

		drawText(ctx_o, rgba_otext, "left", "X(del obj)", menu_q_pos[0]+14, menu_q_pos[1]+399-30);

		drawText(ctx_o, rgba_otext, "left", "F(place point)", menu_q_pos[0]+14, menu_q_pos[1]+414-30);

		drawText(ctx_o, rgba_otext, "left", "Y(teleport)", menu_q_pos[0]+14, menu_q_pos[1]+429-30);

		drawText(ctx_o, rgba_otext, "left", "Z(undo)", menu_q_pos[0]+14, menu_q_pos[1]+444-30);

		drawText(ctx_o, rgba_otext, "left", "T(dupe obj)", menu_q_pos[0]+14, menu_q_pos[1]+459-30);

		drawText(ctx_o, rgba_otext, "left", "H(go to obj ctr)", menu_q_pos[0]+14, menu_q_pos[1]+474-30);

		drawText(ctx_o, rgba_otext, "left", "I(join objs)", menu_q_pos[0]+14, menu_q_pos[1]+489-30);

		drawText(ctx_o, rgba_otext, "left", "L(link objs)", menu_q_pos[0]+14, menu_q_pos[1]+504-30);
	}

	//  else {
	// 	drawText(ctx_o, "right", rgba_otext, "[M][keys]", menu_keys_pos[0]+398, 80);
	// }

    if (!mouseLock && menu_tab==0)
    {
		drawText(ctx_o, rgba_otext, "left", "[circle settings][7]", menu_q_pos[0]+23, menu_q_pos[1]+50);
		drawText(ctx_o, rgba_otext, "left", "[ scale ]", menu_q_pos[0]+23, menu_q_pos[1]+101);
		drawText(ctx_o, rgba_otext, "left", "[divider]", menu_q_pos[0]+23, menu_q_pos[1]+139);
		drawText(ctx_o, rgba_otext, "left", "[  off  ]", menu_q_pos[0]+23, menu_q_pos[1]+177);

		drawText(ctx_o, rgba_otext, "left", "[link settings][L]", menu_q_pos[0]+23, menu_q_pos[1]+250);
		drawText(ctx_o, rgba_otext, "left", "[ linear ]", menu_q_pos[0]+23, menu_q_pos[1]+302);
		drawText(ctx_o, rgba_otext, "left", "[ zigzag ]", menu_q_pos[0]+23, menu_q_pos[1]+340);
		drawText(ctx_o, rgba_otext, "left", "[  poly  ]", menu_q_pos[0]+23, menu_q_pos[1]+378);

		drawText(ctx_o, rgba_otext, "left", "[draw settings]", menu_q_pos[0]+218, menu_q_pos[1]+50);
		drawText(ctx_o, rgba_otext, "left", "[  lines  ]", menu_q_pos[0]+201, menu_q_pos[1]+101);
		drawText(ctx_o, rgba_otext, "left", "[ surface ]", menu_q_pos[0]+201, menu_q_pos[1]+140);

		drawText(ctx_o, rgba_otext, "left", "[lock x-y-z][V]", menu_q_pos[0]+218, menu_q_pos[1]+250);
		drawText(ctx_o, rgba_otext, "left", "[   X   ]", menu_q_pos[0]+201, menu_q_pos[1]+302);
		drawText(ctx_o, rgba_otext, "left", "[   Y   ]", menu_q_pos[0]+201, menu_q_pos[1]+340);
		drawText(ctx_o, rgba_otext, "left", "[   Z   ]", menu_q_pos[0]+201, menu_q_pos[1]+378);

		drawText(ctx_o, rgba_otext, "left", "[paint settings][3]", menu_q_pos[0]+23, menu_q_pos[1]+450);
		drawText(ctx_o, rgba_otext, "left", "[  inf  ]", menu_q_pos[0]+23, menu_q_pos[1]+501);
		drawText(ctx_o, rgba_otext, "left", "[  dist ]", menu_q_pos[0]+23, menu_q_pos[1]+540);
		drawText(ctx_o, rgba_otext, "left", "[ nodes ]", menu_q_pos[0]+23, menu_q_pos[1]+578);

		drawText(ctx_o, rgba_otext, "left", "[grid settings]", menu_q_pos[0]+218, menu_q_pos[1]+450);
		drawText(ctx_o, rgba_otext, "left", "[ scale ]", menu_q_pos[0]+201, menu_q_pos[1]+501);
		// drawText(ctx_o, rgba_otext, "left", "[  b  ]", menu_q_pos[0]+201, menu_q_pos[1]+540);
		// drawText(ctx_o, rgba_otext, "left", "[  c  ]", menu_q_pos[0]+201, menu_q_pos[1]+578);
	}



	for (var i = 0; i < m_objs.length; i++)
	{
		//drawText(ctx_o, "objAddr[" + mem_log[i][0] + "]", 30, 34+i*15); //, 
		if (i<=world_obj_count) {drawText(ctx_o, rgba_dtext, "left", "[" + i + "]", menu_obj_pos[0]+23, 34+i*15); drawText(ctx_o, rgba_dtext, "left", "[" + mem_log[i][2] + "]", menu_obj_pos[0]+79, 34+i*15);} 
		if (i>world_obj_count)  {drawText(ctx_o, rgba_otext, "left", "[" + i + "]", menu_obj_pos[0]+23, 34+i*15); drawText(ctx_o, rgba_otext, "left", "[" + mem_log[i][2] + "]", menu_obj_pos[0]+79, 34+i*15);} 
		if (i==obj_cyc) {drawText(ctx_o, rgba_otext, "left", "[", menu_obj_pos[0]+7, 34+i*15); drawText(ctx_o, rgba_otext, "left", "]", menu_obj_pos[0]+123, 34+i*15);} // drawText(ctx_o, rgba_otext, "left", "[B][C][V]", 124, 34+i*15);
	}

	//Wpn select text
	drawText(ctx_o, rgba_otext, "left", "[1]", menu_wpn_pos[0]+9, menu_wpn_pos[1]+21);
	drawText(ctx_o, rgba_otext, "left", "[2]", menu_wpn_pos[0]+76, menu_wpn_pos[1]+21);
	drawText(ctx_o, rgba_otext, "left", "[3]", menu_wpn_pos[0]+144, menu_wpn_pos[1]+21);
	drawText(ctx_o, rgba_otext, "left", "[4]", menu_wpn_pos[0]+212, menu_wpn_pos[1]+21);
	drawText(ctx_o, rgba_otext, "left", "GRID", menu_wpn_pos[0]+22, menu_wpn_pos[1]+45);
	drawText(ctx_o, rgba_otext, "left", "MOVE", menu_wpn_pos[0]+91, menu_wpn_pos[1]+45);
	drawText(ctx_o, rgba_otext, "left", "PAINT", menu_wpn_pos[0]+155, menu_wpn_pos[1]+45);
	drawText(ctx_o, rgba_otext, "left", "RAY", menu_wpn_pos[0]+230, menu_wpn_pos[1]+45);


}


/*
__/\\\\\\\\\\\\\\\__/\\\\\\\\\______/\\\\\\\\\\\__/\\\___________/\\\\\\\\\\\__/\\\\\_____/\\\__/\\\\\\\\\\\\\__/\\\\\\\\\\__________/\\\\\______/\\\\\\\\\\\\\\\_        
 _\///////\\\/////_/\\\///////\\\___\/////\\\///__\/\\\__________\/////\\\///__\/\\\\\\___\/\\\_\/\\\/////////__\/\\\//////\\\______/\\\///\\\___\///////\\\/////__       
  _______\/\\\_____\/\\\_____\/\\\_______\/\\\_____\/\\\______________\/\\\_____\/\\\/\\\__\/\\\_\/\\\___________\/\\\____\//\\\___/\\\/__\///\\\_______\/\\\_______      
   _______\/\\\_____\/\\\\\\\\\\\/________\/\\\_____\/\\\______________\/\\\_____\/\\\//\\\_\/\\\_\/\\\\\\\\\_____\/\\\_____\/\\\__/\\\______\//\\\______\/\\\_______     
    _______\/\\\_____\/\\\//////\\\________\/\\\_____\/\\\______________\/\\\_____\/\\\\//\\\\/\\\_\/\\\/////______\/\\\_____\/\\\_\/\\\_______\/\\\______\/\\\_______    
     _______\/\\\_____\/\\\____\//\\\_______\/\\\_____\/\\\______________\/\\\_____\/\\\_\//\\\/\\\_\/\\\___________\/\\\_____\/\\\_\//\\\______/\\\_______\/\\\_______   
      _______\/\\\_____\/\\\_____\//\\\______\/\\\_____\/\\\______________\/\\\_____\/\\\__\//\\\\\\_\/\\\___________\/\\\_____/\\\___\///\\\__/\\\_________\/\\\_______  
       _______\/\\\_____\/\\\______\//\\\__/\\\\\\\\\\\_\/\\\\\\\\\\\\__/\\\\\\\\\\\_\/\\\___\//\\\\\_\/\\\\\\\\\\\\\_\/\\\\\\\\\\/______\///\\\\\/__________\/\\\_______ 
        _______\///______\///________\///__\///////////__\////////////__\///////////__\///_____\/////__\/////////////__\//////////__________\/////____________\///________
*/ 
// #trilinedot

				// only draw when length > 2
				// every second point draws a tri from ith to previous and ahead
				// i is offset by len%2, so at 4th do -1. (len-1)%2
				// if obj is static pat could be pregen
				// after removing center (mem_log[i][2]-1)%2 => (mem_log[i][2]-2)%2 => mem_log[i][2]%2


				// Fix so loops are reversed

function drawIt()
{
	Compute(m1);
	ctx.clearRect(0, 0, in_win_w, in_win_h);


	// Draw packed verts
	for (var i=1; i<m_objs.length; i++) // i find object
	{
		if (stn_draw[1]) // Tris
		{
			if (i>world_obj_count-1)
			{	
				if (mem_log[i][2]>2)
				{
					for (var k=0; k<Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2; k++) //-(mem_log[i][2]-1)%2 // can make log of floored points
					{
						//if (m1.data[8*k+mem_log[i][0]+3]>0 && m1.data[8*k+mem_log[i][0]+7]>0 && m1.data[8*k+mem_log[i][0]+11]>0)
						if (m1.data[8*k+mem_log[i][0]+3] > 0)
						{
							if (m1.data[8*k+mem_log[i][0]+7] > 0)
							{
								if (m1.data[8*k+mem_log[i][0]+11] > 0)
								{
									if (m1.data[8*k+mem_log[i][0]] > -_epsilon)
									{
										if (m1.data[8*k+mem_log[i][0]] < in_win_clip)
										{
											drawTriangle(ctx,
												 m1.data[8*k+mem_log[i][0]],
												  m1.data[8*k+mem_log[i][0]+1],
												   m1.data[8*k+mem_log[i][0]+4],
												    m1.data[8*k+mem_log[i][0]+5],
												     m1.data[8*k+mem_log[i][0]+8],
												      m1.data[8*k+mem_log[i][0]+9],
												       rgbas_tri[k%3]);
										}
									}
								}
							}
						}
					}
				}
			}
		}

		for (var j=0; j<mem_log[i][2]-1; j++) // Draw Lines & Points
		{
			if (m1.data[4*j+mem_log[i][0]+3] > 0) // Line clipping
			// if (1) // Clipping off
			{	
				if (m1.data[4*(j+1)+mem_log[i][0]+3] > 0) // Line clipping second point
				{
					if (m1.data[4*j+mem_log[i][0]] > -_epsilon) // Left side plane clip
					{
						if (m1.data[4*j+mem_log[i][0]] < in_win_clip) // Right side plane clip. Add top and bottom later.
						{		
							if (stn_draw[0])
							{
								if (i>world_obj_count-1 && j != mem_log[i][2]-2)
								{
									if (i==obj_cyc || i==_all_lock_i) {
										drawLine(ctx, rgbas_link[_all_lock], 1.0,
										 m1.data[4*j+mem_log[i][0]],
										  m1.data[4*j+mem_log[i][0]+1],
										   m1.data[4*(j+1)+mem_log[i][0]],
										    m1.data[4*(j+1)+mem_log[i][0]+1]);
									} else {
										drawLine(ctx,rgba_w, 1,
										 m1.data[4*j+mem_log[i][0]],
										  m1.data[4*j+mem_log[i][0]+1],
										   m1.data[4*(j+1)+mem_log[i][0]],
										    m1.data[4*(j+1)+mem_log[i][0]+1]);
									}
								}
							}

							if (i >= 6)
							{
								if (i <= 8)
								{
									if (j == 0)
									{drawLine(ctx,rgbas[i-6], 0.5,
									 m1.data[4*j+mem_log[i][0]],
									  m1.data[4*j+mem_log[i][0]+1],
									   m1.data[4*(j+1)+mem_log[i][0]],
									    m1.data[4*(j+1)+mem_log[i][0]+1]);}
								}
							}

							if (i == 2)
							{
								if (j != mem_log[i][2]-2)
								{
									drawLine(ctx,rgba_w, 0.4,
									 m1.data[4*j+mem_log[i][0]],
									  m1.data[4*j+mem_log[i][0]+1],
									   m1.data[4*(j+1)+mem_log[i][0]],
									    m1.data[4*(j+1)+mem_log[i][0]+1]);
								}
							}

							if (i==1) {fillDot(ctx, rgba_w_flr,
							 m1.data[4*j+mem_log[i][0]],
							  m1.data[4*j+mem_log[i][0]+1],
							   m1.data[4*j+mem_log[i][0]+2]+0.5, 0.7)}; ///////////////////////////  Math.pow((m1.data[4*j+mem_log[i][0]+3]*(0.03)).toFixed(3) => 1/Math.pow((w*(0.03)).toFixed(3)

							// Center point

							if (key_map.tab || wpn_select==1)
							{
								if (i>world_obj_count)
								{
									if (j == mem_log[i][2]-2)
									{
										if (i==obj_cyc)
										{drawCircle(ctx, rgba_cindig, 1.5,
										 m1.data[4*j+mem_log[i][0]+4],
										  m1.data[4*j+mem_log[i][0]+5],
										   8*m1.data[4*j+mem_log[i][0]+2]);}
										if (i!=obj_cyc)
										{drawCircle(ctx, rgba_cindi, 1.5,
										 m1.data[4*j+mem_log[i][0]+4],
										  m1.data[4*j+mem_log[i][0]+5],
										   8*m1.data[4*j+mem_log[i][0]+2]);}
									}
								}
							}
							if (i>2)
							{
								if (i<6)
								{
									if (m1.data[mem_log[i][0]+4*j+3] > 0)
									{
										drawDot(ctx, rgbas[pln_cyc], 1,
										 m1.data[4*j+mem_log[i][0]],
										  m1.data[4*j+mem_log[i][0]+1],
										   m1.data[4*j+mem_log[i][0]+2]+1); ///////////////////// Dot planes rgba(102, 79, 185, 0.8)
									}
								}
							}
						} // End of all clipping
					}
				}	
			}
		} // End of Lines & Points
	} // End of m_objs


	// Draw unpacked verts
	for (var i=0; i<m_t_objs.length; i++)
	{
		if (m1.data[mem_t_log[i][0]+3+mem_sum] > 0 && m1.data[4+mem_t_log[i][0]+3+mem_sum] > 0) // Clipping, can even be optimized? js has no clue?
		// if (1) // Clipping off
		{
			drawDot(ctx, rgba_w, 0, m1.data[mem_t_log[i][0]+mem_sum], m1.data[mem_t_log[i][0]+1+mem_sum], 3*m1.data[mem_t_log[i][0]+2+mem_sum]); // Is this doing anything????
			if (i == m_t_objs.length-1)
			{
				drawText(ctx, rgba_otext, "left", "END " + i, m1.data[mem_t_log[i][0]+mem_sum]-17, m1.data[mem_t_log[i][0]+1+mem_sum]-18);
				} else {
				drawLine(ctx, rgba_b, 1.3, m1.data[mem_t_log[i][0]+mem_sum], m1.data[mem_t_log[i][0]+1+mem_sum], m1.data[4+mem_t_log[i][0]+mem_sum], m1.data[4+mem_t_log[i][0]+1+mem_sum]);
				if (key_map.mmb) {drawText(ctx, rgba_otext, "left", i, m1.data[mem_t_log[i][0]+mem_sum]-3, m1.data[mem_t_log[i][0]+1+mem_sum]-18-13*i);}
			}
		}
	}

	// Indicators

	// Last point of m_t_objs
	if (m_t_objs.length>0)
	{
		if (m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+3] > 0)
			{drawDot(ctx, rgba_lp, 1.3, m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]], m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+1], 15);}
	}

	if (m1.data[mem_log[9][0]+3] > 0) {drawDot(ctx, rgbas_trans[trns_lock], 1.0, m1.data[mem_log[9][0]], m1.data[mem_log[9][0]+1], 8);}

	if (trns_lock)
	{
		if (m1.data[mem_log[10][0]+3] > 0)
			{drawDot(ctx, rgbas_trans[1], 1.0, m1.data[mem_log[10][0]], m1.data[mem_log[10][0]+1], 15);}
	}


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
// #HELL2



function Compute(init_dat)
{
	// #COMPUTE

	// merging center data is insane holy shit



	// save before I do a diff usage. world anim here
	// if (m_objs.length > tse)
	// {

	// 		_c = [m_objs[tse][mem_log[tse][1]-4],
	// 			 m_objs[tse][mem_log[tse][1]-3],
	// 			 m_objs[tse][mem_log[tse][1]-2]];

	// 		//console.log(_c);

	// 	for (var i=0; i<mem_log[tse][2]-1; i++)
	// 	{
	// 		_gp = [m_objs_ghost[tse][i*4],
	// 			  m_objs_ghost[tse][i*4+1],
	// 			  m_objs_ghost[tse][i*4+2]
	// 			];

	// 		//console.log(_gp);



	// 		_nps = add3(_c,rot_aa(sub(_gp, _c), norm([0.001,1,0.001]), player_look_dir[0])); // lmao crack norm([0.001,1,0.001])

	// 		//console.log(_nps);

	// 		m_objs[tse][i*4] = _nps[0];
	// 		m_objs[tse][i*4+1] = _nps[1];
	// 		m_objs[tse][i*4+2] = _nps[2];
	// 	}
	// }



	if (key_map.shift && key_map.r && mouseLock && obj_cyc>world_obj_count && runEvery(150)) // Move to fn later
	{
		var _to = splitObjS(m_objs[obj_cyc]);
		var _c = getctr_obj(obj_cyc);
		for (var i=0; i<_to.length; i++)
		{
			switch(pln_cyc)
			{
				case 0:
					switch(wpn_select)
					{
					case 0:
						_to[i] = add3(_inter_rnd, rot_x_pln(sub(_to[i], _inter_rnd), pi/4));
						break;
					case 1:
						_to[i] = add3(_c, rot_x_pln(sub(_to[i], _c), pi/4));
						break;
					}
					break;
				case 1:
					switch(wpn_select)
					{
					case 0:
						_to[i] = add3(_inter_rnd, rot_y_pln(sub(_to[i], _inter_rnd), pi/4));
						break;
					case 1:
						_to[i] = add3(_c, rot_y_pln(sub(_to[i], _c), pi/4));
						break;
					}
					break;
				case 2:
					switch(wpn_select)
					{
					case 0:
						_to[i] = add3(_inter_rnd, rot_z_pln(sub(_to[i], _inter_rnd), pi/4));
						break;
					case 1:
						_to[i] = add3(_c, rot_z_pln(sub(_to[i], _c), pi/4));
						break;
					}
					break;
			}
			if (i==_to.length-1)
			{
				for (var j=0; j<mem_log[obj_cyc][2]; j++)
				{
					m_objs[obj_cyc][j*4+0] = _to[j][0];
					m_objs[obj_cyc][j*4+1] = _to[j][1];
					m_objs[obj_cyc][j*4+2] = _to[j][2];

				}
			}
		}
	}


	if (key_map["5"] && mouseLock && obj_cyc>world_obj_count && runEvery(150)) // Move to fn later
	{
		var _to = splitObjS(m_objs[obj_cyc]);
		var _c = getctr_obj(obj_cyc);
		for (var i=0; i<_to.length; i++)
		{
			switch(wpn_select)
			{
			case 0:
				_to[i] = add3(_inter_rnd, mir_w_pln(sub(_to[i], _inter_rnd), pln_cyc));
				break;
			case 1:
				_to[i] = add3(_c, mir_w_pln(sub(_to[i], _c), pln_cyc));
				break;
			}

			if (i==_to.length-1)
			{
				for (var j=0; j<mem_log[obj_cyc][2]; j++)
				{
					m_objs[obj_cyc][j*4+0] = _to[j][0];
					m_objs[obj_cyc][j*4+1] = _to[j][1];
					m_objs[obj_cyc][j*4+2] = _to[j][2];

				}
			}
		}
	}


	if (key_map["6"] && runEvery(300)) {expand_obj(obj_cyc);}

	if (key_map.l && runEvery(300)) {link_obj(obj_cyc, stn_link_tool);}

	if ((key_map.q || key_map.enter) && runEvery(320)) {pointerLockSwap();}


	if (mouseLock && key_map["7"] && runEvery(300))
	{

		if (!isNaN(stn_cir_tool[0]) && !isNaN(stn_cir_tool[1]) && !isNaN(stn_cir_tool[2])) {make_cir_obj(Math.floor(stn_cir_tool[0]), stn_cir_tool[1], stn_cir_tool[2], pln_cyc);}
	}

	// This needs a system wtf
	if (trns_lock)
	{
		if (!isNaN(mem_log[trns_obj_i][1]))
		{
			var _fd = sub(_lp_world, trans_f);
			for (var i=0; i<mem_log[trns_obj_i][1]/4; i++)
			{
				if (!stn_trns[0]) {m_obj_offs[trns_obj_i][0] = _fd[0];}
				if (!stn_trns[1]) {m_obj_offs[trns_obj_i][1] = _fd[1];}
				if (!stn_trns[2]) {m_obj_offs[trns_obj_i][2] =	_fd[2];}
			}
		}
	}
	
	if (key_map.rmb && runEvery(100))
	{
		var _f; var _n_sku = 0; var _t1; var _d = 0;
		_f = Math.pow(Math.pow(init_dat.data[mem_log[obj_cyc][0]]-in_win_wc, 2) + Math.pow(init_dat.data[mem_log[obj_cyc][0]+1]-in_win_hc, 2), 0.5);
		for (let k = 0; k<mem_log[obj_cyc][1]/4; k++)
		{
			_t1 = Math.pow(Math.pow(init_dat.data[4*k+mem_log[obj_cyc][0]]-in_win_wc, 2) + Math.pow(init_dat.data[4*k+mem_log[obj_cyc][0]+1]-in_win_hc, 2), 0.5);
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
				_t1 = Math.pow(Math.pow(init_dat.data[4*j+mem_t_log[i][0]+mem_sum]-in_win_wc, 2) + Math.pow(init_dat.data[4*j+mem_t_log[i][0]+mem_sum+1]-in_win_hc, 2), 0.5);
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
				_lp[0] = _lp_world[0] = _inter_rnd[0] = m_objs[obj_cyc][4*_n_sku];
				_lp[1] = _lp_world[1] = _inter_rnd[1] = m_objs[obj_cyc][4*_n_sku+1];
				_lp[2] = _lp_world[2] = _inter_rnd[2] = m_objs[obj_cyc][4*_n_sku+2];
				break;
			case 1:
				_lp[0] = _lp_world[0] = _inter_rnd[0] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-4)];
				_lp[1] = _lp_world[1] = _inter_rnd[1] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-3)];
				_lp[2] = _lp_world[2] = _inter_rnd[2] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-2)];
				break;
		}
	}


	if (key_map.h && runEvery(200))
	{
		var _t = meanctr_obj(m_objs[obj_cyc]);
		if (!stn_trns[0]) {_lp[0] = _t[0];}
		if (!stn_trns[1]) {_lp[1] = _t[1];}
		if (!stn_trns[2]) {_lp[2] = _t[2];}
		if (!stn_trns[0]) {_lp_world[0] = _t[0];}
		if (!stn_trns[1]) {_lp_world[1] = _t[1];}
		if (!stn_trns[2]) {_lp_world[2] = _t[2];}
	}

	// Delete obj by obj cycle & fix memory
	if (!trns_lock)
	{
		if (key_map.shift) //320
		{if (key_map.x && runEvery(320)) {del_obj(obj_cyc);}
		} else if (key_map.x && !del_obj_lock)
		{del_obj(obj_cyc); del_obj_lock = 1;}

		if (key_map.c && runEvery(300)) {m_obj_explode(obj_cyc);}
	}

	if (key_map.x == false) {del_obj_lock = 0;}


	//if (key_map.m && runEvery(300)) {menu_tog_controls();}


	if (key_map.arrowdown && runEvery(200)) {if (obj_cyc==m_objs.length-1) {obj_cyc=0} else {obj_cyc++;}}
	if (key_map.arrowup && runEvery(200)) {if (obj_cyc==0) {obj_cyc=m_objs.length-1} else {obj_cyc-=1;}}

	if (key_map.e && runEvery(120)) {mem_t_mov(); key_map.e = false;} // m_t_objs.length = 0; mem_t_log.length = 0; obj_cyc = mem_log.length-1;
	
	if (key_map.p && runEvery(350)) {if (mouseLock) {pointerLockSwap();} downloadSaveFile();}

	if (key_map.n && runEvery(500)) {lock_vert_mov = !lock_vert_mov; hover_h = -player_pos[1];}
	if (lock_vert_mov) {player_pos[1] = -hover_h;}

	if (key_map.r && !key_map.shift && runEvery(150)) {if (pln_cyc==2) {pln_cyc=0;} else {pln_cyc++;}}



	if (key_map.i && runEvery(350)) {bond_obj(obj_cyc);}


	keyVec = [key_map.d-key_map.a, key_map.w-key_map.s];
	if (keyVec[1] != 0)
	{
		player_pos[0] += Math.sin(-player_look_dir[0])*keyVec[1]*player_speed * -1*(1+key_map.shift*player_speed_mult); // -1 temp ig
		player_pos[2] += Math.cos(-player_look_dir[0])*keyVec[1]*player_speed * -1*(1+key_map.shift*player_speed_mult);
		if (!lock_vert_mov) {player_pos[1] -= Math.sin(player_look_dir[1])*keyVec[1]*player_speed * (1+key_map.shift*player_speed_mult);} // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir
	}

	if (keyVec[0] != 0)
	{
		player_pos[0] += Math.cos(player_look_dir[0])*keyVec[0]*player_speed * (1+key_map.shift*player_speed_mult);
		player_pos[2] += Math.sin(player_look_dir[0])*keyVec[0]*player_speed * (1+key_map.shift*player_speed_mult);
	}

	if (key_map[" "]) {player_pos[1] -= player_speed_vert * (1+key_map.shift*player_speed_mult);}  // r u 4? srs mane key_map[" "]
	if (key_map.b) {player_pos[1] += player_speed_vert * (1+key_map.shift*player_speed_mult);}
	


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

	// Will need replace
	if (key_map.z && runEvery(140-key_map.shift*100) && m_t_objs.length!=0) {m_t_objs.splice(-1); mem_t_sum -= mem_t_log[mem_t_log.length-1][1]; mem_t_log.splice(-1); paint_n--;}



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
	// #FUNPART
	// Use gpu here w/ the right size array32. Or can I even?


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

	Another perspective : Rays?

	Given a poly w/ 3 points. Cross to find n. Say any point on poly is Q. Direction of ray r. Ray origin P.
	If you set a distance from a plane equal to zero when using the dot product WITH the setup using a point from poly the equation can be equated to zero.
	(P+tr) = Q the point on the poly is equal to an offset from P in the direction of r of distance t.
	(P+tr).n = Q.n
	(P+tr).n - Q.n = 0
	

	*/

	if (key_map.lmb || key_map.f || key_map.y) // Remove one_time_fix by setting vars to [0,0,0,0]
	{
		updateLook();
		_oh = dot(player_pos,[0,1,0,1]);
		f_dist = -_oh/dot([0,1,0],norm(f_look));
		_nplns = [[1,0,0],[0,1,0],[0,0,1]][pln_cyc]; // use pln_cyc to select norm vec from array of norm vecs
		_plr_dtp = [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]]; // player pos + look dir * 
		_inter = lpi(_plr_dtp, player_pos, _pp, _nplns);
		one_time_fix = 0;
	}

	// if (m_objs.length > tse && tse!=0)
	// {
		if (wpn_select==3)
		{
			_c = [m_objs_ghost[tse][mem_log[tse][1]-4],
				 m_objs_ghost[tse][mem_log[tse][1]-3],
				 m_objs_ghost[tse][mem_log[tse][1]-2]];

			for (var i=0; i<mem_log[tse][2]-1; i++)
			{
				_gp = [m_objs_ghost[tse][i*4]+20+Date.now()%3/5*key_map.lmb-key_map.rmb*20,
					  m_objs_ghost[tse][i*4+1]+30-key_map.rmb*20,
					  m_objs_ghost[tse][i*4+2]+32+Date.now()%3*key_map.lmb+key_map.rmb*30
					];

				// New attempt w/ quaternions

				_nps = add3(_c,quatRot( sub(_gp, _c), _viewq )); // lmao crack norm([0.001,1,0.001])

				m_objs[tse][i*4] = _nps[0];
				m_objs[tse][i*4+1] = _nps[1];
				m_objs[tse][i*4+2] = _nps[2];

				updateLook();

				m_obj_offs[tse] = [player_pos[0]-f_look[0]*3, player_pos[1]-f_look[1]*3, player_pos[2]-f_look[2]*3, 1/(4*7)];
			}

		//}
		/*
		 else {
			m_obj_offs[tse] = [0, 0, 0, 1];
			for (var i=0; i<mem_log[tse][2]-1; i++)
			{
				m_objs[tse][i*4] = m_objs_ghost[tse][i*4],
				m_objs[tse][i*4+1] = m_objs_ghost[tse][i*4+1],
				m_objs[tse][i*4+2] = m_objs_ghost[tse][i*4+2]
				// and ctr?
			}
		}
		*/
	}

	/*
			- get plane to use, for now grid planes, pln, and free _inter
			- get dist to plane w/ (_inter - player_pos) . pln = d
			- move point to plane, point_on_pln = player_pos - d * pln (here's the returner 2 * d * pln) 
			- move point to origin, get delta first, delta = point_at_o = point_on_pln - _inter
			- make negative (double 180) point_opp_o = -1 * point_at_o
			- reflected point is found moving back toward plane, and again in the same direction...

		or go twice distance to _inter and return to plane instead? way easier. review all the linear algebra again.
		There's probably a way to just do this with matrices and it'll be magic.
	*/


		//g_dtp = dot(sub(_inter, player_pos), _nplns); // Might have to swap sign?
		//g_pop = add3(player_pos, scale(_nplns, -g_dtp));
		//g_pao = scale(sub(g_pop, _inter), -1); // skipping step applying scale -1 here 
		//g_rp = add3(g_pao, scale(_nplns,2*g_dtp));
		// console.log(g_fp);

		//if (key_map.h && runEvery(300))
		//{

			//g_dtp = dot(sub(_inter, player_pos), _nplns); // Might have to swap sign?
			//g_fp = add3(scale(sub(_inter, player_pos) ,2), scale(_nplns,-2*g_dtp));
			// 	console.log(g_fp);
			//player_pos[0] = g_fp[0];
			//player_pos[1] = g_fp[1];
			//player_pos[2] = g_fp[2];
		//}


	if (isNaN(m_objs[0][0])) {m_objs[0][0] = 0.0; m_objs[0][1] = 0.0; m_objs[0][2] = 0.0; m_objs[0][3] = 1.0;}

	if (mouseLock) // Menu can input numbers freely
	{
		if (key_map["1"] && runEvery(100)) {wpn_select = 0;}
		if (key_map["2"] && runEvery(100)) {wpn_select = 1;}
		if (key_map["3"] && runEvery(100)) {wpn_select = 2;}
		if (key_map["4"] && runEvery(100)) {wpn_select = 3;}
	}


	switch(pln_cyc) // can't return w/ rmb. only in vertical??
	{
		case 0:
			grid_scale_ar[1] = grid_scale_f;
			grid_scale_ar[2] = grid_scale_f;
			break
		case 1:
			grid_scale_ar[0] = grid_scale_f;
			grid_scale_ar[2] = grid_scale_f;
			break
		case 2:
			grid_scale_ar[0] = grid_scale_f;
			grid_scale_ar[1] = grid_scale_f;
			break
	}


 	// check nan other place? like lpi?
	if (!isNaN( _inter[0])) {_inter_rnd = [roundTo(_lp[0], grid_scale_ar[0]), roundTo(_lp[1], grid_scale_ar[1]), roundTo(_lp[2], grid_scale_ar[2])];}

	switch(wpn_select) //#WEAPONSCRIPT
	{
		case 0:

			if (key_map.tab && runEvery(75))
			{
				obj_cyc = findbyctr_obj();
			}

			if (key_map.lmb && mouseLock)
			{	
				_lp[0] = _inter[0];
				_lp[1] = _inter[1];
				_lp[2] = _inter[2];
				_lp_world[0] = _inter_rnd[0];
				_lp_world[1] = _inter_rnd[1];
				_lp_world[2] = _inter_rnd[2];
			}

			if (key_map.v && runEvery(150)) {trans_obj(obj_cyc);}

			if (key_map.t && obj_cyc>world_obj_count && runEvery(350)) // Fix this area needs to check obj_cyc or in fn
			{
				if (key_map.shift)
				{
					switch(trns_lock)
					{
						case 0:
							m_objs_loadPoints(cloneObj(m_objs[obj_cyc]));
							obj_cyc = m_objs.length-1;
							trans_obj(m_objs.length-1);
							break;
						case 1:
							trans_obj(m_objs.length-1); // Finish needn't require index pls fix
							m_objs_loadPoints(cloneObj(m_objs[obj_cyc]));
							obj_cyc = m_objs.length-1;
							trans_obj(m_objs.length-1);
					}

				}
				if (!key_map.shift && !trns_lock)
				{
					m_objs_loadPoints(cloneObj(m_objs[obj_cyc]));
					obj_cyc = m_objs.length-1;
				}
			}
			break;

		case 1:
			if (trns_lock) {trans_obj(trns_obj_i);}
			if (obj_cyc>world_obj_count)
			{
				

				if (key_map.lmb && mouseLock && !wpn_1)
				{
					wpn_1_mc = getctr_obj(obj_cyc);
					wpn_1_d = len3(sub(wpn_1_mc, player_pos));
					wpn_1 = 1;
				}

				if (wpn_1) {m_obj_offs[obj_cyc] = roundPTo(sub(sub(player_pos, scale(f_look, wpn_1_d)), wpn_1_mc), grid_scale_f);}

				if (key_map.lmb == false && wpn_1)
				{
					wpn_1 = 0;
					finishTrnsAnim(obj_cyc);
					m_obj_offs[obj_cyc] = [0,0,0,1];
				}

				if (key_map.t && key_map.lmb == false && obj_cyc>world_obj_count && runEvery(350)) // Make fn handle move & dupe? Make dupes pace where holding hologram
				{
					m_objs_loadPoints(cloneObj(m_objs[obj_cyc]));
					obj_cyc = m_objs.length-1;
				}
			}
			break;

		case 2:
			if (key_map.lmb)
			{
				switch(stn_paint_inf)
				{
					case false:
						if (paint_n < stn_paint_line_l)
						{
							paint_d = len3(sub(_inter, _paint_track));
							if (paint_d > stn_paint_l)
							{
								m_t_objs_loadPoint(new Float32Array([_inter[0], _inter[1], _inter[2], 1.0]));
								_paint_track[0] = _inter[0];
								_paint_track[1] = _inter[1];
								_paint_track[2] = _inter[2];
								paint_n++;
							}
						} else {mem_t_mov();}
						break;
					case true:
						paint_d = len3(sub(_inter, _paint_track));
						if (paint_d > stn_paint_l)
						{
							m_t_objs_loadPoint(new Float32Array([_inter[0], _inter[1], _inter[2], 1.0]));
							_paint_track[0] = _inter[0];
							_paint_track[1] = _inter[1];
							_paint_track[2] = _inter[2];
						}
						break;
				}
			}
			if (stn_paint_inf && key_map.lmb == false) {mem_t_mov();} // Finish draw !
			break;
		case 3:
			if (key_map.lmb && mouseLock && runEvery(10))
			{
				updateRayInters();
				m_t_objs_loadPoints(rayInterMap);
			}
			break;


	} // END OF wpn_select switch


	// Place point
	if (key_map.f && runEvery(150)) {m_t_objs_loadPoint(new Float32Array([_lp_world[0], _lp_world[1], _lp_world[2], 1.0]));}

	// Return to ground
	if (key_map.g && runEvery(200))
	{
		_lp[1] = 0; _lp_world[1] = 0;
		pln_cyc=1;
	}

	// Teleport
	if (key_map.y && runEvery(350)) {teleport_plr();}

	// Send array as easy to copy for float32array
	if (key_map["/"] && runEvery(150))
	{
		var _d = m_objs[obj_cyc]; // String
		var _f = "[";
		for (var i=0; i<_d.length; i++)
		{
			_f = _f+_d[i].toFixed(4)+",";
			if (i==_d.length-1) {_f = _f+"]";}
		}
		console.log(_f);
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

/*
	// float a = PI/6.;
	float a = PI/24.;
	float n = 0.015;
	float f = 500.01;

	commit(vec4(
		(read().x/tan(a/2.)),
		(read().y/tan(a/2.)),
		(read().z*((f+n)/(f-n))+(2.*n*f)/(2.-n)),
		(-read().z)

		#define _S1 1.0689655172413792
		#define _S2 750.
		#define d 0.06554346281523822 

		((f+n)/(f-n))
		1.006789411194167
		(2.*n*f)/(2.-n)
		618.2947208121826 
*/


turbojs.run(init_dat, `void main(void) {

    float _yaw = float(${player_look_dir[0]});
    float _pit = float(${player_look_dir[1]});
    float _wc = float(${in_win_wc});
    float _hc = float(${in_win_hc});
    float _fov = float(${s_fov});

	#define _S1 1.0000600006
	#define _S2 7.55682619647
	#define d 0.112672939

	vec4 after_tran = vec4(
		read().x-float(${player_pos[0]}), 
		read().y-float(${player_pos[1]}),
		read().z-float(${player_pos[2]}),
		read().w
	);

    // Rotate around y-axis (yaw)
    vec4 after_yaw = vec4(
        cos(_yaw) * after_tran.x + sin(_yaw) * after_tran.z ,
        after_tran.y,
        cos(_yaw) * after_tran.z - sin(_yaw) * after_tran.x,
        after_tran.w
    );

    // Rotate around x-axis (pitch)
    vec4 after_pit = vec4(
        after_yaw.x,
        cos(_pit) * after_yaw.y - sin(_pit) * after_yaw.z,
        sin(_pit) * after_yaw.y + cos(_pit) * after_yaw.z,
        after_yaw.w
    );

    // Perspective
	vec4 after_per = vec4(
		after_pit.x/d,
		after_pit.y/d,
		after_pit.z * _S1+_S2,
		-after_pit.z
	);

	// Divide by w
	if (after_per.w != 0.)
	{
		commit(vec4(
			after_per.x/after_per.w*_fov+_wc,
			after_per.y/after_per.w*_fov+_hc,
			1.0 / pow(after_per.w*0.03, 0.7),
			after_per.w
			));
		} else {
		commit(vec4(
			0,
			0,
			0,
			0
			));
	}

    // commit(final_result);
}`);


} // End of Compute()

// 1/Math.pow((w*(0.03))

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

	updateMenuPos();
	obj_updateNormalMaps();

	Compute(m1);

	m_obj_offs[tse] = [0,-500,0,1];
	drawIt();

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