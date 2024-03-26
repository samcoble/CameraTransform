
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
  
  #todolist
  
    -- physics engine should be possible but first I need to fix my triangles
    -- collision detections will need to borrow from the same idea of culling back faces
    -- but I will replace the tri actually with a bounding box
    -- so I first do check if they are close together then use dist to plane w/ dot simple
    -- if anything checks in adjust the objects velocities (rotational and position)
    -- collision's determine the angular velocity by distance from center
    -- apply standard gravity ticks
    -- collisions must always result in energy lost
    -- maybe all velocities and acceleration can be computed on the gpu or in a worker or both.
    -- a worker's latency may not matter if only left to manage some layers not visually noticeable
    -- the ground is defined by a positional min/max (no loop if below threshold)
    -- the ground can apply more dampening than obj to obj
    -- default amount of inverse angular velocity
    --
    -- to get started setup the buffers
    -- box collision function and tests
    -- 
    -- 13.25, 13.625, 74.875
    -- 

  @?@?@
  ?@?@?
  @?@?@

      -- Ray tracing used for z buffer must be parallelized 
      -- finish center inds?
      -- need parallel array manager to auto manage all the krap
      -- Menu updates need to be more efficient. Primarily updating selected item to curb tab alg proc
      -- Float32Array already contains byteLength and byteOffset.
      -- Match all of my data structure to use Float32Array to remove all type conversions
      -- fix preview image to offset w/ 2d forced square w/ check
			-- rewrite the select2dpoint function
        - needs system to provide hologram ui
			-- if encoded center is within plane of poly's captures some overlap
			-- engine space
			-- generate dir vec curves

			-- nested point sequences at overlap point should be fairly easy. take note of logic
				- think i got it here

					- placing loop at a point implies to keep sequence continuity one additional point must be placed after loop insertion
					- len of loop does determine the need for the additional. I assume none or 1. may be 1 or 2.
					- logic diagram could provide more direct code struct

			-- unique ids for objs will help w/ identical objs in future?

			-- lock point offsets grid? could fix a lot of things w/ rmb select
			-- lmb in free mode is setting plane to inter_rnd for some reason..
				- when point locked the lpi is not being calculated with the arbitrary offset essentially

			-- ? intersection reveal
				- doesn't have to be run all the time if the purpose is to model
				- line's checked for intersection within some range of it's len.

			-- just noticed save data corrupted by single point data
				- fuqk
        - temp fix is making all 1 point objs 2 equal points w/ center ig

			-- string dat find sys or mem addr sys?
			-- all my functions relative to the plane can be replaced with a general obj orient fn.

			-- Overlapping point issues BREOKEKN
				- fuqk
					take circle size and make size a fn
						fn sets rel to z AND index
						goal here is to have circle size data that maps to the screen
							use data to reveal bounding areas to hover over to select overlapping selection of objs
								don't i already have a good z buffer.. wait

            might have the answer to this now with the new manual 2d gen circles

			-- unit vector line conversion method for arc len
			-- edit obj
			-- Correctly log changed information that can be applied to reverse.

@?@?@
?@?@?
@?@?@

	Random idea ::
		if I can clip a region of polygon's in 2d space creating two sets
			-> i could then display them at two different fov's creating a zoomed region for scopes/sights

	So I guess I need to learn geometric algebra now. Quaternions are not even meta anymore.

	Wrap data increase to hold more layers
		r g b a comes first
		move groups after

	Push to top of stack function

	Obj cut hole { i could try using the link script on to the hole... }
		i keep reusing my linear link. need to learn poly fill alg
		i need to implement geometric obj creation.
			with more layers of encoded data i can keep logs of what obj's are fundamentally

	All middle points of lines are free as I have encoded centers. Highlight center point on any obj w/ 2, 3 pts.
	Skeletal animation -> point interpolation. Long way to go I don't have interp maps yet. Do I really need to interp packed data??

I can make real physgun by compounding quaternions and ray trace
Make the planetary ico 
Assault cube old code

.reduce is a method that accumulates the values of an array into a single value (in this case, the sum of the squared components).

If rotations use dir vec I can plug in my normal map to reorient the grid to surface.
  ?: how do you make a grid ON a plane (my grid only reveals what rounding looks like)
    maybe try reversing the process.
    if I have a grid of rounded points and I rotate the grid to a new plane: rot(round(point))
    if poly plane is assumed a normal coordinate system moving to a new plane: rot(round(point))
    the procedure of rotation around an arbitrary axis applies to many things,
      ?: point on a plane -> rotate to original world plane at O -> round(point) -> apply inverse rotation

Instead of clipping for side planes I could draw lines in two directions determined if x1>x2.... lol NO CLIPPING NEEDED
  for a lil extra travel just offset

modulo distributes with switch with for loop ez wow for ex:

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

	- Make ray trace fn use inputs so I can call it to get data anywhere.

	- Cut obj in half by plane!
		intersect/ray trace w/ plane between pairs. Just remove any other points and keep the intersections. Not sure if I can do this so easily w/ point order being critical

	- Bezier tool

	- interpolation framework for anim -> prerender

	- For linking lines a tool to collapse a line into one axis would be fantastic. For a dynamic tool: use start & end to define the line and move points to that line.
	- Spiral tool OR line gen tool w/ inputs => same as spiral w/ the right settings

	- Enter key opens text overlay to search for function. goes like: [ENTER] type "link" [ENTER] -> link is member of table call it's function. Function stored in switch case calls obj_link();
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

- Button to output linear obj to console. Model gun with game -> put into game -> model game with gun -> put into gun

- The tab alg can be applied compression relative to center. like a 3d mesh impacting the screen creating a focal lense. this would actually slightly help differentiate object's that are close together IN 2D. maybe..

	Badly need to implement a struct system for tools generally such that every tool overrides some keys.
		Points should be a point tool (Place point - F)
		Circle tool (Place circle - F) (I need a later formula to compress a 4 point circle to align with the grid)
		Center Expand (Start/Finish applied as delta - F)
		Dynamic Expand (Applies compression/expansion with 3 input numbers)
		Rotate around Axis (For now input into box with deg. Use point and plane line)
		Stacker tool (Accepts distance and stacks) (Two input boxes)

	-	Use a bezier function of n points. Dynamic integral function to find the arc length. arc_l/n provides the sections to be influenced by perp vectors &&& the actual vertices of the curve. Divide by n and n/2. Go to n-n/2
	-	Maybe a separate self made api for handling the screen interface would be wise.
	-	It really needs 3d/2d simple text obj generation for real notepad capacity. Easier to just store the string in the bg.
	-	Effects and sounds.

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

// ctx.imageSmoothingEnabled = false;
// ctx.lineCap = "butt";

const pi = 3.141592653589793, // High definition PI makes a visible difference
      pi2 = 6.283185307179586,
      menuTime_int = 220,
      title_int = 420,
      player_speed = 0.5 * 0.7,
      player_speed_vert = 0.3 * 0.7, // Vertical travel speed
      player_speed_mult = 4 * 0.7; // Shift key

var fileName = "";
var world_obj_count = 0;
var _preview_scaler;
var _s_ratio;
var cursor_helper = 0;
var flag_loadingObject = 0;
var flag_inText = 0;
var functionRunList = [];
var flag_objModif = false;

var obj_folders = [],
    folder_names = [],
    folder_parents = [-1, 0, 0, -1], // -1 is no parent
    folder_toggle = [1, 0, 0, 1],
    folder_selected = 3; // Default folder

var keyVec = [],
    lookToggle = 0,
    player_pos = [0.0, -14, 30],
    hover_h = 11.5,
    lock_vert_mov = false,
    player_look_dir = [0, 0, 0],
    player_look_dir_i = [0, 0, 0],
    mouseData = [0.0, 0.0],  // rt data
    mouseDataS = [0.0, 0.0], // saved state
    mouseDataI = [0.0, 0.0], // initial
    mouseDataD = [0.0, 0.0], // delta
    mouseLock = 0,
    fov_slide = 1.1,
    s_fov = fov_slide * fov_slide * fov_slide / 20;

var wpn_select = 0,
    wpn_1,
    wpn_1_d,
    wpn_1_mc = [];

var del_obj_lock = 0,
    trns_lock = 0,
    trns_obj_i = 0, // replace w/ all lock
    _all_lock = 0, // Pass through color
    _all_lock_i = 0;

var paint_d = 0,
    paint_n = 0,
    _paint_track = [0.0, 0.0, 0.0];

// FPS
var _frames = 0,
    _date_now_fps = 0,
    _fps = 0;

var _epsilon = 300,
    in_win_clip,
    in_win_wh,
    in_win_hw,
    in_win_w,
    in_win_h,
    in_win_wc,
    in_win_hc;

// Timer
var date_now = 0,
    date_now_after = 0,
    date_now_preview = 0;

var pln_cyc = 1,
    obj_cyc = 0, // Selector
    obj_cyc_i = 0;

var grid_scale = 3,
    grid_scale_f = 8,
    grid_scale_ar = [8, 8, 8],
    grid_scale_d = 8;

var menu_q_size = [400, 800],
    menu_q_pos = [30, 240],
    menu_obj_pos = [0, 0],
    menu_obj_size = [],
    menu_objpreview_pos = [0, 0],
    menu_tab = 0,
    menu_wpn_pos = [155, 10];

var indices = [],
    distances = [],
    indexMapping = [],
    originalIndices = [],
    newIndex = {},
    modIndex = [],
    d_i = 0;

var _inter_rnd = [0.0, 0.0, 0.0],
    _oh = [0, 0, 0, 0],
    f_look = [0, 0, 0, 0],
    f_dist = [0, 0, 0, 0],
    _inter = [0, 0, 0, 0],
    _nplns = [0, 1, 0],
    _plr_dtp = [0, 0, 0];

var obj_normalMaps = [],
    rayInterMap = [],
    _rayLast = [];

var _gp = [0, 0, 0],
    _nps,
    tse = 11,
    _viewq = [];

var _touch_i = [0, 0],
    _touch_f = [0, 0],
    _touch_delta = [0, 0];


// IEMobile and BlackBerry users I got you fam.
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function updateMenuPos() // this stuff so bad jesus
{

  let _tempMe = document.getElementById("tree_allObjects").clientHeight;

  menu_obj_size = [200, 500, _tempMe+300]; // default & modified to include margins	
  menu_obj_pos = [in_win_w-200-in_win_w*0.01, in_win_h*0.5 - 0.5*menu_obj_size[2]];
 	menu_objpreview_pos = [in_win_wc-165/2, -in_win_hc+170/2]; // not sure what this does

	menu_q_pos = [in_win_w*0.01, in_win_h*0.5 - 0.5*menu_q_size[1]];
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
  in_win_wh = in_win_w/in_win_h;
  in_win_hw = in_win_h/in_win_w;

  _s_ratio = [1, in_win_wh];
	
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;
	resizeCanvas(in_win_w, in_win_h);
}

