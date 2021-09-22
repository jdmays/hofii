<template>

  <div>
      <input id="wageramt" 
      name="wageramt" 
      ref="wagerAmt" 
      type="number" 
      v-model="wagerAmt" 
      class="peer h-10 w-full border border-1.5 rounded-md focus:shadow-outline" />

      <input id="dogId" 
      name="dogId" 
      ref="dogId" 
      type="text" 
      v-model="dogId" 
      class="peer h-10 w-full border border-1.5 rounded-md focus:shadow-outline" />

    <button @click="acceptWager" 
    class="bg-blue-600 disabled:opacity-50 hover:bg-blue-200 text-white hover:text-blue-600 py-2 font-bold px-4 rounded-lg">
    Start Race</button>



  </div>
</template>

<script>
export default {
    name: 'modalwager',
   // props: ['dogId','wagerAmt'],
    data() {
        return {
            dogId: 0,
            wagerAmt: null
        }
    },
    methods: {
    acceptWager() {
        this.$emit("dogId", this.dogId);
        this.$emit("wagerAmt", this.wagerAmt);
    }
}

}
</script>

<style>

</style>