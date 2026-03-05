'use client' // 错误边界必须是客户端组件
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 将错误记录到错误报告服务
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>出错了！</h2>
      <button
        onClick={
          // 尝试通过重新渲染段来恢复
          () => reset()
        }
      >
        重试
      </button>
    </div>
  )
}