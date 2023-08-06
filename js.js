// !

function drawRect(c, x0, y0, x1, y1)
{
	c.beginPath();
	c.lineWidth = "1";
	c.strokeStyle = "green";
	c.rect(x0, y0, x1, y1);
	c.stroke();
}


function drawText(c, txt, x0, y0)
{
	c.font = "28px Comic Sans MS";
	c.fillText(txt, x0, y0);
}


function drawDot(c, h, x, y)
{
	c.beginPath();
	c.lineWidth = "1";
	c.strokeStyle = h;
	c.rect(x, y, 6, 6);
	c.stroke();
}

function drawLine(c, x0, y0, x1, y1)
{
	c.beginPath();
	c.moveTo(x0, y0);
	c.lineTo(x1, y1);
	c.stroke(); 
}

function reDraw(c, ww, wh) {c.clearRect(0, 0, ww, wh);}



var inner_window_width = document.getElementsByTagName("html")[0].clientWidth;
var inner_window_height = document.getElementsByTagName("html")[0].clientHeight;

var pi = 3.1415926538;

var player_look_dir = [0.0, 0.0, 0.0];
var player_look_dir_i = [0.0, 0.0, 0.0];
var mouseData = [0.0, 0.0];
var mouseDataS = [0.0, 0.0];
var mouseDataI = [0.0, 0.0]; // Actual final?
var mouseDataD = [0.0, 0.0];

var player_pos = [0.001,0.001,0.001];
var LookToggle = 0;

onmousemove = function(e)
{
	mouseData[0] = e.clientX; mouseData[1] = e.clientY;
}


// d - 68
// w - 87
// a - 65
// s - 83


			 //w,s,a,d,spc
var keyInfo = [0,0,0,0,0];

var el = document.getElementById("html");

// REFACTOR

el.onkeydown = function(evt)
{
    evt = evt || window.event;

    if (evt.keyCode == 87) {keyInfo[0]=1;}
    if (evt.keyCode == 83) {keyInfo[1]=1;}
    if (evt.keyCode == 65) {keyInfo[2]=1;}
    if (evt.keyCode == 68) {keyInfo[3]=1;}
    if (evt.keyCode == 32) {keyInfo[4]=1;}
    
};

el.onkeyup = function(evt)
{
	evt = evt || window.event;

    if (evt.keyCode == 87) {keyInfo[0]=0;}
    if (evt.keyCode == 83) {keyInfo[1]=0;}
    if (evt.keyCode == 65) {keyInfo[2]=0;}
    if (evt.keyCode == 68) {keyInfo[3]=0;}
    if (evt.keyCode == 32) {keyInfo[4]=0;}
};


var inc = 0;
var m1 = turbojs.alloc(200);
var m2 = turbojs.alloc(200);

//var m0 = turbojs.alloc(200);


// Make some koo wave shit

// for (var i = 0; i < 100; i++)
// {
// 	m1.data[i*4] = 0.0;   m0.data[i*4] = 0.0;
// 	m1.data[i*4+1] = 0.0; m0.data[i*4+1] = 0.0;
// 	m1.data[i*4+2] = 0.0; m0.data[i*4+2] = 0.0;
// 	m1.data[i*4+3] = 1.0; m0.data[i*4+3] = 1.0;
// } 


function setData(dx,dy,dz)
{
	//var dz = -2.01;
	m1.data[0] = -1.0+dx; m1.data[1] = -1.0+dy; m1.data[2] = -1.0+dz; m1.data[3] = 1;
	m1.data[4] = -1.0+dx; m1.data[5] = -1.0+dy; m1.data[6] = 1.0+dz; m1.data[7] = 1;

	m1.data[8] = 1.0+dx; m1.data[9] = -1.0+dy; m1.data[10] = -1.0+dz; m1.data[11] = 1;
	m1.data[12] = 1.0+dx; m1.data[13] = -1.0+dy; m1.data[14] = 1.0+dz; m1.data[15] = 1;

	m1.data[16] = 1.0+dx; m1.data[17] = 1.0+dy; m1.data[18] = -1.0+dz; m1.data[19] = 1;
	m1.data[20] = 1.0+dx; m1.data[21] = 1.0+dy; m1.data[22] = 1.0+dz; m1.data[23] = 1;

	m1.data[24] = -1.0+dx; m1.data[25] = 1.0+dy; m1.data[26] = -1.0+dz; m1.data[27] = 1;
	m1.data[28] = -1.0+dx; m1.data[29] = 1.0+dy; m1.data[30] = 1.0+dz; m1.data[31] = 1;
}


setData();



