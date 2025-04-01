export class Bullets {
  public bullets: {x: number, y: number, width: number, height: number, speed: number}[];
  private ctx: CanvasRenderingContext2D;
  private playerBulletActive = false;
  private lastShotTime = 0;
  private shotDelay = 300; // ms between shots

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.bullets = [];
  }

  draw() {
    this.ctx.fillStyle = '#f59e0b'; // Amber-500 from Tailwind
    this.bullets.forEach(bullet => {
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
  }

  update() {
    this.bullets = this.bullets.filter(bullet => bullet.y > 0);
    this.bullets.forEach(bullet => {
      bullet.y -= bullet.speed;
    });
    this.playerBulletActive = this.bullets.length > 0;
  }

  fire(x: number, y: number) {
    const now = Date.now();
    if (now - this.lastShotTime < this.shotDelay) return;
    
    this.bullets.push({
      x: x - 2.5,
      y: y - 15, // Adjusted to start above player
      width: 5,
      height: 15,
      speed: 10 // Faster bullet speed
    });
    this.playerBulletActive = true;
    this.lastShotTime = now;
  }

  remove(index: number) {
    this.bullets.splice(index, 1);
  }

  isPlayerBulletActive() {
    return this.playerBulletActive;
  }
}
