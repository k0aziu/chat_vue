<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col>
          <h1 class="text-h2 ma-5 mt-3 text-center">Kazcom!</h1>
          <p class="text-center pt-10 pb-10 pa-5 ma-5 pl-5 pr-5" style="font-size: 3vh;">Kazcom to prosta aplikacja używająca biblioteki socket.io do komunikacji serwera z użytkownikiem. Została zaprojektowana na podstawie aplikacji Mizcom.</p>
          <p class="text-center pt-10 pb-10 pa-5 ma-5 pl-5 pr-5" style="font-size: 3vh;">Backend aplikacji napisany jest w express.js, do komunikacji wykorzystuje również bibliotekę axios.</p>
          <p class="text-center pt-10 pb-10 pa-5 ma-5 pl-5 pr-5" style="font-size: 3vh;">Front end jest napisany we Vue3, dodatkowo wykorzystałem bibliotekę vuetify, aby aplikacja była wygodna w użytku oraz responsywna.</p>
          <p class="text-center pt-15 pa-5 ma-5 pl-5 pr-5" style="font-size: 3vh;">By Michał Kazienko 3f</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>  

<script>
export default {
  name: 'ShowHome'
}
</script>

<style>
.container {
  padding: 0;
  /* usuń marginesy */
  max-width: 50%;
  /* ustaw maksymalną szerokość kontenera na 50% */
}
</style>

<style>
html,
body,
v-container,
v-col {
  margin: 0;
}

body {
  margin-bottom: 0;
}


.v-application--wrap {
  margin: 0;
}


.v-main {
  margin-bottom: 0 !important;
}

html,
body {
  margin: 0;
  padding: 0;
}

.v-application--wrap {
  height: 50%;
}

@media (max-width: 600px) {
  .v-application--wrap {
    margin-bottom: -56px;
  }
}

.ma-5 {
  margin: 0 !important;
}

.v-main {
  padding-bottom: 0 !important;
}</style>