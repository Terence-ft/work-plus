import { EXERCISES, framesFor } from "./animate";
import { FRAME_COUNT, type MotionClip } from "./types";

const SEQUENCE_IDS = new Set(["hiit-starter", "morning-flow", "hip-flow", "sun-salutation"]);

/** Still frame that matches a written instruction: start → load → finish. */
export function frameForStep(id: string, index: number, count: number): number {
  if (count <= 1) return 0;
  if (SEQUENCE_IDS.has(id)) {
    return Math.round((index / (count - 1)) * (FRAME_COUNT - 1));
  }
  if (index === count - 1) return FRAME_COUNT - 1;
  return Math.round((index / Math.max(1, count - 2)) * 30);
}

const CACHE = new Map<string, MotionClip>();

export function getMotionClip(id: string, title: string): MotionClip {
  const hit = CACHE.get(id);
  if (hit) {
    return hit.label === title ? hit : { ...hit, label: title };
  }
  const motion = EXERCISES[id] ?? EXERCISES.squat;
  const frames = framesFor(EXERCISES[id] ? id : "squat");
  if (frames.length !== FRAME_COUNT) {
    throw new Error(`Expected ${FRAME_COUNT} frames for ${id}`);
  }
  const clip: MotionClip = {
    id,
    label: title,
    muscles: motion.muscles,
    peak: motion.peak,
    frames,
    view: motion.view,
  };
  CACHE.set(id, clip);
  return clip;
}

/** Prebuilt 60-frame keypoint arrays for every library session. */
export const EXERCISE_FRAME_DATA: Record<string, MotionClip> = Object.fromEntries(
  Object.keys(EXERCISES).map((id) => [id, getMotionClip(id, id)]),
);
