/**
 * Mock Student Telemetry and Architecture Map Dataset
 * This mock architecture references the exact open datasets and machine learning models 
 * detailed in the AURA project presentation requirements.
 */

export const mockStudentData = {
  // Baseline profile data mapping back to the problem statement
  profile: {
    studentId: "SRM-2028-AURA",
    name: "Sample Student Profile",
    age: 19,
    academicVelocity: "Heavy Windows (Exam Week Preview)"
  },

  // 1. DATA INPUT LAYER SIMULATION DATA
  // Simulates telemetry gathered from fragmented academic apps to calculate cognitive density
  telemetryInputs: {
    calendarDensity: {
      totalLecturesToday: 4,
      labHoursActive: 3,
      upcomingExamsCount: 2
    },
    appUsageMetrics: {
      lmsMinutes: 142,         // e.g., Blackboard/Moodle interaction
      ideMinutes: 195,         // Heavy VS Code compilation times
      socialDistractionMinutes: 88, // Triggers interruption flags
      notificationCountToday: 74     // Feeds directly into interruption density
    }
  },

  // 2. INTELLIGENCE LAYER SIMULATION DATA
  // Reference weights mapped back to specific academic open datasets
  openDatasetReferences: [
    {
      name: "GoEmotions Dataset (Google Research)",
      utilizedFor: "Fine-tuning BERT/RoBERTa for 28 granular emotional classification check-ins.",
      appliedWeight: "30% of SCLI Affective Matrix"
    },
    {
      name: "Student Stress Prediction Dataset (Kaggle)",
      utilizedFor: "Training predictive burnout curves using physiological features (Sleep, Stress sliders).",
      appliedWeight: "70% of SCLI Feature Vector"
    }
  ],

  // AI Tone System Prompt Maps that change based on Empathy-Adaptive toggles
  empathyAgentPrompts: {
    focusCoach: {
      greeting: "[SYSTEM: DEEP FOCUS LOCK ACTIVATED]",
      aiResponse: "Your OS Lab task has high urgency metrics. I have compressed your UI background, activated a 25-minute block timer, and suppressed all low-priority calendar alerts. Proceed with semaphore logic now.",
      modelEngine: "BERT-Intent Classifier v2.1"
    },
    supportiveMentor: {
      greeting: "Take a deep breath. You are doing completely fine.",
      aiResponse: "I see your subjective stress tracker spiked to 8/10 alongside low sleep parameters. Let's defer your elective math revision until tomorrow morning. Focus on resting your baseline memory centers right now.",
      modelEngine: "Gemini / LLaMA Emotion-Tuned API Wrapper"
    },
    minimal: {
      greeting: "AURA: Stripped Environment.",
      aiResponse: "3 tasks pending. No alerts active. Clear your screen.",
      modelEngine: "Zero-Shot Text Summarizer Core"
    },
    pushMode: {
      greeting: "🔥 CLUTCH TIME PROTOCOL!",
      aiResponse: "Your IEEE abstract submission window closes shortly. SCLI is peaking, but your energy bandwidth has clearance. Let's gamify this block: clear this item in 15 minutes to earn safe recovery down-time!",
      modelEngine: "High-Velocity Prompt Engine"
    }
  }
};

export default mockStudentData;