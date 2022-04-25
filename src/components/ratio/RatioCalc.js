import React, { useState } from "react"

export const RatioCalc = () => {
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

  // 値を数値に変換、小数点以下を四捨五入
  let pVal = parseInt(val)
  const num1 = pVal
  const num2 = parseInt(calc)
  const ratio = (num1 / 100) * num2
  const total = digitCalc(num1 + ratio)

  // 分数 Fractioｎ
  /**
   * 分数　    分母　       分子
   * fraction denominator numerator
   *
   */

  // 分数計算の元
  /* ------ 分数を計算 ------ */
  // 分子の役割
  const initFrac = 0
  const [frac, setFrac] = useState(initFrac)
  const pFlac = parseInt(frac)

  // 分母の役割
  const initFrac2 = 0
  const [frac2, setFrac2] = useState(initFrac2)
  const pFlac2 = parseInt(frac2)

  // これを元に分子/分母を計算
  // 一旦合計を出す
  const totalFrac = pFlac + pFlac2
  const fractionDenominator = digitCalc((pVal * pFlac) / totalFrac)
  const fractionNumerator = digitCalc((pVal * pFlac2) / totalFrac)
  const totalFracCalc = digitCalc(fractionDenominator + fractionNumerator)

  // jsx
  return (
    <div>
      {/* info */}
      <p>水を基準に1ml=1gを前提とする</p>

      <hr />
      <section>
        {/* 1剤のレジンの重さ */}
        {/* <h2>1剤レジンの重さ：初期設定</h2> */}
        <h2>作成する全体の重さ</h2>
        <div className="flex flex-ai-baseline">
          <input
            type="number"
            pattern="\d*"
            onChange={(e) => {
              setVal(e.target.value)
            }}
            value={val}
            placeholder={val}
            // step="0.1"
          />
          <p>g</p>
        </div>

        <div className="dummy">
          <div>微調整したい時：</div>
          <div className="flex">
            <button onClick={add}>+1足す</button>
            <button onClick={remove}>-1引く</button>
          </div>
        </div>
      </section>
      <hr />
      {/* 比率計算 */}
      <section>
        <h2>1剤:2剤の比率</h2>
        {/* <h4>事前に比ｓ率 1剤:2剤 の 割合を出す場合</h4> */}
        <div className="flex flex-ai-center">
          {/* 分母 */}
          <div className="flex flex-column flex-jc-center flex-ai-center">
            <div>分母の数</div>
            <input
              type="number"
              pattern="\d*"
              onChange={(e) => {
                setFrac(e.target.value)
              }}
              placeholder={frac}
              // step="0.1"
            />
            <div className="calcNow">
              1剤:<b>{fractionDenominator}</b>g
            </div>
          </div>
          <div className="flex flex-column">:</div>
          {/* 分子 */}
          <div className="flex flex-column flex-jc-center flex-ai-center">
            <div>分子の数</div>
            <input
              type="number"
              pattern="\d*"
              onChange={(e) => {
                setFrac2(e.target.value)
              }}
              placeholder={frac2}
              // step="0.1"
            />
            <div className="calcNow">
              2剤:<b>{fractionNumerator}</b>g
            </div>
          </div>
        </div>
        <p>総容量：{totalFracCalc}g</p>
      </section>
      <hr />

      {/* ２剤のパーセンテージ */}
      <section>
        <h2>２剤の割合：容量</h2>
        <h3 className="flex">{fractionNumerator ? fractionNumerator : ""}g</h3>
      </section>
      {/* 計算 */}
      <section>
        <h2>最終計算結果</h2>
        <ul>
          <li>
            <div className="list">
              <div>総容量の再確認：</div>
              <div className="final num ">{total}g</div>
            </div>
          </li>
          <li>
            <div className="list">
              <div>
                入れる<b>1剤レジン</b>の重さは：
              </div>
              <div className="final num num-1">
                {fractionDenominator ? fractionDenominator : ""}
              </div>
              <p>g</p>
            </div>
          </li>
          <li>
            <div className="list">
              <div>
                入れる<b>2液</b>の重さは：
              </div>
              <div className="final num num-2">
                {fractionNumerator ? fractionNumerator : ""}
              </div>
              <p>g</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}

/**
  <div className="wrap">
    <h1>比率</h1>
    foo:<input type="number" id="foo" /> <br />
    <br />
    hoge<input type="number" id="hoge" /> : fuga<input type="number" id="fuga" />
    <br />
    <input type="button" defaultValue="計算" onclick="res();" /> <br />
    hoge<input type="number" id="hoge2" /> : fuga2<input type="number" id="fuga2" />
    <br />
    Bar:
    <div id="bar">xxx</div>
  </div>
*/

/*
function res() {
  const a = Number(document.getElementById("hoge").value);
  const b = Number(document.getElementById("fuga").value);
  const t = Number(document.getElementById("foo").value);

  (function (a, b) {
    for (let i = Math.min(a, b); i > 1; i--) {
      if (a % i == 0 && b % i == 0) {
        a = i / a ;
        b = i / b ;
        return arguments.callee(a, b);
      }
    }
    let cal = t / (a + b)
    document.getElementById("hoge2").value = Math.floor(cal * a);
    document.getElementById("fuga2").value = Math.floor(cal * b) ;
    const bar = document.getElementById("bar").innerHTML = cal * a + cal * b;
  })(a, b, t)
}
*/

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
