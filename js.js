// ! Memspc

						/*-- 2D Canvas Draw Functions --\
						\------------------------------*/


function drawText(c, txt, x0, y0)
{
	c.fillStyle = "rgba(170, 98, 28, 215)"; 
	c.font = "14px Lucida Console";
	c.fillText(txt, x0, y0);
}

function drawDot(c, x, y)
{
	c.beginPath(); c.lineWidth = "1px";
	c.strokeStyle = "rgba(222, 222, 222, 215)"; 
	c.rect(x-1, y-1, 2, 2); c.stroke();
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


var inner_window_width = document.getElementsByTagName("html")[0].clientWidth;
var inner_window_height = document.getElementsByTagName("html")[0].clientHeight;

var pi = 3.1415926538;

var player_look_dir = [0.0, 0.0, 0.0];
var player_look_dir_i = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];
var mouseDataS = [0.0, 0.0];
var mouseDataI = [0.0, 0.0]; // Actual final?
var mouseDataD = [0.0, 0.0];
var mouseLock = 0; 
var fov_slide = 30.0;

var player_pos = [0.001,0.001,0.001];

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
// e.keyCode					  //
// d - 68  |  a - 65  | shft - 16 //
// w - 87  |  s - 83  | ctrl - 17 //
// e.button					 	  //
// lmb - 0 |  mmb - 1  |  rmb - 2 //
//--------------------------------//

var keyInfo = [0,0,0,0,0,0,0,0,0,0];  //w,s,a,d,spc,mmb,rmb,shift
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
	if (e.button == 1) {keyInfo[6]=1;}
	if (e.button == 2) {keyInfo[7]=1;}
});

el.addEventListener('mouseup', function(e)
{
	if (e.button == 0) {keyInfo[5]=0;}
	if (e.button == 1) {keyInfo[6]=0;}
	if (e.button == 2) {keyInfo[7]=0;}
});

window.addEventListener("wheel", function(e)
{
    if ((fov_slide-e.deltaY/80) > 0) {fov_slide += -e.deltaY/80};
});




						/*-- Placeholder 4d data generation --\
						\------------------------------------*/


// 2 many arrays pls fix
var m_objs = [];
var l_objs = [];
var d_objs = [];
const m_cube = new Float32Array([-1.0, -1.0, -1.0, 1, -1.0, -1.0, 1.0, 1, 1.0, -1.0, -1.0, 1, 1.0, -1.0, 1.0, 1, 1.0, 1.0, -1.0, 1, 1.0, 1.0, 1.0, 1, -1.0, 1.0, -1.0, 1, -1.0, 1.0, 1.0, 1]);
// const m_tri = new Float32Array([0,2,0,1,-1,0,-1,1,1,0,-1,1,1,0,1,1,-1,0,1,1]); //1,0,1,1,-1,0,-1,1,1,0,-1,1
const m_tri = new Float32Array([0,20,0,10,-10,0,-10,10,10,0,-10,10,10,0,10,10,-10,0,10,10]); //30,0,30,30,-30,0,-30,30,30,0,-30,30


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



//var m_flr = turbojs.alloc(400);
var _flr = 25; // Side length of square
var m_flr = new Float32Array(4*_flr*_flr);


function setFlr() // fn: Create floor vertices
{
	for (var i = 0; i<_flr; i++)
	{
		for (var j = 0; j<_flr; j++)
		{	//	i <=> (i*10+j)
			m_flr[(i*_flr+j)*4]   = i - _flr/2;
			m_flr[(i*_flr+j)*4+1] = 1.0;
			m_flr[(i*_flr+j)*4+2] = j - _flr/2;
			m_flr[(i*_flr+j)*4+3] = 1;
		}
	}
}

setFlr();



var m1 = turbojs.alloc(20000);

function addMData(ar) // Replace current log system. Create mem_log data and calculate each start point here.
{
	m_objs[m_objs.length] = ar;
	l_objs[l_objs.length] = ar.length;
}



						/*-- PLACE DATA --\
						\----------------*/


addMData(m_flr);
addMData(m_cube);
//addMData(m_tri);

//var test = getMids(m_tri);
//console.log(test);


//addMData(test);




function setTable(l_) // Replace
{
	//d_objs.push([l_[0], l_[0]]);
	var _ts = 0;
	for (var i = 0; i<l_.length; i++)
	{
		d_objs.push(  [_ts, l_[i]]  );
		_ts += l_[i];
	}
}

setTable(l_objs);

