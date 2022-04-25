import React from "react"
import { RatioCalc } from "./components/ratio/RatioCalc"
// import { Parents } from './components/money/Parents';
import "./style.scss"

export default function App() {
  return (
    <div>
      <h1>薬剤比率計算機</h1>
      <RatioCalc />
    </div>
  )
}
