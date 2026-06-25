'use client'
import Script from 'next/script'

// ⚠️ Ghost Comment ダッシュボードでプロジェクトを作成し、
//    取得したProject IDをここに設定してください。
//    https://ghost-comment-six.vercel.app/dashboard
const HENSACHI_PROJECT_ID = 'YOUR_PROJECT_ID_HERE'

interface Props {
  color: string
  delay?: number
  prompt?: string
}

export function GhostCommentWidget({
  color,
  delay = 8,
  prompt = 'このテスト、どうでした？',
}: Props) {
  if (HENSACHI_PROJECT_ID === 'YOUR_PROJECT_ID_HERE') return null

  return (
    <Script
      id="ghost-comment-widget"
      src="https://ghost-comment-six.vercel.app/widget.js"
      strategy="lazyOnload"
      data-project-id={HENSACHI_PROJECT_ID}
      data-color={color}
      data-prompt={prompt}
      data-delay={String(delay)}
      data-locale="ja"
    />
  )
}
