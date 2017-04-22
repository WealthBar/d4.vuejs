<template>
  <div id="app">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleNav">
        <md-icon>menu</md-icon>
      </md-button>

      <router-link class="md-button md-title" to="/">
        D4.VueJS
      </router-link>

      <router-link class="md-button" to="/examples">
        Examples
      </router-link>

      <router-link class="md-button" to="/about">
        About
      </router-link>
    </md-toolbar>

    <md-sidenav class="md-left" ref="nav">
      <md-toolbar class="md-medium">
        <div class="md-toolbar-container">
          <h3 class="md-title">Examples</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <router-link to="/axis">Axis Component</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/line">Line Chart</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/area">Area Chart</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/pie">Pie Chart</router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/donut">Donut Chart</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    watch: {
      $route() {
        this.closeNav();
      },
    },
    methods: {
      closeNav() {
        this.$refs.nav.close();
      },
      toggleNav() {
        this.$refs.nav.toggle();
      },
    },
  };
</script>

<style>
  #app .content {
    margin: 2rem;
  }
</style>
