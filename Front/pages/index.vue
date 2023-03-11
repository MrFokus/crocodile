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
  background: #5a5a5a;
}
</style>
<style scoped>

main{
  background-color: #1E1E1E;
  height: 100vh;
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.description{
  width: 256px;
  margin-top: 92px;
  margin-bottom: 134px;

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
  width: 256px;
  height: 61px;
  background: #009F10;
  border-radius: 50px;
  border: none;


}
.description>p{

  font-family: 'Arial Black',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  display: flex;
  align-items: center;

  color: #FFFFFF;
}
@media only screen and (max-width: 390px) {
  main{
    width: 100vw;
  }
  .description{
    width: 65.128vw;
    margin-top: 23.589vw;
    margin-bottom: 34.358vw;

  }
  .StartGame{
    font-weight: 900;
    font-size: 6vw;

    text-shadow: 0.5px 0.5px 0.5px #5B5B5B;
    width: 65.128vw;
    height: 15.64vw;
    border-radius: 50px;
  }
  .description>p{
    font-weight: 900;
    font-size: 6vw;
  }
}
</style>
