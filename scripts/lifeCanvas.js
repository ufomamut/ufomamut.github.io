'use strict';

/* ==================================================
   LIFE CANVAS RENDERER
   ==================================================
   - Visual output of the Conway simulation
   - Handles background painting and ambient fade
   - Renders the cell grid on the HTML5 canvas
*/


export function createLifeCanvas(ctx, cellSize) {

    // Colors consts

    const BACKGROUND_COLOR = "rgb(10, 10, 14)";
    const FADE_COLOR = "rgba(10, 10, 14, 0.06)";
    const CELL_COLOR = "rgba(220, 220, 255, 0.1)";



    // Get sizes

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;



    // Background Coloring

    function painTheBackground() {
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, width, height);
    }



    // Ambient Motion Recording

    function fadeMotion() {
        ctx.fillStyle = FADE_COLOR;
        ctx.fillRect(0, 0, width, height);
    }


    
    // Grid rendering

    function gridRender(grid) {
        fadeMotion();

        ctx.fillStyle = CELL_COLOR;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x]) {
                    ctx.fillRect(
                        x * cellSize,
                        y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }



    // Start Background Coloring

    painTheBackground();



    // Public API
    
    return {
        gridRender,
        painTheBackground
    };
}
