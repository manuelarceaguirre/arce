/**
 * Circuit Animation JavaScript
 * Creates an animated circuit board background with flowing orange paths
 */
class CircuitAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.paths = [];
        this.gridSize = 40;
        this.updateColors();
        
        this.init();
    }
    
    updateColors() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        this.backgroundColor = isLight ? '#ffffff' : '#000000';
        this.gridColor = isLight ? '#f0f0f0' : '#1a1a1a';
        this.lineColor = '#ff6b00';
        this.glowColor = '#ff6b00';
        this.flowingColor = '#ff6b00';
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createCircuitPath();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.paths.length = 0;
            this.createCircuitPath();
        });
    }
    
    createCircuitPath() {
        const cols = Math.floor(this.canvas.width / this.gridSize);
        const rows = Math.floor(this.canvas.height / this.gridSize);

        // Create a grid of points
        const points = [];
        for (let i = 0; i < rows; i++) {
            points[i] = [];
            for (let j = 0; j < cols; j++) {
                points[i][j] = {
                    x: j * this.gridSize + this.gridSize / 2,
                    y: i * this.gridSize + this.gridSize / 2,
                    connected: false
                };
            }
        }

        // Create multiple paths
        for (let pathCount = 0; pathCount < 5; pathCount++) {
            let currentRow = Math.floor(Math.random() * rows);
            let currentCol = 0;
            let currentPath = [];

            while (currentCol < cols - 1) {
                const current = points[currentRow][currentCol];
                if (!current.connected) {
                    current.connected = true;
                    
                    // Decide direction (straight, up, or down)
                    let nextRow = currentRow;
                    const direction = Math.random();
                    
                    if (direction < 0.3 && currentRow > 0) nextRow--;
                    else if (direction < 0.6 && currentRow < rows - 1) nextRow++;

                    // Create horizontal segment
                    const nextCol = currentCol + 1 + Math.floor(Math.random() * 2);
                    if (nextCol < cols) {
                        currentPath.push(new PathSegment(
                            current.x,
                            current.y,
                            points[currentRow][nextCol].x,
                            current.y
                        ));

                        // If we changed rows, create vertical segment
                        if (nextRow !== currentRow) {
                            currentPath.push(new PathSegment(
                                points[currentRow][nextCol].x,
                                current.y,
                                points[nextRow][nextCol].x,
                                points[nextRow][nextCol].y
                            ));
                        }

                        currentRow = nextRow;
                        currentCol = nextCol;
                    } else {
                        break;
                    }
                } else {
                    currentCol++;
                }
            }
            
            this.paths.push(...currentPath);
        }
    }
    
    drawGrid() {
        this.ctx.strokeStyle = this.gridColor;
        this.ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    animate() {
        // Update colors in case theme changed
        this.updateColors();
        
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();

        // Update flow progress
        this.paths.forEach((segment, index) => {
            if (index === 0) {
                segment.flowProgress = (segment.flowProgress + 0.005) % 1.2;
            } else {
                const prevSegment = this.paths[index - 1];
                if (prevSegment.flowProgress > 0.2) {
                    segment.flowProgress = Math.min(1, (segment.flowProgress + 0.005));
                }
                if (segment.flowProgress >= 1) {
                    segment.illuminated = true;
                }
            }
            segment.draw(this.ctx, this.lineColor, this.flowingColor, this.glowColor);
        });

        // Reset animation when last segment is fully illuminated
        if (this.paths.length && this.paths[this.paths.length - 1].illuminated) {
            this.paths.forEach(segment => {
                segment.flowProgress = 0;
                segment.illuminated = false;
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}

class PathSegment {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        this.illuminated = false;
        this.flowProgress = 0;
    }

    draw(ctx, lineColor, flowingColor, glowColor) {
        ctx.beginPath();
        ctx.strokeStyle = this.illuminated ? lineColor : '#222';
        ctx.lineWidth = 3;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        if (this.flowProgress > 0 && this.flowProgress < 1) {
            ctx.beginPath();
            ctx.strokeStyle = flowingColor;
            ctx.lineWidth = 4;
            
            const flowX1 = this.x1 + (this.x2 - this.x1) * Math.max(0, this.flowProgress - 0.2);
            const flowY1 = this.y1 + (this.y2 - this.y1) * Math.max(0, this.flowProgress - 0.2);
            const flowX2 = this.x1 + (this.x2 - this.x1) * this.flowProgress;
            const flowY2 = this.y1 + (this.y2 - this.y1) * this.flowProgress;
            
            ctx.moveTo(flowX1, flowY1);
            ctx.lineTo(flowX2, flowY2);
            ctx.stroke();

            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = glowColor;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }
}

// Initialize circuit animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('circuitCanvas')) {
        new CircuitAnimation('circuitCanvas');
    }
});