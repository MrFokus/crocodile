<template>
  <main class="hidden-word">
    <GradientBackground :player="user" class="background"/>
    <div class="background-content">
      <div class="content">
        <p class="player">Выступает игрок {{user.name}}</p>
        <!--      <p class="round">Раунд {{'1/3'}}</p>-->
        <p class="timer">{{time}}</p>
        <div class="word">
          <div v-if="time!==null" class="word-content">
            {{word}}
          </div>
          <button @click="Ready" class="ready" v-if="isReady===false&&time===null">Готов</button>
        </div>
        <button @click="GiveUp" class="give-up">Сдаюсь</button>
      </div>
    </div>
    <AnswerModal v-if="isAnswer" :word="word"/>
  </main>
</template>
<script>
import GradientBackground from "~/components/lobby/GradientBackground";
import AnswerModal from "@/components/lobby/AnswerModal";
export default {
  props:['word','connections'],
  data(){
    return{
      isAnswer:false,
      time:null,
      user:{},
      player:{
        team: "Blue",
        background:'',
        name:'Vanya228'
      },
      isReady: false,
    }
  },
  components: {GradientBackground,AnswerModal},
  methods:{
    getLocalStorage() { //получаем данные о игроке
      this.user = JSON.parse(localStorage.getItem("UserSettings"))
    },
    ConnectionServer() {
      console.log(this.connections)
      this.connections.onmessage = (message) => { //получение данных с сервера
        console.log(message)
        let data=JSON.parse(message.data)

        this[data.func](data)
      }
    },
    GiveUp(){
      this.connections.send(JSON.stringify({
        method: "GiveUp",
        name_lobby: this.$route.params.id,
      }))
      setTimeout(()=>{
        this.$emit("StartGame",'ScoreTable');
      },4000)

    },
    onRightAnswer(){
      this.word='УГАДАНО';
      this.isAnswer=true;
      setTimeout(()=>{
        this.isAnswer=false;
        this.$emit("StartGame",'ScoreTable');
      },4000)
    },
    onNoAnswer(){
      this.word='НЕ УГАДАНО';
      this.isAnswer=true;
      setTimeout(()=>{
        this.isAnswer=false;
        this.$emit("StartGame",'ScoreTable');
      },4000)

    },
    Ready(){
      debugger
      this.isReady=!this.isReady;
      this.connections.send(JSON.stringify({
          method: "Ready",
          name_lobby: this.$route.params.id,
      }))
    },
    onTimer(data){
      this.time=data.time;
    },
    // Answer(data) {
    //   this.word=data.word
    // },
    EndGame() {
      this.$emit("StartGame",'ScoreTable');
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.getLocalStorage();
  },
  mounted() {

    console.log(this.$route.params.id)
    this.ConnectionServer();
  }
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
  width: 256px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}
.word{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 256px;
  background: rgba(249, 249, 249, 0.53);
  border: 2px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12.5px);
  border-radius: 16px;
  margin-top: 20px;
}
.background-content{
  background-color: rgba(101, 101, 101, 0.26);
  width: 390px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
button{
  width: 90%;
  height: 50px;
  border-radius: 50px;
  border: none;
  margin-top: 60px;
}
.give-up,.ready,.player,.round{
  font-size: 16px;
  text-align: center;
}
.player{
  margin-bottom: 6px;
  font-size: 20px;
}
.timer,.word-content{
  font-size: 22px;
}
.timer{
  margin-top: 20px;
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
@media only screen and (max-width: 390px) {
  .background{
    width: 100vw;
    height: 100vh;
    z-index: -10;
  }
  .background-content{
    width: 100vw;
    background: none;
  }
  .content{
    width: 76.15vw;
    margin-top: 20vw;
  }
  .word{
    width: 100%;
    height: 75vw;
    border-radius: 6vw;
    margin-top: 10vw;
  }
  button{
    width: 70vw;
    height: 15vw;
    border-radius: 20vw;
    margin-top: 30vw;
  }
  .give-up,.ready,.player,.round{
    font-size: 5.12vw;
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
}
</style>
