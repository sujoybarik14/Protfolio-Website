export type ContentType = "text" | "image" | "video";
export type ViolationType = "hate_speech" | "harassment" | "adult_content" | "violence" | "spam" | "none";
export type ModerationStatus = "pending" | "approved" | "rejected" | "escalated";
export type AppealStatus = "open" | "under_review" | "upheld" | "overturned";
export type Language = "en" | "hi" | "ta" | "te" | "bn" | "mr" | "gu" | "kn";

export interface ModerationItem {
  id: string;
  contentType: ContentType;
  content: string;
  userId: string;
  username: string;
  platform: string;
  language: Language;
  aiConfidence: number;
  violation: ViolationType;
  status: ModerationStatus;
  aiReasoning: string;
  timestamp: string;
  reviewedBy?: string;
}

export interface Appeal {
  id: string;
  moderationId: string;
  userId: string;
  username: string;
  reason: string;
  status: AppealStatus;
  submittedAt: string;
  violation: ViolationType;
  originalContent: string;
}

const platforms = ["SocialBuzz", "GameVerse", "ClassifiedHub", "EduForum"];
const languages: Language[] = ["en", "hi", "ta", "te", "bn", "mr", "gu", "kn"];
const langLabels: Record<Language, string> = { en: "English", hi: "Hindi", ta: "Tamil", te: "Telugu", bn: "Bengali", mr: "Marathi", gu: "Gujarati", kn: "Kannada" };
export { langLabels };

const violations: ViolationType[] = ["hate_speech", "harassment", "adult_content", "violence", "spam", "none"];
const violationLabels: Record<ViolationType, string> = {
  hate_speech: "Hate Speech", harassment: "Harassment", adult_content: "Adult Content",
  violence: "Violence", spam: "Spam", none: "Clean",
};
export { violationLabels };

const reasonings: Record<ViolationType, string[]> = {
  hate_speech: [
    "Detected slurs targeting ethnic group. BERT confidence 0.94. Context suggests derogatory intent rather than reclaimed usage.",
    "Multilingual analysis flagged coded language patterns consistent with hate speech in Hindi-English code-switching.",
  ],
  harassment: [
    "Repeated directed threats identified. Pattern matches targeted harassment with escalating severity.",
    "Doxxing attempt detected — personal information shared with hostile framing.",
  ],
  adult_content: [
    "CNN classifier detected explicit imagery with 96% confidence. Skin exposure and pose analysis triggered.",
    "Text contains sexually explicit descriptions violating community guidelines.",
  ],
  violence: [
    "Graphic violence depicted in thumbnail. Blood/gore detection model confidence: 0.91.",
    "Text describes detailed instructions for causing physical harm.",
  ],
  spam: [
    "Duplicate content posted 47 times in 2 hours. URL pattern matches known spam domains.",
    "Bot-like posting pattern: identical message structure with rotating phone numbers.",
  ],
  none: ["Content passed all moderation checks. No violations detected."],
};

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateModerationItems(count: number): ModerationItem[] {
  return Array.from({ length: count }, (_, i) => {
    const violation = rand(violations);
    const status: ModerationStatus = violation === "none" ? "approved" : rand(["pending", "rejected", "escalated"]);
    return {
      id: `MOD-${String(i + 1).padStart(5, "0")}`,
      contentType: rand<ContentType>(["text", "text", "text", "image", "video"]),
      content: `Sample content #${i + 1} flagged for review`,
      userId: `USR-${Math.floor(Math.random() * 9000) + 1000}`,
      username: `user_${Math.random().toString(36).slice(2, 8)}`,
      platform: rand(platforms),
      language: rand(languages),
      aiConfidence: violation === "none" ? 0.1 + Math.random() * 0.2 : 0.55 + Math.random() * 0.44,
      violation,
      status,
      aiReasoning: rand(reasonings[violation]),
      timestamp: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
    };
  });
}

export function generateAppeals(items: ModerationItem[]): Appeal[] {
  const rejected = items.filter(i => i.status === "rejected");
  return rejected.slice(0, Math.min(12, rejected.length)).map((item, i) => ({
    id: `APL-${String(i + 1).padStart(4, "0")}`,
    moderationId: item.id,
    userId: item.userId,
    username: item.username,
    reason: rand([
      "This was satire, not genuine hate speech. Context was a comedy sketch discussion.",
      "The flagged content is a news article quote, not my personal opinion.",
      "This image is from a medical textbook, flagged incorrectly as adult content.",
      "I was reporting harassment, not engaging in it.",
    ]),
    status: rand<AppealStatus>(["open", "under_review", "upheld", "overturned"]),
    submittedAt: new Date(Date.now() - Math.random() * 5 * 86400000).toISOString(),
    violation: item.violation,
    originalContent: item.content,
  }));
}

export interface BiasDataPoint {
  group: string;
  moderationRate: number;
  falsePositiveRate: number;
  appealRate: number;
  overturnRate: number;
}

export const biasData: BiasDataPoint[] = [
  { group: "Group A", moderationRate: 4.2, falsePositiveRate: 1.1, appealRate: 12, overturnRate: 28 },
  { group: "Group B", moderationRate: 4.8, falsePositiveRate: 1.4, appealRate: 15, overturnRate: 31 },
  { group: "Group C", moderationRate: 3.9, falsePositiveRate: 0.9, appealRate: 10, overturnRate: 24 },
  { group: "Group D", moderationRate: 5.1, falsePositiveRate: 1.8, appealRate: 18, overturnRate: 35 },
  { group: "Group E", moderationRate: 4.0, falsePositiveRate: 1.0, appealRate: 11, overturnRate: 26 },
];

export const dashboardStats = {
  totalReviewed: 284_391,
  pendingQueue: 1_247,
  autoApproved: 261_402,
  escalated: 3_891,
  avgResponseTime: "2.3s",
  accuracy: 96.4,
  appealsOpen: 89,
  biasAlerts: 2,
};

export const violationBreakdown = [
  { name: "Hate Speech", value: 3420, fill: "hsl(var(--destructive))" },
  { name: "Harassment", value: 2890, fill: "hsl(var(--warning))" },
  { name: "Spam", value: 5640, fill: "hsl(var(--info))" },
  { name: "Adult Content", value: 1980, fill: "hsl(var(--chart-1))" },
  { name: "Violence", value: 1260, fill: "hsl(var(--destructive))" },
];

export const volumeOverTime = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - 13 + i);
  return {
    date: d.toLocaleDateString("en", { month: "short", day: "numeric" }),
    reviewed: 18000 + Math.floor(Math.random() * 6000),
    flagged: 800 + Math.floor(Math.random() * 400),
    escalated: 200 + Math.floor(Math.random() * 150),
  };
});
