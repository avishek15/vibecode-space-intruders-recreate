import imgUrl from "../public/images/player.png";

export class Player {
    public x: number;
    public y: number;
    public width = 100;
    public height = 40;
    private speed = 12; // Slightly reduced speed for better control
    private tiltAngle = 0;
    private maxTilt = 0.2; // Maximum tilt angle in radians (~11.5 degrees)
    private tiltSpeed = 0.05;
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private playerImage: HTMLImageElement;
    private imageLoaded = false;

    constructor(ctx: CanvasRenderingContext2D, canvasWidth: number) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.x = canvasWidth / 2 - this.width / 2;
        this.y = 550;
        this.playerImage = new Image();
        this.playerImage.src = imgUrl; //"/images/player.png";
        this.playerImage.onload = () => {
            this.imageLoaded = true;
            console.log("Player image loaded successfully");
        };
        this.playerImage.onerror = () => {
            console.error("Failed to load player image");
        };
    }

    draw() {
        if (!this.imageLoaded) return;

        // Save current canvas state
        this.ctx.save();

        // Move to player's center point
        this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Apply rotation
        this.ctx.rotate(this.tiltAngle);

        // Draw image centered
        this.ctx.drawImage(
            this.playerImage,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        // Restore canvas state
        this.ctx.restore();
    }

    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
        this.tiltAngle = Math.max(
            -this.maxTilt,
            this.tiltAngle - this.tiltSpeed
        );
    }

    moveRight() {
        this.x = Math.min(this.canvasWidth - this.width, this.x + this.speed);
        this.tiltAngle = Math.min(
            this.maxTilt,
            this.tiltAngle + this.tiltSpeed
        );
    }

    resetTilt() {
        this.tiltAngle = 0;
    }
}
