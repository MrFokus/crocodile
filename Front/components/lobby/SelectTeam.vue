<template>
  <main class="selectTeam">
    <div class="content">
      <h1>Выберите команду</h1>
      <div class="teams">
        <div @click="SelectTeam(index)" :style="team.style" v-for="(team,index) in teams.slice(0,+user.teams)"
             :key="index" class="team">
          <p class="number-of-players">{{ team.players }}</p>
        </div>
      </div>
      <button>Правила игры</button>
      <button>Дополнительные настройки</button>
      <p class="name-lobby">{{ nameLobby }}</p>
      <button v-if="user.isLeader===true" @click="toScoreTable()" class="start">Начать</button>
    </div>
  </main>
</template>

<script>
const teams = [
  {style: {backgroundColor: '#A80000'}, code: 'red', players: 0},
  {style: {backgroundColor: '#0053D0'}, code: 'blue', players: 0},
  {style: {backgroundColor: '#00D622'}, code: 'green', players: 0},
  {style: {backgroundColor: '#EAEF04'}, code: 'yellow', players: 0},
  {style: {backgroundColor: '#AB3E00'}, code: 'brown', players: 0},
  {style: {backgroundColor: '#390081'}, code: 'purple', players: 0},
]
const SelectTeams = [
  {background: 'linear-gradient(222.58deg, #A80000 -6.68%, #E3E3E3 124.75%)', border: ' 3px solid #FFFFFF'},
  {background: 'linear-gradient(226.34deg, #0053D0 2.15%, #D8D8D8 102.84%)', border: ' 3px solid #FFFFFF'},
  {background: 'linear-gradient(225.87deg, #00D622 0%, #D9D9D9 98.53%)', border: ' 3px solid #FFFFFF'},
  {background: 'linear-gradient(225.24deg, #D6DA05 0%, #E9E9E5 102.14%)', border: ' 3px solid #FFFFFF'},
  {background: 'linear-gradient(225deg, #AB3E00 0%, #D8C6BD 105.13%)', border: ' 3px solid #FFFFFF'},
  {background: ' linear-gradient(225.12deg, #390081 0%, #B0A0C6 104.06%)', border: ' 3px solid #FFFFFF'},
]
export default {
  props:['connections'],
  data() {
    return {
      user: {},
      teams,
      nameLobby: '',
      // connections: null,
      old_team: '',
      new_team: '',
      startGame: false,
    }
  },
  methods: {
    SelectTeam(index) { //Функция, которая при нажатии на команду, отправляет запрос на сервер, где она добавляеет игрока в команду, и сервер возврашает кол-во игроков во всех командах
      if (this.teams[index].code !== this.new_team) {
        this.teams = JSON.parse(JSON.stringify(teams))//это сделано для того, чтобы не было изменений в родительском массиве
        this.teams[index].style = SelectTeams[index] // меняем стиль и делаем кнопку активной
        this.old_team = this.new_team; // для удобства создаём переменную, прошлой команды
        this.new_team = this.teams[index].code;
        this.connections.send(JSON.stringify({ //делаем запрос на сервер для добавления игрока в новую команду
          method: 'JoinTeam',
          user: this.user.name,
          new_team: this.new_team,
          old_team: this.old_team,
          name_lobby: this.nameLobby,
        }))
        let ls_user = JSON.parse(localStorage.getItem("UserSettings"))
        ls_user.team = this.new_team //меняем в сторе команду игрока
        localStorage.setItem("UserSettings", JSON.stringify(ls_user))
        console.log(JSON.parse( localStorage.UserSettings))
      }
    },
    toScoreTable(){
      this.connections.send(JSON.stringify({
        method: 'StartGame',
        name_lobby: this.nameLobby,
      }))
    },
    StartGame(data){
      console.log(",jkjgkgkjgk")
      this.$emit('StartGame', 'ScoreTable')
      localStorage.setItem("StatusGame",data.status_game)
    },
    Route() { //функция, которая переадресует игрока в комнату (просто у url появляется код комнаты)
      if (this.$route.params.id === undefined) {
        console.log(localStorage.getItem('StatusGame'))
        if(localStorage.getItem('StatusGame')==='connected'||localStorage.getItem('StatusGame')==='in_process'){
          this.$router.push("/settings-game/")
          return
        }
        this.connections.send(JSON.stringify({
          method: 'createLobby',
          name: this.user.name,
          difficulty: this.user.difficulty,
          total_round: this.user.teams,
        }))

      } else {
        this.nameLobby = this.$route.params.id;
        localStorage.setItem("StatusGame", 'connected')
        console.log(this.$route.params.id)
        this.connections.send(JSON.stringify({ //при входе получаем данные с сервера о командах
          method: "recoveryTeam",
          id_room: this.$route.params.id,
          name: this.user.name,
        }))
        let ls_user = JSON.parse(localStorage.getItem("UserSettings"))
        ls_user.name_lobby = this.nameLobby
        localStorage.setItem("UserSettings", JSON.stringify(ls_user))
      }
    },
    onRoute(data) {
      console.log(data)
      this.$router.push('/lobby/' + data.rs)
    },
    onRecoveryTeam(data) {
      if(data.players_teams==="noLobby"){
        this.$router.push('/settings-game/')
      }
      console.log("dfhs")
      this.user.teams = Object.keys(data.players_teams).length
      console.log(Object.keys(data.players_teams).length)
      for (let i = 0; i < this.user.teams; i++) {
        if (data.players_teams[this.teams[i].code] !== undefined) {
          this.teams[i].players = data.players_teams[this.teams[i].code];
        }
      }
      this.teams = JSON.parse(JSON.stringify(teams))
      let index = this.teams.findIndex(user => user.code === this.user.team) // если пользователь уже выбрал команду и перезагрузил страниу, то это команда будет активной
      if(index!==-1) {
        this.new_team = this.teams[index].code;
        this.teams[index].style = SelectTeams[index]
      }

    },
    onJoinTeam(data){
      console.log(data.r)
      for (let i = 0; i < this.user.teams; i++) {
        if (data.r[this.teams[i].code] !== undefined) {
          this.teams[i].players = data.r[this.teams[i].code];
        }
      }
    },

    getLocalStorage() { //получаем данные о игроке
      this.user = JSON.parse(localStorage.getItem("UserSettings"))
    },
    ConnectionServer() {
      console.log(this.connections)
      this.connections.onmessage = (message) => { //получение данных с сервера
        let data=JSON.parse(message.data)
        this[data.func](data)
      }
    }
  },
  mounted() {
    if(localStorage.getItem('StatusGame')==='in_process'){
      this.$emit('StartGame', 'ScoreTable')
      return
    }
    this.getLocalStorage();
    this.ConnectionServer();
    this.Route();
    // this.connections.onopen = () => this.Route();


  },

}
</script>
<style>
body {
  background-color: #1E1E1E;
}
</style>
<style scoped>

