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
    }, 1000)
    // }, 60000)
  }
  wasteCheck() {
    if(this.props["dviceStore"].nextPoopTime <= DateTime.local().toSeconds()) {
      this.props["dviceStore"].poop()
      this.props["dviceStore"].nextPoopTime = DateTime.local().plus({hours: 1}).toSeconds()
    }
  }
  foodCheck() {
    if(this.props["dviceStore"].nextHungerTime <= DateTime.local().toSeconds()) {
      this.props["dviceStore"].hungryDigi()
      this.props["dviceStore"].nextHungerTime = DateTime.local().plus({hours: 1}).toSeconds()
    }
  }
  evoCheck() {
    if(this.props["dviceStore"].evolutionTime <= DateTime.local().toSeconds()) {
      const evoData = data[this.props["dviceStore"].stats.species].evolutions
      const stats = this.props["dviceStore"].stats
      evoData.forEach(evo => {
        const evoTimes = {
        //   "1": DateTime.local().plus({hours: 1}).toSeconds(),
        //   "2": DateTime.local().plus({hours: 12}).toSeconds(),
        //   "3": DateTime.local().plus({days: 2}).toSeconds(),
        //   "4": DateTime.local().plus({days: 3}).toSeconds(),
        //   "5": DateTime.local().plus({days: 10}).toSeconds()
        "1": DateTime.local().plus({seconds: 15}).toSeconds(),
        "2": DateTime.local().plus({seconds: 15}).toSeconds(),
        "3": DateTime.local().plus({seconds: 15}).toSeconds(),
        "4": DateTime.local().plus({seconds: 15}).toSeconds(),
        "5": DateTime.local().plus({seconds: 15}).toSeconds(),
        "6": DateTime.local().plus({seconds: 15}).toSeconds(),
        }
        if(this.props["dviceStore"].evolutionTime === undefined) {
          this.props["dviceStore"].evolutionTime = evoTimes[this.props["dviceStore"].stats.stage]
        }
        Object.keys(evo.stats).forEach(targetStats => {
          if(stats[targetStats] >= evo.stats[targetStats]){
            this.props["dviceStore"].species(evo.name.toLowerCase())
            this.props["dviceStore"].evolutionTime = DateTime.local().plus({seconds: 15}).toSeconds()
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
