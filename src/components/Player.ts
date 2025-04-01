import imgUrl from "../public/images/player.png";

export class Player {
    public x: number;
    public y: number;
    public width = 100;
    public height = 40;
    private speed = 16; // Increased speed for better responsiveness
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
        this.ctx.drawImage(
            this.playerImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    moveLeft() {
        this.x = Math.max(0, this.x - this.speed);
    }

    moveRight() {
        this.x = Math.min(this.canvasWidth - this.width, this.x + this.speed);
    }
}
