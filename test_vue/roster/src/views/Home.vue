<template>
  <div class="home">
    <StartingFive>
    </StartingFive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import StartingFive from '@/components/StartingFive.vue'; // @ is an alias to /src
import { Player } from '@/model/player.model';


@Component({
  components: {
    StartingFive,
  },
})
export default class Home extends Vue {}
</script>
