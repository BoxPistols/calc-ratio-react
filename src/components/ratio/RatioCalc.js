import React, { useState, useEffect } from "react"
import { NumberPad } from "../NumberPad"
import {
  useCalculationHistory,
  usePresets,
  useMemos,
} from "../../hooks/useLocalStorage"

export const RatioCalc = () => {
  // 状態管理
  const [totalWeight, setTotalWeight] = useState("0")
  const [ratio1, setRatio1] = useState("0")
  const [ratio2, setRatio2] = useState("0")
  const [activeInput, setActiveInput] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [showMemos, setShowMemos] = useState(false)
  const [presetName, setPresetName] = useState("")
  const [newMemo, setNewMemo] = useState("")

  // localStorage hooks
  const { history, addHistory, deleteHistory, clearHistory } =
    useCalculationHistory()
  const { presets, addPreset, deletePreset } = usePresets()
  const { memos, addMemo, updateMemo, deleteMemo } = useMemos()

  // 小数点処理
  const digitCalc = (value, digit = 1) => {
    return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit)
  }

  // 計算
  const num1 = parseFloat(totalWeight) || 0
  const r1 = parseFloat(ratio1) || 0
  const r2 = parseFloat(ratio2) || 0
  const totalRatio = r1 + r2

  const result1 = totalRatio > 0 ? digitCalc((num1 * r1) / totalRatio) : 0
  const result2 = totalRatio > 0 ? digitCalc((num1 * r2) / totalRatio) : 0
  const calculatedTotal = digitCalc(result1 + result2)

  // 計算結果を履歴に保存
  const saveToHistory = () => {
    if (result1 > 0 && result2 > 0) {
      addHistory({
        totalWeight: num1,
        ratio1: r1,
        ratio2: r2,
        result1,
        result2,
        total: calculatedTotal,
      })
    }
  }

  // プリセットを保存
  const handleSavePreset = () => {
    if (presetName && r1 > 0 && r2 > 0) {
      addPreset({
        name: presetName,
        ratio1: r1,
        ratio2: r2,
      })
      setPresetName("")
      alert("プリセットを保存しました")
    }
  }

  // プリセットを読み込み
  const loadPreset = (preset) => {
    setRatio1(preset.ratio1.toString())
    setRatio2(preset.ratio2.toString())
    setShowPresets(false)
  }

  // 履歴から読み込み
  const loadFromHistory = (item) => {
    setTotalWeight(item.totalWeight.toString())
    setRatio1(item.ratio1.toString())
    setRatio2(item.ratio2.toString())
    setShowHistory(false)
  }

  // メモを追加
  const handleAddMemo = () => {
    if (newMemo.trim()) {
      addMemo(newMemo)
      setNewMemo("")
    }
  }

  return (
    <div className="ratio-calc">
      {/* タブナビゲーション */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${!showHistory && !showPresets && !showMemos ? "active" : ""}`}
          onClick={() => {
            setShowHistory(false)
            setShowPresets(false)
            setShowMemos(false)
          }}
        >
          計算
        </button>
        <button
          className={`tab-btn ${showHistory ? "active" : ""}`}
          onClick={() => {
            setShowHistory(true)
            setShowPresets(false)
            setShowMemos(false)
          }}
        >
          履歴
        </button>
        <button
          className={`tab-btn ${showPresets ? "active" : ""}`}
          onClick={() => {
            setShowHistory(false)
            setShowPresets(true)
            setShowMemos(false)
          }}
        >
          プリセット
        </button>
        <button
          className={`tab-btn ${showMemos ? "active" : ""}`}
          onClick={() => {
            setShowHistory(false)
            setShowPresets(false)
            setShowMemos(true)
          }}
        >
          メモ
        </button>
      </div>

      {/* メイン計算画面 */}
      {!showHistory && !showPresets && !showMemos && (
        <div className="calc-main">
          <div className="info-banner">水を基準に1ml=1gを前提とする</div>

          {/* 計算結果表示エリア */}
          <div className="result-panel">
            <div className="result-item">
              <span className="result-label">総容量</span>
              <span className="result-value total">{calculatedTotal}g</span>
            </div>
            <div className="result-divider">→</div>
            <div className="result-item">
              <span className="result-label">1剤</span>
              <span className="result-value agent1">{result1}g</span>
            </div>
            <div className="result-divider">+</div>
            <div className="result-item">
              <span className="result-label">2剤</span>
              <span className="result-value agent2">{result2}g</span>
            </div>
          </div>

          {/* 入力エリア選択ボタン */}
          <div className="input-selector">
            <button
              className={`input-select-btn ${activeInput === "total" ? "active" : ""}`}
              onClick={() => setActiveInput("total")}
            >
              全体の重さ: <strong>{totalWeight}g</strong>
            </button>
            <button
              className={`input-select-btn ${activeInput === "ratio1" ? "active" : ""}`}
              onClick={() => setActiveInput("ratio1")}
            >
              比率1: <strong>{ratio1}</strong>
            </button>
            <button
              className={`input-select-btn ${activeInput === "ratio2" ? "active" : ""}`}
              onClick={() => setActiveInput("ratio2")}
            >
              比率2: <strong>{ratio2}</strong>
            </button>
          </div>

          {/* 数字パッド */}
          {activeInput && (
            <div className="number-pad-container">
              {activeInput === "total" && (
                <NumberPad
                  value={totalWeight}
                  onChange={setTotalWeight}
                  label="作成する全体の重さ"
                  unit="g"
                />
              )}
              {activeInput === "ratio1" && (
                <NumberPad
                  value={ratio1}
                  onChange={setRatio1}
                  label="1剤の比率"
                  unit=""
                />
              )}
              {activeInput === "ratio2" && (
                <NumberPad
                  value={ratio2}
                  onChange={setRatio2}
                  label="2剤の比率"
                  unit=""
                />
              )}
            </div>
          )}

          {/* アクションボタン */}
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={saveToHistory}>
              履歴に保存
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setTotalWeight("0")
                setRatio1("0")
                setRatio2("0")
              }}
            >
              リセット
            </button>
          </div>

          {/* プリセット保存 */}
          <div className="preset-save-section">
            <input
              type="text"
              className="preset-name-input"
              placeholder="この比率に名前をつけて保存"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
            />
            <button className="btn btn-save" onClick={handleSavePreset}>
              プリセット保存
            </button>
          </div>
        </div>
      )}

      {/* 履歴画面 */}
      {showHistory && (
        <div className="history-panel">
          <div className="panel-header">
            <h2>計算履歴</h2>
            <button className="btn btn-danger-sm" onClick={clearHistory}>
              全削除
            </button>
          </div>
          {history.length === 0 ? (
            <p className="empty-message">履歴がありません</p>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-header">
                    <span className="history-date">
                      {new Date(item.timestamp).toLocaleString("ja-JP")}
                    </span>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => deleteHistory(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="history-content">
                    <div className="history-row">
                      <span>総容量: {item.totalWeight}g</span>
                      <span>
                        比率: {item.ratio1}:{item.ratio2}
                      </span>
                    </div>
                    <div className="history-row">
                      <span className="agent1">1剤: {item.result1}g</span>
                      <span className="agent2">2剤: {item.result2}g</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-load"
                    onClick={() => loadFromHistory(item)}
                  >
                    この計算を読み込む
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* プリセット画面 */}
      {showPresets && (
        <div className="presets-panel">
          <div className="panel-header">
            <h2>よく使う比率</h2>
          </div>
          {presets.length === 0 ? (
            <p className="empty-message">
              プリセットがありません。計算画面で保存してください。
            </p>
          ) : (
            <div className="presets-list">
              {presets.map((preset) => (
                <div key={preset.id} className="preset-item">
                  <div className="preset-content">
                    <h3>{preset.name}</h3>
                    <p>
                      比率: {preset.ratio1}:{preset.ratio2}
                    </p>
                  </div>
                  <div className="preset-actions">
                    <button
                      className="btn btn-primary-sm"
                      onClick={() => loadPreset(preset)}
                    >
                      使用
                    </button>
                    <button
                      className="btn btn-danger-sm"
                      onClick={() => deletePreset(preset.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* メモ画面 */}
      {showMemos && (
        <div className="memos-panel">
          <div className="panel-header">
            <h2>備考メモ</h2>
          </div>
          <div className="memo-input-section">
            <textarea
              className="memo-textarea"
              placeholder="メモを入力..."
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddMemo}>
              メモを追加
            </button>
          </div>
          {memos.length === 0 ? (
            <p className="empty-message">メモがありません</p>
          ) : (
            <div className="memos-list">
              {memos.map((memo) => (
                <div key={memo.id} className="memo-item">
                  <div className="memo-header">
                    <span className="memo-date">
                      {new Date(memo.timestamp).toLocaleString("ja-JP")}
                    </span>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => deleteMemo(memo.id)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="memo-text">{memo.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
