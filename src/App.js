import React from 'react';
import { PerCalc } from './components/PerCalc';
import { Parents } from './components/money/Parents';
import './style.css';

export default function App() {
  return (
    <div>
      <h1>割合計算</h1>
      <PerCalc />
      {/* <hr />
      <h1>Hell Pocket Money</h1>
      <Parents /> */}
    </div>
  );
}
