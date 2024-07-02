import { useCallback, useEffect, useState } from "react";
import { api } from "./clients";
import { useLoadingScreen } from "./hooks";
import { p } from "./lib";
import {
  NearlyDoneStage,
  SelectSkillsStage,
  WelcomeStage,
  WhatAssessmentStage,
  WhenAssessmentStage,
  WhoAreYouStage,
  WhoAssessesStage,
} from "./stages";
import { Assessment, Assessor, PilotType, SkillCategory, Stage } from "./types";

const STAGES: Stage[] = [
  "welcome",
  "who-are-you",
  "who-assesses",
  "what-assessment",
  "when-assessment",
  "nearly-done",
  "select-skills",
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const [userHasStrategy, setUserHasStrategy] = useState(false);
  const [availableSkillCategories, setAvailableSkillCategories] = useState<
    SkillCategory[]
  >([]);
  const [availableAssessments, setAvailableAssessments] = useState<
    Assessment[]
  >([]);
  const [availableAssessors, setAvailableAssessors] = useState<Assessor[]>([]);

  const [pilotType, setPilotType] = useState<PilotType | undefined>(undefined);
  const [assessmentId, setAssessmentId] = useState<string | undefined>(
    undefined
  );
  const [assessorId, setAssessorId] = useState<string | undefined>(undefined);
  const [assessmentDate, setAssessmentDate] = useState<string>("");
  const [selectedSkillCategoriesIds, setSelectedSkillCategoriesIds] = useState<
    string[]
  >([]);

  const currentStage = STAGES[currentStageIndex];

  const prevStage = useCallback(() => {
    setCurrentStageIndex((index) => index - 1);
  }, []);

  const nextStage = useCallback((by?: number) => {
    setCurrentStageIndex((index) => index + (by ? by : 1));
  }, []);

  const currentStageElement = (() => {
    switch (currentStage) {
      case "welcome":
        return (
          <WelcomeStage
            prevStage={prevStage}
            nextStage={nextStage}
            userHasStrategy={userHasStrategy}
          />
        );
      case "who-are-you":
        return (
          <WhoAreYouStage
            prevStage={prevStage}
            nextStage={nextStage}
            pilotType={pilotType}
            setPilotType={setPilotType}
          />
        );
      case "who-assesses":
        return (
          <WhoAssessesStage
            prevStage={prevStage}
            nextStage={nextStage}
            assessors={availableAssessors}
            selectedAssessorId={assessorId}
            setSelectedAssessorId={setAssessorId}
          />
        );
      case "what-assessment":
        return (
          <WhatAssessmentStage
            prevStage={prevStage}
            nextStage={nextStage}
            assessments={availableAssessments}
            selectedAssessmentId={assessmentId}
            setSelectedAssessmentId={setAssessmentId}
          />
        );
      case "when-assessment":
        return (
          <WhenAssessmentStage
            prevStage={prevStage}
            nextStage={nextStage}
            assessmentDate={assessmentDate}
            setAssessmentDate={setAssessmentDate}
          />
        );
      case "nearly-done":
        return <NearlyDoneStage prevStage={prevStage} nextStage={nextStage} />;
      case "select-skills":
        return (
          <SelectSkillsStage
            prevStage={prevStage}
            nextStage={createStrategy}
            availableSkillCategories={availableSkillCategories}
            selectedSkillCategoriesIds={selectedSkillCategoriesIds}
            setSelectedSkillCategoriesIds={setSelectedSkillCategoriesIds}
          />
        );
    }
  })();

  useEffect(() => {
    setLoading(true);
    fetchData()
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useLoadingScreen(loading, error);

  return (
    <div
      className="flex h-full min-h-full w-full flex-col overflow-hidden bg-white text-theme-dark-gray md:rounded-[4px] md:border md:border-theme-border"
      style={{
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
      }}
    >
      <div
        className="border-b flex items-center justify-between border-theme-border bg-white px-4 py-2 text-[15px] font-semibold tracking-[0.5px] text-[#646464]"
        style={{
          boxShadow: "0px 0px 6px 1px rgb(50 50 50 / 10%)",
          fontFamily: "system-ui",
        }}
      >
        <div className="flex gap-2 items-center">
          <img alt="logo" className="h-9" src={p("icons/logo_roundel.svg")} />
          <p>CoPilot Wizard</p>
        </div>
        <button
          className="hover:brightness-90"
          onClick={() => window.history.back()}
        >
          <img alt="exit" className="h-6" src={p("icons/icon_exit.svg")} />
        </button>
      </div>
      <div className="relative flex flex-1 flex-col items-center gap-16 px-4 py-8 md:justify-between md:gap-0 md:px-8">
        {currentStageElement}
      </div>
    </div>
  );

  async function createStrategy() {
    const finalData = {
      pilot_type: pilotType,
      assessment_id: assessmentId,
      assessor_id: assessorId,
      assessment_date: new Date(assessmentDate).getTime(),
      skill_categories_ids: selectedSkillCategoriesIds,
    };

    console.log(finalData);

    setLoading(true);

    try {
      await api.post(`/create-strategy.php`, finalData);

      window.location.replace(import.meta.env.VITE_PREPARATION_STRATEGY_URL);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  async function fetchData() {
    const { data: userStrategy } = await api.get<Object | undefined>(
      "/get-user-strategy.php"
    );

    const { data: skillCategories } = await api.get<SkillCategory[]>(
      "/get-all-skill-categories.php"
    );

    const { data: assessments } = await api.get<Assessment[]>(
      "/get-all-assessments.php"
    );

    const { data: assessors } = await api.get<Assessor[]>(
      "/get-all-assessors.php"
    );

    setUserHasStrategy(userStrategy != null);
    setAvailableSkillCategories(skillCategories);
    setAvailableAssessments(assessments);
    setAvailableAssessors(assessors);
  }
};

export default App;
