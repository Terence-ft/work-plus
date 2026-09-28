export type JointId =
  | "head"
  | "neck"
  | "sternum"
  | "pelvis"
  | "lShoulder"
  | "rShoulder"
  | "lElbow"
  | "rElbow"
  | "lWrist"
  | "rWrist"
  | "lHip"
  | "rHip"
  | "lKnee"
  | "rKnee"
  | "lAnkle"
  | "rAnkle";

export const JOINTS: JointId[] = [
  "head",
  "neck",
  "sternum",
  "pelvis",
  "lShoulder",
  "rShoulder",
  "lElbow",
  "rElbow",
  "lWrist",
  "rWrist",
  "lHip",
  "rHip",
  "lKnee",
  "rKnee",
  "lAnkle",
  "rAnkle",
];

export type MuscleId =
  | "chest"
  | "shoulders"
  | "arms"
  | "back"
  | "core"
  | "glutes"
  | "quads"
  | "hamstrings"
  | "hips"
  | "calves";

export const MUSCLE_LABEL: Record<MuscleId, string> = {
  chest: "Chest",
  shoulders: "Shoulders",
  arms: "Arms",
  back: "Back",
  core: "Core",
  glutes: "Glutes",
  quads: "Quads",
  hamstrings: "Hamstrings",
  hips: "Hips",
  calves: "Calves",
};

export type Skeleton = Record<JointId, { x: number; y: number }>;

export type Frame = {
  t: number;
  label: string;
  pose: Skeleton;
};

export type Clip = {
  duration: number;
  muscles: MuscleId[];
  frames: Frame[];
};

const W = 720;
const H = 460;

function pt(x: number, y: number) {
  return { x, y };
}

function stand(): Skeleton {
  return {
    head: pt(360, 92),
    neck: pt(360, 122),
    sternum: pt(360, 168),
    pelvis: pt(360, 242),
    lShoulder: pt(318, 142),
    rShoulder: pt(402, 142),
    lElbow: pt(302, 208),
    rElbow: pt(418, 208),
    lWrist: pt(294, 268),
    rWrist: pt(426, 268),
    lHip: pt(334, 250),
    rHip: pt(386, 250),
    lKnee: pt(328, 328),
    rKnee: pt(392, 328),
    lAnkle: pt(322, 400),
    rAnkle: pt(398, 400),
  };
}

function clone(pose: Skeleton): Skeleton {
  const next = {} as Skeleton;
  for (const id of JOINTS) next[id] = { ...pose[id] };
  return next;
}

function mix(a: Skeleton, b: Skeleton, t: number): Skeleton {
  const eased = t * t * (3 - 2 * t);
  const next = {} as Skeleton;
  for (const id of JOINTS) {
    next[id] = {
      x: a[id].x + (b[id].x - a[id].x) * eased,
      y: a[id].y + (b[id].y - a[id].y) * eased,
    };
  }
  return next;
}

function patch(base: Skeleton, edits: Partial<Record<JointId, [number, number]>>): Skeleton {
  const next = clone(base);
  for (const id of Object.keys(edits) as JointId[]) {
    const pair = edits[id];
    if (pair) next[id] = pt(pair[0], pair[1]);
  }
  return next;
}

function clip(duration: number, muscles: MuscleId[], steps: { t: number; label: string; pose: Skeleton }[]): Clip {
  return { duration, muscles, frames: steps };
}

const STAND = stand();

const SQUAT = patch(STAND, {
  head: [372, 138],
  neck: [368, 168],
  sternum: [364, 208],
  pelvis: [358, 286],
  lShoulder: [328, 188],
  rShoulder: [412, 186],
  lElbow: [278, 168],
  rElbow: [452, 166],
  lWrist: [248, 148],
  rWrist: [478, 146],
  lHip: [332, 292],
  rHip: [384, 292],
  lKnee: [300, 348],
  rKnee: [416, 348],
  lAnkle: [318, 400],
  rAnkle: [402, 400],
});

