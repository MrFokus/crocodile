<template>
  <div :class="'no-answer-modal ' + result">
    <h3>{{title}}</h3>
    <div :class="'content ' +result">
      <p>{{word}}</p>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      result:null
    }
  },
  props: ['word','title'],
  mounted() {
    console.log(this.title)
    if(this.title==="Не угадано"){
      this.result='no'
    }
    else if (this.title==="Игра окончена"){
      this.result='yes'
      this.word="Победили "+ this.word;
    }
    else if (this.title==="Угадано"){
      this.result='yes'
    }

  }
}
</script>

<style scoped>
  .no-answer-modal{
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(50, 49, 49, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content{
    width: 256px;
    height: 256px;
    background: radial-gradient(120.6% 120.6% at 7.8% 4.25%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    box-shadow: inset -5px -5px 4px rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content>p{
    font-size: 24px;
    font-weight: bold;
    font-family: "Helvetica Neue",serif;
    width: 90%;
    text-align: center;
    margin: auto;
  }
  h3{
    font-size: 28px;
    font-family: "Helvetica Neue",serif;
  }
  .no{
    color: #ff896f;
  }
  .yes{
    color: #46d006;
  }
  @media only screen and (max-width: 390px) {
    .no-answer-modal{
      width: 100vw;
      height: 100vh;
    }
    .content{
      width: 60vw;
      height: 60vw;
      border-radius: 5vw;

    }
    .content>p{
      font-size: 5vw;
      width: 90%;
    }
    h3{
      font-size: 7vw;
    }
  }
</style>
