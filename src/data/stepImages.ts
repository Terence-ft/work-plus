const GUIDES = "/guides";
const VERSION = "cartoon-loop";

const P = {
  stand: "pose-stand.png",
  squatMid: "pose-squat-mid.png",
  squatDeep: "pose-squat-deep.png",
  pushHigh: "pose-push-high.png",
  pushLow: "pose-push-low.png",
  lungeStep: "pose-lunge-step.png",
  lunge: "pose-lunge.png",
  bridgeDown: "pose-bridge-down.png",
  bridgeUp: "pose-bridge-up.png",
  plank: "pose-plank.png",
  rowHinge: "pose-row-hinge.png",
  rowPull: "pose-row-pull.png",
  jackOpen: "pose-jack-open.png",
  jackClosed: "pose-jack-closed.png",
  climber: "pose-climber.png",
  jumpRope: "pose-jump-rope.png",
  walk: "pose-walk.png",
  jog: "pose-jog.png",
  hipFlexor: "pose-hip-flexor.png",
  hamstring: "pose-hamstring.png",
  chest: "pose-chest-opener.png",
  cow: "pose-cow.png",
  cat: "pose-cat.png",
  downDog: "pose-down-dog.png",
  child: "pose-child.png",
  warrior: "pose-warrior.png",
  cobra: "pose-cobra.png",
  seatedFold: "pose-seated-fold.png",
  sitTall: "pose-sit-tall.png",
  standFold: "pose-stand-fold.png",
  prone: "pose-prone.png",
  deskOpen: "pose-desk-open.png",
  reachUp: "pose-reach-up.png",
  chin: "pose-chin.png",
  figureFour: "pose-figure-four.png",
  stepUp: "pose-step-up.png",
  drink: "pose-drink.png",
  sleep: "pose-sleep.png",
} as const;

type Pose = (typeof P)[keyof typeof P];
type Pair = [Pose, Pose];

