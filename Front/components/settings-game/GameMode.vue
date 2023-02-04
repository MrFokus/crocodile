<template>
  <div class="btn-game-mode">
    <button :style="mode.myStyle" @click="selectBtn(index)" v-for="(mode,index) of Mods" :key="index">{{mode.name}}</button>
  </div>
</template>

<script>
const Mods=[
  {
    name:"ЛЁГКИЙ",
    myStyle:{
      backgroundColor:"#ffffff"
    }
  },
  {
    name:"НОРМАЛЬНЫЙ",
    myStyle:{
      backgroundColor:"#ffffff"
    }
  },
  {
    name:"ТЯЖЁЛЫЙ",
    myStyle:{
      backgroundColor:"#ffffff"
    }
  },
]
export default {
  data(){
    return{
      Mods,
    }
  },
  methods:{
    selectBtn(index){
      this.Mods.forEach(arr=>{
         arr.myStyle.backgroundColor='#ffffff'
      })
      if(index===0){
        this.Mods[index].myStyle.backgroundColor='#bcff9c';
      }else if(index===1){
        this.Mods[index].myStyle.backgroundColor='#fffd8e';
      }else if(index===2){
        this.Mods[index].myStyle.backgroundColor='#ffa186';
      }

      this.$emit('getDiff',index)
    }
  }
}
</script>
<style scoped>
  button{
    width: 65.64vw;
    height: 8.97vw;
    border-radius: 10vw;
    border: none;
  }
  .btn-game-mode{
    display: flex;
    flex-direction: column;

  }
  .btn-game-mode>button{
    font-size: 20px;
    font-weight: 900;
    margin-top: 13px;
  }
  .btn-game-mode>button:nth-child(1){
    color: #3CA60A;
  }
  .btn-game-mode>button:nth-child(2){
    color: #CBAA00;
  }
  .btn-game-mode>button:nth-child(3){
    color: #D73512;
  }
  button:focus{
    background-color: #D9D9D9;
  }

</style>
