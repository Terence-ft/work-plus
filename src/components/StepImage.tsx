import { stepImagePair } from "../data/stepImages";

type StepImageProps = {
  exerciseId: string;
  title: string;
  stepTitle: string;
  stepIndex: number;
};

export default function StepImage({ exerciseId, title, stepTitle, stepIndex }: StepImageProps) {
  const { from, to, idle } = stepImagePair(exerciseId, stepIndex);
  const label = `${title}: ${stepTitle}`;

  return (
    <div className={idle ? "step-anim is-idle" : "step-anim"} role="img" aria-label={label}>
      <img className="step-anim-from" src={from} width={1024} height={768} alt="" />
      {idle ? null : <img className="step-anim-to" src={to} width={1024} height={768} alt="" />}
    </div>
  );
}
