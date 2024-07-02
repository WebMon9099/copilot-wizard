import { Button, DateInput } from "../components";
import { prefix } from "../lib";
import { StageProps } from "./types";

interface WhenAssessmentStageProps extends StageProps {
  assessmentDate: string;
  setAssessmentDate: (date: string) => void;
}

const WhenAssessmentStage: React.FC<WhenAssessmentStageProps> = ({
  prevStage,
  nextStage,
  assessmentDate,
  setAssessmentDate,
}) => {
  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-theme-extra-dark-gray md:text-3xl">
            When is your assessment?
          </h2>
          <p className="text-sm text-[#666] md:text-base">
            Choose a date below:
          </p>
        </div>
      </div>
      <div className="my-8 flex flex-col items-center gap-8 md:w-[65%]">
        <DateInput
          className="w-full text-sm md:w-[65%] md:text-base"
          min={(() => {
            const dtToday = new Date();
            const month = dtToday.getMonth() + 1; // getMonth() is zero-based
            const day = dtToday.getDate();
            const year = dtToday.getFullYear();

            const maxDate = `${year}-${prefix(month)}-${prefix(day)}`;

            return maxDate;
          })()}
          value={assessmentDate}
          onChange={(e) => setAssessmentDate(e.target.value)}
        />
        <p className="text-center text-xs font-light text-theme-medium-gray md:text-sm">
          Tip: If you’re not sure exactly when your assessment will be, select a
          date in the future prior to the anticipated assessment date. The
          CoPilot Wizard will use this information to create appropriate targets
          for you to achieve.
        </p>
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
          disabled={!assessmentDate}
          onClick={() => nextStage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default WhenAssessmentStage;
