import React, { useState } from "react"
import { NumberPad } from "../NumberPad"
import { Toast } from "../Toast"
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
  const [activeInput, setActiveInput] = useState("total")
  const [activeTab, setActiveTab] = useState("calc")
  const [presetName, setPresetName] = useState("")
  const [newMemo, setNewMemo] = useState("")
  const [toast, setToast] = useState({ show: false, message: "" })

  // localStorage hooks
  const { history, addHistory, deleteHistory, clearHistory } =
    useCalculationHistory()
  const { presets, addPreset, deletePreset } = usePresets()
  const { memos, addMemo, deleteMemo } = useMemos()

  // ユーティリティ関数
  const digitCalc = (value, digit = 1) => {
    return Math.round(value * Math.pow(10, digit)) / Math.pow(10, digit)
  }

  const parseValue = (value) => parseFloat(value) || 0

  // 計算ロジック
  const num1 = parseValue(totalWeight)
  const r1 = parseValue(ratio1)
  const r2 = parseValue(ratio2)
  const totalRatio = r1 + r2

  const result1 = totalRatio > 0 ? digitCalc((num1 * r1) / totalRatio) : 0
  const result2 = totalRatio > 0 ? digitCalc((num1 * r2) / totalRatio) : 0
  const calculatedTotal = digitCalc(result1 + result2)

  // イベントハンドラー
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

  const showToast = (message) => {
    setToast({ show: true, message })
  }

  const handleSavePreset = () => {
    if (presetName && r1 > 0 && r2 > 0) {
      addPreset({
        name: presetName,
        ratio1: r1,
        ratio2: r2,
      })
      setPresetName("")
      showToast("プリセットを保存しました")
    }
  }

  const loadPreset = (preset) => {
    setRatio1(preset.ratio1.toString())
    setRatio2(preset.ratio2.toString())
    setActiveTab("calc")
  }

  const loadFromHistory = (item) => {
    setTotalWeight(item.totalWeight.toString())
    setRatio1(item.ratio1.toString())
    setRatio2(item.ratio2.toString())
    setActiveTab("calc")
  }

  const handleAddMemo = () => {
    if (newMemo.trim()) {
      addMemo(newMemo)
      setNewMemo("")
    }
  }

  const handleReset = () => {
    setTotalWeight("0")
    setRatio1("0")
    setRatio2("0")
  }

  const handleInputChange = (field) => (value) => {
    switch (field) {
      case "total":
        setTotalWeight(value)
        break
      case "ratio1":
        setRatio1(value)
        break
      case "ratio2":
        setRatio2(value)
        break
      default:
        break
    }
  }

  return (
    <div className="ratio-calc">
      {/* タブナビゲーション */}
      <div className="tab-navigation">
        <button
          type="button"
          className={`tab-btn ${activeTab === "calc" ? "active" : ""}`}
          onClick={() => setActiveTab("calc")}
        >
          計算
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          履歴
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === "presets" ? "active" : ""}`}
          onClick={() => setActiveTab("presets")}
        >
          プリセット
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === "memos" ? "active" : ""}`}
          onClick={() => setActiveTab("memos")}
        >
          メモ
        </button>
      </div>

      {/* メイン計算画面 */}
      {activeTab === "calc" && (
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
              type="button"
              className={`input-select-btn ${activeInput === "total" ? "active" : ""}`}
              onClick={() => setActiveInput("total")}
            >
              全体の重さ: <strong>{totalWeight}g</strong>
            </button>
            <button
              type="button"
              className={`input-select-btn ${activeInput === "ratio1" ? "active" : ""}`}
              onClick={() => setActiveInput("ratio1")}
            >
              比率1: <strong>{ratio1}</strong>
            </button>
            <button
              type="button"
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
            <button type="button" className="btn btn-primary" onClick={saveToHistory}>
              履歴に保存
            </button>
            <button
              type="button"
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
            <button type="button" className="btn btn-save" onClick={handleSavePreset}>
              プリセット保存
            </button>
          </div>
        </div>
      )}

      {/* 履歴画面 */}
      {activeTab === "history" && (
        <div className="history-panel">
          <div className="panel-header">
            <h2>計算履歴</h2>
            <button type="button" className="btn btn-danger-sm" onClick={clearHistory}>
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
                      type="button"
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
                    type="button"
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
      {activeTab === "presets" && (
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
                      type="button"
                      className="btn btn-primary-sm"
                      onClick={() => loadPreset(preset)}
                    >
                      使用
                    </button>
                    <button
                      type="button"
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
      {activeTab === "memos" && (
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
            <button type="button" className="btn btn-primary" onClick={handleAddMemo}>
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
                      type="button"
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

      {/* トースト通知 */}
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />
    </div>
  )
}