const PLANK = patch(STAND, {
  head: [168, 168],
  neck: [210, 172],
  sternum: [268, 176],
  pelvis: [400, 178],
  lShoulder: [236, 188],
  rShoulder: [248, 162],
  lElbow: [186, 232],
  rElbow: [198, 214],
  lWrist: [148, 268],
  rWrist: [162, 252],
  lHip: [392, 192],
  rHip: [412, 170],
  lKnee: [508, 196],
  rKnee: [524, 176],
  lAnkle: [612, 200],
  rAnkle: [628, 182],
});

const PUSH_DOWN = patch(PLANK, {
  head: [176, 214],
  neck: [216, 218],
  sternum: [270, 228],
  pelvis: [398, 226],
  lShoulder: [236, 236],
  rShoulder: [250, 214],
  lElbow: [214, 278],
  rElbow: [228, 262],
  lHip: [390, 240],
  rHip: [410, 218],
});

const LUNGE = patch(STAND, {
  head: [348, 102],
  neck: [350, 132],
  sternum: [352, 176],
  pelvis: [348, 248],
  lHip: [300, 256],
  rHip: [390, 252],
  lKnee: [268, 332],
  rKnee: [430, 318],
  lAnkle: [252, 400],
  rAnkle: [478, 400],
  lShoulder: [312, 150],
  rShoulder: [396, 148],
});

const BRIDGE_DOWN = patch(STAND, {
  head: [168, 268],
  neck: [210, 262],
  sternum: [272, 272],
  pelvis: [400, 318],
  lShoulder: [236, 292],
  rShoulder: [248, 270],
  lElbow: [210, 336],
  rElbow: [222, 318],
  lWrist: [188, 372],
  rWrist: [200, 356],
  lHip: [392, 328],
  rHip: [412, 312],
  lKnee: [318, 328],
  rKnee: [338, 312],
  lAnkle: [248, 400],
  rAnkle: [268, 392],
});

const BRIDGE_UP = patch(BRIDGE_DOWN, {
  pelvis: [400, 248],
  lHip: [392, 258],
  rHip: [412, 244],
  sternum: [276, 248],
});

const DOG = patch(STAND, {
  head: [198, 248],
  neck: [236, 228],
  sternum: [292, 198],
  pelvis: [430, 142],
  lShoulder: [258, 228],
  rShoulder: [274, 206],
  lElbow: [214, 268],
  rElbow: [230, 250],
  lWrist: [176, 312],
  rWrist: [192, 296],
  lHip: [418, 156],
  rHip: [444, 140],
  lKnee: [478, 248],
  rKnee: [498, 232],
  lAnkle: [528, 348],
  rAnkle: [548, 334],
});

const CHILD = patch(STAND, {
  head: [214, 312],
  neck: [250, 292],
  sternum: [310, 278],
  pelvis: [430, 268],
  lShoulder: [278, 288],
  rShoulder: [292, 268],
  lElbow: [232, 312],
  rElbow: [246, 296],
  lWrist: [188, 332],
  rWrist: [202, 318],
  lHip: [418, 278],
  rHip: [442, 262],
  lKnee: [468, 318],
  rKnee: [488, 304],
  lAnkle: [508, 372],
  rAnkle: [528, 360],
});

const COBRA = patch(STAND, {
  head: [248, 168],
  neck: [278, 188],
  sternum: [330, 228],
  pelvis: [430, 318],
  lShoulder: [300, 228],
  rShoulder: [318, 212],
  lElbow: [268, 278],
  rElbow: [284, 262],
  lWrist: [248, 328],
  rWrist: [264, 314],
  lHip: [418, 328],
  rHip: [444, 314],
  lKnee: [488, 348],
  rKnee: [508, 336],
  lAnkle: [548, 392],
  rAnkle: [568, 380],
});

