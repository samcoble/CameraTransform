
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


/*
	New priorities after menu.js

	@?@?@
	@?@?@
	@?@?@
			-- try webgl box and load stuff into it

			-- rewrite the select2dpoint function

			-- try scale down and change perspective 

			-- if encoded center is within plane of poly's captures some overlap
	
				- function( ? )

				- ez2use for working with hologram objects
					- preview and holograms need to be separated.

				- make a sort function returning 
					???, i, dist to i.

			-- engine space

			-- manual method for scroll boxes

			-- add file name setting & input trickery?

			-- translate ghost lol

			-- must revert code to prefer visual fidelity

			-- time to start porting to glsl shaders

			-- generate dir vec curves

			-- js typeof implies overloaded fn w/ type

			-- nested point sequences at overlap point should be fairly easy. take note of logic
				- think i got it here

					- placing loop at a point implies to keep sequence continuity one additional point must be placed after loop insertion
					- len of loop does determine the need for the additional. I assume none or 1. may be 1 or 2.
					- logic diagram could provide more direct code struct


			-- back to the real world ig

				- i will have to encode typically such that first struct explains sizes of following structs (type may be implicit as defined in reader)
				- first number is number of chunks
					- chunks are sizes (unique data structs) (2 for now)

					[ n=2 ] [c1 size] [c2 size] [group tree dat] [ x y z x y z x y z ...]

					so [group tree dat] looks like [ n=groups ] [ n1 size ] [nn size ] [ dat ]

					so [ dat ] = size implies amount of indices per group and provides offset to find subsequent groups

					m_objs is kept the same but an overseeing manager populates a new html structure for navigation.

					i don't feel like going the xtra mile to convert text into blocks and giving them size lmao.

			-- finish mem log rebuild to add bounding box ? system ? what am i doing


			-- unique ids for objs will help w/ identical objs in future?

			-- lock point offsets grid? could fix a lot of things w/ rmb select
			-- lmb in free mode is setting plane to inter_rnd for some reason..
				- when point locked the lpi is not being calculated with the arbitrary offset essentially

			-- ? intersection reveal
				- doesn't have to be run all the time if the purpose is to model
				- line's checked for intersection within some range of it's len.

			-- ray trace teleport
				- fix teleport flip to use quaternions

			-- wrap data
			-- multi select

			-- just noticed save data corrupted by single point data
				- fuqk

			-- string dat find sys or mem addr sys?

			-- all my functions relative to the plane can be replaced with a general obj orient fn.

			-- Overlapping point issues BREOKEKN
				- fuqk
					take circle size and make size a fn
						fn sets rel to z AND index
						goal here is to have circle size data that maps to the screen
							use data to reveal bounding areas to hover over to select overlapping selection of objs
								don't i already have a good z buffer.. wait

			-- make #incheck a function

			-- mouse to world ray trace from eye...
				- point on near plane

			-- unit vector line conversion method for arc len

			-- distribute heights using 20% remainder to make hover to settings

			-- convert lines into one long line as draw functions are structured.

			-- add functions
				- edit obj
					: done but needs full mode

			--	menu scrollbar hide ???

			-- THE MENU SCRIPT IS BAD

			-- Correctly log changed information that can be applied to reverse.

	@?@?@
	@?@?@
	@?@?@

	LONG TASK

	Random idea ::
		if I can clip a region of polygon's in 2d space creating two sets
			-> i could then display them at two different fov's creating a zoomed region for scopes/sights

	So I guess I need to learn geometric algebra now. Linear algebra isn't enough. Quaternions are not even meta anymore.
	W/ new menu script I can provide a better sense of what tools are.

	Maybe web workers will make a lot more possible.
		can pass things like updateNormalMaps, updateRayInters maybe too.
		there must be a way to do the damn poly clip this way.
		some super fast painter's algorithm + spotting manual clip locations
		could do the mild shadow map eventually
		will determine if I can make this useable


	Wrap data increase to hold more layers
		r g b a comes first
		move groups after

	Push to top of stack function

	Try making a list in real time of anything entirely behind another obj's triangles?
		try in 2d w/ triangle intersector later
	Obj cut hole { i could try using the link script on to the hole... }
		i keep reusing my linear link. need to learn poly fill alg
		i need to implement geometric obj creation.
			with more layers of encoded data i can keep logs of what obj's are fundamentally


	Mover should show bounding box w/ corners to drag size
	All middle points of lines are free as I have encoded centers. Highlight center point on any obj w/ 2, 3 pts.
	Skeletal animation -> point interpolation. Long way to go I don't have interp maps yet. Do I really need to interp packed data??

	fill array with indice map pointing to an even 1/n stack
	pickUp array basically takes the remaining fraction and draws it.
		example: n=5 -> use 4 even stacks to compute 4 renders at once
				 remainder here is 1 so I go through at original per second point sequence to finish w/ modulo even/odd offset


I can make real physgun by compounding quaternions and ray trace AYYYYYYYYYYYYYYYYYYYYYYY
Make the planetary ico 
Assault cube old code
*/

/*
.reduce is a method that accumulates the values of an array into a single value (in this case, the sum of the squared components).
 Use this to push to top stack? ar_f.set(ar); ar_f.set(meanctr_obj(ar), ar.length);
*/

//  @?@?@?@?@ If rotations use dir vec I can plug in my normal map to reorient the grid to surface.
//				this raises the question: how do you make a grid ON a plane (my grid only reveals what rounding looks like)
//					maybe try reversing the process.
//					if I have a grid of rounded points and I rotate the grid to a new plane: rot(round(point))
//					if poly plane is assumed a normal coordinate system moving to a new plane: rot(round(point))
//					the procedure of rotation around an arbitrary axis applies to many things,
//						conclusion: point on a plane -> rotate to original world plane at O -> round(point) -> apply inverse rotation


//  @?@?@?@?@ Instead of clipping for side planes I could draw lines in two directions determined if x1>x2.... lol NO CLIPPING NEEDED
//		for a lil extra travel just offset

/* modulo distributes with switch with for loop ez wow for ex:

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
             /|\         n from dataset: obj_normalMaps
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
	if     sign(a) == sign(b) || sign(b) == sign(c)   =>   push point to rayInterMap[] && rayIMap[]. wat

*/
/*
- DO NOW

	= Return nearest & in front of 
		First dot(sub(p, player_pos),f_look)
		getNearest(array of float32array(4), point testing from) -> nearest point
			or combine point to test from w/ a tiny offset to give it direction so first dot points w/ that plane

	= Make ray trace fn use inputs so I can call it to get data anywhere.

	= Strange some polys not detected by rays..?? may come from zigzag gen? should be considering it's visually parallel w/ data
		- probably caused by ghost obj

	?@?@?@?@ mouse slow down for draw !!!!
	?@?@?@?@ END # is broken

	= Cut obj in half by plane!
		intersect/ray trace w/ plane between pairs. Just remove any other points and keep the intersections. Not sure if I can do this so easily w/ point order being critical

	= Bezier tool!!!!!!!!!!!!!!!!!!! ASAP.

	= interpolation framework for anim -> prerender

	= For linking lines a tool to collapse a line into one axis would be fantastic. For a dynamic tool: use start & end to define the line and move points to that line.
	= Spiral tool OR line gen tool w/ inputs => same as spiral w/ the right settings

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

- Make obj spawn list !!!!
- Need two tabs
- Need square tool
- Need rect cube tool
- Circle tool also needs to have options for half or n parts

- Grid upgrade: rotation of grid aligns with the slope of the diagonal/half way points between rounded grid points. This way everything stays in alignment.

- I realize now I actually need two patterns. And patterns of offsets can actually be very fast as they're not computed when running.
- premake a list w/ the right number pattern to use as index offset

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
*/

