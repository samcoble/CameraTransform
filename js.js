

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
	c.font = "48px Comic Sans MS";
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



function reDraw(c, ww, wh)
{
	c.clearRect(0, 0, ww, wh);
}



	var inner_window_width = document.getElementsByTagName("html")[0].clientWidth;
	var inner_window_height = document.getElementsByTagName("html")[0].clientHeight;

var pi = 3.1415926538;

var player_look_dir = [0.0, 0.0, 0.0];

onmousemove = function(e)
{
	//console.log("mouse location:", e.clientX, e.clientY)
	player_look_dir = [-2*pi*e.clientY/inner_window_height, 2*pi*e.clientX/inner_window_height, 0.0];
	console.log(player_look_dir);
}

var player_pos = [0.001,0.001,0.001]

var el = document.getElementById("html");

el.onkeydown = function(evt) {
    evt = evt || window.event;
    //alert("keydown: " + evt.keyCode);
    if (evt.keyCode == 87)
    {  // z & x
    	player_pos[0] += Math.sin(player_look_dir[1])*(-0.1);
    	player_pos[2] += Math.cos(player_look_dir[1])*(0.1);
    }

    if (evt.keyCode == 83)
    {  // z & x
    	player_pos[0] += Math.sin(player_look_dir[1])*(0.1);
    	player_pos[2] += Math.cos(player_look_dir[1])*(-0.1);
    }

    if (evt.keyCode == 65)
    {  // z & x
    	player_pos[0] += Math.sin(player_look_dir[1]+pi/2)*(0.1);
    	player_pos[2] += Math.cos(player_look_dir[1]+pi/2)*(-0.1);
    }


    if (evt.keyCode == 68)
    {  // z & x
    	player_pos[0] += Math.sin(player_look_dir[1]+pi/2)*(-0.1);
    	player_pos[2] += Math.cos(player_look_dir[1]+pi/2)*(0.1);
    }
};


//onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)}


//el.onkeyup = function(evt) {
//    evt = evt || window.event;
//    alert("keyup: " + evt.keyCode);
//};


// d - 68
// w - 87
// a - 65
// s - 83

var inc = 0;
var m1 = turbojs.alloc(200);

	//var m0 = turbojs.alloc(200);

	
	// for (var i = 0; i < 100; i++)
	// {
	// 	m1.data[i*4] = 0.0;   m0.data[i*4] = 0.0;
	// 	m1.data[i*4+1] = 0.0; m0.data[i*4+1] = 0.0;
	// 	m1.data[i*4+2] = 0.0; m0.data[i*4+2] = 0.0;
	// 	m1.data[i*4+3] = 1.0; m0.data[i*4+3] = 1.0;
	// } 
	
	
	console.log(m1); /* CONSOLE OUTPUT */

	/*
  	var dx, dy, dz = 0.01;
  	dx = 0.01; dy = 0.01; dz = -2.01;

	m1.data[0] = -1.01+dx; m1.data[1] = -1.01+dy; m1.data[2] = -1.01+dz;
	m1.data[4] = -1.01+dx; m1.data[5] = -1.01+dy; m1.data[6] = 1.01+dz;

	m1.data[8] = 1.01+dx; m1.data[9] = -1.01+dy; m1.data[10] = -1.01+dz;
	m1.data[12] = 1.01+dx; m1.data[13] = -1.01+dy; m1.data[14] = 1.01+dz;

	m1.data[16] = 1.01+dx; m1.data[17] = 1.01+dy; m1.data[18] = -1.01+dz;
	m1.data[20] = 1.01+dx; m1.data[21] = 1.01+dy; m1.data[22] = 1.01+dz;

	m1.data[24] = -1.01+dx; m1.data[25] = 1.01+dy; m1.data[26] = -1.01+dz;
	m1.data[28] = -1.01+dx; m1.data[29] = 1.01+dy; m1.data[30] = 1.01+dz;

	*/

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

	//m0 = m1;

	//console.log(" Should give cube verticies "); /* CONSOLE OUTPUT */
	//console.log(m1.data); /* CONSOLE OUTPUT */
	//m0 = m1;




