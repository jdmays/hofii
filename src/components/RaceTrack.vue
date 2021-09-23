<template>

<!-- shows the current account balance. I thought they might miss it if it was up in the header -->
<div class="flex justify-center items-center" v-if="!showModalWager && !readyToRace">
    <span class="text-blue-600 font-bold py-2">Account Balance: ${{ acctAmt }}</span>
</div>

<!-- a convenient place to say, hey, it's over pal. -->
<div class="justify-center items-center" v-if="noMorePlay">
    <span class="text-blue-600 font-bold py-2">Sadly, you've lost.  It's Over. </span>
    <p> <button @click="resetAll" class="bg-blue-600 
    hover:bg-blue-200 text-white hover:text-blue-600 py-2 font-bold px-4 rounded-lg">Play Again</button></p>
</div>


<!-- they have to do this before anything else -->
<div v-if="!showModalStart && !readyToRace && !showModalWager && !noMorePlay">
    <button @click="toggleModalWager" class="bg-blue-600 
    hover:bg-blue-200 text-white hover:text-blue-600 py-2 font-bold px-4 rounded-lg">Place Your Bet to Start</button>
</div>


<!-- triggers the race -->
<div v-if="readyToRace && !raceOver">
    <button @click="runDogs" :disabled="isDisabled" 
    class="bg-blue-600 disabled:opacity-50 hover:bg-blue-200 text-white hover:text-blue-600 py-2 font-bold px-4 rounded-lg">
    Start Race</button>
</div>


<div v-if="showModalWager">
<ModalWager @placeBet="closeWager" @cancelBet="stopPlaying" :wager="wager" :dogId="wager.dogId" :wagerAmt="wager.wagerAmt" />
</div>


<div class="top-0 p-2 mx-auto">

     <div v-if="showModalStart">
        <ModalStart @closeModal="toggleModalStart"/>
    </div>

    <div v-if="raceOver">
        <ModalResult @playAgain="playAgain" @stopPlaying="stopPlaying" :msg="msg" :resultMsg="resultMsg" :commentMsg="commentMsg" :resultActions="resultActions" :acctAmt="acctAmt"/>
    </div>

  <div v-if="!showModalStart && !showModalWager && !raceOver">


   <main role="main" ref="racetrack" class="w-full px-2 space-y-0">
<!-- these are static not dynamic as I originally intended.  Could not get dynamically assigned images to show -->
            <div class="text-left py-0 dogz" id="dog1" dog2_id="dog1_id">
            <img class="transform scale-75" src="@/assets/dachs1.png" /> 
            <span class="pl-8">{{dogNames[0]}}</span>
            </div>

            <div class="text-left py-0 dogz" id="dog2" dog2_id="dog2_id">
            <img class="transform scale-75" src="../assets/dachs2.png" alt="">
            <span class="pl-8">{{dogNames[1]}}</span>
            </div>

            <div class="text-left py-0 dogz" id="dog3" doc3_id="dog3_id">
            <img class="transform scale-75" src="../assets/dachs3.png" alt="">
            <span class="pl-8">{{dogNames[2]}}</span>
            </div>

            <div class="text-left dogz" id="dog4" dog4_id="dog4_id">
            <img class="transform scale-75" src="../assets/dachs4.png" alt="">
            <span class="pl-8">{{dogNames[3]}}</span>
            </div>

            <div class="text-left dogz" id="dog5" dog4_id="dog5_id">
            <img class="transform scale-75" src="../assets/dachs5.png" alt="">
            <span class="pl-8">{{dogNames[4]}}</span>
            </div>

            <div class="text-left py-0 dogz" id="dog6" dog6_id="dog6_id">
            <img class="transform scale-75" src="../assets/dachs6.png" alt="">
            <span class="pl-8">{{dogNames[5]}}</span>
            </div>

        </main>


        </div>
        </div>

</template>

<script>
import congratsData from "../data/congrats.json";
import consolesData from "../data/consoles.json";


import ModalStart from './ModalStart.vue';
import ModalResult from './ModalResult.vue';
import ModalWager from './ModalWager.vue';



import { gsap } from "gsap"

