<template>
  <SelectTeam :connections="connections" v-if="component==='SelectTeam'" @StartGame="StartGame" />
  <ScoreTable :connections="connections" v-else-if="component==='ScoreTable'" @isHiddenWord="toHiddenWord"/>
  <HiddenWord :connections="connections" :word="word" v-else-if="component==='HiddenWord'" @StartGame="StartGame" />
</template>


<script>
import SelectTeam from "@/components/lobby/SelectTeam";
import ScoreTable from "@/components/lobby/ScoreTable";
import HiddenWord from "~/components/lobby/HiddenWord";
export default {
  data(){
    return{
      component:"",
      connections:null,
      word:null,
    }
  },
  components:{
    ScoreTable,
    SelectTeam,
    HiddenWord,
  },
  methods:{
    // setPropsSelectTeam(){
    //   this.propsSelectTeam=JSON.stringify( localStorage.getItem('UserSettings'))
    // }
    toHiddenWord(word){
      this.component='HiddenWord'
      this.word= word;
    },
    StartGame(component){
      this.component=component;
    }
  },
  mounted() {
    this.connections = new WebSocket("ws://localhost:8000")
    this.connections.onopen= ()=> this.component = "SelectTeam"
    console.log(this.connections)
  }
}
</script>

<style>
body{
  width: 100vw;
  height: 100vh;
}
</style>
