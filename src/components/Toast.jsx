import React, { useEffect } from "react"

export const Toast = ({ message, show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, onClose, duration])

  if (!show) return null

  return (
    <div className="toast">
      <div className="toast-content">{message}</div>
    </div>
  )
}
