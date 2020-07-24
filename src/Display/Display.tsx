import React from 'react'
import './Display.scss'
import {observer, inject} from 'mobx-react'

// TODO: update image grabs
import kuramon_1 from './img/kuramon-1.png'
import kuramon_2 from './img/kuramon-2.png'
import poop from './img/poop.png'
// import speachBubble from "./img/needs/speachBubble.png"

import Animation from "../Animation/Animation"
@inject('dviceStore')
@observer
export default class Display extends React.Component {
    render(){
        const wastePiles = new Array(this.props["dviceStore"].poopCount).fill(null)
        const imageClass =  "sprite " + this.props["dviceStore"].stats.stage
        return (
            <div className = "Display">
                <div>
                    <div className = "wastePiles">
                        {
                            (wastePiles).map((waste, id) => {
                                return (
                                    <Animation images = {['needs/poop_1', 'needs/poop_2', 'needs/poop_3', "needs/poop_2"]} />
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className = "needs">
                    </div>
                </div>
                <div className = "partner">
                    <Animation images = {['Partners/kuramon-1', 'Partners/kuramon-2']} speed = {700}/>
                </div>
            </div>
        )
    }
}