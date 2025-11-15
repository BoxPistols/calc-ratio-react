import { useState, useEffect } from "react"

// localStorageを使いやすくするカスタムフック
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// 計算履歴の管理
export const useCalculationHistory = () => {
  const [history, setHistory] = useLocalStorage("calc-history", [])

  const addHistory = (calculation) => {
    const newHistory = [
      {
        ...calculation,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      },
      ...history,
    ].slice(0, 20) // 最新20件まで保存
    setHistory(newHistory)
  }

  const deleteHistory = (id) => {
    setHistory(history.filter((item) => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
  }

  return { history, addHistory, deleteHistory, clearHistory }
}

// プリセット（よく使う計算式）の管理
export const usePresets = () => {
  const [presets, setPresets] = useLocalStorage("calc-presets", [])

  const addPreset = (preset) => {
    const newPreset = {
      ...preset,
      id: Date.now(),
    }
    setPresets([...presets, newPreset])
  }

  const updatePreset = (id, updatedPreset) => {
    setPresets(
      presets.map((preset) =>
        preset.id === id ? { ...preset, ...updatedPreset } : preset
      )
    )
  }

  const deletePreset = (id) => {
    setPresets(presets.filter((preset) => preset.id !== id))
  }

  return { presets, addPreset, updatePreset, deletePreset }
}

// メモの管理
export const useMemos = () => {
  const [memos, setMemos] = useLocalStorage("calc-memos", [])

  const addMemo = (text) => {
    const newMemo = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString(),
    }
    setMemos([...memos, newMemo])
  }

  const updateMemo = (id, text) => {
    setMemos(memos.map((memo) => (memo.id === id ? { ...memo, text } : memo)))
  }

  const deleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id))
  }

  return { memos, addMemo, updateMemo, deleteMemo }
}
