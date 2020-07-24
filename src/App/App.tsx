import React from 'react';
import './App.scss';
import Display from "../Display/Display"
import Actions from "../Actions/Actions"

import { observer, inject } from "mobx-react"

import background from "./background_night.png"

@inject('dviceStore')
@observer
export default class App extends React.Component{
  componentDidMount() {
    this.wasteTimer()
    this.foodTimer()
  }
  wasteTimer() {
    let timer = Math.floor(10000 + Math.random() * 90000)
    setInterval(() => {
      this.props["dviceStore"].poop()
      timer = Math.floor(10000 + Math.random() * 90000)
    }, timer)
  }
  foodTimer() {
    let timer  = Math.floor(10000 + Math.random() * 90000)
    setInterval(() => {
      this.props["dviceStore"].hungryDigi()
      timer = Math.floor(10000 + Math.random() * 90000)
    }, timer)
  }
  render() {
    return (
      <div className ="App" style = {{
        background: `url(${background}) center bottom / cover no-repeat`
      }}>
        <Actions />
        <Display />
      </div>
    )
  }
}
