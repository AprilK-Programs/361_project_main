'use strict'
/**
 * Code adopted from CS 290 lectures
 */
class Character{
    /**
     * @param {string} name
     * @param {string} gender
     * @param {number} gold
     * @param {number} health
     */
    constructor(name, gender, gold, health){
        this.name = name;
        this.gender = gender;
        this.gold = gold;
        this.health = health
    }

    /**
     * Get Functions
     */

    get charName(){
        return this.name;
    }
    get charGen(){
        return this.gender;
    }
    get charGold(){
        return this.gold;
    }
    get charHealth(){
        return this.health
    }

    /**
     * Set Functions
     */
    set charName(nameInput){
        this.name = nameInput;
    }
    set charGen(genInput){
        this.gender = genInput;
    }
    set charGold(goldInput){
        this.gold = goldInput;
    }
    set charHealth(healthInput){
        this.health = healthInput;
    }
    /**
     * initial character
     */
    
}
// get current input character
const currentCharacter = window.serverCurrentCharacter

// make class instance of current user character
const c1 = new Character(
    currentCharacter.name,
    currentCharacter.gender,
    currentCharacter.gold,
    currentCharacter.health
);
console.log('current character:  ${c1.charName})')