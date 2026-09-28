export const FRAME_COUNT = 60;
export const BASE_FPS = 30;
export const CANVAS_SIZE = { width: 720, height: 460 };

/** Joint nodes required for the capsule mesh. Coordinates are [x, y] in canvas space. */
export type JointName =
  | "hipL"
  | "hipR"
  | "kneeL"
  | "kneeR"
  | "ankleL"
  | "ankleR"
  | "shoulderL"
  | "shoulderR"
  | "elbowL"
  | "elbowR"
  | "wristL"
  | "wristR"
  | "head";

export const JOINT_NAMES: JointName[] = [
  "hipL",
  "hipR",
  "kneeL",
  "kneeR",
  "ankleL",
  "ankleR",
  "shoulderL",
  "shoulderR",
  "elbowL",
  "elbowR",
  "wristL",
  "wristR",
  "head",
];

export type Keypoint = [number, number];

export type Keypoints = Record<JointName, Keypoint>;

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

export type PlaybackSpeed = 0.5 | 1 | 1.5;

export type MotionClip = {
  id: string;
  label: string;
  muscles: MuscleId[];
  /** Inclusive peak-contraction window in frame indices (0–59). */
  peak: { start: number; end: number };
  /** Exactly 60 frames of joint [x, y] keypoints. */
  frames: Keypoints[];
  view: "front" | "side";
};
