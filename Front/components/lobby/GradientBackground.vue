<template>
  <div :style="{background: player.background}" class="background"></div>
</template>

<script>
  export default {
    props: ['player'],
    created() {
      if(this.player.team==='Red'){
        this.player.background= 'linear-gradient(167.95deg, #B42B00 0%, #E3B798 100%)'
      }else if(this.player.team==='Green') {
        this.player.background = 'linear-gradient(167.95deg, #39B400 0%, #B9E398 100%)'
      }else if(this.player.team==='Blue') {
        this.player.background = 'linear-gradient(167.95deg, #0088B4 0%, #98E3DA 100%)'
      }else if(this.player.team==='Yellow') {
        this.player.background = 'linear-gradient(167.95deg, #B4A200 0%, #E3DC98 100%)'
      }
    }
  }

</script>
