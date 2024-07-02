import React from "react";
import { Button } from "../components";
import { c, p } from "../lib";
import { PilotType } from "../types";
import { StageProps } from "./types";

const PILOT_TYPES: PilotType[] = ["aspiring", "new", "experienced"];

interface WhoAreYouStageProps extends StageProps {
  pilotType: PilotType | undefined;
  setPilotType: (type: PilotType) => void;
}

const WhoAreYouStage: React.FC<WhoAreYouStageProps> = ({
  prevStage,
  nextStage,
  pilotType,
  setPilotType,
}) => {
  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-theme-extra-dark-gray md:text-3xl">
          Who are you?
        </h2>
        <p className="text-center text-sm text-[#666] md:text-base">
          Make a selection below that best describes your current situation:
        </p>
      </div>
      <div className="my-8 flex flex-col gap-8 md:flex-row">
        {PILOT_TYPES.map((type) => (
          <PilotTypeButton
            className="flex-1"
            type={type}
            selected={type === pilotType}
            onClick={() => setPilotType(type)}
            key={type}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          className="text-sm md:text-base"
          color="gray"
          onClick={prevStage}
        >
          Back
        </Button>
        <Button
          className="text-sm md:text-base"
          color="green"
          onClick={() => nextStage()}
          disabled={pilotType === undefined}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default WhoAreYouStage;

interface PilotTypeButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: PilotType;
  selected: boolean;
}

const PilotTypeButton: React.FC<PilotTypeButtonProps> = ({
  type,
  selected,
  ...rest
}) => {
  const { label, description, icon } = (() => {
    switch (type) {
      case "aspiring":
        return {
          label: "Aspiring Pilot",
          description: "You do not have a CPL or fATPL.",
          icon: "aspiring",
        };
      case "new":
        return {
          label: "Newly Qualified Pilot",
          description: "You have a CPL or fATPL but do not have a Type Rating.",
          icon: "newly_qualified",
        };
      case "experienced":
        return {
          label: "Experienced Pilot",
          description: "You are a First Officer or Captain.",
          icon: "experienced",
        };
    }
  })();

  return (
    <button
      {...rest}
      className={c(
        "flex flex-col items-center gap-4 rounded-[4px] border bg-white p-4 transition hover:bg-[#f7f7f7] md:p-8",
        selected
          ? "border-2 border-theme-green shadow-md"
          : "border-theme-border",
        rest.className
      )}
    >
      <img
        alt="pilot type icon"
        className="hidden h-12 md:block"
        src={p(`icons/${icon}_${selected ? "active" : "inactive"}.svg`)}
      />
      <p className="text-base font-medium text-theme-extra-dark-gray md:text-lg">
        {label}
      </p>
      <p className="text-sm md:text-base">{description}</p>
    </button>
  );
};
