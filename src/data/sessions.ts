import type { Category, Session } from "../types";

export const categories: Category[] = [
  { id: "strength", label: "Strength", blurb: "Squat, push, pull, brace" },
  { id: "cardio", label: "Cardio", blurb: "Heart rate at a pace you can repeat" },
  { id: "stretch", label: "Stretch", blurb: "Hold, breathe, and ease off pain" },
  { id: "yoga", label: "Yoga", blurb: "Breath-led shapes you can hold and repeat" },
  { id: "hiit", label: "HIIT", blurb: "Short circuits with real rest" },
  { id: "mobility", label: "Mobility", blurb: "Range you can actually use" },
];

export const items: Session[] = [
    {
      id: "push-up",
      title: "Push-Up",
      category: "strength",
      difficulty: "Beginner",
      duration: "8 min",
      equipment: "None",
      prescription: "3 sets of 6–12 reps",
      featured: true,
      summary: "A full-body press that teaches a straight line from heels to head.",
      purpose:
        "Builds pressing strength through the chest, shoulders, and triceps while the trunk learns to stay rigid.",
      setup:
        "Hands on the floor slightly wider than your shoulders, fingers spread. Feet together, legs straight, body one line from heels to head.",
      steps: [
        {
          title: "Set your hands",
          cue: "Screw your palms gently into the floor so the elbows want to track back, not flare straight out to the sides.",
        },
        {
          title: "Brace",
          cue: "Pull the ribs toward the hips, squeeze the glutes, and look at the floor a little ahead of your hands.",
        },
        {
          title: "Lower",
          cue: "Bend the elbows to about 45 degrees from your sides until the chest is close to the floor. Move in one piece.",
        },
        {
          title: "Press",
          cue: "Drive the floor away and finish with the arms straight. Do not snap the elbows or let the hips pike up.",
        },
      ],
      mistakes: [
        "Hips sag or pike, so the low back or shoulders do the work.",
        "Elbows flare out to a T and the front of the shoulder pinches.",
        "Moving only a few inches and counting it as a full rep.",
      ],
      easier:
        "Drop to your knees and keep a straight line from knees to head, or place your hands on a sturdy bench and press at an angle.",
    },
    {
      id: "squat",
      title: "Bodyweight Squat",
      category: "strength",
      difficulty: "Beginner",
      duration: "10 min",
      equipment: "None",
      prescription: "3 sets of 8–12 reps",
      featured: true,
      summary: "The pattern for sitting, standing, and lifting with your legs.",
      purpose:
        "Trains thighs, glutes, and trunk so everyday standing and lifting feel stronger and more organized.",
      setup:
        "Feet about shoulder width, toes turned out a little. Arms reach forward if you need balance. Stand tall before the first rep.",
      steps: [
        {
          title: "Stand tall",
          cue: "Spread weight across the whole foot. Keep the chest proud and the eyes forward.",
        },
        {
          title: "Sit back and down",
          cue: "Push the hips back and bend the knees together, as if you are sitting into a chair between your heels.",
        },
        {
          title: "Find your depth",
          cue: "Go as low as you can with heels down and the torso under control. Thighs near parallel is a solid target.",
        },
        {
          title: "Stand",
          cue: "Drive through the middle of the foot and gently squeeze the glutes at the top without leaning back.",
        },
      ],
      mistakes: [
        "Knees cave inward as you stand up.",
        "Heels lift because the stance is too narrow or you are chasing depth.",
        "The chest collapses onto the thighs.",
      ],
      easier:
        "Squat to a chair, tap it lightly, and stand. Raise the seat if you need a shorter range.",
    },
    {
      id: "reverse-lunge",
      title: "Reverse Lunge",
      category: "strength",
      difficulty: "Beginner",
      duration: "8 min",
      equipment: "None",
      prescription: "3 sets of 6 reps each leg",
      featured: false,
      summary: "Single-leg strength and balance, stepped backward so the knee stays kinder.",
      purpose:
        "Builds one-leg strength for walking, stairs, and running, with less demand than a long forward lunge.",
      setup:
        "Stand tall, feet under the hips. Hands on your hips, or hold a light backpack at your chest if you want load later.",
      steps: [
        {
          title: "Step back",
          cue: "Reach one foot behind you and land on the ball of the foot. The front foot stays flat.",
        },
        {
          title: "Lower",
          cue: "Bend both knees. The back knee travels toward the floor. The front knee stays stacked over the ankle.",
        },
        {
          title: "Stay tall",
          cue: "Keep the chest up and most of your weight on the front foot, not hanging off the back toe.",
        },
        {
          title: "Return",
          cue: "Drive through the front foot to stand. Finish all reps on one side, then switch.",
        },
      ],
      mistakes: [
        "The step is so short that the front knee shoots far forward and the torso folds.",
        "Pushing off the back toe instead of the front foot.",
        "Letting the front knee collapse inward.",
      ],
      easier:
        "Hold a wall for balance and use a smaller bend. A short split stance with a small pulse still counts.",
    },
    {
      id: "glute-bridge",
      title: "Glute Bridge",
      category: "strength",
      difficulty: "Beginner",
      duration: "6 min",
      equipment: "None",
      prescription: "3 sets of 10–15 reps",
      featured: false,
      summary: "Hip extension on the floor, so the glutes do the lifting.",
      purpose:
        "Teaches the hips to extend without arching the low back. Useful before squats, runs, and long days of sitting.",
      setup:
        "Lie on your back, knees bent, feet flat about hip width and close enough that you can touch the heels with your fingertips. Arms rest by your sides.",
      steps: [
        {
          title: "Brace lightly",
          cue: "Exhale and let the ribs settle so the low back is not already arched off the floor.",
        },
        {
          title: "Lift",
          cue: "Press through the heels and raise the hips until knees, hips, and shoulders make a straight line.",
        },
        {
          title: "Pause",
          cue: "Squeeze the glutes at the top. If the low back cranks, you have gone too far. Come down a little.",
        },
        {
          title: "Lower",
          cue: "Bring the hips down with control until they barely touch, then go again without resting at the bottom.",
        },
      ],
      mistakes: [
        "Overarching the low back to look higher.",
        "Feet so far away that the hamstrings cramp and the glutes go quiet.",
        "Bouncing through the pause.",
      ],
      easier:
        "Use a smaller lift. Stop where you feel the glutes working, even if the hips are not very high.",
    },
    {
      id: "plank",
      title: "Forearm Plank",
      category: "strength",
      difficulty: "Beginner",
      duration: "5 min",
      equipment: "None",
      prescription: "3 holds of 20–40 seconds",
      featured: false,
      summary: "A still brace so the trunk can transfer strength instead of leaking it.",
      purpose:
        "Trains the trunk to stay stiff. That stiffness is what makes squats, carries, and push-ups feel solid.",
      setup:
        "Forearms on the floor, elbows under the shoulders, legs straight, feet together. Start from your knees if a full plank collapses.",
      steps: [
        {
          title: "Push the floor away",
          cue: "Spread the shoulder blades so the upper back is broad, not collapsed between the shoulders.",
        },
        {
          title: "Tuck slightly",
          cue: "Bring ribs and hips toward each other. A small posterior tilt beats a deep sag.",
        },
        {
          title: "Hold the line",
          cue: "Head, shoulders, hips, and heels stay in one line. Breathe slowly through the nose or a quiet mouth.",
        },
        {
          title: "Stop on purpose",
          cue: "End the set when the hips sag or the breath turns into a strain. Rest, then repeat.",
        },
      ],
      mistakes: [
        "Hips parked high like a tent, or hanging toward the floor.",
        "Holding the breath until the set is over.",
        "Shrugging the ears up to the shoulders.",
      ],
      easier:
        "Drop the knees and keep the same shoulder and rib position. Shorter holds with a clean line beat a long sag.",
    },
    {
      id: "backpack-row",
      title: "Backpack Row",
      category: "strength",
      difficulty: "Beginner",
      duration: "10 min",
      equipment: "A backpack or sturdy bag",
      prescription: "3 sets of 8–12 reps each arm",
      featured: false,
      summary: "A one-arm pull that balances all the pushing in a normal week.",
      purpose:
        "Trains the upper back, shoulders, and arms to pull. Pair it with push-ups so the shoulders are not only pressing.",
      setup:
        "Put books in a backpack you can grip. Hinge at the hips with a long spine, one hand on a bench or sturdy chair, the working arm hanging.",
      steps: [
        {
          title: "Hinge",
          cue: "Soften the knees, push the hips back, and keep the chest facing the floor. The back stays long, not rounded.",
        },
        {
          title: "Pull",
          cue: "Draw the bag toward the hip, leading with the elbow. The shoulder blade slides toward the spine.",
        },
        {
          title: "Pause",
          cue: "Squeeze at the top without shrugging the shoulder to the ear.",
        },
        {
          title: "Lower",
          cue: "Straighten the arm with control. Finish the set, then switch sides.",
        },
      ],
      mistakes: [
        "Jerking the bag up with the low back.",
        "Shrugging to finish the rep.",
        "Twisting the torso so momentum does the pull.",
      ],
      easier:
        "Use a lighter bag. If you have a band, stand tall and pull the elbows back instead of hinging.",
    },
    {
      id: "jumping-jacks",
      title: "Jumping Jacks",
      category: "cardio",
      difficulty: "Beginner",
      duration: "6 min",
      equipment: "None",
      prescription: "4 rounds of 30–45 seconds",
      featured: false,
      summary: "A small-space way to lift your heart rate without choreography.",
      purpose:
        "Warms the whole body and raises breathing with a pattern most people can learn in one try.",
      setup:
        "Stand tall, feet together, arms at your sides. Use a floor that will not slide. Rest as long as you need between rounds.",
      steps: [
        {
          title: "Open",
          cue: "Jump the feet out about shoulder width as the arms swing overhead.",
        },
        {
          title: "Land soft",
          cue: "Meet the floor with slightly bent knees. Quiet feet are the goal.",
        },
        {
          title: "Close",
          cue: "Jump back to the start and let the arms fall to your sides.",
        },
        {
          title: "Keep a voice",
          cue: "Stay at a pace where you can still say a short sentence. If you cannot, slow down.",
        },
      ],
      mistakes: [
        "Landing with locked knees.",
        "Flinging the arms so the low back arches hard at the top.",
        "Going so fast the landing gets loud and sloppy.",
      ],
      easier:
        "Step one foot out at a time and raise the arms without leaving the ground. That step-jack still raises your pulse.",
    },
    {
      id: "mountain-climbers",
      title: "Mountain Climbers",
      category: "cardio",
      difficulty: "Intermediate",
      duration: "6 min",
      equipment: "None",
      prescription: "4 rounds of 20–30 seconds",
      featured: false,
      summary: "A plank that moves, mixing trunk control with a cardio rhythm.",
      purpose:
        "Raises heart rate while you practice keeping the hips quiet. Quality beats a blur of knees.",
      setup:
        "Hands under shoulders in a high plank, body in a straight line. Clear a little space in front of you.",
      steps: [
        {
          title: "Brace first",
          cue: "Before the legs move, set the same line you use in a plank. Hips level, ribs down.",
        },
        {
          title: "Drive one knee",
          cue: "Bring one knee toward the chest without hiking that hip to the ceiling.",
        },
        {
          title: "Switch",
          cue: "Change legs at a smooth pace you can still organize. The shoulders stay over the wrists.",
        },
        {
          title: "Rest before form breaks",
          cue: "When the hips start bouncing, stop the round. Shake out the wrists, then go again.",
        },
      ],
      mistakes: [
        "Hips bouncing up and down with every switch.",
        "Hands set far in front of the shoulders.",
        "Holding the breath for the whole interval.",
      ],
      easier:
        "Slow the switch and tap a toe down each time, or put your hands on a bench so the wrists and shoulders carry less load.",
    },
    {
      id: "jump-rope",
      title: "Jump Rope",
      category: "cardio",
      difficulty: "Beginner",
      duration: "8 min",
      equipment: "A rope, or no rope at first",
      prescription: "6 rounds of 30 seconds on, 30 seconds off",
      featured: false,
      summary: "Small jumps and quiet wrists. A rope is optional on day one.",
      purpose:
        "Builds rhythm, calf endurance, and an efficient bounce you can use as a warm-up or a short cardio session.",
      setup:
        "If you have a rope, stand on the middle. The handles should reach about hip height. Elbows stay close to the ribs. Without a rope, mimic the turn with your wrists.",
      steps: [
        {
          title: "Spin with the wrists",
          cue: "Make small circles. Big arm swings throw off the timing and smack the feet.",
        },
        {
          title: "Jump just enough",
          cue: "Leave the floor only as high as the rope needs. One small bounce per turn.",
        },
        {
          title: "Land softly",
          cue: "Use the balls of the feet and a soft knee. Stay tall through the chest.",
        },
        {
          title: "Rest the full 30 seconds",
          cue: "The break is part of the workout. Use it so the next round stays crisp.",
        },
      ],
      mistakes: [
        "Double-bouncing out of habit once you can clear the rope. Aim for one bounce per turn.",
        "Elbows wide, rope clipping the feet.",
        "Pounding down on locked heels.",
      ],
      easier:
        "Bounce in place with no rope, or swing the rope to one side of the body until the wrist timing feels obvious.",
    },
    {
      id: "easy-run",
      title: "Easy Run Intervals",
      category: "cardio",
      difficulty: "Beginner",
      duration: "20 min",
      equipment: "Shoes and a safe path",
      prescription: "Jog and walk for 8–12 minutes of easy effort",
      featured: true,
      summary: "A talk-friendly jog, broken up with walking whenever you need air.",
      purpose:
        "Builds an engine you can repeat most weeks. Easy means a 4 or 5 out of 10, not a test.",
      setup:
        "Wear shoes that do not rub. Warm up with 3 minutes of brisk walking. Pick a flat, well-lit route, or march in place if you stay indoors.",
      steps: [
        {
          title: "Walk first",
          cue: "Brisk walking until breathing is steady. This is the warm-up, not a waste of the session.",
        },
        {
          title: "Jog easy",
          cue: "Shift to a jog or a strong march you could describe out loud in short sentences.",
        },
        {
          title: "Walk when you need to",
          cue: "If breathing gets choppy, walk until you can speak, then jog again. The breaks belong in the plan.",
        },
        {
          title: "Finish walking",
          cue: "End with 3 easy minutes. If a joint hurts, stop the jog and walk. Sharp pain is a stop signal.",
        },
      ],
      mistakes: [
        "Starting at a pace you can only hold for a minute.",
        "Skipping the walk warm-up.",
        "Treating chest pain, dizziness, or a joint that is getting worse as something to push through.",
      ],
      easier:
        "Walk the whole session and add a few 30-second faster bursts. Intervals still count when they are walking.",
    },
    {
      id: "hip-flexor",
      title: "Half-Kneeling Hip Flexor",
      category: "stretch",
      difficulty: "Beginner",
      duration: "6 min",
      equipment: "A pad for the knee",
      prescription: "2 holds of 30–45 seconds each side",
      featured: true,
      summary: "A tall kneel that gives the front of the hip some length after sitting.",
      purpose:
        "Eases the front of the hip so standing, lunging, and walking feel less cramped. The stretch should live in the hip, not the low back.",
      setup:
        "Half kneel with the back knee on a pad and the front foot flat. Both hip bones face forward. Shoes off if the top of the foot is happier that way.",
      steps: [
        {
          title: "Tuck the pelvis",
          cue: "Gently bring the belt buckle toward the ribs so you are not just arching the low back.",
        },
        {
          title: "Shift forward a little",
          cue: "Move your weight slightly toward the front foot until you feel a stretch on the kneeling side, at the front of the hip.",
        },
        {
          title: "Stay tall",
          cue: "Ribs stay stacked over the pelvis. Breathe out and let the hip soften. Do not lunge as far as you can.",
        },
        {
          title: "Switch",
          cue: "Hold, then change sides. A pinch in the front of the hip joint means you have gone too far. Back up.",
        },
      ],
      mistakes: [
        "Dumping into a big low-back arch and calling it a hip stretch.",
        "Letting the front knee cave in.",
        "Forcing a deep lunge that bothers the kneeling knee.",
      ],
      easier:
        "Stay more upright and make the shift smaller. You can also stand in a short split stance and use the same pelvic tuck.",
    },
    {
      id: "hamstring",
      title: "Hamstring Stretch",
      category: "stretch",
      difficulty: "Beginner",
      duration: "6 min",
      equipment: "Optional towel",
      prescription: "2 holds of 30–45 seconds each side",
      featured: false,
      summary: "Length for the back of the thigh without rounding the whole spine to get there.",
      purpose:
        "Gives the hamstrings a calm stretch on the floor, which pairs well with squats, walks, and easy runs.",
      setup:
        "Lie on your back. One leg can stay bent with the foot on the floor. Lift the other leg and hold behind the thigh, or loop a towel around the foot.",
      steps: [
        {
          title: "Support the leg",
          cue: "Hold the thigh or the towel so the shoulders stay relaxed on the floor.",
        },
        {
          title: "Straighten only as far as the stretch",
          cue: "Extend the knee until you feel the back of the thigh. A soft bend is allowed.",
        },
        {
          title: "Keep the hips heavy",
          cue: "Both sides of the pelvis stay on the floor. Do not yank the leg toward your face.",
        },
        {
          title: "Breathe and switch",
          cue: "Quiet breaths for the hold, then change legs. No bouncing.",
        },
      ],
      mistakes: [
        "Pulling so hard the pelvis tucks and the stretch leaves the hamstring.",
        "Locking the neck up to watch the leg.",
        "Bouncing at the end of the range.",
      ],
      easier:
        "Keep a clearly bent knee. If the floor feels awkward, do the same idea in a doorway or with the heel on a low step.",
    },
    {
      id: "chest-opener",
      title: "Doorway Chest Opener",
      category: "stretch",
      difficulty: "Beginner",
      duration: "4 min",
      equipment: "A doorway",
      prescription: "2 holds of 30 seconds each side",
      featured: false,
      summary: "A small turn away from the arm to open the chest after desk time and push-ups.",
      purpose:
        "Stretches the chest and the front of the shoulder so pressing work and laptop posture do not own the week.",
      setup:
        "Stand in a doorway. Place one forearm on the frame with the elbow near shoulder height, not cranked up by your ear.",
      steps: [
        {
          title: "Set the arm",
          cue: "Forearm on the frame, shoulder down away from the ear, ribs quiet.",
        },
        {
          title: "Step through slightly",
          cue: "Move the same-side foot a little forward and rotate the chest away until you feel the front of the shoulder and chest.",
        },
        {
          title: "Stay mild",
          cue: "Think long collarbone, not a big lean. The stretch should be dull, never sharp or numb.",
        },
        {
          title: "Switch sides",
          cue: "Hold, then change arms. If the shoulder pinches, lower the elbow and reduce the turn.",
        },
      ],
      mistakes: [
        "Elbow too high, which pinches the top of the shoulder.",
        "Leaning hard until the stretch is painful.",
        "Holding the breath and bracing the neck.",
      ],
      easier:
        "Clasp hands behind you and lift them only a few inches, or simply stand tall and slide the shoulder blades down and together.",
    },
    {
      id: "cat-cow",
      title: "Cat-Cow",
      category: "stretch",
      difficulty: "Beginner",
      duration: "5 min",
      equipment: "None",
      prescription: "8–10 slow cycles",
      featured: false,
      summary: "A breath-led arch and round so the spine does not stay in one shape all day.",
      purpose:
        "Moves the back through flexion and extension. Use it as a warm-up, a break, or the start of the morning flow.",
      setup:
        "Hands and knees. Wrists under shoulders, knees under hips. If the wrists complain, make fists or rest on your forearms.",
      steps: [
        {
          title: "Cow",
          cue: "Inhale, tip the tailbone up a little, let the belly drop, and lift the chest. Gaze stays soft and forward.",
        },
        {
          title: "Cat",
          cue: "Exhale, round the spine toward the ceiling, tuck the pelvis, and let the head hang.",
        },
        {
          title: "Move in segments",
          cue: "Start the motion at the pelvis and let it travel up the back. Do not yank the neck to lead.",
        },
        {
          title: "Stay easy",
          cue: "Eight slow cycles is plenty. Pain-free range only. A smaller shape done smoothly is the exercise.",
        },
      ],
      mistakes: [
        "Forcing the low back into a deep sag.",
        "Shrugging the shoulders toward the ears.",
        "Racing the cycles with no breath.",
      ],
      easier:
        "Sit tall in a chair and alternate a small arch and a small round through the upper back only.",
    },
    {
      id: "downward-dog",
      title: "Downward-Facing Dog",
      category: "yoga",
      difficulty: "Beginner",
      duration: "5 min",
      equipment: "A mat",
      prescription: "3 holds of 5–8 breaths",
      featured: true,
      summary: "An inverted V that lengthens calves and hamstrings while the shoulders learn to share the load.",
      purpose:
        "Opens the back of the legs and teaches you to press the floor away without collapsing the upper back.",
      setup:
        "Start on hands and knees. Hands slightly in front of the shoulders, fingers spread. Knees under the hips. Tuck the toes.",
      steps: [
        {
          title: "Lift the hips",
          cue: "Straighten the legs as much as you can and send the hips up and back into an inverted V. Heels reach toward the floor; they do not have to touch.",
        },
        {
          title: "Press the hands",
          cue: "Spread the fingers and press through the full palm. Outer upper arms rotate slightly in so the shoulders do not shrug to the ears.",
        },
        {
          title: "Long spine",
          cue: "Think of length from wrists to sitting bones. A soft bend in the knees is better than a rounded low back.",
        },
        {
          title: "Breathe, then rest",
          cue: "Five to eight quiet breaths. Come down to hands and knees between holds if the wrists or shoulders fatigue.",
        },
      ],
      mistakes: [
        "Locking the knees to force the heels down and rounding the spine.",
        "Dumping all the weight into the wrists with collapsed shoulders.",
        "Holding the breath or straining the neck to look at your feet.",
      ],
      easier:
        "Keep a clear bend in the knees and lift the heels. You can also rest your hands on a sturdy bench so the shape is less inverted.",
    },
    {
      id: "childs-pose",
      title: "Child’s Pose",
      category: "yoga",
      difficulty: "Beginner",
      duration: "4 min",
      equipment: "A mat",
      prescription: "2 holds of 6–10 breaths",
      featured: false,
      summary: "A folded rest pose for the back, hips, and nervous system between stronger work.",
      purpose:
        "Gives the spine a supported fold and a place to reset breathing. Use it after sun salutations, after downward dog, or any time you need an easy landing.",
      setup:
        "Kneel on a mat. Big toes can touch. Knees can stay together or open as wide as the mat so the torso has room.",
      steps: [
        {
          title: "Sit toward the heels",
          cue: "Send the hips back. If the knees complain, place a folded blanket between calves and thighs.",
        },
        {
          title: "Fold forward",
          cue: "Walk the hands forward and rest the forehead on the mat, a block, or stacked fists.",
        },
        {
          title: "Soften the shoulders",
          cue: "Let the arms rest long, or stack them under the forehead. The neck stays heavy.",
        },
        {
          title: "Breathe into the back",
          cue: "Slow nasal breaths. Feel the back ribs move. Come up slowly when you are done.",
        },
      ],
      mistakes: [
        "Forcing the hips all the way to the heels through knee pain.",
        "Turning the head sharply to one side for a long hold.",
        "Treating it as a stretch you must win instead of a rest.",
      ],
      easier:
        "Keep the torso higher: rest the chest on a pillow or sit on a chair and fold over your thighs.",
    },
    {
      id: "warrior-ii",
      title: "Warrior II",
      category: "yoga",
      difficulty: "Beginner",
      duration: "6 min",
      equipment: "A mat",
      prescription: "2 holds of 5 breaths each side",
      featured: false,
      summary: "A standing lunge with open arms that builds legs, hips, and a steady gaze.",
      purpose:
        "Strengthens the front thigh and outer hip while you practice a long, even stance. The arms stay light; the work is in the legs.",
      setup:
        "Step the feet wide, about a leg’s length apart. Front toes face the short end of the mat. Back foot turns in about 45 degrees. Both hips face the long side of the mat.",
      steps: [
        {
          title: "Bend the front knee",
          cue: "Stack the front knee over the ankle, not past the toes. Thigh aims toward parallel if that is available without collapsing.",
        },
        {
          title: "Open the arms",
          cue: "Reach the arms to shoulder height, palms down, one toward the front foot and one toward the back. Shoulders stay down.",
        },
        {
          title: "Gaze and breath",
          cue: "Look over the front fingers if the neck is happy. If not, look forward. Five even breaths.",
        },
        {
          title: "Switch sides",
          cue: "Straighten the front leg, pivot the feet, and repeat. Do not dump into the inner front knee.",
        },
      ],
      mistakes: [
        "Front knee collapsing inward or shooting far past the ankle.",
        "Leaning the torso over the front thigh.",
        "Shrugging the arms and holding the breath.",
      ],
      easier:
        "Shorten the stance and keep a smaller bend in the front knee. Rest the back heel against a wall for balance.",
    },
    {
      id: "cobra",
      title: "Cobra",
      category: "yoga",
      difficulty: "Beginner",
      duration: "5 min",
      equipment: "A mat",
      prescription: "4 slow lifts of 3–5 breaths",
      featured: false,
      summary: "A gentle backbend on the belly that opens the chest without cranking the low back.",
      purpose:
        "Strengthens the mid-back and teaches a chest lift that starts from the upper spine, not a jammed lumbar arch.",
      setup:
        "Lie on your belly, legs long, tops of the feet on the mat. Hands under the shoulders, elbows close to the ribs. Forehead rests down to start.",
      steps: [
        {
          title: "Root the pelvis",
          cue: "Press the pubic bone lightly into the mat and lengthen the tailbone toward the heels so the low back is not already compressed.",
        },
        {
          title: "Lift the chest",
          cue: "Inhale and peel the chest forward and up. The hands press only as much as you need. Elbows can stay bent.",
        },
        {
          title: "Draw the shoulders back",
          cue: "Broaden the collarbones. Gaze stays slightly forward, not cranked to the ceiling.",
        },
        {
          title: "Lower with control",
          cue: "Exhale and come down. Rest, then repeat. If the low back pinches, keep the lift smaller or stay with a forehead-down rest.",
        },
      ],
      mistakes: [
        "Straight-arming into a high pose that jams the lumbar spine.",
        "Shrugging the shoulders to the ears.",
        "Holding the breath and clenching the glutes hard.",
      ],
      easier:
        "Keep the hands off the floor and lift only the chest and eyes a few inches (sphinx with forearms is also welcome).",
    },
    {
      id: "seated-forward-fold",
      title: "Seated Forward Fold",
      category: "yoga",
      difficulty: "Beginner",
      duration: "5 min",
      equipment: "A mat; optional strap",
      prescription: "2 holds of 6–8 breaths",
      featured: false,
      summary: "A seated hinge that stretches the back of the legs without rounding the whole spine to get there.",
      purpose:
        "Gives hamstrings and calves a calm hold. Depth is not the goal; a long spine is.",
      setup:
        "Sit with both legs extended. Flex the feet. Sit on a folded blanket if the low back rounds when you sit tall.",
      steps: [
        {
          title: "Sit tall",
          cue: "Lengthen the spine on an inhale. Knees can stay softly bent.",
        },
        {
          title: "Hinge from the hips",
          cue: "Walk the hands along the legs. Lead with the chest, not the forehead. Stop when you feel a stretch in the back of the thighs.",
        },
        {
          title: "Hold without bouncing",
          cue: "Breathe. A strap around the feet is allowed. Shoulders stay away from the ears.",
        },
        {
          title: "Come up slowly",
          cue: "Lift the chest first, then sit tall. Dizziness means sit and wait before standing.",
        },
      ],
      mistakes: [
        "Rounding hard just to grab the toes.",
        "Locking the knees and yanking.",
        "Holding the breath to force a deeper shape.",
      ],
      easier:
        "Bend the knees generously, or fold over one leg at a time. A chair fold (chest toward thighs) counts.",
    },
    {
      id: "sun-salutation",
      title: "Easy Sun Salutation",
      category: "yoga",
      difficulty: "Beginner",
      duration: "8 min",
      equipment: "A mat",
      prescription: "4 slow rounds",
      featured: true,
      summary: "A short standing-to-floor flow: reach, fold, plank, cobra, and downward dog, linked with breath.",
      purpose:
        "Warms the whole body and ties yoga shapes together. Move slower than you think. Skip or modify any shape that pinches.",
      setup:
        "Stand at the front of the mat, feet hip width. Read downward dog, cobra, and child’s pose first if those patterns are new.",
      steps: [
        {
          title: "Reach and fold",
          cue: "Inhale, sweep the arms overhead. Exhale, hinge and fold with a long spine, knees bent as much as you need.",
        },
        {
          title: "Step back to plank",
          cue: "Place the hands, step or walk the feet back to a high plank. Hold one breath with a straight line from heels to head.",
        },
        {
          title: "Lower and cobra",
          cue: "Lower the knees if you want, then the chest, and take a small cobra. Elbows stay close.",
        },
        {
          title: "Down dog, then walk up",
          cue: "Press back to downward dog for two breaths. Walk the feet forward, hang, then roll up to stand. That is one round. Rest in child’s pose between rounds if you need it.",
        },
      ],
      mistakes: [
        "Racing the round so plank and cobra collapse.",
        "Jumping when you cannot yet control the landing.",
        "Skipping breath and treating it like a burpee.",
      ],
      easier:
        "Skip plank: fold, step back to hands and knees, take a small cobra, then child’s pose, then stand. Four slow rounds still count.",
    },
    {
      id: "hiit-starter",
      title: "Starter HIIT Circuit",
      category: "hiit",
      difficulty: "Intermediate",
      duration: "12 min",
      equipment: "None",
      prescription: "4 rounds · 30 seconds work / 30 seconds rest",
      featured: true,
      summary: "Squat, push, and climber — short efforts with rest you actually take.",
      purpose:
        "A conditioning session for days when you want intensity without inventing a workout. Read the squat, push-up, and mountain climber tutorials first if any pattern is new.",
      setup:
        "Clear a patch of floor and put water nearby. Warm up with one minute of easy marching and five slow squats.",
      steps: [
        {
          title: "Squat",
          cue: "30 seconds at a pace you could keep. Full reps you recognize from the squat tutorial. Rest 30 seconds.",
        },
        {
          title: "Push",
          cue: "30 seconds of push-ups from knees or a bench if the full version falls apart when you hurry. Rest 30 seconds.",
        },
        {
          title: "Climb",
          cue: "30 seconds of slow mountain climbers, hips quiet. Rest 30 seconds. That trio is one round.",
        },
        {
          title: "Repeat or stop",
          cue: "Aim for 4 rounds. If form unravels, end the session. Sloppy reps are not extra credit.",
        },
      ],
      mistakes: [
        "Turning the rest into more work.",
        "Racing the clock and losing the positions you just practiced.",
        "Starting cold, then wondering why the first round feels awful.",
      ],
      easier:
        "Use 20 seconds of work and 40 seconds of rest. Step the climbers instead of driving the knees fast.",
    },
    {
      id: "step-intervals",
      title: "Step Intervals",
      category: "hiit",
      difficulty: "Beginner",
      duration: "10 min",
      equipment: "A sturdy stair or low step",
      prescription: "6 rounds · 40 seconds up-tempo / 40 seconds easy",
      featured: false,
      summary: "Heart-rate work on a step you already have, with less impact than repeated jumping.",
      purpose:
        "Raises breathing using a stair or aerobic step. A rail is allowed. The whole foot stays on the step.",
      setup:
        "Choose a step that does not wobble and is low enough that the knee is comfortable. Hold a rail if you want it.",
      steps: [
        {
          title: "March easy",
          cue: "One minute of easy stepping or flat-ground marching before the clock gets serious.",
        },
        {
          title: "Pick up the pace",
          cue: "For 40 seconds, step up and down a little faster. Alternate which foot leads.",
        },
        {
          title: "Ease off",
          cue: "Walk on flat ground or march slowly for 40 seconds. Shoulders stay down.",
        },
        {
          title: "Keep the foot honest",
          cue: "The whole foot lands on the step. Heel does not hang off the edge. Chest stays tall.",
        },
      ],
      mistakes: [
        "Using a step so high the knee complains on the first round.",
        "Letting the heel drift off the edge.",
        "Skipping the easy first minute.",
      ],
      easier:
        "Skip the step. March on flat ground, add arm swings, and keep the same 40 seconds on and 40 seconds easy.",
    },
    {
      id: "morning-flow",
      title: "Morning Mobility Flow",
      category: "mobility",
      difficulty: "Beginner",
      duration: "8 min",
      equipment: "Floor space",
      prescription: "1 calm round",
      featured: true,
      summary: "Spine, hips, and a few squats to start the day without turning it into a workout.",
      purpose:
        "A short sequence for the ranges you use all day. Smaller shapes on day one are the right dose.",
      setup:
        "Shoes off, on a mat or carpet. Nothing should hurt. If a reach pinches, shrink it.",
      steps: [
        {
          title: "Cat-cow",
          cue: "Six slow breaths, arching and rounding the way the cat-cow tutorial describes.",
        },
        {
          title: "Half-kneeling reach",
          cue: "One hand inside the front foot, the other reaches up. Two easy breaths each side. Only go as far as the hip and mid-back allow.",
        },
        {
          title: "Hip flexor shift",
          cue: "From the same kneel, tuck the pelvis and shift forward slightly. Three breaths each side.",
        },
        {
          title: "Easy squats",
          cue: "Stand and take five slow bodyweight squats. Use the range you have. Do not force depth at the end.",
        },
      ],
      mistakes: [
        "Rushing it like a finisher.",
        "Holding the breath in the reach.",
        "Pushing into a pinch in the hip or shoulder.",
      ],
      easier:
        "Do only cat-cow and the five slow squats. Two calm pieces beat a long flow you skip tomorrow.",
    },
    {
      id: "hip-flow",
      title: "Hip Flow",
      category: "mobility",
      difficulty: "Beginner",
      duration: "7 min",
      equipment: "None",
      prescription: "2 easy rounds",
      featured: false,
      summary: "Rocks, a shallow opener, and a figure-four so sitting does not own your hips.",
      purpose:
        "Loosens hips that spend the day in a chair, so squats and walks feel smoother afterward.",
      setup:
        "Start on hands and knees. You will sit back on your heels, then come into a kneel, then sit. Use a cushion under the knees if you need it.",
      steps: [
        {
          title: "Rock",
          cue: "Shift the hips toward the heels and then forward, eight times, spine long rather than collapsed.",
        },
        {
          title: "Open one hip",
          cue: "Step one foot outside the hand. Shift forward and back five times in a range that does not pinch. Switch sides.",
        },
        {
          title: "Figure-four",
          cue: "Sit and cross one ankle over the opposite knee. Hinge forward slightly for about 30 seconds each side.",
        },
        {
          title: "Stand and circle",
          cue: "On your feet, circle the hips slowly five times each way, small and smooth.",
        },
      ],
      mistakes: [
        "Forcing the front knee into a painful angle in the opener.",
        "Rounding hard just to chase the figure-four stretch.",
        "Holding a sharp pinch. Back off until it feels like a stretch.",
      ],
      easier:
        "Skip the deep opener. Rock, then do the figure-four in a chair: ankle on the other knee, sit tall.",
    },
    {
      id: "desk-reset",
      title: "Desk Reset",
      category: "mobility",
      difficulty: "Beginner",
      duration: "5 min",
      equipment: "A chair",
      prescription: "1 round between work blocks",
      featured: false,
      summary: "Shoulders, upper back, and a gentle chin tuck for screen days.",
      purpose:
        "A break you can do beside a desk. Move slowly. Stop if you feel dizzy, numb, or a sharp pain.",
      setup:
        "Sit or stand tall at the edge of the chair. Feet on the floor. You do not need to change clothes.",
      steps: [
        {
          title: "Roll the shoulders",
          cue: "Five circles back, five forward. Finish with the shoulder blades down, not shrugged.",
        },
        {
          title: "Open the chest",
          cue: "One hand behind the head, rotate the chest to that side five times. Let the eyes follow. Do not crank the neck.",
        },
        {
          title: "Glide the chin back",
          cue: "Make a soft double chin by sliding the head straight back, hold three seconds, six times. Do not yank the chin to the chest.",
        },
        {
          title: "Reach up",
          cue: "Stand, reach both arms overhead, and take three long breaths. Then sit down and return to work.",
        },
      ],
      mistakes: [
        "Fast neck circles.",
        "Pulling the head forward or down with your hand.",
        "Staying in a shrug for the whole break.",
      ],
      easier:
        "Only the overhead reach and six gentle chin tucks. That is enough between meetings.",
    },
    {
      id: "sleep",
      title: "Sleep Window",
      category: "lifestyle",
      difficulty: "Daily",
      duration: "Nightly",
      equipment: "A dark, quiet room",
      prescription: "A steady 7–9 hour window",
      featured: false,
      summary: "Same wake time, a short wind-down, and a room that is boring on purpose.",
      purpose:
        "Sleep is where training sticks. A window you can keep beats a perfect routine you only try on Sundays.",
      setup:
        "Pick a wake time you can hold most days, including weekends, within about an hour. Start a wind-down 30–45 minutes before you want to be asleep.",
      steps: [
        {
          title: "Dim the room",
          cue: "Lower bright overhead lights. Park the phone outside arm’s reach if you can.",
        },
        {
          title: "Repeat a short wind-down",
          cue: "The same few minutes each night: wash up, two minutes of easy stretching, or a few pages of a book.",
        },
        {
          title: "Make the room dull",
          cue: "Cool, dark, and quiet enough. A fan or earplugs help if the street is loud.",
        },
        {
          title: "Leave the bed if you are wide awake",
          cue: "If you are up for a long stretch, get up, keep lights low, and come back when you are sleepy. Do not turn the bed into a scroll spot.",
        },
      ],
      mistakes: [
        "Huge weekend sleep-ins that slide the whole clock.",
        "Hard sessions and late caffeine on nights they leave you wired. Move caffeine earlier and notice what changes.",
        "Shopping for supplements before the wake time is even consistent.",
      ],
      easier:
        "Change only the wake time this week. Same alarm, most days. Add the wind-down next week.",
    },
    {
      id: "daily-walk",
      title: "Daily Walk",
      category: "lifestyle",
      difficulty: "Daily",
      duration: "20–40 min",
      equipment: "Shoes you already like",
      prescription: "Most days, even a short loop",
      featured: false,
      summary: "The base layer of a fit life. Walking counts even when it is ordinary.",
      purpose:
        "Adds movement without spending the joints you need for lifting and intervals. It is also the easiest session to keep.",
      setup:
        "Pick a loop you actually like and a time that already exists, such as after a meal or a call you can take outside. Shoes should not rub.",
      steps: [
        {
          title: "Start where you can talk",
          cue: "A pace for conversation. Upright, arms swinging, not hunched over the phone the entire way.",
        },
        {
          title: "Add a little speed later",
          cue: "Once the walk feels easy, include a few faster minutes. They are optional, not a test.",
        },
        {
          title: "Keep a tiny version",
          cue: "If the day collapses, a 10-minute loop still counts. Note it and move on.",
        },
        {
          title: "Stop for warning signs",
          cue: "Blisters mean change shoes or stop. Chest pain, severe shortness of breath, or dizziness means stop and get help. That is not a fitness rep.",
        },
      ],
      mistakes: [
        "Waiting for a free hour, then skipping the day.",
        "Brand-new shoes on the longest walk of the month.",
        "Treating the walk as worthless because it was not a workout.",
      ],
      easier:
        "Walk inside, or split the day into two 10-minute bouts. Both versions count.",
    },
    {
      id: "hydration",
      title: "Hydration Habit",
      category: "lifestyle",
      difficulty: "Daily",
      duration: "All day",
      equipment: "A bottle you can see",
      prescription: "Sip with meals and through the workday",
      featured: false,
      summary: "A visible bottle and a few anchors, so you are not catching up at night.",
      purpose:
        "Fluids support focus and training. You do not need a perfect liter count. You need a habit you notice.",
      setup:
        "Fill a bottle in the morning and put it where you work. Pale yellow urine is a simple check for most people. Some foods and medicines change color, so thirst and how you feel matter too.",
      steps: [
        {
          title: "Start with breakfast",
          cue: "Drink a glass with the first meal so the day is not already behind.",
        },
        {
          title: "Tie sips to habits",
          cue: "After each bathroom break, refill or take a few swallows. The reminder is the routine you already have.",
        },
        {
          title: "Drink around workouts",
          cue: "A little more fluid before and after you train. Water is enough for sessions under an hour.",
        },
        {
          title: "Protect sleep",
          cue: "Ease off a huge intake right before bed if it keeps you up. Spread the bottle through the afternoon instead.",
        },
      ],
      mistakes: [
        "Chugging a liter at once and calling the day done.",
        "Replacing meals with sweet drinks.",
        "Ignoring thirst because a schedule said you were finished.",
      ],
      easier:
        "One full bottle before dinner. That is the only rule until it is automatic.",
    },
    {
      id: "rest-days",
      title: "Rest Days",
      category: "lifestyle",
      difficulty: "Weekly",
      duration: "1–2 days",
      equipment: "None",
      prescription: "At least one true easy day each week",
      featured: false,
      summary: "Hard days only work if an easy day is allowed to stay easy.",
      purpose:
        "Rest is part of the program. Muscles, joints, and motivation catch up when you stop stacking intense sessions.",
      setup:
        "Before the week starts, mark at least one day with no hard strength session and no HIIT. Walking and gentle stretching are welcome.",
      steps: [
        {
          title: "Write it down",
          cue: "Put the easy day where you can see it. If yesterday was hard, today stays easy even if noon feels ambitious.",
        },
        {
          title: "Fill it gently",
          cue: "Use the day for a walk, the morning flow, or ordinary life. Do not smuggle in a surprise all-out circuit.",
        },
        {
          title: "Keep eating and sleeping",
          cue: "Recovery still needs meals and a real night. Skipping both and calling it discipline works against you.",
        },
        {
          title: "Repeat easy if you are run down",
          cue: "Several tired days in a row means another easy day, not a bigger workout tonight. Add load next week.",
        },
      ],
      mistakes: [
        "Filling the rest day with an unplanned max session.",
        "Guilt-scrolling workouts instead of actually resting.",
        "Stacking HIIT and a long strength day back to back while you are new.",
      ],
      easier:
        "Name one day “walk only” and protect it the way you protect a workout appointment.",
    },
  ];

export const libraryCategoryIds = categories.map((category) => category.id);

export function categoryLabel(id: string): string {
  if (id === "lifestyle") return "Lifestyle";
  const match = categories.find((category) => category.id === id);
  return match ? match.label : "Library";
}

export function findItem(id: string): Session | undefined {
  return items.find((item) => item.id === id);
}
