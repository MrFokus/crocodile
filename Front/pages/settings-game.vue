<template>
  <main  class="settingsGame">
    <div class="content">
      <p>Введите имя</p>
      <input v-model="name" type="text">
      <p>Выберите уровень сложности</p>
      <GameMode @getDiff="selectDiff"/>
      <p>Введите количество команд </p>
      <input pattern="[a-zA-Z]*"  class="team" @input="check" v-model="teams" type="text"> <br>
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
    }
  },
  components: {
    JoiningLobby,
    GameMode
  },
  methods:{
    selectDiff(dif){
      this.difficulty=dif;
    },
    check(){
      if(+this.teams>=10){
        this.teams=10
      }else if(+this.teams<0) {
        this.teams = 1
      }else if(/^[a-zA-Z]+$/.test(this.teams)){
        this.teams=null;
      }
    },

    getParams(){
      let params={
        name:this.name,
        teams:this.teams,
        difficulty:this.difficulty,
      };
      console.log(params)

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
  font-size: 20px;
  line-height: 28px;
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
  margin-bottom: 13.84vw;
}
.create-lobby{
  text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
  width: 65.128vw;
  height: 15.64vw;
  background: #009F10;
  border-radius: 50px;
  border: none;
  font-family: 'Arial Black',sans-serif;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
  text-decoration: none;
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