const FOLD = patch(STAND, {
  head: [360, 268],
  neck: [360, 238],
  sternum: [360, 228],
  pelvis: [360, 268],
  lShoulder: [328, 228],
  rShoulder: [392, 228],
  lElbow: [318, 278],
  rElbow: [402, 278],
  lWrist: [314, 328],
  rWrist: [406, 328],
  lHip: [336, 278],
  rHip: [384, 278],
  lKnee: [332, 338],
  rKnee: [388, 338],
  lAnkle: [328, 400],
  rAnkle: [392, 400],
});

const WARRIOR = patch(STAND, {
  lShoulder: [228, 148],
  rShoulder: [492, 148],
  lElbow: [168, 150],
  rElbow: [552, 150],
  lWrist: [112, 150],
  rWrist: [608, 150],
  lHip: [300, 252],
  rHip: [420, 252],
  lKnee: [248, 328],
  rKnee: [468, 318],
  lAnkle: [210, 400],
  rAnkle: [510, 400],
  pelvis: [360, 246],
});

const REACH = patch(STAND, {
  lShoulder: [328, 128],
  rShoulder: [392, 128],
  lElbow: [322, 78],
  rElbow: [398, 78],
  lWrist: [318, 38],
  rWrist: [402, 38],
});

const HINGE = patch(STAND, {
  head: [292, 168],
  neck: [308, 188],
  sternum: [328, 218],
  pelvis: [360, 248],
  lShoulder: [286, 198],
  rShoulder: [348, 178],
  lElbow: [268, 252],
  rElbow: [392, 168],
  lWrist: [256, 302],
  rWrist: [430, 138],
  lHip: [338, 256],
  rHip: [384, 250],
  lKnee: [332, 328],
  rKnee: [390, 326],
});

function walk(phase: number): Skeleton {
  const swing = Math.sin(phase * Math.PI * 2);
  return patch(STAND, {
    lShoulder: [318, 142],
    rShoulder: [402, 142],
    lElbow: [302 + swing * 18, 208],
    rElbow: [418 - swing * 18, 208],
    lWrist: [290 + swing * 28, 262],
    rWrist: [430 - swing * 28, 262],
    lKnee: [328, 328 - swing * 16],
    rKnee: [392, 328 + swing * 16],
    lAnkle: [310 + swing * 22, 396 - Math.max(0, swing) * 18],
    rAnkle: [410 - swing * 22, 396 - Math.max(0, -swing) * 18],
    pelvis: [360, 240 - Math.abs(swing) * 4],
  });
}

