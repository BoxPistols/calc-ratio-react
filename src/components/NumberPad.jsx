import React from "react"

export const NumberPad = ({ value, onChange, label, unit = "g" }) => {
  const handleNumberClick = (num) => {
    const currentValue = value === "0" ? "" : value.toString()
    const newValue = currentValue + num
    onChange(newValue)
  }

  const handleClear = () => {
    onChange("0")
  }

  const handleBackspace = () => {
    const currentValue = value.toString()
    const newValue = currentValue.slice(0, -1)
    onChange(newValue || "0")
  }

  const handleDot = () => {
    const currentValue = value.toString()
    if (!currentValue.includes(".")) {
      onChange(currentValue + ".")
    }
  }

  return (
    <div className="number-pad">
      <div className="number-pad-header">
        <label>{label}</label>
        <div className="number-display">
          <span className="number-value">{value || 0}</span>
          <span className="number-unit">{unit}</span>
        </div>
      </div>
      <div className="number-pad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="number-btn"
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </button>
        ))}
        <button className="number-btn number-btn-dot" onClick={handleDot}>
          .
        </button>
        <button
          className="number-btn"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button className="number-btn number-btn-clear" onClick={handleBackspace}>
          ←
        </button>
      </div>
      <div className="number-pad-actions">
        <button className="action-btn action-btn-clear" onClick={handleClear}>
          クリア
        </button>
        <button
          className="action-btn action-btn-plus"
          onClick={() => onChange((parseFloat(value) + 1).toString())}
        >
          +1
        </button>
        <button
          className="action-btn action-btn-minus"
          onClick={() => onChange(Math.max(0, parseFloat(value) - 1).toString())}
        >
          -1
        </button>
      </div>
    </div>
  )
}