function setBackgroundColor()
{
  let _c = [
   _settings[6].settings[0],
   _settings[6].settings[1],
   _settings[6].settings[2]
  ];
	document.body.style.backgroundColor = "rgb(" + _c[0] + "," + _c[1] + "," + _c[2] + ")";
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
  j: false,
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
  escape: false,
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

var player_pos_i = [],
    mScreenMode = 0,
    mTimer = 0,
    dragCatch = 0;

const handleTouchStart = (event) =>
{
  mTimer = Date.now();
  mScreenMode = 0;
  dragCatch = 1;
 if (event.touches[0].clientX > in_win_wc)
 {
  select2dpoint(0,0);
 } else
 {
  mScreenMode = 1;
 }
}

const handleTouchMove = (event) =>
{
  if (dragCatch)
  {
    _touch_i[0] = event.touches[0].clientX;
    _touch_i[1] = event.touches[0].clientY;
    setPoint(player_look_dir_i, player_look_dir);
    setPoint(player_pos_i, player_pos);
    dragCatch = 0;
  }

    event.preventDefault();

    _touch_f[0] = event.touches[0].clientX;
    _touch_f[1] = event.touches[0].clientY;
    _touch_delta = sub2(_touch_f, _touch_i);

  // console.log(_touch_delta);

  switch(mScreenMode)
  {
    case 0:
      setPoint(player_look_dir, [ player_look_dir_i[0]+(_touch_delta[0]/in_win_w * pi * 2) , player_look_dir_i[1]-(_touch_delta[1]/in_win_w * pi * 2) , 0 ]);
    break;

    case 1:
      let _np = rot_y_pln(sub3(player_pos_i, _lp_world), (_touch_delta[0]/in_win_w * pi * 2));
      setPoint(player_pos, add3(_np, _lp_world));
      player_pos[1] = player_pos_i[1] + _touch_delta[1]/in_win_w*320;
      setPoint(player_look_dir, [ player_look_dir_i[0]-(_touch_delta[0]/in_win_w * pi * 2) , player_look_dir_i[1], 0 ]);
    break;
  }
};

const handleTouchEnd = () =>
{
  dragCatch = 0;
  // window.onload = requestFullscreen();
}

// function requestFullscreen()
// {
//   const elem = document.documentElement;
//   if (elem.requestFullscreen) { elem.requestFullscreen(); }
// }

if (isMobile)
{
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
}

onmousemove = function(e)
{
	if (mouseLock)
		{
			player_look_dir = [ player_look_dir[0]+0.4*(e.movementX/in_win_w * pi * 2) , player_look_dir[1]-0.4*(e.movementY/in_win_w * pi * 2) , 0 ];
		} else {mouseData[0] = e.clientX; mouseData[1] = e.clientY;}

	if (player_look_dir[0] > pi) [player_look_dir[0] = -pi]; // This is kinda wack need to refactor entire system for this
	if (player_look_dir[0] < -pi) [player_look_dir[0] = pi];
}

function isAlphaNumeric(c)
{
  return /^[a-zA-Z0-9\s.]$/.test(c);
}

// make fn to convert string to Float32Array
function stringToFloat32Array(s)
{
  let _r = [];
  for (let i = 0; i<s.length; i++)
  {
    if (isAlphaNumeric(s[i]))
    {
      _r.push(s.charCodeAt(i));
    }
  }
  return new Float32Array(_r);
}

function float32ArrayToString(ar)
{
  let _s = ar.length;
  let _r = "";
  
  for (let i=0; i<_s; i++)
  {
    _r = _r + String.fromCharCode(ar[i]);
  }
  return _r;
}

// make fn to return array of char arrays
function namesToArrays(n)
{
  let _r = [];
  for (let i = 0; i<n.length; i++)
  {
    _r.push(stringToFloat32Array(n[i]));
  }
  return _r;
}

folder_names.push("World Objects");
folder_names.push("Planes");
folder_names.push("Indicator");
folder_names.push("Objects");

obj_folders.push([]);
obj_folders.push([]);
obj_folders.push([]);
obj_folders.push([]);

// 58 & 1:28:00
// tau 9

// going to need a function maybe later auto reorganize internal data structure
// and folders get essentially reset to 0 1 2 3 4 5 in folder order in obj ref order linearized again.
// useless but a clean up essentially.

// delete object ref and remove from parallel arrays
function foldersDel(_i)
{
  let _s = obj_folders.length;
  for (let i=0; i<_s; i++)
  {
    let _s0 = obj_folders[i].length;
    for (let j=0; j<_s0; j++)
    {
      if (obj_folders[i][j] == _i)
      {
        obj_folders[i].splice(j, 1);
      }
      if (obj_folders[i][j] > _i)
      {
        obj_folders[i][j] = obj_folders[i][j] - 1;
      }
    }
  }
}

// move k
function moveK(_f, _k, _f2) // folder _f's _k -> bottom of folder _f2
{
  if (obj_folders[_f][_k] > world_obj_count)
  {
    let _nk = obj_folders[_f].splice(_k, 1)[0]; // [0] is the way 
    obj_folders[_f2].push(_nk);
  }
}

function moveKAbove(_f, _k, _f2, _i) // folder _f's _k -> above -> _i in folder _f2
{
  if (_k != _i && obj_folders[_f][_k] > world_obj_count)
  {
    let _nk = obj_folders[_f].splice(_k, 1)[0]; // [0] is the way 
    obj_folders[_f2].splice(_i, 0, _nk);
  }
}

// find how many refs to index and their index
function searchFolder(_f, _k)
{
  let _s = _f.length;
  let _r = [];

  for (let i = 0; i<_s; i++)
  {
    if (_f[i] == _k)
    {
      _r.push(i);
    }
  }
  return _r;
}

function getFolders(_i, _d) // folder _i -> every subfolder's index, _d -> return linear|array 
{
  let _r = [];
  let _b = [];
  let _z = [];

  _r.push(searchFolder(folder_parents, _i)); // root query

  _b = _r[0];
  while (_b.length != 0)
  {
    let _s = _b.length;
    let _r0 = [];

    // this becomes what it outputs
    for (let i = 0; i<_s; i++)
    {
      let _w = searchFolder(folder_parents, _b[i]);
      for (let j = 0; j<_w.length; j++)
      {
        _r0.push( _w[j] ); // maintain single array
      }
    }
    if (_r0.length != 0) {_r.push( _r0 )}; // log query
    _b = _r0; // set for next itor
  }

  // make linear for future search
  for (let i = 0; i<_r.length; i++)
  {
    for (let j = 0; j<_r[i].length; j++)
    {
      _z.push(_r[i][j]);
    }
  }

  return (_d>0) ? new Float32Array(_z) : _r;
}

// maybe have to check if parent -1
// points are moved and then folder pointers changed
// folder ar deleted and folder pointer list size change and sub 1 like usual

// folder delete can have option to delete obj inside as well
// folder delete function will have to empty it's content into it's parent folder pointer

function delFolder(_i)
{
  if (_i<4) {return false;}

  // get folders at ring 0
  let _f = getFolders(_i, 0)[0];
  let _s = _f.length;

  // move folders to root
  for (let i=0; i<_s; i++)
  {
    folder_parents[_f[i]] = -1;
  }

  // move folder content to user working dir obj_folders[3]
  _s = obj_folders[_i].length;
  for (let i=0; i<_s; i++)
  {
    obj_folders[(folder_parents[folder_selected]==-1) ? 3 : folder_parents[folder_selected]].push(obj_folders[_i][i]);
  }

  folder_parents.splice(_i, 1);

  // shift all folder pointers
  _s = folder_parents.length;
  for (let i=0; i<_s; i++)
  {
    if (folder_parents[i] >= _i)
    {
      folder_parents[i] = folder_parents[i]-1;
    }
  }

  // remove folder & parallel arrays
  obj_folders.splice(_i, 1);
  folder_names.splice(_i, 1);
  folder_toggle.splice(_i, 1);
  folder_selected = 3;
  updateTree(tree_allObjects);
}

// new folder function finally!
function treeModify(par)
{
  switch(par.func)
  {
    case 2:
      delFolder(folder_selected);
      break;

    case 1:
      folder_parents.push(-1); // set to root
      folder_toggle.push(1); // set open
      folder_names.push((typeof par.n!="undefined") && par.n!="" ? par.n : "New Folder"); // store name
      obj_folders.push([]); // assign array for indices
      folder_selected = obj_folders.length-1;
      updateTree(tree_allObjects);
      break;
  }
}

function inFolder(_k, _i) // check if folder _i is 'inside' folder _k
{
  let _r = false;
  let _f = getFolders(_i, 1);
  let _s = _f.length;

  for (let i = 0; i<_s; i++)
  {
    if (_f[i] == _k) {_r = true; break;}
  }
  return _r;
}

// set parent function attach to drag and drop.
function folderSetParent(_i, _k) // folder _i parent -> folder _k
{
  // not allowing use of default folders to store folders
  // prevent change of parent of default folders here
  if (_i<4 || _k<4) {return false;}

  if (!inFolder(_k, _i) && _k != _i)
  {
    folder_parents[_i] = _k;
  } // else here to log error to future log box
}

// make fn to accept m_obj and return same obj w/ w=i and remove center
function getObjData(_i)
{
  let _r = [];
  let _s = m_objs[_i].length;
  for (let i = 0; i<_s-4; i++)
  {
    if (i%4<3)
    {
      _r.push(m_objs[_i][i]);
    } else
    {
      _r.push(_i-world_obj_count-1);
    }
  }
  return _r;
}

// unitization of array containing arrays
function packArray(ar)
{
  let _r = [];
  let _l = ar.length;
  _r.push(_l); // store num of sections

  for (let i = 0; i<_l; i++)
  {
    _r.push(ar[i].length); // store sizes of sections
  }

  for (let i = 0; i<_l; i++)
  {
    let _lj = ar[i].length;
    for (let j = 0; j<_lj; j++)
    {
      _r.push(ar[i][j]); // store all data in order end to end
    }
  }
  return _r;
}

function unpackArray(ar)
{
  let _r = [];
  let _ad = ar[0] + 1;

  for (let i = 0; i<ar[0]; i++) //
  {
    _r.push(ar.slice(_ad, _ad+ar[1+i]));
    _ad += ar[1+i];
  }

  return _r;
}
  
function makeSave()
{
  let _r = [],
      _t = [],
      _o = [],
      _s,
      _c = 4; // default folder count

  // folder toggle
  _s = folder_toggle.length;
  _t.push( folder_toggle.slice(_c, _s) );
  
  // folder parents
  _s = folder_parents.length;
  _t.push( folder_parents.slice(_c, _s) );

  // folders
  _s = obj_folders.length;
  // let _qf = obj_folders.splice(3, _s-3);
  // obj_folders.push(_qf[0]);
  // _t.push( packArray(_qf) );
  _t.push( packArray(obj_folders.slice(_c-1, _s)) );

  // folder names
  _s = folder_names.length;
  _t.push( packArray(namesToArrays(folder_names.slice(_c, _s))) );

  // now prep _o w/ objs
  _s = m_objs.length;
  for (let i = world_obj_count+1; i<_s; i++) // using world count here
  {
    _o.push(getObjData(i));
  }

  // place _o
  _r.push( packArray(_o) );

  // place _t
  _r.push ( packArray(_t) );

  return new Float32Array(packArray(_r));
}

// obj load & unpack new
function loadSelect(_fi)
{
  if (key_map.shift)
  {
    // flag_loadingObject = 1;
    loadFile(_fi[0]);
  } else {
    // flag_loadingObject = 1;
    loadFile0(_fi[0]);
  }
  // should be replaced ...

  updateValueByPar("menu_status_l3", fileName);
}

function offsetArray(ar, b)
{
  let _s = ar.length;
  let _n = [];
  for (let i=0; i<_s; i++)
  {
    _n[i] = ar[i] + b;
  }
  return _n;
}

function returnSmallest(ar)
{
  // if (ar.length == 0) {return 0;}
  let _t = Number.MAX_VALUE;
  let _s = ar.length;
  for (let i=0; i<_s; i++)
  {
    if (ar[i] < _t) {_t = ar[i];}
  }
  return _t;
}

function returnSmallestInArrays(ar)
{
  let _t = Number.MAX_VALUE;
  let _s = ar.length;
  for (let i=0; i<_s; i++)
  {
    let _rs = returnSmallest(ar[i]);
    if (_rs < _t) {_t = _rs;}
  }
  return _t;
}

function loadFile0(_fi)
{
  if (_fi)
  {
    flag_loadingObject = 1;
    let _r = [];

    const _fr = new FileReader();
    _fr.onload = event =>
    {
      const _d = new Float32Array(event.target.result);
      _r.push(unpackArray( _d ));
      _r.push(unpackArray( _r[0][0] ));

      // unpack folder tree
      _r.push( unpackArray(_r[0][1]) ); // this [0]->toggle [1]->parent
      _r.push( unpackArray(_r[2][2]) ); // obj folders
      _r.push( unpackArray(_r[2][3]) ); // names

      // console.log(_r);
      
      // folder toggles
      let _s = _r[2][0].length;
      for (let i=0; i<_s; i++)
      {
        folder_toggle.push(_r[2][0][i]);
      }

      // parents
      _s = _r[2][1].length;
      let _s0 = folder_parents.length-4;
      for (let i=0; i<_s; i++)
      {
        if (_r[2][1][i] == -1)
        {
          folder_parents.push(-1);
        } else {
          folder_parents.push(_r[2][1][i]+_s0);
        }
      }
      
      // folder names
      _s = _r[4].length;
      for (let i=0; i<_s; i++)
      {
        folder_names.push(float32ArrayToString(_r[4][i]));
      }
      
      // console.log(_r[3]);
      // load folder arrays
      _s = _r[3].length; // array containing folder arrays : now 0 is folder 3
      let _s1 = m_objs.length;
      let _sml = returnSmallestInArrays(_r[3]);
      for (let i=0; i<_s; i++)
      {
        if (i==0)
        {
          let _s3 = offsetArray(_r[3][i], -(_sml)+_s1);
          let _s4 = _s3.length;
          for (let j=0; j<_s4; j++)
          {
            obj_folders[3].push( _s3[j] );
          }
        } else
        {
          obj_folders.push(offsetArray(_r[3][i], -(_sml)+_s1)); // and here
        }
      }
      // console.log(_r);
      
      // load objs
      for (let i=0; i<_r[1].length; i++)
      {
        // console.log(flag_loadingObject);
        m_objs_loadPoints( _r[1][i] );
        if (i==_r[1].length-1)
        {
          flag_loadingObject = 0;
        }
        if (i==_r[1].length-1) {updateNormalMaps();}
      }
    };

		_fr.readAsArrayBuffer(_fi);

    // setup name to splice w/ size
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
    _settings[8].settings[1] = fileName;
    updateTextByPar("menu_status_r2", _fn.slice(_si+1, _fn.length));
  }
  updateTree(tree_allObjects);
}

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
  // flag_loadingObject = 0;
}

function makeValidFileName(_i)
{
  const _bads = /[\/:*?"<>|\.]/g;
  const _n = _i.replace(_bads, '_');

  if (!_n.trim()) {return "memspc_";}
  return _n;
}

function downloadSaveFile()
{
    let arrayBuffer = makeSave();
    let _l = arrayBuffer.length;

    // blob binary large object
    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    const _url = URL.createObjectURL(blob);

    // temp anchor
    const anchor = document.createElement('a');
    anchor.href = _url;

    anchor.download = makeValidFileName(_settings[8].settings[1]) + _l + ".bin";

    // use .click() to trigger download
    anchor.click();
    URL.revokeObjectURL(_url);
    key_map.p = false;
}

window.addEventListener('keydown', (event) =>
{
	const key = event.key.toLowerCase();
	if (key_map.hasOwnProperty(key))
	{
		if (flag_inText == 0) {key_map[key] = true;} // new change w/ flag for text input
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

function pointerLockSwap()
{
  if (document.pointerLockElement !== null)
  {
    document.exitPointerLock();
    mouseLock = 0;
  } else
  {
    ctx_gl.requestPointerLock();
    mouseLock = 1;
  }
}

window.addEventListener('resize', function()
{
	updateMenuPos();
});


document.addEventListener('contextmenu', function (e)
{
	e.preventDefault();
});

document.addEventListener('pointerlockchange', function ()
{
  if (document.pointerLockElement === null)
  {
    mouseLock = 0;
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
		    if ((fov_slide-e.deltaY/2000) > 0 && !lock_vert_mov) {fov_slide += -e.deltaY/2000};
		    if (lock_vert_mov) {hover_h += -e.deltaY*(key_map.shift+0.2)/14}; // fix
		} else if(runEvery(40) && pointerOutsideWindow()[2])
		{
			obj_cyc += e.deltaY/Math.pow((e.deltaY)*(e.deltaY), 0.5);
			if (obj_cyc>m_objs.length-1) {obj_cyc=0};
			if (obj_cyc<0) {obj_cyc=m_objs.length-1};
		}

	} else if (runEvery(200))
  {
			grid_scale += -e.deltaY/Math.abs(e.deltaY);
			_settings[5].settings[0] = Math.pow(2, grid_scale);
	}
	s_fov = fov_slide*fov_slide*fov_slide/20;
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

// Could have used this for most of the simple code sooner
function setPoint(a, b) { a[0]=b[0]; a[1]=b[1]; a[2]=b[2]; } // set a to b 

function dot4(a,b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3];}
function dot(a,b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];}
function dot2(a,b) {return a[0]*b[0] + a[1]*b[1];}

function add2(a,b) {return [a[0]+b[0], a[1]+b[1]];}
function add3(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];}
function add(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2], 1];}

function sub2(a,b) {return [a[0]-b[0], a[1]-b[1]];}
function sub3(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];}
function sub(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2], 1];} // Must keep last 1 to make it easy to push. Keep in mind..

function len3(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);}
function len2(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]);}
function len2fast(a) {return a[0]*a[0]+a[1]*a[1];}

function scalew1(a,s) {return [a[0]*s, a[1]*s, a[2]*s, 1];}
function scale(a,s) {return [a[0]*s, a[1]*s, a[2]*s];} // Removed last 1 take note
function scale3(a,s) {return [a[0]*s, a[1]*s, a[2]*s];}
function scale2(a,s) {return [a[0]*s, a[1]*s];}

function makeDir(_p)
{
	let _l = Math.sqrt(dot(_p,_p));
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l]);
}

function norm(_p)
{
	let _l = dot(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l]);
}

