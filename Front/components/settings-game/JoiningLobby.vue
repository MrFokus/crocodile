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
            connection:null
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
  width: 300px;
  height: 270px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  position: fixed;
  z-index: 100;
}
p{
  font-family: 'Arial Black',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  display: flex;
  margin: 5px auto;
  align-items: center;
  color: #212121;
  text-align: center;
}
input{
  border: none;
  background-color: #D9D9D9;
  width: 256px;
  height: 35px;
  border-radius: 50px;
  font-family: 'Arial Black',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  padding-left:4px ;
  padding-right:4px ;
  box-sizing: border-box;
}
.join{
  text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
  width: 254px;
  height: 61px;
  background: #009F10;
  border-radius: 50vw;
  border: none;
  font-family: 'Arial Black',sans-serif;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
  text-decoration: none;
  margin-top: 20px;
}
.join:active{
  background-color: #00720c;
}

@media only screen and (max-width: 390px) {
  .close{
    width: 100vw;
    height: 100vh;
  }
  .JoiningLobbyComponent{
    width: 100vw;
    height: 100vh;
  }
  .modal-joining-lobby{
    width: 75.38vw;
    height: 68.97vw;
    border-radius: 5vw;
  }
  p{
    font-size: 5vw;
  }
  input{
    width: 65.12vw;
    height: 10vw;
    border-radius: 10vw;
    font-size: 4vw;
    padding-left:2vw ;
    padding-right:2vw ;
  }
  .join{
    text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
    width: 60vw;
    height: 12vw;
    border-radius: 10vw;
    font-size: 4vw;
    margin-top: 5vw;
  }
}


</style>