/** Two nearby poses per instruction so the loop is a small movement, not a full morph. */
const STEPS: Record<string, Pair[]> = {
  "push-up": [
    [P.pushHigh, P.pushHigh],
    [P.pushHigh, P.pushHigh],
    [P.pushHigh, P.pushLow],
    [P.pushLow, P.pushHigh],
  ],
  squat: [
    [P.stand, P.squatMid],
    [P.squatMid, P.squatDeep],
    [P.squatDeep, P.squatMid],
    [P.squatMid, P.stand],
  ],
  "reverse-lunge": [
    [P.stand, P.lungeStep],
    [P.lungeStep, P.lunge],
    [P.lunge, P.lunge],
    [P.lunge, P.stand],
  ],
  "glute-bridge": [
    [P.bridgeDown, P.bridgeDown],
    [P.bridgeDown, P.bridgeUp],
    [P.bridgeUp, P.bridgeUp],
    [P.bridgeUp, P.bridgeDown],
  ],
  plank: [
    [P.plank, P.plank],
    [P.plank, P.plank],
    [P.plank, P.plank],
    [P.plank, P.plank],
  ],
  "backpack-row": [
    [P.rowHinge, P.rowHinge],
    [P.rowHinge, P.rowPull],
    [P.rowPull, P.rowPull],
    [P.rowPull, P.rowHinge],
  ],
  "jumping-jacks": [
    [P.jackClosed, P.jackOpen],
    [P.jackOpen, P.jackClosed],
    [P.jackOpen, P.jackClosed],
    [P.jackClosed, P.jackOpen],
  ],
  "mountain-climbers": [
    [P.pushHigh, P.pushHigh],
    [P.pushHigh, P.climber],
    [P.climber, P.pushHigh],
    [P.pushHigh, P.pushHigh],
  ],
  "jump-rope": [
    [P.stand, P.jumpRope],
    [P.jumpRope, P.stand],
    [P.jumpRope, P.stand],
    [P.stand, P.stand],
  ],
  "easy-run": [
    [P.walk, P.walk],
    [P.walk, P.jog],
    [P.jog, P.walk],
    [P.walk, P.walk],
  ],
  "hip-flexor": [
    [P.hipFlexor, P.hipFlexor],
    [P.hipFlexor, P.hipFlexor],
    [P.hipFlexor, P.hipFlexor],
    [P.hipFlexor, P.hipFlexor],
  ],
  hamstring: [
    [P.hamstring, P.hamstring],
    [P.hamstring, P.hamstring],
    [P.hamstring, P.hamstring],
    [P.hamstring, P.hamstring],
  ],
  "chest-opener": [
    [P.chest, P.chest],
    [P.chest, P.deskOpen],
    [P.chest, P.chest],
    [P.chest, P.chest],
  ],
  "cat-cow": [
    [P.cow, P.cat],
    [P.cat, P.cow],
    [P.cow, P.cat],
    [P.cow, P.cat],
  ],
  "downward-dog": [
    [P.cow, P.downDog],
    [P.downDog, P.downDog],
    [P.downDog, P.downDog],
    [P.downDog, P.child],
  ],
  "childs-pose": [
    [P.cow, P.child],
    [P.child, P.child],
    [P.child, P.child],
    [P.child, P.child],
  ],
  "warrior-ii": [
    [P.lunge, P.warrior],
    [P.warrior, P.warrior],
    [P.warrior, P.warrior],
    [P.warrior, P.stand],
  ],
  cobra: [
    [P.prone, P.prone],
    [P.prone, P.cobra],
    [P.cobra, P.cobra],
    [P.cobra, P.prone],
  ],
  "seated-forward-fold": [
    [P.sitTall, P.sitTall],
    [P.sitTall, P.seatedFold],
    [P.seatedFold, P.seatedFold],
    [P.seatedFold, P.sitTall],
  ],
  "sun-salutation": [
    [P.stand, P.standFold],
    [P.standFold, P.pushHigh],
    [P.prone, P.cobra],
    [P.downDog, P.stand],
  ],
  "hiit-starter": [
    [P.squatMid, P.squatDeep],
    [P.pushHigh, P.pushLow],
    [P.pushHigh, P.climber],
    [P.stand, P.stand],
  ],
  "step-intervals": [
    [P.walk, P.walk],
    [P.walk, P.stepUp],
    [P.stepUp, P.walk],
    [P.stepUp, P.walk],
  ],
  "morning-flow": [
    [P.cow, P.cat],
    [P.hipFlexor, P.reachUp],
    [P.hipFlexor, P.hipFlexor],
    [P.squatMid, P.squatDeep],
  ],
  "hip-flow": [
    [P.child, P.cow],
    [P.hipFlexor, P.hipFlexor],
    [P.figureFour, P.figureFour],
    [P.stand, P.stand],
  ],
  "desk-reset": [
    [P.deskOpen, P.deskOpen],
    [P.deskOpen, P.chest],
    [P.chin, P.chin],
    [P.reachUp, P.deskOpen],
  ],
  sleep: [
    [P.sleep, P.sleep],
    [P.sleep, P.sleep],
    [P.sleep, P.sleep],
    [P.sleep, P.sleep],
  ],
  "daily-walk": [
    [P.walk, P.jog],
    [P.walk, P.jog],
    [P.walk, P.walk],
    [P.walk, P.walk],
  ],
  hydration: [
    [P.stand, P.drink],
    [P.drink, P.drink],
    [P.drink, P.stand],
    [P.stand, P.stand],
  ],
  "rest-days": [
    [P.sitTall, P.sitTall],
    [P.walk, P.walk],
    [P.sleep, P.sleep],
    [P.walk, P.walk],
  ],
};

function src(file: string) {
  return `${GUIDES}/${file}?v=${VERSION}`;
}

export function stepImagePair(exerciseId: string, stepIndex: number): { from: string; to: string; idle: boolean } {
  const list = STEPS[exerciseId] ?? STEPS.squat;
  const pair = list[stepIndex] ?? list[0];
  return {
    from: src(pair[0]),
    to: src(pair[1]),
    idle: pair[0] === pair[1],
  };
}
