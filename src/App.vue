<template>
  <Navbar />
</template>

<script>
import ModalStart from './components/ModalResult.vue';
import ModalResult from './components/ModalResult.vue';
import ModalWager from './components/ModalWager.vue';
import Navbar from './components/Navbar.vue';
import Track from './components/Track.vue';


export default {
  name: 'App',
  components: { ModalStart, ModalResult, ModalWager, Navbar, Track}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
