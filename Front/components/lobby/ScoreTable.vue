<template>
  <main class="score-table center">
    <GradientBackground :player="user" class="background"/>
    <div class="background-content center">
      <div class="content center">
        <div class="teams-score center">
          <div :style="{color:team.color}" v-for="(team,index) in score.slice(0,teams)" :key="index"
               :class="`team ${team.code} center`">
            <div v-if="index===0&&team.score!==0">
              <img src="/leader.svg" alt="">
            </div>
            <p>{{ team.team }}</p>
            <p>{{ team.score }}</p>
          </div>
        </div>
        <div class="timer center">{{ time }}</div>
        <div class="answer-block">
          <input :disabled="disabled" v-model="answer" placeholder="Введите ответ" class="answer" type="text">
          <button :disabled="disabled" @click="SendAnswer" class="send">Отправить</button>
        </div>

      </div>
    </div>
    <transition name="no-answer">
      <AnswerModal :title="title" :word="word" v-if="isAnswer"/>
    </transition>

  </main>
</template>
<script>
import GradientBackground from "~/components/lobby/GradientBackground";
import AnswerModal from "@/components/lobby/AnswerModal";

export default {
  components: {GradientBackground,AnswerModal},
  props: ['connections'],
  data() {
    return {
      title:null,
      word:null,
      isAnswer:false,
      answer: null,
      disabled: 'disabled',
      user: {},
      teams: null,
      time: null,
      score: [
        {
          code: "red",
          team: 'Красная',
          score: 2,
          color: '#A80000'
        },
        {
          code: "blue",
          team: 'Синяя',
          score: 0,
          color: '#0053D0'
        },
        {
          code: "green",
          team: 'Зелёная',
          score: 0,
          color: '#00D622'
        },
        {
          code: "yellow",
          team: 'Жёлтая',
          score: 0,
          color: '#EAEF04'
        },
        {
          code: "purple",
          team: 'Фиолетовая',
          score: 0,
          color: '#8E00D0'
        },
        {
          code: "brown",
          team: 'Коричневая',
          score: 0,
          color: '#d44a00'
        }
      ]
    }
  },
  methods: {
    onScoreTable(data) {
      this.teams = Object.keys(data.score_table).length
      console.log(data.score_table)
      for (let i = 0; i < this.score.length; i++) {
        this.score[i].score = +data.score_table[this.score[i].code]
      }
      this.sortScore();
    },
    onHiddenWord(data) {
      this.$emit("isHiddenWord",data.word);
    },
    onRightAnswer(data){
      this.word=data.word.toUpperCase();
      this.isAnswer=true;
      this.title="Угадано"
      setTimeout(()=>{
        this.isAnswer=false;
      },3000)
      this.onScoreTable(data);
      this.sortScore();
    },
    ConnectionServer() {
      console.log(this.connections)
      this.connections.onmessage = (message) => { //получение данных с сервера
        console.log(message)
        let data = JSON.parse(message.data)

        this[data.func](data)
      }
    },
    EndGame(){
      this.isAnswer=true;
      this.word=this.score[0].team;
      this.title="Игра окончена"
      setTimeout(()=>{
        this.$router.push('/settings-game/')
      },10000)
    },
    Answer(data) {
      this.disabled = null;
    },
    ScoreTable() {
      this.connections.send(JSON.stringify({ //при входе получаем данные с сервера о командах
        method: "ScoreTable",
        name_lobby: this.$route.params.id,
        name: this.user.name
      }))
    },
    onNoAnswer(data){
      this.word=data.word.toUpperCase();
      this.isAnswer=true;
      this.title="Не угадано"
      setTimeout(()=>{
        this.isAnswer=false;
      },3000)
    },
    sortScore() {
      this.score.sort((prev, next) => next.score - prev.score);
    },
    SendAnswer() {
      this.connections.send(JSON.stringify({
        method: "Answer",
        word: this.answer.trim().toLowerCase(),
        name_lobby: this.$route.params.id,
        user: this.user.name,
        team: this.user.team,
      }))
      this.answer = null;
    },
    onTimer(data) {
      this.time = data.time;
    },
    getLocalStorage() { //получаем данные о игроке
      this.user = JSON.parse(localStorage.getItem("UserSettings"))
    },
    // Background(){
    //   if(this.player.team==='Red'){
    //     this.player.background= 'linear-gradient(167.95deg, #B42B00 0%, #E3B798 100%)'
    //   }else if(this.player.team==='Green') {
    //     this.player.background = 'linear-gradient(167.95deg, #39B400 0%, #B9E398 100%)'
    //   }else if(this.player.team==='Blue') {
    //     this.player.background = 'linear-gradient(167.95deg, #0088B4 0%, #98E3DA 100%)'
    //   }else if(this.player.team==='Yellow') {
    //     this.player.background = 'linear-gradient(167.95deg, #B4A200 0%, #E3DC98 100%)'
    //   }
    // }
  },
  created() {
    this.getLocalStorage();
    // this.Background();
  },

  mounted() {
    console.log("before")
    this.ConnectionServer();
    console.log("after")
    this.ScoreTable();

  },
  // watch: {
  //   score: function () {
  //     this.sortScore();
  //   }
  // }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.no-answer-enter-active, .no-answer-leave-active { transition: opacity 1s; }
.no-answer-enter, .no-answer-leave-active { opacity: 0; }
* {
  margin: 0;
  padding: 0;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 314px;
  margin-top: 65px;
}
.background-content{
  background-color: rgba(101, 101, 101, 0.26);
  width: 390px;
  height: 100vh;
}
.background {
  background-color: #FFFFFF;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -10;
}

.teams-score {
  width: 100%;
}
.answer-block{
  margin-top: 40px;
}

.team {
  height: 47px;
  width: 100%;
  margin-top: 25px;
  border-radius: 10px;
  font-family: 'Arial Black', sans-serif;
  -webkit-text-stroke: 0.04em #929292;
  font-size: 32px;
  flex-direction: unset;
  justify-content: space-between;
  background: rgba(249, 249, 249, 0.53);
  border: 2px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12.5px);
  /* Note: backdrop-filter has minimal browser support */
}

