import React, { useState } from "react";

export const RatioCalc = () => {
  // 小数点
  const digitNum = 2;
  const digitCalcNum = (_v) => {
    return Math.floor(_v * Math.pow(10, digit)) / Math.pow(10, digit);
  };

  // 1剤 元の容量
  const initVal = 0;
  const [val, setVal] = useState(initVal);
  const add = () => setVal(() => parseInt(val) + 1);
  const remove = () => setVal(() => parseInt(val) - 1);

  // ２剤 元の容量から比率を計算する
  const initCalc = 0;
  const [calc, setCalc] = useState(initCalc);

  // 小数点
  const digit = 1;
  const digitCalc = (_v) => {
    return Math.floor(_v * Math.pow(10, digit)) / Math.pow(10, digit);
  };

  const num1 = parseInt(val);
  const num2 = parseInt(calc);
  const ratio = (num1 / 100) * num2;
  const total = digitCalc(num1 + ratio);

// 分数 Fractioｎ
const initFractioNum = 0;
const [frac, setFrac] = useState(initFractioNum);

const fracA = digitCalc(parseInt(val) / frac);
// const fracB = digitCalc(parseInt(val) / frac);


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
            setVal(e.target.value);
          }}
          value={val}
          placeholder={val}
          step="0.1"
        />
        g ↑<button onClick={add}>1足す</button>
        <button onClick={remove}>1引く</button>↓
      </section>
      {/* 比率 分数 */}
      <section>
        <h4>事前に比率A:Bの 割合を出す場合</h4>
        <p>割合A：{fracA}</p>
        <input
          type="number"
          pattern="\d*"
          onChange={(e) => {
            setFrac(e.target.value);
          }}
          placeholder={frac}
        />
      </section>
      <section>
        <p>割合B：{digitCalc(fracA / 100)}</p>
        <input
          type="number"
          pattern="\d*"
          onChange={(e) => {
            setFrac(e.target.value);
          }}
          placeholder={frac}
        />
      </section>

      {/* ２剤のパーセンテージ */}
      <section>
        <h2>２剤のパーセンテージは？:</h2>
        <input
          type="number"
          pattern="\d*"
          onChange={(e) => {
            setCalc(e.target.value);
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
        <h3>入れるべき1剤レジンの重さは： {val}g</h3>
        <h3>入れるべき2液の重さは： {val ? digitCalc(ratio) : ""}g</h3>
      </section>
    </div>
  );
};
