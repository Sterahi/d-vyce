import React from 'react'
import {observer, inject} from 'mobx-react'

import Animation from "../Animation/Animation"

import './Actions.scss'

@inject('dviceStore')
@observer
export default class Actions extends React.Component {

    render() {
        return (
            <div className = "Actions">
                <div className = "button" onClick = {this.props["dviceStore"].cleanPoop}>
                    <Animation images = {['needs/poop_1', 'needs/poop_2', 'needs/poop_3', "needs/poop_2"]} speed = {500} /> 
                    Clean
                </div>
                <div className = "button" onClick = {this.props["dviceStore"].feedDigi}>
                    <Animation images = {['needs/Meat_full', 'needs/meat_3', 'needs/meat_2', 'needs/meat_1']} speed = {800} /> 
                    Feed
                </div>
                <div className = "button" onClick = {this.props["dviceStore"].medicine}>
                    <Animation images = {['needs/needle_1', 'needs/needle_2']} speed = {500} /> 
                    Medicine
                </div>
            </div>
        )
    }
}