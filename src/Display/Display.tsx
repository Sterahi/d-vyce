import React from 'react'
import './Display.scss'
import {observer, inject} from 'mobx-react'

import speachBubble from "./img/needs/speachBubble.png"

import Animation from "../Animation/Animation"

@inject('dviceStore')
@observer
export default class Display extends React.Component {
    render(){
        const wastePiles = new Array(this.props["dviceStore"].poopCount).fill(null)
        const {sick, hunger} = this.props["dviceStore"].needs

        let sickRender, hungerRender
        if(sick ===1) {
            sickRender = 
                <div className = "bubble" style = {{background: `url(${speachBubble}) center center / cover no-repeat`}}>
                    <Animation images = {['needs/needle_1', 'needs/needle_2']} speed = {500} />
                </div>
        }
        if (hunger >= 1) {
            hungerRender = 
                <div className = "bubble" style = {{background: `url(${speachBubble}) center center / cover no-repeat`}}>
                    <Animation images = {['needs/Meat_full', 'needs/meat_3', 'needs/meat_2', 'needs/meat_1']} speed = {800} />
                </div>
        }
        console.log(this.props["dviceStore"].stats.species)
        return (
            <div className = "Display">
                <div className = "toilet">
                    <div className = "wastePiles">
                        {
                            (wastePiles).map((waste, id) => {
                                return (
                                    <Animation images = {['needs/poop_1', 'needs/poop_2', 'needs/poop_3', "needs/poop_2"]} speed = {500} key = {id}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className = "container">
                    <div className = "needs">
                        {sickRender}
                        {hungerRender}
                    </div>
                    <div className = "partner">
                        <Animation images = {this.props["dviceStore"].partnerImages} speed = {700}/>
                    </div>
                </div>
            </div>
        )
    }
}