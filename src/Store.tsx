import {observable, action } from "mobx"
export default class DviceStore {
    @observable poopCount = 0
    @observable hungry = 0
    @observable sick = 0
    constructor() {
        this.poopCount = 0
        this.hungry = 0
    }
    
    @observable stats = {
        strength: 10,
        dexterity: 10,
        mind: 10,
        intelligence: 10,
        stage: 'baby'
    }
    @observable needs = {
        sick: 0,
        hungry: 0,
        evolving: 0
    }
    @action.bound cleanPoop() {
        this.poopCount = 0
    }
    @action.bound poop() {
        if(this.poopCount < 0) {
            this.poopCount = 0
        } else if (this.poopCount < 4) {
            this.poopCount++
        } else {
            this.sick = 1
        }
    }
    @action.bound feedDigi() {
        this.hungry = 0
    }
    @action.bound hungryDigi() {
        if(this.hungry < 0) {
            this.hungry = 0
        } else if (this.hungry < 4) {
            this.hungry++
        } else {
            this.sick = 1
        }
    }
    @action.bound medicine() {
        this.sick = 0
    }
}

export interface DviceProps {
    dviceStore?: {
        poopCount?: number
        hungry?: boolean
        time?: number
        cleanPoop?: Function
        poop?: Function
        feedDigi?: Function
    }
}   