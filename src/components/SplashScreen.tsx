import imgUrl from "../Public/images/Space Intruder Alien.png";

export const SplashScreen = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative z-10 text-center max-w-md p-8 rounded-lg">
                <img
                    src={imgUrl}
                    alt="Space Intruder"
                    className="w-48 mx-auto mb-6"
                />
                <h1 className="text-5xl font-bold mb-6 text-blue-400">
                    Avi's Space Intruders
                </h1>
                <div className="mb-8 space-y-4 text-lg">
                    <p>Defend Earth from alien invaders!</p>
                    <p>
                        Use <span className="font-bold">← →</span> arrows to
                        move
                    </p>
                    <p>
                        Press <span className="font-bold">SPACE</span> to shoot
                    </p>
                    <p>Destroy all aliens to win!</p>
                </div>
                <button
                    onClick={onStart}
                    className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-xl font-bold transition transform hover:scale-105"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};
