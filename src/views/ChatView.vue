<template>
  <NavBar />
  <v-main style="height: 100vh;">
    <MainChat style="height: 100%;" v-if="name && email && password"></MainChat>
    <v-alert v-else text="Najpierw załóż konto, lub zaloguj się."></v-alert>
  </v-main>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MainChat from '@/components/MainChat.vue'

export default {
  name: 'ChatView',
  components: {
    NavBar,
    MainChat
  },
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  created() {
    this.name = localStorage.getItem('user_name');
    this.email = localStorage.getItem('user_email');
    this.password = localStorage.getItem('user_password');
  }
}

</script>