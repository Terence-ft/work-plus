import { FRAME_COUNT, type Keypoints, type MuscleId } from "./types";

export type View = "front" | "side";

type Pt = { x: number; y: number };

const FLOOR = 408;
const CX = 360;

const BONE = {
  thigh: 84,
  shin: 78,
  torso: 100,
  neck: 22,
  upper: 68,
  fore: 64,
};

function pt(x: number, y: number): Pt {
  return { x, y };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ease(t: number) {
  return 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, t)));
}

/** 0 at rest, 1 at loaded position, back to 0. Holds the peak briefly. */
export function pulse(t: number) {
  if (t < 0.4) return ease(t / 0.4);
  if (t < 0.55) return 1;
  return 1 - ease((t - 0.55) / 0.45);
}

function polar(origin: Pt, deg: number, length: number): Pt {
  const rad = (deg * Math.PI) / 180;
  return pt(origin.x + Math.cos(rad) * length, origin.y + Math.sin(rad) * length);
}

function sideStand() {
  const hip = pt(CX + 10, 238);
  const hipL = pt(hip.x - 10, hip.y);
  const hipR = pt(hip.x + 10, hip.y);
  const ankleL = pt(hip.x - 8, FLOOR);
  const ankleR = pt(hip.x + 16, FLOOR);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const sh = pt(hip.x + 4, hip.y - BONE.torso);
  const shoulderL = pt(sh.x - 12, sh.y + 4);
  const shoulderR = pt(sh.x + 14, sh.y);
  const wristL = pt(shoulderL.x - 6, shoulderL.y + 112);
  const wristR = pt(shoulderR.x + 6, shoulderR.y + 108);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(sh.x + 8, sh.y - 34);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideSquat(u: number) {
  const hipY = lerp(238, 318, u);
  const hip = pt(CX + 8, hipY);
  const hipL = pt(hip.x - 10, hip.y);
  const hipR = pt(hip.x + 10, hip.y);
  const ankleL = pt(hip.x - 18, FLOOR);
  const ankleR = pt(hip.x + 22, FLOOR);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const lean = lerp(0, 22, u);
  const sh = pt(hip.x + lean, hip.y - BONE.torso + lerp(0, 12, u));
  const shoulderL = pt(sh.x - 12, sh.y + 4);
  const shoulderR = pt(sh.x + 14, sh.y);
  const wristL = pt(shoulderL.x + lerp(0, 18, u), shoulderL.y + lerp(110, 42, u));
  const wristR = pt(shoulderR.x + lerp(0, 18, u), shoulderR.y + lerp(108, 40, u));
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(sh.x + 16, sh.y - 32);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

/** Two-bone IK so limbs never stretch. bendDir flips the joint (elbow/knee). */
function ik(from: Pt, to: Pt, l1: number, l2: number, bendDir: number): { mid: Pt; end: Pt } {
  let dx = to.x - from.x;
  let dy = to.y - from.y;
  let d = Math.hypot(dx, dy) || 1;
  const max = l1 + l2 - 0.8;
  if (d > max) {
    dx = (dx / d) * max;
    dy = (dy / d) * max;
    d = max;
    to = pt(from.x + dx, from.y + dy);
  }
  const min = Math.abs(l1 - l2) + 0.8;
  if (d < min) {
    dx = (dx / d) * min;
    dy = (dy / d) * min;
    d = min;
    to = pt(from.x + dx, from.y + dy);
  }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const mx = from.x + (dx / d) * a;
  const my = from.y + (dy / d) * a;
  const px = -dy / d;
  const py = dx / d;
  return {
    mid: pt(mx + px * h * bendDir, my + py * h * bendDir),
    end: to,
  };
}

function kp(map: {
  hipL: Pt;
  hipR: Pt;
  kneeL: Pt;
  kneeR: Pt;
  ankleL: Pt;
  ankleR: Pt;
  shoulderL: Pt;
  shoulderR: Pt;
  elbowL: Pt;
  elbowR: Pt;
  wristL: Pt;
  wristR: Pt;
  head: Pt;
}): Keypoints {
  return {
    hipL: [map.hipL.x, map.hipL.y],
    hipR: [map.hipR.x, map.hipR.y],
    kneeL: [map.kneeL.x, map.kneeL.y],
    kneeR: [map.kneeR.x, map.kneeR.y],
    ankleL: [map.ankleL.x, map.ankleL.y],
    ankleR: [map.ankleR.x, map.ankleR.y],
    shoulderL: [map.shoulderL.x, map.shoulderL.y],
    shoulderR: [map.shoulderR.x, map.shoulderR.y],
    elbowL: [map.elbowL.x, map.elbowL.y],
    elbowR: [map.elbowR.x, map.elbowR.y],
    wristL: [map.wristL.x, map.wristL.y],
    wristR: [map.wristR.x, map.wristR.y],
    head: [map.head.x, map.head.y],
  };
}

function frontStand(u = 0) {
  const hipY = lerp(238, 312, u);
  const hipW = lerp(28, 34, u);
  const ankleL = pt(CX - 36, FLOOR);
  const ankleR = pt(CX + 36, FLOOR);
  const hipL = pt(CX - hipW, hipY);
  const hipR = pt(CX + hipW, hipY);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const lean = lerp(0, 14, u);
  const shY = hipY - BONE.torso + lean;
  const shW = lerp(44, 40, u);
  const shoulderL = pt(CX - shW, shY);
  const shoulderR = pt(CX + shW, shY);
  const reach = lerp(0, 1, u);
  const wristL = pt(lerp(CX - 50, CX - 70, reach), lerp(shY + 118, shY + 36, reach));
  const wristR = pt(lerp(CX + 50, CX + 70, reach), lerp(shY + 118, shY + 36, reach));
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(CX, shY - BONE.neck - 16);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sidePush(u: number) {
  const drop = lerp(0, 58, u);
  const wristL = pt(248, FLOOR);
  const wristR = pt(262, FLOOR - 2);
  const ankleL = pt(568, FLOOR);
  const ankleR = pt(582, FLOOR - 2);
  const bodyY = 236 + drop;
  const shoulderL = pt(292, bodyY + 6);
  const shoulderR = pt(304, bodyY);
  const hipL = pt(468, bodyY + 10);
  const hipR = pt(480, bodyY + 4);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, -1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, 1).mid;
  const head = pt(shoulderL.x - 38, bodyY - 8);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideLunge(u: number) {
  const dip = lerp(0, 1, u);
  const ankleL = pt(268, FLOOR);
  const ankleR = pt(488, FLOOR);
  const hip = pt(lerp(360, 348, dip), lerp(238, 268, dip));
  const hipL = pt(hip.x - 12, hip.y);
  const hipR = pt(hip.x + 12, hip.y + 2);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const sh = pt(hip.x, hip.y - BONE.torso + lerp(0, 8, dip));
  const shoulderL = pt(sh.x - 18, sh.y + 4);
  const shoulderR = pt(sh.x + 18, sh.y);
  const wristL = pt(shoulderL.x - 8, shoulderL.y + 110);
  const wristR = pt(shoulderR.x + 8, shoulderR.y + 108);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(sh.x + 4, sh.y - 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideBridge(u: number) {
  const lift = lerp(0, 1, u);
  const shoulder = pt(268, 338);
  const head = pt(214, 328);
  const ankleL = pt(500, FLOOR);
  const ankleR = pt(518, FLOOR);
  const hipY = lerp(338, 236, lift);
  const hip = pt(400, hipY);
  const hipL = pt(hip.x - 8, hip.y);
  const hipR = pt(hip.x + 8, hip.y);
  const shoulderL = pt(shoulder.x - 8, shoulder.y);
  const shoulderR = pt(shoulder.x + 10, shoulder.y - 4);
  const wristL = pt(290, 300);
  const wristR = pt(300, 348);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, 1).mid;
  return kp({
    hipL,
    hipR,
    kneeL,
    kneeR,
    ankleL,
    ankleR,
    shoulderL,
    shoulderR,
    elbowL,
    elbowR,
    wristL,
    wristR,
    head,
  });
}

function sidePlankHold(u: number) {
  const wobble = Math.sin(u * Math.PI * 2) * 3;
  return sidePush(0.02 + wobble * 0.002);
}

function sideRow(u: number) {
  const pull = lerp(0, 1, u);
  const hip = pt(380, 268);
  const ankle = pt(400, FLOOR);
  const hipL = pt(hip.x - 10, hip.y);
  const hipR = pt(hip.x + 10, hip.y);
  const ankleL = pt(ankle.x - 10, FLOOR);
  const ankleR = pt(ankle.x + 10, FLOOR);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const sh = polar(hip, -118, BONE.torso);
  const shoulderL = pt(sh.x - 16, sh.y + 6);
  const shoulderR = pt(sh.x + 8, sh.y);
  const wristL = pt(shoulderL.x + 20, shoulderL.y + 90);
  const wristR = polar(shoulderR, lerp(20, -70, pull), BONE.upper + BONE.fore * 0.35);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = polar(sh, -150, 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function frontJacks(t: number) {
  const u = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
  const hop = Math.sin(t * Math.PI * 2) > 0 ? 10 : 0;
  const hipY = 238 - hop;
  const spread = lerp(20, 78, u);
  const ankleL = pt(CX - 18 - spread * 0.55, FLOOR - hop);
  const ankleR = pt(CX + 18 + spread * 0.55, FLOOR - hop);
  const hipL = pt(CX - 26, hipY);
  const hipR = pt(CX + 26, hipY);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const shY = hipY - BONE.torso;
  const shoulderL = pt(CX - 42, shY);
  const shoulderR = pt(CX + 42, shY);
  const wristL = polar(shoulderL, lerp(95, -80, u), BONE.upper + BONE.fore * 0.85);
  const wristR = polar(shoulderR, lerp(85, -100, u), BONE.upper + BONE.fore * 0.85);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(CX, shY - 38);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideClimber(t: number) {
  const u = t % 1 < 0.5 ? 0 : 1;
  const hip = pt(468, 242);
  const shoulder = pt(300, 236);
  const wrist = pt(250, FLOOR);
  const backAnkle = pt(570, FLOOR);
  const driveAnkle = pt(lerp(570, 340, 0.85), lerp(FLOOR, 250, 0.85));
  const ankleL = u ? backAnkle : driveAnkle;
  const ankleR = u ? driveAnkle : backAnkle;
  const hipL = pt(hip.x - 8, hip.y);
  const hipR = pt(hip.x + 8, hip.y);
  const shoulderL = pt(shoulder.x - 8, shoulder.y + 4);
  const shoulderR = pt(shoulder.x + 8, shoulder.y);
  const wristL = pt(wrist.x - 6, FLOOR);
  const wristR = pt(wrist.x + 8, FLOOR);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, -1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, 1).mid;
  const head = pt(shoulder.x - 40, 228);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideSkip(t: number) {
  const hop = (Math.sin(t * Math.PI * 2) + 1) * 8;
  const hipY = 238 - hop;
  const hip = pt(CX, hipY);
  const ankleL = pt(CX - 16, FLOOR - hop * 0.4);
  const ankleR = pt(CX + 16, FLOOR - hop);
  const hipL = pt(hip.x - 14, hip.y);
  const hipR = pt(hip.x + 14, hip.y);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const shY = hipY - BONE.torso;
  const shoulderL = pt(CX - 36, shY);
  const shoulderR = pt(CX + 36, shY);
  const wristL = polar(shoulderL, 70 + Math.sin(t * Math.PI * 2) * 25, 90);
  const wristR = polar(shoulderR, 110 - Math.sin(t * Math.PI * 2) * 25, 90);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(CX, shY - 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideGait(t: number, stride = 34, bounce = 6) {
  const s = Math.sin(t * Math.PI * 2);
  const c = Math.cos(t * Math.PI * 2);
  const hipY = 236 - Math.abs(s) * bounce;
  const hip = pt(CX + 20, hipY);
  const ankleL = pt(hip.x - 12 + s * stride, FLOOR - Math.max(0, s) * 16);
  const ankleR = pt(hip.x + 12 - s * stride, FLOOR - Math.max(0, -s) * 16);
  const hipL = pt(hip.x - 12, hip.y);
  const hipR = pt(hip.x + 12, hip.y);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const sh = pt(hip.x, hip.y - BONE.torso);
  const shoulderL = pt(sh.x - 16, sh.y + 4);
  const shoulderR = pt(sh.x + 16, sh.y);
  const wristL = polar(shoulderL, 95 - c * 40, 100);
  const wristR = polar(shoulderR, 85 + c * 40, 100);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(sh.x + 10, sh.y - 34);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideHipFlexor(u: number) {
  const shift = lerp(0, 1, u);
  const ankleL = pt(300, FLOOR);
  const kneeR = pt(430, FLOOR - 4);
  const ankleR = pt(470, FLOOR);
  const hip = pt(lerp(360, 388, shift), 268);
  const hipL = pt(hip.x - 14, hip.y);
  const hipR = pt(hip.x + 10, hip.y + 4);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const sh = pt(hip.x, hip.y - 96);
  const shoulderL = pt(sh.x - 18, sh.y);
  const shoulderR = pt(sh.x + 18, sh.y);
  const wristL = pt(shoulderL.x, shoulderL.y + 108);
  const wristR = pt(shoulderR.x, shoulderR.y + 108);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(sh.x, sh.y - 36);
  return kp({
    hipL,
    hipR,
    kneeL,
    kneeR,
    ankleL,
    ankleR,
    shoulderL,
    shoulderR,
    elbowL,
    elbowR,
    wristL,
    wristR,
    head,
  });
}

function sideHamstring(u: number) {
  const lift = lerp(0, 1, u);
  const hip = pt(340, 330);
  const shoulder = pt(240, 330);
  const head = pt(196, 318);
  const ankleL = pt(260, FLOOR);
  const hipL = pt(hip.x - 8, hip.y);
  const hipR = pt(hip.x + 8, hip.y);
  const kneeL = pt(320, 330);
  const ankleR = polar(hipR, lerp(10, -80, lift), BONE.thigh + BONE.shin * 0.7);
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const shoulderL = pt(shoulder.x - 6, shoulder.y);
  const shoulderR = pt(shoulder.x + 10, shoulder.y - 4);
  const wristL = pt(300, 300);
  const wristR = polar(ankleR, 90, 8);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideChestOpener(u: number) {
  const turn = lerp(0, 1, u);
  const hip = pt(340, 238);
  const ankleL = pt(320, FLOOR);
  const ankleR = pt(380, FLOOR);
  const hipL = pt(hip.x - 16, hip.y);
  const hipR = pt(hip.x + 16, hip.y);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const sh = pt(hip.x + lerp(0, -16, turn), hip.y - BONE.torso);
  const shoulderL = pt(sh.x - 24, sh.y);
  const shoulderR = pt(sh.x + 36, sh.y - 4);
  const wristL = pt(shoulderL.x - 10, shoulderL.y + 110);
  const wristR = pt(lerp(490, 520, turn), lerp(160, 130, turn));
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(sh.x + lerp(0, -12, turn), sh.y - 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideCatCow(t: number) {
  const u = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
  const wrist = pt(250, FLOOR);
  const knee = pt(430, FLOOR);
  const ankle = pt(470, FLOOR);
  const hipY = lerp(268, 248, u);
  const shY = lerp(248, 278, u);
  const hip = pt(430, hipY);
  const shoulder = pt(270, shY);
  const head = pt(220, lerp(230, 300, u));
  const hipL = pt(hip.x - 8, hip.y);
  const hipR = pt(hip.x + 8, hip.y);
  const shoulderL = pt(shoulder.x - 8, shoulder.y);
  const shoulderR = pt(shoulder.x + 8, shoulder.y);
  const wristL = pt(wrist.x - 6, FLOOR);
  const wristR = pt(wrist.x + 8, FLOOR);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, 1).mid;
  const kneeL = pt(knee.x - 8, FLOOR - 8);
  const kneeR = pt(knee.x + 8, FLOOR - 10);
  const ankleL = pt(ankle.x - 8, FLOOR);
  const ankleR = pt(ankle.x + 8, FLOOR);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideStep(t: number) {
  const u = pulse((t * 2) % 1);
  const stepY = lerp(0, 36, u);
  const hipY = 236 - stepY * 0.35;
  const ankleL = pt(CX - 20, FLOOR);
  const ankleR = pt(CX + 40, FLOOR - stepY);
  const hipL = pt(CX - 16, hipY);
  const hipR = pt(CX + 16, hipY);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const shY = hipY - BONE.torso;
  const shoulderL = pt(CX - 36, shY);
  const shoulderR = pt(CX + 36, shY);
  const wristL = pt(CX - 44, shY + 110);
  const wristR = pt(CX + 44, shY + 110);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(CX, shY - 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideDesk(t: number) {
  const u = pulse(t);
  const sit = 1;
  const hipY = 278;
  const hipL = pt(CX - 22, hipY);
  const hipR = pt(CX + 22, hipY);
  const ankleL = pt(CX - 24, FLOOR);
  const ankleR = pt(CX + 24, FLOOR);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const shY = hipY - 88;
  const open = u;
  const shoulderL = pt(CX - 40, shY);
  const shoulderR = pt(CX + 40, shY);
  const wristL = polar(shoulderL, lerp(100, -70, open), 95);
  const wristR = polar(shoulderR, lerp(80, -110, open), 95);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(CX, shY - 34 - sit * 0);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideSleep() {
  const hip = pt(400, 330);
  const shoulder = pt(280, 332);
  const head = pt(232, 318);
  const knee = pt(500, 328);
  const ankle = pt(560, 338);
  const hipL = pt(hip.x, hip.y - 8);
  const hipR = pt(hip.x, hip.y + 8);
  const shoulderL = pt(shoulder.x, shoulder.y - 8);
  const shoulderR = pt(shoulder.x, shoulder.y + 8);
  const wristL = pt(300, 300);
  const wristR = pt(310, 360);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const kneeL = pt(knee.x, knee.y - 8);
  const kneeR = pt(knee.x, knee.y + 8);
  const ankleL = pt(ankle.x, ankle.y - 6);
  const ankleR = pt(ankle.x, ankle.y + 6);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideSip(u: number) {
  const stand = frontStand(0);
  const sh = { x: stand.shoulderR[0], y: stand.shoulderR[1] };
  const wrist = polar(sh, lerp(95, -50, u), 88);
  const elbow = ik(sh, wrist, BONE.upper, BONE.fore, -1).mid;
  const head = [stand.head[0] - lerp(0, 8, u), stand.head[1] + lerp(0, 4, u)] as [number, number];
  return {
    ...stand,
    wristR: [wrist.x, wrist.y] as [number, number],
    elbowR: [elbow.x, elbow.y] as [number, number],
    head,
  };
}

function sideDog(u: number) {
  const lift = lerp(0.85, 1, u);
  const wrist = pt(240, FLOOR);
  const ankle = pt(560, FLOOR);
  const hip = pt(420, lerp(210, 132, lift));
  const shoulder = pt(270, lerp(250, 268, lift));
  const hipL = pt(hip.x - 8, hip.y);
  const hipR = pt(hip.x + 8, hip.y);
  const shoulderL = pt(shoulder.x - 8, shoulder.y);
  const shoulderR = pt(shoulder.x + 8, shoulder.y);
  const wristL = pt(wrist.x - 8, FLOOR);
  const wristR = pt(wrist.x + 8, FLOOR);
  const ankleL = pt(ankle.x - 8, FLOOR);
  const ankleR = pt(ankle.x + 8, FLOOR);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, 1).mid;
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, 1).mid;
  const head = pt(shoulder.x - 50, shoulder.y + 12);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideChild(u: number) {
  const fold = lerp(0.2, 1, u);
  const knee = pt(420, FLOOR - 6);
  const ankle = pt(470, FLOOR);
  const hip = pt(lerp(400, 448, fold), lerp(250, 300, fold));
  const shoulder = pt(lerp(300, 268, fold), lerp(250, 310, fold));
  const head = pt(lerp(250, 228, fold), lerp(240, 348, fold));
  const hipL = pt(hip.x - 10, hip.y);
  const hipR = pt(hip.x + 10, hip.y);
  const shoulderL = pt(shoulder.x - 10, shoulder.y);
  const shoulderR = pt(shoulder.x + 10, shoulder.y);
  const wristL = pt(220, FLOOR);
  const wristR = pt(236, FLOOR);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, 1).mid;
  const kneeL = pt(knee.x - 10, FLOOR - 8);
  const kneeR = pt(knee.x + 10, FLOOR - 10);
  const ankleL = pt(ankle.x - 8, FLOOR);
  const ankleR = pt(ankle.x + 8, FLOOR);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function frontWarrior(u: number) {
  const bend = lerp(0.35, 1, u);
  const ankleL = pt(210, FLOOR);
  const ankleR = pt(510, FLOOR);
  const hipY = lerp(248, 268, bend);
  const hipL = pt(300, hipY);
  const hipR = pt(420, hipY);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const shY = hipY - 96;
  const shoulderL = pt(220, shY);
  const shoulderR = pt(500, shY);
  const wristL = pt(120, shY + 4);
  const wristR = pt(600, shY + 4);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = pt(360, shY - 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideCobra(u: number) {
  const lift = lerp(0, 1, u);
  const hip = pt(430, 338);
  const ankle = pt(560, FLOOR);
  const shoulder = pt(300, lerp(338, 268, lift));
  const head = pt(258, lerp(330, 210, lift));
  const hipL = pt(hip.x - 8, hip.y);
  const hipR = pt(hip.x + 8, hip.y);
  const shoulderL = pt(shoulder.x - 10, shoulder.y);
  const shoulderR = pt(shoulder.x + 10, shoulder.y);
  const wristL = pt(278, FLOOR);
  const wristR = pt(294, FLOOR);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, 1).mid;
  const kneeL = ik(hipL, pt(ankle.x - 8, FLOOR), BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, pt(ankle.x + 8, FLOOR), BONE.thigh, BONE.shin, 1).mid;
  const ankleL = pt(ankle.x - 8, FLOOR);
  const ankleR = pt(ankle.x + 8, FLOOR);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function sideFold(u: number) {
  const fold = lerp(0, 1, u);
  const hip = pt(CX, 278);
  const ankleL = pt(CX - 18, FLOOR);
  const ankleR = pt(CX + 18, FLOOR);
  const hipL = pt(hip.x - 16, hip.y);
  const hipR = pt(hip.x + 16, hip.y);
  const kneeL = ik(hipL, ankleL, BONE.thigh, BONE.shin, 1).mid;
  const kneeR = ik(hipR, ankleR, BONE.thigh, BONE.shin, -1).mid;
  const sh = polar(hip, lerp(-90, 20, fold), BONE.torso);
  const shoulderL = pt(sh.x - 18, sh.y);
  const shoulderR = pt(sh.x + 18, sh.y);
  const wristL = polar(shoulderL, lerp(90, 80, fold), 100);
  const wristR = polar(shoulderR, lerp(90, 100, fold), 100);
  const elbowL = ik(shoulderL, wristL, BONE.upper, BONE.fore, 1).mid;
  const elbowR = ik(shoulderR, wristR, BONE.upper, BONE.fore, -1).mid;
  const head = polar(sh, lerp(-90, 30, fold), 36);
  return kp({ hipL, hipR, kneeL, kneeR, ankleL, ankleR, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, head });
}

function mixPose(a: Keypoints, b: Keypoints, t: number): Keypoints {
  const e = ease(t);
  const next = { ...a };
  (Object.keys(a) as (keyof Keypoints)[]).forEach((key) => {
    next[key] = [lerp(a[key][0], b[key][0], e), lerp(a[key][1], b[key][1], e)];
  });
  return next;
}

function sequence(t: number, poses: Keypoints[]): Keypoints {
  if (poses.length === 1) return poses[0];
  const scaled = t * (poses.length - 1);
  const i = Math.min(poses.length - 2, Math.floor(scaled));
  return mixPose(poses[i], poses[i + 1], scaled - i);
}

export type ExerciseMotion = {
  view: View;
  muscles: MuscleId[];
  peak: { start: number; end: number };
  pose: (t: number) => Keypoints;
};

export const EXERCISES: Record<string, ExerciseMotion> = {
  squat: { view: "front", muscles: ["quads", "glutes", "core"], peak: { start: 20, end: 38 }, pose: (t) => frontStand(pulse(t)) },
  "push-up": { view: "side", muscles: ["chest", "shoulders", "arms", "core"], peak: { start: 18, end: 36 }, pose: (t) => sidePush(pulse(t)) },
  "reverse-lunge": { view: "side", muscles: ["quads", "glutes", "hips"], peak: { start: 18, end: 40 }, pose: (t) => sideLunge(pulse(t)) },
  "glute-bridge": { view: "side", muscles: ["glutes", "hamstrings", "core"], peak: { start: 20, end: 40 }, pose: (t) => sideBridge(pulse(t)) },
  plank: { view: "side", muscles: ["core", "shoulders"], peak: { start: 0, end: 59 }, pose: (t) => sidePlankHold(t) },
  "backpack-row": { view: "side", muscles: ["back", "shoulders", "arms"], peak: { start: 20, end: 40 }, pose: (t) => sideRow(pulse(t)) },
  "jumping-jacks": { view: "front", muscles: ["shoulders", "calves", "core"], peak: { start: 20, end: 40 }, pose: (t) => frontJacks(t) },
  "mountain-climbers": { view: "side", muscles: ["core", "hips", "shoulders"], peak: { start: 0, end: 59 }, pose: (t) => sideClimber(t) },
  "jump-rope": { view: "front", muscles: ["calves", "shoulders", "arms"], peak: { start: 8, end: 28 }, pose: (t) => sideSkip(t) },
  "easy-run": { view: "side", muscles: ["quads", "calves", "core"], peak: { start: 0, end: 59 }, pose: (t) => sideGait(t, 42, 10) },
  "hip-flexor": { view: "side", muscles: ["hips", "quads"], peak: { start: 22, end: 44 }, pose: (t) => sideHipFlexor(pulse(t)) },
  hamstring: { view: "side", muscles: ["hamstrings", "calves"], peak: { start: 22, end: 44 }, pose: (t) => sideHamstring(pulse(t)) },
  "chest-opener": { view: "side", muscles: ["chest", "shoulders"], peak: { start: 22, end: 44 }, pose: (t) => sideChestOpener(pulse(t)) },
  "cat-cow": { view: "side", muscles: ["back", "core"], peak: { start: 10, end: 50 }, pose: (t) => sideCatCow(t) },
  "hiit-starter": {
    view: "side",
    muscles: ["quads", "chest", "core"],
    peak: { start: 8, end: 50 },
    pose: (t) => sequence(t, [sideSquat(0.9), sidePush(0.85), sideClimber(0.2), sideSquat(0.9)]),
  },
  "step-intervals": { view: "side", muscles: ["quads", "calves", "glutes"], peak: { start: 16, end: 36 }, pose: (t) => sideStep(t) },
  "morning-flow": {
    view: "side",
    muscles: ["back", "hips", "core"],
    peak: { start: 12, end: 48 },
    pose: (t) => sequence(t, [sideCatCow(0.2), sideHipFlexor(0.8), sideSquat(0.4), sideStand()]),
  },
  "hip-flow": {
    view: "side",
    muscles: ["hips", "glutes"],
    peak: { start: 16, end: 44 },
    pose: (t) => sequence(t, [sideChild(0.4), sideHipFlexor(0.7), sideStand()]),
  },
  "desk-reset": { view: "front", muscles: ["shoulders", "back", "core"], peak: { start: 18, end: 42 }, pose: (t) => sideDesk(t) },
  sleep: { view: "side", muscles: ["core"], peak: { start: 0, end: 59 }, pose: () => sideSleep() },
  "daily-walk": { view: "side", muscles: ["calves", "glutes", "core"], peak: { start: 0, end: 59 }, pose: (t) => sideGait(t, 28, 4) },
  hydration: { view: "front", muscles: ["core"], peak: { start: 18, end: 38 }, pose: (t) => sideSip(pulse(t)) },
  "rest-days": { view: "side", muscles: ["core"], peak: { start: 0, end: 59 }, pose: (t) => sideGait(t, 16, 2) },
  "downward-dog": { view: "side", muscles: ["shoulders", "hamstrings", "calves"], peak: { start: 16, end: 50 }, pose: (t) => sideDog(pulse(t)) },
  "childs-pose": { view: "side", muscles: ["back", "hips"], peak: { start: 16, end: 50 }, pose: (t) => sideChild(pulse(t)) },
  "warrior-ii": { view: "front", muscles: ["quads", "hips", "shoulders"], peak: { start: 12, end: 50 }, pose: (t) => frontWarrior(pulse(t)) },
  cobra: { view: "side", muscles: ["back", "chest", "shoulders"], peak: { start: 18, end: 42 }, pose: (t) => sideCobra(pulse(t)) },
  "seated-forward-fold": { view: "side", muscles: ["hamstrings", "back"], peak: { start: 20, end: 48 }, pose: (t) => sideFold(pulse(t)) },
  "sun-salutation": {
    view: "side",
    muscles: ["shoulders", "core", "hamstrings"],
    peak: { start: 10, end: 50 },
    pose: (t) =>
      sequence(t, [sideStand(), sideFold(1), sidePush(0), sideCobra(1), sideDog(1), sideStand()]),
  },
};

export function framesFor(id: string): Keypoints[] {
  const motion = EXERCISES[id] ?? EXERCISES.squat;
  const frames: Keypoints[] = [];
  for (let i = 0; i < FRAME_COUNT; i += 1) frames.push(motion.pose(i / FRAME_COUNT));
  return frames;
}