function norm4(_p) // Quaternion 
{
	let _l = dot4(_p,_p);
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

function runEveryPreview(_ms)
{
	var d_t = Date.now() - date_now_preview; var _r = 0;
	if (d_t > _ms) {_r = 1; date_now_preview = Date.now();} else {_r = 0;}
	return (_r);
}

function updateFPS()
{

  let _dt = Date.now() - _date_now_fps;
  if (_dt > 250)
  {
    _fps = Math.floor(_frames*4);
    _frames = 0;
    _date_now_fps = Date.now();
  } else
  {
    _frames++;
  }
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

var m_objs = []; // [[n,...,],[n,...,],...]
var mem_log = []; // [start, size]
var mem_sum = 0;

var m_objs_ghost = []; // Cloned m_obj data

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

var m_rect =  new Float32Array([1, 0, 1, 1,-1, 0, 1, 1,-1, 0,-1, 1, 1, 0,-1, 1, 1, 0, 1, 1]);

const m_cube = new Float32Array([-1.0,-1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0,1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,-1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,1.0,-1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,1.0,-1.0,-1.0,-1.0,1.0]);

const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]);
const m_x = new Float32Array([0,0,0,1, 8,0,0,1]);
const m_y = new Float32Array([0,0,0,1, 0,8,0,1]);
const m_z = new Float32Array([0,0,0,1, 0,0,8,1]);

const m_map = new Float32Array([277.1638,-128.0,114.8050,0,277.1638,0.0,114.8050,0,114.8050,0.0,277.1638,0,114.8050,-128.0,277.1638,0,-114.8050,-128.0,277.1638,0,-114.8050,0.0,277.1638,0,-277.1638,0.0,114.8050,0,-277.1638,-128.0,114.8050,0,-277.1638,-128.0,-114.8050,0,-277.1638,0.0,-114.8050,0,-114.8050,0.0,-277.1638,0,-114.8050,-128.0,-277.1638,0,114.8050,-128.0,-277.1638,0,114.8050,0.0,-277.1638,0,277.1638,0.0,-114.8050,0,277.1638,-128.0,-114.8050,0,277.1638,-128.0,114.8050,0,277.1638,0.0,114.8050,0,277.1638,0.0,-114.8050,0,277.1638,-128.0,-114.8050,0,114.8050,-128.0,-277.1638,0,114.8050,0.0,-277.1638,0,-114.8050,0.0,-277.1638,0,-114.8050,-128.0,-277.1638,0,-277.1638,-128.0,-114.8050,0,-277.1638,0.0,-114.8050,0,-277.1638,0.0,114.8050,0,-277.1638,-128.0,114.8050,0,-114.8050,-128.0,277.1638,0,-114.8050,0.0,277.1638,0,114.8050,0.0,277.1638,0,114.8050,-128.0,277.1638,0,277.1638,-128.0,114.8050,0]);

const m_flr = new Float32Array([-256.0,0.0,112.0,0,-256.0,0.0,80.0,0,-256.0,0.0,48.0,0,-256.0,0.0,16.0,0,-256.0,0.0,-16.0,0,-256.0,0.0,-48.0,0,-256.0,0.0,-80.0,0,-256.0,0.0,-112.0,0,-224.0,0.0,144.0,0,-224.0,0.0,112.0,0,-224.0,0.0,80.0,0,-224.0,0.0,48.0,0,-224.0,0.0,16.0,0,-224.0,0.0,-16.0,0,-224.0,0.0,-48.0,0,-224.0,0.0,-80.0,0,-224.0,0.0,-112.0,0,-224.0,0.0,-144.0,0,-192.0,0.0,176.0,0,-192.0,0.0,144.0,0,-192.0,0.0,112.0,0,-192.0,0.0,80.0,0,-192.0,0.0,48.0,0,-192.0,0.0,16.0,0,-192.0,0.0,-16.0,0,-192.0,0.0,-48.0,0,-192.0,0.0,-80.0,0,-192.0,0.0,-112.0,0,-192.0,0.0,-144.0,0,-192.0,0.0,-176.0,0,-160.0,0.0,208.0,0,-160.0,0.0,176.0,0,-160.0,0.0,144.0,0,-160.0,0.0,112.0,0,-160.0,0.0,80.0,0,-160.0,0.0,48.0,0,-160.0,0.0,16.0,0,-160.0,0.0,-16.0,0,-160.0,0.0,-48.0,0,-160.0,0.0,-80.0,0,-160.0,0.0,-112.0,0,-160.0,0.0,-144.0,0,-160.0,0.0,-176.0,0,-160.0,0.0,-208.0,0,-128.0,0.0,240.0,0,-128.0,0.0,208.0,0,-128.0,0.0,176.0,0,-128.0,0.0,144.0,0,-128.0,0.0,112.0,0,-128.0,0.0,80.0,0,-128.0,0.0,48.0,0,-128.0,0.0,16.0,0,-128.0,0.0,-16.0,0,-128.0,0.0,-48.0,0,-128.0,0.0,-80.0,0,-128.0,0.0,-112.0,0,-128.0,0.0,-144.0,0,-128.0,0.0,-176.0,0,-128.0,0.0,-208.0,0,-128.0,0.0,-240.0,0,-96.0,0.0,240.0,0,-96.0,0.0,208.0,0,-96.0,0.0,176.0,0,-96.0,0.0,144.0,0,-96.0,0.0,112.0,0,-96.0,0.0,80.0,0,-96.0,0.0,48.0,0,-96.0,0.0,16.0,0,-96.0,0.0,-16.0,0,-96.0,0.0,-48.0,0,-96.0,0.0,-80.0,0,-96.0,0.0,-112.0,0,-96.0,0.0,-144.0,0,-96.0,0.0,-176.0,0,-96.0,0.0,-208.0,0,-96.0,0.0,-240.0,0,-64.0,0.0,240.0,0,-64.0,0.0,208.0,0,-64.0,0.0,176.0,0,-64.0,0.0,144.0,0,-64.0,0.0,112.0,0,-64.0,0.0,80.0,0,-64.0,0.0,48.0,0,-64.0,0.0,16.0,0,-64.0,0.0,-16.0,0,-64.0,0.0,-48.0,0,-64.0,0.0,-80.0,0,-64.0,0.0,-112.0,0,-64.0,0.0,-144.0,0,-64.0,0.0,-176.0,0,-64.0,0.0,-208.0,0,-64.0,0.0,-240.0,0,-32.0,0.0,240.0,0,-32.0,0.0,208.0,0,-32.0,0.0,176.0,0,-32.0,0.0,144.0,0,-32.0,0.0,112.0,0,-32.0,0.0,80.0,0,-32.0,0.0,48.0,0,-32.0,0.0,16.0,0,-32.0,0.0,-16.0,0,-32.0,0.0,-48.0,0,-32.0,0.0,-80.0,0,-32.0,0.0,-112.0,0,-32.0,0.0,-144.0,0,-32.0,0.0,-176.0,0,-32.0,0.0,-208.0,0,-32.0,0.0,-240.0,0,0.0,0.0,240.0,0,0.0,0.0,208.0,0,0.0,0.0,176.0,0,0.0,0.0,144.0,0,0.0,0.0,112.0,0,0.0,0.0,80.0,0,0.0,0.0,48.0,0,0.0,0.0,16.0,0,0.0,0.0,-16.0,0,0.0,0.0,-48.0,0,0.0,0.0,-80.0,0,0.0,0.0,-112.0,0,0.0,0.0,-144.0,0,0.0,0.0,-176.0,0,0.0,0.0,-208.0,0,0.0,0.0,-240.0,0,32.0,0.0,240.0,0,32.0,0.0,208.0,0,32.0,0.0,176.0,0,32.0,0.0,144.0,0,32.0,0.0,112.0,0,32.0,0.0,80.0,0,32.0,0.0,48.0,0,32.0,0.0,16.0,0,32.0,0.0,-16.0,0,32.0,0.0,-48.0,0,32.0,0.0,-80.0,0,32.0,0.0,-112.0,0,32.0,0.0,-144.0,0,32.0,0.0,-176.0,0,32.0,0.0,-208.0,0,32.0,0.0,-240.0,0,64.0,0.0,240.0,0,64.0,0.0,208.0,0,64.0,0.0,176.0,0,64.0,0.0,144.0,0,64.0,0.0,112.0,0,64.0,0.0,80.0,0,64.0,0.0,48.0,0,64.0,0.0,16.0,0,64.0,0.0,-16.0,0,64.0,0.0,-48.0,0,64.0,0.0,-80.0,0,64.0,0.0,-112.0,0,64.0,0.0,-144.0,0,64.0,0.0,-176.0,0,64.0,0.0,-208.0,0,64.0,0.0,-240.0,0,96.0,0.0,240.0,0,96.0,0.0,208.0,0,96.0,0.0,176.0,0,96.0,0.0,144.0,0,96.0,0.0,112.0,0,96.0,0.0,80.0,0,96.0,0.0,48.0,0,96.0,0.0,16.0,0,96.0,0.0,-16.0,0,96.0,0.0,-48.0,0,96.0,0.0,-80.0,0,96.0,0.0,-112.0,0,96.0,0.0,-144.0,0,96.0,0.0,-176.0,0,96.0,0.0,-208.0,0,96.0,0.0,-240.0,0,128.0,0.0,208.0,0,128.0,0.0,176.0,0,128.0,0.0,144.0,0,128.0,0.0,112.0,0,128.0,0.0,80.0,0,128.0,0.0,48.0,0,128.0,0.0,16.0,0,128.0,0.0,-16.0,0,128.0,0.0,-48.0,0,128.0,0.0,-80.0,0,128.0,0.0,-112.0,0,128.0,0.0,-144.0,0,128.0,0.0,-176.0,0,128.0,0.0,-208.0,0,160.0,0.0,176.0,0,160.0,0.0,144.0,0,160.0,0.0,112.0,0,160.0,0.0,80.0,0,160.0,0.0,48.0,0,160.0,0.0,16.0,0,160.0,0.0,-16.0,0,160.0,0.0,-48.0,0,160.0,0.0,-80.0,0,160.0,0.0,-112.0,0,160.0,0.0,-144.0,0,160.0,0.0,-176.0,0,192.0,0.0,144.0,0,192.0,0.0,112.0,0,192.0,0.0,80.0,0,192.0,0.0,48.0,0,192.0,0.0,16.0,0,192.0,0.0,-16.0,0,192.0,0.0,-48.0,0,192.0,0.0,-80.0,0,192.0,0.0,-112.0,0,192.0,0.0,-144.0,0,224.0,0.0,112.0,0,224.0,0.0,80.0,0,224.0,0.0,48.0,0,224.0,0.0,16.0,0,224.0,0.0,-16.0,0,224.0,0.0,-48.0,0,224.0,0.0,-80.0,0,224.0,0.0,-112.0,0,256.0,0.0,80.0,0,256.0,0.0,48.0,0,256.0,0.0,16.0,0,256.0,0.0,-16.0,0,256.0,0.0,-48.0,0,256.0,0.0,-80.0,0,256.0,0.0,-80.0,0]);

var _flr = 6*8; // Side length of square
var edit_sum = 0;

const m_eyeRef = new Float32Array([0,8.0,0,1.0,-8.0,0,0,1.0,0,-8.0,0,1.0,8.0,0,0,1.0,0,8.0,0,1.0]);

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
	g_over_x = setGrid(15, _settings[5].settings[0], 0, [0, 0, 0]);
	g_over_y = setGrid(15, _settings[5].settings[0], 1, [0, 0, 0]);
	g_over_z = setGrid(15, _settings[5].settings[0], 2, [0, 0, 0]);

	// now write data to obj

	for (var i = 0; i<mem_log[3][1]-4; i++) // the fuck
	{
		m_objs[3][i] = m_objs_ghost[3][i] = g_over_x[i];
		m_objs[4][i] = m_objs_ghost[4][i] = g_over_y[i];
		m_objs[5][i] = m_objs_ghost[5][i] = g_over_z[i];
	}
  grid_scale_d = _settings[5].settings[0];
}


