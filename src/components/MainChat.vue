<template>
  <v-container style="height: 90%;">
    <v-row :scroll-target="onScroll" style="padding-bottom: 100px;">
      <v-card v-for="message in messages" :key="message.name" :title="message.name" variant="tonal"
        :text="message.message" style="height: 100px; width: 100%; margin: 10px 10px 10px 10px;"></v-card>
    </v-row>
  </v-container>
  <v-text-field class="textFieldWidth" label="Napisz wiadomość..." v-model="message"
    :append-icon="message ? 'mdi-send' : ''" variant="filled" clear-icon="mdi-close-circle" type="text"
    @click:append="sendMessage" @click:prepend="changeIcon" @click:clear="clearMessage"
    @keyup.enter="sendMessage"></v-text-field>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'

export default {
  name: 'MainChat',
  data() {
    return {
      bottom: '',
      message: '',
      connection: null,
      socket: io.connect(),
      messages: []
    }
  }, methods: {
    sendMessage() {
      if (this.message === '') return
      this.socket.emit('sendMessage', { message: this.message, name: localStorage.getItem('user_name') });
      this.resetIcon()
      this.clearMessage()
    },
    clearMessage() {
      this.message = ''
    },
    resetIcon() {
      this.iconIndex = 0
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1 ? this.iconIndex = 0 : this.iconIndex++
    }
  },
  created() {
    const self = this
    this.socket.on('getMessage', function (data) {
      console.log(this.messages)

      self.messages.push(...data)
      if (window.scrollY === document.documentElement.scrollHeight - window.innerHeight) {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 200)
      }
    })

    axios.post('/chat_history', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const history = response.data.history
        this.messages.push(...Object.values(history))
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight)
        }, 200)
      })
  }
}
</script>

<style>
* {
  scroll-behavior: smooth;
}

@media screen and (min-width: 1300px) {
  .textFieldWidth {
    position: fixed;
    right: 20vw;
    left: 20vw;
  }
}

@media screen and (max-width: 1300px) {
  .textFieldWidth {
    position: fixed;
    left: 10px;
    bottom: 0;
    right: 10px;
  }
}

::-webkit-scrollbar {
  width: 10px;
  border-radius: 10px 0 0 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px 0 0 10px;
  background: #ffffff;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px 0 0 10px;
  background: rgb(224, 224, 224)
}

::-webkit-scrollbar-thumb:hover {
  border-radius: 10px 0 0 10px;
  background: #555;
}
</style>