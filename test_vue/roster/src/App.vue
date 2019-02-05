<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><i class="fas fa-star"></i><span class="spaced">HOME</span><i class="fas fa-star"></i></router-link>
      <router-link to="/roster"><i class="fas fa-star"></i><span class="spaced">ROSTER</span><i class="fas fa-star"></i></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  padding: 0px;
  margin:0px;
}

.spaced {
  margin-left: 5px;
  margin-right: 5px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: black;
  box-shadow: 0px 5px 2px 0px rgba(0,0,0,0.5);
  margin-bottom: 10px;
}

#nav a {
  font-weight: bold;
  color: darkgray;
  margin-left: 40px;
  font-size: 25px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
