import React, { useState } from 'react';

export const PerCalc = () => {
  // const [ratio, setRatio] = useState(0);

  // 元の容量
  const initVal = 0;
  const [val, setVal] = useState(initVal);
  const add = () => setVal(() => parseInt(val) + 1);
  const remove = () => setVal(() => parseInt(val) - 1);
  // const setValue = () => setVal((prevVal) => e.target.value(prevVal));

  //　元容量の足し引き調整
  // const [count, setCount] = useState(0);
  // const increment = () => setCount((pre) => pre + 1);
  // const decrement = () => setCount((prevCount) => prevCount - 1);

  // 元の容量から比率を計算する
  const initCalc = 0;
  const [calc, setCalc] = useState(initCalc);
  // const calcVal = () => setCalc((prev) => prev + 1);

  // リセット
  const reset = () => {
    setVal(() => initVal);
    setCalc(() => initCalc);
    calc = 0;
  };

  // 小数点
  const digit = 1;
  // parseFloat(data.toFixed(digit)
  const digitCalc = (_v) => {
    // return parseFloat(_v.toFixed(digit));
    return Math.floor(_v * Math.pow(10, digit)) / Math.pow(10, digit);
  };

  const num1 = parseInt(val);
  const num2 = parseInt(calc);
  // const ratio = Math.floor((num1 / 100) * num2);
  const ratio = (num1 / 100) * num2;
  // const total = num1 + num2;
  const total = digitCalc(num1 + ratio);

  return (
    <div>
      {/* 比率 */}
      <p>水を基準に1ml=1gを前提とする</p>
      <section>
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
        {/* <button onClick={decrement}>1引く</button> */}
      </section>
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
      {/* 基準 */}
      <section>
        <h2>途中計算:</h2>
        <h3>総容量：{total}g</h3>
        <p>計算したい割合：{calc}%</p>
      </section>
      <section>
        <h2>計算結果</h2>
        {/* <h3>入れるべき数値は： {val ? Math.floor(val / calc) : ''}g</h3> */}
        <h3>入れるべき1剤レジンの重さは： {val}g</h3>
        <h3>入れるべき2液の重さは： {val ? digitCalc(ratio) : ''}g</h3>
      </section>
      {/* リセット */}
      <section>
        <button onClick={reset}>reset</button>
      </section>
    </div>
  );
};
