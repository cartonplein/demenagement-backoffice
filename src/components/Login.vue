<template>
    <div id="login" style="height: 100%">
      <section>
        <div class="col1">
          <h1>Plateforme Déménagement | CMS</h1>
        </div>
        <div class="col2">
          <h1>Se connecter</h1>
          <div id="firebaseui-auth-container"></div>
        </div>
      </section>
    </div>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import { config } from '../db/firebaseConfig.js'

export default {
  name: 'Login',
  mounted() {
    var uiConfig = {
      signInSuccessUrl: '/dashboard',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);

  }
}
</script>

<style lang="scss" scoped>

html, body {
  height: 100%;
  margin: 0;
}

</style>
