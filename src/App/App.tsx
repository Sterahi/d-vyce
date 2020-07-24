import React from 'react';
import './App.scss';
import Display from "../Display/Display"
import Actions from "../Actions/Actions"

import { observer, inject } from "mobx-react"

import background from "./background_night.png"
import data from "./v1.json"
@inject('dviceStore')
@observer
export default class App extends React.Component{
  componentDidMount() {
    this.wasteTimer()
    this.foodTimer()
    this.evoTimer()
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
  evoTimer() {
    let stats 
    setInterval(() => {
      const evoData = data[this.props["dviceStore"].stats.species].evolutions
      stats = this.props["dviceStore"].stats
      evoData.forEach(evo => {
        if(evo.stats.dexterity <= stats.dexterity){
          this.props["dviceStore"].species(evo.name.toLowerCase())
        } else if (evo.stats.strength <= stats.strength) {
          this.props["dviceStore"].species(evo.name.toLowerCase())
        } else if (evo.stats.intelligence <= stats.intelligence){
          this.props["dviceStore"].species(evo.name.toLowerCase())
        } else if (evo.stats.mind <= stats.mind) {
          this.props["dviceStore"].species(evo.name.toLowerCase())
        }
        console.log(stats)
      });
    }, 10000)
  // }, (100 * 60 * 60))
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
