const ctx_gl = document.getElementById('cv_gl');
const gl = ctx_gl.getContext("webgl", { antialias: true, preserveDrawingBuffer: true, alpha:true });

if (!gl) {console.error('Unable to initialize WebGL. Your browser may not support it.');}

var shaderProgram, shaderProgram2;
var positionAttrib;
var colorUniformLocation;

var vertices, _pts, _si, _si2, colorBuffer, colorAttrib;
var _triverts = new Float32Array(130000);

function resizeCanvas(w, h)
{
  ctx_gl.width = w;
  ctx_gl.height = h;

  // Refresh the WebGL context
  gl.viewport(0, 0, w, h);
}

function initWebGL()
{

  const vertexShaderSource =
  `
  attribute vec2 aPosition;
  varying vec4 vColor;
  attribute vec4 aColor;
  void main()
  {
      gl_Position = vec4(aPosition, 0.0, 1.0);
      gl_PointSize = 1.8; // point size
      vColor = aColor;
  }
  `;
  const fragmentShaderSource0 =
  `
  precision mediump float;
  uniform vec4 uColor;
  void main()
  {
      gl_FragColor = uColor;
  }
  `;
  
  // const fragmentShaderSource1 =
  // `
  // precision mediump float;
  // varying vec4 vColor;
  // void main()
  // {
  //     gl_FragColor = vColor;
  // }
  // `;
  
  const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader0 = createShader(gl, fragmentShaderSource0, gl.FRAGMENT_SHADER);
  //const fragmentShader1 = createShader(gl, fragmentShaderSource1, gl.FRAGMENT_SHADER);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  shaderProgram = createProgram(gl, vertexShader, fragmentShader0);
  //shaderProgram2 = createProgram(gl, vertexShader, fragmentShader1);

  colorUniformLocation = gl.getUniformLocation(shaderProgram, 'uColor');
  // gl.uniform4fv(colorUniformLocation, [1.0, 1.0, 1.0, 1]); // Set your desired color

  positionAttrib = gl.getAttribLocation(shaderProgram, 'aPosition');
  gl.enableVertexAttribArray(positionAttrib);

  //positionAttrib = gl.getAttribLocation(shaderProgram2, 'aPosition');
  //gl.enableVertexAttribArray(positionAttrib);
}

initWebGL();



function createShader(gl, source, type)
{
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
  }

  return shader;
}

function createProgram(gl, vertexShader, fragmentShader)
{
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
  }

  gl.useProgram(program);
  return program;
}
