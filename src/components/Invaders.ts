import imgUrl from "../public/images/intruder2.png";

export class Invaders {
    public invaders: {
        x: number;
        y: number;
        width: number;
        height: number;
        flip: boolean;
        jiggleX: number;
        jiggleY: number;
        animationTimer: number;
        hue: number;
        saturation: number;
    }[];
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
                    flip: Math.random() > 0.5,
                    jiggleX: 0,
                    jiggleY: 0,
                    animationTimer: Math.random() * 100,
                    hue: Math.random() * 360,
                    saturation: 0.5 + Math.random() * 0.5,
                });
            }
        }
    }

    draw() {
        if (!this.imageLoaded) return;
        this.invaders.forEach((invader) => {
            this.ctx.save();

            // Move to invader's position
            this.ctx.translate(invader.x, invader.y);

            // Apply jiggle offset
            this.ctx.translate(invader.jiggleX, invader.jiggleY);

            // Apply flip transformation
            if (invader.flip) {
                this.ctx.translate(invader.width, 0);
                this.ctx.scale(-1, 1);
            }

            // Apply color transformation
            this.ctx.filter = `hue-rotate(${invader.hue}deg) saturate(${invader.saturation})`;

            this.ctx.drawImage(
                this.invaderImage,
                0,
                0,
                invader.width,
                invader.height
            );

            // Reset filter
            this.ctx.filter = "none";

            this.ctx.restore();
        });
    }

    private updateAnimation() {
        this.invaders.forEach((invader) => {
            // Randomly flip direction
            if (Math.random() < 0.01) {
                invader.flip = !invader.flip;
            }

            // Update jiggle animation
            invader.animationTimer += 1;
            invader.jiggleX = Math.sin(invader.animationTimer * 0.1) * 2;
            invader.jiggleY = Math.cos(invader.animationTimer * 0.15) * 2;
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

        this.updateAnimation();
    }

    remove(index: number) {
        this.invaders.splice(index, 1);
    }
}
