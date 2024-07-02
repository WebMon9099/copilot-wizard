import { Button } from "../components";
import { c } from "../lib";
import { SkillCategory } from "../types";
import { StageProps } from "./types";

interface SelectSkillsStageProps extends StageProps {
  availableSkillCategories: SkillCategory[];
  selectedSkillCategoriesIds: string[];
  setSelectedSkillCategoriesIds: (ids: string[]) => void;
}

const SelectSkillsStage: React.FC<SelectSkillsStageProps> = ({
  prevStage,
  nextStage,
  availableSkillCategories: skillCategories,
  selectedSkillCategoriesIds,
  setSelectedSkillCategoriesIds,
}) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-center text-xl font-semibold text-theme-extra-dark-gray md:text-3xl">
          Select from the skills below:
        </h2>
        <p className="text-center text-sm text-[#666] md:text-base">
          Select between two and five skills that you’d like to improve, in
          addition to preparing for assessment:
        </p>
      </div>
      <div
        className="my-8 grid w-full flex-1 gap-4 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-theme-light-gray md:basis-0 md:grid-cols-3"
        style={{ overflow: "auto" }}
      >
        {skillCategories
          .sort((s1, s2) => s1.name.localeCompare(s2.name))
          .map((skill) => (
            <SkillButton
              skill={skill}
              selected={selectedSkillCategoriesIds.includes(skill.id)}
              onClick={() => {
                const newSelectedSkills = [...selectedSkillCategoriesIds];

                const index = selectedSkillCategoriesIds.findIndex(
                  (skillId) => skillId === skill.id
                );

                if (index !== -1) newSelectedSkills.splice(index, 1);
                else if (newSelectedSkills.length < 5)
                  newSelectedSkills.push(skill.id);

                setSelectedSkillCategoriesIds(newSelectedSkills);
              }}
              key={skill.id}
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
          disabled={selectedSkillCategoriesIds.length < 2}
          onClick={() => nextStage()}
        >
          Finish Wizard
        </Button>
      </div>
    </>
  );
};

export default SelectSkillsStage;

interface SkillButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  skill: {
    name: string;
    icon: string;
  };
  selected: boolean;
}

const SkillButton: React.FC<SkillButtonProps> = ({
  skill,
  selected,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={c(
        "flex items-center gap-4 rounded-[4px] border p-4 font-inter text-sm font-semibold text-theme-extra-dark-gray transition hover:bg-[#f7f7f7] md:text-base",
        selected
          ? "border-2 border-theme-green shadow-md"
          : "border-theme-border",
        rest.className
      )}
    >
      <img
        alt="skill icon"
        className="h-6 w-6 object-contain md:h-10 md:w-10"
        src={`${import.meta.env.VITE_WEBSITE_URL}/${skill.icon}`}
      />
      <span className="flex-1 text-left">{skill.name}</span>
    </button>
  );
};
