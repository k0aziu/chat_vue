<template>
    <v-navigation-drawer v-model="drawer">
        <v-list>
            <v-list-item prepend-icon="mdi-comment-processing" title="KazCom" subtitle="haha" />
        </v-list>
        <v-divider />
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Strona główna" value="panel" to="/" />
            <v-list-item prepend-icon="mdi-message-text-outline" title="Chat kazcom" to="/chat" />
            <v-list-item prepend-icon="mdi-account" :title="name && email && password ? 'Wyloguj' : 'Zaloguj'" to="/login" @click="logout()" />
        </v-list>
    </v-navigation-drawer>
    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            drawer: false,
            name: null,
            email: null,
            password: null
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_password');
        }
    },
    created() {
        this.name = localStorage.getItem('user_name');
        this.email = localStorage.getItem('user_email');
        this.password = localStorage.getItem('user_password');
    }
}
</script>
