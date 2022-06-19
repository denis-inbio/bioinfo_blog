/// ---- ---- ----

const vertexShaderSource = `#version 300 es
in vec2 position_pixels;
in vec3 vertex_color;
in vec2 canvas_dimensions;
in vec2 canvas_dimensions_0;
in vec2 canvas_dimensions_1;
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
uniform vec4 straightColor;
out vec4 fragColor;
void main() {
    fragColor = vec4(0.3, 0.2, 0.4, 1.0);
}`;

const createShader = (gl, shader_type, sourceCode) => {
    console.log(`Creating ${shader_type} shader`);
    const shader = gl.createShader(shader_type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);

    const statusCode = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    console.log(`Compilation status is ${statusCode}`);

    if (statusCode) {
        return shader;
    }
    else {
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
};

const linkShaders = (gl, compiledVertexShader, compiledFragmentShader) => {
    console.log("Linking shaders into program: ", compiledVertexShader, compiledFragmentShader);
    const program = gl.createProgram();
    gl.attachShader(program, compiledVertexShader);
    gl.attachShader(program, compiledFragmentShader);

    gl.linkProgram(program);

    const statusCode = gl.getProgramParameter(program, gl.LINK_STATUS);
    console.log(`Compilation status is ${statusCode}`);
    if (statusCode) {
        return program;
    }
    else {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
};

const createBuffers_loadData_configureAttributes = (gl, program) => {
    console.log("Received program: ", program);

    const position_buffer = gl.createBuffer();
    const color_buffer = gl.createBuffer();
    const canvasDimensions_buffer = gl.createBuffer();
    const canvasDimensions_buffer_0 = gl.createBuffer();
    const canvasDimensions_buffer_1 = gl.createBuffer();
    const straightColor_buffer = gl.createBuffer();

    console.log("Created buffers into context: ", gl);

    const position_data = [
        10, 10,
        10, 200,
        200, 200,
        20, 20,
        300, 20,
        250, 250
    ];
    const color_uniform = [
        0.3, 0.4, 0.7,
        0.3, 0.4, 0.7,
        0.3, 0.4, 0.2,
        0.3, 0.8, 0.7,
        0.9, 0.4, 0.7,
        0.6, 0.8, 0.2,
    ];
    const canvasDimensions_uniform = [
        400, 300,
        400, 300,
        400, 300,
        400, 300,
        400, 300,
        400, 300,
    ];
    const straightColor_uniform = [
        0.3, 0.4, 0.5, 1.0
    ];
//    6x in vec2 position_pixels;
//    6x in vec4 vertex_color;
//    6x in vec2 canvas_dimensions;
//    6x in vec2 canvas_dimensions_0;
//    6x in vec2 canvas_dimensions_1;

    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position_data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_uniform), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, canvasDimensions_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Int32Array(canvasDimensions_uniform), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, canvasDimensions_buffer_0);
    gl.bufferData(gl.ARRAY_BUFFER, new Int32Array(canvasDimensions_uniform), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, canvasDimensions_buffer_1);
    gl.bufferData(gl.ARRAY_BUFFER, new Int32Array(canvasDimensions_uniform), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, straightColor_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(straightColor_uniform), gl.STATIC_DRAW);

    console.log("Loaded the data into the GPU buffers");

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    console.log("Created and bound VAO ", vao);

    const buffers = [position_buffer, color_buffer, canvasDimensions_buffer, canvasDimensions_buffer_0, canvasDimensions_buffer_0];
    const attributes = ["position_pixels", "vertex_color", "canvas_dimensions", "canvas_dimensions_0", "canvas_dimensions_1"];
    const locations = attributes.map( (attribute) => {console.log(`Getting location of '${attribute}' as ${gl.getAttribLocation(program, attribute)}`); return gl.getAttribLocation(program, attribute);} );
    const sizes = [2, 3, 2, 2, 2];
    const types = [gl.FLOAT, gl.FLOAT, gl.INT, gl.INT, gl.INT];

    for (let index = 0; index < locations.length; index++) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[index]);
        console.log("Bound buffer ", buffers[index]);
        gl.vertexAttribPointer(locations[index], sizes[index], types[index], false, 0, 0);
        gl.enableVertexAttribArray(locations[index]);
    }
    console.log("Enabled attributes ", attributes, " in vao " , vao);

    return vao;
};

const setDefaultCanvasDisplaySize = (gl) => {
    gl.canvas.width = 400;
    gl.canvas.height = 300;
};

const defaultCanvasViewport = (gl) => {
    setDefaultCanvasDisplaySize(gl);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    console.log(`Setting the canvas to default dimensions: [${gl.canvas.width}, ${gl.canvas.height}]`);

    gl.clearColor(0, 0, 0, 0);  // set the active color
    gl.clear(gl.COLOR_BUFFER_BIT);  // apply the active color onto a buffer
};

const GPU_compute = (gl, program, vao, primitive, vertices_count) => {
    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.drawArrays(primitive, 0, vertices_count);
};

/// ---- ---- ----

const canvas = document.getElementById("webgl-canvas");
const gl = canvas.getContext("webgl2");
defaultCanvasViewport(gl);

if(gl === null || gl === undefined) {
    console.log("Can't acquire a WebGL2 context; It's likely not a supported API by this browser / platform.");
}

const vertex_shader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = linkShaders(gl, vertex_shader, fragment_shader);
const vao = createBuffers_loadData_configureAttributes(gl, program);
GPU_compute(gl, program, vao, gl.TRIANGLES, 6);

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

// <TODO> the attribPointer is literally going to point to the buffer and tell how to jump in it
    // (?) it's probable that normalization is done on the CPU though (?)

/// ---- ---- ----

const PROGRAM_GetAllLocations = (gl, program) => {
//    console.log("GetAllLocations(): ", gl.getContextAttributes());
    console.log("GetAllLocations(): ", gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES));
    for(let index = 0; index < gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES); index++) {
        console.log(gl.getActiveAttrib(program, index));
    }
};
PROGRAM_GetAllLocations(gl, program);