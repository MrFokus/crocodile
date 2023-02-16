<template>
  <main class="selectTeam">
    <div class="content">
      <h1>Выберите команду</h1>
      <div class="teams">
        <div @click="SelectTeam(index)" :style="team.style" v-for="(team,index) in teams" :key="index" class="team">
          <p class="number-of-players">{{ team.players }}</p>
        </div>
      </div>
      <button>Правила игры</button>
      <button>Дополнительные настройки</button>
      <p class="name-lobby">{{ nameLobby }}</p>
      <button class="start">Начать</button>
    </div>
  </main>
</template>

<script>
const teams = [
  {style:{backgroundColor: '#A80000'}, players: 0},
  {style:{backgroundColor: '#EAEF04'}, players: 0},
  {style:{backgroundColor: '#0053D0'}, players: 0},
  {style:{backgroundColor: '#00D622'}, players: 0},
]
const SelectTeams = [
  {style:{background: 'linear-gradient(222.58deg, #A80000 -6.68%, #E3E3E3 124.75%)', border:' 3px solid #FFFFFF'}, players: 0},
  {style:{background: 'linear-gradient(225.24deg, #D6DA05 0%, #E9E9E5 102.14%)',border:' 3px solid #FFFFFF'}, players: 0},
  {style:{background: 'linear-gradient(226.34deg, #0053D0 2.15%, #D8D8D8 102.84%)',border:' 3px solid #FFFFFF'}, players: 0},
  {style:{background: 'linear-gradient(225.87deg, #00D622 0%, #D9D9D9 98.53%)',border:' 3px solid #FFFFFF'}, players: 0},
]
export default {
  // props:['data'],
  data(){
    return {
      teams,
      nameLobby: 'GRMN',
      SelectTeams,
    }
  },
  methods:{
    SelectTeam(index){
      this.teams=teams.slice(0)
      this.teams[index]=this.SelectTeams[index]
    }
  }

}
</script>
<style>
body {
  background-color: #1E1E1E;
}
</style>
<style scoped>

.teams {
  width: 70vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
}

.team {
  margin: auto;
  width: 30vw;
  height: 30vw;
  margin-bottom: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 3vw;
}

.selectTeam {
  margin: auto;
  width: 100vw;
  height: 100vh;
}
button{
  width: 65.12vw;
  height: 8vw;
  border-radius: 20vw;
  border: none;
  font-size: 3.5vw;
  font-family: 'Arial Black',sans-serif;
  padding: 0;
  margin-bottom: 3vw;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vw;

}
.number-of-players{
  text-align: center;
  font-size: 16.41vw;
  font-family: 'Arial Black',sans-serif;
  color: white;
  -webkit-text-stroke: .03em black;
}
h1{
  font-size: 6.5vw;
}
p,h1{
  color: white;
  font-family: 'Arial Black',sans-serif;
}
.name-lobby{
  font-size: 12.3vw;
}
.start{
  height: 15vw;
  background-color: #009F10;
  color: #FFFFFF;
  text-align: center;
  font-size: 5vw;
  font-family: 'Arial Black',sans-serif;
  -webkit-text-stroke: .03em #3b3b3b;
}
</style>
