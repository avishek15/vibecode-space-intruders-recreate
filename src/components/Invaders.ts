import imgUrl from "../public/images/intruder.png";

export class Invaders {
    public invaders: { x: number; y: number; width: number; height: number }[];
    private ctx: CanvasRenderingContext2D;
    private direction = 1;
    private baseSpeed = 0.5;
    private speed = 0.2;
    private dropDistance = 20;
    private maxSpeed = 5.5;

    private calculateSpeed() {
        const totalInvaders = 32; // 4 rows * 8 columns
        const remaining = this.invaders.length;
        // More gradual speed increase
        const speedMultiplier =
            1 + (this.maxSpeed * (totalInvaders - remaining)) / totalInvaders;
        return Math.min(this.baseSpeed * speedMultiplier, this.maxSpeed);
    }

    private invaderImage: HTMLImageElement;
    private imageLoaded = false;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.invaders = [];
        this.invaderImage = new Image();
        this.invaderImage.src = imgUrl; //"/images/intruder.png";
        this.invaderImage.onload = () => {
            this.imageLoaded = true;
            console.log("Invader image loaded successfully");
        };
        this.invaderImage.onerror = () => {
            console.error("Failed to load invader image");
        };
        this.createInvaders();
    }

    private createInvaders() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 8; col++) {
                this.invaders.push({
                    x: 200 + col * 120,
                    y: 100 + row * 80,
                    width: 80,
                    height: 40,
                });
            }
        }
    }

    draw() {
        if (!this.imageLoaded) return;
        this.invaders.forEach((invader) => {
            this.ctx.drawImage(
                this.invaderImage,
                invader.x,
                invader.y,
                invader.width,
                invader.height
            );
        });
    }

    update() {
        this.speed = this.calculateSpeed();
        let shouldChangeDirection = false;

        this.invaders.forEach((invader) => {
            invader.x += this.speed * this.direction;

            if (invader.x <= 0 || invader.x + invader.width >= 1280) {
                shouldChangeDirection = true;
            }
        });

        if (shouldChangeDirection) {
            this.direction *= -1;
            this.invaders.forEach((invader) => {
                invader.y += this.dropDistance;
            });
        }
    }

    remove(index: number) {
        this.invaders.splice(index, 1);
    }
}
