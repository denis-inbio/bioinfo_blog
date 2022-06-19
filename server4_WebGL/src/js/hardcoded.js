const vertexShaderSource_0 = `#version 300 es
in vec4 initial_vertex_position;
in vec4 initial_vertex_color;
void main () {
    gl_Position = initial_vertex_position;
}`;
const vertexShaderSource_1 = `#version 300 es
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
const fragmentShaderSource_0 = `#version 300 es
precision highp float;
out vec4 outColor;
void main() {
    outColor = vec4(1.0, 0.0, 0.5, 1.0);
}`;

const createShader = (gl_context, shader_type, sourceCode) => {
    console.log(`Creating ${shader_type} shader`);
    const shader = gl_context.createShader(shader_type)
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

module.exports = {vertexShaderSource, fragmentShaderSource, createShader};