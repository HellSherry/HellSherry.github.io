<script setup lang="jsx">
import {ref} from "vue";
import {useCounterStore} from "@/stores/counter";
import VueCentre from "@/components/practice/VueCentre.vue";
import VueHistory from "@/components/practice/VueHistory.vue";

const store = useCounterStore();

const value = ref(1);
const tab = ref(1);
</script>

<template>
<!--    <div :style="`background-image: url('${store.darkT? `http://hbimg.huaban.com/8e149140bd05698de8174d7d575ef065263e42d818388b-4YqBxT`:`http://hbimg.huaban.com/8e149140bd05698de8174d7d575ef065263e42d818388b-4YqBxT`}');background-repeat: no-repeat;background-size: cover;min-height: 40vh;background-position-y: 44%;margin-top: -20px`">-->
  <div style="background-position: center" :style="`background-image: url('${store.darkT? `//pic.sherry.games/assets/image/mobileback/th (${Math.round(Math.random()*30)}).jpg`:`//pic.sherry.games/assets/image/mobileback/th (${Math.round(Math.random()*30)}).jpg`}');background-repeat: no-repeat;background-size: cover;min-height: 40vh ;margin-top: -20px`">

  </div>
  <t-card :bordered="false" hoverShadow style="width: 96%;margin: 0 auto;margin-top: -40px;min-height: 60vh">
  <t-tabs v-model="value">
    <t-tab-panel :value="1" label="分类自测" :destroy-on-hide="false">
<VueCentre>

</VueCentre>
    </t-tab-panel>
    <t-tab-panel :value="2" label="我的历史" :destroy-on-hide="false">
      <template #panel>
<VueHistory/>
      </template>
    </t-tab-panel>
<!--    <t-tab-panel :value="3" label="本班排行" :destroy-on-hide="false">-->
<!--      <template #panel>-->
<!--        <p style="padding: 25px">选项卡3的内容，使用 t-tab-panel 渲染</p>-->
<!--      </template>-->
<!--    </t-tab-panel>-->
<!--    <t-tab-panel :value="4" label="本校排行" :destroy-on-hide="false">-->
<!--      <template #panel>-->
<!--        <p style="padding: 25px">选项卡4的内容，使用 t-tab-panel 渲染</p>-->
<!--      </template>-->
<!--    </t-tab-panel>-->

  </t-tabs>
  </t-card>

</template>

<style scoped>

</style>