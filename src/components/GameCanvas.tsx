import { useRef, useEffect, useState, useCallback } from "react";
import { Player } from "./Player";
import { Invaders } from "./Invaders";
import { Bullets } from "./Bullets";

export const GameCanvas = ({ onWin }: { onWin: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const keys = useRef<Record<string, boolean>>({});

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        keys.current[e.key] = true;
    }, []);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        keys.current[e.key] = false;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Could not get 2D context");
            return;
        }

        // Create stars for background
        const stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            opacity: Math.random(),
            speed: Math.random() * 0.5 + 0.1,
            direction: Math.random() > 0.5 ? 1 : -1,
        }));

        // Initialize game state
        const player = new Player(ctx, canvas.width);
        player.y = canvas.height - 100; // Position player near bottom
        const invaders = new Invaders(ctx);
        const bullets = new Bullets(ctx);

        // Add event listeners
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        function drawStars() {
            if (!ctx || !canvas) return;
            stars.forEach((star) => {
                // Update star position
                star.x += star.speed * star.direction;
                if (star.x > canvas.width) star.x = 0;
                if (star.x < 0) star.x = canvas.width;

                // Twinkle effect
                star.opacity += (Math.random() - 0.5) * 0.1;
                star.opacity = Math.max(0.2, Math.min(1, star.opacity));

                // Draw star
                ctx.fillStyle = "white";
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        function handleInput(e?: KeyboardEvent) {
            if (keys.current["ArrowLeft"]) player.moveLeft();
            if (keys.current["ArrowRight"]) player.moveRight();
            if (keys.current[" "]) {
                if (e) e.preventDefault(); // Prevent spacebar from scrolling
                if (!bullets.isPlayerBulletActive()) {
                    bullets.fire(player.x + player.width / 2, player.y);
                }
            }
        }

        function checkCollisions() {
            bullets.bullets.forEach((bullet, bulletIndex) => {
                invaders.invaders.forEach((invader, invaderIndex) => {
                    if (
                        bullet.x < invader.x + invader.width &&
                        bullet.x + bullet.width > invader.x &&
                        bullet.y < invader.y + invader.height &&
                        bullet.y + bullet.height > invader.y
                    ) {
                        bullets.remove(bulletIndex);
                        invaders.remove(invaderIndex);
                        setScore((prev) => prev + 10);
                    }
                });
            });
        }

        function gameLoop() {
            if (gameOver || !ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawStars();

            handleInput();
            player.draw();
            invaders.update();
            invaders.draw();
            bullets.update();
            bullets.draw();
            checkCollisions();

            // Game over conditions
            if (
                invaders.invaders.some((inv) => inv.y + inv.height >= player.y)
            ) {
                setGameOver(true);
            }

            // Win condition
            if (invaders.invaders.length === 0) {
                onWin();
                return;
            }

            requestAnimationFrame(gameLoop);
        }

        const gameLoopId = requestAnimationFrame(gameLoop);
        return () => {
            cancelAnimationFrame(gameLoopId);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameOver, handleKeyDown, handleKeyUp, onWin]);

    return (
        <div
            className="relative"
            style={{ overflow: "hidden", height: "100vh" }}
        >
            <canvas
                ref={canvasRef}
                width="1280"
                height="720"
                className="bg-black mx-auto block"
                style={{ marginTop: "calc(50vh - 360px)" }}
            ></canvas>
            {gameOver && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 p-8 rounded-lg text-center">
                    <h2 className="text-4xl font-bold text-red-500 mb-4">
                        Game Over!
                    </h2>
                    <p className="text-2xl mb-6">Your score: {score}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            )}
            <div className="absolute top-4 left-4 text-white text-xl bg-black bg-opacity-70 px-4 py-2 rounded">
                Score: {score}
            </div>
        </div>
    );
};
