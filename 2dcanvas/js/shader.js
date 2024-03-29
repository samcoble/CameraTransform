(function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof module && module.exports ? module.exports = b() : a.GLSLfragmentShader = b()
}
)(this, function() {
    "use strict";
    function a(a, b, d) {
        var e = c.createBuffer();
        return c.bindBuffer(d || c.ARRAY_BUFFER, e),
        c.bufferData(d || c.ARRAY_BUFFER, new (b || Float32Array)(a), c.STATIC_DRAW),
        e
    }
    function b(a, b) {
        var d = c.createTexture();
        return c.bindTexture(c.TEXTURE_2D, d),
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE),
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE),
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST),
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST),
        c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, b, b, 0, c.RGBA, c.FLOAT, a),
        c.bindTexture(c.TEXTURE_2D, null),
        d
    }
    var c = document.createElement("canvas").getContext("webgl") || document.createElement("canvas").getContext("experimental-webgl");

	var ext = c.getExtension('WEBGL_color_buffer_float');
	if (ext) {c.getExtension('WEBGL_color_buffer_float');}

    if (!c)
        throw new Error("Unable to initialize WebGL");
    if (!c.getExtension("OES_texture_float"))
        throw new Error("OES_texture_float not available.");
    var d = a([-1, -1, 1, -1, 1, 1, -1, 1])
      , e = a([0, 0, 1, 0, 1, 1, 0, 1])
      , f = a([1, 2, 0, 3, 0, 2], Uint16Array, c.ELEMENT_ARRAY_BUFFER)
      , g = c.createShader(c.VERTEX_SHADER);
    return c.shaderSource(g, "attribute vec2 position;\nvarying vec2 pos;\nattribute vec2 texture;\nvoid main(void) {\n  pos = texture;\n  gl_Position = vec4(position.xy, 0.0, 1.0);\n}"),
    c.compileShader(g),
    {
        run: function(a, h) {
            var i = c.createShader(c.FRAGMENT_SHADER);
            c.shaderSource(i, "precision mediump float;\nuniform sampler2D u_texture;\nvarying vec2 pos;\nvec4 read(void) { return texture2D(u_texture, pos); }\nvoid commit(vec4 val) { gl_FragColor = val; }\n" + h),
            c.compileShader(i);
            var j = c.createProgram();
            c.attachShader(j, g),
            c.attachShader(j, i),
            c.linkProgram(j);
            var k = c.getUniformLocation(j, "u_texture")
              , l = c.getAttribLocation(j, "position")
              , m = c.getAttribLocation(j, "texture");
            c.useProgram(j);
            var n = Math.sqrt(a.data.length) / 4
              , o = b(a.data, n);
            c.viewport(0, 0, n, n),
            c.bindFramebuffer(c.FRAMEBUFFER, c.createFramebuffer());
            var p = b(new Float32Array(a.data.length), n);
            return c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, p, 0),
            c.bindTexture(c.TEXTURE_2D, o),
            c.activeTexture(c.TEXTURE0),
            c.uniform1i(k, 0),
            c.bindBuffer(c.ARRAY_BUFFER, e),
            c.enableVertexAttribArray(m),
            c.vertexAttribPointer(m, 2, c.FLOAT, !1, 0, 0),
            c.bindBuffer(c.ARRAY_BUFFER, d),
            c.enableVertexAttribArray(l),
            c.vertexAttribPointer(l, 2, c.FLOAT, !1, 0, 0),
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, f),
            c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0),
            c.readPixels(0, 0, n, n, c.RGBA, c.FLOAT, a.data),
            a.data.subarray(0, a.length)
        },
        alloc: function(a) {
            var b = Math.pow(Math.pow(2, Math.ceil(Math.log(a) / 1.386) - 1), 2);
            return {
                data: new Float32Array(16 * b),
                length: a
            }
        }
    }
});
