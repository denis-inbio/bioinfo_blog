/// ---- ---- ----

const vertexShaderSource = `#version 300 es
in vec2 position_pixels;
in vec4 vertex_color;
uniform vec2 canvas_dimensions;
void main () {
    // convert pixels to [0, 1.0]
    vec2 normalized = position_pixels / canvas_dimensions;
    // convert normalized [0, 1.0] to [0, 2.0], so it can be offset by -1.0
    vec2 _normalized = 2.0 * normalized;
    // displace by -1.0
    vec2 clipSpace = _normalized - 1.0;
    
    gl_Position = vec4(clipSpace, 0.0, 1.0);    // the default is (x: 0, y: 0, z: 0, w: 1.0)
}`;
const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 outColor;
void main() {
    outColor = vec4(0.0, 0.0, 1.0, 1.0);
}`;

const createShader = (gl_context, shader_type, sourceCode) => {
    console.log(`Creating ${shader_type} shader`);
    const shader = gl_context.createShader(shader_type);
    gl_context.shaderSource(shader, sourceCode);
    gl_context.compileShader(shader);

    const statusCode = gl_context.getShaderParameter(shader, gl_context.COMPILE_STATUS);
    console.log(`Compilation status is ${statusCode}`);

    if (statusCode) {
        return shader;
    }
    else {
        console.log(gl_context.getShaderInfoLog(shader));
        gl_context.deleteShader(shader);
    }
};

const linkShaders = (gl_context, compiledVertexShader, compiledFragmentShader) => {
    console.log("Linking shaders into program: ", compiledVertexShader, compiledFragmentShader);
    const program = gl_context.createProgram();
    gl_context.attachShader(program, compiledVertexShader);
    gl_context.attachShader(program, compiledFragmentShader);

    gl_context.linkProgram(program);

    const statusCode = gl_context.getProgramParameter(program, gl_context.LINK_STATUS);
    console.log(`Compilation status is ${statusCode}`);
    if (statusCode) {
        return program;
    }
    else {
        console.log(gl_context.getProgramInfoLog(program));
        gl_context.deleteProgram(program);
    }
};

const loadBuffersWithData = (gl_context, data_buffers) => {

};

const configureAttributes = (gl_context, array_buffer, data_buffers, program) => {
    // note: it binds the attributes onto the current ARRAY_BUFFER
    loadBuffersWithData(gl_context, data_buffers);

    // ...
};

const setDefaultCanvasDisplaySize = (gl_context) => {
    gl_context.canvas.width = 400;
    gl_context.canvas.height = 300;
};

/// ---- ---- ----

const canvas = document.getElementById("webgl-canvas");
const gl_context = canvas.getContext("webgl2");

if(gl_context === null || gl_context === undefined) {
    console.log("Can't acquire a WebGL2 context; It's likely not a supported API by this browser / platform.");
}

const vertex_shader = createShader(gl_context, gl_context.VERTEX_SHADER, vertexShaderSource);
const fragment_shader = createShader(gl_context, gl_context.FRAGMENT_SHADER, fragmentShaderSource);

const program = linkShaders(gl_context, vertex_shader, fragment_shader);

const position_buffer = gl_context.createBuffer();
const color_buffer = gl_context.createBuffer();
const gibberish_buffer = gl_context.createBuffer();

const position_data = [
    0, 0,   // and yet, the code has "in vec4"
    0, 0.5,
    0.7, 0
];
const color_data = [
    0.4, 0.3, 0.2, 1.0, // does this have to have the same cardinality as the other attributes ? what if it doesn't ?
    0.9, 0.2, 0.7, 1.0,
    0.2, 1.0, 0.5, 1.0,
];
const gibberish_data = [
    1234.2986, 198793.12998, -169823.1209, 88969812.20,
    1234.2986, -198793.12998, 169823.1209, -88969812.20,
    -1234.2986, 198793.12998, 169823.1209, -88969812.20,
    -1234.2986, -198793.12998, -169823.1209, 88969812.20,
];

gl_context.bindBuffer(gl_context.ARRAY_BUFFER, position_buffer);
gl_context.bufferData(gl_context.ARRAY_BUFFER, new Float32Array(position_data), gl_context.STATIC_DRAW);
gl_context.bindBuffer(gl_context.ARRAY_BUFFER, color_buffer);
gl_context.bufferData(gl_context.ARRAY_BUFFER, new Float32Array(color_data), gl_context.STATIC_DRAW);
gl_context.bindBuffer(gl_context.ARRAY_BUFFER, gibberish_buffer);
gl_context.bufferData(gl_context.ARRAY_BUFFER, new Float32Array(gibberish_data), gl_context.STATIC_DRAW);

gl_context.bindBuffer(gl_context.ARRAY_BUFFER, position_buffer);
console.log("Loaded the data into the buffers (probably, unless it's lazy)");

const position_attributeLocation = gl_context.getAttribLocation(program, "initial_vertex_position");
console.log("Position attribute location: ", position_attributeLocation);

const color_attributeLocation = gl_context.getAttribLocation(program, "initial_vertex_color");
console.log("Color attribute location: ", color_attributeLocation);

const vao_attributesFromArray = gl_context.createVertexArray();
gl_context.bindVertexArray(vao_attributesFromArray);

gl_context.enableVertexAttribArray(position_attributeLocation);
let size = 2;
let type = gl_context.FLOAT;
let normalize = false;  // it's already normalized; besides, how would it normalize anyway ? [0, max] -> [0, 1] ? or it could also consider |negative_max| => [-1, +1]
let stride = 0; // <TODO> ?? I am not exactly sure if it applies a +1 * sizeof(type) implicitly, and whether here I apply any "extra stride" actually
let offset = 0;
gl_context.vertexAttribPointer(position_attributeLocation, size, type, normalize, stride, offset)

    //<TODO> why doesn't the second attribute work ?
// gl_context.enableVertexAttribArray(color_attributeLocation);
// size = 4;
// type = gl_context.FLOAT;
// normalize = false;
// stride = 0;
// offset = 0;
// gl_context.vertexAttribPointer(color_attributeLocation, size, type, normalize, stride, offset)
// <TODO> this literally feels like providing terms to the parametrization of a mechanism for pointer arithmetic (the iteration displacement, essentially)
// <TODO> A hidden part of gl.vertexAttribPointer is that it binds the current ARRAY_BUFFER to the attribute. In other words now this attribute is bound to positionBuffer. That means we're free to bind something else to the ARRAY_BUFFER bind point.

setDefaultCanvasDisplaySize(gl_context);
gl_context.viewport(0, 0, gl_context.canvas.width, gl_context.canvas.height);
console.log(`Setting the canvas to default dimensions: [${gl_context.canvas.width}, ${gl_context.canvas.height}]`);

gl_context.clearColor(0, 0, 0, 0);  // set the active color
gl_context.clear(gl_context.COLOR_BUFFER_BIT);  // apply the active color onto a buffer

gl_context.useProgram(program);
gl_context.bindVertexArray(vao_attributesFromArray);

const primitiveType = gl_context.TRIANGLES;
offset = 0;
const count = 3;

gl_context.drawArrays(primitiveType, offset, count);    // executes the vertex shader 3 times
    // the generated 3 vertex shaders' output will then compose and be piped to a fragment shader

/// ---- ---- ----

// <TODO> load up random data into a GPU buffer; fill it up as much as you can; will it crash the browser ? or freeze the system ? can it do so ?

// <TODO> use AJAX to retrieve the files, then compile them client-side
// <TODO> so, I take it that AJAX is just a "programming style"; there is likely no "AJAX API"; instead, one would sue
// XMLHttpRequest() to a web route ?

// <TODO> normalization function for the GLSL source code; why ? because supposedly the
    // "#version 300 ES" needs to be the very first thing being read, else the interpreter-compiler will default to "#version 100 es";
    // also, just to minify the code (!), remove comments, use minimal identifiers

// <TODO> I dislike not having that require() functionality in the client-side

// <TODO> devise a shader and pipeline that handles all of the configuration, and I just
    // pipe in the coordinates of the points, and eventually color information (basically, what the
    // shaders see in their "in vec4" that is not a result of being piped through the chain

// <TODO> offer an interface to modify the input parameters; for example, a color picker

// <TODO> the next step is to make a 3D object that can be interacted with => we are going to VR in the web browser (!)
    // after all, VR is simply about doing 2D or 3D, possibly with dual-ocular projection

