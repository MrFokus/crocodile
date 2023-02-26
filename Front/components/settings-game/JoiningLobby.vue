<template>
  <div class="JoiningLobbyComponent">
    <div class="modal-joining-lobby">
      <p>Введите имя</p>
      <input v-model="name" type="text">
      <p>Введите номер лобби</p>
      <input v-model="lobbyId" type="text">
      <p style="color: #D73512" v-if="error!==null">{{error}}</p>
      <button @click="checkInput" class="join">Присоединиться</button>

    </div>
    <div @click="closeMD" class="close"></div>
  </div>
</template>

<script>
//не работает клик на закрытие вне родительского блока
  export default {
    data(){
      return{
        lobbyId:'',
        name:'',
        error:null,
      }
    },
    methods:{
      closeMD(){
        this.$emit('closeModal')
      },
      checkInput(){
        if(this.name===''||this.name===null){
          this.error='Введите имя';

        }else if(this.lobbyId===''||this.lobbyId===null){
          this.error="Введите код комнаты";

        }
        else{
          let params= {
            name: this.name.trim(),
            isLeader: false,
            team:'',
            teams:'',
            name_lobby:this.lobbyId.trim(),
          }
          this.error=null;
          localStorage.setItem("UserSettings",JSON.stringify(params))
          console.log(JSON.parse(localStorage.UserSettings))
          this.$router.push("/lobby/"+this.lobbyId);
        }
      }
    }
  }
</script>

<style scoped>
  .close{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.51);
    position: fixed;
    z-index: 10;
  }
  .JoiningLobbyComponent{
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
  }
  .modal-joining-lobby{
    background-color: white;
    width: 75.38vw;
    height: 68.97vw;
    border-radius: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    position: fixed;
    z-index: 100;
  }
  p{
    font-family: 'Arial Black',sans-serif;
    font-weight: 900;
    font-size: 20px;
    text-align: center;
    color: #000000;
    text-decoration: none;
  }
  input{
    border: none;
    width: 65.12vw;
    height: 10vw;
    background-color: #D9D9D9;
    border-radius: 10vw;
    font-family: 'Arial Black',serif;
    font-style: normal;
    font-weight: 900;
    font-size: 4vw;
    padding-left:2vw ;
    padding-right:2vw ;
    box-sizing: border-box;
  }
  .join{
    text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
    min-width: 29vw;
    height: 12vw;
    background-color: #009F10;
    border-radius: 50px;
    border: none;
    font-family: 'Arial Black',sans-serif;
    font-weight: 900;
    font-size: 4vw;
    text-align: center;
    color: #FFFFFF;
    text-decoration: none;
    margin-top: 5vw;
  }
  .join:active{
    background-color: #00720c;
  }
</style>
