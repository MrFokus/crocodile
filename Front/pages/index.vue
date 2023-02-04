<template>
  <main>
    <div class="description">
      <p>Крокодил-игра, участникам которой нужно показывать и отгадывать слова или выражения при помощи жестов, движений и мимики. Также известна под названиями «Ассоциации», «Пантомима», «Шарады», «Угадай слово» ...</p>
    </div>
    <NuxtLink to="settings-game" class="StartGame">Начать играть</NuxtLink>
  </main>
</template>

<script>
export default {
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  background: #1E1E1E;
}
</style>
<style scoped>

main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.description{
  width: 65.128vw;
  margin-top: 23.589vw;
  margin-bottom: 34.358vw;

}
.StartGame:active{
  background: #005f0d;
}
.StartGame{
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Arial Black',sans-serif;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
  text-decoration: none;

  text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
  width: 65.128vw;
  height: 15.64vw;
  background: #009F10;
  border-radius: 50px;
  border: none;


}
.description>p{

  font-family: 'Arial Black',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #FFFFFF;
}

</style>