function setData()
{

	for (var j = 0; j<m_objs.length; j++)
	{
		for (var i = 0; i<m_objs[j].length/4; i++)
		{
			m1.data[i*4+d_objs[j][0]]   = m_objs[j][i*4+0];
			m1.data[i*4+1+d_objs[j][0]] = m_objs[j][i*4+1];
			m1.data[i*4+2+d_objs[j][0]] = m_objs[j][i*4+2];
			m1.data[i*4+3+d_objs[j][0]] = m_objs[j][i*4+3];
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


						/*-- turbojs --\
						\-------------*/


	function drawIt(init_dat)
	{
		reDraw(ctx, inner_window_width, inner_window_height); // FIRST


						/*-- DEBUG PANEL --\
						\-----------------*/


		drawText(ctx, "player_look_dir: " + player_look_dir[0].toFixed(3) + " : " + player_look_dir[1].toFixed(3), 100, inner_window_height-200);
		drawText(ctx, "mouseDataD: " + mouseDataD[0].toFixed(3) + " : " + mouseDataD[1].toFixed(3), 100, inner_window_height-180);
		//
		drawText(ctx, "player_pos: " + player_pos[0].toFixed(3) + " : " + player_pos[2].toFixed(3), 100, inner_window_height-140);
		//
		drawText(ctx, "W, A, S ,D, Shift(down), Space(up), Scroll(fov)", 100, inner_window_height-100);
		drawText(ctx, "Ctrl(unlock), Middle Mouse(drag camera & sku)", 100, inner_window_height-80);
		//

						/*-- Draw 2D data --\
						\------------------*/

		var s = fov_slide; // Arbitrary visual scaler
		for (var i = 0; i<m_objs.length; i++)
		{
			for (var j = 0; j<d_objs[i][1]/4; j++) // fix me?
			{
				if (init_dat.data[4*j+d_objs[i][0]+3] > 0)
				{
					drawDot(ctx, init_dat.data[4*j+d_objs[i][0]]*s+inner_window_width/2, init_dat.data[4*j+d_objs[i][0]+1]*s+inner_window_height/2);
					if (j == d_objs[i][1]/4-1)
					{
						drawText(ctx, "END " + j, init_dat.data[4*j+d_objs[i][0]]*s+inner_window_width/2-32, init_dat.data[4*j+d_objs[i][0]+1]*s+inner_window_height/2-18);
					} else {
					if (i != 0) {drawLine(ctx, init_dat.data[4*j+d_objs[i][0]]*s+inner_window_width/2, init_dat.data[4*j+d_objs[i][0]+1]*s+inner_window_height/2, init_dat.data[4*(j+1)+d_objs[i][0]]*s+inner_window_width/2, init_dat.data[4*(j+1)+d_objs[i][0]+1]*s+inner_window_height/2);}
					if (keyInfo[6]) {drawText(ctx, j, init_dat.data[4*j+d_objs[i][0]]*s+inner_window_width/2-32, init_dat.data[4*j+d_objs[i][0]+1]*s+inner_window_height/2-18);}
					}
				}
			}
		}
	}



						/*-- Compute is runtime main --\
						\-----------------------------*/


	function Compute(init_dat, t_inc)
	{
		var keyVec = [keyInfo[3]-keyInfo[2], keyInfo[0]-keyInfo[1]];

		if (keyVec[1] != 0)
		{
			player_pos[0] += Math.sin(2*pi-player_look_dir[0]+0.001)*keyVec[1]*0.3 * -1; // -1 temp ig
			player_pos[2] += Math.cos(2*pi-player_look_dir[0]+0.001)*keyVec[1]*0.3 * -1;
			player_pos[1] += Math.sin(player_look_dir[1]+0.001)*keyVec[1]*0.3; // Lmao one line for vertical travel w/ yaw(rads) from player_look_dir
		}

		if (keyVec[0] != 0)
		{
			player_pos[0] += Math.cos(2*pi+player_look_dir[0]+0.001)*keyVec[0]*0.3;
			player_pos[2] += Math.sin(2*pi+player_look_dir[0]+0.001)*keyVec[0]*0.3;
		}

		if (keyInfo[4]) {player_pos[1] += 0.3;}
		if (keyInfo[8]) {player_pos[1] += -0.3;}

		if (keyInfo[9])
		{
			mouseLock = 0;
			document.exitPointerLock();
		}

		if (keyInfo[6] && !mouseLock)
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



		setData(); // Load all vertices

		// Translation
		turbojs.run(init_dat, `void main(void) {
		commit(vec4(
			read().x+read().z+${-player_pos[0]}, 
			read().y+${player_pos[1]},
			read().z-read().x+${-player_pos[2]},
			read().w
		));
		}`);

		// Rotate around y-axis
		turbojs.run(init_dat, `void main(void) {
		commit(vec4(
			cos(${player_look_dir[0]+0.001})*read().x+sin(${player_look_dir[0]+0.001})*read().z,
			read().y,
			cos(${player_look_dir[0]+0.001})*read().z-sin(${player_look_dir[0]+0.001})*read().x,
			read().w 
		));
		}`);

		// Rotate around x-axis (i can't believe dis)
		turbojs.run(init_dat, `void main(void) {
		commit(vec4(
			read().x,
			cos(${player_look_dir[1]+0.001})*read().y-sin(${player_look_dir[1]+0.001})*read().z,
			sin(${player_look_dir[1]+0.001})*read().y+cos(${player_look_dir[1]+0.001})*read().z,
			read().w 
		));
		}`);

		




		// Import verticies w/ json & allocate

		// Do now: make float3dArray objects accessible from m_objs


		// CLIPPING & OPTIMIZATION & PROPER WEBGL
		// Fix floating point clown fiesta
		// Refactor keyboard keyInfo array.
		// Convert keyVec into unit sphere.
		
		// Quaternion no work. Replace all rotation functions. WEBGL fn for quat?
		// Pass in multiple Float32 Arrays?





			/*-- Camera Transfrom --\
			\----------------------*/


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
		//m1 = m0;
		//inc+=0.02;
		//console.log(inc);
		Compute(m1, inc);
		//console.log(m0);
	}
	

	setInterval(runTime, runTime_int); 
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

