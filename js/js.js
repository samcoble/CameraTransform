
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


const pi = 3.141592653589793, // high definition PI makes a visible difference
      pi2 = 6.283185307179586,
      menuTime_int = 220,
      title_int = 420,
      player_speed = 0.5 * 0.26,
      player_speed_vert = 0.3 * 0.7, // vertical travel speed
      player_speed_mult = 4 * 0.7, // shift/sprint key
      mem_encode = [4, 16], // offsets to be used where encoded data ref
      base_dir = [1,0,0,1, 0,1,0,1, 0,0,1,1],
      ref_data = [1,0,0,1, 0,1,0,1, 0,0,1,1, 0,0,0,1],
      _scroll_mult = 18;

var fileName = "";
var world_obj_count = 0;
var _preview_scaler;
var _s_ratio;
var cursor_helper = 0;
var miniBar_stn = [0,0,0];
var grid_plane = [0,0,1];
var enableViewRef = false;
var text_log = [];

// var click_map; // pointer to object clickMonitor array data

var flag_objModif = false, // replace _run_check with diff sys
    flag_loadingObject = 0,
    flag_loadTemp = 0,
    flag_inText = 0,
    _run_check = false,
    _run_objs = [],
    e_log = [],
    functionRunList = [];

var obj_folders = [],
    obj_last = 0, // last obj created id
    folder_names = [],
    folder_parents = [-1, 0, 0, 0, -1], // -1 is no parent
    folder_toggle = [0, 0, 0, 0, 1],
    folder_selected_objs = [],
    folder_selected = 4, // default folder
    folder_cwd = 4, // default folder
    folder_last= 0; // last used

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
    _all_lock = 0, // pass through color
    _all_lock_i = 0;

var paint_d = 0,
    paint_n = 0,
    paint_c = 0, // check
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

var menu_q_size = [280, 612],
    menu_q_pos = [30, 240],
    menu_obj_pos = [0, 0],
    menu_obj_size = [],
    menu_objpreview_pos = [0, 0],
    menu_tab = 0,
    menu_wpn_pos = [155, 10],
    menu_scroll_c = 0, // scroll offset, real constant
    menu_q_scale = [1, 54.5];

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

var m_draw = [],
    m_center2d = [],
    m_center2d_buffer = [],
    z_map = [];

var m_obj_offs = [],
    m_objs = [], // [[n,...,],[n,...,],...]
    mem_log = [], // [start, size]
    mem_sum = 0,
    m_objs_ghost = [], // Cloned m_obj data
    m_t_objs = [], // [[n,...,],[n,...,],...]
    mem_t_log = [], // [start, size]
    mem_t_sum = 0;


// IEMobile and BlackBerry users I got you fam.
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function updateMenuPos() // this stuff so bad jesus
{
  let _tree_folder_h = document.getElementById("tree_allObjects").clientHeight;

  menu_q_size[1] = in_win_h/100*menu_q_scale[1];
  document.getElementById('tree_allObjects').style.maxHeight = menu_q_size[1]-200+'px';
  document.getElementById('menu_q').style.height = menu_q_size[1]+"px";

  menu_obj_size = [200, 500, _tree_folder_h+26+200]; // default & modified to include margins	
  menu_obj_pos = [in_win_w-200-in_win_w*0.01, in_win_h*0.5 - 0.5*menu_obj_size[2]];
 	menu_objpreview_pos = [in_win_wc-165/2, -in_win_hc+170/2]; // not sure what this does

	menu_q_pos = [in_win_w*0.01, in_win_h*0.5 - 0.5*menu_q_size[1]];
	menu_wpn_pos = [in_win_w/100*3, in_win_h/100*90];

	document.getElementById("menu_q").style.top = menu_q_pos[1]+"px";
	document.getElementById("menu_q").style.left = menu_q_pos[0]+"px";

	document.getElementById("menu_obj").style.top = menu_obj_pos[1]+"px"; // preview & tree's top offset
	// document.getElementById("menu_obj").style.left = menu_obj_pos[0]+"px"; // using css instead
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

function setBackgroundColor()
{
  let _c = [
   getSetting('detail_box_colorSettings', 1)[0],
   getSetting('detail_box_colorSettings', 1)[1],
   getSetting('detail_box_colorSettings', 1)[2]
  ];
	document.body.style.backgroundColor = "rgb(" + _c[0] + "," + _c[1] + "," + _c[2] + ")";
}

function playSound(src)
{
  if (getSetting('detail_box_generalSettings', 1)[0])
  {
    let _audio = document.getElementById('audioPlayer');
    _audio.src = src;
    _audio.volume = 0.1;
    _audio.play();
  }
}

var player_pos_i = [],
    mScreenMode = 0,
    mTimer = 0,
    dragCatch = 0,
    _touch_start = [];


if (isMobile)
{
	document.addEventListener('touchstart', (event) => {
		if (pointerOutsideWindow[0]) { event.preventDefault(); }
		mTimer = Date.now();
		mScreenMode = 0;
		dragCatch = 1;
		set2(_touch_start, [event.touches[0].clientX, event.touches[0].clientY]);
		
		if (event.touches[0].clientX < in_win_wc) {mScreenMode = 1;}

	});
	
	document.addEventListener('touchmove', (event) => {
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
	
	  if (pointerOutsideWindow()[0])
	  {
	    switch(mScreenMode)
	    {
	      case 0:
	        setPoint(player_look_dir, [ player_look_dir_i[0]+(_touch_delta[0]/in_win_w * pi * 2) , player_look_dir_i[1]-(_touch_delta[1]/in_win_w * pi * 2) , 0 ]);
	      break;
	
	      case 1:
	        updateLook();
	        // let _np = rot_y_pln(sub3(player_pos_i, _lp_world), (_touch_delta[0]/in_win_w * pi * 2));
	        // move plr
	        // setPoint(player_pos, add3(_np, _lp_world));
	        //y
	        // player_pos[1] = player_pos_i[1] + _touch_delta[1]/in_win_w*320;
	        
	        let _lv = lock_vert_mov ? [f_look[0], 0, f_look[2]] : f_look;
	        let _dx = scale3(makeDir(cross(f_look, [0,1,0])), -_touch_delta[0]/in_win_w*320);
	        let _dy = scale3(_lv, _touch_delta[1]/in_win_w*320);
	        setPoint(player_pos, add3(player_pos_i, add3(_dx, _dy)));
	
	        // setPoint(player_pos, add3(player_pos_i, ));
	        // update dir
	        // setPoint(player_look_dir, [ player_look_dir_i[0]-(_touch_delta[0]/in_win_w * pi * 2) , player_look_dir_i[1], 0 ]);
	      break;
	    }
	  }
	});
		
	document.addEventListener('touchend', (event) => {
	  if (pointerOutsideWindow()[0])
	  {
	    let _dt = Date.now()-mTimer;
	    dragCatch = 0;
	    if (_dt < 230)
	    {
	      console.log(_touch_start);
	      console.log(_dt);
	      select2dpoint(in_win_wc-_touch_start[0], in_win_hc-_touch_start[1]);
	    }
	    // window.onload = requestFullscreen();
	  }
	});
}

document.onmousemove = function(e)
{
  if (mouseLock)
  {
    let _a = 1000,
        _af = (
          key_map.shift &&
          wpn_select==2 &&
          (keyVec[0]+keyVec[1])==0
        ) ? 3*_a : _a;

    player_look_dir =
      [
        player_look_dir[0]+e.movementX/_af,
        player_look_dir[1]-e.movementY/_af,
        0
      ]; // less work -> menu setting
  } else {
    mouseData[0] = e.clientX;
    mouseData[1] = e.clientY;
  }
  if (player_look_dir[0] > pi) { player_look_dir[0] = -pi; }
  if (player_look_dir[0] < -pi) { player_look_dir[0] = pi; }
};


function requestFullscreen()
{
  const elem = document.documentElement;
  if (document.fullscreenElement) { document.exitFullscreen(); } else { elem.requestFullscreen(); }
}


function runListTerminateAll()
{
  for (let p = functionRunList.length-1; p>=0; p--)
  { if (functionRunList[p].enable) {functionRunList[p].toggle();} }
}

function updateTextLog()
{
  let _t = '',
      _s = text_log.length,
      _b = Object;

  if (document.getElementById('menu_logBox') != undefined) { _b = document.getElementById('menu_logBox'); }
  for (let i=0; i<_s; i++) { _t = _t + text_log[i] + `<br>`; }
  _b.innerHTML = _t;
  _b.scrollTop = _b.scrollHeight;
}

function textLog(_s) { text_log.push(_s); updateTextLog();}

function eLog(_id, _f, _i, _b) { e_log.push([_id, _f, _i, _b]); }

function eLogClear(_id) // remove all entries with matching _id
{
  let _new_log = []; // temp new log to be copied
  let _ls = e_log.length; // loop size

  if (_ls> 0) // nothing if nothing
  {
    for (var _q=_ls - 1; _q >= 0; _q--) // loop -> e_log
    {
      if (_id == -1)
      {
        del_obj(e_log[_q][2]);
      } else {
        if (e_log[_q][0] != _id) { _new_log.push(e_log[_q]); } else { del_obj(e_log[_q][2]); }
      }
    }
  }

  e_log.length = 0;
  _ls = _new_log.length;

  if (_new_log.length > 0)
  {
    for (let _p=_ls - 1; _p >= 0; _p--) // loop -> _new_log
    { e_log.push(_new_log[_p]); }
  }
}

// Folder functions
// bad naming schema : (

function isAlphaNumeric(c) { return /^[a-zA-Z0-9\s.]$/.test(c); }

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
folder_names.push("Temporary");
folder_names.push("Objects");

for (let i=0; i<5; i++) { obj_folders.push([]); } // loop 5x

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
    if (_r0.length != 0) {_r.push( _r0 );} // log query
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
  if (_i<=folder_cwd) {return false;} // do not allow default folder deletion

  // get folders at ring 0
  let _f = getFolders(_i, 0)[0];
  let _s = _f.length;

  // move folders to root
  for (let i=0; i<_s; i++)
  {
    folder_parents[_f[i]] = -1;
  }

  // move folder content to user working dir
  _s = obj_folders[_i].length;
  for (let i=0; i<_s; i++)
  {
    obj_folders[(folder_parents[folder_selected]==-1) ? folder_cwd : folder_parents[folder_selected]].push(obj_folders[_i][i]);
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
  folder_selected = folder_cwd;
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
  // prevent change of parent of default folders here - not allowing use of default folders to store folders
  if (_i<=folder_cwd || _k<=folder_cwd) {return false;}

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

  for (let i=0; i<_s-mem_encode[1]; i++)
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

function getObjDir(_i)
{
  let _r = [];
  let _s = m_objs[_i].length;
  for (let i=_s-mem_encode[1]; i<_s; i++) // -4
  {
    _r.push(m_objs[_i][i]);
    if (!((i+1)%4)) {_r[_r.length-1] = 1;}
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
  let _r = [], // wrapped return
      _t = [], // folder parents
      _o = [], // raw obj data
      _e = [], // dir vecs
      _c = 5, // default folder count
      _s;

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
    _e.push(getObjDir(i)); // pushed -> free index
  }

  // place _o
  _r.push( packArray(_o) );

  // place _t
  _r.push ( packArray(_t) );

  // place _e
  _r.push ( packArray(_e) );

  return new Float32Array(packArray(_r));
}

// obj load & unpack new
function loadSelect(_fi)
{
  if (key_map.shift)
  {
    // flag_loadingObject = 1;
    loadFile(_fi[0]); // holding shift opens w/ old parsing
  } else {
    // flag_loadingObject = 1;
    loadFile0(_fi[0]);
  }
  // should be replaced ...

  updateValueById("menu_stats_4", fileName);
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

function loadFile0(_fi) // main load function
{
  if (_fi)
  {
    flag_loadingObject = 1;
    let _r = [];

    const _fr = new FileReader();
    _fr.onload = event =>
    {
      const _d = new Float32Array(event.target.result); // this is a recursive unpack ...
      _r.push( unpackArray( _d ) );
      _r.push( unpackArray(_r[0][0]) ); // obj data : ref is [1]

      // unpack folder tree
      _r.push( unpackArray(_r[0][1]) ); // this [0]->toggle [1]->parent
      _r.push( unpackArray(_r[2][2]) ); // obj folders
      _r.push( unpackArray(_r[2][3]) ); // names

      // unpack dir vecs per obj - undefined check is finished later
      if (_r[0][2] != undefined)
      {
        _r.push( unpackArray(_r[0][2]) ); // ref is [5]
      }

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
            obj_folders[folder_cwd].push( _s3[j] );
          }
        } else
        {
          obj_folders.push(offsetArray(_r[3][i], -(_sml)+_s1)); // and here
        }
      }
      
      // load objs
      for (let i=0; i<_r[1].length; i++)
      {
        let _td = _r[5] == undefined ? 0 : _r[5]; // if load file contains no dir data provide the default dir vec for that object !!!
        m_objs_loadPoints( _r[1][i], _td[i] ); // !!! WHERE POINTS LOAD !!!
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
    updateValueById("menu_stats_5", _fn.slice(_si+1, _fn.length));
    textLog(fileName + '.bin load complete');
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
				if (n!=_gs.length-1) {var _tar = Array.from(_fa.slice(_gs[n], _gs[n+1])); m_objs_loadPoints(new Float32Array(_tar), 0);}
				if (n==_gs.length-1) {var _tar = Array.from(_fa.slice(_gs[_gs.length-1], _gs[_fa.length-1])); m_objs_loadPoints(new Float32Array(_tar), 0);}
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
  runListTerminateAll();
  eLogClear(-1);
  if (mouseLock) {pointerLockSwap();} 
  let arrayBuffer = makeSave();
  let _l = arrayBuffer.length;

  // blob binary large object
  const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
  const _url = URL.createObjectURL(blob);

  // temp anchor
  const anchor = document.createElement('a');
  anchor.href = _url;

  let _str = document.getElementById('menu_stats_4').value;
  anchor.download = makeValidFileName(_str) + _l + ".bin";

  anchor.click(); // .click() to trigger download
  URL.revokeObjectURL(_url);
  key_map.p = false;
  textLog('Attempted download of ' + anchor.download);
}

window.addEventListener('keydown', (event) =>
{
	const key = event.key.toLowerCase();
	if (key_map.hasOwnProperty(key))
	{
		if (flag_inText == 0) {key_map[key] = true;} // new change w/ flag for text input
		if (key_map_prevent.hasOwnProperty(key)) { event.preventDefault(); }
	}
});

window.addEventListener('keyup', (event) =>
{
	event.preventDefault();
	const key = event.key.toLowerCase();
  if (key_map.hasOwnProperty(key))
  {
    key_map[key] = false;
    if (key_map_prevent.hasOwnProperty(key)) { event.preventDefault(); }
	}
});

window.addEventListener('blur', () =>
{
  for (const key in key_map) { if (key_map.hasOwnProperty(key)) { key_map[key] = false; } }
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

window.addEventListener('resize', function() { updateMenuPos(); });
document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

document.addEventListener('pointerlockchange', function ()
{ if (document.pointerLockElement === null) { mouseLock = 0; } });




document.addEventListener('mousedown', function(e)
{
  // if (pointerOutsideWindow[0] && e.button == 0) { e.preventDefault(); }
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
  // use wpn_1 to switch scroll to object distance from player as another global var..
	if (!key_map.shift) // off shift
	{
		if (mouseLock) // menu closed
		{
		    if ((fov_slide-e.deltaY/2000) > 0 && !lock_vert_mov) {fov_slide += -e.deltaY/2000};
		    if (lock_vert_mov) {hover_h += -e.deltaY*(key_map.shift+0.2)/14}; // fix
		}
    else if(runEvery(40) && pointerOutsideWindow()[2] && pointerOutsideWindow()[1]) // when menu open and ...
		{
      let _d = Math.sign(e.deltaY),
          _f = obj_folders[folder_selected],
          _l = _f.length-1,
          _i = searchFolder(obj_folders[folder_selected], obj_cyc);

      if (_l>0) // prevent crash LAST
      {
        if (_i.length == 0)
        {
          let _i0 = _d>0 ? 0 : _l;
          obj_cyc = _f[_i0];
        } else // when already starting inside folder
        {
          switch(_d)
          {
            case -1:
              obj_cyc = _i[0]-1>=0 ? _f[_i[0]-1] : _f[_l];
              break;
            case 1:
              obj_cyc = _i[0]+1>_l ? _f[0] : _f[_i[0]+1];
              break;
          }
        }
      }
		}

    // controls 0 to 100 var to be used by menu
    if (!mouseLock && !pointerOutsideWindow()[1]) // when inside q menu
    {
      let _new_c = menu_scroll_c + _scroll_mult*Math.sign(e.deltaY);
      if (_new_c <= 100 && _new_c >= 0) {menu_scroll_c = _new_c;}
      // setScrollingElements(eset_tools, _scroll_mult);
    }

	} else if (runEvery(200)) // when holding shift
  {
    grid_scale += -e.deltaY/Math.abs(e.deltaY);
    getSetting('detail_box_gridSettings', 1)[0] = Math.pow(2, grid_scale);
	}
	s_fov = fov_slide*fov_slide*fov_slide/20; // event always updates s_fov last
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

//mathfns
function set2(a, b) { a[0]=b[0]; a[1]=b[1];}
function setPoint(a, b) { a[0]=b[0]; a[1]=b[1]; a[2]=b[2]; } // set a to b 
function multPoint(a, b) { return [a[0]*b[0], a[1]*b[1], a[2]*b[2]]; }

function dot2(a,b) {return a[0]*b[0] + a[1]*b[1];}
function dot(a,b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];}
function dot4(a,b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3];}

function add2(a,b) {return [a[0]+b[0], a[1]+b[1]];}
function add3(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];}
function add(a,b) {return [a[0]+b[0], a[1]+b[1], a[2]+b[2], 1];}

function sub2(a,b) {return [a[0]-b[0], a[1]-b[1]];}
function sub3(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2]];}
function sub(a,b) {return [a[0]-b[0], a[1]-b[1], a[2]-b[2], 1];} // must keep last 1 to make it easy to push. Keep in mind..

function len2fast(a) {return a[0]*a[0]+a[1]*a[1];} // no root needed for sorting
function len2(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]);}
function len3(a) {return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);} // the real norm function

