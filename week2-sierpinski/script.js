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
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// =====================================
// Fragment Shader
// =====================================

// The fragment shader determines the color of each rendered point.
const fragmentShaderSource = `
precision mediump float;

void main() {
    // White points -- original // changed to Green for tests
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
`;

// =====================================
// Compile and Link Shaders
// =====================================

function createShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
}

gl.useProgram(program);

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

// =====================================
// Create Vertex Buffer Object (VBO)
// =====================================

// Create a buffer on the GPU
const buffer = gl.createBuffer();

// Make this the active buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// Transfer generated point data to GPU memory
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(points),
    gl.STATIC_DRAW
);

// =====================================
// Configure Vertex Attributes
// =====================================

// Find the location of the aPosition attribute in the vertex shader
const positionLocation = gl.getAttribLocation(program, "aPosition");

// Tell WebGL how to read the position data from the buffer
gl.vertexAttribPointer(
    positionLocation,
    2,          // each point has 2 values: x and y
    gl.FLOAT,   // data type
    false,      // do not normalize
    0,          // stride
    0           // offset
);

// Enable the aPosition attribute
gl.enableVertexAttribArray(positionLocation);

// =====================================
// Render Gasket
// =====================================

// Set the canvas background color to black
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// Clear the canvas before drawing
gl.clear(gl.COLOR_BUFFER_BIT);

// Draw the generated points as the primitive type POINTS
gl.drawArrays(
    gl.POINTS,
    0,
    numberOfPoints
);