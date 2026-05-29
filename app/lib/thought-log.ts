/**
 * 思考ログのドメイン型（将来 Supabase のテーブル定義に対応）
 */

export type InsightLevel = 1 | 2 | 3 | 4 | 5;

export type ThoughtLogTagId =
  | "work"
  | "life"
  | "habit"
  | "relationship"
  | "learning"
  | "reading";

export type ThoughtLogTag = {
  id: ThoughtLogTagId;
  label: string;
};

export type ThoughtLogQuoteDraft = {
  id: string;
  text: string;
  page: string;
};

/** 作成フォームの入力状態 */
export type ThoughtLogDraft = {
  bookId: string;
  body: string;
  quotes: ThoughtLogQuoteDraft[];
  tagIds: ThoughtLogTagId[];
  insightLevel: InsightLevel;
};

export const THOUGHT_LOG_TAGS: ThoughtLogTag[] = [
  { id: "work", label: "仕事" },
  { id: "life", label: "人生" },
  { id: "habit", label: "習慣" },
  { id: "relationship", label: "人間関係" },
  { id: "learning", label: "学び" },
  { id: "reading", label: "読書" },
];

export const INSIGHT_LEVELS: {
  level: InsightLevel;
  label: string;
}[] = [
  { level: 1, label: "少し気になった" },
  { level: 2, label: "考えさせられた" },
  { level: 3, label: "価値観が動いた" },
  { level: 4, label: "人生観に影響した" },
  { level: 5, label: "忘れたくない" },
];

export const THOUGHT_BODY_HINTS = [
  "どんなことを考えましたか？",
  "何が印象に残りましたか？",
  "自分の人生とどう結びつきましたか？",
] as const;

export const THOUGHT_BODY_PLACEHOLDER = THOUGHT_BODY_HINTS[0];

export function createEmptyThoughtLogDraft(
  bookId: string,
): ThoughtLogDraft {
  return {
    bookId,
    body: "",
    quotes: [],
    tagIds: [],
    insightLevel: 3,
  };
}

export function createQuoteDraft(): ThoughtLogQuoteDraft {
  return {
    id: crypto.randomUUID(),
    text: "",
    page: "",
  };
}

/** 保存済み思考ログの引用（Supabase: thought_log_quotes） */
export type ThoughtLogQuote = {
  id: string;
  text: string;
  page: string;
};

/** 保存済み思考ログ（Supabase: thought_logs） */
export type ThoughtLogDetail = {
  id: string;
  bookId: string;
  body: string;
  quotes: ThoughtLogQuote[];
  tagIds: ThoughtLogTagId[];
  insightLevel: InsightLevel;
  createdAt: string;
  /** 表示用（将来はロケール整形に置き換え） */
  createdAtLabel: {
    date: string;
    time: string;
  };
  /** この思考から生まれた行動（Supabase: thought_log_actions） */
  actions: string[];
};

const thoughtLogs: Record<string, ThoughtLogDetail> = {
  t1: {
    id: "t1",
    bookId: "essentialism",
    body:
      "「やらないこと」を決めることは、自分を守る行為だと感じた。\n\n" +
      "何でも引き受けてしまう癖があり、本当に大切なことへの集中が薄まっていた。" +
      "本質的でない仕事や誘いを断る練習が、未来の自分への投資になると思えた。",
    quotes: [
      {
        id: "q1",
        text: "「やらないこと」を決める勇気が、本当の集中をつくる。",
        page: "p.42",
      },
    ],
    tagIds: ["life", "learning", "reading"],
    insightLevel: 4,
    createdAt: "2026-05-29T10:32:00+09:00",
    createdAtLabel: { date: "2026年5月29日", time: "10:32" },
    actions: ["毎朝読書15分", "週次で「やらないこと」リストを見直す"],
  },
  t2: {
    id: "t2",
    bookId: "essentialism",
    body:
      "自分の時間を取り戻すには、境界線を引く必要がある。\n\n" +
      "スマホの通知が思考を奪っていた。読書の前に30分は通知を切るルールを試してみたい。",
    quotes: [
      {
        id: "q1",
        text: "選択とは、何かを捨てることである。",
        page: "p.78",
      },
    ],
    tagIds: ["habit", "life"],
    insightLevel: 3,
    createdAt: "2026-05-28T22:15:00+09:00",
    createdAtLabel: { date: "2026年5月28日", time: "22:15" },
    actions: ["スマホ時間削減", "就寝1時間前は画面を見ない"],
  },
  t3: {
    id: "t3",
    bookId: "essentialism",
    body:
      "週次レビューで優先順位を見直す習慣をつけたい。\n\n" +
      "忙しい週ほど、本当に大切なことが後回しになる。静かな時間に棚卸しする。",
    quotes: [],
    tagIds: ["work", "habit", "learning"],
    insightLevel: 2,
    createdAt: "2026-05-24T19:00:00+09:00",
    createdAtLabel: { date: "2026年5月24日", time: "19:00" },
    actions: [],
  },
  t4: {
    id: "t4",
    bookId: "atomic_habits",
    body:
      "自分の課題は、自分の勇気で引き受ける。\n\n" +
      "環境を変えれば、意志力に頼らずに行動を変えられる。小さな一歩が複利になる。",
    quotes: [
      {
        id: "q1",
        text: "習慣は、複利のように効く。",
        page: "p.18",
      },
    ],
    tagIds: ["life", "habit", "learning"],
    insightLevel: 5,
    createdAt: "2026-05-20T08:10:00+09:00",
    createdAtLabel: { date: "2026年5月20日", time: "08:10" },
    actions: ["朝の5分ルーティンを設計する", "悪い習慣は「見えない」ようにする"],
  },
  t5: {
    id: "t5",
    bookId: "atomic_habits",
    body: "集中は環境で設計できる。デスクの上を一度空にして、読書のための場所だけを残した。",
    quotes: [],
    tagIds: ["habit", "reading"],
    insightLevel: 3,
    createdAt: "2026-05-15T21:30:00+09:00",
    createdAtLabel: { date: "2026年5月15日", time: "21:30" },
    actions: ["読書コーナーを整える"],
  },
};

export function getThoughtLogById(id: string): ThoughtLogDetail | undefined {
  return thoughtLogs[id];
}

export function getAllThoughtLogs(): ThoughtLogDetail[] {
  return Object.values(thoughtLogs).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getTagLabel(id: ThoughtLogTagId): string {
  return THOUGHT_LOG_TAGS.find((t) => t.id === id)?.label ?? id;
}

export function getInsightLevelLabel(level: InsightLevel): string {
  return INSIGHT_LEVELS.find((l) => l.level === level)?.label ?? "";
}

/** 一覧表示用の短いタイトル */
export function getThoughtLogPreviewTitle(log: ThoughtLogDetail): string {
  const firstLine = log.body.split("\n").find((l) => l.trim())?.trim() ?? "";
  return firstLine.length > 36 ? `${firstLine.slice(0, 36)}…` : firstLine;
}
