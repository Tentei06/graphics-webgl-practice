# Graphics WebGL Practice

A collection of small WebGL exercises created while learning computer graphics concepts, including canvas setup, shaders, GPU buffers, and procedural point rendering.

## Current Projects

### Week 2: Sierpinski Gasket

This project renders a Sierpinski Gasket using WebGL. It generates thousands of points by repeatedly moving halfway toward a randomly selected triangle vertex, then sends those points to the GPU using a Vertex Buffer Object.

## Concepts Practiced

- HTML5 canvas setup
- WebGL rendering context
- Vertex and fragment shaders
- Shader compilation and linking
- Vertex Buffer Objects
- GPU data transfer
- Procedural point generation
- 2D coordinate rendering

## Technologies Used

- HTML
- CSS
- JavaScript
- WebGL

## How to Run

1. Clone the repository.
2. Open the project folder in VS Code.
3. Use the Live Server extension.
4. Open `index.html` or `week2-sierpinski/index.html` in the browser.

## What I Learned

This project helped me understand how WebGL separates CPU-side JavaScript logic from GPU-side rendering. JavaScript generates the point data, while shaders and buffers control how that data is displayed on the screen.

## Future Improvements

- Add more WebGL exercises as the course progresses
- Add screenshots or GIFs of each project
- Organize each weekly exercise into its own folder
- Add comments explaining shader and buffer setup