.teams {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
}

.team {
  margin: auto;
  width: 117px;
  height: 117px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
}


.selectTeam {
  background-color: #1E1E1E;
  margin: auto;
  width: 390px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  width: 256px;
  height: 35px;
  border-radius: 50px;
  border: none;
  font-size: 12px;
  font-family: 'Arial Black', sans-serif;
  padding: 0;
  margin-bottom: 6px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vw;
  width: 258px;

}

.number-of-players {
  text-align: center;
  font-size: 64px;
  font-family: 'Arial Black', sans-serif;
  color: white;
  -webkit-text-stroke: .03em black;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p, h1 {
  color: white;
  font-family: 'Arial Black', sans-serif;
}

.name-lobby {
  font-size: 48px;
}

.start {
  height: 61px;
  background-color: #009F10;
  color: #FFFFFF;
  text-align: center;
  font-size: 24px;
  font-family: 'Arial Black', sans-serif;
  -webkit-text-stroke: .03em #3b3b3b;
}
@media only screen and (max-width: 390px) {


  .teams {
    width: 70vw;
  }

  .team {
    width: 30vw;
    height: 30vw;
    margin-bottom: 3vw;
    border-radius: 3vw;
  }


  .selectTeam {
    width: 100vw;
    height: 100vh;
  }

  button {
    width: 65.12vw;
    height: 8vw;
    border-radius: 20vw;
    font-size: 3.5vw;
    margin-bottom: 3vw;
  }

  .content {
    margin-top: 10vw;

  }
  .number-of-players {
    font-size: 16.41vw;
    -webkit-text-stroke: .03em black;
  }

  h1 {
    font-size: 6vw;
    margin-bottom: 4vw;
  }

  .name-lobby {
    font-size: 12.3vw;
  }

  .start {
    height: 15vw;
    font-size: 5vw;
    -webkit-text-stroke: .03em #3b3b3b;
  }
}
</style>
