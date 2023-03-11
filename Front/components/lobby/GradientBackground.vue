<template>
  <div :style="{background: player.background}" class="background"></div>
</template>

<script>
  export default {
    props: ['player'],
    created() {
      if(this.player.team==='red'){
        this.player.background= 'linear-gradient(167.95deg, #B42B00 0%, #E3B798 100%)'
      }else if(this.player.team==='green') {
        this.player.background = 'linear-gradient(167.95deg, #39B400 0%, #B9E398 100%)'
      }else if(this.player.team==='blue') {
        this.player.background = 'linear-gradient(167.95deg, #0088B4 0%, #98E3DA 100%)'
      }else if(this.player.team==='yellow') {
        this.player.background = 'linear-gradient(167.95deg, #B4A200 0%, #E3DC98 100%)'
      }else if(this.player.team==='brown') {
        this.player.background = 'linear-gradient(167.95deg, #632916 0%, #E3B798 100%)'
      }else if(this.player.team==='purple') {
        this.player.background = 'linear-gradient(167.95deg, #4216A0 0%, #98C8E3 100%)'
      }

    }
  }

</script>
