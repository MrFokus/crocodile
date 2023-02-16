<template>
  <main class="hidden-word">
    <GradientBackground :player="player" class="background"/>
    <div class="content">
      <p class="player">Выступает игрок {{player.name}}</p>
      <p class="round">Раунд {{'1/3'}}</p>
      <p class="timer">{{"0:45"}}</p>
      <div class="word">
        <div v-if="isReady" class="word-content">
            {{"Слово"}}
        </div>
        <button @click="isReady=!isReady" class="ready" v-if="!isReady">Готов</button>
      </div>
      <button class="give-up">Сдаюсь</button>
    </div>
  </main>
</template>
<script>
import GradientBackground from "~/components/lobby/GradientBackground";
export default {
  data(){
    return{
      player:{
        team: "Blue",
        background:'',
        name:'Vanya228'
      },
      isReady: false,
    }
  },
  components: {GradientBackground}
}
</script>

<style scoped>
*{
  font-family: 'Arial Black', sans-serif;
}
.background{
  background-color: #FFFFFF;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -10;
}
main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content{
  width: 76.15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vw;
}
.word{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75vw;
  background-color: #D9D9D9;
  border-radius: 6vw;
  margin-top: 10vw;
}
button{
  width: 70vw;
  height: 15vw;
  border-radius: 20vw;
  border: none;
  margin-top: 30vw;
}
.give-up,.ready,.player,.round{
  font-size: 5.12vw;
  text-align: center;
}
.player{
  margin-bottom: 3vw;
}
.timer,.word-content{
  font-size: 7.5vw;
}
.timer{
  margin-top: 10vw;
}
.ready{
  margin: 0;
  background-color: #3CA60A;
  color: white;
}
.ready:active{
  background-color: #005f0d;
}
.give-up:active{
  background-color: #D9D9D9;
}
</style>