function scale2(a,s) {return [a[0]*s, a[1]*s];}
function scale3(a,s) {return [a[0]*s, a[1]*s, a[2]*s];}
function scale(a,s) {return [a[0]*s, a[1]*s, a[2]*s];} // Removed last 1 take note
function scalew1(a,s) {return [a[0]*s, a[1]*s, a[2]*s, 1];}

function toFixed3(a, b) {return [a[0].toFixed(b), a[1].toFixed(b), a[2].toFixed(b)]; }

function makeDir(_p)
{
	let _l = Math.sqrt(dot(_p,_p));
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l]);
}

function norm(_p) // this is not the correct norm lol... this converts vec to unit vec
{
	let _l = dot(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l]);
}

function norm4(_p) // quaternion 
{
	let _l = dot4(_p,_p);
	return ([_p[0]/_l, _p[1]/_l, _p[2]/_l, _p[3]/_l]);
}

// Chrome can probably compile this but firefox would probably benefit from reducing nested functions lol
function lpi(p1,p2,pp,n) // line plane intersection from Ken Joy
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
  for (var _p0 of set)
  { if (pIsEqual(_p0, point)) {return true;} }
  return false;
}

function hasNA(ar, k, n) // check if ar[i][k] (offset k) has n. for horizontal data
{
  let _l = ar.length,
      _r = 0; // return data
  for (var i=0; i<_l; i++) {if (ar[i][k] == n) {_r = i;}}
  return _r;
}

function hasN(ar, n) // simple test for checking indices or folders etc
{
  let _l = ar.length,
      _r = 0;
  for (var i=0; i<_l; i++) {if (ar[i] == n) {_r = 1;}}
  return _r;
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
  { _frames++; }
}

function checkNumber(n) { if (/^\d+(\.\d+)?$/.test(n)) {return n;} else {return false;} }

function meanctr_obj(ar, m) // i think this work. i hope so.
{
  let _ob = splitObj(ar, 0),
      _uniques = new Set(),
      _pm = [0, 0, 0, 0],
      _denom = 0;

  for (var i = 0; i<_ob.length-m*mem_encode[0]; i++)
  {
    let _p = _ob[i];
    if (!hasDuplicate(_uniques, _p))
    {
      _pm = add3(_p, _pm);
      _uniques.add(_p);
      _denom++;
    }
  }

  var uniqueCount = _uniques.size;
  _pm[3] = 1;
  return uniqueCount === 0 ? new Float32Array(_pm) : new Float32Array(scalew1(_pm, 1 / _denom));
}


  /*-- Placeholder 4d data generation --\
  \------------------------------------*/

var _lp = new Float32Array([0.0,0.0,0.0,1]);
var _lgp = new Float32Array([0.0, 0.0, 0.0]);
var _pp = [-125,0,-125];
var plr_aim = new Float32Array([0.0,0.0,0.0,1]);

var _lp_world = new Float32Array([0.0,0.0,0.0,1]);
var _lop_world = new Float32Array([0.0,0.0,0.0,1]);

const m_eyeRef = new Float32Array([0,8.0,0,1.0,-8.0,0,0,1.0,0,-8.0,0,1.0,8.0,0,0,1.0,0,8.0,0,1.0]);
const m_rect = new Float32Array([1, 0, 1, 1,-1, 0, 1, 1,-1, 0,-1, 1, 1, 0,-1, 1, 1, 0, 1, 1]);

const m_cube = new Float32Array([-1.0,-1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0,1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,-1.0,-1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,1.0,1.0,-1.0,-1.0,1.0,1.0,1.0,-1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,1.0,-1.0,-1.0,-1.0,1.0]);

const m_tri = new Float32Array([0,20,0,10, 10,0,10,10, 10,0,-10,10, -10,0,-10,10, -10,0,10,10]);
const m_x = new Float32Array([0,0,0,1, 8,0,0,1]);
const m_y = new Float32Array([0,0,0,1, 0,8,0,1]);
const m_z = new Float32Array([0,0,0,1, 0,0,8,1]);

const m_map = new Float32Array([277.1638,-128.0,114.8050,0,277.1638,0.0,114.8050,0,114.8050,0.0,277.1638,0,114.8050,-128.0,277.1638,0,-114.8050,-128.0,277.1638,0,-114.8050,0.0,277.1638,0,-277.1638,0.0,114.8050,0,-277.1638,-128.0,114.8050,0,-277.1638,-128.0,-114.8050,0,-277.1638,0.0,-114.8050,0,-114.8050,0.0,-277.1638,0,-114.8050,-128.0,-277.1638,0,114.8050,-128.0,-277.1638,0,114.8050,0.0,-277.1638,0,277.1638,0.0,-114.8050,0,277.1638,-128.0,-114.8050,0,277.1638,-128.0,114.8050,0,277.1638,0.0,114.8050,0,277.1638,0.0,-114.8050,0,277.1638,-128.0,-114.8050,0,114.8050,-128.0,-277.1638,0,114.8050,0.0,-277.1638,0,-114.8050,0.0,-277.1638,0,-114.8050,-128.0,-277.1638,0,-277.1638,-128.0,-114.8050,0,-277.1638,0.0,-114.8050,0,-277.1638,0.0,114.8050,0,-277.1638,-128.0,114.8050,0,-114.8050,-128.0,277.1638,0,-114.8050,0.0,277.1638,0,114.8050,0.0,277.1638,0,114.8050,-128.0,277.1638,0,277.1638,-128.0,114.8050,0]);

const m_flr = new Float32Array([-256.0,0.0,112.0,0,-256.0,0.0,80.0,0,-256.0,0.0,48.0,0,-256.0,0.0,16.0,0,-256.0,0.0,-16.0,0,-256.0,0.0,-48.0,0,-256.0,0.0,-80.0,0,-256.0,0.0,-112.0,0,-224.0,0.0,144.0,0,-224.0,0.0,112.0,0,-224.0,0.0,80.0,0,-224.0,0.0,48.0,0,-224.0,0.0,16.0,0,-224.0,0.0,-16.0,0,-224.0,0.0,-48.0,0,-224.0,0.0,-80.0,0,-224.0,0.0,-112.0,0,-224.0,0.0,-144.0,0,-192.0,0.0,176.0,0,-192.0,0.0,144.0,0,-192.0,0.0,112.0,0,-192.0,0.0,80.0,0,-192.0,0.0,48.0,0,-192.0,0.0,16.0,0,-192.0,0.0,-16.0,0,-192.0,0.0,-48.0,0,-192.0,0.0,-80.0,0,-192.0,0.0,-112.0,0,-192.0,0.0,-144.0,0,-192.0,0.0,-176.0,0,-160.0,0.0,208.0,0,-160.0,0.0,176.0,0,-160.0,0.0,144.0,0,-160.0,0.0,112.0,0,-160.0,0.0,80.0,0,-160.0,0.0,48.0,0,-160.0,0.0,16.0,0,-160.0,0.0,-16.0,0,-160.0,0.0,-48.0,0,-160.0,0.0,-80.0,0,-160.0,0.0,-112.0,0,-160.0,0.0,-144.0,0,-160.0,0.0,-176.0,0,-160.0,0.0,-208.0,0,-128.0,0.0,240.0,0,-128.0,0.0,208.0,0,-128.0,0.0,176.0,0,-128.0,0.0,144.0,0,-128.0,0.0,112.0,0,-128.0,0.0,80.0,0,-128.0,0.0,48.0,0,-128.0,0.0,16.0,0,-128.0,0.0,-16.0,0,-128.0,0.0,-48.0,0,-128.0,0.0,-80.0,0,-128.0,0.0,-112.0,0,-128.0,0.0,-144.0,0,-128.0,0.0,-176.0,0,-128.0,0.0,-208.0,0,-128.0,0.0,-240.0,0,-96.0,0.0,240.0,0,-96.0,0.0,208.0,0,-96.0,0.0,176.0,0,-96.0,0.0,144.0,0,-96.0,0.0,112.0,0,-96.0,0.0,80.0,0,-96.0,0.0,48.0,0,-96.0,0.0,16.0,0,-96.0,0.0,-16.0,0,-96.0,0.0,-48.0,0,-96.0,0.0,-80.0,0,-96.0,0.0,-112.0,0,-96.0,0.0,-144.0,0,-96.0,0.0,-176.0,0,-96.0,0.0,-208.0,0,-96.0,0.0,-240.0,0,-64.0,0.0,240.0,0,-64.0,0.0,208.0,0,-64.0,0.0,176.0,0,-64.0,0.0,144.0,0,-64.0,0.0,112.0,0,-64.0,0.0,80.0,0,-64.0,0.0,48.0,0,-64.0,0.0,16.0,0,-64.0,0.0,-16.0,0,-64.0,0.0,-48.0,0,-64.0,0.0,-80.0,0,-64.0,0.0,-112.0,0,-64.0,0.0,-144.0,0,-64.0,0.0,-176.0,0,-64.0,0.0,-208.0,0,-64.0,0.0,-240.0,0,-32.0,0.0,240.0,0,-32.0,0.0,208.0,0,-32.0,0.0,176.0,0,-32.0,0.0,144.0,0,-32.0,0.0,112.0,0,-32.0,0.0,80.0,0,-32.0,0.0,48.0,0,-32.0,0.0,16.0,0,-32.0,0.0,-16.0,0,-32.0,0.0,-48.0,0,-32.0,0.0,-80.0,0,-32.0,0.0,-112.0,0,-32.0,0.0,-144.0,0,-32.0,0.0,-176.0,0,-32.0,0.0,-208.0,0,-32.0,0.0,-240.0,0,0.0,0.0,240.0,0,0.0,0.0,208.0,0,0.0,0.0,176.0,0,0.0,0.0,144.0,0,0.0,0.0,112.0,0,0.0,0.0,80.0,0,0.0,0.0,48.0,0,0.0,0.0,16.0,0,0.0,0.0,-16.0,0,0.0,0.0,-48.0,0,0.0,0.0,-80.0,0,0.0,0.0,-112.0,0,0.0,0.0,-144.0,0,0.0,0.0,-176.0,0,0.0,0.0,-208.0,0,0.0,0.0,-240.0,0,32.0,0.0,240.0,0,32.0,0.0,208.0,0,32.0,0.0,176.0,0,32.0,0.0,144.0,0,32.0,0.0,112.0,0,32.0,0.0,80.0,0,32.0,0.0,48.0,0,32.0,0.0,16.0,0,32.0,0.0,-16.0,0,32.0,0.0,-48.0,0,32.0,0.0,-80.0,0,32.0,0.0,-112.0,0,32.0,0.0,-144.0,0,32.0,0.0,-176.0,0,32.0,0.0,-208.0,0,32.0,0.0,-240.0,0,64.0,0.0,240.0,0,64.0,0.0,208.0,0,64.0,0.0,176.0,0,64.0,0.0,144.0,0,64.0,0.0,112.0,0,64.0,0.0,80.0,0,64.0,0.0,48.0,0,64.0,0.0,16.0,0,64.0,0.0,-16.0,0,64.0,0.0,-48.0,0,64.0,0.0,-80.0,0,64.0,0.0,-112.0,0,64.0,0.0,-144.0,0,64.0,0.0,-176.0,0,64.0,0.0,-208.0,0,64.0,0.0,-240.0,0,96.0,0.0,240.0,0,96.0,0.0,208.0,0,96.0,0.0,176.0,0,96.0,0.0,144.0,0,96.0,0.0,112.0,0,96.0,0.0,80.0,0,96.0,0.0,48.0,0,96.0,0.0,16.0,0,96.0,0.0,-16.0,0,96.0,0.0,-48.0,0,96.0,0.0,-80.0,0,96.0,0.0,-112.0,0,96.0,0.0,-144.0,0,96.0,0.0,-176.0,0,96.0,0.0,-208.0,0,96.0,0.0,-240.0,0,128.0,0.0,208.0,0,128.0,0.0,176.0,0,128.0,0.0,144.0,0,128.0,0.0,112.0,0,128.0,0.0,80.0,0,128.0,0.0,48.0,0,128.0,0.0,16.0,0,128.0,0.0,-16.0,0,128.0,0.0,-48.0,0,128.0,0.0,-80.0,0,128.0,0.0,-112.0,0,128.0,0.0,-144.0,0,128.0,0.0,-176.0,0,128.0,0.0,-208.0,0,160.0,0.0,176.0,0,160.0,0.0,144.0,0,160.0,0.0,112.0,0,160.0,0.0,80.0,0,160.0,0.0,48.0,0,160.0,0.0,16.0,0,160.0,0.0,-16.0,0,160.0,0.0,-48.0,0,160.0,0.0,-80.0,0,160.0,0.0,-112.0,0,160.0,0.0,-144.0,0,160.0,0.0,-176.0,0,192.0,0.0,144.0,0,192.0,0.0,112.0,0,192.0,0.0,80.0,0,192.0,0.0,48.0,0,192.0,0.0,16.0,0,192.0,0.0,-16.0,0,192.0,0.0,-48.0,0,192.0,0.0,-80.0,0,192.0,0.0,-112.0,0,192.0,0.0,-144.0,0,224.0,0.0,112.0,0,224.0,0.0,80.0,0,224.0,0.0,48.0,0,224.0,0.0,16.0,0,224.0,0.0,-16.0,0,224.0,0.0,-48.0,0,224.0,0.0,-80.0,0,224.0,0.0,-112.0,0,256.0,0.0,80.0,0,256.0,0.0,48.0,0,256.0,0.0,16.0,0,256.0,0.0,-16.0,0,256.0,0.0,-48.0,0,256.0,0.0,-80.0,0,256.0,0.0,-80.0,0]);

var _flr = 6*8; // side length of square