export const CLIPS: Record<string, Clip> = {
  "push-up": clip(3400, ["chest", "shoulders", "arms", "core"], [
    { t: 0, label: "High plank", pose: PLANK },
    { t: 0.42, label: "Lower the chest", pose: PUSH_DOWN },
    { t: 0.62, label: "Stay in one piece", pose: PUSH_DOWN },
    { t: 1, label: "Press the floor away", pose: PLANK },
  ]),
  squat: clip(3200, ["quads", "glutes", "core"], [
    { t: 0, label: "Stand tall", pose: STAND },
    { t: 0.42, label: "Sit down", pose: SQUAT },
    { t: 0.62, label: "Heels stay down", pose: SQUAT },
    { t: 1, label: "Drive up", pose: STAND },
  ]),
  "reverse-lunge": clip(3400, ["quads", "glutes", "hips"], [
    { t: 0, label: "Stand tall", pose: STAND },
    { t: 0.4, label: "Step back", pose: LUNGE },
    { t: 0.62, label: "Drop the back knee", pose: LUNGE },
    { t: 1, label: "Drive through the front foot", pose: STAND },
  ]),
  "glute-bridge": clip(3200, ["glutes", "hamstrings", "core"], [
    { t: 0, label: "Ribs down", pose: BRIDGE_DOWN },
    { t: 0.45, label: "Lift the hips", pose: BRIDGE_UP },
    { t: 0.66, label: "Squeeze without arching", pose: BRIDGE_UP },
    { t: 1, label: "Lower with control", pose: BRIDGE_DOWN },
  ]),
  plank: clip(2800, ["core", "shoulders"], [
    { t: 0, label: "Forearms set", pose: PLANK },
    { t: 0.5, label: "Brace the ribs", pose: PLANK },
    { t: 1, label: "Hold the line", pose: PLANK },
  ]),
  "backpack-row": clip(3200, ["back", "shoulders", "arms"], [
    { t: 0, label: "Hinge long", pose: HINGE },
    { t: 0.42, label: "Pull toward the hip", pose: patch(HINGE, { rElbow: [368, 148], rWrist: [352, 118] }) },
    { t: 0.62, label: "Squeeze the shoulder blade", pose: patch(HINGE, { rElbow: [358, 138], rWrist: [340, 108] }) },
    { t: 1, label: "Lower the bag", pose: HINGE },
  ]),
  "jumping-jacks": clip(1600, ["shoulders", "calves", "core"], [
    { t: 0, label: "Feet together", pose: STAND },
    {
      t: 0.45,
      label: "Jump out",
      pose: patch(STAND, {
        lWrist: [248, 48],
        rWrist: [472, 48],
        lElbow: [278, 88],
        rElbow: [442, 88],
        lAnkle: [268, 392],
        rAnkle: [452, 392],
        pelvis: [360, 228],
      }),
    },
    { t: 1, label: "Feet together", pose: STAND },
  ]),
  "mountain-climbers": clip(1400, ["core", "hips", "shoulders"], [
    { t: 0, label: "Knee drives in", pose: patch(PLANK, { lKnee: [318, 188], lAnkle: [348, 228] }) },
    { t: 0.5, label: "Switch legs", pose: patch(PLANK, { rKnee: [328, 170], rAnkle: [358, 210] }) },
    { t: 1, label: "Hips stay level", pose: patch(PLANK, { lKnee: [318, 188], lAnkle: [348, 228] }) },
  ]),
  "jump-rope": clip(1100, ["calves", "shoulders", "arms"], [
    { t: 0, label: "Wrists turn the rope", pose: STAND },
    { t: 0.42, label: "Small hop", pose: patch(STAND, { pelvis: [360, 218], lAnkle: [322, 372], rAnkle: [398, 372] }) },
    { t: 1, label: "Land on the balls of the feet", pose: STAND },
  ]),
  "easy-run": clip(900, ["quads", "calves", "core"], [
    { t: 0, label: "Easy jog", pose: walk(0) },
    { t: 0.5, label: "Short sentences pace", pose: walk(0.5) },
    { t: 1, label: "Easy jog", pose: walk(1) },
  ]),
  "hip-flexor": clip(3600, ["hips", "quads"], [
    { t: 0, label: "Half kneel", pose: LUNGE },
    { t: 0.5, label: "Tuck and shift forward", pose: patch(LUNGE, { pelvis: [368, 244], sternum: [372, 168] }) },
    { t: 1, label: "Ease back", pose: LUNGE },
  ]),
  hamstring: clip(3600, ["hamstrings", "calves"], [
    { t: 0, label: "Lie on your back", pose: BRIDGE_DOWN },
    {
      t: 0.5,
      label: "Lift one leg",
      pose: patch(BRIDGE_DOWN, { rKnee: [430, 188], rAnkle: [448, 118], rHip: [412, 292] }),
    },
    { t: 1, label: "Switch sides next", pose: BRIDGE_DOWN },
  ]),
  "chest-opener": clip(3400, ["chest", "shoulders"], [
    { t: 0, label: "Forearm on the frame", pose: patch(STAND, { rElbow: [488, 148], rWrist: [508, 108] }) },
    { t: 0.5, label: "Turn the chest away", pose: patch(STAND, { rElbow: [508, 138], rWrist: [528, 98], sternum: [348, 168] }) },
    { t: 1, label: "Step back in", pose: STAND },
  ]),
  "cat-cow": clip(3200, ["back", "core"], [
    { t: 0, label: "Hands and knees", pose: patch(PLANK, { pelvis: [400, 210], lKnee: [470, 268], rKnee: [488, 252], lAnkle: [510, 318], rAnkle: [528, 304] }) },
    { t: 0.35, label: "Cow, chest opens", pose: patch(PLANK, { sternum: [270, 198], pelvis: [400, 168], head: [168, 148] }) },
    { t: 0.7, label: "Cat, spine rounds", pose: patch(PLANK, { sternum: [270, 148], pelvis: [400, 198], head: [180, 208] }) },
    { t: 1, label: "Back to neutral", pose: patch(PLANK, { pelvis: [400, 210] }) },
  ]),
  "hiit-starter": clip(9000, ["quads", "chest", "core"], [
    { t: 0, label: "Squat", pose: SQUAT },
    { t: 0.22, label: "Stand to reset", pose: STAND },
    { t: 0.4, label: "Push-up", pose: PLANK },
    { t: 0.55, label: "Chest down", pose: PUSH_DOWN },
    { t: 0.7, label: "Climber", pose: patch(PLANK, { lKnee: [318, 188] }) },
    { t: 1, label: "Squat again", pose: SQUAT },
  ]),
  "step-intervals": clip(2800, ["quads", "calves", "glutes"], [
    { t: 0, label: "March in", pose: walk(0.15) },
    { t: 0.4, label: "Step up", pose: patch(STAND, { lKnee: [348, 278], lAnkle: [360, 332], pelvis: [368, 214] }) },
    { t: 1, label: "Easy march", pose: STAND },
  ]),
  "morning-flow": clip(11000, ["back", "hips", "core"], [
    { t: 0, label: "Cat-cow", pose: patch(PLANK, { pelvis: [400, 210] }) },
    { t: 0.28, label: "Cow", pose: patch(PLANK, { sternum: [270, 198], head: [168, 148] }) },
    { t: 0.5, label: "Hip shift", pose: LUNGE },
    { t: 0.75, label: "Easy squat", pose: SQUAT },
    { t: 1, label: "Stand easy", pose: STAND },
  ]),
  "hip-flow": clip(9000, ["hips", "glutes"], [
    { t: 0, label: "Rock toward the heels", pose: CHILD },
    { t: 0.35, label: "Open the hip", pose: LUNGE },
    { t: 0.65, label: "Figure-four sit", pose: FOLD },
    { t: 1, label: "Hip circles, stand", pose: STAND },
  ]),
  "desk-reset": clip(8000, ["shoulders", "back", "core"], [
    { t: 0, label: "Sit tall", pose: patch(STAND, { pelvis: [360, 278], lKnee: [328, 348], rKnee: [392, 348], lHip: [334, 286], rHip: [386, 286] }) },
    { t: 0.45, label: "Open the chest", pose: REACH },
    { t: 1, label: "Sit tall again", pose: patch(STAND, { pelvis: [360, 278], lKnee: [328, 348], rKnee: [392, 348] }) },
  ]),
  sleep: clip(4200, ["core"], [
    { t: 0, label: "Lights down, lie on your side", pose: patch(BRIDGE_DOWN, { pelvis: [400, 300] }) },
    { t: 1, label: "Same window tomorrow", pose: BRIDGE_DOWN },
  ]),
  "daily-walk": clip(1400, ["calves", "glutes", "core"], [
    { t: 0, label: "Walk where you can talk", pose: walk(0) },
    { t: 0.5, label: "Easy stride", pose: walk(0.5) },
    { t: 1, label: "Keep the loop", pose: walk(1) },
  ]),
  hydration: clip(3000, ["core"], [
    { t: 0, label: "Bottle where you can see it", pose: STAND },
    { t: 0.45, label: "Take a sip", pose: patch(STAND, { rElbow: [400, 118], rWrist: [388, 78], head: [350, 96] }) },
    { t: 1, label: "Set it back down", pose: STAND },
  ]),
  "rest-days": clip(3600, ["core"], [
    { t: 0, label: "Today stays easy", pose: STAND },
    { t: 0.5, label: "A slow march is enough", pose: walk(0.2) },
    { t: 1, label: "Protect the easy day", pose: STAND },
  ]),
  "downward-dog": clip(3600, ["shoulders", "hamstrings", "calves"], [
    { t: 0, label: "Hands and knees", pose: patch(PLANK, { pelvis: [400, 210], lKnee: [470, 268], rKnee: [488, 252] }) },
    { t: 0.45, label: "Hips lift", pose: DOG },
    { t: 1, label: "Press the floor away", pose: DOG },
  ]),
  "childs-pose": clip(3400, ["back", "hips"], [
    { t: 0, label: "Kneel", pose: LUNGE },
    { t: 0.5, label: "Forehead rests", pose: CHILD },
    { t: 1, label: "Breathe into the back", pose: CHILD },
  ]),
  "warrior-ii": clip(3400, ["quads", "hips", "shoulders"], [
    { t: 0, label: "Wide stance", pose: WARRIOR },
    { t: 0.5, label: "Bend the front knee", pose: WARRIOR },
    { t: 1, label: "Gaze over the front hand", pose: WARRIOR },
  ]),
  cobra: clip(3400, ["back", "chest", "shoulders"], [
    { t: 0, label: "Lie on the belly", pose: patch(COBRA, { head: [268, 228], sternum: [340, 268] }) },
    { t: 0.5, label: "Peel the chest up", pose: COBRA },
    { t: 1, label: "Lower with control", pose: patch(COBRA, { head: [268, 228], sternum: [340, 268] }) },
  ]),
  "seated-forward-fold": clip(3600, ["hamstrings", "back"], [
    { t: 0, label: "Sit tall", pose: patch(STAND, { pelvis: [360, 278], lKnee: [332, 338], rKnee: [388, 338] }) },
    { t: 0.5, label: "Hinge from the hips", pose: FOLD },
    { t: 1, label: "Breathe in the stretch", pose: FOLD },
  ]),
  "sun-salutation": clip(10000, ["shoulders", "core", "hamstrings"], [
    { t: 0, label: "Reach up", pose: REACH },
    { t: 0.16, label: "Fold", pose: FOLD },
    { t: 0.32, label: "Plank", pose: PLANK },
    { t: 0.48, label: "Lower", pose: PUSH_DOWN },
    { t: 0.62, label: "Small cobra", pose: COBRA },
    { t: 0.78, label: "Downward dog", pose: DOG },
    { t: 1, label: "Walk up and stand", pose: STAND },
  ]),
};

export function getClip(id: string): Clip {
  return (
    CLIPS[id] ??
    clip(4000, ["core"], [
      { t: 0, label: "Form demo", pose: STAND },
      { t: 1, label: "Form demo", pose: STAND },
    ])
  );
}

export function sampleClip(clipData: Clip, unit: number): { label: string; pose: Skeleton } {
  const frames = clipData.frames;
  let index = 0;
  while (index < frames.length - 1 && frames[index + 1].t <= unit) index += 1;
  const from = frames[index];
  const to = frames[Math.min(index + 1, frames.length - 1)];
  const span = to.t - from.t || 1;
  const raw = Math.min(1, Math.max(0, (unit - from.t) / span));
  const pose = mix(from.pose, to.pose, raw);
  return { label: raw < 0.55 ? from.label : to.label, pose };
}

export const CANVAS_SIZE = { width: W, height: H };
