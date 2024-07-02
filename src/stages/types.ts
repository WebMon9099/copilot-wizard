export interface StageProps {
  prevStage: () => void;
  nextStage: (by?: number) => void;
}