function make_cir_obj(_d, _s, _o, _lim, _p) // divisions, scale, offset, parts, plane : maybe fix z later
{
	// s = x^2 + y^2
	// x = sqrt(s)*cos(r)	y = sqrt(s)*sin(r)

	let _r = pi2/_d;
	let _of = _o*pi2/360;
  let _df = (_lim<=0) ? 4*_d+4 : 4*(_lim+1); // Use limited parts for loop if non zero
	let c_pnts = new Float32Array(_df);

	switch(_p)
	{
		case 0:
			for (let n=0; n<=_df; n++)
			{
				c_pnts[n*4+0] = _lp_world[0];
				c_pnts[n*4+1] = _lp_world[1]+_s*Math.sin(_r*n+_of);
				c_pnts[n*4+2] = _lp_world[2]+_s*Math.cos(_r*n+_of);
			}
			m_objs_loadPoints(c_pnts);
    break;
		case 1:
			for (let n=0; n<=_df; n++)
			{
				c_pnts[n*4+0] = _lp_world[0]+_s*Math.cos(_r*n+_of);
				c_pnts[n*4+1] = _lp_world[1];
				c_pnts[n*4+2] = _lp_world[2]+_s*Math.sin(_r*n+_of);
			}
			m_objs_loadPoints(c_pnts);
    break;
		case 2:
			for (let n=0; n<=_df; n++)
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


shaderModule.init();
var m1 = shaderModule.alloc(80000); // Allocate memory for parallel operations
for (i=0; i<m1.data.length; i++) {m1.data[i] = 0.0;}

var m_draw = [];
var m_center2d = [];
var m_center2d_buffer = [];
var z_map = []; // contains float32array

function m_objs_loadPoints(ar) // Adds objects
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

    let _t_tris = Math.floor((Math.floor(ar_f.length/12)-1)/2)-Math.floor(ar_f.length/12)%2;
		obj_normalMaps.push(new Float32Array(_t_tris * 12 + 12)); // Idk this works for now??

    var ar_t = new Float32Array(((Math.floor((Math.floor(ar_f.length/4)-1)/2)-Math.floor(ar_f.length/4)%2)-1) * 6 + 6 );
    m_draw.push([ar_t, ar_t.length/6, ar_t.length, (ar_t.length/6+3)*12*5, new Float32Array( (ar_t.length/6+3)*12*5 * 4)]); // Make space for webgl tris

    // z-map shit I think fixed now?
    var ar_z = new Float32Array( ar_t.length/6 );
    var ar_k = new Float32Array( ar_t.length/6 );
    z_map.push([ar_z, ar_k, ar_t.length/6]);

    //DATAFNS
	} else
  {
		m_objs[m_objs.length] = ar;
		m_objs_ghost[m_objs_ghost.length] = ar;
		mem_log.push([mem_sum, ar.length, Math.floor(ar.length/4), Math.floor(ar.length/12)]);
		mem_sum += ar.length;
		obj_normalMaps.push(new Float32Array([0.0, 0.0, 0.0, 0.0]));

    var ar_t = new Float32Array( 6 );
    var ar_z = new Float32Array( 1 );
    var ar_k = new Float32Array( 1 );
    m_draw.push([ar_t, 1, ar_t.length]); // Make space for webgl tris
    z_map.push([ar_z, ar_k, 1]);
	}
	m_obj_offs.push([0.0, 0.0, 0.0, 1]);

	if (typeof updateList == 'function') {updateList(objListConst(), "list_objectSelect");}

  m_center2d_buffer.push(new Float32Array(33*2));
  m_center2d.push(new Float32Array(2));

  let _fp = 0;
  if ((m_objs.length-1) > 2 && (m_objs.length-1) < 6) {_fp = 1;}
  if ((m_objs.length-1) > 5 && (m_objs.length-1) < 11) {_fp = 2;}
  if ((m_objs.length-1) > 11 && (m_objs.length-1) < 16) {_fp = 2;}
  if (m_objs.length > 16)
  {
    _fp = (folder_selected < 4) ? 3 : folder_selected;
  }

  if (flag_loadingObject == 0)
  {
    obj_folders[_fp].push(m_objs.length-1);
  }


 	if (typeof updateTree == 'function') { updateTree(tree_allObjects); }
	updateNormalMaps();
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

var _nextSize;
function setData() // Combine world and specific obj data set. Using mem_t_log as a clean space for obj modification. m_obj_offs creates temporary modification! animations!
{
  for (let j = m_objs.length-1; j>=0; j--)
  {
    _nextSize = m_objs[j].length;

    // I swear one line is smoother lol
    for (let i=0; i<_nextSize; i++) { m1.data[i+mem_log[j][0]] = (i%4 == 3) ? m_objs[j][i]*m_obj_offs[j][3] : m_objs[j][i]*m_obj_offs[j][3] + m_obj_offs[j][i%4]; }
  }

  for (let j = m_t_objs.length-1; j>=0; j--)
  {
    _nextSize = m_t_objs[j].length;
    for (let i = 0; i < _nextSize; i += 4)
    {
      m1.data[i+mem_t_log[j][0]+mem_sum]   = m_t_objs[j][i+0];
      m1.data[i+1+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i+1];
      m1.data[i+2+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i+2];
      m1.data[i+3+mem_t_log[j][0]+mem_sum] = m_t_objs[j][i+3];
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
*/ // #loaddata


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
m_objs_loadPoints(m_rect);       // 12
m_objs_loadPoints(m_rect);       // 13
m_objs_loadPoints(m_eyeRef);     // 14
m_objs_loadPoints(m_cube);       // 15

world_obj_count = obj_cyc = m_objs.length-1;

setData();


function updateNormalMaps()
{
	if (m_objs.length>world_obj_count+1) // xtra?
	{
		let p1, p2, p3, v1, v2, _cr;
		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
			for (var k=0; k<Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2; k++)
			{
        p1 = [m_objs[i][8*k], m_objs[i][8*k+1], m_objs[i][8*k+2]];
        p2 = [m_objs[i][8*k+4], m_objs[i][8*k+5], m_objs[i][8*k+6]];
        p3 = [m_objs[i][8*k+8], m_objs[i][8*k+9], m_objs[i][8*k+10]];

        // p1-p2, p3-p2
        //if (i==1) {console.log(p1 + " : " + p2 + " : " + p3);}
        v1 = sub3(p1,p2);
        v2 = sub3(p3,p2);
        _cr = cross(v1, v2); // Fix?
        obj_normalMaps[i][4*k+0] = _cr[0];
        obj_normalMaps[i][4*k+1] = _cr[1];
        obj_normalMaps[i][4*k+2] = _cr[2];

        // Unreal man it works unlike unreal man
        // Now to update updateRayInters with all results from lpi w/ by paralleling with m_objs again to query both m_objs and obj_normalMaps into the lpi that updates a list of points. Dynamic list for this one.
        // 2d mean could point to nearest 3 points as well making this a lot faster than doing this lol. or combine both and use the 2d to determine if it's center and if the planes are equal.??
        // if this doens't have to be updated so quickly I can do a test for if i'm in the poly instead at run time as my only rt data.
			}
		}
    // console.log("Normal map update complete...");
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

var interKOut = [];
var interIOut = [];
var normOut = [];

function updateRayInters(_dp, _p)
{
	if (m_objs.length>world_obj_count+1) // Remove?
	{
		rayInterMap.length = 0;
    interKOut.length = 0;
    interIOut.length = 0;
    normOut.length = 0;
		var p1, p2, p3, _cr, _int;
		for (var i=world_obj_count+1; i<m_objs.length; i++) // Removed +1 and i<m_objs.length instead of obj_normalMaps.length?????
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
          //_plr_dtp, player_pos
					_int = lpi(_dp, _p, p2, _cr);

					//can use create point like I did before ez
					if (isPointInsideTriangle(_int, p1, p2, p3))
					{
						//m_t_objs_loadPoint(new Float32Array([_int[0], _int[1], _int[2], 1.0]));
						rayInterMap.push(_int);
						interKOut.push(k);
						interIOut.push(i);
            normOut.push(_cr);
					}
				}
			}
		}
    _rayLast = findClosestVector(player_pos, rayInterMap);
	}
}

function findClosestVector(targetVector, vectors)
{
  let minDistance = Number.MAX_VALUE;
  let closestIndex = -1;

  for (let i = 0; i < vectors.length; i++)
  {
    const currentVector = vectors[i];
    let distance = 0;

    for (let j = 0; j < targetVector.length; j++)
    {
      const difference = targetVector[j] - currentVector[j];
      distance += difference * difference;
    }

    if (distance < minDistance)
    {
      minDistance = distance;
      closestIndex = i;
    }
  }
  return closestIndex;
}

function teleport_plr()
{
	switch(lock_vert_mov)
	{
		case false:
			player_pos[0] = _lp_world[0];
			player_pos[1] = _lp_world[1]-14;
			player_pos[2] = _lp_world[2];
			break;

		case true:
			player_pos[0] = _lp_world[0];
			player_pos[2] = _lp_world[2];
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
  const w = q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2] - q1[3] * q2[3],
        x = q1[0] * q2[1] + q1[1] * q2[0] + q1[2] * q2[3] - q1[3] * q2[2],
        y = q1[0] * q2[2] - q1[1] * q2[3] + q1[2] * q2[0] + q1[3] * q2[1],
        z = q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1] + q1[3] * q2[0];
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

// conjugate of a quaternion
function conjugate(q)
{
  return [q[0], -q[1], -q[2], -q[3]];
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
    // const _rq0 = multiplyQuaternions(_nq, _vq); // Must do this first (l2r)
    // const _rq = multiplyQuaternions(_rq0, [
    //      _nq[0],
    //     -_nq[1],
    //     -_nq[2],
    //     -_nq[3]
    // ]);
   const _rq = multiplyQuaternions(_nq, multiplyQuaternions(_vq, conjugate(_nq)));
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

// indices.sort((a, b) => distances[a] - distances[b]);
// that's it basically ^
function updateDrawMap(priorityObjects)
{
  let _t_i = m_objs.length;
	for (var i=0; i<_t_i; i++)
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

// here I add filter for anything being modified?
// as long as all obj funcs reset their obj to -1 or 0 then this works just checking _i inside array
function del_obj(_i)
{
	if (_i > world_obj_count && _i != boundingBox.obj)
	{
		trns_lock = 0;
		_all_lock = 0; _all_lock = 0;
		if (_i == m_objs.length-1) // If last delete last
		{
      // if (obj_cyc < m_objs.length-2) {obj_cyc = m_objs.length-3;}
			m_objs.splice(-1);	mem_log.splice(-1); m_obj_offs.splice(-1); m_objs_ghost.splice(-1); m_draw.splice(-1);
      m_center2d.splice(-1); m_center2d_buffer.splice(-1); z_map.splice(-1);
      obj_normalMaps.splice(-1);
      obj_cyc = m_objs.length-1;

		} else // Delete specific
		{
			var _ts = mem_log[_i][1];
			for (var i = _i+1; i<mem_log.length; i++)
			{
				mem_log[i][0] = mem_log[i][0]-_ts;
			}
			m_objs.splice(_i, 1); mem_log.splice(_i, 1); m_obj_offs.splice(_i, 1); m_objs_ghost.splice(_i, 1); m_draw.splice(_i, 1);
      m_center2d.splice(_i, 1); m_center2d_buffer.splice(_i, 1); z_map.splice(_i, 1);
      obj_normalMaps.splice(_i, 1);
		}
		updateList(objListConst(), "list_objectSelect");
    foldersDel(_i);
    updateTree(tree_allObjects);
	}
}

function updateLook() // Quat view rot
{
		_viewq = [makeQuaternion(-player_look_dir[1], [1,0,0]),
				  makeQuaternion(-player_look_dir[0], [0,1,0])];
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
		m_objs[_i][i*4+0] = m_objs_ghost[_i][i*4+0] = m_objs[_i][i*4+0]+roundTo(m_obj_offs[_i][0], _settings[5].settings[0]);
		m_objs[_i][i*4+1] = m_objs_ghost[_i][i*4+1] = m_objs[_i][i*4+1]+roundTo(m_obj_offs[_i][1], _settings[5].settings[0]);
		m_objs[_i][i*4+2] = m_objs_ghost[_i][i*4+2] = m_objs[_i][i*4+2]+roundTo(m_obj_offs[_i][2], _settings[5].settings[0]);
	}
}

function findbyctr_obj(x, y) // 2D find by 3D encoded center point
{
	if (m_objs.length > world_obj_count+1) // I can try doing len2 as exp 4
	{
		var _lt;
		var _i = world_obj_count+1;
		var _l = Number.MAX_VALUE;

		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
			_lt = len2fast([m1.data[mem_log[i][0]+mem_log[i][1]-4]+x/in_win_hc*(in_win_h/in_win_w), m1.data[mem_log[i][0]+mem_log[i][1]-3]+y/in_win_hc]);
			if (_lt < _l) {_i = i; _l = _lt;}
		}
		return _i;
	} else {return world_obj_count;}
}

function select2dpoint(x, y) // 2D find
{
	var _f; var _n_sku = 0; var _t1; var _d = 0; var _d2 = 0;

	_f = Number.MAX_VALUE;

  
	if (!boundingBox.focus && obj_cyc != boundingBox.obj && obj_cyc != trns_obj_i && obj_cyc>world_obj_count)
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

  if (boundingBox.enable && !boundingBox.active)
  {
    for (let k = 0; k<mem_log[15][1]/4; k++)
    {
      _t1 = Math.pow(m1.data[4*k+mem_log[15][0]]+x/in_win_hc*(in_win_h/in_win_w), 2) + Math.pow(m1.data[4*k+mem_log[15][0]+1]+y/in_win_hc, 2);
      if (_t1 < _f)
      {
        _f = _t1;
        _n_sku = k;
        _d = 3;
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

      if (boundingBox.focus && boundingBox.enable)
      {
        let _s = m_objs[15].length - 4;
        for (let i=0; i<_s; i++)
        {
          if (m_objs[15][4*i] == _lp_world[0]
          && m_objs[15][4*i+1] == _lp_world[1]
          && m_objs[15][4*i+2] == _lp_world[2])
          {
            boundingBox.apply(); boundingBox.set(); boundingBox.match(); 
            break;
          }
        }
      }
			cursor_helper = 0;
			break;
		case 3:
			_lp[0] = _lp_world[0] = m_objs[15][4*_n_sku];
			_lp[1] = _lp_world[1] = m_objs[15][4*_n_sku+1];
			_lp[2] = _lp_world[2] = m_objs[15][4*_n_sku+2];
      boundingBox.apply(); boundingBox.set(); boundingBox.match(); 
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

function getctr_ghost(_i) // Get encoded 3D center point
{
	var _c = new Float32Array(4);
	_c[0] = m_objs_ghost[_i][m_objs_ghost[_i].length-4];
	_c[1] = m_objs_ghost[_i][m_objs_ghost[_i].length-3];
	_c[2] = m_objs_ghost[_i][m_objs_ghost[_i].length-2];
	_c[3] = 1;
	return _c;
}

var translateFolder =
{
  obj: 0,
  lpstart: [0,0,0],
  lpdelta: [0,0,0],
  active: 0,
  focus: 0,
  runhook: 0,
  folder: Object,
  toggle: function ()
  {
    if (folder_selected < 3) {return;}
    switch(translateFolder.active)
    {
      case 0:
        translateFolder.lpstart =
        [
          _lp_world[0],
          _lp_world[1],
          _lp_world[2]
        ];
        translateFolder.lpdelta = [0,0,0];
        translateFolder.folder = Array.from(obj_folders[folder_selected]);
        translateFolder.obj = obj_cyc;

        translateFolder.focus = 1;
        translateFolder.active = 1;
        translateFolder.runhook = 0;
        break;

      case 1:
        translateFolder.active = 0;
        translateFolder.focus = 0;
        // Apply changes to obj clones
        let _s = translateFolder.folder.length;
        for (let i=0; i<_s; i++)
        {
          arScale(m_objs_ghost[translateFolder.folder[i]], m_objs[translateFolder.folder[i]], [0,0,0], [0,0,0,0], [1,1,1,1]);
        }
        // arScale(m_objs_ghost[this.obj], m_objs[this.obj], [0,0,0,0], [0,0,0,0], [1,1,1,1]);
        translateFolder.obj = 0;
        break;
    }
  },
  run: function ()
  {
    // Check for axis lock settings
    translateFolder.lpdelta =
    [
      (_settings[3].settings[0]) ? 0 : _lp_world[0] - translateFolder.lpstart[0],
      (_settings[3].settings[1]) ? 0 : _lp_world[1] - translateFolder.lpstart[1],
      (_settings[3].settings[2]) ? 0 : _lp_world[2] - translateFolder.lpstart[2]
    ];

    let _s = translateFolder.folder.length;
    for (let i=0; i<_s; i++)
    {
      arScale(m_objs[translateFolder.folder[i]], m_objs_ghost[translateFolder.folder[i]], translateFolder.lpdelta, [0,0,0,0], [1,1,1,1]);
    }

    // arScale(m_objs[this.obj], m_objs_ghost[this.obj], this.lpdelta, [0,0,0,0], [1,1,1,1]);
    // need system to prevent connect to self points
    // maybe do general check on runList and instead block m_obj and allow ghost?

    // if (!key_map.lmb) {translateFolder.apply(); translateFolder.focus = 1;}
  }
}; functionRunList.push(translateFolder);

var rotateFolder =
{
  folder: Object,
  run: function ()
  {
    if (folder_selected < 3) {return;}
    rotateFolder.folder = Array.from(obj_folders[folder_selected]);

    let _s = rotateFolder.folder.length;
    for (let i=0; i<_s; i++) // loop through folders
    {
      rotateObject(0, _settings[7].settings[0], rotateFolder.folder[i])
    }
  }
};

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
				if (!_settings[3].settings[0]) {m_objs[trns_obj_i][i*4] = m_objs[trns_obj_i][i*4]+_fd[0];}
				if (!_settings[3].settings[1]) {m_objs[trns_obj_i][i*4+1] = m_objs[trns_obj_i][i*4+1]+_fd[1];}
				if (!_settings[3].settings[2]) {m_objs[trns_obj_i][i*4+2] = m_objs[trns_obj_i][i*4+2]+_fd[2];}
			}
				m_obj_offs[trns_obj_i][0] = 0;
				m_obj_offs[trns_obj_i][1] = 0;
				m_obj_offs[trns_obj_i][2] =	0;

      arScale(m_objs_ghost[trns_obj_i], m_objs[trns_obj_i], [0,0,0,0], [0,0,0,0], [1,1,1,1]);

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


			_oi.push(_oi[_oi.length-1]); // ??

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

function link_obj(_i)
{
  let _t = 1;
  if (_settings[2].settings[0][0] == true) {_t = 0;}
  if (_settings[2].settings[1][0] == true) {_t = 1;}
  if (_settings[2].settings[2][0] == true) {_t = 2;}

  console.log(_t);
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


// Remove center option? nah keeps cursor in right place.
// @?@?@?@ Later make this rotate around a plane (grid plane as dir vec)
function rotateObject(_op, _r, _obj) // _op determines if rotation uses point or center, _r radians.
{
	if (_obj>world_obj_count)
	{
		var _to = splitObjS(m_objs[_obj]);
		var _c = getctr_obj(_obj);
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
				for (var j=0; j<mem_log[_obj][2]; j++)
				{
					m_objs[_obj][j*4+0] = _to[j][0];
					m_objs[_obj][j*4+1] = _to[j][1];
					m_objs[_obj][j*4+2] = _to[j][2];
				}
        arScale(m_objs_ghost[_obj], m_objs[_obj], [0,0,0,0], [0,0,0,0], [1,1,1,1]);
			}
		}
	}
}

// oo yuh
function arClone(a, b, c, s)
{
  for (let i = a.length-1; i>=0; i--)
  {
    a[i] = (b[i] - c[i%4])*s;
  }
}

// This one does it all.
// &a made from &b, - inner vec3 d, * outer vec3 d, + vec3 offset
function arScale(a, b, c, d, s)
{
  for (let i = a.length-1; i>=0; i--)
  {
    a[i] = (b[i]-d[i%4])*s[i%4] + c[i%4];
  }
}

function writeToObjI(_ob, i)
{
  if (_ob.length == mem_log[i][1])
  {
    let start = 0;
    const end = mem_log[i][1];
    while (start < end)
    {
      m_objs[i][start] = _ob[start];
      start++;
    }
  }
}

function updateViewRef(_v, _i, _q)
{
  let _t_c = getctr_ghost(_i);
  const _s = mem_log[_i][2];
  for (let i=0; i<_s; i++)
  {
    _t_gp =
    [
      m_objs_ghost[_i][i*4],
      m_objs_ghost[_i][i*4+1],
      m_objs_ghost[_i][i*4+2]
    ];

    _t_fp = add3(_v, quatRot( sub(_t_gp, _t_c), _q ));

    m_objs[_i][i*4] = _t_fp[0];
    m_objs[_i][i*4+1] = _t_fp[1];
    m_objs[_i][i*4+2] = _t_fp[2];
  }
}

// quatRot( sub(_gp, _c), _viewq ) // looks like _c center removed from point
// function rotateObjI(_i, _q)
// {
//   _c = getctr_obj(_i);
//   const _s = mem_log[_i][2];
//   for (let i=0; i<_s; i++)
//   {
//     _gp = [m_objs_ghost[_i][i*4], m_objs_ghost[_i][i*4+1], m_objs_ghost[_i][i*4+2]]
//     // quatRot( sub(_gp, _c), _viewq ) // looks like _c center removed from point
//   }
// }

function updateCursor()
{
  var _ob = splitObjS(m_objs_ghost[12]);

  for (var i = 0; i<=_ob[i].length; i++)
  {
    switch(pln_cyc)
    {
      case 0:
        _ob[i] = rot_z_pln(_ob[i], pi/2);  
        break;
      case 2:
        _ob[i] = rot_x_pln(_ob[i], pi/2);
        break;
    }
  }

  // write to obj data
  writeToObjI(packObj(_ob), 12);
}

function planeCycle()
{
  if (pln_cyc==2) {pln_cyc=0;} else {pln_cyc++;}
  updateCursor();
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
  // Terminate all running data manipulation
  for (let i = functionRunList.length-1; i>=0; i--)
  { if (functionRunList[i].enable) {functionRunList[i].toggle();} }

  folder_selected = 3;
  obj_folders[3].length = 0;
  mem_sum = 7408;

  let _c = 4;
  folder_parents.splice(_c);
  folder_toggle.splice(_c);
  folder_names.splice(_c);
  obj_folders.splice(_c);

	trns_lock = 0;
	_all_lock = 0; _all_lock_i = 0;
	m_objs.splice(world_obj_count+1); mem_log.splice(world_obj_count+1); m_obj_offs.splice(world_obj_count+1); m_objs_ghost.splice(world_obj_count+1);
  m_draw.splice(world_obj_count+1); m_center2d.splice(world_obj_count+1); m_center2d_buffer.splice(world_obj_count+1); z_map.splice(world_obj_count+1);
  obj_normalMaps.splice(world_obj_count+1);
	obj_cyc = 2;

  document.getElementById("menu_status_l3").value = '';
  document.getElementById("menu_status_r2").innerHTML = '';

  updateTree(tree_allObjects);
}

function createCircleAtCursor()
{
  let _stn = _settings[0].settings;
	if (!isNaN(_stn[1]) && !isNaN(_stn[0]) && !isNaN(_stn[2]))
	{
		make_cir_obj(Math.floor(_stn[1]), _stn[0], _stn[2], _stn[3], pln_cyc);
	}
}

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
    arScale(m_objs_ghost[obj_cyc], m_objs[obj_cyc], [0,0,0,0], [0,0,0,0], [1,1,1,1]);
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
	if (!_settings[3].settings[0]) {_lp[0] = _lp_world[0] = _t[0];}
	if (!_settings[3].settings[1]) {_lp[1] = _lp_world[1] = _t[1];}
	if (!_settings[3].settings[2]) {_lp[2] = _lp_world[2] = _t[2];}	
}

function returnCursorToGround()
{
	_lp[1] = 0; _lp_world[1] = 0;
	pln_cyc=1;
  updateCursor();
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
	rotateObject(0, _settings[7].settings[0], obj_cyc);
}

function moveObject()
{
	trans_obj(obj_cyc);
}

function deleteFolderObjs()
{
  if (folder_selected < 3) {return;}
  const _folder = Array.from(obj_folders[folder_selected]);
  const _ti = Date.now();
  _folder.sort((a, b) => b - a);
  const _delay = 30;
  let _finished = 1;
  let _h1 = -1;

  while (_finished)
  {
    let _dt = (Date.now() - _ti);
    let _it = Math.floor(_dt/_delay);
    if (_it != _h1)
    {
      _h1 = _it;
      del_obj(_folder[_h1]);
      obj_cyc = 2;
    }
    if (_dt >= _delay*(_folder.length-1))
    {
      _finished = 0;
    }
  }
}

function dupeFolderObjs()
{
  if (folder_selected < 3) {return;}
  const _folder = Array.from(obj_folders[folder_selected]);
  const _ti = Date.now();
  const _delay = 30;
  let _finished = 1;
  let _h1 = -1;

  treeModify({func:1, n:folder_names[folder_selected]});

  while (_finished)
  {
    let _dt = (Date.now() - _ti);
    let _it = Math.floor(_dt/_delay);
    if (_it != _h1)
    {
      _h1 = _it;
      m_objs_loadPoints(cloneObj(m_objs[_folder[_h1]]));
      // obj_cyc = 2;
    }
    if (_dt >= _delay*(_folder.length-1))
    {
      _finished = 0;
    }
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
	

// function makeQuaternionFromAxisAngle(angle, axis) {
//   let halfAngle = angle / 2;
//   let s = Math.sin(halfAngle);
//   let q = [
//     Math.cos(halfAngle),
//     axis[0] * s,
//     axis[1] * s,
//     axis[2] * s
//   ];
//   return q;
// }
//
//
// function angleBetweenVectors(A, B) {
//   if (A.length !== B.length) {
//     throw new Error('Vectors must have the same dimensionality');
//   }
//
//  // Calculate the dot product of vectors A and B
//   let dotProduct = A.reduce((sum, a, i) => sum + a * B[i], 0);
//
//   // Calculate the norm of vector A
//   let normA = Math.sqrt(A.reduce((sum, a) => sum + a * a, 0));
//
//   // Calculate the norm of vector B
//   let normB = Math.sqrt(B.reduce((sum, b) => sum + b * b, 0));
//
//   // Handle zero norms
//   if (normA === 0 || normB === 0) {
//     // You can decide what value to return in this case, for example, 0 radians or degrees
//     return 0;
//   }
//
//   // Calculate the cosine of the angle
//   let cosTheta = dotProduct / (normA * normB);
//
//   // Ensure cosTheta is within the valid range [-1, 1]
//   cosTheta = Math.max(-1, Math.min(1, cosTheta));
//
//   // Calculate the angle in radians using the arccosine formula
//   let angle = Math.acos(cosTheta);
//
//   // Convert the angle to degrees if needed
//   // let angleDegrees = angle * (180 / Math.PI);
//
//   return angle; // Return the angle in radians or degrees
// }
//
// // Function to generate quaternion from a direction vector
// function generateQuaternionFromDirection(dir) {
//     // Normalize the direction vector
//     const normalizedDir = normalizeVector(dir);
//
//     // Find the rotation axis and angle to rotate [0, 0, 1] to the normalized direction
//     const rotationAxis = cross([0, 0, 1], normalizedDir);
//     const rotationAngle = Math.acos(dot([0, 0, 1], normalizedDir));
//
//     // Create quaternion from the rotation axis and angle
//     const quaternion = makeQuaternion(rotationAngle, rotationAxis);
//
//     return quaternion;
// }
//
// // Helper function to normalize a vector
// function normalizeVector(vec) {
//     const length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
//     return [vec[0] / length, vec[1] / length, vec[2] / length];
// }

function drawOverlay()
{
	// While in menu with low call rate i'll set values here:
	updateMenuPos();

  if (!mouseLock && wpn_select==3) // in menu
  {
    updateLook();
    updateViewRef(add3(player_pos, scale(f_look, -10)), 14, _viewq);
  }
  
  if (rayInterMap.length > 0)
  {
    // let _b = normalizeVector(normOut[_rayLast]);
    // let _qf0 = generateQuaternionFromDirection(_b);
    // ^
    //
    //
    // let _b = makeDir(cross(normOut[_rayLast], [0,1,0]));
    // let _a = -Math.PI + angleBetweenVectors(makeDir(normOut[_rayLast]), [0,1,0]);
    // console.log(_a + " : " + _b);

    // let _ang1 = Math.asin(_b[1]);
    // let _ang2 = Math.atan2(_b[2], _b[0]);

    // _ang1 -= Math.PI;
    // _ang2 -= Math.PI;
    

    // let quaternionPitch = makeQuaternionFromAxisAngle(_ang1, [0, 0, 1]);
    // let quaternionYaw = makeQuaternionFromAxisAngle(_ang2, [0, 1, 0]);

		// let _tq = [
  //     // makeQuaternion(_ang1, [1,0,0]), // pitch
		// 	// makeQuaternion(_ang2, [0,1,0]) // yaw
		// 	// makeQuaternion(_a, _b) // yaw
  //     _qf0
  //   ];


    // console.log(_tq);
    // console.log(_b);

    // updateViewRef(rayInterMap[_rayLast], obj_cyc, _tq);
  }

  updateTextByPar("menu_status_l0", "pos[" + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+"]");
  updateTextByPar("menu_status_l1", "pln_cyc[" + [" X-Plane "," Y-Plane "," Z-Plane "][pln_cyc]+"]");
  updateTextByPar("menu_status_r0", "fps[" + _fps + "]");
  updateTextByPar("menu_status_r1", "grid_scale[" + grid_scale + " : " + _settings[5].settings[0]+"]");


	// This needs to be fixed. Temp as I port menu to new script.
	if (mouseLock) {setVisibility({hide:["menu_1"], show:[""]});} else {setVisibility({hide:[""], show:["menu_1"]});}

  // temp until I move it to new menu in obj menu !!!
  setVisibility({hide:["list_objectSelect"], show:[""]});

	//console.log(init_dat.data[mem_log[9][0]+3]); // Z dist test

	if (wpn_select==1 && key_map.lmb==false && mouseLock) {obj_cyc = findbyctr_obj(0, 0);}
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
*/ // #trilinedot

/*
  only draw when length > 2
  every second point draws a tri from ith to previous and ahead
  i is offset by len%2, so at 4th do -1. (len-1)%2
  if obj is static pat could be pregen
  after removing center (mem_log[i][2]-1)%2 => (mem_log[i][2]-2)%2 => mem_log[i][2]%2
  hardest of them all
*/

var _all_lock_colors = [ [0.960, 0.85, 0.46, 1.0], [0.3, 0.3, 1.0, 1.0], [1.0, 0.3, 0.3, 1.0], [0.6, 0.3, 0.5, 1.0] ];

// So here I draw lines. Passing true object i'th
function drawSegment(vertices, mi)
{

  //gl.uniform4fv(colorUniformLocation, [1.0, 1.0, 1.0, 1]);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  gl.lineWidth = 1;

	if (mi >= 0)
	{
	    if (mi == obj_cyc && mi > world_obj_count) //
	    {
	    	gl.uniform4fv(colorUniformLocation, [0.960, 0.85, 0.46, 1.0]);
	    } else
	    {
          switch(_settings[1].settings[2])
          {
            case true:
              gl.uniform4fv(colorUniformLocation, [0.7, 0.7, 0.7, 0.2]);
              break;
            case false:
              gl.uniform4fv(colorUniformLocation, [0.7, 0.7, 0.7, 0.5]);
              break;
          }
  
	    }
    	if (mi == 12) {gl.uniform4fv(colorUniformLocation, [0.2, 1.0, 0.2, 1.0]);}
	} else
  {
		switch(mi) // Temp drawn line color
		{
			case -1:
				gl.uniform4fv(colorUniformLocation, [0.3, 0.2, 0.5, 1.0]);
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
      gl.lineWidth = 2.0;
			gl.uniform4fv(colorUniformLocation, _all_lock_colors[_all_lock]);
		}
	}

  if (mi == 12)
  {
    switch(pln_cyc)
    {
      case 0:
        gl.uniform4fv(colorUniformLocation, [0.5, 0.2, 0.2, 1.0]);
        break;
      case 1:
        gl.uniform4fv(colorUniformLocation, [0.2, 0.5, 0.2, 1.0]); 
        break;
      case 2:
        gl.uniform4fv(colorUniformLocation, [0.3, 0.3, 1.0, 1.0]);
        break;
    }
  }

  if (mi == 15) {gl.uniform4fv(colorUniformLocation, [0.3, 0.2, 0.5, 1.0]);}
  if (mi == 2) {gl.uniform4fv(colorUniformLocation, [0.4, 0.4, 0.4, 0.1]);}

  switch(mi)
  {
    case -2:
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      // gl.uniform4fv(colorUniformLocation, [0.3, 0.3, 1.0, 1.0]);
      break;

    case -3:
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4fv(colorUniformLocation, [0.5, (Date.now()%500)/500, 0.5, 1.0]);
      break;

    case -4:
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      switch(cursor_helper)
      {
        case 0:
            gl.uniform4fv(colorUniformLocation, [0.7, 0.7, 0.7, 1.0]);
          break;
        case 1:
            gl.uniform4fv(colorUniformLocation, _all_lock_colors[0]);
          break;
      }
      break;

    case -5:
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4fv(colorUniformLocation, _all_lock_colors[0]);
      break;
  }

  gl.drawArrays(gl.LINE_STRIP, 0, vertices.length / 2);
}


function drawPoints(_pnts, mi)
{
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, _pnts, gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

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
    } else {gl.uniform4fv(colorUniformLocation, [0.4, 0.4, 0.4, 0.3]);}

  // gl.enable(gl.POINT_SPRITE); // I don't know what this does.
  gl.drawArrays(gl.POINTS, 0, _pnts.length / 2);
}

var start, size, end;
var skipDat = 1;
var i0 = 0;
var j0 = 0;
var pointIndex = 0;

var _2d_previewBack;
var _2dis = [];
var _2dis_buffers = [];

_2dis.push(new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1, -1, -1]));
_2dis_buffers.push(new Float32Array(10));
_2dis.push(new Float32Array([1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1]));
_2dis_buffers.push(new Float32Array(12));

_2dis.push(new Float32Array([1.0,0.0,0.981,0.195,0.924,0.383,0.831,0.556,0.707,0.707,0.556,0.831,0.383,0.924,0.195,0.981,0.0,1.0,-0.195,0.981,-0.383,0.924,-0.556,0.831,-0.707,0.707,-0.831,0.556,-0.924,0.383,-0.981,0.195,-1.0,0.0,-0.981,-0.195,-0.924,-0.383,-0.831,-0.556,-0.707,-0.707,-0.556,-0.831,-0.383,-0.924,-0.195,-0.981,0.0,-1.0,0.195,-0.981,0.383,-0.924,0.556,-0.831,0.707,-0.707,0.831,-0.556,0.924,-0.383,0.981,-0.195,1.0,0.0]));

// This one is temp but must setup center buffer dat
// _2dis_buffers.push(new Float32Array(33*2));

// Also add circle object made in game for on point indication
// I should instead prealloc second regeion instead of new spam.

function ar2Dmod_static_single(a, b, c, s)
{
  // var nar = new Float32Array(a.length);
  for (let i = a.length-1; i>=0; i--)
  {
    b[i] = a[i]*s*_s_ratio[i%2] - c[i%2];
  }
  return b;
}

function ar2Dmod_static(a, b, c, s)
{
  // var nar = new Float32Array(a.length);
  for (let i = a.length-1; i>=0; i--)
  {
    b[i] = a[i]*s[i%2]*_s_ratio[i%2] - c[i%2];
  }
  return b;
}

function ar2Dmod(a, b, c, s)
{
  // var nar = new Float32Array(a.length);
  for (let i = a.length-1; i>=0; i--)
  {
    b[i] = a[i]*_s_ratio[i%2]*s - c[i%2];
  }
  return b;
}

function updateZMap()
{
  let _t_i = m_objs.length;
	for (var i=0; i<_t_i; i++)
  {
    if (mem_log[i][2] > 2)
    {
      let _sk = m_draw[i][1];
      for (let k = _sk; k>=0; k--)
      {
        z_map[i][0][k] = (m1.data[8 * k + mem_log[i][0] + 2] + m1.data[8 * k + mem_log[i][0] + 6] + m1.data[8 * k + mem_log[i][0] + 10])/3;
        z_map[i][1][k] = k;
      }
       z_map[i][1].sort((a, b) => z_map[i][0][a] - z_map[i][0][b]);
    } else
    {
      z_map[i] = 0; // Later check if not zero. Or doesn't matter.
    }
  }
}

// I think this worked but it took a few SECONDS to trace every tri center
// that's like 0.4 frames per second performance..

/*

function triMean(a, b, c)
{
    return new Float32Array([(a[0]+b[1]+c[2])/3, (a[0]+b[1]+c[2])/3, (a[0]+b[1]+c[2])/3]);
}

var triCtr_map = [];
var kIn_map = [];
function updateTriCtrMap()
{
  triCtr_map.length = 0;
  const _s = m_objs.length;
  for (let i=0; i<_s; i++)
  {
    if (m_objs[i].length > 2)
    {
      // can try this one
      // Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2
      let _count = Math.floor( (m_objs[i].length + 4)/4 ); 
      _si = (Math.floor((_count - 1) / 2) - _count%2);
      triCtr_map.push(new Float32Array(_si * 3)); // _si -> tris * 3 floats -> one point per tri
      kIn_map.push(new Float32Array(_si)); // _si -> tris * 1 k per tri
    } else {triCtr_map.push([]);}
  }

  let p1, p2, p3, _cr;
  // import normal map code here to calc and export dat
  
  for (var i=0; i<m_objs.length; i++)
  {
    for (var k=0; k<Math.floor((mem_log[i][2]-1)/2)-mem_log[i][2]%2; k++)
    {
      p1 = [m_objs[i][8*k], m_objs[i][8*k+1], m_objs[i][8*k+2]];
      p2 = [m_objs[i][8*k+4], m_objs[i][8*k+5], m_objs[i][8*k+6]];
      p3 = [m_objs[i][8*k+8], m_objs[i][8*k+9], m_objs[i][8*k+10]];

      _cr = triMean(p1,p2,p3);
      triCtr_map[i][3*k+0] = _cr[0];
      triCtr_map[i][3*k+1] = _cr[1];
      triCtr_map[i][3*k+2] = _cr[2];
    }
  }
}

// now/ ray trace fn and write draw bool essentially


function updateKInMap()
{
  const _s0 = triCtr_map.length;
  for (let j=0; j<_s0; j++)
  {
    const _s = triCtr_map[j].length/3;
    let _l = [];
    for (let i=0; i<_s; i++)
    {
      _l = [triCtr_map[j][i*3], triCtr_map[j][i*3+1], triCtr_map[j][i*3+2]];

      const _n = sub3(_l, player_pos);
      updateRayInters(_n, player_pos)
      kIn_map[j][i] = interKOut[_rayLast];
      console.log(rayInterMap[_rayLast]);
    }
  }
}

updateTriCtrMap();

// for (let k = 0; k <= m_draw[d_i][2]/4 - 1; k++) // Might have to - 2

// borrow my old loop and just use one coord
// maybe try populate it and setup size to fluc
// ok make list of tri centers static -> rt fn uses center dat with lpi to check every tri center ---]
// [--> nearest point --> ( this part can be complex for speed increase )store k by writing to final kIn_map --> if k == -1 no draw
// later change to every second

*/
// _uniLast = [];
// function setGlColor(_c)
// {
//   if (_uniLast[0] != _c[0] || _uniLast[1] != _c[1] || _uniLast[2] != _c[2] || _uniLast[3] != _c[3])
//   {
//     gl.uniform4fv(colorUniformLocation, _c);
//     _uniLast[0] = _c[0];
//     _uniLast[1] = _c[1];
//     _uniLast[2] = _c[2];
//     _uniLast[3] = _c[3];
//   }
// }

/*
function drawThinLines(vertices)
{
  for (let i = 0; i < vertices.length / 2 - 1; i++)
  {
    const lineWidth = 2.0 / in_win_w + 0.001; // Adjust based on canvas size
    const offset = lineWidth / 2; // Diagonal offset
    // const _r = (in_win_h/in_win_w);
    const _r = 1;
    lineVertices = new Float32Array([
       vertices[i * 2] - offset*_r, vertices[i * 2 + 1] - offset,
       vertices[i * 2 + 2] - offset*_r, vertices[i * 2 + 3] - offset,
       vertices[i * 2] + offset*_r, vertices[i * 2 + 1] + offset,
       vertices[i * 2] + offset*_r, vertices[i * 2 + 1] + offset,
       vertices[i * 2 + 2] - offset*_r, vertices[i * 2 + 3] - offset,
       vertices[i * 2 + 2] + offset*_r, vertices[i * 2 + 3] + offset,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, lineVertices, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
*/


// updateZMap();

// crack but really I can split draw calls on modulo 2 and the zeros go to TRIANGLE_STRIP
// would it be worth it even chunk draw last draw remainder?
// this may not work in every instance but marked objects may provide a tremendous performance bump

// Now make a set of data of 2d center points to feed this and scale w/ z from shader
// drawSegment(ar2Dmod_static(_2dis[2], _2dis_buffers[2], [0,0], [0.5,0.5] ), -4);

// #linesandtris

// python3 -m http.server  

// If I sort obj tri's by dist w/ fast set table reorganize
// not really that bad it's 1 check per tri.
// i can disable by center.
// the order I pack them will be the pipe

function drawLines()
{
  start = size = end = 0;

  for (let i = m_objs.length-1; i >= 0; i--)
  {
    d_i = modIndex[i];

    if (_settings[1].settings[1])
    {
      if (d_i > world_obj_count)
      {
        if (mem_log[d_i][2]>3)
        {
          if (m1.data[mem_log[d_i][0]+mem_log[d_i][1]-1] > 0)
          {
            vertices = [];
            if (!_settings[5].settings[2])
            {
              for (let k = 0; k < m_draw[d_i][1]; k++)
              {
                if(
                  m1.data[8 * k + mem_log[d_i][0] + 3] > 0 && 
                  m1.data[8 * k + mem_log[d_i][0] + 7] > 0 &&
                  m1.data[8 * k + mem_log[d_i][0] + 11] > 0)
                {
                  m_draw[d_i][0][(k) * 6] = m1.data[8 * k + mem_log[d_i][0]];
                  m_draw[d_i][0][(k) * 6 + 1] = -m1.data[8 * k + mem_log[d_i][0] + 1];

                  m_draw[d_i][0][(k) * 6 + 2] = m1.data[8 * k + mem_log[d_i][0] + 4];
                  m_draw[d_i][0][(k) * 6 + 3] = -m1.data[8 * k + mem_log[d_i][0] + 5];

                  m_draw[d_i][0][(k) * 6 + 4] = m1.data[8 * k + mem_log[d_i][0] + 8];
                  m_draw[d_i][0][(k) * 6 + 5] = -m1.data[8 * k + mem_log[d_i][0] + 9];
                } else {
                  m_draw[d_i][0][(k) * 6] = 0;
                  m_draw[d_i][0][(k) * 6 + 1] = 0;

                  m_draw[d_i][0][(k) * 6 + 2] = 0;
                  m_draw[d_i][0][(k) * 6 + 3] = 0;

                  m_draw[d_i][0][(k) * 6 + 4] = 0;
                  m_draw[d_i][0][(k) * 6 + 5] = 0;
                }
              } // end of k loop
            } else {

              for (let k = 0; k < m_draw[d_i][1]; k++)
              {
                if ( // drawLines()
                  m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 3] > 0 && 
                  m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 7] > 0 &&
                  m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 11] > 0)
                {
                  switch(z_map[d_i][1][k]%2)
                  {
                    case 0:
                      m_draw[d_i][0][(k) * 6] = m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 8];
                      m_draw[d_i][0][(k) * 6 + 1] = -m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 9];

                      m_draw[d_i][0][(k) * 6 + 2] = m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 4];
                      m_draw[d_i][0][(k) * 6 + 3] = -m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 5];

                      m_draw[d_i][0][(k) * 6 + 4] = m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0]];
                      m_draw[d_i][0][(k) * 6 + 5] = -m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 1];
                    break;

                    case 1:
                      m_draw[d_i][0][(k) * 6] = m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0]];
                      m_draw[d_i][0][(k) * 6 + 1] = -m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 1];

                      m_draw[d_i][0][(k) * 6 + 2] = m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 4];
                      m_draw[d_i][0][(k) * 6 + 3] = -m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 5];

                      m_draw[d_i][0][(k) * 6 + 4] = m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 8];
                      m_draw[d_i][0][(k) * 6 + 5] = -m1.data[8 * z_map[d_i][1][k] + mem_log[d_i][0] + 9];
                    break;
                  }
                } else {
                  m_draw[d_i][0][(k) * 6] = 0;
                  m_draw[d_i][0][(k) * 6 + 1] = 0;

                  m_draw[d_i][0][(k) * 6 + 2] = 0;
                  m_draw[d_i][0][(k) * 6 + 3] = 0;

                  m_draw[d_i][0][(k) * 6 + 4] = 0;
                  m_draw[d_i][0][(k) * 6 + 5] = 0;
                }
              }
            }

            if (_settings[5].settings[3])
            {
              gl.enable(gl.CULL_FACE);
              gl.cullFace(gl.BACK);
            } else {gl.disable(gl.CULL_FACE);}


            if (!_settings[5].settings[2])
            {
              switch(!_settings[1].settings[2])
              {
                case true:
                  gl.uniform4fv(colorUniformLocation, [0.4, 0.4, 0.4, 1.0]); 
                  break;
                case false:
                  gl.uniform4fv(colorUniformLocation, [0.4, 0.4, 0.4, 1.0]);
                  break;
              }
              gl.uniform1i(renderModeUniform, 1);
              gl.disableVertexAttribArray(colorAttribLocation);

              gl.enableVertexAttribArray(positionAttrib);
              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, m_draw[d_i][0], gl.STATIC_DRAW);
              gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

              gl.drawArrays(gl.TRIANGLES, 0, m_draw[d_i][1]*3);
            }
            else
            {
              
              for (let l=0; l<m_draw[d_i][3]*4; l++) { m_draw[d_i][4][l] = (l%4==3) ? 1-_settings[1].settings[2]*0.7 : 1/m_draw[d_i][3]*l*1.5+0.25; }

              gl.uniform1i(renderModeUniform, 0); // Should need this right

              gl.enableVertexAttribArray(positionAttrib);
              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, m_draw[d_i][0], gl.STATIC_DRAW);
              gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

              gl.enableVertexAttribArray(colorAttribLocation);
              gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, m_draw[d_i][4], gl.STATIC_DRAW);
              gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);

              gl.drawArrays(gl.TRIANGLES, 0, m_draw[d_i][1]*3);
            }
          }
        }
      }       
    }

    gl.uniform1i(renderModeUniform, 1);

    /* // last
    // var ar_t = new Float32Array(((Math.floor((Math.floor(ar_f.length/4)-1)/2)-Math.floor(ar_f.length/4)%2)-1) * 6 + 6 );
    // m_draw.push([ar_t, ar_t.length/6, ar_t.length]); // Make space for webgl tris
    
    // var ar_t = new Float32Array( 6 );
    // m_draw.push([ar_t, 1, ar_t.length]); // Make space for webgl tris
    */

    // || (d_i == 14))
    
    skipDat = 1;

    if (!(_settings[1].settings[0])
    || (d_i == 13 && mem_t_sum == 0) // mem t sum ???
    || (d_i == 2 && !_settings[5].settings[1])
    || (d_i == 11 && wpn_select!=3)
    || (d_i == 14)
    || (d_i == 15 && !boundingBox.enable)
    )
    {
      skipDat = 0;
    }

    if ( (d_i < 3 && d_i != 1 && skipDat) || (d_i > 5 && d_i != 1 && skipDat) )
    {
      vertices = [];

      start = mem_log[d_i][0];
      size = mem_log[d_i][1];
      end = start + size;
      
      for (let j = start; j < end - 4; j += 4)
      {
        if (m1.data[j + 3] < 0)
        {
          if (vertices.length > 0) // do not remove this
          {
            drawSegment(vertices, d_i);
            vertices.length = 0;
          }
        } else
        {
          // x, y
          vertices.push(m1.data[j], -m1.data[j + 1]);
        }
      }
      // last segment
      if (vertices.length > 0)
      {
        drawSegment(vertices, d_i);
      }
    }

    if ((d_i > 2 && d_i < 6) || d_i == 1)
    {
      _si2 = mem_log[d_i][2];
      _pts = new Float32Array(_si2 * 2 + 2);

      // Experiment using while instead of for. Irrelevant performance difference?
      i0 = 0;
      j0 = 0;
      pointIndex = mem_log[d_i][0];

      while (i0 < _si2 * 4)
      {
        if (m1.data[pointIndex + 3] >= 0)
        {
          _pts[j0] = m1.data[pointIndex];           // x
          _pts[j0 + 1] = -m1.data[pointIndex + 1];  // y
          j0 += 2;
        }
         pointIndex += 4;
         i0 += 4;
      }
      _pts[_si2] = 0.0;
      _pts[_si2+1] = 0.0;

      drawPoints(_pts, d_i);
    }

  
  } // End of first obj loop

  // Working object being drawn
  for (let i = mem_t_log.length - 1; i>=0 ; i--)
  {
    vertices = [];
    
    start = mem_sum;
    size = mem_t_sum;
    end = start + size;
    
    for (let j = start; j < end; j += 4)
    {
      if (m1.data[j + 3] < 0) {
        if (vertices.length > 0)
        {
          drawSegment(vertices, -1);
          // drawThinLines(vertices);
          vertices.length = 0;
        }
      } else
      {
        // x y
        vertices.push(m1.data[j], -m1.data[j + 1]);
      }
    }
    // last segment
    if (vertices.length > 0)
    {
      drawSegment(vertices, -1);
      // drawThinLines(vertices);
    }
  }


  // move all this back into fn to make good reverse fn
  _2d_previewBack = ar2Dmod_static(_2dis[1], _2dis_buffers[1], [-(menu_obj_pos[0]-in_win_w*0.01)/in_win_w, -0.5+(menu_obj_pos[1]-0-menu_obj_size[2]/2+menu_obj_size[0]+2)/in_win_h], [menu_obj_size[0]/in_win_w, menu_obj_size[0]/in_win_h*in_win_hw]);


  // Draw the triangles after setting the color
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, _2d_previewBack, gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  gl.uniform4fv(colorUniformLocation, [0.12, 0.12, 0.12, 1.0]); 
  gl.drawArrays(gl.TRIANGLES, 0, _2d_previewBack.length / 2);

  // Preview object
  vertices = [];
  // for (let j = 0; j<_preview_obj.length/4 - 1; j++) // Removing center
  for (let j = _preview_obj.length/4 - 2; j>=0; j--) // Removing center
  {
    
    // Already normalized this earlier with minMax so theoretically it's only necessary to scale it.
    // Still needs to be fixed where I have minmax. pick dimension maximum to scale everything.
    // scale 2 other smaller dims by same scaler and don't use 3d len
    
    _tp =
    [
      1.9*_preview_obj[j*4],
      -1.9*_preview_obj[j*4+1],
      1.9*_preview_obj[j*4+2]
    ]

    _np = rot_x_pln(_tp, 0.2);
    _np = rot_z_pln(_np, 0.2);
    _np = rot_y_pln(_np, 0.001*Date.now()%10000);

    _np[0] = _np[0];
    _np[1] = in_win_wh * _np[1];

    vertices.push(
    _np[0]*menu_obj_size[0]/in_win_w+(menu_obj_pos[0]-in_win_w*0.01)/in_win_w,
    _np[1]*menu_obj_size[0]/in_win_h*in_win_hw+0.5-(menu_obj_pos[1]-0-menu_obj_size[2]/2+menu_obj_size[0]+8)/in_win_h
    );

  }

  // Draw the lines for the last segment
  if (vertices.length > 0)
  {
      drawSegment(vertices, -2);
  }


  // 2D indicators

  _np = [ -m1.data[mem_log[9][0]], m1.data[mem_log[9][0]+1] ];
  _tp = [ -m1.data[mem_log[10][0]], m1.data[mem_log[10][0]+1] ];
  _2dp_boundingBox0 = [ -m1.data[mem_log[15][0] + 4*boundingBox.kf], m1.data[mem_log[15][0] + 4*boundingBox.kf+1] ];
  _2dp_boundingBox1 = [ -m1.data[mem_log[15][0] + 4*boundingBox.if], m1.data[mem_log[15][0] + 4*boundingBox.if+1] ];

  // Use this: by dist scale to setup the centers.
  // drawSegment(ar2Dmod(_2dis[j], _np, m1.data[mem_log[12][0]+mem_log[12][1]-2]*0.01 ), -2);
  // drawSegment(ar2Dmod(_2dis[j], _tp, m1.data[mem_log[12][0]+mem_log[12][1]-2]*0.005 ), -2);
  
  if (trns_lock)
  {
    if (m1.data[mem_log[9][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _tp, 0.018 ), -3);}
    if (m1.data[mem_log[10][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _np, 0.009 ), -3);}
  }
  else
  {
    if (m1.data[mem_log[9][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _np, 0.009 ), -4);}
  }

  if (translateFolder.active)
  {
    if (m1.data[mem_log[10][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _np, 0.009 ), -3);}
  }

  if (boundingBox.active)
  {
    if (m1.data[mem_log[15][0] + 4*boundingBox.k+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _2dp_boundingBox0, 0.006 ), -3);}
    if (m1.data[mem_log[15][0] + 4*boundingBox.i+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _2dp_boundingBox1, 0.006 ), -3);}
  }

  if (!mouseLock || wpn_select == 1 || key_map.tab)
  {
    for (let i = m_objs.length-1; i>=0; i--)
    {
      d_i = modIndex[i];
      if (d_i > world_obj_count)
      {
      // set 2d centers here
      m_center2d[d_i][0] = -m1.data[ mem_log[d_i][0] + mem_log[d_i][1] - 4 ];
      m_center2d[d_i][1] =  m1.data[ mem_log[d_i][0] + mem_log[d_i][1] - 3 ];

      // Now make a set of data of 2d center points to feed this and scale w/ z from shader
      drawSegment(ar2Dmod_static_single(_2dis[2], m_center2d_buffer[d_i], m_center2d[d_i], m1.data[mem_log[d_i][0]+mem_log[d_i][1]-2]*0.01 ), -5);
     }
    }
  }

  // Last thing to add will be the cursor helper!

} // End of drawLines()