/*
	I'm using javascript to do glsl things totally wrong. Some of this was for fun. I have to rewrite the entire thing with proper glsl from the start.
	With proper glsl I will be able to use an octree to efficiently link screen coordinates with image space.

	Pretty bad using setInterval (only for druggies). or worse javascript eval(); you can go to jail for this.
	Badly need to give lpi and other obj algs a go in glsl. Even worth doing until I redo api????

	Octree is a mem struct !? rewrite data or use new file type ig


	// [[ PROBABLY GOING TO DO SOON ]]:

	-	Obj explode needs update.
			explode with c is done.
			if an obj has been exploded or one is drawn (m_t_objs.length > 0) then c now gets sku from point finder and allows (split obj, delete point, add point in sequence)

	-	Sphere generation
	-	Surface generation
	-	Shift + Tab for multi selection. Also make mouse selector

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
var date_now_after = 0;

// Maybe move this into DOM LOAD event instead and keep var init.
var in_win_w = document.getElementsByTagName("html")[0].clientWidth; var in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
var in_win_h = document.getElementsByTagName("html")[0].clientHeight; var in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;
const fileInput = document.getElementById('fileInput');

var screen_width, screen_height;
var fileName = "";

var pi = 3.1415926538; // High definition PI makes a visible difference
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

var fov_slide = 1.1;
var s_fov = fov_slide*fov_slide*fov_slide/20;

var crosshair_l = 5;
var crosshair_w = 0.4;

var cursor_helper = 0;

var player_pos = [0.0,-14.0,0];
var _inter_rnd = [0.0, 0.0, 0.0];
var _paint_track = [0.0, 0.0, 0.0];


var wpn_select = 0; 
var wpn_1, wpn_1_d;
var wpn_1_mc = [];

var hover_h = 11.5;
var lock_vert_mov = false;
var pln_cyc = 1;
var obj_cyc = 0; // Selector
var obj_cyc_i = 0;

// So bad fix jesus
var grid_scale = 3; var grid_scale_f = 8; var grid_scale_ar = [8, 8, 8];
var grid_ =
{
	scale:3,
	scale_f:8,
	scale_ar:[8,8,8]
};

var del_obj_lock = 0;

var stn_trns = [false, false, false];
var trns_lock = 0; var trns_obj_i = 0; // replace w/ all lock
var world_obj_count = 0;

var _all_lock = 0; // Pass through color
var _all_lock_i = 0;

var stn_draw = [true, true, false];


//var stn_cir_tool = [8, 24, 0];
//var stn_cir
var stn_link_tool = 1; // Default link pat :: set by menu.js

// var stn_paint_l = 1;
// var stn_paint_line_l = 8;
// var stn_paint_inf = false;

var stn_paint =
[
	1, // length per node
	8, // nodes per line
	true // infinite nodes
];

var stn_cir_tool = 
{
	scale: 8,
	divider: 24,
	off: 0
};

var stn_rotation = [45];

var paint_d = 0; var paint_n = 0;

var _epsilon = 300;
var in_win_clip;
var one_time_fix = 1;


var menu_q_size = [610, 730];
var menu_q_pos = [30, 240];
var menu_obj_pos = [0, 0]; // fix me entire system wacked
var menu_objpreview_pos = [0, 0]; // fix me
var menu_keys_pos = [155, 10];
var menu_wpn_pos = [155, 10];

var menu_tab = 0;

// New type of js entirely for this.
// Sorting algorithm provided by js. 
// Mapping indicies in a table is a useful concept
var indices = [];
var distances = [];
var indexMapping = [];
var originalIndices = [];
var newIndex = {};
var modIndex = [];
var d_i = 0;

// Premade color strings and color arrays
// #COLORS

var rgba_r = "rgba(220, 73, 73, 1)";
var rgba_g = "rgba(24, 122, 24, 1)";
var rgba_b = "rgba(73, 73, 220, 1)";
var rgba_w = "rgba(255, 255, 255, 1.0)";
var rgba_w_flr = "rgba(222, 222, 222, 0.8)";
var rgba_y = "rgba(240, 240, 50, 1.0)";
var rgba_o = "rgba(245, 213, 63, 1.0)";
var rgba_ch = "rgba(50, 200, 50, 0.9)";
var rgba_lp = "rgba(40, 40, 40, 0.75)";

var rgba_dgray = "rgb(12, 12, 12)";
var rgba_gray = "rgb(17, 17, 18)";

var rgba_lgray = "rgba(222, 222, 222, 0.3)";
var rgba_ldgray = "rgba(85, 85, 85, 0.3)";
var rgba_otext = "rgba(194, 122, 52, 1.0)";
var rgba_dtext = "rgba(155, 155, 155, 1.0)";
var rgba_cindi = "rgb(183, 167, 101)";
var rgba_cindig = "rgb(152, 106, 179)";
var rgba_cindiglite = "rgba(0, 0, 0, 0.3)";
var rgba_cindiga = "rgba(152, 106, 179, 0.9)";

var rgbas = [rgba_r, rgba_g, rgba_b, rgba_w, rgba_o];
var rgbas_link = [rgba_y, rgba_b, rgba_r, rgba_cindiga, rgba_lgray, rgba_g]; // main for loop
var rgbas_trans = [rgba_lgray, rgba_g];


var rgba_w_tri1 = "rgba(130, 130, 130, 1)";
var rgba_w_tri2 = "rgba(120, 120, 120, 1)";
var rgba_w_tri3 = "rgba(105, 105, 105, 1)";
var rgba_w_tri4 = "rgba(90, 90, 90, 1)";

var rgba_w_trio1 = "rgba(130, 130, 130, 0.5)";
var rgba_w_trio2 = "rgba(120, 120, 120, 0.5)";
var rgba_w_trio3 = "rgba(105, 105, 105, 0.5)";
var rgba_w_trio4 = "rgba(90, 90, 90, 0.5)";
var rgba_invis = "rgba(0, 0, 0, 0)";

rgbas_tri = [rgba_w_tri1, rgba_w_tri2, rgba_w_tri3];
//var rgbas_tri = [rgba_w_tri1, rgba_w_tri2, rgba_w_tri2, rgba_w_tri3, rgba_w_tri3, rgba_w_tri4];
var rgbas_tri = [rgba_w_tri1, rgba_w_tri2, rgba_w_tri2, rgba_w_tri3, rgba_w_tri3, rgba_w_tri4];
var rgbas_tri_opacity = [rgba_w_trio1, rgba_w_trio2, rgba_w_trio3, rgba_w_trio4];
var rgbas_tri_f = rgbas_tri;

var _oh = [0,0,0,0];
var f_look = [0,0,0,0];
var f_dist = [0,0,0,0];
var _inter = [0,0,0,0];
var _nplns = [0,1,0];
var _plr_dtp = [0,0,0];

var obj_normalMaps = [];
var rayInterMap = [];

var _norm_x = norm([1,0.000001,0.000001]);
var _norm_y = norm([0.000001,1,0.000001]);

var _bg_default = [15,15,15]; // 9,20,30

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
	c.rect(x-s/2, y-s/2, s+0.1, s);
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

function updateMenuPos() // this stuff so bad jesus
{

  menu_obj_size = [150, 500, 166]; // default & modified to include margins	
	
  // menu_obj_pos = [in_win_w-158, 170];
  if (m_ref_log.length != 0)
  {
     // menu_obj_pos = [in_win_wc+m1.data[mem_sum+mem_t_sum+m_ref_log[0][1]-8]*in_win_hc/(in_win_h/in_win_w), in_win_hc-m1.data[mem_sum+mem_t_sum+m_ref_log[0][1]-7]*in_win_hc ];
    menu_obj_pos = [in_win_wc+m1.data[mem_sum+mem_t_sum+m_ref_log[0][1]-4]/s_fov*in_win_wc-menu_obj_size[0]*0.5, in_win_hc+m1.data[mem_sum+mem_t_sum+m_ref_log[0][1]-3]/s_fov*in_win_hc+menu_obj_size[2]*0.5 ];

  }

  // _t1 = Math.pow(m1.data[4*k+mem_log[obj_cyc][0]]+x/in_win_hc*(in_win_h/in_win_w), 2) + Math.pow(m1.data[4*k+mem_log[obj_cyc][0]+1]+y/in_win_hc, 2);

 	menu_objpreview_pos = [in_win_wc-165/2, -in_win_hc+170/2];

	menu_keys_pos = [11, 10];
	menu_q_pos = [in_win_w/100*2, in_win_h/100*50 - 0.5*menu_q_size[1]];
	menu_wpn_pos = [in_win_w/100*3, in_win_h/100*90];

	// Updating new menu script.
	document.getElementById("menu_q").style.top = menu_q_pos[1]+"px";
	document.getElementById("menu_q").style.left = menu_q_pos[0]+"px";

	document.getElementById("menu_obj").style.top = menu_obj_pos[1]+"px";
	document.getElementById("menu_obj").style.left = menu_obj_pos[0]+"px";
	menu_obj_size[1] = document.getElementById("menu_obj").offsetHeight;

	in_win_clip = in_win_w+_epsilon;

	in_win_w = document.getElementsByTagName("html")[0].clientWidth; in_win_wc = document.getElementsByTagName("html")[0].clientWidth/2;
	in_win_h = document.getElementsByTagName("html")[0].clientHeight; in_win_hc = document.getElementsByTagName("html")[0].clientHeight/2;
	document.getElementById("cv").width = document.getElementById("cv_over").width = in_win_w;
	document.getElementById("cv").height = document.getElementById("cv_over").height = in_win_h;
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;
	resizeCanvas(in_win_w, in_win_h);
}

function setBackgroundColor(_wc)
{
	document.body.style.backgroundColor = "rgb(" + _wc[0] + "," + _wc[1] + "," + _wc[2] + ")";
};


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
	k: false,
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
	control: false,
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
    if (fileName == "")
    {
    	anchor.download = "data_" + _tar.length + ".bin";
    } else {
    	anchor.download = fileName + _tar.length + ".bin";
    }

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

window.addEventListener('blur', () =>
{
    for (const key in key_map)
    {
        if (key_map.hasOwnProperty(key))
        {
            key_map[key] = false;
        }
    }
    mouseLock = 0;
});


// Removing this for now. Clicks lock/unlock mouse.

// canvas_over.addEventListener("click", async () => 
// {
// 	await canvas_over.requestPointerLock();
// 	mouseLock = 1;
// });


function pointerLockSwap()
{if (document.pointerLockElement !== null) {document.exitPointerLock(); mouseLock = 0;} else {canvas.requestPointerLock(); mouseLock = 1;}}


window.addEventListener('resize', function()
{
	updateMenuPos();
});


document.addEventListener('contextmenu', function (e)
{
	e.preventDefault();
});

function setGridScale(par) // crack cojamane
{
	grid_scale_f = par.scale;
	grid_.scale = par.scale;
}


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
		    if ((fov_slide-e.deltaY/2000) > 0 && !lock_vert_mov) {fov_slide += -e.deltaY/2000};
		    if (lock_vert_mov) {hover_h += -e.deltaY*(key_map.shift+0.2)/14}; // fix
		} else if(runEvery(40))
		{
			obj_cyc += e.deltaY/Math.pow((e.deltaY)*(e.deltaY), 0.5);
			if (obj_cyc>m_objs.length-1) {obj_cyc=0};
			if (obj_cyc<0) {obj_cyc=m_objs.length-1};
		}

	} else if (runEvery(200)) {
			grid_scale += -e.deltaY/Math.abs(e.deltaY);
			grid_.scale += -e.deltaY/Math.abs(e.deltaY);
			grid_scale_f = Math.pow(2, grid_scale);
			grid_.scale_f = Math.pow(2, grid_.scale);
	}
	s_fov = fov_slide*fov_slide*fov_slide/20;
	updateGrid();
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
function add(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2], 1];}

function sub3(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];}
function sub(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2], 1];} // Must keep last 1 to make it easy to push. Keep in mind..

function len3(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);}
function len2(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]);}
function len2fast(a) {return a[0]*a[0]+a[1]*a[1];}

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

function runEveryLong(_ms)
{
	var d_t = Date.now() - date_now_after; var _r = 0;
	if (d_t > _ms) {_r = 1; date_now_after = Date.now();} else {_r = 0;}
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

var m_ref_objs = []; // [[n,...,],[n,...,],...]
var m_ref_log = []; // [start, size, i ref]
var m_ref_sum = 0;

var _lp = new Float32Array([0.0,0.0,0.0,1]);
var _lgp = new Float32Array([0.0, 0.0, 0.0]);
var _pp = [-125,0,-125]; // Point on plane will be static
var plr_aim = new Float32Array([0.0,0.0,0.0,1]);

var _lp_world = new Float32Array([0.0,0.0,0.0,1]);
var _lop_world = new Float32Array([0.0,0.0,0.0,1]);
var trans_f = new Float32Array([0.0,0.0,0.0,1]);
var exp_f = new Float32Array([0.0,0.0,0.0,1]);

//const m_cube = new Float32Array([-1.0,-1.0,-1.0,1, -1.0,-1.0,1.0,1, 1.0,-1.0,-1.0,1, 1.0,-1.0,1.0,1, 1.0,1.0,-1.0,1, 1.0,1.0,1.0,1, -1.0,1.0,-1.0,1, -1.0,1.0,1.0,1]);
//const m_cube = new Float32Array([-0.4,-0.4,-0.4,1, -0.4,-0.4,0.4,1, 0.4,-0.4,-0.4,1, 0.4,-0.4,0.4,1, 0.4,0.4,-0.4,1, 0.4,0.4,0.4,1, -0.4,0.4,-0.4,1, -0.4,0.4,0.4,1]);
const m_recty = new Float32Array([1, 0, 1, 1,-1, 0, 1, 1,-1, 0,-1, 1, 1, 0,-1, 1, 1, 0, 1, 1]);
const m_rectx = new Float32Array([0,-1,-1, 0, 0,-1, 1, 0, 0, 1, 1, 0, 0, 1,-1, 0, 0,-1,-1, 0]);
const m_rectz = new Float32Array([1,-1, 0, 0,-1,-1, 0, 0,-1, 1, 0, 0, 1, 1, 0, 0, 1,-1, 0, 0]);

var m_rect = m_recty;

//const m_cube = new Float32Array([-1.0000,1.0000,-1.0000,0,-1.0000,-1.0000,-1.0000,0,1.0000,-1.0000,-1.0000,0,1.0000,1.0000,-1.0000,0,1.0000,1.0000,1.0000,0,1.0000,-1.0000,1.0000,0,-1.0000,-1.0000,1.0000,0,-1.0000,1.0000,1.0000,0,-1.0000,1.0000,-1.0000,0,-1.0000,-1.0000,-1.0000,0,-1.0000,-1.0000,1.0000,0,-1.0000,1.0000,1.0000,0,1.0000,1.0000,1.0000,0,1.0000,-1.0000,1.0000,0,1.0000,-1.0000,-1.0000,0,1.0000,1.0000,-1.0000,0,-1.0000,1.0000,-1.0000,0]);
const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]);
const m_x = new Float32Array([0,0,0,1, 8,0,0,1]);
const m_y = new Float32Array([0,0,0,1, 0,8,0,1]);
const m_z = new Float32Array([0,0,0,1, 0,0,8,1]);
const m_map = new Float32Array([277.1638,-128.0000,114.8050,0,277.1638,0.0000,114.8050,0,114.8050,0.0000,277.1638,0,114.8050,-128.0000,277.1638,0,-114.8050,-128.0000,277.1638,0,-114.8050,0.0000,277.1638,0,-277.1638,0.0000,114.8050,0,-277.1638,-128.0000,114.8050,0,-277.1638,-128.0000,-114.8050,0,-277.1638,0.0000,-114.8050,0,-114.8050,0.0000,-277.1638,0,-114.8050,-128.0000,-277.1638,0,114.8050,-128.0000,-277.1638,0,114.8050,0.0000,-277.1638,0,277.1638,0.0000,-114.8050,0,277.1638,-128.0000,-114.8050,0,277.1638,-128.0000,114.8050,0,277.1638,0.0000,114.8050,0,277.1638,0.0000,-114.8050,0,277.1638,-128.0000,-114.8050,0,114.8050,-128.0000,-277.1638,0,114.8050,0.0000,-277.1638,0,-114.8050,0.0000,-277.1638,0,-114.8050,-128.0000,-277.1638,0,-277.1638,-128.0000,-114.8050,0,-277.1638,0.0000,-114.8050,0,-277.1638,0.0000,114.8050,0,-277.1638,-128.0000,114.8050,0,-114.8050,-128.0000,277.1638,0,-114.8050,0.0000,277.1638,0,114.8050,0.0000,277.1638,0,114.8050,-128.0000,277.1638,0,277.1638,-128.0000,114.8050,0]);
const m_flr = new Float32Array([-256.0000,0.0000,112.0000,0,-256.0000,0.0000,80.0000,0,-256.0000,0.0000,48.0000,0,-256.0000,0.0000,16.0000,0,-256.0000,0.0000,-16.0000,0,-256.0000,0.0000,-48.0000,0,-256.0000,0.0000,-80.0000,0,-256.0000,0.0000,-112.0000,0,-224.0000,0.0000,144.0000,0,-224.0000,0.0000,112.0000,0,-224.0000,0.0000,80.0000,0,-224.0000,0.0000,48.0000,0,-224.0000,0.0000,16.0000,0,-224.0000,0.0000,-16.0000,0,-224.0000,0.0000,-48.0000,0,-224.0000,0.0000,-80.0000,0,-224.0000,0.0000,-112.0000,0,-224.0000,0.0000,-144.0000,0,-192.0000,0.0000,176.0000,0,-192.0000,0.0000,144.0000,0,-192.0000,0.0000,112.0000,0,-192.0000,0.0000,80.0000,0,-192.0000,0.0000,48.0000,0,-192.0000,0.0000,16.0000,0,-192.0000,0.0000,-16.0000,0,-192.0000,0.0000,-48.0000,0,-192.0000,0.0000,-80.0000,0,-192.0000,0.0000,-112.0000,0,-192.0000,0.0000,-144.0000,0,-192.0000,0.0000,-176.0000,0,-160.0000,0.0000,208.0000,0,-160.0000,0.0000,176.0000,0,-160.0000,0.0000,144.0000,0,-160.0000,0.0000,112.0000,0,-160.0000,0.0000,80.0000,0,-160.0000,0.0000,48.0000,0,-160.0000,0.0000,16.0000,0,-160.0000,0.0000,-16.0000,0,-160.0000,0.0000,-48.0000,0,-160.0000,0.0000,-80.0000,0,-160.0000,0.0000,-112.0000,0,-160.0000,0.0000,-144.0000,0,-160.0000,0.0000,-176.0000,0,-160.0000,0.0000,-208.0000,0,-128.0000,0.0000,240.0000,0,-128.0000,0.0000,208.0000,0,-128.0000,0.0000,176.0000,0,-128.0000,0.0000,144.0000,0,-128.0000,0.0000,112.0000,0,-128.0000,0.0000,80.0000,0,-128.0000,0.0000,48.0000,0,-128.0000,0.0000,16.0000,0,-128.0000,0.0000,-16.0000,0,-128.0000,0.0000,-48.0000,0,-128.0000,0.0000,-80.0000,0,-128.0000,0.0000,-112.0000,0,-128.0000,0.0000,-144.0000,0,-128.0000,0.0000,-176.0000,0,-128.0000,0.0000,-208.0000,0,-128.0000,0.0000,-240.0000,0,-96.0000,0.0000,240.0000,0,-96.0000,0.0000,208.0000,0,-96.0000,0.0000,176.0000,0,-96.0000,0.0000,144.0000,0,-96.0000,0.0000,112.0000,0,-96.0000,0.0000,80.0000,0,-96.0000,0.0000,48.0000,0,-96.0000,0.0000,16.0000,0,-96.0000,0.0000,-16.0000,0,-96.0000,0.0000,-48.0000,0,-96.0000,0.0000,-80.0000,0,-96.0000,0.0000,-112.0000,0,-96.0000,0.0000,-144.0000,0,-96.0000,0.0000,-176.0000,0,-96.0000,0.0000,-208.0000,0,-96.0000,0.0000,-240.0000,0,-64.0000,0.0000,240.0000,0,-64.0000,0.0000,208.0000,0,-64.0000,0.0000,176.0000,0,-64.0000,0.0000,144.0000,0,-64.0000,0.0000,112.0000,0,-64.0000,0.0000,80.0000,0,-64.0000,0.0000,48.0000,0,-64.0000,0.0000,16.0000,0,-64.0000,0.0000,-16.0000,0,-64.0000,0.0000,-48.0000,0,-64.0000,0.0000,-80.0000,0,-64.0000,0.0000,-112.0000,0,-64.0000,0.0000,-144.0000,0,-64.0000,0.0000,-176.0000,0,-64.0000,0.0000,-208.0000,0,-64.0000,0.0000,-240.0000,0,-32.0000,0.0000,240.0000,0,-32.0000,0.0000,208.0000,0,-32.0000,0.0000,176.0000,0,-32.0000,0.0000,144.0000,0,-32.0000,0.0000,112.0000,0,-32.0000,0.0000,80.0000,0,-32.0000,0.0000,48.0000,0,-32.0000,0.0000,16.0000,0,-32.0000,0.0000,-16.0000,0,-32.0000,0.0000,-48.0000,0,-32.0000,0.0000,-80.0000,0,-32.0000,0.0000,-112.0000,0,-32.0000,0.0000,-144.0000,0,-32.0000,0.0000,-176.0000,0,-32.0000,0.0000,-208.0000,0,-32.0000,0.0000,-240.0000,0,0.0000,0.0000,240.0000,0,0.0000,0.0000,208.0000,0,0.0000,0.0000,176.0000,0,0.0000,0.0000,144.0000,0,0.0000,0.0000,112.0000,0,0.0000,0.0000,80.0000,0,0.0000,0.0000,48.0000,0,0.0000,0.0000,16.0000,0,0.0000,0.0000,-16.0000,0,0.0000,0.0000,-48.0000,0,0.0000,0.0000,-80.0000,0,0.0000,0.0000,-112.0000,0,0.0000,0.0000,-144.0000,0,0.0000,0.0000,-176.0000,0,0.0000,0.0000,-208.0000,0,0.0000,0.0000,-240.0000,0,32.0000,0.0000,240.0000,0,32.0000,0.0000,208.0000,0,32.0000,0.0000,176.0000,0,32.0000,0.0000,144.0000,0,32.0000,0.0000,112.0000,0,32.0000,0.0000,80.0000,0,32.0000,0.0000,48.0000,0,32.0000,0.0000,16.0000,0,32.0000,0.0000,-16.0000,0,32.0000,0.0000,-48.0000,0,32.0000,0.0000,-80.0000,0,32.0000,0.0000,-112.0000,0,32.0000,0.0000,-144.0000,0,32.0000,0.0000,-176.0000,0,32.0000,0.0000,-208.0000,0,32.0000,0.0000,-240.0000,0,64.0000,0.0000,240.0000,0,64.0000,0.0000,208.0000,0,64.0000,0.0000,176.0000,0,64.0000,0.0000,144.0000,0,64.0000,0.0000,112.0000,0,64.0000,0.0000,80.0000,0,64.0000,0.0000,48.0000,0,64.0000,0.0000,16.0000,0,64.0000,0.0000,-16.0000,0,64.0000,0.0000,-48.0000,0,64.0000,0.0000,-80.0000,0,64.0000,0.0000,-112.0000,0,64.0000,0.0000,-144.0000,0,64.0000,0.0000,-176.0000,0,64.0000,0.0000,-208.0000,0,64.0000,0.0000,-240.0000,0,96.0000,0.0000,240.0000,0,96.0000,0.0000,208.0000,0,96.0000,0.0000,176.0000,0,96.0000,0.0000,144.0000,0,96.0000,0.0000,112.0000,0,96.0000,0.0000,80.0000,0,96.0000,0.0000,48.0000,0,96.0000,0.0000,16.0000,0,96.0000,0.0000,-16.0000,0,96.0000,0.0000,-48.0000,0,96.0000,0.0000,-80.0000,0,96.0000,0.0000,-112.0000,0,96.0000,0.0000,-144.0000,0,96.0000,0.0000,-176.0000,0,96.0000,0.0000,-208.0000,0,96.0000,0.0000,-240.0000,0,128.0000,0.0000,208.0000,0,128.0000,0.0000,176.0000,0,128.0000,0.0000,144.0000,0,128.0000,0.0000,112.0000,0,128.0000,0.0000,80.0000,0,128.0000,0.0000,48.0000,0,128.0000,0.0000,16.0000,0,128.0000,0.0000,-16.0000,0,128.0000,0.0000,-48.0000,0,128.0000,0.0000,-80.0000,0,128.0000,0.0000,-112.0000,0,128.0000,0.0000,-144.0000,0,128.0000,0.0000,-176.0000,0,128.0000,0.0000,-208.0000,0,160.0000,0.0000,176.0000,0,160.0000,0.0000,144.0000,0,160.0000,0.0000,112.0000,0,160.0000,0.0000,80.0000,0,160.0000,0.0000,48.0000,0,160.0000,0.0000,16.0000,0,160.0000,0.0000,-16.0000,0,160.0000,0.0000,-48.0000,0,160.0000,0.0000,-80.0000,0,160.0000,0.0000,-112.0000,0,160.0000,0.0000,-144.0000,0,160.0000,0.0000,-176.0000,0,192.0000,0.0000,144.0000,0,192.0000,0.0000,112.0000,0,192.0000,0.0000,80.0000,0,192.0000,0.0000,48.0000,0,192.0000,0.0000,16.0000,0,192.0000,0.0000,-16.0000,0,192.0000,0.0000,-48.0000,0,192.0000,0.0000,-80.0000,0,192.0000,0.0000,-112.0000,0,192.0000,0.0000,-144.0000,0,224.0000,0.0000,112.0000,0,224.0000,0.0000,80.0000,0,224.0000,0.0000,48.0000,0,224.0000,0.0000,16.0000,0,224.0000,0.0000,-16.0000,0,224.0000,0.0000,-48.0000,0,224.0000,0.0000,-80.0000,0,224.0000,0.0000,-112.0000,0,256.0000,0.0000,80.0000,0,256.0000,0.0000,48.0000,0,256.0000,0.0000,16.0000,0,256.0000,0.0000,-16.0000,0,256.0000,0.0000,-48.0000,0,256.0000,0.0000,-80.0000,0,256.0000,0.0000,-80.0000,0]);
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

function updateGrid()
{
	g_over_x = setGrid(15, grid_.scale_f, 0, [0, 0, 0]);
	g_over_y = setGrid(15, grid_.scale_f, 1, [0, 0, 0]);
	g_over_z = setGrid(15, grid_.scale_f, 2, [0, 0, 0]);

	// now write data to obj

	for (var i = 0; i<mem_log[3][1]-4; i++) // the fuck
	{
		m_objs[3][i] = m_objs_ghost[3][i] = g_over_x[i];
		m_objs[4][i] = m_objs_ghost[4][i] = g_over_y[i];
		m_objs[5][i] = m_objs_ghost[5][i] = g_over_z[i];
	}
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
//var m_flr = setGrid(8*4-2, 8, 1, [4, 0, 4]);

var g_over_x = setGrid(15, 1, 0, [0, 0, 0]);
var g_over_y = setGrid(15, 1, 1, [0, 0, 0]);
var g_over_z = setGrid(15, 1, 2, [0, 0, 0]);



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

var m1 = GLSLfragmentShader.alloc(80000); // Allocate memory for parallel operations
for (i=0; i<m1.data.length; i++)
{
	m1.data[i] = 0.0;
}


// stores arrays containing indices and arrays allowing for nested folders
// consider unique id's? same problem anyway?
// so stores blocks that fit into blocks.
// a single block contains two arrays
// array 1 contains blocks.
// array 2 contains indices w/ first giving the number of indicies.

// wait no just use the exact same system basically
var obj_folders = [];




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
		// obj_normalMaps.push(new Float32Array( 4*(Math.floor((ar.length/4-1)/2)-(ar.length/4)%2) ));
	} else {
		m_objs[m_objs.length] = ar;
		m_objs_ghost[m_objs_ghost.length] = ar;
		mem_log.push([mem_sum, ar.length, Math.floor(ar.length/4), Math.floor(ar.length/12)]);
		mem_sum += ar.length;
		obj_normalMaps.push(new Float32Array([0.0, 0.0, 0.0, 0.0]));
	}
	m_obj_offs.push([0.0, 0.0, 0.0, 1]);
	//obj_updateNormalMaps();
	if (typeof updateList == 'function') {updateList(objListConst(), "list_objectSelect");}

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
			_tar[i*4+0] = m_t_objs[i][0];
			_tar[i*4+1] = m_t_objs[i][1];
			_tar[i*4+2] = m_t_objs[i][2];
			_tar[i*4+3] = m_t_objs[i][3];
		}
		m_t_objs.length = mem_t_log.length = mem_t_sum = 0;
		m_objs_loadPoints(_tar);
	}
}

// first going to make preview obj at index 0
function m_ref_objs_loadObj(ar, iref)
{
	m_ref_objs[m_ref_objs.length] = ar;
	m_ref_log.push([m_ref_sum, ar.length, iref]);
	m_ref_sum += ar.length;
}



function packObj(ar) // Puts m_t_objs into m_objs as single array 
{
	var _tar = new Float32Array(ar.length*4);
	for (i=0; i<ar.length; i++)
	{
		_tar[i*4+0] = ar[i][0];
		_tar[i*4+1] = ar[i][1];
		_tar[i*4+2] = ar[i][2];
		_tar[i*4+3] = ar[i][3];
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
		for (var i = 0; i<m_objs[j].length/4; i++) // fix
		{
			m1.data[i*4+mem_log[j][0]]   = m_objs[j][i*4+0]*m_obj_offs[j][3] + m_obj_offs[j][0];
			m1.data[i*4+1+mem_log[j][0]] = m_objs[j][i*4+1]*m_obj_offs[j][3] + m_obj_offs[j][1];
			m1.data[i*4+2+mem_log[j][0]] = m_objs[j][i*4+2]*m_obj_offs[j][3] + m_obj_offs[j][2];
			m1.data[i*4+3+mem_log[j][0]] = m_objs[j][i*4+3]*m_obj_offs[j][3];
		}
	}
	for (var j = 0; j<(m_t_objs.length); j++)
	{
		for (var i = 0; i<m_t_objs[j].length/4; i++) // fix
		{
			m1.data[i*4+mem_t_log[j][0]+mem_sum]   = m_t_objs[j][i*4+0];
			m1.data[i*4+1+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i*4+1];
			m1.data[i*4+2+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i*4+2];
			m1.data[i*4+3+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i*4+3];
		}
	}
	for (var j = 0; j<(m_ref_objs.length); j++)
	{
		for (var i = 0; i<m_ref_objs[j].length/4; i++)
		{
			m1.data[i*4+m_ref_log[j][0]+mem_sum+mem_t_sum]   = m_ref_objs[j][i*4+0];
			m1.data[i*4+1+m_ref_log[j][0]+mem_sum+mem_t_sum] = m_ref_objs[j][i*4+1];
			m1.data[i*4+2+m_ref_log[j][0]+mem_sum+mem_t_sum] = m_ref_objs[j][i*4+2];
			m1.data[i*4+3+m_ref_log[j][0]+mem_sum+mem_t_sum] = m_ref_objs[j][i*4+3];
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
m_objs_loadPoints(m_recty);       // 12


world_obj_count = obj_cyc = m_objs.length-1;

setData();

var canvas = document.getElementById("cv");
var ctx = canvas.getContext("2d");


var canvas_over = document.getElementById("cv_over");
var ctx_o = canvas_over.getContext("2d");


// WTF IS THIS YO. Fix for mac users at some point if this doesn't already.
// const ratio = window.devicePixelRatio || 1;

ctx.scale(1, 1); ctx_o.scale(1, 1);


// Obj load & unpack
fileInput.addEventListener('change', event => 
{
	const _fi = event.target.files;
	loadFile(_fi[0]);
});

/*
		FILE LOAD UNPACKS WRAPPED POINTS
*/
function loadFile(_fi)
{
	if (_fi)
	{
		const _r = new FileReader();
		_r.onload = event =>
		{
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
			var _fn = _fi.name.slice(0, _fi.name.length-4);
			var _si = _fn.length;
			for (var i = _fn.length - 1; i >= 0; i--)
			{
				if (!checkNumber(_fn[i]))
				{
					_si = i;
					break;
				}
			}
			fileName = _fn.slice(0, _si+1);
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
					updateLook();

					// n from cross map here
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
			player_pos[0] = _inter[0];
			player_pos[2] = _inter[2];
			player_look_dir[0] = (player_look_dir[0] + pi > 2 * pi) ? player_look_dir[0] - pi : player_look_dir[0] + pi; //flippero broken.
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
    for (var i = 0; i < _q_ar.length; i++)
    {
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

function arHasC(ar, c) // Useless?
{
    var _r = false;
    for (var i = 0; i < ar.length; i++)
    {
        if (ar[i] === c) {_r = true;break;}
    }
    //console.log(_r);
    return _r;
}

/*
	assume objs for now are closed loop with an overlapping end point.
	I hope this design wasn't a mistake. Maybe additional 3d data isn't too bad
	rendering must be redone from linear to one more layer. like a way to draw objs based on a new list.
	I could map obj by memory...

		obj in general by mem sections measured for mean ctr which could act as simple reorganize for z buffer
			so draw obj rel to dist using 3d ctr??
			mem redirect would say..
			table:
				[i][0][dist..]
				[i][1][dist...]
				[i][2][dist..]
				[i][3][dist...]
				[i][4][dist..]

				so put i map into reorganize list by dist
				generate a draw -> nvm ref table from 0 to n and access table[1]
*/

function updateDrawMap(priorityObjects)
{
	for (var i=0; i<m_objs.length; i++)
	{
		indices.push(i);
		//distances.push(len3(sub(getctr_obj(i), player_pos)));
		distances.push(Math.abs(m1.data[mem_log[i][0]+mem_log[i][1]-1]));
	}

	originalIndices = indices.slice();

	indices.sort((a, b) => distances[a] - distances[b]);
	//indices.sort((a, b) => distances[b] - distances[a]);

	indexMapping = originalIndices.map((originalIndex, sortedIndex) => ({
	  originalIndex: originalIndex,
	  sortedIndex: indices[sortedIndex],
	  distance: distances[indices[sortedIndex]],
	}));

	indices.length = 0;
	distances.length = 0;

	indexMapping.forEach(item => {
	  newIndex[item.originalIndex] = item.sortedIndex;
	});

	modIndex = Object.values(newIndex);

	for (var i = 0; i < priorityObjects.length; i++)
	{
	    let priorityIndex = modIndex.indexOf(priorityObjects[i]);
	    if (priorityIndex !== -1)
	    {
	        let entry = modIndex.splice(priorityIndex, 1)[0];
	        modIndex.unshift(entry);
	    }
	}

	//console.log(init_dat.data[mem_log[i][0]+mem_log[i][1]-1]); // Z dist test
	return indexMapping;
}

function del_obj(_i)
{
	if (_i > world_obj_count)
	{
		trns_lock = 0;
		_all_lock = 0; _all_lock = 0;
		if (obj_cyc == m_objs.length-1) // If last delete last
		{
			m_objs.splice(-1);	mem_log.splice(-1); m_obj_offs.splice(-1); m_objs_ghost.splice(-1); obj_cyc = obj_cyc-1;
		} else // Delete specific
		{
			var _ts = mem_log[obj_cyc][1];
			for (var i = obj_cyc+1; i<mem_log.length; i++)
			{
				mem_log[i][0] = mem_log[i][0]-_ts;
			}
			m_objs.splice(obj_cyc, 1); mem_log.splice(obj_cyc, 1); m_obj_offs.splice(obj_cyc, 1); m_objs_ghost.splice(obj_cyc, 1);
		}
		updateList(objListConst(), "list_objectSelect");
	}
}

function updateLook() // Quat view rot
{
		_viewq = [makeQuaternion(-player_look_dir[1], _norm_x),
				  makeQuaternion(-player_look_dir[0], _norm_y)];
		f_look = quatRot( [0,0,1], _viewq );

		_oh = dot(player_pos,[0,1,0,1]);
		f_dist = -_oh/dot([0,1,0],norm(f_look));
		_nplns = [[1,0,0],[0,1,0],[0,0,1]][pln_cyc]; // use pln_cyc to select norm vec from array of norm vecs
		_plr_dtp = [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]]; // player pos + look dir * 
}

function finishTrnsAnim(_i) // Maybe make this a system
{
	for (var i=0; i<mem_log[_i][2]; i++)
	{
		m_objs[_i][i*4+0] = m_objs_ghost[_i][i*4+0] = m_objs[_i][i*4+0]+roundTo(m_obj_offs[_i][0], grid_.scale_f);
		m_objs[_i][i*4+1] = m_objs_ghost[_i][i*4+1] = m_objs[_i][i*4+1]+roundTo(m_obj_offs[_i][1], grid_.scale_f);
		m_objs[_i][i*4+2] = m_objs_ghost[_i][i*4+2] = m_objs[_i][i*4+2]+roundTo(m_obj_offs[_i][2], grid_.scale_f);
	}
}

function findbyctr_obj(x, y) // 2D find by 3D encoded center point
{
	if (m_objs.length > world_obj_count+1) // fix len2 ??????????????????????
	{
		var _lt;
		var _i = world_obj_count+1;
		var _l = Number.MAX_VALUE;
		//var _l = len2fast([m1.data[mem_log[world_obj_count+1][0]+mem_log[world_obj_count+1][1]-4]+x/in_win_hc*(in_win_h/in_win_w), m1.data[mem_log[world_obj_count+1][0]+mem_log[world_obj_count+1][1]-3]+y/in_win_hc]);

		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
			_lt = len2fast([m1.data[mem_log[i][0]+mem_log[i][1]-4]+x/in_win_hc*(in_win_h/in_win_w), m1.data[mem_log[i][0]+mem_log[i][1]-3]+y/in_win_hc]);
			if (_lt < _l) {_i = i; _l = _lt;}
		}
		return _i;
	} else {return world_obj_count;}
}

// use 2d lense alg to make crispy
function select2dpoint(x, y) // 2D find
{
	var _f; var _n_sku = 0; var _t1; var _d = 0; var _d2 = 0;

	_f = Number.MAX_VALUE;

	if (obj_cyc != trns_obj_i && obj_cyc>world_obj_count)
	{
		for (let k = 0; k<mem_log[obj_cyc][1]/4; k++)
		{
			_t1 = Math.pow(m1.data[4*k+mem_log[obj_cyc][0]]+x/in_win_hc*(in_win_h/in_win_w), 2) + Math.pow(m1.data[4*k+mem_log[obj_cyc][0]+1]+y/in_win_hc, 2);
			if (_t1 < _f)
			{
				_f = _t1;
				_n_sku = k;
			}
		}
	}

	for (var i = 0; i<m_t_objs.length; i++)
	{
		for (var j = 0; j<mem_t_log[i][1]/4; j++)
		{
			_t1 = Math.pow(m1.data[4*j+mem_t_log[i][0]+mem_sum]+x/in_win_hc*(in_win_h/in_win_w), 2) + Math.pow(m1.data[4*j+mem_t_log[i][0]+mem_sum+1]+y/in_win_hc, 2);
			if (_t1 < _f)
			{
				_f = _t1;
				_n_sku = i;
				_d = 1;
			}
		}
	}

	if (!mouseLock)
	{
		for (let k = 0; k<mem_log[3+pln_cyc][1]/4; k++)
		{
			_t1 = Math.pow(m1.data[4*k+mem_log[3+pln_cyc][0]]+x/in_win_hc*(in_win_h/in_win_w), 2) + Math.pow(m1.data[4*k+mem_log[3+pln_cyc][0]+1]+y/in_win_hc, 2);

			if (!isNaN(_t1) && !isNaN(_f))
			{
				if (_t1 < _f)
				{
					_f = _t1;
					_n_sku = k;
					_d = 2;
					_d2 = 3+pln_cyc;
				}
			}
		}
	}

	switch(_d)
	{
		case 0:
			_lp[0] = _lp_world[0] = m_objs[obj_cyc][4*_n_sku];
			_lp[1] = _lp_world[1] = m_objs[obj_cyc][4*_n_sku+1];
			_lp[2] = _lp_world[2] = m_objs[obj_cyc][4*_n_sku+2];
				cursor_helper = 1;
			break;
		case 1:
			if (typeof _n_sku == 'number')
			{
				if (m_t_objs.length != 0 && typeof m_t_objs[_n_sku] != 'undefined')
				{
					_lp[0] = _lp_world[0] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-4)];
					_lp[1] = _lp_world[1] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-3)];
					_lp[2] = _lp_world[2] = m_t_objs[_n_sku][(mem_t_log[m_t_objs.length-1][1]-2)];
					cursor_helper = 1;
				}
			}
			break;
		case 2:

			_lp[0] = _lp_world[0] = m_objs[_d2][4*_n_sku];
			_lp[1] = _lp_world[1] = m_objs[_d2][4*_n_sku+1];
			_lp[2] = _lp_world[2] = m_objs[_d2][4*_n_sku+2];
			cursor_helper = 0;
			break;
	}
}

