import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";

function App() {
  const [isAppStarted, setIsAppStarted] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const TIMEOUT_BETWEEN_SETS = 4000;

  const handleChangeAppStatus = () => {
    setIsAppStarted((prev) => !prev);

    if (!isAppStarted) {
      setTimeout(() => {
        makeRandomNumber();
      }, 2000);
    }
  };

  const makeRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 9 + 1));
  };

  useEffect(() => {
    if (randomNumber === 0) return;

    const timeoutTime = randomNumber * 1000 + TIMEOUT_BETWEEN_SETS;

    const timer = setTimeout(() => {
      makeRandomNumber();
    }, timeoutTime);

    const audioPath = `${import.meta.env.BASE_URL}audio/${randomNumber}.mp3`;
    new Audio(audioPath).play();

    return () => clearTimeout(timer);
  }, [randomNumber]);

  useEffect(() => {
    if (!isAppStarted) {
      setRandomNumber(0);
    }
  }, [isAppStarted]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="fixed left-0 right-0  top-3 flex flex-row gap-2 items-center justify-center">
        <h2 className="sm:text-lg lg:text-2xl">
          شمارش تصادفی برای ورزش های رزمی
        </h2>
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-center items-center h-full gap-2">
        <div className=" text-6xl text-red-500 m-5">{randomNumber}</div>
        <Button onClick={handleChangeAppStatus} variant="outline">
          {isAppStarted ? "توقف" : "شروع"}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
