<template>
  <main class="score-table center">
    <GradientBackground :player="player" class="background"/>
    <div class="content center">
      <div class="teams-score center">
        <div :style="{color:team.color}" v-for="(team,index) in score" :key="index" class="team center">
          <div v-if="index===0">
            <img src="/leader.svg" alt="">
          </div>
          <p>{{ team.team }}</p>
          <p>{{ team.score }}</p>
        </div>
      </div>
      <div class="timer center">0:45</div>
      <button class="give-an-answer">Дать ответ</button>
    </div>

  </main>
</template>
<script>
import GradientBackground from "~/components/lobby/GradientBackground";
export default {
  components: {GradientBackground},
  data() {
    return {
      player:{
        team: "Blue",
        background:''
      },
      score: [
        {
          team: 'Красная',
          score: 4,
          color:'#A80000'
        },
        {
          team: 'Зелёная',
          score: 7,
          color:'#00D622'
        },
        {
          team: 'Жёлтая',
          score: 8,
          color:'#EAEF04'
        },
        {
          team: 'Синяя',
          score: 10,
          color:'#0053D0'
        }
      ]
    }
  },
  methods: {
    sortScore() {
      this.score.sort((prev, next) => next.score - prev.score);
    },
    Background(){
      if(this.player.team==='Red'){
        this.player.background= 'linear-gradient(167.95deg, #B42B00 0%, #E3B798 100%)'
      }else if(this.player.team==='Green') {
        this.player.background = 'linear-gradient(167.95deg, #39B400 0%, #B9E398 100%)'
      }else if(this.player.team==='Blue') {
        this.player.background = 'linear-gradient(167.95deg, #0088B4 0%, #98E3DA 100%)'
      }else if(this.player.team==='Yellow') {
        this.player.background = 'linear-gradient(167.95deg, #B4A200 0%, #E3DC98 100%)'
      }
    }
  },
  created() {
    this.sortScore();
    this.Background();
  },
  watch: {
    score: function () {
      this.sortScore();
    }
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.center{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content{
  width: 75.38vw;
  margin-top: 8vw;
}
.background {
  background-color: #FFFFFF;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -10;
}
.teams-score{
  width: 100%;
}
.team{
  height: 12.05vw;
  width: 100%;
  background-color: #D9D9D9;
  margin-top: 7vw;
  border-radius: 3vw;
  font-family: 'Arial Black',sans-serif;
  -webkit-text-stroke:0.04em #929292 ;
  font-size: 8vw;
  flex-direction: unset;
  justify-content:space-between;
}
.team>p:last-child{
  margin-right: 5vw;
}
.team>p:first-child{
  margin-left: 15vw;
}
.timer{
  margin-top: 15vw;
  font-size: 20vw;
  font-family: 'Arial Black',sans-serif;
  color: #FFFFFF;
}
.give-an-answer{
  width: 90%;
  height: 17vw;
  border: none;
  border-radius: 3vw;
  margin-top: 20vw;
  font-family: 'Arial Black',sans-serif;
  font-size: 6vw;
  background-color: #009F10;
  color: #FFFFFF;
}

img{
  margin-left: 3vw;
  margin-right: -20vw;
}
</style>
