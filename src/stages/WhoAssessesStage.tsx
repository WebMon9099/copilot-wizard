import { useState } from "react";
import { AutoCompleteInput, Button } from "../components";
import { Assessor } from "../types";
import { StageProps } from "./types";

interface WhoAssessesStageProps extends StageProps {
  // selectedAssessment: boolean;
  assessors: Assessor[];
  selectedAssessorId: string | undefined;
  setSelectedAssessorId: (assessor: string | undefined) => void;
}

const WhoAssessesStage: React.FC<WhoAssessesStageProps> = ({
  prevStage,
  nextStage,
  // selectedAssessment,
  assessors,
  selectedAssessorId,
  setSelectedAssessorId,
}) => {
  const [inputValue, setInputValue] = useState(
    assessors.find((assessor) => assessor.id === selectedAssessorId)?.name || ""
  );

  assessors.sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
});

  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-xl font-semibold text-theme-extra-dark-gray md:text-3xl">
            Who are you being assessed by?
          </h2>
          <p className="text-center text-sm text-[#666] md:text-base">
            Type the name of the organisation that you are undertaking an
            assessment for:
          </p>
        </div>
      </div>
      <AutoCompleteInput
        className="mb-12 mt-8 w-full text-sm md:mt-0 md:w-1/2 md:text-base"
        options={assessors.map((assessor) => ({
          id: assessor.id,
          label: assessor.name,
          tag: assessor.type === "airline" ? "Airline" : (assessor.type === "school"?"School":assessor.type),
        }))}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setSelectedAssessorId(undefined);
        }}
        onOptionSelect={(assessor) => {
          setInputValue(assessor.label);
          setSelectedAssessorId(assessor.id);
        }}
        placeholder="Name of Flying School or Airline"
      />
      <div className="flex flex-col items-center gap-6">
        <button
          className="border-b border-dashed border-theme-light-gray pb-1 text-[13px] text-theme-green transition duration-75 hover:scale-105 active:scale-95 active:brightness-95 md:text-lg"
          onClick={() => {
            setSelectedAssessorId(undefined);

            nextStage();
          }}
        >
          I’m not preparing for a specific organisation
        </button>
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
            disabled={selectedAssessorId === undefined}
            onClick={() => nextStage(2)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default WhoAssessesStage;
