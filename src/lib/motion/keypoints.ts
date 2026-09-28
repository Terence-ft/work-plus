import { FRAME_COUNT, type Keypoint, type Keypoints } from "./types";
import type { Skeleton } from "../anatomy";

export function skeletonToKeypoints(pose: Skeleton): Keypoints {
  return {
    hipL: [pose.lHip.x, pose.lHip.y],
    hipR: [pose.rHip.x, pose.rHip.y],
    kneeL: [pose.lKnee.x, pose.lKnee.y],
    kneeR: [pose.rKnee.x, pose.rKnee.y],
    ankleL: [pose.lAnkle.x, pose.lAnkle.y],
    ankleR: [pose.rAnkle.x, pose.rAnkle.y],
    shoulderL: [pose.lShoulder.x, pose.lShoulder.y],
    shoulderR: [pose.rShoulder.x, pose.rShoulder.y],
    elbowL: [pose.lElbow.x, pose.lElbow.y],
    elbowR: [pose.rElbow.x, pose.rElbow.y],
    wristL: [pose.lWrist.x, pose.lWrist.y],
    wristR: [pose.rWrist.x, pose.rWrist.y],
    head: [pose.head.x, pose.head.y],
  };
}

/** Build a closed 60-frame loop from a unit sampler (0–1). */
export function expandToSixtyFrames(sampleAt: (unit: number) => Skeleton): Keypoints[] {
  const frames: Keypoints[] = [];
  for (let i = 0; i < FRAME_COUNT; i += 1) {
    frames.push(skeletonToKeypoints(sampleAt(i / FRAME_COUNT)));
  }
  return frames;
}

export function contractionAmount(frameIndex: number, start: number, end: number): number {
  if (frameIndex < start || frameIndex > end) return 0;
  const mid = (start + end) / 2;
  const half = Math.max(1, (end - start) / 2);
  return Math.max(0, 1 - Math.abs(frameIndex - mid) / half);
}

export function mid(a: Keypoint, b: Keypoint): Keypoint {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}