function drawIt()
{
	Compute(m1);
	updateDrawMap([obj_cyc,12,15,3,4,5]);

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);	

	drawLines();
  updateFPS();
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

// now here find ray from eye

// m1.data[4*k+mem_log[14][0]]+_x/in_win_hc*(in_win_h/in_win_w),
// m1.data[4*k+mem_log[14][0]+1]+_y/in_win_hc

function mouseToWorld()
{
  // Needs refactor and rename

  let _2dx = m1.data[mem_log[14][0] + 12] - m1.data[mem_log[14][0] + 4];
  let _2dy = m1.data[mem_log[14][0] + 9] - m1.data[mem_log[14][0] + 1];
  
  let _x = in_win_wc-mouseData[0];
  let _y = in_win_hc-mouseData[1];
  
  let _dx = (-_x/in_win_hc*(in_win_h/in_win_w)) - (m1.data[mem_log[14][0] + 4]);
  let _dy = (_y/in_win_hc) - (m1.data[mem_log[14][0]]);
  
  let _vsc = _dx/_2dx;
  let _vsc0 = -_dy/_2dy;

  let _v1 = [m_objs[14][12], m_objs[14][13], m_objs[14][14]];
  let _v2 = [m_objs[14][4], m_objs[14][5], m_objs[14][6]];
  let _vd1_0 = add3(scale(sub3(_v1, _v2), _vsc), _v2); // length always 16

  let _v10 = [m_objs[14][8], m_objs[14][9], m_objs[14][10]];
  let _v20 = [m_objs[14][0], m_objs[14][1], m_objs[14][2]];
  let _vd1_1 = scale(sub3(_v10, _v20), _vsc0); // length always 16

  let _vdf = add3(_vd1_0, _vd1_1);
  let _testv = sub3(_vdf, player_pos)
  
  let _teste = scale(_testv, 1/len3(_testv));

  let _d = -player_pos[1]/dot([0,1,0],norm(_teste));
  let _ff = [player_pos[0]+_d*_teste[0],player_pos[1]+_d*_teste[1],player_pos[2]+_d*_teste[2]]; // player pos + look dir * 

  return _ff;
}

