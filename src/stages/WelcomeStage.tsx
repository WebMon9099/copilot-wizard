import { useEffect, useState } from "react";
import { Button } from "../components";
import { p } from "../lib";
import { StageProps } from "./types";

interface WelcomeStageProps extends StageProps {
  userHasStrategy: boolean;
}

const WelcomeStage: React.FC<WelcomeStageProps> = ({
  userHasStrategy,
  nextStage,
}) => {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight);

    window.addEventListener("resize", () =>
      setScreenHeight(window.innerHeight)
    );
  }, []);

  return (
    <>
      <div className="mx-4 mt-8 flex flex-col items-start gap-6 self-start md:mx-0 md:items-center md:self-auto">
        <img
          alt="wizard icon"
          src={p("icons/copilot_wizard_icon.svg")}
          className="h-28"
          style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.05) 5px 5px 5px)" }}
        />
        <h1 className="text-3xl text-[#9e9e9e] md:text-center">
          Welcome to the
        </h1>
        <h1 className="text-5xl font-bold text-[#34424c] md:text-center">
          CoPilot Wizard
        </h1>
      </div>
      <div className="mx-4 flex flex-col items-start gap-8 self-start md:mx-0 md:items-center md:self-auto">
        {/* <p className="text-sm font-light text-theme-medium-gray md:text-base">
          Click the button to get started:
        </p> */}
        <Button
          className="text-sm md:text-base"
          color="green"
          onClick={() => nextStage()}
        >
          Start Wizard
        </Button>
        {userHasStrategy && (
          <a href={import.meta.env.VITE_PREPARATION_STRATEGY_URL}>
            <Button
              color="gray"
              className="pl-0 text-left md:pl-6 md:text-center"
            >
              or{" "}
              <span className="border-b border-dashed pb-1">
                go to existing Preparation Strategy
              </span>
            </Button>
          </a>
        )}
      </div>
      {(screenHeight >= 750 || window.innerWidth > 768) && (
        <img
          alt="copilot wizard"
          className="absolute right-0 bottom-0"
          style={{
            width:
              screenHeight <= 800 && window.innerWidth <= 768
                ? "12rem"
                : "16rem",
          }}
          src={p("icons/copilot_bg_img.svg")}
        />
      )}
    </>
  );
};

export default WelcomeStage;
