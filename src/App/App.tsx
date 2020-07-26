import React from 'react';
import './App.scss';
import Display from "../Display/Display"
import Actions from "../Actions/Actions"

import { observer, inject } from "mobx-react"
import { DateTime } from "luxon"

import background from "./background_night.png"
import data from "./v1.json"
@inject('dviceStore')
@observer
export default class App extends React.Component{
  componentDidMount() {
    this.timer()
    this.evoCheck()
    this.wasteCheck()
    this.foodCheck()
    this.props["dviceStore"].setStore()
  }
  timer() {
    setInterval(() => {
      this.evoCheck()
      this.wasteCheck()
      this.foodCheck()
      this.props["dviceStore"].setStore()
    // }, 100)
    }, 60000)
  }
  wasteCheck() {
    if(this.props["dviceStore"].nextPoopTime <= DateTime.local().toSeconds()) {
      this.props["dviceStore"].poop()
    }
  }
  foodCheck() {
    if(this.props["dviceStore"].nextHungerTime <= DateTime.local().toSeconds()) {
      this.props["dviceStore"].poop()
    }
  }
  evoCheck() {
    if(this.props["dviceStore"].evolutionTime <= DateTime.local().toSeconds()) {
      const evoData = data[this.props["dviceStore"].stats.species].evolutions
      const stats = this.props["dviceStore"].stats
      evoData.forEach(evo => {
        Object.keys(evo.stats).forEach(targetStats => {
          if(stats[targetStats] >= evo.stats[targetStats]){
            this.props["dviceStore"].species(evo.name.toLowerCase())
            this.props["dviceStore"].evolutionTime = this.props["dviceStore"].evolutionTime[this.props["dviceStore"].stats.stage]
          }
        })
      })
    }
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