$(document).ready(function()
{
	if (jQuery) {console.log("! jQuery Loaded !");} else {console("! JQuery did not load !");}


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





	//if (turbojs) // Problem here calling a fn in this without it?
	//{

	function drawIt(init_dat)
	{
		reDraw(ctx, inner_window_width, inner_window_height);
		//for (var i=0; i<(400/4); i++)
		for (var i=0; i<(8*4); i++)
		{
			// Here predefined;
			// x = .[4*i]   // y = .[4*i+1]

			// 500 to offset to center of screen (temp)
			var s = 30;
			//console.log(m1.data); /* CONSOLE OUTPUT */
			drawDot(ctx, "#FFF", init_dat.data[4*i]*s+inner_window_width/2, init_dat.data[4*i+1]*s+300);
			drawText(ctx, "Cum", init_dat.data[4*i]*s+inner_window_width/2, init_dat.data[4*i+1]*s+300);
			drawLine(ctx, init_dat.data[4*i]*s+inner_window_width/2, init_dat.data[4*i+1]*s+300, init_dat.data[4*(i+1)]*s+inner_window_width/2, init_dat.data[4*(i+1)+1]*s+300);


			//drawDot(ctx, m1.data[4*i]/m1.data[4*i+3]*100+500, m1.data[4*i+1]/m1.data[4*i+3]*100+500);
			//m1.data[4*i+2]=m1.data[4*i+2]/m1.data[4*i+3]

			//drawDot(ctx, 500, 500);
		}
	}

	function Compute(init_dat, t_inc)
	{
		//console.log(" Should yeild default 0,0,0,1 ");
		//console.log(m0.01data);


		//console.log(" Should be m1 data "); /* CONSOLE OUTPUT */
		//console.log(m1.data); /* CONSOLE OUTPUT */
		//console.log(m_temp.data); /* CONSOLE OUTPUT */

		//setData(0,t_inc,-2.01);
		setData(0, 0, 0);

//		float theta = ${t_inc};

		//	read().x*cos(2.)+read.z*sin(2.),
		//	read().y,
		//	-read().x*sin(2.)+read.z*cos(2.),
		//	read().z

		// Apply rotation here

		// Rot around y
		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			cos(${t_inc})*read().x+sin(${t_inc})*read().z+${-player_pos[0]},
			read().y+${player_pos[1]},
			cos(${t_inc})*read().z-sin(${t_inc})*read().x+${-player_pos[2] - 3.41},
			read().w
		));
		}`);

		// Rot around x ${player_look_dir[0]}
		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			read().x,
			cos(${player_look_dir[0]})*read().y+sin(${player_look_dir[0]})*read().z,
			cos(${player_look_dir[0]})*read().z-sin(${player_look_dir[0]})*read().y,
			read().w
		));
		}`);

		// Rot around y
		turbojs.run(init_dat, `void main(void) {

		commit(vec4(
			cos(${player_look_dir[1]})*read().x+sin(${player_look_dir[1]})*read().z,
			read().y,
			cos(${player_look_dir[1]})*read().z-sin(${player_look_dir[1]})*read().x,
			read().w
		));
		}`);



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




		//console.log(m1.data); /* CONSOLE OUTPUT */

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



		/* JS GRAVEYARD

		 //var init_model = new Float32Array(4096);

		// const m1 = {
		//   data:  ,
		//   length: 400,
		// };

	  	//vec4 ipt = read();
	  	//vec4 s = vec4(9.,2.,2.,1.);
	  	//vec4 p = vec4(2., 7., 4., 1.);
	  	//commit(s * p);

	  	//commit(vec4( (read().x*cos(a)-read().y*sin(a)), (read().x*sin(a)+read().y*cos(a)), read().z, read().w) );

	  	// x' = x*cos(a) - y*sin(a)
	  	// y' = x*sin(a) + y*cos(a)

		//for(int i = 0; i < 100; i++) {
		//	if (x * x + y * y >= 2. * 2.) break;
		//
		//	xt = x * x - y * y + x0;
		//	y = 2. * x * y + y0;
		//	x = xt;
		//	c++;
		//}

		//float a = PI/2. * ${delta};

		  turbojs.run(m1, `void main(void) {

		  	commit(vec4(
			  	(read().x+50.01),
			  	(read().y+50.01),
			  	(read().z),
			  	0
		  	));
		  }`);	

		*/