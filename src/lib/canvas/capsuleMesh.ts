import { mid } from "../motion/keypoints";
import { MUSCLE_LABEL, type Keypoint, type Keypoints, type MuscleId } from "../motion/types";

type Pt = { x: number; y: number };
type View = "front" | "side";

function asPt(p: Keypoint): Pt {
  return { x: p[0], y: p[1] };
}

function dist(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y) || 1;
}

function lerpPt(a: Pt, b: Pt, t: number): Pt {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function offset(a: Pt, b: Pt, amount: number): Pt {
  const length = dist(a, b);
  return { x: ((b.y - a.y) / length) * amount, y: ((a.x - b.x) / length) * amount };
}

function drawCapsule(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, radius: number, fill: string) {
  const length = dist(a, b);
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.rotate(angle);
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(0, -radius, length, radius * 2, radius);
  } else {
    ctx.moveTo(0, -radius);
    ctx.lineTo(length, -radius);
    ctx.arc(length, 0, radius, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(0, radius);
    ctx.arc(0, 0, radius, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();
  }
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.restore();
}

function limb(
  ctx: CanvasRenderingContext2D,
  a: Keypoint,
  b: Keypoint,
  radius: number,
  fill: string,
  peak: number,
  dim = 1,
) {
  const from = asPt(a);
  const to = asPt(b);
  ctx.globalAlpha = dim;
  drawCapsule(ctx, from, to, radius, fill);
  drawCapsule(ctx, from, to, radius * 0.42, "rgba(255,245,230,0.16)");
  if (peak > 0.04) {
    drawCapsule(ctx, from, to, radius * 1.12, `rgba(255, 90, 24, ${0.16 + peak * 0.5})`);
    drawCapsule(ctx, from, to, radius * 0.58, `rgba(255, 40, 28, ${0.08 + peak * 0.38})`);
  }
  ctx.globalAlpha = 1;
}

function joint(ctx: CanvasRenderingContext2D, p: Keypoint, radius: number, fill: string, peak: number, dim = 1) {
  ctx.globalAlpha = dim;
  ctx.beginPath();
  ctx.arc(p[0], p[1], radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (peak > 0.08) {
    ctx.beginPath();
    ctx.arc(p[0], p[1], radius * 1.28, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 72, 18, ${0.18 + peak * 0.4})`;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function torso(ctx: CanvasRenderingContext2D, pose: Keypoints, fill: string, peak: number) {
  const sl = asPt(pose.shoulderL);
  const sr = asPt(pose.shoulderR);
  const hl = asPt(pose.hipL);
  const hr = asPt(pose.hipR);
  const midS = lerpPt(sl, sr, 0.5);
  const midH = lerpPt(hl, hr, 0.5);
  const waist = lerpPt(midS, midH, 0.55);
  const nL = offset(sl, hl, 8);
  const nR = offset(sr, hr, -8);
  ctx.beginPath();
  ctx.moveTo(sl.x, sl.y);
  ctx.lineTo(sr.x, sr.y);
  ctx.quadraticCurveTo(sr.x + nR.x, waist.y, hr.x, hr.y);
  ctx.lineTo(hl.x, hl.y);
  ctx.quadraticCurveTo(sl.x + nL.x, waist.y, sl.x, sl.y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (peak > 0.04) {
    ctx.fillStyle = `rgba(255, 72, 18, ${0.12 + peak * 0.32})`;
    ctx.fill();
  }
}

function foot(ctx: CanvasRenderingContext2D, ankle: Keypoint, knee: Keypoint, fill: string) {
  const a = asPt(ankle);
  const k = asPt(knee);
  const dir = { x: a.x - k.x, y: a.y - k.y };
  const length = Math.hypot(dir.x, dir.y) || 1;
  const nx = dir.x / length;
  const ny = dir.y / length;
  const toe = { x: a.x + nx * 18 + (ny > 0 ? 10 : 14), y: a.y + Math.max(0, ny) * 4 };
  drawCapsule(ctx, a, toe, 6.5, fill);
}

function hand(ctx: CanvasRenderingContext2D, wrist: Keypoint, elbow: Keypoint, fill: string) {
  const w = asPt(wrist);
  const e = asPt(elbow);
  const dir = { x: w.x - e.x, y: w.y - e.y };
  const length = Math.hypot(dir.x, dir.y) || 1;
  const palm = { x: w.x + (dir.x / length) * 10, y: w.y + (dir.y / length) * 10 };
  drawCapsule(ctx, w, palm, 6, fill);
}

function muscleHits(muscles: MuscleId[]) {
  const set = new Set(muscles);
  return {
    thighs: set.has("quads") || set.has("hamstrings") || set.has("hips"),
    shins: set.has("calves"),
    arms: set.has("arms") || set.has("shoulders"),
    torso: set.has("chest") || set.has("core") || set.has("back") || set.has("glutes"),
    shoulders: set.has("shoulders"),
  };
}

export function drawCapsuleMesh(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pose: Keypoints,
  muscles: MuscleId[],
  contraction: number,
  female: boolean,
  view: View = "front",
  showLabels = true,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#12150f";
  ctx.fillRect(0, 0, width, height);

  const wash = ctx.createRadialGradient(width * 0.5, height * 0.78, 16, width * 0.5, height * 0.7, 280);
  wash.addColorStop(0, "rgba(214,255,60,0.08)");
  wash.addColorStop(1, "rgba(18,21,15,0)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(214,255,60,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(48, 412);
  ctx.lineTo(672, 412);
  ctx.stroke();

  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(pose.ankleL[0], 408, 28, 7, 0, 0, Math.PI * 2);
  ctx.ellipse(pose.ankleR[0], 408, 28, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  const hits = muscleHits(muscles);
  const skin = "#e8c4a4";
  const cloth = female ? "#3a3428" : "#24301c";
  const legs = female ? "#1c2218" : skin;
  const peak = contraction;
  const far = view === "side" ? 0.55 : 0.92;
  const near = 1;

  limb(ctx, pose.hipL, pose.kneeL, 15, legs, hits.thighs ? peak : 0, far);
  limb(ctx, pose.kneeL, pose.ankleL, 11, legs, hits.shins ? peak : 0, far);
  foot(ctx, pose.ankleL, pose.kneeL, "#2a241c");
  limb(ctx, pose.shoulderL, pose.elbowL, 11, skin, hits.arms ? peak : 0, far);
  limb(ctx, pose.elbowL, pose.wristL, 8.5, skin, hits.arms ? peak : 0, far);
  hand(ctx, pose.wristL, pose.elbowL, skin);

  torso(ctx, pose, cloth, hits.torso ? peak : 0);
  limb(ctx, pose.shoulderL, pose.shoulderR, 11, cloth, hits.shoulders ? peak : 0);
  limb(ctx, pose.hipL, pose.hipR, 14, cloth, hits.torso ? peak * 0.6 : 0);

  const neck = mid(pose.head, mid(pose.shoulderL, pose.shoulderR));
  limb(ctx, pose.head, neck, 9, skin, 0);
  limb(ctx, neck, mid(pose.shoulderL, pose.shoulderR), 10, cloth, hits.shoulders ? peak * 0.4 : 0);

  limb(ctx, pose.hipR, pose.kneeR, 16, legs, hits.thighs ? peak : 0, near);
  limb(ctx, pose.kneeR, pose.ankleR, 11.5, legs, hits.shins ? peak : 0, near);
  foot(ctx, pose.ankleR, pose.kneeR, "#1c1814");
  limb(ctx, pose.shoulderR, pose.elbowR, 12, skin, hits.arms ? peak : 0, near);
  limb(ctx, pose.elbowR, pose.wristR, 9, skin, hits.arms ? peak : 0, near);
  hand(ctx, pose.wristR, pose.elbowR, skin);

  joint(ctx, pose.hipL, 7, cloth, hits.torso ? peak : 0, far);
  joint(ctx, pose.hipR, 7.5, cloth, hits.torso ? peak : 0);
  joint(ctx, pose.kneeL, 6.5, legs, hits.thighs ? peak : 0, far);
  joint(ctx, pose.kneeR, 7, legs, hits.thighs ? peak : 0);
  joint(ctx, pose.ankleL, 5.5, "#d6ff3c", 0, far);
  joint(ctx, pose.ankleR, 5.5, "#d6ff3c", 0);
  joint(ctx, pose.shoulderL, 7.5, skin, hits.shoulders ? peak : 0, far);
  joint(ctx, pose.shoulderR, 8, skin, hits.shoulders ? peak : 0);
  joint(ctx, pose.elbowL, 6, skin, hits.arms ? peak : 0, far);
  joint(ctx, pose.elbowR, 6.5, skin, hits.arms ? peak : 0);
  joint(ctx, pose.wristL, 5, skin, hits.arms ? peak * 0.4 : 0, far);
  joint(ctx, pose.wristR, 5.2, skin, hits.arms ? peak * 0.4 : 0);

  ctx.beginPath();
  ctx.arc(pose.head[0], pose.head[1], female ? 21 : 23, 0, Math.PI * 2);
  ctx.fillStyle = skin;
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(pose.head[0] - 2, pose.head[1] - 8, female ? 18 : 16, female ? 12 : 11, -0.2, Math.PI, Math.PI * 2);
  ctx.fillStyle = female ? "#4a2c22" : "#2a2118";
  ctx.fill();

  if (!showLabels) return;

  ctx.font = "600 13px Outfit, sans-serif";
  let labelX = 24;
  for (const muscle of muscles) {
    const text = MUSCLE_LABEL[muscle];
    const w = ctx.measureText(text).width;
    const hot = contraction > 0.15;
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") ctx.roundRect(labelX, 12, w + 18, 24, 12);
    else ctx.rect(labelX, 12, w + 18, 24);
    ctx.fillStyle = hot ? `rgba(255, 72, 18, ${0.55 + contraction * 0.4})` : "rgba(214,255,60,0.85)";
    ctx.fill();
    ctx.fillStyle = hot ? "#fff6f0" : "#14180c";
    ctx.fillText(text, labelX + 9, 29);
    labelX += w + 28;
  }
}
