import { Button } from "../components";
import { StageProps } from "./types";

const NearlyDoneStage: React.FC<StageProps> = ({ prevStage, nextStage }) => {
  return (
    <>
      <div className="my-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-8 md:w-3/4">
          <h2 className="text-center text-xl font-semibold text-theme-extra-dark-gray md:text-3xl">
            Nearly done!
          </h2>
          <p className="text-center text-sm text-[#666] md:text-base">
            Lastly, let the CoPilot Wizard know if there are any skills in
            particular that you would like to focus on. These may be weaknesses
            that you need to improve before an assessment.
          </p>
        </div>
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
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default NearlyDoneStage;
