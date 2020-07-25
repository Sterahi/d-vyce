import {observable, action } from "mobx"
export default class DviceStore {
    @observable poopCount = 0
    constructor() {
        this.poopCount = 0
    }
    
    @observable stats = {
        strength: 10,
        dexterity: 10,
        mind: 3,
        intelligence: 3,
        stage: 1,
        species: 'botamon'
    }
    @observable needs = {
        sick: 0,
        hunger: 0,
        evolving: 0
    }
    @observable partnerImages = [
        `Partners/${this.stats.species}_1`,
        `Partners/${this.stats.species}_2`
    ]

    @action.bound cleanPoop() {
        this.poopCount = 0
    }
    @action.bound poop() {
        if(this.poopCount < 0) {
            this.poopCount = 0
        } else if (this.poopCount <= 3) {
            this.poopCount++
        } else {
            this.needs.sick = 1
        }
    }
    @action.bound feedDigi() {
        // setInterval(() => {
        this.partnerImages = [
            `Partners/${this.stats.species}_eat_1`,
            `Partners/${this.stats.species}_eat_2`
        ]
        // }, 1400)
        this.needs.hunger--
        setTimeout(() => {
            this.partnerImages =  [
                `Partners/${this.stats.species}_1`,
                `Partners/${this.stats.species}_2`
            ]
        }, 5000)
    }
    @action.bound hungryDigi() {
        if(this.needs.hunger < 0) {
            this.needs.hunger = 0
        } else if (this.needs.hunger < 4) {
            this.needs.hunger++
        } else {
            this.needs.sick = 1
        }
    }
    @action.bound medicine() {
        this.needs.sick = 0
    }

    @action species(evolution) {
        this.stats.species = evolution
        this.stats.stage++
        this.partnerImages = [
            `Partners/${this.stats.species}_1`,
            `Partners/${this.stats.species}_2`
        ]
    }
    @action train(stat) {
        this.stats[stat] +=5
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