/*
===========================================
Title: Sierpinski Gasket - WebGL
Author: Cody Walker
Date: 06/19/2026

Pseudocode

1. Initialize WebGL
    - Get canvas
    - Create WebGL context

2. Create shaders
    - Vertex shader
    - Fragment shader

3. Compile and link shaders
    - Create shader program
    - Attach shaders
    - Activate program

4. Generate Sierpinski points
    - Define triangle vertices
    - Select initial point
    - Repeat:
        - Choose random vertex
        - Move halfway toward vertex
        - Store generated point

5. Send point data to GPU
    - Create Vertex Buffer Object (VBO)
    - Transfer points to GPU memory

6. Configure vertex attributes
    - Associate point coordinates with shader input

7. Render gasket
    - Clear canvas
    - Draw generated points

===========================================
*/

// =====================================
// Initialize WebGL
// =====================================

const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported");
}

// =====================================
// Vertex Shader
// =====================================

// The vertex shader receives point coordinates and determines where each point appears on screen.
const vertexShaderSource = `
attribute vec2 aPosition;

void main() {
    // size of each rendered point
    gl_PointSize = 1.0;
    
    // convert the 2D position into clip-space coordinates
    gl_Position = vec4(aPosition, 0.0, 1.0):
}
`;

// =====================================
// Fragment Shader
// =====================================

// The fragment shader determines the color of each rendered point.
const fragmentShaderSource = `
precision mediump float;

void main() {
    // White points
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

// =====================================
// Generate Sierpinski Points
// =====================================

// Array that will store all generated x/y point coordinates
const points = [];

// three vertices of the main triangle
const vertices = [
    [-0.8, -0.8],
    [0.0, 0.8],
    [0.8, -0.8],
];

// start with an initial point inside the triangle 
let p = [0.0,0.0];

// number of points to generate
const numberOfPoints = 5000;

// Repeatedly move halfway toward a randomly selected vertex
// This creates the Sierpinski Gasket pattern over time
for (let i = 0; i < numberOfPoints; i++) {

    // choose one of the three triangle vertices at random
    const randomIndex = Math.floor(Math.random() * 3);
    const selectedVertex = vertices[randomIndex];

    // move halfway from the current point toward the selected vertex
    p = [
        (p[0] + selectedVertex[0]) / 2,
        (p[1] + selectedVertex[1]) / 2
    ];

    // store the generated point
    points.push(p[0], p[1]);
}

