var c = document.createElement("canvas").getContext("webgl") || document.createElement("canvas").getContext("experimental-webgl");

const cameraTransform =
`void main(void) {

	vec4 after_tran = vec4(
		read().x-_plr_x, 
		read().y-_plr_y,
		read().z-_plr_z,
		0.
	);

  // Rotate around x-axis (pitch)
  vec4 after_pit = vec4(
      cos(_yaw) * after_tran.x + sin(_yaw) * after_tran.z,
      cos(_pit) * after_tran.y - sin(_pit) * (cos(_yaw) * after_tran.z - sin(_yaw) * after_tran.x),
      0.,
      -(sin(_pit) * after_tran.y + cos(_pit) * (cos(_yaw) * after_tran.z - sin(_yaw) * after_tran.x))
  );

	#define d 0.112672939

	// Divide by w
	if (after_pit.w != 0.)
	{
		commit(vec4(
			(after_pit.x/d)/after_pit.w*_fov,
			(after_pit.y/d)/after_pit.w*_fov*(_wc/_hc),
			1.0 / pow(after_pit.w*0.03, 0.7),
			after_pit.w
			));
		} else {
		commit(vec4(
			0.,
			0.,
			0.,
			0.
			));
	}
}`;

// Removed IIFE
"use strict";

function a(a, b, d) {
    var e = c.createBuffer();
    c.bindBuffer(d || c.ARRAY_BUFFER, e);
    c.bufferData(d || c.ARRAY_BUFFER, new (b || Float32Array)(a), c.STATIC_DRAW);
    return e;
}

function b(a, b) {
    var d = c.createTexture();
    c.bindTexture(c.TEXTURE_2D, d);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
    c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
    c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, b, b, 0, c.RGBA, c.FLOAT, a);
    c.bindTexture(c.TEXTURE_2D, null);
    return d;
}
var bTex;

var ext = c.getExtension('WEBGL_color_buffer_float');
if (ext) {
    c.getExtension('WEBGL_color_buffer_float');
}

if (!c) {
    throw new Error("Error.");
}

if (!c.getExtension("OES_texture_float")) {
    throw new Error("Error.");
}

var d = a([-1, -1, 1, -1, 1, 1, -1, 1]);
var e = a([0, 0, 1, 0, 1, 1, 0, 1]);
var f = a([1, 2, 0, 3, 0, 2], Uint16Array, c.ELEMENT_ARRAY_BUFFER);
var g = c.createShader(c.VERTEX_SHADER);

c.shaderSource(g, "attribute vec2 position;\nvarying vec2 pos;\nattribute vec2 texture;\nvoid main(void) {\n  pos = texture;\n  gl_Position = vec4(position.xy, 0.0, 1.0);\n}");
c.compileShader(g);

var _yaw, _pit, _wc, _hc, _fov, _plr_x, _plr_y, _plr_z, jay, uTex, lPos, mTex;
var shaderModule = {
  init: function() {

        jay = c.createProgram();

        var i = c.createShader(c.FRAGMENT_SHADER);
        c.shaderSource(i, "precision mediump float;\nuniform float _yaw;\nuniform float _pit;\nuniform float _wc;\nuniform float _hc;\nuniform float _fov;\nuniform float _plr_x;\nuniform float _plr_y;\nuniform float _plr_z;\nuniform sampler2D u_texture;\nvarying vec2 pos;\nvec4 read(void) { return texture2D(u_texture, pos); }\nvoid commit(vec4 val) { gl_FragColor = val; }\n" + cameraTransform);
        c.compileShader(i);
        c.attachShader(jay, g);
        c.attachShader(jay, i);
        c.linkProgram(jay);

        _yaw = c.getUniformLocation(jay, "_yaw");
        _pit = c.getUniformLocation(jay, "_pit");
        _wc = c.getUniformLocation(jay, "_wc");
        _hc = c.getUniformLocation(jay, "_hc");
        _fov = c.getUniformLocation(jay, "_fov");
        _plr_x = c.getUniformLocation(jay, "_plr_x");
        _plr_y = c.getUniformLocation(jay, "_plr_y");
        _plr_z = c.getUniformLocation(jay, "_plr_z");
        uTex = c.getUniformLocation(jay, "u_texture");
        lPos = c.getAttribLocation(jay, "position");
        mTex = c.getAttribLocation(jay, "texture");

        c.enableVertexAttribArray(mTex);
        c.enableVertexAttribArray(lPos);

        c.useProgram(jay);

      // make frame buffer partially dynamic
  },
    run: function (a, in1, in2, in3, in4, in5, in6, in7, in8) {

        var n = Math.sqrt(a.data.length) / 4;
        var o = b(a.data, n);
        c.viewport(0, 0, n, n);
        c.bindFramebuffer(c.FRAMEBUFFER, c.createFramebuffer());
        // bTex = b(new Float32Array(a.data.length), n);
        bTex = b(a.data, n);
        c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, bTex, 0);
        c.bindTexture(c.TEXTURE_2D, o);
        c.activeTexture(c.TEXTURE0);
        c.uniform1i(uTex, 0);
        c.bindBuffer(c.ARRAY_BUFFER, e);
        c.vertexAttribPointer(mTex, 2, c.FLOAT, !1, 0, 0);
        c.bindBuffer(c.ARRAY_BUFFER, d);
        c.vertexAttribPointer(lPos, 2, c.FLOAT, !1, 0, 0);
        c.uniform1f(_yaw, in1);
        c.uniform1f(_pit, in2);
        c.uniform1f(_wc, in3);
        c.uniform1f(_hc, in4);
        c.uniform1f(_fov, in5);
        c.uniform1f(_plr_x, in6);
        c.uniform1f(_plr_y, in7);
        c.uniform1f(_plr_z, in8);
        c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, f);
        c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0);
        c.readPixels(0, 0, n, n, c.RGBA, c.FLOAT, a.data);
        // return a.data.subarray(0, a.length);
    },
    alloc: function (a) {
        var b = Math.pow(Math.pow(2, Math.ceil(Math.log(a) / 1.386) - 1), 2);
        return {
            data: new Float32Array(16 * b),
            length: a
        };
    }
};



