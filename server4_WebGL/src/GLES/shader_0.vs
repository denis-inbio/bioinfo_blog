#version 300 es

in vec4 initial_vertex_position;
in vec4 initial_vertex_color;

void main () {
    gl_Position = initial_vertex_position;
}