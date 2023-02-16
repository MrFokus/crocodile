<template>
  <HiddenWord/>
</template>


<script>
import SelectTeam from "@/components/lobby/SelectTeam";
import ScoreTable from "@/components/lobby/ScoreTable";
import HiddenWord from "~/components/lobby/HiddenWord";
export default {
  components:{
    ScoreTable,
    SelectTeam,
    HiddenWord,
  }
}
</script>

















<!--<template>-->
<!--  <main>-->
<!--    <input type="text" v-model="name">-->
<!--    <input type="text" v-model="msg">-->
<!--    <button @click="SendMessage(name,msg)">Отправить</button>-->
<!--    <div id="chat">-->
<!--      <message v-for="(message,index) in messages" :key="index" :message="message"/>-->
<!--    </div>-->
<!--  </main>-->

<!--</template>-->

<!--<script>-->
<!--import message from "@/components/message";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      connection: null,-->
<!--      name: null,-->
<!--      msg: null,-->
<!--      messages: [],-->
<!--      message:null,-->
<!--    }-->
<!--  },-->
<!--  beforeMount() {-->
<!--      console.log("Start Connection to WS Server")-->
<!--      this.connection = new WebSocket("ws://localhost:8000")-->
<!--      this.getMessage();-->
<!--  },-->
<!--  methods: {-->
<!--    getMessage() {-->
<!--      this.connection.onmessage = (message) => { //получение данных с сервера-->
<!--        this.messages = JSON.parse(message.data);-->
<!--        console.log(this.connection)-->
<!--      }-->
<!--    },-->
<!--    SendMessage(name, msg) {-->
<!--        console.log(this.messages)-->
<!--        this.connection.send(JSON.stringify({name, msg}))-->
<!--        console.log(this.messages)-->
<!--        this.connection.onmessage = (message) => { //получение данных с сервера-->
<!--          this.messages.push( JSON.parse(message.data)[0]);-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
