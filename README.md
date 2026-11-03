# Claude Code で Agent Skills 作成ハンズオン

2026-11-20（金）15:00〜18:00 のハンズオンで使う作業フォルダです。

- プロンプト集（Notion）: https://app.notion.com/p/Claude-Code-Agent-Skills-2026-11-20-408deaa733f081ca8948fea6568275ba
- 同じ中身のファイル: [プロンプト集.md](%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E9%9B%86.md) （Notion が開けないときに）

## はじめ方

ターミナル（Windows は PowerShell）に、そのまま貼ります。Mac も Windows も同じ文面です。

```text
cd ~
git clone https://github.com/tnakajo42/agent-skills-handson.git
cd agent-skills-handson
claude plugin install skill-creator@claude-plugins-official
claude
```

ホームフォルダに agent-skills-handson ができて、その中で Claude Code が起動します。続きはプロンプト集の「0 Claude Code に貼る」からです。

## 中身

| 場所 | 中身 |
|---|---|
| プロンプト集.md | 当日貼る依頼文（Notion のプロンプト集と同じ） |
| materials/ | 題材の資料（会議メモ・ヒアリングメモ） |
| theme/handson.css | スライドの見た目（Marp のテーマ） |
| kit/ | 講師版のスキル3本と完成見本（間に合わないときに乗り換える） |
| .claude/skills/ | 自分で作るスキルの置き場所 |

## うまくいかないとき

- git clone できない: 講師に予備の zip をもらうか、この画面の Code → Download ZIP で取得。展開したフォルダの名前を agent-skills-handson に変えてホームフォルダに置き、その中で claude を起動
- skill-creator が入らない: Claude Code の入力欄で `/plugin marketplace add anthropics/claude-plugins-official` のあと `/plugin install skill-creator@claude-plugins-official`
- Node.js が古い: Node.js 24 以上（22 系なら 22.20 以上）を入れる。間に合わなければ講師の画面を見て進める
- 「already exists」と出る: 同じ名前のフォルダが既にある。そのフォルダの名前を agent-skills-handson-old などに変えてから、もう一度貼る

題材の会社・人物・数字はすべて架空です。
