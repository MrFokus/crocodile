<template>
  <main  class="settingsGame">
    <div class="content">
      <p>Введите имя</p>
      <input v-model="name" type="text">
      <p>Выберите уровень сложности</p>
      <GameMode @getDiff="selectDiff"/>
      <p>Введите количество команд </p>
      <input pattern="[a-zA-Z]*"  class="team" @input="check" v-model="teams" type="text"> <br>
      <p v-if="error" style="color: #ff5631">{{error}}</p>
      <button @click="getParams" class="create-lobby">Создать лобби</button>
      <button @click="isModal=true" class="create-lobby joining-lobby">Присоединиться к лобби</button>

    </div>
    <JoiningLobby v-show="isModal" @closeModal="isModal=false"/>
  </main>
</template>

<script>
import GameMode from "@/components/settings-game/GameMode";
import JoiningLobby from "@/components/settings-game/JoiningLobby";
export default {
  data(){
    return{
      isModal:false,
      teams:"",
      name:null,
      difficulty: null,
      error:null
    }
  },
  components: {
    JoiningLobby,
    GameMode
  },
  methods:{
    selectDiff(dif){
      dif++
      this.difficulty=dif;
    },
    check(){
      if(+this.teams>=6){
        this.teams=6
      }else if(+this.teams<0||this.teams==='0') {
        this.teams = 1
      }else if(!/^\d+$/.test(this.teams)){
        this.teams=null;
      }
    },

    getParams(){
      console.log(this.name)
      if(this.name===''||this.name===null){
        this.error='Введите имя'
        return;
      }else if(this.teams===''||this.teams===null){
        this.error='Введите количество команд'
        return;
      }else if(this.difficulty===null){
        this.error='Выберите сложность'
        return;
      }else {
        this.error=undefined
      }
      let params={
        name:this.name.trim(),
        teams:this.teams,
        difficulty:this.difficulty,
        isLeader: true,
        team:'',
        name_lobby:'',
      };
      if(localStorage.getItem("UserSettinds")){
        localStorage.removeItem("UserSettings")
      }
      localStorage.setItem("UserSettings",JSON.stringify(params))
      // console.log(JSON.parse(localStorage.UserSettings))
      this.$router.push("/lobby");
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  background: #1E1E1E;
}
</style>

<style scoped>
input{
  width: 65.64vw;
  height: 8.97vw;
  border: none;
  border-radius: 10vw;
  font-family: 'Arial Black',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 4vw;
  padding-left:2vw ;
  padding-right:2vw ;
  box-sizing: border-box;
}
p:nth-child(1){
  margin-top: 20vw;
}
p:nth-child(2){
  margin-top: 7.18vw;
}

p{
  font-family: 'Arial Black',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 5vw;
  display: flex;
  align-items: center;
  width: 65.64vw;

  color: #FFFFFF;
}
.content{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.team{
  margin-top: 7.2vw;
}
.create-lobby{
  text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
  width: 65.128vw;
  height: 15.64vw;
  background: #009F10;
  border-radius: 20vw;
  border: none;
  font-family: 'Arial Black',sans-serif;
  font-weight: 900;
  font-size: 5vw;
  text-align: center;
  color: #FFFFFF;
  text-decoration: none;
  margin-top: 13.84vw;
}
  .settingsGame{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .joining-lobby{
    background: #9D9D9D;
    margin-top: 10vw;
  }
</style>
