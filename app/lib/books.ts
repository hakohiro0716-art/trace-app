export type ReadingStatus = "backlog" | "reading" | "finished";

export type BookQuote = {
  id: string;
  text: string;
  page: string;
  addedAt: string;
};

export type BookThoughtLog = {
  id: string;
  title: string;
  meta: string;
};

export type BookTakeaways = {
  learnings: string[];
  insights: string[];
  memorable: string[];
};

export type BookDetail = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  status: ReadingStatus;
  progress: number;
  startedAt: string | null;
  finishedAt: string | null;
  takeaways: BookTakeaways;
  quotes: BookQuote[];
  thoughtLogs: BookThoughtLog[];
};

export const readingStatusLabel: Record<ReadingStatus, string> = {
  backlog: "積読",
  reading: "読書中",
  finished: "読了",
};

const books: Record<string, BookDetail> = {
  essentialism: {
    id: "essentialism",
    title: "エッセンシャル思考",
    subtitle: "最少の時間で成果を最大にする",
    author: "グレッグ・マキューン",
    category: "ビジネス・自己啓発",
    status: "reading",
    progress: 0.48,
    startedAt: "2026年4月12日",
    finishedAt: null,
    takeaways: {
      learnings: [
        "本当に大切なことだけに集中するためには、意図的に「やらないこと」を選ぶ必要がある。",
        "選択とは、何かを得ることではなく、多くの良い選択肢を手放すことだと理解した。",
      ],
      insights: [
        "忙しさは成果の証ではなく、優先順位が曖昧なサインかもしれない。",
        "「全部やる」は勇気ではなく、本質から目をそらす行為になりうる。",
      ],
      memorable: [
        "本質的でないものに「ノー」と言える人だけが、本質的なことに「イエス」と言える。",
        "より少なく、しかしより良く。",
      ],
    },
    quotes: [
      {
        id: "q1",
        text: "「やらないこと」を決める勇気が、本当の集中をつくる。",
        page: "p.42",
        addedAt: "2026年5月 20日",
      },
      {
        id: "q2",
        text: "選択とは、何かを捨てることである。",
        page: "p.78",
        addedAt: "2026年5月 24日",
      },
      {
        id: "q3",
        text: "本質的でないものに「ノー」と言える人だけが、本質的なことに「イエス」と言える。",
        page: "p.112",
        addedAt: "2026年5月 27日",
      },
    ],
    thoughtLogs: [
      {
        id: "t1",
        title: "「やらないこと」を決める勇気",
        meta: "今日 10:32",
      },
      {
        id: "t2",
        title: "自分の時間を取り戻すには",
        meta: "昨日 22:15",
      },
      {
        id: "t3",
        title: "週次レビューで優先順位を見直す",
        meta: "5月 24日",
      },
    ],
  },
  atomic_habits: {
    id: "atomic_habits",
    title: "ジェームズ・クリアー式 複利で伸びる１つの習慣",
    subtitle: "Atomic Habits",
    author: "ジェームズ・クリアー",
    category: "習慣・心理学",
    status: "finished",
    progress: 1,
    startedAt: "2026年1月8日",
    finishedAt: "2026年3月2日",
    takeaways: {
      learnings: [
        "習慣は目標ではなく、なりたい自分への投票である。",
        "小さな改善が時間とともに複利で効いてくる。",
      ],
      insights: [
        "環境を変えるほど、意志力に頼る必要が減る。",
        "アイデンティティベースの習慣は、続ける理由を内側に持てる。",
      ],
      memorable: [
        "1%の改善が、1年後には37倍になる。",
        "習慣の積み重ねが、あなたの人生の複利になる。",
      ],
    },
    quotes: [
      {
        id: "q1",
        text: "習慣は、複利のように効く。",
        page: "p.18",
        addedAt: "2026年2月 10日",
      },
      {
        id: "q2",
        text: "目標を達成するのは一時的な変化だ。システムを変えるのは永続的な変化だ。",
        page: "p.27",
        addedAt: "2026年2月 22日",
      },
    ],
    thoughtLogs: [
      {
        id: "t1",
        title: "朝の5分ルーティンを設計する",
        meta: "2月 18日",
      },
      {
        id: "t2",
        title: "悪い習慣は「見えない」ようにする",
        meta: "2月 25日",
      },
    ],
  },
  deep_work: {
    id: "deep_work",
    title: "DEEP WORK",
    subtitle: "深い仕事に集中する技術",
    author: "カル・ニューポート",
    category: "仕事術",
    status: "backlog",
    progress: 0,
    startedAt: null,
    finishedAt: null,
    takeaways: {
      learnings: [],
      insights: [],
      memorable: [],
    },
    quotes: [],
    thoughtLogs: [],
  },
};

export function getBookById(id: string): BookDetail | undefined {
  return books[id];
}

export function getAllBooks(): BookDetail[] {
  return Object.values(books);
}

export const defaultBookId = "essentialism";
