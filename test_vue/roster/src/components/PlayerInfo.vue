<template>
  <div class="playerInfo" v-if="show">
    <transition name="fade">
      <div class="player">
        <div class="header">
          <h2>{{ player.player }}</h2>
          <div class="close" v-on:click="onClose">
            <i class="far fa-window-close" aria-hidden="true"></i>
          </div>
        </div>
        <dl v-if="Boolean(player)">
          <div class="definition">
            <dt>Position</dt>
            <dd>{{ player.pos }}</dd>
          </div>
          <div class="definition">
            <dt>Height</dt>
            <dd>{{ player.ht }}</dd>
          </div>
          <div class="definition">
            <dt>Weight</dt>
            <dd>{{ player.wt }}</dd>
          </div>
          <div class="definition">
            <dt>Birthdate</dt>
            <dd>{{ player.birthdate.toLocaleString('IT-it')}}</dd>
          </div>
          <div class="definition">
            <dt>Nationality</dt>
            <dd>{{ player.nat}}</dd>
          </div>
        </dl>
        <div class="replace">
          <h4>replace with...</h4>
          <div v-for="player of players" :key="player.num">
            <div class="swap-line">
              <div>{{ player.num }} - {{ player.player }}</div>
              <div class="swap">
                <i class="fas fa-sync" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Player } from "@/model/player.model";
import { RestService } from "@/services/rest.service";

@Component
export default class PlayerInfo extends Vue {
  @Prop() private player!: Player;
  @Prop() private players!: Player[];
  private show: boolean = false;

  @Watch("player")
  private onPlayerChanged(value: Player, oldvalue: Player) {
    this.show = Boolean(value);
  }

  @Emit("closed")
  private onClose() {
    this.show = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playerInfo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.header h2 {
  color: darkviolet;
  font-weight: bold;
}

.player {
  background-color: white;
  color: black;
  width: 400px;
  height: 500px;
  border-radius: 5px;
  border: 2px solid darkgray;
  box-shadow: 5px 5px 2px 0px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.close {
  color: darkgray;
  cursor: pointer;
}

dt {
  width: 80px;
  text-align: left;
  font-weight: bold;
}

h4 {
  text-align: left;
  margin-bottom: 10px;
  color: gray;
  font-style: italic;
}

.definition {
  display: flex;
}

.header {
  display: flex;
  justify-content: space-between;
}

.swap-line {
  display: flex;
  justify-content: space-between;
}

.swap {
  cursor: pointer;
}

.replace {
  margin-top: 60px;
}
</style>