function getctr_obj(_i) // Get encoded 3D center point
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

				// _lp[0] = _lp_world[0];
				// _lp[1] = _lp_world[1];
				// _lp[2] = _lp_world[2];
				// _lp[0] = _lp_world[0] = _inter_rnd[0];
				// _lp[1] = _lp_world[1] = _inter_rnd[1];
				// _lp[2] = _lp_world[2] = _inter_rnd[2];

			trns_lock = 0; obj_cyc = trns_obj_i; trns_obj_i = 0;
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

//		So far so good they're rotating. I realized it's more complex because start and end can be removed from rotation as their location is implied


function rotateArray(ar, n)
{
	const l = ar.length;
	if (l === 0 || n % l === 0) {return ar.slice();}
	const nn = n % l;
	const rotatedArray = ar.slice(l - nn).concat(ar.slice(0, l - nn));
	return rotatedArray;
}



function bond_obj(_i)
{
	switch(_all_lock)
	{
		case 0: // Alternator
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

			var _f = [];

			// take last one out -> rotate until match x,y,z -> recreate last
			/*
				cut out last -> to var w/ splice
				rotate until n: 
				put end back into ar
	
			*/

			_oi.push(_oi[_oi.length-1]); // ??

			// var itorLog = 0;

			// var matchPoint = _oi[lap_oi]; // Can use either one
			// var matchPoint2 = _of[lap_of]; // Can use either one

			// console.log(_of);
			// console.log(_oi);

			// console.log(matchPoint);
			// console.log(matchPoint2);

			//var _oi_p = _oi.splice(-1);
			//var _of_p = _of.splice(0, 1); // need bottom ?

			// for (var i = 0; i<_oi.length; i++) // idk just use len for now
			// {
			// 	// if (_oi[_oi.length-1] != matchPoint) // checking if last point in array is not match point.
			// 	if (!pIsEqual(_oi[_oi.length-1], matchPoint))
			// 	{
			// 		_oi = rotateArray(_oi, 1);
			// 		itorLog++;
			// 	}

			// 	if (i == _oi.length-1) {console.log(itorLog);}
			// }

			// //_oi.push(_oi_p);


			// for (var i = _of.length - 1; i >= 0; i--)
			// {
			// 	// if (_of[0] != matchPoint) // checking if last point in array is not match point.
			// 	if (!pIsEqual(_of[0], matchPoint))
			// 	{
			// 		_of = rotateArray(_of, 1);
			// 	}

			// }

			//_of.unshift(_of_p);





			//_oi.splice(-1);
			// for (var j = 0; j<_of.length; j++) // idk just use len for now
			// {
			// 	if (_of[0] != matchPoint) // checking if last point in array is not match point.
			// 	{
			// 		_of = rotateArray(_of, 1);
			// 	}
			// }

			//console.log("zzzzzzzzzzzzzzzzzzzzzz------");


			// console.log(_oi);
			// console.log(_of);

			_oi.forEach(e1 =>
			{
				_f.push(e1);
			});

			_of.forEach(e1 =>
			{
				_f.push(e1);
			});



			m_objs_loadPoints(packObj(_f));
			_all_lock_i = 0; _all_lock = 0;

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

// Remove center option? nah keeps cursor in right place.
// @?@?@?@ Later make this rotate around a plane (grid plane as dir vec)
function rotateObject(_op, _r) // _op determines if rotation uses point or center, _r radians.
{
	if (obj_cyc>world_obj_count && runEvery(150))
	{
		var _to = splitObjS(m_objs[obj_cyc]);
		var _c = getctr_obj(obj_cyc);
		var _rf = _r * pi/180;

		// for now I use this. code is getting skrambled
		if (wpn_select == 1) {_op = 1;}
		if (!mouseLock) {_op = 0;}

		for (var i=0; i<_to.length; i++)
		{
			switch(pln_cyc)
			{
				case 0:
					switch(_op)
					{
					case 0:
						_to[i] = add3(_lp_world, rot_x_pln(sub(_to[i], _lp_world), _rf));
						break;
					case 1:
						_to[i] = add3(_c, rot_x_pln(sub(_to[i], _c), _rf));
						break;
					}
					break;
				case 1:
					switch(_op)
					{
					case 0:
						_to[i] = add3(_lp_world, rot_y_pln(sub(_to[i], _lp_world), _rf));
						break;
					case 1:
						_to[i] = add3(_c, rot_y_pln(sub(_to[i], _c), _rf));
						break;
					}
					break;
				case 2:
					switch(_op)
					{
					case 0:
						_to[i] = add3(_lp_world, rot_z_pln(sub(_to[i], _lp_world), _rf));
						break;
					case 1:
						_to[i] = add3(_c, rot_z_pln(sub(_to[i], _c), _rf));
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
}




/*
	╔═╗╔═╗╔═══╗╔═╗ ╔╗╔╗ ╔╗     ╔═══╗╔═╗ ╔╗╔═══╗
	║║╚╝║║║╔══╝║║╚╗║║║║ ║║     ║╔══╝║║╚╗║║║╔═╗║
	║╔╗╔╗║║╚══╗║╔╗╚╝║║║ ║║     ║╚══╗║╔╗╚╝║║╚══╗
	║║║║║║║╔══╝║║╚╗║║║║ ║║     ║╔══╝║║╚╗║║╚══╗║
	║║║║║║║╚══╗║║ ║║║║╚═╝║    ╔╝╚╗  ║║ ║║║║╚═╝║
	╚╝╚╝╚╝╚═══╝╚╝ ╚═╝╚═══╝    ╚══╝  ╚╝ ╚═╝╚═══╝
	#MENUFNS
*/


function deleteObjectSelected()
{
	del_obj(obj_cyc);
}

function del_world()
{
	trns_lock = 0;
	_all_lock = 0; _all_lock_i = 0;
	m_objs.splice(world_obj_count+1); mem_log.splice(world_obj_count+1); m_obj_offs.splice(world_obj_count+1); m_objs_ghost.splice(world_obj_count+1);
	fileInput.value = '';
	obj_cyc = m_objs.length-1;
}

function createCircleAtCursor()
{
	if (!isNaN(stn_cir_tool.divider) && !isNaN(stn_cir_tool.scale) && !isNaN(stn_cir_tool.off))
	{
		make_cir_obj(Math.floor(stn_cir_tool.divider), stn_cir_tool.scale, stn_cir_tool.off, pln_cyc);
	}
}

//if (key_map["5"] && mouseLock && obj_cyc>world_obj_count && runEvery(150)) // Move to fn later
function mirrorOverPlane()
{
	if (obj_cyc>world_obj_count)
	{
		var _to = splitObjS(m_objs[obj_cyc]);
		var _c = getctr_obj(obj_cyc);
		for (var i=0; i<_to.length; i++)
		{
			switch(wpn_select)
			{
			case 0:
				_to[i] = add3(_lp_world, mir_w_pln(sub(_to[i], _lp_world), pln_cyc));
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
}

function cloneObjSelected()
{
	if (obj_cyc>world_obj_count)
	{
		m_objs_loadPoints(cloneObj(m_objs[obj_cyc]));
	}
}

function setCursorToObjCenter()
{
	var _t = getctr_obj(obj_cyc);
	if (!stn_trns[0]) {_lp[0] = _lp_world[0] = _t[0];}
	if (!stn_trns[1]) {_lp[1] = _lp_world[1] = _t[1];}
	if (!stn_trns[2]) {_lp[2] = _lp_world[2] = _t[2];}	
}

function returnCursorToGround()
{
	_lp[1] = 0; _lp_world[1] = 0;
	pln_cyc=1;
}

function playerChangeMovementMode()
{
	lock_vert_mov = !lock_vert_mov; hover_h = -player_pos[1];
}

function editSelectedObject()
{
	m_obj_explode(obj_cyc);
}

// Passing mem_t_mov w/ no menu function here for it.

function applyRotation()
{
	rotateObject(0, stn_rotation[0]);
}

function moveObject()
{
	trans_obj(obj_cyc);
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

	updateMenuPos();

	// This needs to be fixed. Temp as I port menu to new script.
	if (mouseLock)
	{setVisibility({hide:"menu_1", show:""});
	} else
	{setVisibility({hide:"", show:"menu_1"});}

	//console.log(init_dat.data[mem_log[9][0]+3]); // Z dist test
	//obj_updateNormalMaps();

	if (wpn_select==1 && key_map.lmb==false && mouseLock) {obj_cyc = findbyctr_obj(0, 0);}

	drawPanel(ctx_o, rgba_dgray, rgba_lgray, menu_obj_pos[0]+1, menu_obj_pos[1]-menu_obj_size[0], 148, 150);




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

 
	// While in menu with low call rate i'll set values here:

	/*========================================================*/
	/*================--------------------------==============*/
	/*================----- SET TOOL VALUES ----==============*/
	/*================--------------------------==============*/
	/*========================================================*/


	document.getElementById("fileInput").style.position = "absolute";
	document.getElementById("fileInput").style.left = (menu_keys_pos[0]+15)+"px";
	document.getElementById("fileInput").style.top = (62)+"px"; // M keys menu expander


	drawPanel(ctx_o, rgba_gray, rgba_lgray, menu_keys_pos[0], menu_keys_pos[1], 410, 88); // Open file mover

	drawPanel(ctx_o, rgba_gray, rgba_lgray, -5, -5, 1, 1); // SUPER HOT FIX for panel 1px border. MAKES. ZERO. SENSE. I have tried everything this is actually globally broken right now.

	// Remove aim thing

	drawText(ctx_o, rgba_otext, "left", "pos[" + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+"]", menu_keys_pos[0]+15, 34);
	//drawText(ctx_o, rgba_otext, "right", "aim[" + ((init_dat.data[mem_log[1][0]]-in_win_wc)/s_fov).toFixed(1) + ", " + ((init_dat.data[mem_log[1][0]+1]-in_win_hc)/s_fov).toFixed(1) + ", " + init_dat.data[mem_log[1][0]+3].toFixed(1)+"]", menu_keys_pos[0]+398, 34);
	drawText(ctx_o, rgba_otext, "right", "aim[" + player_look_dir[0].toFixed(1) + ", " + player_look_dir[1].toFixed(1) + "]",  menu_keys_pos[0]+398, 34);
	drawText(ctx_o, rgba_otext, "left", "pln_cyc[" + [" X-Plane "," Y-Plane "," Z-Plane "][pln_cyc]+"]", menu_keys_pos[0]+15, 49);
	drawText(ctx_o, rgba_otext, "right", "grid_scale[" + grid_.scale_f+"]", menu_keys_pos[0]+398, 49);


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
__/\\\\\\\\\\\\\\\__/\\\\\\\\\______/\\\\\\\\\\\__/\\\_________/\\\\\\\\\\\__/\\\\\_____/\\\__/\\\\\\\\\\\\\__/\\\\\\\\\\__________/\\\\\______/\\\\\\\\\\\\\\\_        
 _\///////\\\/////_/\\\///////\\\___\/////\\\///__\/\\\________\/////\\\///__\/\\\\\\___\/\\\_\/\\\/////////__\/\\\//////\\\______/\\\///\\\___\///////\\\/////__       
  _______\/\\\_____\/\\\_____\/\\\_______\/\\\_____\/\\\____________\/\\\_____\/\\\/\\\__\/\\\_\/\\\___________\/\\\____\//\\\___/\\\/__\///\\\_______\/\\\_______      
   _______\/\\\_____\/\\\\\\\\\\\/________\/\\\_____\/\\\____________\/\\\_____\/\\\//\\\_\/\\\_\/\\\\\\\\\_____\/\\\_____\/\\\__/\\\______\//\\\______\/\\\_______     
    _______\/\\\_____\/\\\//////\\\________\/\\\_____\/\\\____________\/\\\_____\/\\\\//\\\\/\\\_\/\\\/////______\/\\\_____\/\\\_\/\\\_______\/\\\______\/\\\_______    
     _______\/\\\_____\/\\\____\//\\\_______\/\\\_____\/\\\____________\/\\\_____\/\\\_\//\\\/\\\_\/\\\___________\/\\\_____\/\\\_\//\\\______/\\\_______\/\\\_______   
      _______\/\\\_____\/\\\_____\//\\\______\/\\\_____\/\\\____________\/\\\_____\/\\\__\//\\\\\\_\/\\\___________\/\\\_____/\\\___\///\\\__/\\\_________\/\\\_______  
       _______\/\\\_____\/\\\______\//\\\__/\\\\\\\\\\\_\/\\\\\\\\\\__/\\\\\\\\\\\_\/\\\___\//\\\\\_\/\\\\\\\\\\\\\_\/\\\\\\\\\\/______\///\\\\\/__________\/\\\_______ 
        _______\///______\///________\///__\///////////__\//////////__\///////////__\///_____\/////__\/////////////__\//////////__________\/////____________\///________
*/ 
// #trilinedot

		// only draw when length > 2
		// every second point draws a tri from ith to previous and ahead
		// i is offset by len%2, so at 4th do -1. (len-1)%2
		// if obj is static pat could be pregen
		// after removing center (mem_log[i][2]-1)%2 => (mem_log[i][2]-2)%2 => mem_log[i][2]%2


		// I could only do a 2d alg ig
		// maybe clip objs entire inside?
		// hardest of them all


function drawTriangleF(ctx, i, k)
{
	drawTriangle(ctx,
	m1.data[8*k+mem_log[i][0]],
	m1.data[8*k+mem_log[i][0]+1],
	m1.data[8*k+mem_log[i][0]+4],
	m1.data[8*k+mem_log[i][0]+5],
	m1.data[8*k+mem_log[i][0]+8],
	m1.data[8*k+mem_log[i][0]+9],
	rgbas_tri_f[k%3]);
}

function drawLineF(ctx, i, j, c, lw)
{
	drawLine(ctx, c, lw,
	m1.data[4*j+mem_log[i][0]],
	m1.data[4*j+mem_log[i][0]+1],
	m1.data[4*(j+1)+mem_log[i][0]],
	m1.data[4*(j+1)+mem_log[i][0]+1]);
}

function fillDotF(ctx, i, j, c)
{
	fillDot(ctx, c,
	m1.data[4*j+mem_log[i][0]],
	m1.data[4*j+mem_log[i][0]+1],
	Math.round(m1.data[4*j+mem_log[i][0]+2]*2+0.5),
	Math.round(m1.data[4*j+mem_log[i][0]+3]*2+0.5));
}

// replace at some point?
function drawLineF_preview(ctx, i, j, c, lw)
{
	drawLine(ctx, c, lw,
	(m1.data[mem_sum+mem_t_sum+m_ref_log[i][0]+4*j]-in_win_wc)/s_fov*64+in_win_wc+menu_objpreview_pos[0],
	(m1.data[mem_sum+mem_t_sum+m_ref_log[i][0]+4*j+1]-in_win_hc)/s_fov*64+in_win_hc+menu_objpreview_pos[1],
	(m1.data[mem_sum+mem_t_sum+m_ref_log[i][0]+4*(j+1)]-in_win_wc)/s_fov*64+in_win_wc+menu_objpreview_pos[0],
	(m1.data[mem_sum+mem_t_sum+m_ref_log[i][0]+4*(j+1)+1]-in_win_hc)/s_fov*64+in_win_hc+menu_objpreview_pos[1]);
}

/*var rgba_r = "rgba(220, 73, 73, 1)";
var rgba_g = "rgba(24, 122, 24, 1)";
var rgba_b = "rgba(73, 73, 220, 1)";
var rgba_w = "rgba(255, 255, 255, 1.0)";
var rgba_w_flr = "rgba(222, 222, 222, 0.8)";
var rgba_y = "rgba(240, 240, 50, 1.0)";
var rgba_o = "rgba(245, 213, 63, 1.0)";
var rgba_ch = "rgba(50, 200, 50, 0.9)";
var rgba_lp = "rgba(40, 40, 40, 0.75)";

var rgba_dgray = "rgb(12, 12, 12)";
var rgba_gray = "rgb(17, 17, 18)";

var rgba_lgray = "rgba(222, 222, 222, 0.3)";
var rgba_ldgray = "rgba(85, 85, 85, 0.3)";
var rgba_otext = "rgba(194, 122, 52, 1.0)";
var rgba_dtext = "rgba(155, 155, 155, 1.0)";
var rgba_cindi = "rgb(183, 167, 101)";
var rgba_cindig = "rgb(152, 106, 179)";
var rgba_cindiglite = "rgba(0, 0, 0, 0.3)";
var rgba_cindiga = "rgba(152, 106, 179, 0.9)";

var rgbas = [rgba_r, rgba_g, rgba_b, rgba_w, rgba_o];
var rgbas_link = [rgba_y, rgba_b, rgba_r, rgba_cindiga, rgba_lgray, rgba_g]; // main for loop
var rgbas_trans = [rgba_lgray, rgba_g];


var rgba_w_tri1 = "rgba(130, 130, 130, 1)";
var rgba_w_tri2 = "rgba(120, 120, 120, 1)";
var rgba_w_tri3 = "rgba(105, 105, 105, 1)";
var rgba_w_tri4 = "rgba(90, 90, 90, 1)";

var rgba_w_trio1 = "rgba(130, 130, 130, 0.5)";
var rgba_w_trio2 = "rgba(120, 120, 120, 0.5)";
var rgba_w_trio3 = "rgba(105, 105, 105, 0.5)";
var rgba_w_trio4 = "rgba(90, 90, 90, 0.5)";
var rgba_invis = "rgba(0, 0, 0, 0)";*/

/*
 *
    so now all I have to do is make basic functions for tri's, lines, dots
    when looping through m1 data make sure to do everything possible per 1 loop
    make separate data to be drawn last.

    move drawSegment up here

    i need to start writing the code in my vertex shader now !!!

    there's probably a way to use c to create the data from the m1.data
 *
 */

const vertexBuffer = gl.createBuffer();

var _all_lock_colors = [ [0.960, 0.85, 0.46, 1.0], [0.3, 0.3, 1.0, 1.0], [1.0, 0.3, 0.3, 1.0] ];

// So here I draw lines. Passing true object i'th
function drawSegment(vertices, mi)
{
	if (mi >= 0)
	{
	    if (mi == obj_cyc && mi > world_obj_count) //
	    {
	    	gl.uniform4fv(colorUniformLocation, [0.960, 0.85, 0.46, 1.0]);
	    } else
	    {
	    	gl.uniform4fv(colorUniformLocation, [1.0, 1.0, 1.0, 1.0]);
	    }
    	if (mi == 12) {gl.uniform4fv(colorUniformLocation, [0.2, 1.0, 0.2, 1.0]);}
	} else
  {
		switch(mi)
		{
			case -1:
				gl.uniform4fv(colorUniformLocation, [0.3, 0.3, 1.0, 1.0]);
				break;
			case -2:
				gl.uniform4fv(colorUniformLocation, [0.2, 0.5, 0.2, 1.0]);
				break;
		}
	}

	if (_all_lock!=0)
	{
		if (mi == obj_cyc || mi == _all_lock_i)
		{
			gl.uniform4fv(colorUniformLocation, _all_lock_colors[_all_lock]);
		}
	}
  gl.lineWidth = 1;

  // Set the single color as a uniform variable
  //gl.uniform4fv(colorUniformLocation, [1.0, 1.0, 1.0, 1]);

  // Create and bind a buffer to hold the vertex data
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  // gl.enableVertexAttribArray(positionAttrib);

  gl.drawArrays(gl.LINE_STRIP, 0, vertices.length / 2);

  // gl.disableVertexAttribArray(positionAttrib);
  
}

function drawTriangles(tris)
{
  // var colorLocation = gl.getUniformLocation(shaderProgram, "uColor");
  gl.uniform4fv(colorUniformLocation, [0.3, 0.3, 0.3, 1.0]);

  // Draw the triangles
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, tris, gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  // gl.enableVertexAttribArray(positionAttrib);

  gl.drawArrays(gl.TRIANGLES, 0, tris.length / 2);

  // gl.disableVertexAttribArray(positionAttrib);
}

function drawPoints(_pnts, mi)
{
  
    if (mi > 2 && mi < 6)
    {

      if (mi-3 != pln_cyc) {return;}

      switch((mi-3))
      {
        case 0:
          gl.uniform4fv(colorUniformLocation, [1.0, 0.2, 0.2, 1.0]);
          break;
        case 1:
          gl.uniform4fv(colorUniformLocation, [0.2, 1.0, 0.2, 1.0]);
          break;
        case 2:
          gl.uniform4fv(colorUniformLocation, [0.2, 0.2, 1.0, 1.0]);
          break;
      }
    } else {gl.uniform4fv(colorUniformLocation, [0.2, 0.2, 0.2, 0.3]);}

  // Create and bind a buffer to hold the vertex data
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, _pnts, gl.STATIC_DRAW);

  // Set the attribute pointer
  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
  // gl.enableVertexAttribArray(positionAttrib);

  // Draw the points
  gl.enable(gl.POINT_SPRITE);
  gl.drawArrays(gl.POINTS, 0, _pnts.length / 2);
  // gl.disableVertexAttribArray(positionAttrib);
  
}

function drawLines()
{

  var start, size, end;
  for (var i = m_objs.length-1; i >= 0; i--)
  {
    if (modIndex[i] > world_obj_count)
    {
      _si = (Math.floor((mem_log[modIndex[i]][2] - 1) / 2) - mem_log[modIndex[i]][2] % 2) - 1;

      if (_si > 0) {
          _triverts = new Float32Array(_si * 6 + 6);
      } else {
          _triverts = new Float32Array(6);
      }

      for (var k = _si; k >= 0; k--)
      {
          if (m1.data[8 * k + mem_log[modIndex[i]][0] + 3] < 0 ||
              m1.data[8 * k + mem_log[modIndex[i]][0] + 7] < 0 ||
              m1.data[8 * k + mem_log[modIndex[i]][0] + 11] < 0) {
              continue; // skip
          }
          if (Math.abs(m1.data[8 * k + mem_log[modIndex[i]][0]]) > 1.0) { continue; }

          _triverts[k * 6] = m1.data[8 * k + mem_log[modIndex[i]][0]];
          _triverts[k * 6 + 1] = -m1.data[8 * k + mem_log[modIndex[i]][0] + 1];

          _triverts[k * 6 + 2] = m1.data[8 * k + mem_log[modIndex[i]][0] + 4];
          _triverts[k * 6 + 3] = -m1.data[8 * k + mem_log[modIndex[i]][0] + 5];

          _triverts[k * 6 + 4] = m1.data[8 * k + mem_log[modIndex[i]][0] + 8];
          _triverts[k * 6 + 5] = -m1.data[8 * k + mem_log[modIndex[i]][0] + 9];
      }

      drawTriangles(_triverts);

    }

    if ( (modIndex[i] < 3 && modIndex[i] != 1) || (modIndex[i] > 5 && modIndex[i] != 1) )
    {
      vertices = [];

      start = mem_log[modIndex[i]][0];
      size = mem_log[modIndex[i]][1];
      end = start + size;
      // for (var j = mem_log[d_i][2]-2; j >= 0; j--) 
      // for (let j = end - 8; j >= start; j -= 4)
      for (let j = start; j < end - 4; j += 4)
      {
          if (m1.data[j + 3] < 0)
          {
              if (vertices.length > 0)
              {
                  // Draw the lines for the current segment
                  drawSegment(vertices, modIndex[i]);
                  vertices.length = 0; // Clear the vertices array
              }
          } else
          {
              // x, y
              vertices.push(m1.data[j], -m1.data[j + 1]);
          }
      }
      // Draw the lines for the last segment
      if (vertices.length > 0)
      {
          drawSegment(vertices, modIndex[i]);
      }
    }

    _si2 = mem_log[modIndex[i]][2];
    _pts = new Float32Array(_si2 * 2);

    let i0 = 0;
    let j0 = 0;
    let dataIndex = mem_log[modIndex[i]][0];

    while (i0 < _si2 * 4)
    {
      if (m1.data[dataIndex + 3] >= 0)
      {
        _pts[j0] = m1.data[dataIndex];           // x
        _pts[j0 + 1] = -m1.data[dataIndex + 1];  // y
        j0 += 2;
      }
       dataIndex += 4;
       i0 += 4;
    }

    drawPoints(_pts, modIndex[i]);

  }

  for (var i = 0; i < mem_t_log.length; i++)
  {
      vertices = [];
      
      start = mem_sum;
      size = mem_t_sum;
      end = start + size;
      
      for (let j = start; j < end; j += 4)
      {
          // Check if z is less than 0
          if (m1.data[j + 3] < 0) {
              if (vertices.length > 0)
              {
                  // Draw the lines for the current segment
                  drawSegment(vertices, -1);
                  vertices.length = 0; // Clear the vertices array
              }
          } else
          {
              // x y
              vertices.push(m1.data[j], -m1.data[j + 1]);
          }
      }
      // Draw the lines for the last segment
      if (vertices.length > 0)
      {
          drawSegment(vertices, -1);
      }
  }

    for (var i = 0; i < m_ref_log.length; i++)
    {
        vertices = [];
        
        start = mem_sum+mem_t_sum;
        size = m_ref_log[0][1];
        end = start + size;

        // Extract x and y coordinates for the current chunk
        for (let j = start; j < end - 4; j += 4)
        {

        	// ratio that branches capping like /\
        	// always apply ratio relative to what is smallest largest such that 
        	// largest/smallest * shortest dimension. keeping it square.

            // vertices.push(m1.data[j]*(in_win_w/in_win_h)/s_fov+0.9, -m1.data[j + 1]/s_fov+0.8);
           vertices.push(m1.data[j]/s_fov, -m1.data[j + 1]/s_fov);

        }
        // Draw the lines for the last segment
        if (vertices.length > 0)
        {
            drawSegment(vertices, -2);
        }
    }
}

// var lineVertices;
// function drawSegment(vertices)

//     // Set the single color as a uniform variable
//     gl.uniform4fv(colorUniformLocation, [1.0, 1.0, 1.0, 1]);

//     // Create and bind a buffer to hold the vertex data
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

//     // Set the attribute pointer for position
//     gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

//     // Enable the position attribute
//     gl.enableVertexAttribArray(positionAttrib);

//     // Draw each line segment individually using triangles with a diagonal offset
//     for (let i = 0; i < vertices.length / 2 - 1; i++) {
//         const lineWidth = 2.0 / canvas.width + 0.001; // Adjust based on canvas size
//         const offset = lineWidth / 2; // Diagonal offset
//         const _r = (in_win_h/in_win_w);

//         lineVertices = new Float32Array([
//             vertices[i * 2] - offset*_r, vertices[i * 2 + 1] - offset,
//             vertices[i * 2 + 2] - offset*_r, vertices[i * 2 + 3] - offset,
//             vertices[i * 2] + offset*_r, vertices[i * 2 + 1] + offset,
//             vertices[i * 2] + offset*_r, vertices[i * 2 + 1] + offset,
//             vertices[i * 2 + 2] - offset*_r, vertices[i * 2 + 3] - offset,
//             vertices[i * 2 + 2] + offset*_r, vertices[i * 2 + 3] + offset,
//         ]);

//         gl.bufferData(gl.ARRAY_BUFFER, lineVertices, gl.STATIC_DRAW);
//         gl.drawArrays(gl.TRIANGLES, 0, 6);
//     }

//     // Disable the attributes after drawing
//     gl.disableVertexAttribArray(positionAttrib);
// }


function drawIt()
{
	Compute(m1);
	updateDrawMap([obj_cyc,12,3,4,5]);

	gl.clear(gl.COLOR_BUFFER_BIT);
	
	drawLines();


	
	/*

	ctx.clearRect(0, 0, in_win_w, in_win_h);


	// Draw packed verts
	//for (var i=1; i<m_objs.length; i++) // i find object
	// for (var i = m_objs.length-1; i >= 0; i--)
	for (var n = m_objs.length-1; n >= 0; n--)
	{
		d_i = modIndex[n];

		if (stn_draw[1]) // Tris
		{
			if (d_i>world_obj_count-1)
			{	
				if (mem_log[d_i][2]>2)
				{
					//for (var k=0; k<Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2; k++) //-(mem_log[i][2]-1)%2 // can make log of floored points
					
					for (var k = (Math.floor((mem_log[d_i][2]-1)/2)-mem_log[d_i][2]%2)-1; k >= 0; k--)
					{
						//if (m1.data[8*k+mem_log[i][0]+3]>0 && m1.data[8*k+mem_log[i][0]+7]>0 && m1.data[8*k+mem_log[i][0]+11]>0)
						if (m1.data[8*k+mem_log[d_i][0]+3] > 0)
						{
							if (m1.data[8*k+mem_log[d_i][0]+7] > 0)
							{
								if (m1.data[8*k+mem_log[d_i][0]+11] > 0)
								{
									if (m1.data[8*k+mem_log[d_i][0]] > -_epsilon)
									{
										if (m1.data[8*k+mem_log[d_i][0]] < in_win_clip)
										{
											drawTriangleF(ctx, d_i, k);
										}
									}
								}
							}
						}
					}
				}
			}
		}

		//for (var j=0; j<mem_log[i][2]-1; j++) // Draw Lines & Points



		for (var j = mem_log[d_i][2]-2; j >= 0; j--)
		{
			if (m1.data[4*j+mem_log[d_i][0]+3] > 0) // Line clipping
			// if (1) // Clipping off
			{	
				if (m1.data[4*(j+1)+mem_log[d_i][0]+3] > 0) // Line clipping second point
				{
					if (m1.data[4*j+mem_log[d_i][0]] > -_epsilon) // Left side plane clip
					{
						if (m1.data[4*j+mem_log[d_i][0]] < in_win_clip) // Right side plane clip. Add top and bottom later.
						{		
							if (stn_draw[0])
							{
								if (d_i>world_obj_count-1 && j != mem_log[d_i][2]-2)
								{
									if (d_i==obj_cyc || d_i==_all_lock_i)
									{
										drawLineF(ctx, d_i, j, rgbas_link[_all_lock], 0.8);
									} else {
										drawLineF(ctx, d_i, j, rgba_w, 0.8);
									}
								}
							}

							if (d_i >= 6)
							{
								if (d_i <= 8)
								{
									if (j == 0)
									{
										drawLineF(ctx, d_i, j, rgbas[d_i-6], 0.5);
									}
								}
							}

							if (d_i == 2)
							{
								if (j != mem_log[d_i][2]-2)
								{
									drawLineF(ctx, d_i, j, rgba_w, 0.4);
								}
							}

							if (d_i==1)
							{
								fillDotF(ctx, d_i, j, rgba_w_flr);
							};

							// Center point

							if (key_map.tab || wpn_select==1 || !mouseLock)
							{
								if (d_i>world_obj_count)
								{
									if (j == mem_log[d_i][2]-2)
									{
										if (d_i==obj_cyc)
										{drawCircle(ctx, rgba_cindig, 2.5,
										 m1.data[4*j+mem_log[d_i][0]+4],
										  m1.data[4*j+mem_log[d_i][0]+5],
										   0.5*8*m1.data[4*j+mem_log[d_i][0]+2]+3);}
										if (d_i!=obj_cyc)
										{drawCircle(ctx, rgba_cindi, 2.5,
										 m1.data[4*j+mem_log[d_i][0]+4],
										  m1.data[4*j+mem_log[d_i][0]+5],
										   0.5*8*m1.data[4*j+mem_log[d_i][0]+2]+3);}
									}
								}
							}
							if (d_i>2)
							{
								if (d_i<6)
								{
									if ((d_i-3) == pln_cyc) // ayy 
									{
										if (m1.data[mem_log[d_i][0]+4*j+3] > 0)
										{
											drawDot(ctx, rgbas[pln_cyc], 0.9,
											 m1.data[4*j+mem_log[d_i][0]],
											  m1.data[4*j+mem_log[d_i][0]+1],
											   m1.data[4*j+mem_log[d_i][0]+2]+1); // dot planes rgba(102, 79, 185, 0.8)
										}
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
	for (var i = 0; i<m_t_objs.length; i++)
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
menu_obj_pos
	drawPanel(ctx, rgba_dgray, rgba_lgray, in_win_w-157, 10, 148, 150);

	// Draw preview obj
	
	for (var i = 0; i<m_ref_objs.length; i++)
	{
		for (var j = 0; j<m_ref_log[i][1]/4-2; j++)
		{
			drawLineF_preview(ctx, i, j, rgba_g, 0.8);
		}
	}
	


	// #INDICATORS

	// Last point of m_t_objs
	if (m_t_objs.length>0)
	{
		if (m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+3] > 0)
			{drawDot(ctx, rgba_lp, 1.3, m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]], m1.data[mem_sum+mem_t_log[mem_t_log.length-1][0]+1], 15);}
	}

	if (m1.data[mem_log[9][0]+3] > 0)
	{
		drawDot(ctx, rgbas_trans[trns_lock], 1.0, m1.data[mem_log[9][0]], m1.data[mem_log[9][0]+1], 8);
	}
	if (m1.data[mem_log[9][0]+3] > 0 && cursor_helper)
	{
		drawCircle(ctx, rgba_cindiglite, 16, m1.data[mem_log[9][0]], m1.data[mem_log[9][0]+1], 20); // goback
	}

	if (trns_lock)
	{
		if (m1.data[mem_log[10][0]+3] > 0)
			{drawDot(ctx, rgbas_trans[1], 1.0, m1.data[mem_log[10][0]], m1.data[mem_log[10][0]+1], 15);}
	}

	*/


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

function pointerOutsideWindow()
{
	// #incheck
	var _in = false;
	if ((mouseData[0] > menu_q_pos[0]) && (mouseData[0] < (menu_q_pos[0]+610)))
	{
		if ((mouseData[1] > menu_q_pos[1]) && (mouseData[1] < (menu_q_pos[1]+660)))
		{
			_in = true;
		}
	}

	if ((mouseData[0] > menu_obj_pos[0]) && (mouseData[0] < (menu_obj_pos[0]+menu_obj_size[0])))
	{
		if ((mouseData[1] > menu_obj_pos[1]) && (mouseData[1] < (menu_obj_pos[1]+menu_obj_size[1])))
		{
			_in = true;
		}
	}
	return !_in;
}


// scale a unit cube to the size of min/max

// really 6 pieces of information
// min & max of each axis so 3*2 querys

// while itor over w/ 4*i take min/max as two loops or do both for each axis at the same time.

		
function getMinMaxPairs(ar)
{
	// set the initial values to the first point.
	var ar_x_max = ar[0]; var ar_x_min = ar[0];
	var ar_y_max = ar[1]; var ar_y_min = ar[1];
	var ar_z_max = ar[2]; var ar_z_min = ar[2];

	// loop through ar and max/min -logic-> update val
	for (var i = 0; i<ar.length/4-1; i++) // divide by 4 to get point and remove encoded center
	{
		// if ar x > var max set var max to ar x, then do the min
		if (ar[i*4] > ar_x_max) {ar_x_max = ar[i*4];} 
		if (ar[i*4] < ar_x_min) {ar_x_min = ar[i*4];}

		// same shiz for y & z vals
		if (ar[i*4+1] > ar_y_max) {ar_y_max = ar[i*4+1];} 
		if (ar[i*4+1] < ar_y_min) {ar_y_min = ar[i*4+1];}
		
		if (ar[i*4+2] > ar_z_max) {ar_z_max = ar[i*4+2];} 
		if (ar[i*4+2] < ar_z_min) {ar_z_min = ar[i*4+2];}
	}
	return [ar_x_max-ar_x_min, ar_y_max-ar_y_min, ar_z_max-ar_z_min];
}

// @?@?@?@? Later refactor to general function for more interactive tools
function updatePreview()
{
	updateLook();
	//m_ref_objs_loadObj()

	// place updated data for preview

	// var _nar = new Float32Array(m_objs[obj_cyc].length);
	var _pre_ctr = meanctr_obj(m_objs[obj_cyc]);

	// for (var i = 0; i<_nar.length; i++)
	// {
	// 	_nar[i] = m_objs[obj_cyc][i];
	// 	//m_ref_objs[0] = m_objs[obj_cyc];
	// }
	// m_ref_objs[0] = _nar;

	m_ref_objs[0] = new Float32Array(m_objs[obj_cyc].length);

	// to retain i ref data reset sum to rebuild addrs and change size of obj at index.
	//m_ref_sum = 0;
	
	m_ref_log[0] = [0, m_ref_objs[0].length, obj_cyc];
	m_ref_sum = m_ref_objs[0].length;

	// go through m_ref_objs and rebuild log w/o preview (big change when generalized later)
	//var _pre_ctr = getctr_obj(obj_cyc);

	var _pair = getMinMaxPairs(m_objs[obj_cyc]); 
	var _scaler = 1/len3(_pair)*0.7;
	var _tp, _np;

	for (var i = 0; i<m_ref_log[0][1]/4-0; i++) // HOLY MOLY -1 -> 0 => center used for 2d => most insane work around I have ever done
	{
		_tp =
		[
			( m_objs[obj_cyc][i*4]   - _pre_ctr[0] )*_scaler,
			( m_objs[obj_cyc][i*4+1] - _pre_ctr[1] )*_scaler,
			( m_objs[obj_cyc][i*4+2] - _pre_ctr[2] )*_scaler
		]

    // Okay so this is batshit insane I need to go back to moving 2d correctly??? fuck i'm missing something simple

		_tp = rot_x_pln(_tp, 0.2);
		_tp = rot_z_pln(_tp, 0.2);
		_tp = rot_y_pln(_tp, 0.001*Date.now()%10000); // holy joly

    _tp[0] = _tp[0]+3.1;
    _tp[1] = _tp[1]-1.1;


		_np = quatRot( _tp, _viewq );

		// obj points: f - i is 0
		m_ref_objs[0][i*4]   = _np[0] + ( player_pos[0]-f_look[0]*33 );
		m_ref_objs[0][i*4+1] = _np[1] + ( player_pos[1]-f_look[1]*33 );
		m_ref_objs[0][i*4+2] = _np[2] + ( player_pos[2]-f_look[2]*33 );
		m_ref_objs[0][i*4+3] = m_objs[obj_cyc][i*4+3];
	}
}

function Compute(init_dat)
{
	m_obj_offs[12][0] = _lp_world[0];
	m_obj_offs[12][1] = _lp_world[1];
	m_obj_offs[12][2] = _lp_world[2];
	m_obj_offs[12][3] = grid_.scale_f/2.0;

	ctx.imageSmoothingEnabled = false;
	ctx.lineCap = "butt";

	if (obj_cyc != obj_cyc_i)
	{
		updateList(objListConst(), "list_objectSelect");
		obj_cyc_i = obj_cyc;
	}

	if (key_map.shift && key_map.r) // Move to fn later
	{
		rotateObject(0, stn_rotation[0]);
	}

	if (mouseLock && key_map["5"] && runEvery(150)) // Move to fn later
	{
		mirrorOverPlane();
	}


	if (mouseLock && key_map["6"] && runEvery(300)) {expand_obj(obj_cyc);}

	if (key_map.l && runEvery(300)) {link_obj(obj_cyc, stn_link_tool);}

	if ((key_map.q || key_map.enter) && runEvery(220)) {pointerLockSwap();}


	if (mouseLock && key_map["7"] && runEvery(300))
	{
		createCircleAtCursor();
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
				if (!stn_trns[2]) {m_obj_offs[trns_obj_i][2] = _fd[2];}
			}
		}
	}


	if (key_map.h && runEvery(200))
	{
		setCursorToObjCenter();
	}

	// Delete obj by obj cycle & fix memory
	if (!trns_lock)
	{
		if (key_map.shift) //320
		{if (key_map.x && runEvery(320)) {del_obj(obj_cyc);}
		} else if (key_map.x && !del_obj_lock)
		{del_obj(obj_cyc); del_obj_lock = 1;}

		if (key_map.c && runEvery(300)) {editSelectedObject();}
	}

	if (key_map.x == false) {del_obj_lock = 0;}

	//if (key_map.arrowdown && runEvery(200)) {if (obj_cyc==m_objs.length-1) {obj_cyc=0} else {obj_cyc++;}}
	//if (key_map.arrowup && runEvery(200)) {if (obj_cyc==0) {obj_cyc=m_objs.length-1} else {obj_cyc-=1;}}

	if (key_map.e && runEvery(120)) {mem_t_mov(); key_map.e = false;} // m_t_objs.length = 0; mem_t_log.length = 0; obj_cyc = mem_log.length-1;
	
	if (key_map.p && runEvery(350)) {if (mouseLock) {pointerLockSwap();} downloadSaveFile();}


	if (key_map.n && runEvery(500)) {playerChangeMovementMode();}
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

	if (mouseLock)
	{
		if (key_map.lmb || key_map.f || key_map.y)
		{
			updateLook();
			_inter = lpi(_plr_dtp, player_pos, _pp, _nplns);
		}
	}

	// if (m_objs.length > tse && tse!=0)
	// {
		if (wpn_select==3)
		{
			_c =
			[
				m_objs_ghost[tse][mem_log[tse][1]-4],
				m_objs_ghost[tse][mem_log[tse][1]-3],
				m_objs_ghost[tse][mem_log[tse][1]-2]
			];

			for (var i=0; i<mem_log[tse][2]-1; i++)
			{
				_gp =
				[
					m_objs_ghost[tse][i*4]+20+Date.now()%3/5*key_map.lmb-key_map.rmb*20,
					m_objs_ghost[tse][i*4+1]+30-key_map.rmb*20,
					m_objs_ghost[tse][i*4+2]+32+Date.now()%3*key_map.lmb+key_map.rmb*30
				];

				// New attempt w/ quaternions
				// i tried using rotation around an arbitrary axis but this never works out
				// i had some logic to fake the continuity but 1 frame events were unfixable.

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


	updatePreview();


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
			grid_.scale_ar[1] = grid_.scale_f;
			grid_.scale_ar[2] = grid_.scale_f;
			break
		case 1:
			grid_.scale_ar[0] = grid_.scale_f;
			grid_.scale_ar[2] = grid_.scale_f;
			break
		case 2:
			grid_.scale_ar[0] = grid_.scale_f;
			grid_.scale_ar[1] = grid_.scale_f;
			break
	}


 	// check nan other place? like lpi?
 	if (mouseLock == 1)
 	{
		if (!isNaN( _inter[0])) {_inter_rnd = [roundTo(_lp[0], grid_.scale_ar[0]), roundTo(_lp[1], grid_.scale_ar[1]), roundTo(_lp[2], grid_.scale_ar[2])];}
 	}



	switch(wpn_select) //#WEAPONSCRIPT
	{
		case 0:

			if (key_map.tab && runEvery(75)) // Fix this by separating by in menu / in game
			{
				if (mouseLock)
				{
					// Menu mouse
					obj_cyc = findbyctr_obj(0, 0);
				}
				else
				{
					// mouseLock
					obj_cyc = findbyctr_obj(in_win_wc-mouseData[0], in_win_hc-mouseData[1]);
				}
			}

			if (key_map.rmb && runEveryLong(75))
			{
				if (!mouseLock)
				{
					// mouseLock
					obj_cyc = findbyctr_obj(in_win_wc-mouseData[0], in_win_hc-mouseData[1]);
				} else {
					select2dpoint(0, 0);
					updateGrid();
				}
			}

			if (key_map.lmb && !mouseLock) //  && runEveryLong(75)
			{
				if (pointerOutsideWindow())
				{
					select2dpoint(in_win_wc-mouseData[0], in_win_hc-mouseData[1]);
					updateGrid();
				}
			}

			if (key_map.tab && !mouseLock && runEveryLong(75))
			{
				if (pointerOutsideWindow())
				{
					obj_cyc = findbyctr_obj(in_win_wc-mouseData[0], in_win_hc-mouseData[1]);
				}
			}


			//if ((key_map.rmb && mouseLock) || (key_map.lmb && !mouseLock)) {cursor_helper = 1;} else {cursor_helper = 0;}

			if (key_map.lmb && mouseLock)
			{	
				cursor_helper = 0;
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
							cloneObjSelected();
							trans_obj(m_objs.length-1);
							break;
						case 1:
							moveObject();
							cloneObjSelected();
							trans_obj(m_objs.length-1);
							break;
					}
				}
				if (!key_map.shift && !trns_lock)
				{
					cloneObjSelected();
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

				if (wpn_1) {m_obj_offs[obj_cyc] = roundPTo(sub(sub(player_pos, scale(f_look, wpn_1_d)), wpn_1_mc), grid_.scale_f);}

				if (key_map.lmb == false && wpn_1)
				{
					wpn_1 = 0;
					finishTrnsAnim(obj_cyc);
					m_obj_offs[obj_cyc] = [0,0,0,1];
				}

				if (key_map.t && key_map.lmb == false && obj_cyc>world_obj_count && runEvery(350)) // Make fn handle move & dupe? Make dupes place where holding hologram
				{
					m_objs_loadPoints(cloneObj(m_objs[obj_cyc]));
					obj_cyc = m_objs.length-1;
				}
			}
			break;

		case 2:
			if (key_map.lmb)
			{
				switch(stn_paint[2])
				{
					case false:
						if (paint_n < stn_paint[1])
						{
							paint_d = len3(sub(_inter, _paint_track));
							if (paint_d > stn_paint[0])
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
						if (paint_d > stn_paint[0])
						{
							m_t_objs_loadPoint(new Float32Array([_inter[0], _inter[1], _inter[2], 1.0]));
							_paint_track[0] = _inter[0];
							_paint_track[1] = _inter[1];
							_paint_track[2] = _inter[2];
						}
						break;
				}
			}
			if (stn_paint[2] && key_map.lmb == false) {mem_t_mov();} // Finish draw !
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
		returnCursorToGround();
	}

	// Teleport
	if (key_map.y && runEvery(350)) {teleport_plr();}

	if (key_map.m && runEvery(200))
	{
		var _t_obj = splitObj(m_objs[obj_cyc]);
		var _t_d = len3(sub(_t_obj[0], _t_obj[1]));
		console.log(_t_d);
		grid_.scale_f = _t_d;
		updateGrid();
	}

	// Send array as easy to copy for float32array
	if (key_map["/"] && runEvery(150))
	{
		var _d = m_objs[obj_cyc]; // String
		var _f = "[";
		var _v = 0;
		for (var i=0; i<_d.length-4; i++)
		{
			if ( (i+1)%4 == 0 ) {_v = 0;} else {_v = _d[i].toFixed(4);}
			if (i!=_d.length-5) {_f = _f+_v+",";} else {_f = _f+_v;}
			if (i==_d.length-5) {_f = _f+"]";}
		}
		console.log(_f); // Do not remove
	}


	
/*

	

*/


	_pp = [_lp[0], _lp[1], _lp[2]]; // Point on plane = last point placed
	switch(pln_cyc)
	{
		case 0:

			// m_obj = ghost+_inter_rnd
			// add on press or r. runtime fix pls.
			for (var i = 0; i<=mem_log[3][2]; i++)
			{
				m_objs[3][4*i]  =  m_objs_ghost[3][4*i] + _lp_world[0];
				m_objs[3][4*i+1] = m_objs_ghost[3][4*i+1] + _lp_world[1];
				m_objs[3][4*i+2] = m_objs_ghost[3][4*i+2] + _lp_world[2];
			}
			break;
		case 1:

			for (var i = 0; i<=mem_log[4][2]; i++)
			{
				m_objs[4][4*i]  =  m_objs_ghost[4][4*i] + _lp_world[0];
				m_objs[4][4*i+1] = m_objs_ghost[4][4*i+1] + _lp_world[1];
				m_objs[4][4*i+2] = m_objs_ghost[4][4*i+2] + _lp_world[2];
			}
			break;
		case 2:

			for (var i = 0; i<mem_log[5][2]+1; i++)
			{
				m_objs[5][4*i]  =  m_objs_ghost[5][4*i] + _lp_world[0];
				m_objs[5][4*i+1] = m_objs_ghost[5][4*i+1] + _lp_world[1];
				m_objs[5][4*i+2] = m_objs_ghost[5][4*i+2] + _lp_world[2];
			}
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


GLSLfragmentShader.run(init_dat,

	`void main(void) {

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
			after_per.x/after_per.w*_fov,
			after_per.y/after_per.w*_fov*(_wc/_hc),
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
	updateList(objListConst(), "list_objectSelect");

	Compute(m1);
	updateGrid();

	m_obj_offs[tse] = [0,-400,0,1]; // Move gun to above
	drawIt();

	obj_cyc = 2; // Temp fix

	setBackgroundColor(_bg_default);

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
