<template>
    <NavBar />
    <ShowHome />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ShowHome from '@/components/ShowHome.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    ShowHome
  },
  data() {
    return {

    }
  },
  methods: {
    isloggedin() {
      return false
    }
  }
}
</script>