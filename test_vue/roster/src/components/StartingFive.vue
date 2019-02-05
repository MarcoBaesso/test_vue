<template>
  <div class="starting-five">
    <div class="team">
      <div
        class="player"
        v-for="player of quintet"
        :key="player.num"
        @click="playerChanged(player)"
      >
        <div class="player-name">{{ player.jersey.toUpperCase() }}</div>
        <div class="player-number">{{ player.num }}</div>
      </div>
    </div>
    <PlayerInfo :player="player" :players="benchWarmers" @closed="clearAll"></PlayerInfo>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Player } from "@/model/player.model";
import { RestService } from "@/services/rest.service";
import PlayerInfo from "@/components/PlayerInfo.vue";

@Component({
  components: {
    PlayerInfo
  }
})
export default class StartingFive extends Vue {
  public quintet: Player[] = [];
  public player: Player | null = null;
  public benchWarmers: Player[] | null = null;

  mounted() {
    RestService.getQuintet().then(playerz => (this.quintet = playerz));
  }

  playerChanged(player: Player) {
    this.player = player;
    RestService.getBenchwarmers().then(res => (this.benchWarmers = res));
  }

  clearAll() {
    this.player = null;
    this.benchWarmers = null;
  }

  private onSwap(players: Player[], to: number) {
    {
      let _player = players.find(p => p.num === to);
      if (_player) {
        this.playerChanged(_player);
      }
    }
  }

  swap(to: number) {
    if (this.player) {
      RestService.swap(Number(this.player.num), to).then(res =>
        this.onSwap(res, to)
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.team {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}

.player {
  width: 250px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
  padding: 10px;
  background: linear-gradient(to bottom, gold 30%, darkviolet 95%);
  border-radius: 15px;
  border: 2px solid black;
  box-shadow: 5px 5px 2px 0px rgba(0, 0, 0, 0.9);
  cursor: pointer;
}

.player-name {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: white;
  font-size: 30px;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
}

.player-number {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: white;
  font-size: 130px;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 2px;
}
</style>