function pointerOutsideWindow()
{
	// #incheck
	var _in = [0,1,1];

	if ((mouseData[0] > menu_q_pos[0]) && (mouseData[0] < (menu_q_pos[0]+menu_q_size[0])))
	{
		if ((mouseData[1] > menu_q_pos[1]) && (mouseData[1] < (menu_q_pos[1]+menu_q_size[1])))
		{
			_in[1] = 0;
		}
	}

	if ((mouseData[0] > menu_obj_pos[0]) && (mouseData[0] < (menu_obj_pos[0]+menu_obj_size[0])))
	{
		if ((mouseData[1] > menu_obj_pos[1]) && (mouseData[1] < (menu_obj_pos[1]+menu_obj_size[1])))
		{
			_in[2] = 0;
		}
	}

  if (_in[1] && _in[2]) {_in[0] = 1;}

	return _in;
}

var boundingBox =
{
  i: 0,
  k: 0,
  kf: 0,
  if: 0,
  c: Object,
  op: [0,0,0],
  ep: 1e-3,
  obj: 0,
  dims: [1,1,1],
  prev: [0,0,0],
  half: [1,1,1,1],
  match: [0,0,0],
  remap1: [1, 0, 3, 2, 5, 4, 7, 6],
  remap2: [4, 5, 6, 7, 0, 1, 2, 3],
  active: 0,
  focus: 0,
  enable: 0,
  runhook: 0,
  fpshook: 0,
  lpstart: [0,0,0],
  lpdelta: [0,0,0],
  lp: [0,0,0],
  toggle: function ()
  {
    switch(boundingBox.enable)
    {
      case 0:
        if (obj_cyc <= world_obj_count) {break;}
        boundingBox.enable = 1;
        boundingBox.focus = 1;
        boundingBox.obj = obj_cyc;
        boundingBox.set();
        break;
      case 1:
        boundingBox.focus = 0;
        boundingBox.enable = 0;
        boundingBox.obj = 0;
        break;
    }
  },
  set: function ()
  {
    boundingBox.focus = 1;
    this.c = getctr_obj(this.obj);
    this.dims = getMinMaxPairs(m_objs[this.obj]);
    arScale(m_objs[15], m_objs_ghost[15], this.c, [0,0,0], [this.dims[0]/2,this.dims[1]/2,this.dims[2]/2,1]);
  },
  match: function()
  {
    let _s = m_cube.length;
    for (let i=0; i<_s; i++)
    {
      if (Math.abs(_lp_world[0] - m_objs[15][i * 4]) < this.ep
          && Math.abs(_lp_world[1] - m_objs[15][i * 4 + 1]) < this.ep
          && Math.abs(_lp_world[2] - m_objs[15][i * 4 + 2]) < this.ep)
      {
        boundingBox.getMatch(i);
        boundingBox.focus = 0;
        break;
      }
    }
  },
  updateK: function()
  {
    let _s = m_cube.length;
    for (let i=0; i<_s; i++)
    {
      if (Math.abs(this.prev[0] - m_objs[15][i * 4]) < this.ep
          && Math.abs(this.prev[1] - m_objs[15][i * 4 + 1]) < this.ep
          && Math.abs(this.prev[2] - m_objs[15][i * 4 + 2]) < this.ep)
      {
        this.k = i;
        break;
      }
    }
  },
  getMatch: function(i)
  {
      // console.log("aye: " + i);
      // 0 -> 5
      // 1 -> 4
      // 3 -> 6
      // 2 -> 7

      let _sign = (i<4) ? 1 : -1;
      let _off = (i==0 || i==2 || i==5 || i==7) ? 2 : 0;

      this.op[0] = this.prev[0] = m_objs[15][(i+(3+_off)*_sign)*4];
      this.op[1] = this.prev[1] = m_objs[15][(i+(3+_off)*_sign)*4 + 1];
      this.op[2] = this.prev[2] = m_objs[15][(i+(3+_off)*_sign)*4 + 2];
      this.match[0] = m_objs[15][(i)*4];
      this.match[1] = m_objs[15][(i)*4 + 1];
      this.match[2] = m_objs[15][(i)*4 + 2];
      this.i = i; this.k = (i+(3+_off)*_sign);
  },
  apply: function ()
  {
    if (this.active)
    {
      // this.updateK(); // bad
      arScale(m_objs_ghost[this.obj], m_objs[this.obj], [0,0,0,0], [0,0,0,0], [1,1,1,1]);
      this.active = 0;
      this.runhook = 0;
      return;
    } else {this.active = 1;}
  },
  run: function ()
  {
    if (!this.runhook)
    {
      this.lpstart =
      [
        _lp_world[0],
        _lp_world[1],
        _lp_world[2]
      ];
      this.runhook = 1;
    }

    this.lpdelta =
    [
      (_settings[3].settings[0]) ? 0 : _lp_world[0] - this.lpstart[0],
      (_settings[3].settings[1]) ? 0 : _lp_world[1] - this.lpstart[1],
      (_settings[3].settings[2]) ? 0 : _lp_world[2] - this.lpstart[2]
    ];

    this.updateK();
    this.if = this.remap2[this.remap1[this.k]];
    // this.kf = this.k;

    this.lp =
    [
      this.lpstart[0] + this.lpdelta[0],
      this.lpstart[1] + this.lpdelta[1],
      this.lpstart[2] + this.lpdelta[2]
    ];

    this.dims = sub3(this.lp, this.op);
    this.half = add3(scale3(this.dims, 0.5), this.op);

    let _md0 = sub3(this.match, this.op);
    let _md = sub3(this.lp, this.match);
    
    let _mdf =
    [
      _md[0]/((_md0[0]==0) ? 1 : _md0[0])+1,
      _md[1]/((_md0[1]==0) ? 1 : _md0[1])+1,
      _md[2]/((_md0[2]==0) ? 1 : _md0[2])+1,
      1
    ];

    arScale(m_objs[15], m_objs_ghost[15], this.half, [0,0,0,0], [this.dims[0]/2,this.dims[1]/2,this.dims[2]/2,1]);
    arScale(m_objs[this.obj], m_objs_ghost[this.obj], getctr_obj(15), this.c, _mdf);

    if (!key_map.lmb) {boundingBox.apply(); boundingBox.focus = 1;}
  }
};