document.addEventListener("DOMContentLoaded", function(event)
{ 


	//var thepast = new Date().getTime() / 1000;
	//var delta = 0;


						/*-- GET SCREEN DIMENSIONS --\
						\---------------------------*/

	var screen_width = window.screen.width * window.devicePixelRatio;
	var screen_height = window.screen.height * window.devicePixelRatio;

	var canvas = document.getElementById("cv");
	var ctx = canvas.getContext("2d");



	document.getElementById("cv").width = inner_window_width;
	document.getElementById("cv").height = inner_window_height;
	document.getElementsByTagName("body")[0].width = inner_window_width;
	document.getElementsByTagName("body")[0].height = inner_window_height;


						/*-- turbojs --\
						\-------------*/



	//{

	function drawIt(init_dat)
	{
		reDraw(ctx, inner_window_width, inner_window_height); // FIRST


		// DEBUG PANEL

		drawText(ctx, mouseData[0], 100, inner_window_height-100);
		drawText(ctx, "S: " + mouseDataS[0], 100, inner_window_height-150);
		drawText(ctx, player_look_dir[0] + " : " + player_look_dir[1], 100, inner_window_height-250);
		drawText(ctx, player_look_dir_i[0] + " : " + player_look_dir_i[1], 100, inner_window_height-300);

		drawText(ctx, mouseDataD[0] + " : " + mouseDataD[1], 100, inner_window_height-350);
		drawText(ctx, mouseDataI[0] + " : " + mouseDataI[1], 100, inner_window_height-400);

		for (var i=0; i<(40); i++)
		{

			// Offset to center of screen (temp)
			var s = 30;

			drawDot(ctx, "#FFF", init_dat.data[4*i]*s+inner_window_width/2, init_dat.data[4*i+1]*s+300);
			//drawText(ctx, "A", init_dat.data[4*i]*s+inner_window_width/2, init_dat.data[4*i+1]*s+300);
			drawLine(ctx, init_dat.data[4*i]*s+inner_window_width/2, init_dat.data[4*i+1]*s+300, init_dat.data[4*(i+1)]*s+inner_window_width/2, init_dat.data[4*(i+1)+1]*s+300);


			//drawDot(ctx, m1.data[4*i]/m1.data[4*i+3]*100+500, m1.data[4*i+1]/m1.data[4*i+3]*100+500);
			//m1.data[4*i+2]=m1.data[4*i+2]/m1.data[4*i+3]

			//drawDot(ctx, 500, 500);
		}
	}




	function Compute(init_dat, t_inc)
	{
		var keyVec = [keyInfo[3]-keyInfo[2], keyInfo[0]-keyInfo[1]];

		if (keyVec[0] != 0)
		{
			player_pos[0] += Math.cos(2*pi+player_look_dir[0]+0.001)*keyVec[0]*0.3;
			player_pos[2] += Math.sin(2*pi+player_look_dir[0]+0.001)*keyVec[0]*0.3;
		}

		if (keyVec[1] != 0)
		{
			player_pos[0] += Math.sin(2*pi-player_look_dir[0]+0.001)*keyVec[1]*0.3 * -1; // -1 temp ig
			player_pos[2] += Math.cos(2*pi-player_look_dir[0]+0.001)*keyVec[1]*0.3 * -1;
		}

		if (keyInfo[4])
		{
				if (!LookToggle)
				{
					mouseDataS[0] = mouseData[0]; mouseDataS[1] = mouseData[1];
					player_look_dir_i = player_look_dir;
				}
				LookToggle = 1;

				var dX = mouseDataS[0]-mouseData[0]; var dY = mouseDataS[1]-mouseData[1];
				                     mouseDataD[0] = dX; mouseDataD[1] = dY;
 

				player_look_dir = [ player_look_dir_i[0]+(dX/inner_window_width * pi * 2) , player_look_dir_i[1]+(dY/inner_window_width * pi * 2) , 0 ]; // ! width 4 both !

		} else {LookToggle = 0; mouseDataI[0] = mouseDataI[0]-mouseDataD[0]; mouseDataI[1]-mouseDataD[1];}



		//setData(0,t_inc,-2.01);
		setData(0, 0, 0);


//		float theta = ${t_inc};

		//	read().x*cos(2.)+read.z*sin(2.),
		//	read().y,
		//	-read().x*sin(2.)+read.z*cos(2.),
		//	read().z

		// Apply rotation here

		// Rot around y // 1.2 = t_inc
		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			cos(${1.2})*read().x+sin(${1.2})*read().z+${-player_pos[0]}, 
			read().y+${player_pos[1]},
			cos(${1.2})*read().z-sin(${1.2})*read().x+${-player_pos[2] - 3.41},
			read().w
		));
		}`);

		/*
		// Rot around x ${player_look_dir[0]}
		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			read().x,
			cos(${player_look_dir[0]})*read().y+sin(${player_look_dir[0]})*read().z,
			cos(${player_look_dir[0]})*read().z-sin(${player_look_dir[0]})*read().y,
			read().w
		));
		}`);
		*/


			/*-- Rotation in World Space --\
			\-----------------------------*/


		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			cos(${player_look_dir[0]+0.001})*read().x+sin(${player_look_dir[0]+0.001})*read().z,
			read().y,
			cos(${player_look_dir[0]+0.001})*read().z-sin(${player_look_dir[0]+0.001})*read().x,
			read().w 
		));
		}`);

		// Attempt at quaternion rotation

		function QuatMult(q1, q2)
		{
			var q = [0,0,0,0];
				q =[q1[0]*q2[0]-q1[1]*q2[1]-q1[2]*q2[2]-q1[3]*q2[3],
			 		q1[1]*q2[0]+q1[0]*q2[1]-q1[3]*q2[2]+q1[2]*q2[3],
			 		q1[2]*q2[0]+q1[3]*q2[1]+q1[0]*q2[2]-q1[1]*q2[3],
			 		q1[3]*q2[0]-q1[2]*q2[1]+q1[1]*q2[2]+q1[0]*q2[3]];
			return q;
		}

		

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

		// : (

		// Quaternion no work. Fix to rot points around two axis.
		// CLIPPING
		// Fix floating point clown show
		// Refactor keyboard (real time) array keyInfo. No if stack. 
		// Convert keyVec to unit vector
		// Import verticies w/ json & allocate
		


		console.log(m1.data); /* CONSOLE OUTPUT */


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
			0
			));
		}`);	


		drawIt(init_dat);
		return(init_dat);


	} // End of Compute()



	function runTime()
	{
		//m1 = m0;
		inc+=0.02;
		//console.log(inc);
		Compute(m1, inc);
		//console.log(m0);
	}
	
	
	//} End of if turbojs

	setInterval(runTime, 10);


	




	// m1.data.forEach((element) =>
	// {
	// 	drawDot(ctx, element[0]*10, element[1]*10);
	// 	console.log(element);
	// });


});



		