function setGrid(_l, _s, _p, _o) // grid: side length, scale, plane, offset
{
	var _ob = new Float32Array(4*_l*_l);
	for (var i = 0; i< _l; i++)
	{
		for (var j = 0; j< _l; j++)
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
	g_over_x = setGrid(15, getSetting('detail_box_gridSettings', 1)[0], 0, [0, 0, 0]);
	g_over_y = setGrid(15, getSetting('detail_box_gridSettings', 1)[0], 1, [0, 0, 0]);
	g_over_z = setGrid(15, getSetting('detail_box_gridSettings', 1)[0], 2, [0, 0, 0]);

  const _s = mem_log[3][1]-16;

	// write data to obj
	for (var i = 0; i<_s; i++)
	{
		m_objs[3][i] = m_objs_ghost[3][i] = g_over_x[i];
		m_objs[4][i] = m_objs_ghost[4][i] = g_over_y[i];
		m_objs[5][i] = m_objs_ghost[5][i] = g_over_z[i];
	}

  for (let i = 0; i<16; i++)
  {
		m_objs[3][_s+i] = m_objs_ghost[3][_s+i] = ref_data[i];
		m_objs[4][_s+i] = m_objs_ghost[4][_s+i] = ref_data[i];
		m_objs[5][_s+i] = m_objs_ghost[5][_s+i] = ref_data[i];
  }

  rotateObjectToDir(3, grid_plane);
  rotateObjectToDir(4, grid_plane);
  rotateObjectToDir(5, grid_plane);

  grid_scale_d = getSetting('detail_box_gridSettings', 1)[0];
}

// this should not need switch. pass in direction vector.
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
				c_pnts[n*4+1] = _lp_world[1]+0.5*_s*Math.sin(_r*n+_of);
				c_pnts[n*4+2] = _lp_world[2]+0.5*_s*Math.cos(_r*n+_of);
			}
			m_objs_loadPoints(c_pnts, 0);
    break;
		case 1:
			for (let n=0; n<=_df; n++)
			{
				c_pnts[n*4+0] = _lp_world[0]+0.5*_s*Math.cos(_r*n+_of);
				c_pnts[n*4+1] = _lp_world[1];
				c_pnts[n*4+2] = _lp_world[2]+0.5*_s*Math.sin(_r*n+_of);
			}
			m_objs_loadPoints(c_pnts, 0);
    break;
		case 2:
			for (let n=0; n<=_df; n++)
			{
				c_pnts[n*4+0] = _lp_world[0]+0.5*_s*Math.cos(_r*n+_of);
				c_pnts[n*4+1] = _lp_world[1]+0.5*_s*Math.sin(_r*n+_of);
				c_pnts[n*4+2] = _lp_world[2];
			}
			m_objs_loadPoints(c_pnts, 0);
    break;
	}
}

function splitObj(ar, n) // 0:S:raw, :1:-center, R:2:-enc
{
  let r = [];
  let _s = 0;
  switch(n)
  {
    case 0: _s = Math.ceil(ar.length / 4); break;
    case 1: _s = Math.ceil(ar.length / 4) - 1; break;
    case 2: _s = Math.ceil(ar.length / 4) - mem_encode[0]; break;
  }
  for (let i = 0; i < _s; i++)
  {
    let end = Math.min(i*4 + 4, ar.length);
    // let chunk = ar.subarray(i*4, end);
    let chunk = ar.slice(i * 4, end);
    r.push(new Float32Array(chunk));
  }
  return r;
}

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

// actually wacked, the 4th needs to be set correctly

shaderModule.init();
var m1 = shaderModule.alloc(80000); // allocate memory for parallel operations
for (i=0; i<m1.data.length; i++) {m1.data[i] = 0.0;} // set data to zeros

function m_objs_loadPoints(ar, _dir) // adds objects
{
  let ar_ctr = meanctr_obj(ar, 0);
  let flag_use_dir = 0;
  if (typeof _dir == 'object')
  {
    if (_dir.length > 0)
    {
      flag_use_dir = 1; // flag to use direction data
      // console.log("Direction data found");
    }
  }

	if (ar.length > 4)
	{
		var ar_f = new Float32Array(ar.length + mem_encode[1]); // this is for center
    ar_end = new Float32Array(mem_encode[1]);
		ar_f.set(ar); // place ar data

    // here now check flag to determine what coord is loaded
    if (flag_use_dir)
    {
      ar_f.set(_dir, ar.length);
    } else {
      ar_end.set(base_dir);
      ar_end.set(ar_ctr, base_dir.length);
      for (let i=0; i<mem_encode[1]-4; i++) { ar_end[i] = ar_end[i] + ar_ctr[i%4]; }
      ar_f.set(ar_end, ar.length);
    }

    // m_objs.length-1
    // console.log(_dir); console.log(ar_end);

		var ar_g = new Float32Array(ar.length + mem_encode[1]); // ar_f.length
		ar_g.set(ar_f); // new ghost

		m_objs[m_objs.length] = ar_f; // append ar to m_objs. m_objs.length points to end
		m_objs_ghost[m_objs_ghost.length] = ar_g;

		mem_log.push([mem_sum, ar_f.length, Math.floor(ar_f.length/4), Math.floor(ar_f.length/12)]);
		mem_sum += ar_f.length;

    let _t_tris = Math.floor((Math.floor(ar_f.length/12)-1)/2)-Math.floor(ar_f.length/12)%2;
		obj_normalMaps.push(new Float32Array(_t_tris * 12 + 12)); // idk this works for now??

    // var ar_t = new Float32Array(((Math.floor((Math.floor(ar_f.length/4)-1)/2)-Math.floor(ar_f.length/4)%2)-1) * 6 + 6 );
    var ar_t = new Float32Array(((Math.floor((Math.floor(ar_f.length/4)-4)/2)- (Math.floor(ar_f.length/4)+1) %2)-1) * 6 + 6 ); // this fixed

    m_draw.push([ ar_t, ar_t.length/6, ar_t.length, (ar_t.length/6+3)*12*5, new Float32Array( (ar_t.length/6+3)*12*5 * 4) ]);

    // z-map shit fixed now?
    var ar_z = new Float32Array( ar_t.length/6 );
    var ar_k = new Float32Array( ar_t.length/6 );
    z_map.push([ar_z, ar_k, ar_t.length/6]);

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
  if ((m_objs.length-1) > 11 && (m_objs.length-1) < 16) {_fp = 2;} // i think this is the default objs?

  if (m_objs.length > 16) // all none default objs?
  {
    _fp = (folder_selected <= folder_cwd) ? folder_cwd : folder_selected;
  }

  if (flag_loadTemp) {_fp = 3; flag_loadTemp = 0;} // swap to temp obj folder if flagged
  if (flag_loadingObject == 0) // i don't even know anymore
  {
    obj_folders[_fp].push(m_objs.length-1); // must be obj id
  }
  folder_last = _fp; obj_last = (m_objs.length-1);

 	if (typeof updateTree == 'function') { updateTree(tree_allObjects); }
	updateNormalMaps();
  zeroZMap();
  if (m_objs.length > 16 && typeof updateColorMaps == 'function') { updateColorMaps(); } //

} // END OF FN

function m_t_objs_loadPoint(ar)
{
  let _s = m_t_objs.length;
  m_t_objs[_s] = ar[0]; m_t_objs[_s+1] = ar[1]; m_t_objs[_s+2] = ar[2]; m_t_objs[_s+3] = ar[3];
	mem_t_log.push([mem_t_sum, ar.length]);
	mem_t_sum += ar.length;
}

function m_t_objs_loadPoints(ar)
{
  let _s = m_t_objs.length,
      _s2 = ar.length;
  for (let i=0; i<_s2; i++) { m_t_objs[_s+i] = ar[i]; }
	mem_t_log.push([mem_t_sum, ar.length]);
	mem_t_sum += ar.length;
}

function mem_t_mov(_b) // puts m_t_objs into m_objs as single array 
{
  paint_n = 0;
  if (m_t_objs.length <= 4) { m_t_objs.length = mem_t_log.length = mem_t_sum = 0; return; }
  let _det = (_b!=undefined) ? _b : 0;

  const loadAlt = function ()
  {
    let _obj = unlink_obj(m_t_objs, 1)[0];
    m_objs_loadPoints(_obj, 0);
    m_t_objs.length = mem_t_log.length = mem_t_sum = 0;
  };

  const loadDef = function ()
  {
      m_objs_loadPoints(new Float32Array(m_t_objs), 0);
      m_t_objs.length = mem_t_log.length = mem_t_sum = 0;
  };

  if (mem_t_sum != 0)
  {
    switch(_det)
    {
      case 0:
        loadDef();
        break;
      case 1:
        loadAlt();
        break;
    }
  }
}

function packObj(ar) // shitty old method
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

function cloneObj(ar) // removes encoded data and returns
{
  let _l = ar.length-mem_encode[1];
	let _t = new Float32Array(_l);
	_t.set(ar.subarray(0, _l));
	return _t;
}

var _nextSize;
function setData()
{
  for (let j = m_objs.length-1; j>=0; j--)
  {
    _nextSize = m_objs[j].length;

    // i swear one line is smoother lol
    for (let i=0; i<_nextSize; i++) { m1.data[i+mem_log[j][0]] = (i%4 == 3) ? m_objs[j][i]*m_obj_offs[j][3] : m_objs[j][i]*m_obj_offs[j][3] + m_obj_offs[j][i%4]; }
  }

  _nextSize = m_t_objs.length;
  for (let i=0; i<_nextSize; i++) { m1.data[mem_sum+i] = m_t_objs[i]; }
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


m_objs_loadPoints(plr_aim, 0);      // 0
m_objs_loadPoints(m_flr, 0);        // 1
m_objs_loadPoints(m_map, 0);        // 2
m_objs_loadPoints(g_over_x, 0);     // 3
m_objs_loadPoints(g_over_y, 0);     // 4
m_objs_loadPoints(g_over_z, 0);     // 5
m_objs_loadPoints(m_x, 0);          // 6
m_objs_loadPoints(m_y, 0);          // 7
m_objs_loadPoints(m_z, 0);          // 8
m_objs_loadPoints(_lp_world, 0);    // 9
m_objs_loadPoints(_lop_world, 0);   // 10 should remove this
m_objs_loadPoints(m_gun, 0);        // 11
m_objs_loadPoints(m_rect, 0);       // 12
m_objs_loadPoints(m_rect, 0);       // 13
m_objs_loadPoints(m_eyeRef, 0);     // 14
m_objs_loadPoints(m_cube, 0);       // 15

world_obj_count = obj_cyc = m_objs.length-1;

setData();


function updateNormalMaps()
{
	if (m_objs.length>world_obj_count+1) // xtra?
	{
		let p1, p2, p3, v1, v2, _cr;
		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
      for (let k=0; k<m_draw[i][1]; k++) // fixed
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

        // unreal man it works unlike unreal man
        // now to update updateRayInters with all results from lpi w/ by paralleling with m_objs again to query both m_objs and obj_normalMaps into the lpi that updates a list of points
        // dynamic list for this one.
        // 2d mean could point to nearest 3 points as well making this a lot faster than doing this lol. or combine both and use the 2d to determine if it's center and if the planes are equal.??
        // if this doens't have to be updated so quickly I can do a test for if i'm in the poly instead at run time as my only rt data.
			}
		}
    // if (textLog != undefined)
    // {
    //   textLog('normal map update complete...');
    // }
	}
}

// just this one fn I copy paste. Wow it works too. Gotta review my barycentric coordinates lol
// i realized that my tri's are not with 90's so a dot w/ 3 vectors didn't work
// i could just split each tri into two and still do it my way but this is good enough I guess
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
	if (m_objs.length>world_obj_count+1) // remove?
	{
		rayInterMap.length = 0;
    interKOut.length = 0;
    interIOut.length = 0;
    normOut.length = 0;
		var p1, p2, p3, _cr, _int;
		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
			if (mem_log[i][2]>2)
			{
        for (let k=0; k<m_draw[i][1]; k++)
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
					_int = lpi(_dp, _p, p2, _cr);

					if (isPointInsideTriangle(_int, p1, p2, p3))
					{
						rayInterMap.push(_int);
						interKOut.push(k);
						interIOut.push(i);
            normOut.push(_cr);
					}
				}
			}
		}
    _rayLast = findClosestVector(player_pos, rayInterMap); // not yet excluding behind
	}
}

// simple sort needs to check if in front as well. use z buff?
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
  player_pos[0] = _lp_world[0]; // set point not always useful
  player_pos[1] = (_lp_world[1] - 14); hover_h = -player_pos[1];
  player_pos[2] = _lp_world[2];
  // player_look_dir[0] = (player_look_dir[0] + pi > 2 * pi) ? player_look_dir[0] - pi : player_look_dir[0] + pi; //flippero broken.
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
			_f = [ -_p[0], _p[1], _p[2], _p[3] ];
			break;
		case 1:
			_f = [ _p[0], -_p[1], _p[2], _p[3] ];
			break;
		case 2:
			_f = [ _p[0], _p[1], -_p[2], _p[3] ];
			break;
	}
	return _f;
}

// rotation around arbitrary axis. basically useless now that I have quats.
function rot_aa(_p, _v, _r)
{
	// ang from y axis must be arctan(y/x) y is literally opposite of x
	// reciprocal of opposite/adjacent gives the other angle (pi - ang)

	var _a1 = Math.atan(_v[0]/_v[2]); // x/z ang that moves to y pln
	var _d2 = Math.sqrt(_v[0]*_v[0] + _v[2]*_v[2]);
	var _a2 = Math.atan(_v[1]/_d2);	// ang that moves to z pln
	var _op1 = rot_y_pln(_p, -_a1);
	var _opz = rot_x_pln(_op1, -_a2);
	var _op4 = rot_z_pln(_opz, _r); // apply our radians
	var _op5 = rot_x_pln(_op4, _a2);
	var _op6 = rot_y_pln(_op5, _a1);

	return _op6;
}

// the concepts of the math seem to imply the code structure.
// the beginning q1 0 * q2 0 - q1 1 * q2 is the beginning of the vector calc and the - q1 2 * q2 2 - q1 3 * q2 3 is the cross product

function multiplyQuaternions(q1, q2) // The scaler part of the quaternion comes first here ***
{
  const w = q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2] - q1[3] * q2[3],
        x = q1[0] * q2[1] + q1[1] * q2[0] + q1[2] * q2[3] - q1[3] * q2[2],
        y = q1[0] * q2[2] - q1[1] * q2[3] + q1[2] * q2[0] + q1[3] * q2[1],
        z = q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1] + q1[3] * q2[0];
  return [w, x, y, z];
}


function makeQuaternion(_r, _a) // radians, axis
{
	// quaternion (cos(theta/2), sin(theta/2) * V) converts to 4d array of data like this.
	// implied if computed w/ matrices. dont 5get / 2
	var _q = [
	    Math.cos(_r / 2),
	    Math.sin(_r / 2) * _a[0],
	    Math.sin(_r / 2) * _a[1],
	    Math.sin(_r / 2) * _a[2]
	];
	return _q;
}

// conjugate of a quaternion
function conjugate(q) { return [q[0], -q[1], -q[2], -q[3]]; }

// quat rot using matrix quat multiplier. const tho ? performance diff tho ?
function quatRot(_p, _q_ar) // point to be rotated. sequence of quaternions.
{
  var _fq = [1, 0, 0, 0]; // initial recursive quaternion for rotation accumulation
  for (var i = 0; i < _q_ar.length; i++)
  { _fq = multiplyQuaternions(_q_ar[i], _fq); }

  // normalize it. makes sense when you are adding many together.
  const _nq = norm4(_fq); // normalized quaternion

  // make a vector quaternion / quaternion vector
  const _vq = [0, _p[0], _p[1], _p[2]]; // vector quaternion w/ no scaler

  // here follows rule: q_f = q(-1) * p * q, the conjugate is first though ???
  const _rq = multiplyQuaternions(_nq, multiplyQuaternions(_vq, conjugate(_nq))); // result quaternion

  return [_rq[1], _rq[2], _rq[3]];
}

// my initial logic no good
// const _rq0 = multiplyQuaternions(_nq, _vq); // Must do this first (l2r)
// const _rq = multiplyQuaternions(_rq0, [
//      _nq[0],
//     -_nq[1],
//     -_nq[2],
//     -_nq[3]
// ]);

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

