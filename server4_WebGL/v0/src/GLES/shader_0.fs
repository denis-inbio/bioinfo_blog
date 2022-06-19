#version 300 es
// supposedly the fragment shader part of the  pipeline does not have a "default precision"; so likely, the vertex shader part does
precision highp float;

out vec4 outColor;  // huh ?

void main() {
    outColor = vec4(1.0, 0.0, 0.5, 1.0);
}