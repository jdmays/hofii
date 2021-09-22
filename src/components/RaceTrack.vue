<template>
<div v-if="showModalWager">
  <ModalWager @acceptWager="acceptWager" :dogId="dogId" :wagerAmt="wagerAmt" />
</div>
    <button @click="showWager" 
    class="bg-blue-600 disabled:opacity-50 hover:bg-blue-200 text-white hover:text-blue-600 py-2 font-bold px-4 rounded-lg">
    Wager</button>



</template>

<script>
import ModalStart from './ModalResult.vue';
import ModalResult from './ModalResult.vue';
import ModalWager from './ModalWager.vue';



export default {
name: 'track',
components: { ModalStart, ModalResult, ModalWager },
data() {
    return {
        dogId: 0,
        wagerAmt: null,
        acctAmt: 10000,
        showModalWager: false
    }
},
methods: {
    acceptWager: function(params) {
        this.wagerAmt = params.wagerAmt;
        this.dogId = params.dogId;
        console.log("dogID", this.dogId);
    },
    showWager() {
        this.showModalWager = !this.showModalWager;
    }
}

}
</script>

<style>

</style>