export default {
name: 'Track',
components: {
    ModalStart, ModalResult, ModalWager
},
data() {
    return {
        wager: {
            wagerAmt: null,
            dogId: null
        },
        congratsData: null, // A little sentence that they see randomly after each race
        dogSpeed: [1,2,3,4,5,6], // this determines who will win
        winnerId: 0, // the winner
        windowWidth: 0, // to keep the dogs from running off the end of the page
        numRaces: 0, // originally used in order to be able to reduce the randomness of the races
        showModalStart: true, //the very first modal when the app is opened
        showResult: false,
        showModalWager: false,
        acctAmt: 10000,
        isDisabled: true,
        raceOver: false,
        msg: null,
        resultMsg: null,
        commentMsg: null,
        resultActions: null,
        readyToRace: false,
        wagerAmtIsBad: false,
        noMorePlay: false,
        errmsg: [],
        dogNames: ['Seabiscuit','Native Dancer','Bust-a-Move','Doctor Strange','Zenyatta','Tabasco Cat','War Emblem','Jack','Lexie']
    }
},
methods: {
        /* closes the wager modal after betting has taken place */
        closeWager() {
            this.acctAmt  = localStorage.getItem('acctAmt');
            this.showModalWager = false;
            this.readyToRace = true;
            let wa = this.wager.wagerAmt;
            wa = parseInt(wa);
            this.wager.wagerAmt = wa;
            localStorage.setItem('wagerAmt',this.wager.wagerAmt);
            localStorage.setItem('dogId',this.wager.dogId);
        },
        /* lets them do it again */
        playAgain() {
            this.raceOver = false;
            this.readyToRace = false;
            this.wager.dogId = 0;
            this.wager.wagerAmt = '';
            if (this.acctAmt < 1) {
            this.noMorePlay = true;
            } else {
            this.noMorePlay = false;
            }
        },
        /* basically like quit */
        stopPlaying() {
            this.raceOver = false;
            this.readyToRace = false;
            this.showModalStart = true;
            this.showModalWager = false;
            this.wager.wagerAmt = '';
           // this.acctAmt = 0;
            this.wager.dogId = 0;
        },
        resetAll() {
            this.wager.wagerAmt = 0;
            this.acctAmt = 10000;
            this.noMorePlay = false;
            localStorage.setItem('wagerAmt',0);
            localStorage.setItem('dogId',0);

            this.showModalStart = !this.showModalStart
        },
        cancelWager() {
            this.showModalWager = !this.showModalWager;
            this.readytoRace = false;
        },  
        toggleDogBio() {
            this.showDogBio = !this.showDogBio
        },
        toggleModalStart() {
            this.showModalStart = !this.showModalStart
            this.acctAmt = 10000;
            },
        toggleModalWager() {
            this.resetDogs()
            this.showModalWager = !this.showModalWager
            this.isDisabled = false
            },
       getWindowWidth() {
           this.windowWidth = this.$refs.racetrack.clientWidth - 175
            },
         /* starts the race */   
       runDogs() {
           // shuffles the dogSpeed array to get the next winner
           this.shuffle(this.dogSpeed)
           this.getWindowWidth();
           // would've established a cycle to mess with the randomness
           this.numRaces++;
           if( this.numRaces > 6) {
            this.numRaces = 1;
           }
           // stores the race number
           localStorage.setItem('numRaces',this.numRaces)

            if (this.numRaces == 1) {
            this.dogId = localStorage.getItem('dogId');
            }

        this.determineWinner(this.dogSpeed)
        gsap.to("#dog1", {x: this.windowWidth, duration: this.dogSpeed[0]});
        gsap.to('#dog2', {x: this.windowWidth, duration: this.dogSpeed[1]})
        gsap.to('#dog3', {x: this.windowWidth, duration: this.dogSpeed[2]})
        gsap.to('#dog4', {x: this.windowWidth, duration: this.dogSpeed[3]})
        gsap.to('#dog5', {x: this.windowWidth, duration: this.dogSpeed[4]})
        gsap.to('#dog6', {x: this.windowWidth, duration: this.dogSpeed[5]})  
        // to prevent the rather jarring transition after the game is over.    
        setTimeout(() => {  this.raceOver = true }, 6000);
       },
        resetDogs() {
        localStorage.setItem('dogId',0)
        localStorage.setItem('wagerAmt',0)
        localStorage.setItem('winnerId',0)
       
        gsap.to('#dog1', {rotation: 360,x: 0, duration: 1})
        gsap.to('#dog2', {rotation: 360,x: 0, duration: 1})
        gsap.to('#dog3', {rotation: 360,x: 0, duration: 1})
        gsap.to('#dog4', {rotation: 360,rotation: 360, x: 0, duration: 0.6})
        gsap.to('#dog5', {rotation: 360,x: 0, duration: 1})
        gsap.to('#dog6', {rotation: 360,x: 0, duration: 1})
       },
       shuffle(arr) {
        let m = arr.length;
            while (m) {
                const i = Math.floor(Math.random() * m--);
                [arr[m], arr[i]] = [arr[i], arr[m]];
            }
                this.numRaces  = localStorage.getItem('numRaces');
                this.wager.dogId  = localStorage.getItem('dogId');
                this.winnerId=arr.indexOf(Math.min.apply(null,arr)) + 1
                this.dogSpeed = arr;
        },
       determineWinner(arr) {
        this.winnerId=arr.indexOf(Math.min.apply(null,arr)) + 1      
        this.msg = this.dogNames[this.winnerId] + " is the Winner!"

            if (this.winnerId == this.wager.dogId) {   
            this.resultMsg = "You wagered correctly!"
            this.totalAcct = Number(this.acctAmt) + Number(this.wager.wagerAmt);
            this.commentMsg = congratsData[Math.floor(Math.random() * 10)];
            this.acctAmt = this.totalAcct;
            localStorage.setItem('acctAmt',this.acctAmt)
            localStorage.setItem('wagerAmt',0)
            } else {
            this.totalAcct = Number(this.acctAmt) - Number(this.wager.wagerAmt);
            this.acctAmt = this.totalAcct;
            localStorage.setItem('acctAmt',this.acctAmt)
            this.resultMsg = "You lost."
            this.commentMsg = consolesData[Math.floor(Math.random() * 10)];
            localStorage.setItem('wagerAmt',0)
        }

       }
},
mounted() {
    this.congratsData = congratsData;
    this.consolesData = consolesData;
    localStorage.setItem('dogId',0)
    localStorage.setItem('wagerAmt',0)
    localStorage.setItem('winnerId',0)
    //this.dogsData = dogsData;
    localStorage.setItem('acctAmt',this.acctAmt);
}

}
</script>

<style>


</style>