functionRunList.push(boundingBox);


// scale a unit cube to the size of min/max
// really 6 pieces of information
// min & max of each axis so 3*2 querys
// while itor over w/ 4*i take min/max as two loops or do both for each axis at the same time.
		
function getMinMaxPairs(ar)
{
  if (typeof ar != "undefined")
  {
    // set the initial values to the first point.
    let ar_x_max = ar[0]; let ar_x_min = ar[0];
    let ar_y_max = ar[1]; let ar_y_min = ar[1];
    let ar_z_max = ar[2]; let ar_z_min = ar[2];

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
}

var _tp, _np, _2dp_boundingBox0, _2dp_boundingBox1;
var _preview_ctr = [];
var _preview_obj;

function updateRefLog()
{

	_preview_scaler = 1/len3(getMinMaxPairs(m_objs[obj_cyc]));
	_preview_ctr = meanctr_obj(m_objs[obj_cyc]);
	_preview_obj = new Float32Array(m_objs[obj_cyc].length);
  arClone(_preview_obj, m_objs[obj_cyc], _preview_ctr, _preview_scaler);

	// m_ref_objs[0] = new Float32Array(m_objs[obj_cyc].length);
	// m_ref_sum = m_objs[obj_cyc].length; // temp can't really be this
}

           /*@?@
           ?@?@?
           @?@*/

function Compute(init_dat)
{


  if (_settings[5].settings[2]) {updateZMap();}

	m_obj_offs[12][0] = _lp_world[0];
	m_obj_offs[12][1] = _lp_world[1];
	m_obj_offs[12][2] = _lp_world[2];
	m_obj_offs[12][3] = _settings[5].settings[0]/2.0;

  if (mem_t_sum != 0)
  {
    m_obj_offs[13][0] = m_t_objs[m_t_objs.length-1][0];
    m_obj_offs[13][1] = m_t_objs[m_t_objs.length-1][1];
    m_obj_offs[13][2] = m_t_objs[m_t_objs.length-1][2];
    m_obj_offs[13][3] = _settings[5].settings[0]/8.0;
  }

  // RUN LIST HERE
  let _run_check = false;
  for (let p = functionRunList.length-1; p>=0; p--)
  {
    if (functionRunList[p].active) {functionRunList[p].run();}
    if (functionRunList[p].enable) {_run_check = true;}
  }
  flag_objModif = _run_check;

  // if (key_map.j && runEvery(50))
  // {
  //   let _np = rot_y_pln(sub3(player_pos, _lp_world), 0.05);
  //   setPoint(player_pos, add3(_np, _lp_world));
  // }

  // This needs to be replaced with menu script providing multiple callback functions.
  // Shared and specific callback functions need differentiation

	if (obj_cyc != obj_cyc_i)
	{
		updateList(objListConst(), "list_objectSelect");
    updateTree(tree_allObjects);
    updateRefLog();
		obj_cyc_i = obj_cyc;
	}

  // will have to look on my git to find history bring this back in to remove
  if (_settings[5].settings[0] != grid_scale_d)
  {
    updateGrid();
  } // Compute()

  if(document.activeElement.type ==  "text")
  {
    flag_inText = 1;
  } else {flag_inText = 0;}
  
	if (key_map.shift && key_map.r && runEvery(150))
	{
		rotateObject(0, _settings[7].settings[0], obj_cyc);
	}

	if (key_map["5"] && runEvery(150))
	{
		mirrorOverPlane();
	}

	if (key_map["6"] && runEvery(300)) {boundingBox.toggle();}

	if (key_map.l && runEvery(300)) {link_obj(obj_cyc);}

	if ((key_map.q || key_map.enter) && runEvery(220)) {pointerLockSwap();}

	if (key_map["7"] && runEvery(300))
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
				if (!_settings[3].settings[0]) {m_obj_offs[trns_obj_i][0] = _fd[0];}
				if (!_settings[3].settings[1]) {m_obj_offs[trns_obj_i][1] = _fd[1];}
				if (!_settings[3].settings[2]) {m_obj_offs[trns_obj_i][2] = _fd[2];}
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

	if (key_map.e && runEvery(120)) {mem_t_mov(); key_map.e = false;} // m_t_objs.length = 0; mem_t_log.length = 0; obj_cyc = mem_log.length-1;
	
	if (key_map.p && runEvery(350)) {if (mouseLock) {pointerLockSwap();} downloadSaveFile();}


	if (key_map.n && runEvery(500)) {playerChangeMovementMode();}
	if (lock_vert_mov) {player_pos[1] = -hover_h;}
	if (key_map.r && !key_map.shift && runEvery(150))
  {
    planeCycle();
  }

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
		}


	if (isNaN(m_objs[0][0])) {m_objs[0][0] = 0.0; m_objs[0][1] = 0.0; m_objs[0][2] = 0.0; m_objs[0][3] = 1.0;}

  if (key_map["1"] && runEvery(100)) {wpn_select = 0; updateWpnSelect();}
  if (key_map["2"] && runEvery(100)) {wpn_select = 1; updateWpnSelect();}
  if (key_map["3"] && runEvery(100)) {wpn_select = 2; updateWpnSelect();}
  if (key_map["4"] && runEvery(100)) {wpn_select = 3; updateWpnSelect();}

	switch(pln_cyc) // can't return w/ rmb. only in vertical??
	{
		case 0:
			grid_scale_ar[1] = _settings[5].settings[0];
			grid_scale_ar[2] = _settings[5].settings[0];
			break
		case 1:
			grid_scale_ar[0] = _settings[5].settings[0];
			grid_scale_ar[2] = _settings[5].settings[0];
			break
		case 2:
			grid_scale_ar[0] = _settings[5].settings[0];
			grid_scale_ar[1] = _settings[5].settings[0];
			break
	}

 	// check nan other place? like lpi?
 	if (mouseLock == 1)
 	{
		if (!isNaN( _inter[0])) {_inter_rnd = [roundTo(_lp[0], grid_scale_ar[0]), roundTo(_lp[1], grid_scale_ar[1]), roundTo(_lp[2], grid_scale_ar[2])];}
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
				}
			}
      // console.log(m1.data[mem_log[14][0] + 4]);
      // (in_win_wc-mouseData[0], in_win_hc-mouseData[1]);


			if (key_map.lmb && !mouseLock) //  && runEveryLong(75)
			{
				if (pointerOutsideWindow()[0])
				{
					select2dpoint(in_win_wc-mouseData[0], in_win_hc-mouseData[1]);

				}
			}

			if (key_map.tab && !mouseLock && runEveryLong(75))
			{
				if (pointerOutsideWindow()[0])
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

        // here one time pass to ez connect resize tool
        if (!boundingBox.fpshook)
        {
          if (boundingBox.enable)
          {
            select2dpoint(0,0);
          }
          boundingBox.fpshook = 1;
        }
      } else if (!key_map.lmb)
      {
        boundingBox.fpshook = 0;
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

				if (wpn_1) {m_obj_offs[obj_cyc] = roundPTo(sub(sub(player_pos, scale(f_look, wpn_1_d)), wpn_1_mc), _settings[5].settings[0]);}

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
				switch(_settings[4].settings[0])
				{
					case false:
						if (paint_n < _settings[4].settings[2])
						{
							paint_d = len3(sub(_inter, _paint_track));
							if (paint_d > _settings[4].settings[1])
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
						if (paint_d > _settings[4].settings[1])
						{
							m_t_objs_loadPoint(new Float32Array([_inter[0], _inter[1], _inter[2], 1.0]));
							_paint_track[0] = _inter[0];
							_paint_track[1] = _inter[1];
							_paint_track[2] = _inter[2];
						}
          break;
				}
			}
			if (_settings[4].settings[0] && key_map.lmb == false) {mem_t_mov();} // Finish draw !
			break;
		case 3:

      if (key_map.lmb && !mouseLock && runEvery(20))
      {
        // let _p = lpi(mouseToWorld, player_pos, _lp_world, [0,1,0]);
        // could get this to work if I made _plr_dtp use mouseToWorld dir vec
        // but might work out easier to ray to new obj?

        updateRayInters(mouseToWorld(), player_pos);
        if (rayInterMap.length > 0)
        {
          let _p = rayInterMap[_rayLast];
          m_t_objs_loadPoint(_p);
          _lp_world[0] = _p[0];
          _lp_world[1] = _p[1];
          _lp_world[2] = _p[2];
          // console.log(rayInterMap[_rayLast]);
        }
        // obj_cyc = _tc;
        // m_obj_offs[obj_cyc] = [_tc[0],_tc[1],_tc[2],1];
      }


			if (key_map.lmb && mouseLock && runEvery(10))
			{
        //_plr_dtp, player_pos
        //where gun shoots

				updateRayInters(_plr_dtp, player_pos);
        if (rayInterMap.length > 0)
        {
          m_t_objs_loadPoint(rayInterMap[_rayLast]);
        }
        
        // let _tc = typeof rayInterMap[_rayLast] != "undefined" ? rayInterMap[_rayLast] : [0,0,0];
        // m_obj_offs[obj_cyc] = [_tc[0],_tc[1],_tc[2],1];
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

  // Measure line length
	if (key_map.m && runEvery(200))
	{
		var _t_obj = splitObj(m_objs[obj_cyc]);
		var _t_d = len3(sub(_t_obj[0], _t_obj[1]));
		console.log(_t_d);
		_settings[5].settings[0] = _t_d;
	}

	// Send array as easy to copy for float32array
	if (key_map["/"] && runEvery(150))
	{
		var _d = m_objs[obj_cyc]; // String
		var _f = "[";
		var _v = 0;
		for (var i=0; i<_d.length-4; i++)
		{
      // must have set i+1 when I did 2d
			// if ( (i)%4 == 0 ) {_v = 0;} else {_v = (_d[i]/1).toFixed(4);}
      _v = (_d[i]/1).toFixed(4);
      if (_d[i] == 0) {_v = 0;}
			if (i!=_d.length-5) {_f = _f+_v+",";} else {_f = _f+_v;}
			if (i==_d.length-5) {_f = _f+"]";}
		}
		console.log(_f); // Do not remove
	}


/*
function vertFixMeF(a)
{
  let f = new Float32Array(a.length/2);
  for (let i = 0; i<a.length/4; i++) {
  f[i*2] = (a[i*4]).toFixed(3);
  f[i*2+1] = (a[i*4+2]).toFixed(3);
  }
  return f;
}

function fixme2(a)
{
  var _d = a; // String
  var _f = "[";
  var _v = 0;
  for (var i=0; i<_d.length; i++)
  {
    _v = _d[i].toFixed(4);
    if (i!=_d.length-1) {_f = _f+_v+",";} else {_f = _f+_v;}
    if (i==_d.length-1) {_f = _f+"]";}
  }
  console.log(_f);
}
*/

	_pp = [_lp[0], _lp[1], _lp[2]]; // Point on plane = last point placed

  // Need to keep the next plane always ready so there's no funny business when switching
  // using mod 3

  switch((pln_cyc+1)%3)
	{
		case 0:
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

	switch(pln_cyc)
	{
		case 0:
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


/*
  The depth for pts: 1/Math.pow((w*(0.03))

	float a = PI/6.;
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

setData(); // Load all vertices


shaderModule.run(
    init_dat,
    player_look_dir[0],
    player_look_dir[1],
    in_win_wc,
    in_win_hc,
    s_fov,
    player_pos[0],
    player_pos[1],
    player_pos[2]
  );

} // End of Compute()


						/*-- GET&SET SCREEN DIMENSIONS --\
						\-------------------------------*/

document.addEventListener("DOMContentLoaded", function()
{
	document.getElementsByTagName("body")[0].width = in_win_w;
	document.getElementsByTagName("body")[0].height = in_win_h;

	updateNormalMaps();

	updateList(objListConst(), "list_objectSelect");
  updateTree(tree_allObjects);

  updateRefLog();
	updateMenuPos();
  updateWpnSelect();

	Compute(m1);
	updateGrid();

	m_obj_offs[tse] = [0,-400,0,1]; // Move gun to above

	drawIt();

  _preview_scaler = 1/len3(getMinMaxPairs(m_objs[2]));
	obj_cyc = 2; // Temp fix

	// m_ref_objs[0] = new Float32Array(m_map.length);
  
	setBackgroundColor();

	setInterval(drawOverlay, menuTime_int); 
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
