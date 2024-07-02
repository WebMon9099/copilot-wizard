import { Button } from "../components";
import { c } from "../lib";
import { Assessment } from "../types";
import { StageProps } from "./types";

interface WhatAssessmentStageProps extends StageProps {
  assessments: Assessment[];
  selectedAssessmentId: string | undefined;
  setSelectedAssessmentId: (id: string | undefined) => void;
}

const WhatAssessmentStage: React.FC<WhatAssessmentStageProps> = ({
  prevStage,
  nextStage,
  assessments,
  selectedAssessmentId,
  setSelectedAssessmentId,
}) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-semibold text-theme-extra-dark-gray md:text-3xl">
          What assessment are you preparing for?
        </h2>
        <p className="text-center text-sm text-[#666] md:text-base">
          Select the assessment that you are preparing for below:
        </p>
      </div>
      <div
        className="my-8 grid w-full flex-1 grid-cols-1 gap-4 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-theme-light-gray md:basis-0 md:grid-cols-3"
        style={{ overflow: "auto" }}
      >
        {assessments.map((assessment) => (
          <AssessmentButton
            selected={assessment.id === selectedAssessmentId}
            onClick={() => setSelectedAssessmentId(assessment.id)}
            key={assessment.id}
          >
            {assessment.name}
          </AssessmentButton>
        ))}
      </div>
      <div className="flex flex-col items-center gap-6">
        {/* <button
          className="border-b border-dashed border-theme-light-gray pb-1 text-[13px] text-theme-green transition duration-75 hover:scale-105 active:scale-95 active:brightness-95 md:text-lg"
          onClick={() => {
            setSelectedAssessmentId(undefined);

            nextStage();
          }}
        >
          I’m not sure which assessment I’ll be undertaking
        </button> */}
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
            disabled={selectedAssessmentId === undefined}
            onClick={() => nextStage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default WhatAssessmentStage;

interface AssessmentButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const AssessmentButton: React.FC<AssessmentButtonProps> = ({
  selected,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={c(
        "w-full rounded-[4px] border py-6 text-sm transition hover:bg-[#f7f7f7] md:text-base",
        selected
          ? "border-2 border-theme-green shadow-md"
          : "border-theme-border",
        rest.className
      )}
    >
      {children}
    </button>
  );
};