.team > p:last-child {
  margin-right: 20px;
}

.team > p:first-child {
  margin-left: 62px;
}

.timer {
  margin-top: 30px;
  font-size: 64px;
  font-family: 'Arial Black', sans-serif;
  color: #FFFFFF;
}

.send {
  display: inline-block;
  padding: 10px;
  height: 45px;
  border: none;
  border-radius: 15px;
  font-family: 'Arial Black', sans-serif;
  font-size: 14px;
  background-color: #009F10;
  color: #FFFFFF;
}

.purple > p:first-child, .brown > p:first-child {
  font-size: 26px;
}

img {
  padding-left: 15px;
}

.answer {
  width: 195px;
  height: 40px;
  border: none;
  border-radius:10px;
  font-size: 16px;
  padding-left: 10px;
}
@media only screen and (max-width: 390px) {
  .content {
    width: 80vw;
    margin-top: 8vw;
  }

  .background {
    width: 100vw;
    height: 100vh;
    z-index: -10;
  }
  .background-content{
    width: 100%;
    background: none;
  }
  .teams-score {
    width: 100%;
  }
  .answer-block{
    margin: 0;
  }
  .team {
    height: 12.05vw;
    width: 100%;
    margin-top: 7vw;
    border-radius: 3vw;
    -webkit-text-stroke: 0.04em #929292;
    font-size: 8vw;
    border: 2px solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12.5px);
  }

  .team > p:last-child {
    margin-right: 5vw;
  }

  .team > p:first-child {
    margin-left: 15vw;
  }

  .timer {
    margin-top: 15vw;
    font-size: 20vw;
  }

  .send {
    padding: 1vw;
    height: 11vw;
    border: none;
    border-radius: 3vw;
    font-size: 4vw;
  }

  .purple > p:first-child, .brown > p:first-child {
    font-size: 6.4vw;
  }

  img {
    margin-left: 3vw;
    margin-right: -20vw;
  }

  .answer {
    width: 50vw;
    height: 10vw;
    border-radius: 3vw;
    font-size: 5vw;
    padding-left: 1vw;
  }
}
</style>
