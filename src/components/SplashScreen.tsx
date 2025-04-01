import imgUrl from "../Public/images/Space Intruder Alien.png";

export const SplashScreen = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="flex items-center justify-start h-screen pl-16">
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative z-10 flex items-start max-w-4xl p-8 pl-0">
                <img
                    src={imgUrl}
                    alt="Space Intruder"
                    className="w-[32rem] mr-8 transform -translate-y-8"
                />
                <div className="flex-1">
                    <h1 className="text-6xl font-press-start mb-8 text-yellow-400">
                        Avi's Space Intruders
                    </h1>
                    <div className="mb-8 space-y-4 font-alien text-green-400 text-lg [text-shadow:_0_0_5px_#00ff00]">
                        <p>Defend Earth from alien invaders!</p>
                        <p>
                            Use <span className="font-bold">← →</span> arrows to
                            move
                        </p>
                        <p>
                            Press <span className="font-bold">SPACE</span> to
                            shoot
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
        </div>
    );
};
