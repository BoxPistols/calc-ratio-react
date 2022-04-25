import React, { useState } from "react"

export const RatioCalc = () => {
  // 小数点
  const digitNum = 2
  const digitCalcNum = (_v) => {
    return Math.floor(_v * Math.pow(10, digit)) / Math.pow(10, digit)
  }

  // 1剤 元の容量
  const initVal = 0
  const [val, setVal] = useState(initVal)
  const add = () => setVal(() => parseInt(val) + 1)
  const remove = () => setVal(() => parseInt(val) - 1)

  // ２剤 元の容量から比率を計算する
  const initCalc = 0
  const [calc, setCalc] = useState(initCalc)

  // 小数点
  const digit = 1
  const digitCalc = (_v) => {
    return Math.floor(_v * Math.pow(10, digit)) / Math.pow(10, digit)
  }

  const num1 = parseInt(val)
  const num2 = parseInt(calc)
  const ratio = (num1 / 100) * num2
  const total = digitCalc(num1 + ratio)

  // 分数 Fractioｎ
  // A
  const initFractioNum = 0
  const [frac, setFrac] = useState(initFractioNum)
  // B
  const initFractioNum2 = 0
  const [frac2, setFrac2] = useState(initFractioNum2)

  const fracA = digitCalc(parseInt(val) / frac)
  const fracB = val - fracA


  return (
    <div>
      {/* 比率 */}
      <p>水を基準に1ml=1gを前提とする</p>
      <section>
        {/* 1剤のレジンの重さ */}
        <h2>1剤のレジンの重さは？</h2>
        <input
          type="number"
          pattern="\d*"
          onChange={(e) => {
            setVal(e.target.value)
          }}
          value={val}
          placeholder={val}
          step="0.1"
        />
        g ↑<button onClick={add}>1足す</button>
        <button onClick={remove}>1引く</button>↓
      </section>

      <br />
      {/* 比率 分数 */}
      <hr />
      <section>
        <h4>事前に比率 1剤:2剤 の 割合を出す場合</h4>
        <div className="flex flex-ai-center">
          <p>多きい方の割合</p>
          <b>
            <input
              type="number"
              pattern="\d*"
              onChange={(e) => {
                setFrac(e.target.value)
              }}
              placeholder={frac}
            /></b>
          ({fracB ? fracB : "xxx"} g)
          &nbsp;対&nbsp;
          <p>&nbsp;<b>1</b> = {fracA ? fracA : "xxx"} g</p>
        </div>
        <p>
          <h4>総容量：{total}g</h4>
        </p>
      </section>
      <hr />
      <br />

      {/* ２剤のパーセンテージ */}
      <section>
        <h2>２剤のパーセンテージは？:</h2>
        <input
          type="number"
          pattern="\d*"
          onChange={(e) => {
            setCalc(e.target.value)
          }}
          placeholder={calc}
          step="0.1"
        />
      </section>
      {/* 計算 */}
      <section>
        <h2>途中計算:</h2>
        <h3>総容量：{total}g</h3>
        <p>計算したい割合：{calc}%</p>
      </section>
      <section>
        <h2>計算結果</h2>
        <div className="flex flex-ai-center">
          入れるべき<b>1剤レジン</b>の重さは： <h3>{val}g</h3>
        </div>
        <div className="flex flex-ai-center">
          入れるべき<b>2液</b>の重さは：<h3> {val ? digitCalc(ratio) : ""}g</h3>
        </div>
      </section>
    </div>
  )
}

/*
  function fraction() {
    var a = Number(document.getElementById("hoge").value);
    var b = Number(document.getElementById("fuga").value);
    (function (a, b) {
      for (var i = Math.min(a, b); i > 1; i--) {
        if (a % i == 0 && b % i == 0) {
          a = a / i;
          b = b / i;
          return arguments.callee(a, b);
        }
      }
      document.getElementById("hoge2").value = a;
      document.getElementById("fuga2").value = b;
    })(a, b)
  }
  <input id="hoge" type="number"/>:<input id="fuga" type="number"/>
  <input type="button" value="=" onclick="fraction();"/>
  <input id="hoge2" type="number"/>:<input id="fuga2" type="number"/>
 */
