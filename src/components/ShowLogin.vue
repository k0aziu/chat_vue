<template>
    <v-main justify="center">
        <v-container fluid fill-height justify="center">
            <v-row justify="center" class="mt-10">
                <v-col cols="12" md="4" justify="center">
                    <v-card class="elevation-12" justify="center">
                        <v-toolbar dark color="rgb(224, 224, 224)">
                            <v-toolbar-title class="text-h5">
                                {{ !this.reg ? 'Zaloguj się' : 'Zajerestruj się' }}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form @submit.prevent="login">
                                <v-text-field label="Username" v-model="username" type="text" :rules="nameRules"
                                    required></v-text-field>
                                <v-text-field label="Email" v-model="email" type="email" :rules="emailRules"
                                    required></v-text-field>
                                <v-text-field label="Hasło" v-model="password" type="password" :rules="passwordRules"
                                    required></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="rgb(102, 102, 102)" to="/">
                                Główna
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="rgb(102, 102, 102)" @click="() => { this.reg = !this.reg }">
                                {{ this.reg ? 'Zaloguj się' : 'Zajerestruj się' }}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="rgb(102, 102, 102)" :disabled="!valid"
                                @click="() => { !this.reg ? login() : register() }">
                                Dalej
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'ShowLogin',
    data() {
        return {
            reg: false,
            username: '',
            email: '',
            password: '',
            nameRules: [
                (v) => !!v || 'Nazwa użytkownika jest wymagana',
                (v) => /^[a-zA-Z]{3,15}$/i.test(v) || 'Nazwa użytkownika nie jest poprawna',
            ],
            emailRules: [
                (v) => !!v || 'Email jest wymagany',
                (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(v) || 'Email nie jest poprawny',
            ],
            passwordRules: [
                (v) => !!v || 'Hasło jest wymagane',
                (v) => /^[a-zA-Z]{8,100}$/i.test(v) || 'Hasło nie jest poprawne',
            ],
        }
    },
    methods: {
        login() {
            axios
                .post('/login_user', { name: this.username, email: this.email, password: this.password }, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    const obj = response.data
                    console.log(response.data)
                    if (obj.name === undefined || obj.email === undefined || obj.password === undefined) {
                        return
                    }
                    localStorage.setItem('user_name', obj.name)
                    localStorage.setItem('user_email', obj.email)
                    localStorage.setItem('user_password', obj.password)
                    window.location.href = '/chat';
                })
        },
        register() {
            axios
                .post('/add_user', { name: this.username, email: this.email, password: this.password }, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    const obj = response.data
                    console.log(response.data)
                    if (obj.name === undefined || obj.email === undefined || obj.password === undefined) {
                        return
                    }
                    localStorage.setItem('user_name', obj.name)
                    localStorage.setItem('user_email', obj.email)
                    localStorage.setItem('user_password', obj.password)
                    window.location.href = '/chat';
                })
        },
    },
    computed: {
        valid() {
            return /^[a-zA-Z]{3,15}$/i.test(this.name) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(this.email) && /^[a-zA-Z]{8,100}$/i.test(this.password)
        },
    },
}
</script>
  