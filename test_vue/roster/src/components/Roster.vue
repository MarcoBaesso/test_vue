<template>
  <div class="roster">
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Player</th>
          <th>Position</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Birthdate</th>
          <th>Nationality</th>
          <th>Experience</th>
          <th>College</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player of roster" :key="player.num">
          <td>{{ player.num }}</td>
          <td>{{ player.player }}</td>
          <td>{{ player.pos }}</td>
          <td>{{ player.ht }}</td>
          <td>{{ player.wt }}</td>
          <td>{{ player.birthdate.toLocaleDateString('it-IT') }}</td>
          <td>{{ player.nat }}</td>
          <td>{{ player.exp }}</td>
          <td>{{ player.college }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Player } from "@/model/player.model";
import { RestService } from "@/services/rest.service";

@Component
export default class Roster extends Vue {
  public roster: Player[] = [];
  mounted() {
    RestService.getRoster().then(playerz => (this.roster = playerz));
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.roster {
  margin: 20px;
}

table {
  border-spacing: 0;
}

table thead {
  background: darkviolet;
  color: white;
}

th {
  padding: 7px;  
}


table thead tr th:first-child {
  border-radius: 5px 0 0 5px;
}

table thead tr th:last-child {
  border-radius: 0 5px 5px 0;
}

td {
  padding: 7px;
}

table tbody tr:nth-child(odd) {
  background-color: lightyellow;
}

table tbody tr td:nth-child(2){
    text-align: left;
}

table tbody tr td:nth-child(1){
    font-weight: bold;
}
</style>