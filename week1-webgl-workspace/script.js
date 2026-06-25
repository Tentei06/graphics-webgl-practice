// Get the canvas from the HTML page
const canvas = document.getElementById("glCanvas");

// Ask the browser for a WebGL drawing context
const gl = canvas.getContext("webgl");

// Check whether WebGL worked
if (!gl) {
  alert("WebGL is not supported by your browser.");
} else {
  // Set the clear color: red, green, blue, alpha
  gl.clearColor(0.1, 0.2, 0.4, 1.0);

  // Clear the screen using that color
  gl.clear(gl.COLOR_BUFFER_BIT);
}