function del_obj(_i)
{
  // hasN(obj_folders[folder_selected], obj_cyc)
  if (_i > world_obj_count && !translateFolder.active) // instead of no delete make it clear log // && !hasN(_run_objs, _i)
  {
    trns_lock = 0; _all_lock = 0;
    let splice_all = [
      m_objs,
      mem_log,
      m_obj_offs,
      m_objs_ghost,
      m_draw,
      m_center2d,
      m_center2d_buffer,
      z_map,
      obj_normalMaps
    ];

    if (_i == m_objs.length-1) // if last delete last
    {
      for (let i=0; i<splice_all.length; i++) {splice_all[i].splice(-1);};
      obj_cyc = (m_objs.length==world_obj_count+1) ? 2 : m_objs.length-1;

    } else // Delete specific
    {
      var _ts = mem_log[_i][1];
			for (var i = _i+1; i<mem_log.length; i++)
			{
				mem_log[i][0] = mem_log[i][0]-_ts;
			}

      for (let i=0; i<splice_all.length; i++) {splice_all[i].splice(_i, 1);};
		}

    _ts = e_log.length;
    for (let i=0; i<_ts; i++)
    {
      let _n = e_log[i][2];
      e_log[i][2] = _n>_i ? _n-1 : _n;
    }

    for (let i=0; i<_ts; i++)
    {
      if (e_log[i][2] == _i) { e_log.splice(i, 1); break;}
    }
    
    _ts = functionRunList.length;
    for (let i=0; i<_ts; i++)
    {
      let _n = functionRunList[i].obj;
      functionRunList[i].obj = _run_objs[i] = _n>_i ? _n-1 : _n;
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

function findbyctr_obj(x, y) // 2D find by 3D encoded center point
{
  let _c = false; // catch undefined params
  if (x == undefined || y == undefined) {x = y = 0; _c = true;}
	if (m_objs.length > world_obj_count+1)
	{
		let _lt,
        _i = world_obj_count+1,
        _l = Number.MAX_VALUE,
        _x_off = x/in_win_hc*(in_win_h/in_win_w),
        _y_off = y/in_win_hc;

		for (var i=world_obj_count+1; i<m_objs.length; i++)
		{
			_lt = len2fast([m1.data[mem_log[i][0]+mem_log[i][1]-4]+_x_off, m1.data[mem_log[i][0]+mem_log[i][1]-3]+_y_off]);
			if (_lt < _l) {_i = i; _l = _lt;}
		}
    obj_cyc = _c ? _i : obj_cyc;
		return _i;
	} else {return world_obj_count;}
}


function select2dpoint(x, y) // 2D find
{
	let _f = Number.MAX_VALUE,
      _n_sku = 0,
      _t1,
      _d = 0,
      _d2 = 0,
      _x_off = x/in_win_hc*(in_win_h/in_win_w),
      _y_off = y/in_win_hc;

  // && obj_cyc != trns_obj_i
  // && !hasN(_2d_exclude, obj_cyc)

	if (!boundingBox.focus && obj_cyc != boundingBox.obj && obj_cyc>world_obj_count && !hasN(_2d_exclude, obj_cyc)) // defocused bounding box obj is any obj selected ?
	{
		for (let k = 0; k<mem_log[obj_cyc][1]/4; k++)
		{
			_t1 = Math.pow(m1.data[4*k+mem_log[obj_cyc][0]]+_x_off, 2) + Math.pow(m1.data[4*k+mem_log[obj_cyc][0]+1]+_y_off, 2);
			if (_t1 < _f)
			{
				_f = _t1;
				_n_sku = k;
			}
		}
	}

   // this looks through the temp placed points
	for (var i = 0; i<m_t_objs.length/4; i++)
	{
			_t1 = Math.pow(m1.data[4*i+mem_sum]+_x_off, 2) + Math.pow(m1.data[4*i+mem_sum+1]+_y_off, 2);
			if (_t1 < _f)
			{
				_f = _t1;
				_n_sku = i;
				_d = 1;
			}
	}

	if (!mouseLock && !enableViewRef) // this is the 2d find for grid points
	{
		for (let k = 0; k<mem_log[3+pln_cyc][2]-mem_encode[0]; k++)
		{
			_t1 = Math.pow(m1.data[4*k+mem_log[3+pln_cyc][0]]+_x_off, 2) +
            Math.pow(m1.data[4*k+mem_log[3+pln_cyc][0]+1]+_y_off, 2);

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

  if (boundingBox.enable && !boundingBox.active) // this should be the bounding box corners
  {
    for (let k = 0; k<mem_log[15][1]/4; k++)
    {
      _t1 = Math.pow(m1.data[4*k+mem_log[15][0]]+_x_off, 2) + Math.pow(m1.data[4*k+mem_log[15][0]+1]+_y_off, 2);
      if (_t1 < _f)
      {
        _f = _t1;
        _n_sku = k;
        _d = 3;
      }
    }
  }

  // make entire new structure for this 2d selection logic
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
					_lp[0] = _lp_world[0] = m_t_objs[4*_n_sku];
					_lp[1] = _lp_world[1] = m_t_objs[4*_n_sku+1];
					_lp[2] = _lp_world[2] = m_t_objs[4*_n_sku+2];
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

function getctr_obj(_i) // get encoded 3D center point
{
	var _c = new Float32Array(4);
	_c[0] = m_objs[_i][m_objs[_i].length-4];
	_c[1] = m_objs[_i][m_objs[_i].length-3];
	_c[2] = m_objs[_i][m_objs[_i].length-2];
	_c[3] = 1;
	return _c;
}

function getctr_ghost(_i) // get encoded 3D center point from duplicate ghost set
{
	var _c = new Float32Array(4);
	_c[0] = m_objs_ghost[_i][m_objs_ghost[_i].length-4];
	_c[1] = m_objs_ghost[_i][m_objs_ghost[_i].length-3];
	_c[2] = m_objs_ghost[_i][m_objs_ghost[_i].length-2];
	_c[3] = 1;
	return _c;
}

var emulateKey =
{
  timer: 0,
  active: 0,
  key: '',
  map: key_map,
  hold_time: 50,
  start: function(_p)
  {
    emulateKey.active = 1;
    emulateKey.timer = Date.now();
    emulateKey.key = _p.key;
  },
  run: function ()
  {
    emulateKey.map[emulateKey.key] = 1;
    if (Date.now() - emulateKey.timer > emulateKey.hold_time)
    {
      emulateKey.map[emulateKey.key] = 0;
      emulateKey.active = 0;
    }
  }
}; functionRunList.push(emulateKey);


var translateFolder =
{
  obj: 0,
  lpstart: [0,0,0],
  lpdelta: [0,0,0],
  active: 0,
  focus: 0,
  runhook: 0,
  folder: [],
  folder_id: 0,
  excludeSelf: true,
  name: 'Translate Folder',
  toggle: function ()
  {
    if (folder_selected < folder_cwd) {return;}
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
        translateFolder.folder_id = folder_selected;

        // translateFolder.focus = 1;
        translateFolder.active = 1;
        translateFolder.runhook = 0;
        textLog(translateFolder.name + ' [' + folder_selected + '] enabled');
        playSound('sounds/tool.mp3');
        break;

      case 1:
        translateFolder.active = 0;
        // translateFolder.focus = 0;
        // Apply changes to obj clones
        let _s = translateFolder.folder.length;

        for (let i=0; i<_s; i++)
        { arScale(m_objs_ghost[translateFolder.folder[i]], m_objs[translateFolder.folder[i]], [0,0,0], [0,0,0,0], [1,1,1,1]); }

        // arScale(m_objs_ghost[this.obj], m_objs[this.obj], [0,0,0,0], [0,0,0,0], [1,1,1,1]);
        translateFolder.obj = 0; translateFolder.folder = [];
        textLog(translateFolder.name + ' [' + translateFolder.folder_id + '] finished');
        playSound('sounds/finish.mp3');
        break;
    }
  },
  run: function ()
  {
    // Check for axis lock settings
    translateFolder.lpdelta =
    [
      (miniBar_stn[0]) ? 0 : _lp_world[0] - translateFolder.lpstart[0],
      (miniBar_stn[1]) ? 0 : _lp_world[1] - translateFolder.lpstart[1],
      (miniBar_stn[2]) ? 0 : _lp_world[2] - translateFolder.lpstart[2]
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
    if (folder_selected < folder_cwd) {return;}
    rotateFolder.folder = Array.from(obj_folders[folder_selected]);

    let _s = rotateFolder.folder.length;
    for (let i=0; i<_s; i++) // loop through folders
    {
      rotateObject(0, getSetting('detail_box_rotationSettings', 1)[0], rotateFolder.folder[i]);
    }
    playSound('sounds/finish.mp3');
  }
};

var translateObject =
{
  enable: 0,
  active: 0,
  focus: 0,
  obj: 0,
  lpstart: [0,0,0],
  lpdelta: [0,0,0],
  runhook: 0,
  excludeSelf: true,
  name: 'Move Object',
  opt_enable: function (_i)
  {
    translateObject.lpstart =
      [
        _lp_world[0],
        _lp_world[1],
        _lp_world[2]
      ];
    translateObject.lpdelta = [0,0,0];
    translateObject.obj = _i;

    // translateObject.focus = 1;
    translateObject.enable = 1;
    translateObject.active = 1;
    translateObject.runhook = 0;

    // set point so that after transform it has the new 2d location and depth
    setPoint(_lop_world, _lp_world);
    playSound('sounds/tool.mp3');
  },
  toggle: function ()
  {
    if (obj_cyc <= world_obj_count) {return;} // stop if a world obj
    switch(translateObject.enable)
    {
      case 0:
        if (!hasN(_run_objs, obj_cyc)) {translateObject.opt_enable(obj_cyc);} // only start if not in run list but also allow disable
        textLog(translateObject.name + ' enabled');
        break;

      case 1:
        translateObject.enable = 0;
        translateObject.active = 0;
        // translateObject.focus = 0;

        // Apply changes to obj clones
        arScale(m_objs_ghost[translateObject.obj], m_objs[translateObject.obj], [0,0,0], [0,0,0,0], [1,1,1,1]);
        translateObject.obj = 0;
        playSound('sounds/finish.mp3');
        textLog(translateObject.name + ' finished');
        break;
    }
  },
  run: function ()
  {
    // Check for axis lock settings
    translateObject.lpdelta =
    [
      (miniBar_stn[0]) ? 0 : _lp_world[0] - translateObject.lpstart[0],
      (miniBar_stn[1]) ? 0 : _lp_world[1] - translateObject.lpstart[1],
      (miniBar_stn[2]) ? 0 : _lp_world[2] - translateObject.lpstart[2]
    ];

    arScale(m_objs[translateObject.obj], m_objs_ghost[translateObject.obj], translateObject.lpdelta, [0,0,0,0], [1,1,1,1]);

    // need system to prevent connect to self points
  },
  newest: function ()
  {
    if (translateObject.enable) {translateObject.toggle();}
    translateObject.opt_enable(m_objs.length-1);
  }
}; functionRunList.push(translateObject);


function m_obj_explode(_i) // encode patched
{
	if (_i>world_obj_count)
	{
    let _t = m_objs[_i].slice(0, -mem_encode[1]);
		m_t_objs_loadPoints(_t);
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

			var _oi = splitObj(m_objs[_i], 2); // fixed encode temp tho
			var _of = splitObj(m_objs[_all_lock_i], 2);
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

			m_objs_loadPoints(packObj(_f), 0);
			_all_lock_i = 0; _all_lock = 0;

			break;
	}
}

function unlink_obj(_i, _d) // _d bool for data|load
{
  if (_i == undefined) {_i = obj_cyc; _d = 0;}
  let _s = (typeof _i == 'object') ? _i.length/4 : mem_log[_i][2] - mem_encode[0],
      _dat = (typeof _i == 'object') ? _i : m_objs[_i],
      _r0 = [],
      _r1 = [],
      _r2 = [],
      _f = [],
      _n0 = 0,
      _n1 = 0,
      _k = 0;

  for (let i=0; i<_s; i++)
  {
    if ((i-0)%2!=0 || i==_s-2)
    {
      _k = i==_s-2 ? _s-1 : (i==_s-1 ? _s-2 : i);
      _r0[_n0*4] = _dat[_k*4];
      _r0[_n0*4+1] = _dat[_k*4+1];
      _r0[_n0*4+2] = _dat[_k*4+2];
      _r0[_n0*4+3] = _dat[_k*4+3];
      _n0++;
    }
  }

  _s = _r0.length; _n0 = 0;
  for (let i=0; i<_s/4; i++)
  {
    if (i%2)
    {
      _r1[_n0*4] = _r0[i*4];
      _r1[_n0*4+1] = _r0[i*4+1];
      _r1[_n0*4+2] = _r0[i*4+2];
      _r1[_n0*4+3] = _r0[i*4+3];
      _n0++;
    } else
    {
      _r2[_n1*4] = _r0[i*4];
      _r2[_n1*4+1] = _r0[i*4+1];
      _r2[_n1*4+2] = _r0[i*4+2];
      _r2[_n1*4+3] = _r0[i*4+3];
      _n1++;
    }
  }

  if (_d)
  { return [_r0, _r1, _r2];
  } else
  {
    if (key_map.shift) {m_objs_loadPoints(new Float32Array(_r0), 0);}
    m_objs_loadPoints(new Float32Array(_r1), 0);
    m_objs_loadPoints(new Float32Array(_r2), 0);
    textLog('Unlink [' + _i + '] complete');
  }
}

function obj_linkPoly(_a0, _a1)
{
  let _of = [],
      _o1 = splitObj(_a0, 0),
      _o2 = splitObj(_a1, 0);

  for (var i=0; i<_o1.length; i++)
  {
    if (i==0) { _of.push(_o1[i]); }
    _of.push(_o2[i]);
    if (i != _o1.length-1) { _of.push(_o2[i+1]); _of.push(_o1[i]);  _of.push(_o1[i+1]); } // -(encoded offset + 1)
  }
  m_objs_loadPoints(packObj(_of), 0);
}

function obj_linkNtoM(_i0, _i1)
{
  let _s1 = mem_log[_i0][2]-mem_encode[0], // points in _i0
    _s2 = mem_log[_i1][2]-mem_encode[0], // points in _i1
    _n_big_i = 0,
    _n_sml_i = 0,
    _n_big = 0,
    _n_sml = 0,
    _n_o2 = [],
    _n_off = 0;

  if (_s1 > _s2)
  {
    _n_big = _s1; _n_sml = _s2;
    _n_big_i = _i0; _n_sml_i = _i1;
  } else {
    _n_big = _s2; _n_sml = _s1;
    _n_big_i = _i1; _n_sml_i = _i0;
  }

  let _n_r = Math.ceil(_n_big/_n_sml);
  let _n_dp = _n_sml-_n_big%_n_sml; // delta | points to add
  // let _n_d = ; // direction | for now assume always add points

  let _n_o1 = []; // now copy the larger array and write it's last point onto the added points
  for (let i=0; i<_n_big; i++)
  {
    _n_o1[i*4] = m_objs[_n_big_i][i*4];
    _n_o1[i*4+1] = m_objs[_n_big_i][i*4+1];
    _n_o1[i*4+2] = m_objs[_n_big_i][i*4+2];
    _n_o1[i*4+3] = m_objs[_n_big_i][i*4+3];
  }

  for (let i=_n_big; i<_n_big+_n_dp; i++)
  {
    _n_o1[i*4] = m_objs[_n_big_i][(_n_big-1)*4];
    _n_o1[i*4+1] = m_objs[_n_big_i][(_n_big-1)*4+1];
    _n_o1[i*4+2] = m_objs[_n_big_i][(_n_big-1)*4+2];
    _n_o1[i*4+3] = m_objs[_n_big_i][(_n_big-1)*4+3];
  }

  for (let i=0; i<_n_r*_n_sml; i++) // now use ratio _n_r to make the sequence n,n,n,m,m,m,w,w,w...
  {
    if (i%_n_r==0 && i!=0) {_n_off++;}
    _n_o2[i*4] = m_objs[_n_sml_i][_n_off*4];
    _n_o2[i*4+1] = m_objs[_n_sml_i][_n_off*4+1];
    _n_o2[i*4+2] = m_objs[_n_sml_i][_n_off*4+2];
    _n_o2[i*4+3] = m_objs[_n_sml_i][_n_off*4+3];
  }

  obj_linkPoly(_n_o1, _n_o2);
}

function link_obj(_i)
{
  let _t = 1,
    _i2 = _i;

  if (getSetting('detail_box_linkSettings', 1)[0][0] == true) {_t = 0;}
  if (getSetting('detail_box_linkSettings', 1)[1][0] == true) {_t = 1;}
  // if (getSetting('detail_box_linkSettings', 1)[2][0] == true) {_t = 2;}

	switch(_all_lock)
	{
		case 0: // alternator
			_all_lock_i = _i;
			_all_lock = 1;
			break;
		case 1:
			if (_i == _all_lock_i)
      {
        _all_lock = 0; _all_lock_i = 0;
        textLog('Linker prevented self to self');
        break;
      }
			var _of = [];
			var _o1 = splitObj(m_objs[_i], 2);
			var _o2 = splitObj(m_objs[_all_lock_i], 2);
			switch(_t)
			{
				case 0:
					var _ia = JSON.stringify([m_objs[_i][0], m_objs[_i][1], m_objs[_i][2], 1, m_objs[_all_lock_i][0], m_objs[_all_lock_i][1], m_objs[_all_lock_i][2], 1]);
					for (var i = 0; i<mem_log[_i][2]-mem_encode[0]; i++) // -(encoded offset)
					{
						var _ob = [];
						_ob = [m_objs[_i][i*4], m_objs[_i][i*4+1], m_objs[_i][i*4+2], 1, m_objs[_all_lock_i][i*4], m_objs[_all_lock_i][i*4+1], m_objs[_all_lock_i][i*4+2], 1];
						if (i == mem_log[_i][2]-mem_encode[0]-1) // -(encoded offset + 1)
						{ // Double nested to avoid unnecesarry second call to JSON.stringify(). Dirty fix.
							if (_ia != JSON.stringify(_ob))
							{m_objs_loadPoints(new Float32Array(_ob), 0);}
						} else {m_objs_loadPoints(new Float32Array(_ob), 0);}
					}
					_all_lock_i = 0; _all_lock = 0;
					break;

				case 1:
          if (mem_log[_i][1] != mem_log[_all_lock_i][1])
          { obj_linkNtoM(_i, _all_lock_i);
          } else { obj_linkPoly(packObj(splitObj(m_objs[_i], 2)), packObj(splitObj(m_objs[_all_lock_i], 2))); };
					break;
			}

      textLog('Link complete [' + _all_lock_i + '] -> [' + _i2 + ']');
		  _all_lock_i = _all_lock = 0;
			break;
	}
}

// Rotate data direct
/*
function rotateObjectData(_dat, _rad)
{
  for (var i=0; i<_dat.length; i++)
  {
    // fix later
    // rotation required moving back to origin
    // and the axis to rotate about needs to be passed in, rot around arbitrary axis then? or simple xyz

    _dat[i]
    _to[i] = add3(_c, rot_x_pln(sub(_to[i], _c), _rf));
  }
}
*/

// remove center option? nah keeps cursor in right place. make this rotate around a plane (grid plane as dir vec)
function rotateObject(_op, _r, _obj) // _op determines if rotation uses point, center, or pivot w/ _r radians.
{
	if (_obj>world_obj_count)
	{
		var _to = splitObj(m_objs[_obj], 0);
		var _c = getctr_obj(_obj);
		var _rf = _r * pi/180;

    if (wpn_select == 1) {_op = 1;}
    if (!mouseLock) {_op = 0;}

		for (var i=0; i<_to.length; i++)
		{
      if (grid_plane[0] != 0 || grid_plane[1] != 0 || grid_plane[2] != 1)
      {
        _to[i] = add3(_lp_world, rot_aa(sub(_to[i], _lp_world), grid_plane, _rf));
      } else {

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
    playSound('sounds/finish.mp3');
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
// &a made from &b, - inner vec3 d, * outer vec3 s, + vec3 offset c
function arScale(a, b, c, d, s)
{
  for (let i = a.length-1; i>=0; i--)
  {
    a[i] = (b[i]-d[i%4])*s[i%4] + c[i%4];
  }
}

function writeToObjI(_ob, i) // super bad
{
  if (_ob.length == mem_log[i][1])
  {
    let start = 0;
    const end = mem_log[i][1]-mem_encode[1];
    while (start < end)
    {
      m_objs[i][start] = _ob[start];
      start++;
    }
  }
}

// currently this moves the eyeref object in an arbitrary position in front of the player to provide 3d data into the pipe that provides the required
// 2d output data used to interpolate 2d mouse relative to 2d eyeref. part of the process to make the 3d ray outward from screen relative to 2d mouse on screen
// there exists ofc a direct theoretical algebraic method but this is not really that bad if it wasn't for the required js rotation of eyeref in the scene.
// maybe not the rotation -> it's just the interpolation function really ? so slow then...

function updateViewRef(_v, _i, _q) // raw direction vector, obj id, array of quaternions representing rotation around axis
{
  let _t_c = getctr_ghost(_i);
  const _s = mem_log[_i][2]; // get # of points
  for (let i=0; i<_s; i++)
  {
    let _t_gp = // ith point * 4 per of size 4
    [
      m_objs_ghost[_i][i*4],
      m_objs_ghost[_i][i*4+1],
      m_objs_ghost[_i][i*4+2]
    ];
    let _t_fp = add3(_v, quatRot( sub(_t_gp, _t_c), _q ));

    // apply change per point
    m_objs[_i][i*4] = _t_fp[0];
    m_objs[_i][i*4+1] = _t_fp[1];
    m_objs[_i][i*4+2] = _t_fp[2];
  }
}

// quatRot( sub(_gp, _c), _viewq )
// function rotateObjI(_i, _q)
// {
//   _c = getctr_obj(_i);
//   const _s = mem_log[_i][2];
//   for (let i=0; i<_s; i++)
//   {
//     _gp = [m_objs_ghost[_i][i*4], m_objs_ghost[_i][i*4+1], m_objs_ghost[_i][i*4+2]]
//     // quatRot( sub(_gp, _c), _viewq )
//   }
// }

// pretty bad hard kode replace later
function updateCursor()
{
  let _ob = splitObj(m_objs_ghost[12], 0);
  let _ob2 = splitObj(m_objs_ghost[13], 0);

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

  for (var i = 0; i<=_ob2[i].length; i++)
  {
    switch(pln_cyc)
    {
      case 0:
        _ob2[i] = rot_z_pln(_ob2[i], pi/2);  
        break;
      case 2:
        _ob2[i] = rot_x_pln(_ob2[i], pi/2);
        break;
    }
  }

  // write to obj data
  writeToObjI(packObj(_ob), 12);
  writeToObjI(packObj(_ob2), 13);
}

function planeCycle()
{
  if (pln_cyc==2) {pln_cyc=0;} else {pln_cyc++;}
  updateCursor();
  playSound('sounds/chit.mp3');
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
  let _c = hasNA(e_log, 2, obj_cyc);
  // console.log(e_log[_c][3]);
  if (_c)
  {
    if (e_log[_c][3]) { del_obj(obj_cyc); }// else { || hasN(e_log[obj_cyc], true)}
  } else if (!hasN(_run_objs, obj_cyc)) { del_obj(obj_cyc); }
}

// just put the functions into array to be spliced ig ?!??!
function del_world()
{
  runListTerminateAll(); // terminate all running data manipulation
  eLogClear(-1);

  folder_selected = folder_cwd; // set to current working directory
  obj_folders[folder_cwd].length = 0;

  mem_sum = 7564; // reset mem_sum to sum of world data

  let _c = folder_cwd+1,
      _woc = world_obj_count+1,
      splice_all = [];

  splice_all = [
    folder_parents,
    folder_toggle,
    folder_names,
    obj_folders,
  ]; for (let i=0; i<splice_all.length; i++) {splice_all[i].splice(_c);};

  splice_all = [
    m_objs,
    mem_log,
    m_obj_offs,
    m_objs_ghost,
    m_draw,
    m_center2d,
    m_center2d_buffer,
    z_map,
    obj_normalMaps,
  ]; for (let i=0; i<splice_all.length; i++) {splice_all[i].splice(_woc);};

  trns_lock = _all_lock = _all_lock_i = 0;

	obj_cyc = 2;

  updateValueById("menu_stats_4", '');
  updateValueById("menu_stats_5", '');

  updateTree(tree_allObjects);
  textLog('World data reset');
}

function createCircleAtCursor()
{
  let _stn = getSetting('detail_box_circleSettings', 1);
	if (!isNaN(_stn[1]) && !isNaN(_stn[0]) && !isNaN(_stn[2]))
	{
		make_cir_obj(Math.floor(_stn[1]), _stn[0], _stn[2], _stn[3], pln_cyc);
	}
}

function mirrorOverPlane()
{
	if (obj_cyc>world_obj_count)
	{
		var _to = splitObj(m_objs[obj_cyc], 0);
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

// function reverseObject(_i)
// {
//   let _s = 0,
//       _n = [];
//
//   // oh lol wrong wrong
//   // must swap them
//   // just use a remap :) 0, 2, 4, ... looks like %2 exact =)
//
//   _remap = [];
//
//   _s = mem_log[_i][2] - mem_encode[0];
//   for (let i=0; i<_s; i++)
//   {
//     _n[i*4] = m_objs[_i][(_s-i-1)*4];
//     _n[i*4+1] = m_objs[_i][(_s-i-1)*4+1];
//     _n[i*4+2] = m_objs[_i][(_s-i-1)*4+2];
//     _n[i*4+3] = m_objs[_i][(_s-i-1)*4+3];
//   }
//
//   for (let i=0; i<_s; i++)
//   {
//     m_objs[_i][i*4] = _n[i*4];
//     m_objs[_i][i*4+1] = _n[i*4+1];
//     m_objs[_i][i*4+2] = _n[i*4+2];
//     m_objs[_i][i*4+3] = _n[i*4+3];
//   }
// }

function cloneObjSelected()
{
	if (obj_cyc>world_obj_count) // && !hasN(_run_objs, obj_cyc)
	{
		m_objs_loadPoints(cloneObj(m_objs[obj_cyc]), getObjDir(obj_cyc));
	}
}

function setCursorToObjCenter()
{
	var _t = getctr_obj(obj_cyc);
	if (!miniBar_stn[0]) {_lp[0] = _lp_world[0] = _t[0];}
	if (!miniBar_stn[1]) {_lp[1] = _lp_world[1] = _t[1];}
	if (!miniBar_stn[2]) {_lp[2] = _lp_world[2] = _t[2];}	
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

// mem_t_mov w/ no menu function here for it.

function applyRotation()
{
	rotateObject(0, getSetting('detail_box_rotationSettings', 1)[0], obj_cyc);
}

function moveObject()
{
  translateObject.toggle();
}

function deleteFolderObjs()
{
  if (folder_selected < folder_cwd) {return;}
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
  if (folder_selected < folder_cwd) {return;}
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
      m_objs_loadPoints(cloneObj(m_objs[_folder[_h1]]), 0);
      // obj_cyc = 2;
    }
    if (_dt >= _delay*(_folder.length-1))
    {
      _finished = 0;
    }
  }
}

function measureLine()
{
  var _t_obj = splitObj(m_objs[obj_cyc], 1);
  var _t_d = len3(sub(_t_obj[0], _t_obj[1]));
  console.log(_t_d);
  getSetting('detail_box_gridSettings', 1)[0] = _t_d;
  textLog('Measured: ' + _t_d.toFixed(7));
}

function resetGrid()
{
  grid_plane = [0,0,1];
  grid_scale = 3;
  getSetting('detail_box_gridSettings', 1)[0] = Math.pow(2, grid_scale);
  updateGrid();
  textLog('Grid reset: [ ' + toFixed3(grid_plane, 3) + ' ]');
}

function placePoint()
{
  m_t_objs_loadPoint([_lp_world[0], _lp_world[1], _lp_world[2], 1.0]);
  playSound('sounds/tick.mp3');
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
	
function drawOverlay()
{
	// While in menu with low call rate i'll set values here:
	updateMenuPos();

  
  if (enableViewRef)
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

  updateTextByPar("menu_stats_0", "" + _fps + "");
  updateTextByPar("menu_stats_1", "" + [" X-Plane "," Y-Plane "," Z-Plane "][pln_cyc]+"");
  updateTextByPar("menu_stats_2", "" + grid_scale + " : " + getSetting('detail_box_gridSettings', 1)[0].toFixed(5) + "");
  updateTextByPar("menu_stats_3", "[ " + player_pos[0].toFixed(1) + ", " + player_pos[1].toFixed(1) + ", " + player_pos[2].toFixed(1)+" ]");

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

var _all_lock_colors = [
  [0.75, 0.67, 0.37, 1.0],
  [0.3, 0.3, 1.0, 1.0],
  [1.0, 0.3, 0.3, 1.0],
  [0.6, 0.3, 0.5, 1.0]
];

const color_light_purple = [0.65, 0.6, 1.0, 0.7];
const color_yellow = [0.96, 0.85, 0.46, 0.87];

// folder_selected_objs
// So here I draw lines. Passing true object i'th
function drawSegment(vertices, mi, color) // color added as override for now
{
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  gl.lineWidth = 1;

	if (mi >= 0)
	{
	    if (mi == obj_cyc && mi > world_obj_count) //
	    {
	    	gl.uniform4fv(colorUniformLocation, color_yellow); // set color yellow line
	    } else
	    {
          switch(getSetting('detail_box_drawSettings', 1)[2])
          {
            case true:
              gl.uniform4fv(colorUniformLocation, [0.7, 0.7, 0.7, 0.2]);
              break;
            case false:
              gl.uniform4fv(colorUniformLocation, [0.7, 0.7, 0.7, 0.5]);
              break;
          }
  
	    }
    	if (mi == 12) {gl.uniform4fv(colorUniformLocation, [0.2, 1.0, 0.2, 1.0]);} // ?????????????????????
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

  // here set color of selected objects (probably slow)
  let _fs = folder_selected_objs.length;
  for (let f = 0; f<_fs; f++)
  { if (mi == folder_selected_objs[f] && mi != obj_cyc && mi != _all_lock_i) {gl.uniform4fv(colorUniformLocation, color_light_purple);} }

  // here set color of pivot align vectors
  let _ft = obj_folders[3].length;
  for (let f = 0; f<_ft; f++)
  { if (mi == obj_folders[3][f]) {gl.uniform4fv(colorUniformLocation, [0.90, 0.33, 0.33, 1.0]);} }

  // set pivoting obj color
  if (pivotAlign.enable && mi == pivotAlign.obj) { gl.uniform4fv(colorUniformLocation, [0.80, 0.960, 0.41, 0.6]); } // new green

	if (_all_lock!=0) // Object modification color select
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
  if (mi == 2) {gl.uniform4fv(colorUniformLocation, [0.34, 0.34, 0.34, 0.2]);} // map lines

  switch(mi)
  {
    case -2:
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      // gl.uniform4fv(colorUniformLocation, [0.3, 0.3, 1.0, 1.0]);
      break;

    case -3:
      gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4fv(colorUniformLocation, [0.5, (Date.now()%500)/600, 0.5, 1.0]);
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

  if (color != undefined) {gl.uniform4fv(colorUniformLocation, [0.7, 0.7, 0.7, 1.0]);}

  // continue to add color logic here ...

  gl.drawArrays(gl.LINE_STRIP, 0, vertices.length / 2);
}


var _fadeVal;
function drawPoints(_pnts, mi)
{
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, _pnts, gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  if (wpn_select == 2) {_fadeVal = 0.20;} else {_fadeVal = 0.8;}

    if (mi > 2 && mi < 6)
    {

      if (mi-3 != pln_cyc) {return;}

      switch((mi-3))
      {
        case 0:
          gl.uniform4fv(colorUniformLocation, [1.0, 0.2, 0.2, _fadeVal]);
          break;
        case 1:
          gl.uniform4fv(colorUniformLocation, [0.2, 1.0, 0.2, _fadeVal]);
          break;
        case 2:
          gl.uniform4fv(colorUniformLocation, [0.2, 0.2, 1.0, _fadeVal]);
          break;
      }
    } else {gl.uniform4fv(colorUniformLocation, [0.5, 0.5, 0.5, 0.3]);} // white grid points

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

// here is rect made of two tris to go behind the preview obj in tree
_2dis.push(new Float32Array([-1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1])); // swapping end points tris swaps the normal dir (culling fix for static 2d)
_2dis_buffers.push(new Float32Array(12));

_2dis.push(new Float32Array([1.0,0.0,0.981,0.195,0.924,0.383,0.831,0.556,0.707,0.707,0.556,0.831,0.383,0.924,0.195,0.981,0.0,1.0,-0.195,0.981,-0.383,0.924,-0.556,0.831,-0.707,0.707,-0.831,0.556,-0.924,0.383,-0.981,0.195,-1.0,0.0,-0.981,-0.195,-0.924,-0.383,-0.831,-0.556,-0.707,-0.707,-0.556,-0.831,-0.383,-0.924,-0.195,-0.981,0.0,-1.0,0.195,-0.981,0.383,-0.924,0.556,-0.831,0.707,-0.707,0.831,-0.556,0.924,-0.383,0.981,-0.195,1.0,0.0]));

// This one is temp but must setup center buffer dat
// _2dis_buffers.push(new Float32Array(33*2));

// Also add circle object made in game for on point indication
// I should instead prealloc second regeion instead of new spam.

function ar2Dmod_static_single(a, b, c, s)
{
  for (let i = a.length-1; i>=0; i--)
  {
    b[i] = a[i]*s*_s_ratio[i%2] - c[i%2];
  }
  return b;
}

function ar2Dmod_static(a, b, c, s)
{
  for (let i = a.length-1; i>=0; i--)
  {
    b[i] = a[i]*s[i%2]*_s_ratio[i%2] - c[i%2];
  }
  return b;
}

function ar2Dmod(a, b, c, s)
{
  for (let i = a.length-1; i>=0; i--)
  {
    b[i] = a[i]*_s_ratio[i%2]*s - c[i%2];
  }
  return b;
}

function updateZMap() // mean tri calc
{
  let _t_i = m_objs.length;
	for (var i=0; i<_t_i; i++)
  {
    if (mem_log[i][2] > 2)
    {
      let _sk = m_draw[i][1];
      for (let k = _sk; k>=0; k--)
      {
        // z_map[i][0][k] = (m1.data[8 * k + mem_log[i][0] + 3] + m1.data[8 * k + mem_log[i][0] + 7] + m1.data[8 * k + mem_log[i][0] + 11])/3;
        z_map[i][0][k] = m1.data[8 * k + mem_log[i][0] + 3];
        z_map[i][1][k] = k;
      }
      if (getSetting('detail_box_drawSettings', 1)[5]) { z_map[i][1].sort((b, a) => z_map[i][0][a] - z_map[i][0][b]); }

    }
  }
}

function zeroZMap()
{
  let _s = m_objs.length;
  for (let i=0; i<_s; i++)
  {
    let _s2 = m_draw[i][1];
    for (let k=0; k<_s2; k++)
    {
      z_map[i][0][k] = 0;
      z_map[i][1][k] = k;
    }
  }
}

function updateColorMaps()
{
  let _bool = getSetting('detail_box_drawSettings', 1)[2];
  for (let i=0; i<m_objs.length; i++)
  {
    for (let l=0; l<m_draw[i][3]*4; l++)
    { 
      m_draw[i][4][l] = (l%4==3) ? 1-_bool*0.75 : 1/m_draw[i][3]*l*1.33+0.34;
    }
  }
}

/*
  // m_draw[m_objs.length-1][Math.floor(l/(12*5))]
  // m_draw[h][4][l] = (l%4==3) ? 1-0*0.7 : ; 
  // m_draw[h][4][l] = (l%4==3) ? 1-0*0.7 : 1/m_draw[h][0][l]*l*1.5+0.25; 
  // m_draw[h][4][l] = (l%4==3) ? 1-0*0.7 : 1 - Math.pow( (600)/m1.data[mem_log[h][0]+mem_log[h][1]-1], -2.5 ) - 0.25; 

  // m_draw[h][4][l] = (l%4==3) ? 1-0*0.7 : 1/m_draw[h][(l+3)/(12*5)]*1.5+0.25; // 
  // m_draw[h][4][l] = (l%4==3) ? 1-_stn_bool*0.7 : 1/m_draw[h][0][l]*l*1.5+0.25; 

  // z_map[h][1].sort((a, b) => z_map[h][0][a] - z_map[h][0][b]);
*/

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

  let stn_depth = !getSetting('detail_box_drawSettings', 1)[3];
  let stn_surfaces = getSetting('detail_box_drawSettings', 1)[1];

  for (let i = m_objs.length-1; i >= 0; i--)
  {
    d_i = modIndex[i];

    if (stn_surfaces)
    {
      if (d_i > world_obj_count)
      {
        if (mem_log[d_i][2]>3)
        {
          if (m1.data[mem_log[d_i][0]+mem_log[d_i][1]-1] > 0)
          {
            // vertices = [];
            if (stn_depth) // was grid 2 depth
            {
              for (let k = 0; k < m_draw[d_i][1]; k++)
              {
                // z_map[d_i][0][k] = (m1.data[8 * k + mem_log[d_i][0] + 2] + m1.data[8 * k + mem_log[d_i][0] + 6] + m1.data[8 * k + mem_log[d_i][0] + 10])/3;
                // z_map[d_i][1][k] = k;
                // z_map[d_i][0][k] = m1.data[8 * k + mem_log[d_i][0] + 3];

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

              // z_map[d_i][1].sort((a, b) => z_map[d_i][0][a] - z_map[d_i][0][b]);

            } else {
              for (let k = 0; k < m_draw[d_i][1]; k++) // m_draw[d_i][3]*4 // LINE REF 1567
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

            if (getSetting('detail_box_drawSettings', 1)[4]) // was grid 3 culling
            {
              // so to make this culling feature work; which could be done manually instead actually improving performance; i flipped
              // every second triangle's normal by swapping two points on the triangle. culling only helps correct visual fidelity and
              // does not provide any change in performance because the data still exists & is computed etc

              gl.enable(gl.CULL_FACE);
              gl.cullFace(gl.BACK);
            } else {gl.disable(gl.CULL_FACE);}


            if (!getSetting('detail_box_drawSettings', 1)[3]) // was grid 2 depth
            {
              switch(!getSetting('detail_box_drawSettings', 1)[2])
              {
                case true:
                  gl.uniform4fv(colorUniformLocation, [0.4, 0.4, 0.4, 1.0]); 
                  break;
                case false:
                  gl.uniform4fv(colorUniformLocation, [0.4, 0.4, 0.4, 0.25]);
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
              /*
                ar_t.length/6,
                ar_t.length,
                (ar_t.length/6+3)*12*5,
              */

              // for (let l=0; l<m_draw[d_i][3]*4; l++)
              // { 
              //   // m_draw[d_i][4][l] = (l%4==3) ? 1-getSetting('detail_box_drawSettings', 1)[2]*0.7 : 1/m_draw[d_i][3]*l*1.5+0.25; 
              //   m_draw[d_i][4][l] = (l%4==3) ? 1-getSetting('detail_box_drawSettings', 1)[2]*0.7 : 1/m_draw[d_i][0][l]*l*1.5+0.25; 
              // // { m_draw[d_i][4][l] = (l%4==3) ? 1-getSetting('detail_box_drawSettings', 1)[2]*0.7 : 1 - Math.pow( (600)/m1.data[mem_log[d_i][0]+mem_log[d_i][1]-1], -0.5 ) - 0.25; }
              // }

              // here is the color data

              // after using the depth here again i can't tell if all tris end up same or
              // i just use my z map or map by depth per tri better. some of the calculations i can't make sense of. when i intitially wrote the buffer i remember
              // the calculation (ar_t.length/6+3)*12*5 came out of logic + trial & error so it's still mysterious to me. annoying b/c this is the color data ahhhhhhhhhhhh
              // so far moving the generated color map out of here and calling it only once w/ depth captured from 2d w as the only rt data it now runs faster
              // all of the yellow circle indicators are not buffered that's why the fps drops. it should be only 5 or 10 frames/s instead of 50-70.
              // so far it should be entirely possible to generate a shadow map for an object ahead of time and and combine it with the color data in real time by interpolating the
              // pregenerated shadow map. i may have to rewrite a lot of this it would be easier that way. the z-map is going to be replaced anyway
              // stress test map w/ depth enabled went from 25 to 60 fps.

              // for (let l=0; l<m_draw[d_i][3]*4; l++)
              // { m_draw[d_i][4][l] = (l%4==3) ? 1-getSetting('detail_box_drawSettings', 1)[2]*0.7 : 1 - Math.pow( (600)/m1.data[mem_log[d_i][0]+mem_log[d_i][1]-1], -0.5 ) - 0.25; }
              // console.log(m1.data[mem_log[d_i][0] + mem_log[d_i][1] - 1]);

              gl.uniform1i(renderModeUniform, 0); // should need this right

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

    if (!(getSetting('detail_box_drawSettings', 1)[0])
    || (d_i == 13 && mem_t_sum == 0) // mem t sum ???
    || (d_i == 2 && !getSetting('detail_box_generalSettings', 1)[1])
    || (d_i == 11 && wpn_select!=3)
    || (d_i == 14)
    || (d_i == 15 && !boundingBox.enable)
    )
    {
      skipDat = 0;
    }

    // not a fan of my many code structures but this one is my least fav
    if ( (d_i < 3 && d_i != 1 && skipDat) || (d_i > 5 && d_i != 1 && skipDat) )
    {
      vertices = [];
      start = mem_log[d_i][0];
      size = mem_log[d_i][1];
      end = start + size;
      
      for (let j = start; j < end - mem_encode[1]; j += 4) // fixed here
      {
        if (m1.data[j + 3] < 0)
        {
          if (vertices.length > 0) // do not remove this
          {
            drawSegment(vertices, d_i); // draw
            vertices.length = 0;
          }
        } else
        {
          // x, y
          vertices.push(m1.data[j], -m1.data[j + 1]);
        }
      } // end of for loop

      // test for now unbuffered : make ctr pt and use to make 3 lines


      // implement center inds l8r

      // last segment
      if (vertices.length > 0)
      {
        drawSegment(vertices, d_i); // draw
      }
    }

    // bad slow way to draw center axis
    end = mem_log[d_i][0] + mem_log[d_i][1];
    if (d_i == obj_cyc && m1.data[ end - 1 ] > 0 && m1.data[ end - 5 ] > 0 && m1.data[ end - 9 ] > 0 && m1.data[ end - 13 ] > 0)
    {
      let _tc = [ m1.data[ end - 4 ], -m1.data[ end - 3] ]; // temp ctr is x and y from last encoded pt
      let _tx = [ m1.data[ end - 8 ], -m1.data[ end - 7] ];
      let _ty = [ m1.data[ end - 12 ], -m1.data[ end - 11] ];
      let _tz = [ m1.data[ end - 16 ], -m1.data[ end - 15] ];

      drawSegment(
        [
          _tc[0], _tc[1], _tx[0], _tx[1],
          _tc[0], _tc[1], _ty[0], _ty[1],
          _tc[0], _tc[1], _tz[0], _tz[1]
        ],
        d_i,
        [1.0, 1.0, 1.0, 1.0]
      );
    }

    if ((d_i > 2 && d_i < 6) || d_i == 1)
    {
      _si2 = mem_log[d_i][2];
      // _pts = new Float32Array(_si2 * 2 + 2);
      // _pts = new Float32Array(_si2 * 2 - 2*mem_encode[0]);
      _pts = new Float32Array(_si2 * 2);

      // Experiment using while instead of for. Irrelevant performance difference?
      i0 = 0;
      j0 = 0;
      pointIndex = mem_log[d_i][0];

      while (i0 < _si2 * 4 - mem_encode[1]) // encode fix here: need to fix the float array too
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

      drawPoints(_pts, d_i);
    }


  } // end of first obj loop

  // this part is totally useless it should not require being split into a new data format to have temp data for line placement
  // working object being drawn

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


  // move all this back into fn to make good reverse fn - noticed percentile here relative to other dims?
  _2d_previewBack = ar2Dmod_static(
    _2dis[1],
    _2dis_buffers[1],
    [-(menu_obj_pos[0]-in_win_w*0.01)/in_win_w,
    -0.5+(menu_obj_pos[1]-0-menu_obj_size[2]/2+menu_obj_size[0]+2)/in_win_h],
    [menu_obj_size[0]/in_win_w, menu_obj_size[0]/in_win_h*in_win_hw]
  );


  // Draw the triangles after setting the color
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, _2d_previewBack, gl.STATIC_DRAW);

  gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

  gl.uniform4fv(colorUniformLocation, [0.12, 0.12, 0.12, 1.0]); 
  gl.drawArrays(gl.TRIANGLES, 0, _2d_previewBack.length / 2);

  // Preview object
  vertices = [];
  for (let j = _preview_obj.length/4 - 1 - mem_encode[0]; j>=0; j--) // removed encoded
  {
    
    // already normalized this earlier with minMax so theoretically it's only necessary to scale it
    // still needs to be fixed where I have minmax. pick dimension maximum to scale everything
    // scale 2 other smaller dims by same scaler and don't use 3d len
    
    _tp =
    [
      1.9*_preview_obj[j*4],
      -1.9*_preview_obj[j*4+1],
      1.9*_preview_obj[j*4+2]
    ]

    _np = rot_x_pln(_tp, 0.2);
    _np = rot_z_pln(_np, 0.2);
    _np = rot_y_pln(_np, 0.0004*Date.now()%10000);

    _np[0] = _np[0];
    _np[1] = in_win_wh * _np[1];

    vertices.push(
    _np[0]*menu_obj_size[0]/in_win_w+(menu_obj_pos[0]-in_win_w*0.01)/in_win_w,
    _np[1]*menu_obj_size[0]/in_win_h*in_win_hw+0.5-(menu_obj_pos[1]-0-menu_obj_size[2]/2+menu_obj_size[0]+8)/in_win_h
    );

  }

  // draw the lines for the last segment
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

  // here fix to draw 2d inds for obj or any fn ?
  if (translateObject.enable)
  {
    if (m1.data[mem_log[9][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _tp, 0.018 ), -3);}
    if (m1.data[mem_log[10][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _np, 0.009 ), -3);}
  }
  else
  {
    if (m1.data[mem_log[9][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _np, 0.009 ), -4);}
  }

  // mystery ind no work problem here
  if (translateFolder.active)
  {
    if (m1.data[mem_log[10][0]+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _np, 0.036 ), -3);}
  }

  if (boundingBox.active)
  {
    if (m1.data[mem_log[15][0] + 4*boundingBox.k+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _2dp_boundingBox0, 0.006 ), -3);}
    if (m1.data[mem_log[15][0] + 4*boundingBox.i+3] > 0) {drawSegment(ar2Dmod(_2dis[0], _2dis_buffers[0], _2dp_boundingBox1, 0.006 ), -3);}
  }

  if (!mouseLock || key_map.tab)
  {
    if (wpn_select < 2)
    {
      for (let i = m_objs.length-1; i>=0; i--)
      {
        d_i = modIndex[i];
        if (d_i > world_obj_count)
        {
        // set 2d centers here
        m_center2d[d_i][0] = -m1.data[ mem_log[d_i][0] + mem_log[d_i][1] - 4 ];
        m_center2d[d_i][1] =  m1.data[ mem_log[d_i][0] + mem_log[d_i][1] - 3 ];

        // now make a set of data of 2d center points to feed this and scale w/ z from shader
        drawSegment(ar2Dmod_static_single(_2dis[2], m_center2d_buffer[d_i], m_center2d[d_i], m1.data[mem_log[d_i][0]+mem_log[d_i][1]-2]*0.0075 ), -5); // 2d circle size
       }
      }
    }
  }

  // Last thing to add will be the cursor helper!
} // End of drawLines()


function drawIt()
{
	Compute(m1);

  let _dm = [obj_cyc,12,15,3,4,5]; // set list of priority objects in z-buffer

  let _l = obj_folders[3].length; // get len
  for (var i=0; i<_l; i++) // loop through all temp objs and add to drap map _dm
  { _dm.push(obj_folders[3][i]); }

	updateDrawMap(_dm);

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
  // needs refactor and rename
  // refactor the theory
  // interpolate with less information by not using two of the points per axis
  // then remove those points from reference object. it's the dir vec
  // rotate 1 less point in js
  // can't i just literally read the 2d x y then ?
    
  let _moff = mem_log[14][0];

  // 2d dx and dy
  let _2dx = 2*m1.data[_moff + 12];
  let _2dy = 2*m1.data[_moff + 9];
  
  // dist from center screen
  let _x = in_win_wc-mouseData[0];
  let _y = in_win_hc-mouseData[1];
  
  let _dx = (-_x/in_win_hc*(in_win_h/in_win_w)) - (m1.data[_moff + 4]);
  let _dy = (_y/in_win_hc) - (m1.data[_moff]);
  
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

// this should be automated lol
function pointerOutsideWindow() // return [0] indicates if inside menu pane
{
	// #incheck
  let _d = isMobile ? _touch_start : mouseData,
	    _in = [0,1,1,1];

	if ((_d[0] > menu_q_pos[0]) && (_d[0] < (menu_q_pos[0]+menu_q_size[0])))
	{
		if ((_d[1] > menu_q_pos[1]) && (_d[1] < (menu_q_pos[1]+menu_q_size[1]+34)))
		{
			_in[1] = 0; // q menu?
		}
	}

	if ((_d[0] > menu_obj_pos[0]) && (_d[0] < (menu_obj_pos[0]+menu_obj_size[0])))
	{
		if ((_d[1] > menu_obj_pos[1]) && (_d[1] < (menu_obj_pos[1]+menu_obj_size[1])))
		{
			_in[2] = 0; // obj menu
		}
	}

  // top: calc(93% + 12px); left: calc(3% + 330px); top: 93%; left: 3%;

  let _offAr = 
  [
    in_win_w*0.03,
    in_win_w*0.03+425,
    in_win_h*0.93,
    in_win_h*0.93+40
  ];

	if ((_d[0] > _offAr[0]) && (_d[0] < _offAr[1]))
	{
		if ((_d[1] > _offAr[2]) && (_d[1] < _offAr[3]))
		{
			_in[3] = 0;
		}
	}

  if (_in[1] && _in[2] && _in[3]) {_in[0] = 1;}

	return _in;
}

var boundingBox =
{
  enable: 0,
  active: 0,
  focus: 0,
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
        playSound('sounds/tool.mp3');
        break;
      case 1:
        boundingBox.focus = 0;
        boundingBox.enable = 0;
        boundingBox.obj = 0;
        playSound('sounds/finish.mp3')
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
      (miniBar_stn[0]) ? 0 : _lp_world[0] - this.lpstart[0],
      (miniBar_stn[1]) ? 0 : _lp_world[1] - this.lpstart[1],
      (miniBar_stn[2]) ? 0 : _lp_world[2] - this.lpstart[2]
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

function loadTempObj(_ar, _id, _b) // bad to use _last, should refactor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
{
  flag_loadTemp = 1; // flag to send temp
  m_objs_loadPoints(_ar, 0);
  eLog(_id, folder_last, obj_last, _b);
}

// so i must apply torsion for now default from center w/ test arcsin(sin(theta)) out of curiosity
// also there's no way to control the torsion as it's own alignable property
// for ex: with the wing of the plane and pitch of the wings
// difficult layer to extend to without plane relocalization & directly no recursion

// swapping order of an operation implies inverse direction of rotation which
// maps nicely to the use of cross product
// must reduce the cross to unit length 1 while maintaining the sign

var pivotAlign =
{
  enable: 0,
  active: 0,
  obj: 0,
  focus: 0,
  name: 'Pivot Align ',
  e_id: 'pivotAlign', // could be made any type
  sound_tick: 'sounds/tick.mp3',
  pivot: [0,0,0], p0: [0,0,0], // first point capture w/ key (f)
  p1: [0,0,0], p2: [0,0,0], // p1 & p2 make the second reference line
  pn: 0, // track what point has been logged
  toggle: function ()
  {
    switch(pivotAlign.enable)
    {
      case 0: // pivot align enabled
        if (obj_cyc <= world_obj_count) {textLog(pivotAlign.name + 'no object selected'); break;}
        pivotAlign.enable = 1;
        pivotAlign.focus = 1;
        pivotAlign.obj = obj_cyc;
        playSound('sounds/tool.mp3');
        textLog(pivotAlign.name + 'enabled'); // log box
        break;
      case 1: // pivot align disabled
        if (pivotAlign.pn == 4)
        {
          playSound('sounds/finish.mp3');
          textLog(pivotAlign.name + 'finished');
        } else {
          playSound('sounds/warn.mp3');
          textLog(pivotAlign.name + 'canceled');
        }
        pivotAlign.pn = 0;
        pivotAlign.focus = 0;
        pivotAlign.enable = 0;
        eLogClear(pivotAlign.e_id);
        break;
    }
  },
  align: function ()
  {
    let _l1 = sub(pivotAlign.p0, pivotAlign.pivot),
        _l2 = sub(pivotAlign.p2, pivotAlign.p1),
        _rad = Math.acos( dot(_l1, _l2) / (len3(_l1)*len3(_l2)) ), // so the sign is later derived from cross !!! :)
        _u_cr = makeDir(cross(_l1, _l2)), // unit cross product
        // _u_mag = len3(_u_cr), // == sine(theta) but not good path to go down given [-90, 90] or im wrong???
        _q_f = [makeQuaternion(_rad, _u_cr)]; // construct q // , makeQuaternion(Math.asin(_u_mag), makeDir(_l2))

    let _obj_len = mem_log[pivotAlign.obj][2]; // get # of points
    for (var i=0; i<_obj_len; i++)
    {
      let _vg = // extract temp point
      [
        m_objs_ghost[pivotAlign.obj][i*4],
        m_objs_ghost[pivotAlign.obj][i*4+1],
        m_objs_ghost[pivotAlign.obj][i*4+2]
      ];

      let _p_rel = pivotAlign.pivot; // getctr_ghost(pivotAlign.obj);
      let _p_o = sub3(_vg, _p_rel); // remove rel point
      let _p_rot = quatRot( _p_o, _q_f );
      let _pf = add3(_p_rot, _p_rel); // final point add rel point

      m_objs_ghost[pivotAlign.obj][i*4] = m_objs[pivotAlign.obj][i*4] = _pf[0];
      m_objs_ghost[pivotAlign.obj][i*4+1] = m_objs[pivotAlign.obj][i*4+1] = _pf[1];
      m_objs_ghost[pivotAlign.obj][i*4+2] = m_objs[pivotAlign.obj][i*4+2] = _pf[2];
    }
  },
  logPoint: function ()
  {
    if (pivotAlign.pn < 4) {playSound(pivotAlign.sound_tick);}
    let _tv = [], lw = [];
    switch(pivotAlign.pn)
    {
      case 0:
        setPoint(pivotAlign.pivot, _lp_world);
        pivotAlign.pn++;
        break;
      case 1:
        _tv = pivotAlign.pivot; _tw = _lp_world; // simple format
        loadTempObj(
          new Float32Array([_tv[0], _tv[1], _tv[2], _tv[3], _tw[0], _tw[1], _tw[2], _tw[3]]),
          pivotAlign.e_id,
          false 
        );
        setPoint(pivotAlign.p0, _lp_world);
        pivotAlign.pn++;
        break;
      case 2:
        setPoint(pivotAlign.p1, _lp_world);
        pivotAlign.pn++;
        break;
      case 3:
        _tv = pivotAlign.p1; _tw = _lp_world; // simple format
        loadTempObj(
          new Float32Array([_tv[0], _tv[1], _tv[2], _tv[3], _tw[0], _tw[1], _tw[2], _tw[3]]),
          pivotAlign.e_id,
          false
        );
        setPoint(pivotAlign.p2, _lp_world);
        pivotAlign.pn++;
        break;
      case 4:
        pivotAlign.align();
        if (pivotAlign.enable) {pivotAlign.toggle();} // terminate after 4 points
        pivotAlign.pn = 0;
        break;
    }
    // pivotAlign.focus = 1;
  },
  run: function ()
  {
    // applies position/translation w/ ghost
    // apply visual guides here
    // need a system that can designate a point moveable by the standard movement system i used previously
    // will need to separate the two and join with this
    // exclusion of self list not sure about this one
  }
}

functionRunList.push(pivotAlign); // push ref to run list

function epsilon(a, b, c)
{
  if ( Math.abs(a[0]-b[0]) < c && Math.abs(a[1]-b[1]) < c && Math.abs(a[2]-b[2]) < c )
  { return true;
  } else {return false;}
}

function rotateObjectToDir(_i, dir)
{
  let _dir = getObjDir(_i); // current direction

  let _l1 = makeDir([ _dir[8] - _dir[12], _dir[9] - _dir[13], _dir[10] - _dir[14] ]),
      _l2 = [ dir[0], dir[1], dir[2] ],
      _rad = Math.acos( dot(_l1, _l2) / (len3(_l1)*len3(_l2)) ),
      _u_cr = makeDir(cross(_l1, _l2)),
      _q_f = [makeQuaternion(_rad, _u_cr)];

  // i see two ways:
  // rot in two parts first to plane then finish or correct after
  // same thing
  // getObjDir should be used right after first loop then.
  // when using 8,9,10 use either other axis will work
  
  if (epsilon(_l1, _l2, 1e-3)) {return;}

  let _obj_len = mem_log[_i][2]; // get # of points

  for (var i=0; i<_obj_len; i++)
  {
    let _vg = // extract temp point
    [
      m_objs_ghost[_i][i*4],
      m_objs_ghost[_i][i*4+1],
      m_objs_ghost[_i][i*4+2]
    ];

    let _p_rel = [_dir[12], _dir[13], _dir[14]];
    let _p_o = sub3(_vg, _p_rel); // remove rel point
    let _p_rot = quatRot( _p_o, _q_f );
    let _pf = add3(_p_rot, _p_rel); // final point add rel point

    m_objs_ghost[_i][i*4] = m_objs[_i][i*4] = _pf[0];
    m_objs_ghost[_i][i*4+1] = m_objs[_i][i*4+1] = _pf[1];
    m_objs_ghost[_i][i*4+2] = m_objs[_i][i*4+2] = _pf[2];
  }

  // let _dir = getObjDir(_i); // current direction
  //
  // let _l1 = makeDir([ _dir[8] - _dir[12], _dir[9] - _dir[13], _dir[10] - _dir[14] ]),
  //     _l2 = [ dir[0], dir[1], dir[2] ],
  //     _rad = Math.acos( dot(_l1, _l2) / (len3(_l1)*len3(_l2)) ),
  //     _u_cr = makeDir(cross(_l1, _l2)),
  //     _q_f = [makeQuaternion(_rad, _u_cr)];
  // 
  // if (epsilon(_l1, _l2, 1e-3)) {return;}




}

// simple function to take cross and create the normal. later will use obj_normalMaps: had issues w/ torsion
var surfaceNormal =
{
  enable: 0,
  e_id: 'surfaceNormal',
  name: 'Surface Normal ',
  sound_start: 'sounds/tool.mp3',
  sound_end: 'sounds/finish.mp3',
  sound_error: 'sounds/warn.mp3',
  sound_tick: 'sounds/tick.mp3',
  p0: [0,0,0], p1: [0,0,0], p2: [0,0,0], p3: [0,0,0],
  pn: 0, // track point logged
  toggle: function ()
  {
    switch(surfaceNormal.enable)
    {
      case 0: // enabled
        // if (obj_cyc <= world_obj_count) {break;}
        surfaceNormal.enable = 1;
        playSound(surfaceNormal.sound_start);
        textLog(surfaceNormal.name + 'enabled'); // log box
        break;
      case 1: // disabled
        if (surfaceNormal.pn == 4)
        {
          playSound(surfaceNormal.sound_end);
          textLog(surfaceNormal.name + 'finished');
        } else {
          playSound(surfaceNormal.sound_error);
          textLog(surfaceNormal.name + 'canceled');
        }
        surfaceNormal.enable = 0;
        surfaceNormal.pn = 0;
        eLogClear(surfaceNormal.e_id);
        break;
    }
  },
  calc: function ()
  {
    let _l1 = sub(surfaceNormal.p1, surfaceNormal.p0),
        _l2 = sub(surfaceNormal.p3, surfaceNormal.p2),
        _cr = cross(_l1, _l2),
        _u_cr = makeDir(_cr); // unit cross product
        // _u_len = 0.5*(len3(_l1) + len3(_l2)); // arbitrary

    grid_plane = [_u_cr[0], _u_cr[1], _u_cr[2]];
    updateGrid();

    let _fp = add3(surfaceNormal.p0, scale3(_u_cr, grid_scale_f));
    let _new_line =
      new Float32Array([
        surfaceNormal.p0[0],
        surfaceNormal.p0[1],
        surfaceNormal.p0[2],
        1,
        _fp[0],
        _fp[1],
        _fp[2],
        1
      ]);

		m_objs_loadPoints(_new_line, 0);
  },
  logPoint: function ()
  {
    // if surfaceNormal.pn < 4 play sound
    if (surfaceNormal.pn < 4) {playSound(surfaceNormal.sound_tick);}
    let _tv = [], lw = [];
    switch(surfaceNormal.pn)
    {
      case 0:

        setPoint(surfaceNormal.p0, _lp_world);
        surfaceNormal.pn++;
        break;
      case 1:

        _tv = surfaceNormal.p0; _tw = _lp_world; // simple format
        loadTempObj(
          new Float32Array([_tv[0], _tv[1], _tv[2], _tv[3], _tw[0], _tw[1], _tw[2], _tw[3]]),
          surfaceNormal.e_id,
          false
        );
        setPoint(surfaceNormal.p1, _lp_world);
        surfaceNormal.pn++;
        break;
      case 2:

        setPoint(surfaceNormal.p2, _lp_world);
        surfaceNormal.pn++;
        break;
      case 3:

        _tv = surfaceNormal.p2; _tw = _lp_world; // simple format
        loadTempObj(
          new Float32Array([_tv[0], _tv[1], _tv[2], _tv[3], _tw[0], _tw[1], _tw[2], _tw[3]]),
          surfaceNormal.e_id,
          false
        );
        setPoint(surfaceNormal.p3, _lp_world);
        surfaceNormal.pn++;
        break;
      case 4:

        surfaceNormal.calc();
        if (surfaceNormal.enable) {surfaceNormal.toggle();} // terminate after 4 points
        surfaceNormal.pn = 0;
        break;
    }
  }
}

functionRunList.push(surfaceNormal); // push ref to run list

var getSurface = {
  active: 0,
  wait: 0,
  name: 'Get Surface',
  toggle: function ()
  {
    switch(getSurface.active)
    {
      case 0: // enabled
        updateNormalMaps();
        getSurface.active = 1;
        getSurface.wait = 1,
        textLog(getSurface.name + ' enabled'); // log box
        break;
      case 1: // disabled
        getSurface.active = 0;
        let _str = getSurface.wait ? ' disabled' : ' finished';
        textLog(getSurface.name + _str); // log box
        break;
    }
  },
  calc: function ()
  {
    let _mtw = mouseToWorld();
    let _t_dir = mouseLock ? [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]] : _mtw;

    updateRayInters(_t_dir, player_pos);

    if (rayInterMap.length > 0)
    {
      // rayInterMap[_rayLast];
      let _p = normOut[_rayLast];
      // if (!isNaN(_p[0]) && !isNaN(_p[1]) && !isNaN(_p[2]))
      // {
        grid_plane = makeDir(normOut[_rayLast]);

        let _p0 = add(rayInterMap[_rayLast], scale3(grid_plane, grid_scale_d)),
            _p1 = rayInterMap[_rayLast],
            _pf = [];

        _p1[3] = 1;
        _pf = _p0.concat(_p1);

        loadTempObj(
          new Float32Array(_pf),
          'surfaceNorm',
          true
        );

        updateGrid();
        getSurface.wait = 0;
        getSurface.toggle();
      // }
    }

    /*
    } else {
      // updateRayInters(_plr_dtp, player_pos);
    }
    */
  },
  run: function ()
  {
    if (key_map.lmb) {getSurface.calc();}
    // if (click_map[0]) {getSurface.calc();}
  }
}

functionRunList.push(getSurface);



// scale a unit cube to the size of min/max really 6 pieces of information min & max of each axis so 3*2 querys
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
    for (var i = 0; i<ar.length/4-mem_encode[0]; i++) // divide by 4 and remove encoded points
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
	_preview_ctr = meanctr_obj(m_objs[obj_cyc], 1);
	_preview_obj = new Float32Array(m_objs[obj_cyc].length);
  arClone(_preview_obj, m_objs[obj_cyc], _preview_ctr, _preview_scaler);

	// m_ref_objs[0] = new Float32Array(m_objs[obj_cyc].length);
	// m_ref_sum = m_objs[obj_cyc].length; // temp can't really be this
}

function getSetting(id, _t)
{
  let _s = _setting_ids.length;
  let _ref_i = Number;
  for (let i=0; i<_s; i++)
  {
    if (_setting_ids[i] == id) {_ref_i = i;}
  }
  return (_t==0) ? _ref_i : _settings[_ref_i].settings;
}

/* ____ ___  __  __ ____  _   _ _____ _____ 
  / ___/ _ \|  \/  |  _ \| | | |_   _| ____|
 | |  | | | | |\/| | |_) | | | | | | |  _|  
 | |__| |_| | |  | |  __/| |_| | | | | |___ 
  \____\___/|_|  |_|_|    \___/  |_| |_____| */
                                            
var  _2d_exclude = [];
function Compute(init_dat)
{

  if (
    !mouseLock && wpn_select > 1
    || getSurface.active
  ) {enableViewRef = true;} else {enableViewRef = false;}

  if (getSetting('detail_box_drawSettings', 1)[3]) {updateZMap();} // if depth enabled

  // indicator box
  m_obj_offs[12][0] = _lp_world[0];
  m_obj_offs[12][1] = _lp_world[1];
  m_obj_offs[12][2] = _lp_world[2];
  m_obj_offs[12][3] = getSetting('detail_box_gridSettings', 1)[0]/2.0;

  if (mem_t_sum != 0) // indicator box
  {
    let _s = m_t_objs.length;
    m_obj_offs[13][0] = m_t_objs[_s-4];
    m_obj_offs[13][1] = m_t_objs[_s-3];
    m_obj_offs[13][2] = m_t_objs[_s-2];
    m_obj_offs[13][3] = getSetting('detail_box_gridSettings', 1)[0]/8.0;
  }

  // RUN LIST HERE
  _run_check = false;
  _run_objs = []; // or len = 0 ?
  _2d_exclude = [];
  for (let p = functionRunList.length-1; p>=0; p--)
  {
    if (functionRunList[p].active) {functionRunList[p].run();}
    if (functionRunList[p].enable) // when tool enabled
    {
      _run_check = true;
      let _t = functionRunList[p].obj;
      let _c = functionRunList[p].excludeSelf;
      if (_t != undefined) {_run_objs.push(functionRunList[p].obj);} // somethind must be done w/ undefined -> cancel itself if..
      if (functionRunList[p].excludeSelf) {_2d_exclude.push(functionRunList[p].obj);}
    }
  }
  flag_objModif = _run_check;




  // if (key_map.j && runEvery(50))
  // {
  //   let _np = rot_y_pln(sub3(player_pos, _lp_world), 0.05);
  //   setPoint(player_pos, add3(_np, _lp_world));
  // }

  // This needs to be replaced with menu script providing multiple callback functions.
  // Shared and specific callback functions need differentiation

	if (obj_cyc != obj_cyc_i) // I think this is what updates the tree upon selection change ???
	{
		updateList(objListConst(), "list_objectSelect");
    updateTree(tree_allObjects);
    updateRefLog();
		obj_cyc_i = obj_cyc;
	}


  if (getSetting('detail_box_gridSettings', 1)[0] != grid_scale_d) { updateGrid(); }
  if(document.activeElement.type ==  "text") { flag_inText = 1; } else {flag_inText = 0;}
	if (key_map.shift && key_map.r && runEvery(100)) { rotateObject(0, getSetting('detail_box_rotationSettings', 1)[0], obj_cyc); }
	if (key_map["5"] && runEvery(150)) { mirrorOverPlane(); }
	if (key_map["6"] && runEvery(300)) { boundingBox.toggle(); }
	if (key_map.l && runEvery(300)) { link_obj(obj_cyc); }
	if ((key_map.q || key_map.enter) && runEvery(220)) { pointerLockSwap(); }
	if (key_map["7"] && runEvery(300)) { createCircleAtCursor(); }
	if (key_map.h && runEvery(200)) { setCursorToObjCenter(); }


  if (key_map.shift && key_map.v && !trns_lock && runEvery(150)) { translateFolder.toggle(); }
	// Delete obj by obj cycle & fix memory
	if (!trns_lock)
	{
		if (key_map.shift) //320
		{if (key_map.x && runEvery(270)) { deleteObjectSelected(); }
		} else if (key_map.x && !del_obj_lock)
		{ deleteObjectSelected(); del_obj_lock = 1; }

		if (key_map.c && !key_map.shift && !key_map.control && runEvery(300)) { editSelectedObject(); }
	}

	if (key_map.x == false) { del_obj_lock = 0; }
  if (key_map.e && runEvery(120))
  {
    mem_t_mov();
    key_map.e = false;
    playSound('sounds/finish.mp3');
  }
  // m_t_objs.length = 0; mem_t_log.length = 0; obj_cyc = mem_log.length-1;

	if (key_map.p && runEvery(350)) { downloadSaveFile(); }
	if (key_map.n && runEvery(500)) { playerChangeMovementMode(); }
	if (lock_vert_mov) {player_pos[1] = -hover_h; }
	if (key_map.r && !key_map.shift && runEvery(150)) { planeCycle(); }
	if (key_map.i && runEvery(350)) { bond_obj(obj_cyc); }

	keyVec = [key_map.d-key_map.a, key_map.w-key_map.s];
	if (keyVec[1] != 0)
	{
		player_pos[0] += Math.sin(-player_look_dir[0])*keyVec[1]*player_speed * -1*(1+key_map.shift*player_speed_mult); // -1 temp ig
		player_pos[2] += Math.cos(-player_look_dir[0])*keyVec[1]*player_speed * -1*(1+key_map.shift*player_speed_mult);
		if (!lock_vert_mov) { player_pos[1] -= Math.sin(player_look_dir[1])*keyVec[1]*player_speed * (1+key_map.shift*player_speed_mult); } // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir
	}

	if (keyVec[0] != 0)
	{
		player_pos[0] += Math.cos(player_look_dir[0])*keyVec[0]*player_speed * (1+key_map.shift*player_speed_mult);
		player_pos[2] += Math.sin(player_look_dir[0])*keyVec[0]*player_speed * (1+key_map.shift*player_speed_mult);
	}

	if (key_map[" "]) { player_pos[1] -= player_speed_vert * (1+key_map.shift*player_speed_mult); }  // r u 4? srs mane key_map[" "]
	if (key_map.b) { player_pos[1] += player_speed_vert * (1+key_map.shift*player_speed_mult); }
	
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

	if (key_map.z && runEvery(140-key_map.shift*100) && m_t_objs.length != 0)
  {
    m_t_objs.length = m_t_objs.length-4;
    mem_t_sum -= 4;
    paint_n--;
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
	// #FUNPART

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

  // _inter is calculated here !
  if (key_map.lmb || key_map.f || key_map.y)
  {
    updateLook();
    let _mtw = mouseToWorld();
    let _t_dir = mouseLock ? [player_pos[0]+f_dist*f_look[0],player_pos[1]+f_dist*f_look[1],player_pos[2]+f_dist*f_look[2]] : _mtw;
    _inter = lpi(_t_dir, player_pos, _pp, _nplns);
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

				// new attempt w/ quaternions
				// i tried using rotation around an arbitrary axis but this never works out
				// i had some logic to fake the continuity but 1 frame events were unfixable.

				_nps = add3(_c,quatRot( sub(_gp, _c), _viewq )); // lmao crack norm([0.001,1,0.001])

				m_objs[tse][i*4] = _nps[0];
				m_objs[tse][i*4+1] = _nps[1];
				m_objs[tse][i*4+2] = _nps[2];

				updateLook();

        // weapon offset
				m_obj_offs[tse] = [player_pos[0]-f_look[0]*3, player_pos[1]-f_look[1]*3, player_pos[2]-f_look[2]*3, 1/(4*7)];
        // let _mtw = mouseToWorld();
        // _mtw[3] = 1/(4*7);
				// m_obj_offs[tse] = _mtw;
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
			grid_scale_ar[1] = getSetting('detail_box_gridSettings', 1)[0];
			grid_scale_ar[2] = getSetting('detail_box_gridSettings', 1)[0];
			break
		case 1:
			grid_scale_ar[0] = getSetting('detail_box_gridSettings', 1)[0];
			grid_scale_ar[2] = getSetting('detail_box_gridSettings', 1)[0];
			break
		case 2:
			grid_scale_ar[0] = getSetting('detail_box_gridSettings', 1)[0];
			grid_scale_ar[1] = getSetting('detail_box_gridSettings', 1)[0];
			break
	}

 	// check nan other place? like lpi?
 	if (mouseLock == 1)
 	{
		if (!isNaN( _inter[0] ))
    {
      _inter_rnd = (getSetting('detail_box_gridSettings', 1)[1]) ? _inter : [roundTo(_lp[0], grid_scale_ar[0]), roundTo(_lp[1], grid_scale_ar[1]), roundTo(_lp[2], grid_scale_ar[2])];
    }
 	}

  if (wpn_select != 1)
  {
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
  }

  if (key_map.tab && runEvery(75))
  {
    if (mouseLock)
    { obj_cyc = findbyctr_obj(0, 0); }
    else
    { obj_cyc = findbyctr_obj(in_win_wc-mouseData[0], in_win_hc-mouseData[1]); }
  }

	switch(wpn_select) //#WEAPONSCRIPT
	{
		case 0: // -------------------------------------------------------------------------------------------------------------------

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

			if (key_map.lmb && mouseLock) // Here where MENU CLOSED apply lpi
      {	
				cursor_helper = 0;
        setPoint(_lp, _inter);
        setPoint(_lp_world, _inter_rnd);

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

			if (key_map.v && !translateFolder.active && runEvery(150)) {translateObject.toggle();}

			if (key_map.t && obj_cyc>world_obj_count && runEvery(350)) // Fix this area needs to check obj_cyc or in fn
			{
				if (key_map.shift)
				{
					switch(translateObject.enable)
					{
						case 0:
							cloneObjSelected();
              obj_cyc = m_objs.length-1;
              translateObject.newest();	
							break;
						case 1:
							moveObject();
							cloneObjSelected();
              obj_cyc = m_objs.length-1;
              translateObject.newest();	
							break;
					}
				}
				if (!key_map.shift)
				{
					cloneObjSelected();
					obj_cyc = m_objs.length-1;
				}
			}
			break;

		case 1: // -------------------------------------------------------------------------------------------------------------------

      if (translateObject.enable) {translateObject.toggle();} // bad replace w/ larger system later
			if (obj_cyc>world_obj_count)
			{
				
				if (key_map.lmb && mouseLock && !wpn_1)
				{
					wpn_1_mc = getctr_obj(obj_cyc);
					wpn_1_d = len3(sub(wpn_1_mc, player_pos));
					wpn_1 = 1;
				}

				if (wpn_1)
        {
          m_obj_offs[obj_cyc] = (getSetting('detail_box_gridSettings', 1)[1]) ? sub(sub(player_pos, scale(f_look, wpn_1_d)), wpn_1_mc) : roundPTo(sub(sub(player_pos, scale(f_look, wpn_1_d)), wpn_1_mc), getSetting('detail_box_gridSettings', 1)[0]);
        }

				if (key_map.lmb == false && wpn_1)
				{
          arScale(m_objs[obj_cyc], m_objs_ghost[obj_cyc], m_obj_offs[obj_cyc], [0,0,0,0], [1,1,1,1]);
          arScale(m_objs_ghost[obj_cyc], m_objs[obj_cyc], [0,0,0,0], [0,0,0,0], [1,1,1,1]);
					m_obj_offs[obj_cyc] = [0,0,0,1];
					wpn_1 = 0;
          // here fix add the arScale to apply finish
				}

				if (key_map.t && key_map.lmb == false && obj_cyc>world_obj_count && runEvery(350)) // Make fn handle move & dupe? Make dupes place where holding hologram
				{
					m_objs_loadPoints(cloneObj(m_objs[obj_cyc]), 0);
					obj_cyc = m_objs.length-1;
				}
			}
			break;

		case 2: // -------------------------------------------------------------------------------------------------------------------

			if (key_map.lmb && pointerOutsideWindow()[0] && runEvery(20))
			{
        if (!getSetting('detail_box_paintSettings', 1)[0])
        {
          if (paint_n > getSetting('detail_box_paintSettings', 1)[3])
          {
            mem_t_mov();
            paint_c = 1;
          }
        }

        if (!paint_c)
        {
          switch(mouseLock)
          {
            case 0:
              let _s = m_t_objs.length,
                  _dist = getSetting('detail_box_paintSettings', 1)[2];

              paint_d = m_t_objs.length==0 ? _dist+1 : len3(sub3(_inter, [m_t_objs[_s-4], m_t_objs[_s-3], m_t_objs[_s-2]] ));
              if (paint_d > _dist)
              {
                m_t_objs_loadPoint([_inter[0], _inter[1], _inter[2], 1.0]);
                paint_n++;
              }
              break;

            case 1:
              m_t_objs_loadPoint([_inter[0], _inter[1], _inter[2], 1.0]);
              paint_n++;
              break;
          }
        }
			}

			if (getSetting('detail_box_paintSettings', 1)[0] && key_map.lmb == false)
      {
        mem_t_mov(getSetting('detail_box_paintSettings', 1)[1]*1); paint_n = paint_d = 0;
      } // finish draw !

			if (!getSetting('detail_box_paintSettings', 1)[0] && key_map.lmb == false) { paint_c = 0; } // finish draw !

			break; // end of wpn_select==2

		case 3: // -------------------------------------------------------------------------------------------------------------------

      if (key_map.lmb && !mouseLock && runEvery(20))
      {
        updateRayInters(mouseToWorld(), player_pos);
        if (rayInterMap.length > 0)
        {
          let _p = rayInterMap[_rayLast];
          m_t_objs_loadPoint(_p);
          setPoint(_lp_world, _p);
        }
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
  if (key_map.f && !flag_objModif && !_run_check && runEvery(150)) // no longer allow during any runtime function
  {
    placePoint();
  }

  // Bad code for point placement w/ pivot align, will refactor this but good nuff4now
  if (key_map.f && pivotAlign.enable && runEvery(150)) { pivotAlign.logPoint(); }
  if (key_map.f && surfaceNormal.enable && runEvery(150)) { surfaceNormal.logPoint(); }

	// Return to ground
	if (key_map.g && runEvery(200)) { returnCursorToGround(); }

	// Teleport
	if (key_map.y && runEvery(350)) { teleport_plr(); }

  // Measure line length
	if (key_map.m && runEvery(200)) { measureLine(); }

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
			for (var i = 0; i<=mem_log[3][2]-mem_encode[0]; i++)
			{
				m_objs[3][4*i]  =  m_objs_ghost[3][4*i] + _lp_world[0];
				m_objs[3][4*i+1] = m_objs_ghost[3][4*i+1] + _lp_world[1];
				m_objs[3][4*i+2] = m_objs_ghost[3][4*i+2] + _lp_world[2];
			}
			break;
		case 1:
			for (var i = 0; i<=mem_log[4][2]-mem_encode[0]; i++)
			{
				m_objs[4][4*i]  =  m_objs_ghost[4][4*i] + _lp_world[0];
				m_objs[4][4*i+1] = m_objs_ghost[4][4*i+1] + _lp_world[1];
				m_objs[4][4*i+2] = m_objs_ghost[4][4*i+2] + _lp_world[2];
			}
			break;
		case 2:
			for (var i = 0; i<mem_log[5][2]-mem_encode[0]; i++)
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
			for (var i = 0; i<=mem_log[3][2]-mem_encode[0]; i++)
			{
				m_objs[3][4*i]  =  m_objs_ghost[3][4*i] + _lp_world[0];
				m_objs[3][4*i+1] = m_objs_ghost[3][4*i+1] + _lp_world[1];
				m_objs[3][4*i+2] = m_objs_ghost[3][4*i+2] + _lp_world[2];
			}
			break;
		case 1:
			for (var i = 0; i<=mem_log[4][2]-mem_encode[0]; i++)
			{
				m_objs[4][4*i]  =  m_objs_ghost[4][4*i] + _lp_world[0];
				m_objs[4][4*i+1] = m_objs_ghost[4][4*i+1] + _lp_world[1];
				m_objs[4][4*i+2] = m_objs_ghost[4][4*i+2] + _lp_world[2];
			}
			break;
		case 2:
			for (var i = 0; i<mem_log[5][2]-mem_encode[0]; i++)
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

  // setScrollingElements(eset_tools, _scroll_mult);

	updateNormalMaps();

	updateList(objListConst(), "list_objectSelect");
  updateTree(tree_allObjects);

  updateRefLog();
	updateMenuPos();
  updateWpnSelect();
  updateMiniBar();

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
