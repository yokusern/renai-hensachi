import type { GenericQuestion } from "@/lib/generic-types";

// 5軸: techSkill(技術力) / portfolio(ポートフォリオ力) / commu(コミュ力) / industryUnderstanding(業界理解) / autonomy(自走力)
// A=3 B=2 C=1 D=0

function opt(label: string, key: string, val: number): GenericQuestion["options"][number] {
  return {
    label,
    scores: { techSkill: 0, portfolio: 0, commu: 0, industryUnderstanding: 0, autonomy: 0, [key]: val },
  };
}

export const shukatsuItQuestions: GenericQuestion[] = [
  // ── 技術力 Q1-Q5 ──
  {
    id: "si01",
    text: "プログラミング言語を複数使い、フルスタック的に開発できる？",
    options: [
      opt("フロントエンドからバックエンド・インフラまで一通り開発できる", "techSkill", 3),
      opt("1〜2つの言語でWebアプリが作れる程度", "techSkill", 2),
      opt("学習中で、簡単なものなら作れる", "techSkill", 1),
      opt("まだ入門・基礎学習の段階", "techSkill", 0),
    ],
  },
  {
    id: "si02",
    text: "GitでPR・コードレビュー・ブランチ管理の経験がある？",
    options: [
      opt("PR・レビュー・ブランチ管理の実務的な経験がある", "techSkill", 3),
      opt("GitHubは使っているが、個人開発のみ（mainブランチのみ）", "techSkill", 2),
      opt("Gitの基本コマンドは知っているが、あまり使っていない", "techSkill", 1),
      opt("Gitをほぼ使ったことがない", "techSkill", 0),
    ],
  },
  {
    id: "si03",
    text: "自分で開発したアプリを本番環境にデプロイして運用している？",
    options: [
      opt("複数のサービスを本番にデプロイし、実際に公開・運用している", "techSkill", 3),
      opt("1〜2つ、デプロイ経験がある", "techSkill", 2),
      opt("ローカルでは動くが、デプロイはしたことがない", "techSkill", 1),
      opt("まだデプロイ経験がない", "techSkill", 0),
    ],
  },
  {
    id: "si04",
    text: "競技プログラミング（AtCoder等）やアルゴリズム問題を定期的に解いている？",
    options: [
      opt("AtCoder緑以上、または定期的に問題を解いている", "techSkill", 3),
      opt("少し解いたことがあるが、習慣ではない", "techSkill", 2),
      opt("挑戦したいとは思っているが、まだしていない", "techSkill", 1),
      opt("競技プログラミングに興味がない・知らない", "techSkill", 0),
    ],
  },
  {
    id: "si05",
    text: "技術的な問題にぶつかったとき、英語のドキュメントやソースコードを読んで自己解決できる？",
    options: [
      opt("英語のドキュメント・GitHubのIssueも参照して自己解決できる", "techSkill", 3),
      opt("日本語の記事で解決できることが多い", "techSkill", 2),
      opt("Stack Overflowのコピペで何とかなることが多い", "techSkill", 1),
      opt("エラーが出るとすぐに人に聞いてしまうことが多い", "techSkill", 0),
    ],
  },

  // ── ポートフォリオ力 Q6-Q10 ──
  {
    id: "si06",
    text: "GitHubに毎日（または週5日以上）コントリビューションしている？",
    options: [
      opt("毎日コントリビューションがあり、草が生えている", "portfolio", 3),
      opt("週数回はコミットしている", "portfolio", 2),
      opt("月1〜数回程度", "portfolio", 1),
      opt("GitHubをほぼ更新していない", "portfolio", 0),
    ],
  },
  {
    id: "si07",
    text: "オリジナルのサービスを3つ以上、本番環境に公開している？",
    options: [
      opt("3つ以上のオリジナルサービスを本番デプロイして公開している", "portfolio", 3),
      opt("1〜2つのサービスを公開している", "portfolio", 2),
      opt("ポートフォリオは準備中・完成間近", "portfolio", 1),
      opt("公開できるものがまだない", "portfolio", 0),
    ],
  },
  {
    id: "si08",
    text: "Qiita・Zenn・個人ブログなどで技術記事を継続的に書いている？",
    options: [
      opt("定期的に発信し、読まれている記事がある", "portfolio", 3),
      opt("数本書いたことがある", "portfolio", 2),
      opt("書こうとは思っているが、まだ書いていない", "portfolio", 1),
      opt("技術記事を書いたことがない", "portfolio", 0),
    ],
  },
  {
    id: "si09",
    text: "OSSへのコントリビューション（PR送付・Issue報告等）経験がある？",
    options: [
      opt("採用されたPRがある", "portfolio", 3),
      opt("IssueやDiscussionに参加したことはある", "portfolio", 2),
      opt("OSSコントリビューションに興味はあるが、まだしていない", "portfolio", 1),
      opt("あまり知らない・したことがない", "portfolio", 0),
    ],
  },
  {
    id: "si10",
    text: "ポートフォリオの各作品で「なぜそれを作ったか」を説明できる？",
    options: [
      opt("課題・技術的な挑戦・学んだことを明確に言語化して説明できる", "portfolio", 3),
      opt("機能の説明はできるが「なぜ」の部分が薄い", "portfolio", 2),
      opt("課題で作ったものが多く、理由が説明しにくい", "portfolio", 1),
      opt("まだ説明できるものがない", "portfolio", 0),
    ],
  },

  // ── コミュ力 Q11-Q15 ──
  {
    id: "si11",
    text: "技術的な内容を、エンジニアでない人に分かりやすく説明できる？",
    options: [
      opt("図・例え話を使って、相手の理解度に合わせて説明できる", "commu", 3),
      opt("なんとか説明はできるが、相手が「？」な顔をすることがある", "commu", 2),
      opt("難しいと感じて、うまく説明できないことが多い", "commu", 1),
      opt("非エンジニアに技術を説明した経験がほぼない", "commu", 0),
    ],
  },
  {
    id: "si12",
    text: "チーム開発で意見の相違があったとき、建設的に合意形成できる？",
    options: [
      opt("自分の意見をデータ・論拠と共に示しつつ、相手の意見も取り入れられる", "commu", 3),
      opt("発言はできるが、合意形成するのが難しいことがある", "commu", 2),
      opt("対立を避けて、相手の意見に合わせがち", "commu", 1),
      opt("チーム開発経験がほぼない", "commu", 0),
    ],
  },
  {
    id: "si13",
    text: "面接で自分の技術スタック・開発物を、技術選定の理由まで含めて説明できる？",
    options: [
      opt("デモや図を交えながら、技術選定の理由まで含めて話せる", "commu", 3),
      opt("説明はできるが、深掘りされると詰まることがある", "commu", 2),
      opt("自分の言葉で説明するのが苦手", "commu", 1),
      opt("面接経験がほぼなく、準備できていない", "commu", 0),
    ],
  },
  {
    id: "si14",
    text: "コードレビューで指摘を受けたとき、建設的に受け取れる？",
    options: [
      opt("指摘を改善のチャンスとして受け取り、不明点は質問もする", "commu", 3),
      opt("受け取れるが、少し気になることもある", "commu", 2),
      opt("指摘を受けると落ち込みやすい", "commu", 1),
      opt("コードレビュー経験がない", "commu", 0),
    ],
  },
  {
    id: "si15",
    text: "英語の技術ドキュメントを読んで、要点を他人に説明できる？",
    options: [
      opt("英語で読んで、日本語で要点をまとめてチームに共有できる", "commu", 3),
      opt("読めはするが、説明するのは苦手", "commu", 2),
      opt("読むのに時間がかかり、読解に集中するので手いっぱい", "commu", 1),
      opt("英語の技術文書を読んだことがほぼない", "commu", 0),
    ],
  },

  // ── 業界理解 Q16-Q20 ──
  {
    id: "si16",
    text: "2025〜2026年のIT業界トレンドを3つ以上、具体的に説明できる？",
    options: [
      opt("AIエージェント・LLMアプリ・量子コンピューティング等、具体的に説明できる", "industryUnderstanding", 3),
      opt("2つ程度は知っている", "industryUnderstanding", 2),
      opt("なんとなくAIが流行っていることは知っている", "industryUnderstanding", 1),
      opt("IT業界のトレンドをほぼフォローしていない", "industryUnderstanding", 0),
    ],
  },
  {
    id: "si17",
    text: "志望企業の技術スタック（言語・フレームワーク・インフラ）を把握し、学習も進めている？",
    options: [
      opt("社員ブログ・OSS・採用ページから詳しく把握し、学習も進めている", "industryUnderstanding", 3),
      opt("採用ページで確認した程度", "industryUnderstanding", 2),
      opt("なんとなく知っているが、確認したことはない", "industryUnderstanding", 1),
      opt("調べたことがない", "industryUnderstanding", 0),
    ],
  },
  {
    id: "si18",
    text: "SIer・SaaSベンダー・スタートアップの違いと、自分に合う環境を説明できる？",
    options: [
      opt("3者の違い・メリデメ・向いている人を説明した上で、自分の志向を語れる", "industryUnderstanding", 3),
      opt("違いは分かるが、自分への当てはめが難しい", "industryUnderstanding", 2),
      opt("なんとなく知っているが、言語化が難しい", "industryUnderstanding", 1),
      opt("あまり考えていない", "industryUnderstanding", 0),
    ],
  },
  {
    id: "si19",
    text: "GitHubトレンド・Hacker News等のエンジニアコミュニティを日常的にチェックしている？",
    options: [
      opt("毎日チェックし、気になるリポジトリやスレッドに反応している", "industryUnderstanding", 3),
      opt("週1〜2回は確認している", "industryUnderstanding", 2),
      opt("たまに見る程度", "industryUnderstanding", 1),
      opt("ほぼ見ていない", "industryUnderstanding", 0),
    ],
  },
  {
    id: "si20",
    text: "AIによる開発変革（コード生成・AIペアプログラミング等）の影響を自分の言葉で語れる？",
    options: [
      opt("自分でAIツールを実際に使い、メリット・デメリット・今後の変化を語れる", "industryUnderstanding", 3),
      opt("使ったことはあるが、業界への影響は深く考えていない", "industryUnderstanding", 2),
      opt("知識はあるが、自分では使っていない", "industryUnderstanding", 1),
      opt("あまり考えていない", "industryUnderstanding", 0),
    ],
  },

  // ── 自走力 Q21-Q25 ──
  {
    id: "si21",
    text: "「作りたいもの」が先にあり、そのために必要なスキルを自分で調べて身につけてきた？",
    options: [
      opt("作りたいものが先にあり、そのためにスキルを身につけてきた", "autonomy", 3),
      opt("作りたいものが後から生まれ、今は自走している", "autonomy", 2),
      opt("授業・就職のためが主で、作りたいものはまだない", "autonomy", 1),
      opt("カリキュラムに沿って勉強してきた", "autonomy", 0),
    ],
  },
  {
    id: "si22",
    text: "業務外・授業外で、新しい技術やツールを週1以上自分で試している？",
    options: [
      opt("週1以上、新しい技術を試してGitHubに上げている", "autonomy", 3),
      opt("月1〜2回は何かを試している", "autonomy", 2),
      opt("試したいとは思うが、なかなかできていない", "autonomy", 1),
      opt("業務・授業以外での学習はほぼしていない", "autonomy", 0),
    ],
  },
  {
    id: "si23",
    text: "開発で詰まったとき、最低2〜3時間は自分で調べ尽くしてから人に聞く？",
    options: [
      opt("最低2〜3時間は自分で調べ尽くしてから、詰まったと認める", "autonomy", 3),
      opt("1時間くらいは粘る", "autonomy", 2),
      opt("30分程度で人に聞くか諦めることが多い", "autonomy", 1),
      opt("詰まったらすぐに聞く（効率重視）", "autonomy", 0),
    ],
  },
  {
    id: "si24",
    text: "自分のエンジニアとしての弱みを把握し、具体的な改善プランがある？",
    options: [
      opt("弱みを具体的に把握し、何を学ぶかの計画がある", "autonomy", 3),
      opt("弱みは分かるが、改善プランが明確でない", "autonomy", 2),
      opt("なんとなく苦手なことは分かるが、特に対策していない", "autonomy", 1),
      opt("弱みを深く考えたことがない", "autonomy", 0),
    ],
  },
  {
    id: "si25",
    text: "失敗（バグ・リリース失敗・チームの問題）から学んだ教訓を言語化して記録している？",
    options: [
      opt("失敗ごとに振り返り、再発防止策をドキュメントに残している", "autonomy", 3),
      opt("記録は残さないが、失敗から学ぶ意識はある", "autonomy", 2),
      opt("失敗はあまり振り返らない", "autonomy", 1),
      opt("失敗を振り返る習慣がない", "autonomy", 0),
    ],
  },
];
