import React from 'react'
import './Display.scss'

import {observer, inject} from 'mobx-react'

import kuramon_1 from './img/kuramon-1.png'
import kuramon_2 from './img/kuramon-2.png'
import poop from './img/poop.png'

import speachBubble from "./img/needs/speachBubble.png"
export interface Readonly {
    poopCount: number
}
@inject('dviceStore')
@observer
export default class Display extends React.Component {
    state = {
        image: kuramon_1
    }
    animation() {
        setInterval(() => {
            if(this.state.image === kuramon_1) {
                this.setState({
                    image: kuramon_2
                })
            } else {
                this.setState({
                    image: kuramon_1
                })
            }
        }, 700)
    }
    componentDidMount() {
        this.animation()
    }

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
                                    <img className = "waste" src = {poop} draggable = 'false' key = {id} alt = "poop" />
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
                    {/* TODO: add in needs (steal assets from Spriters /) */}
                    <img className = {imageClass} src = {this.state.image} draggable = 'false' alt = '' />
                </div>
            </div>
        )
    }
}