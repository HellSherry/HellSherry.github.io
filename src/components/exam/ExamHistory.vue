<script setup>

import dayjs from "dayjs";
import service from "@/axios/service";
import {ref} from "vue";

const examList = ref([]);
service.get('/exam/selectHistoryListByIdLimit?page=1').then(res => {
  console.log(res)
  examList.value = res.data
})

</script>

<template>
  <t-list style="height: 52vh"  size="small" :split="true">
    <t-list-item v-for=" item in examList">
      <t-list-item-meta image="//pic.sherry.games/assets/image/试卷.png" :title="item.papername"
                        :description="`开始时间：${  dayjs(item.starttime).format('YY年MM月DD日 HH:mm') +'    总分：'+item.totalscore}`"/>
      <template    #action>
        <t-link theme="primary" @click="$router.push('/exam/analysis/'+item.paperid)" > 查看解析 </t-link>
      </template>
    </t-list-item>

  </t-list>
</template>

<style scoped>

</style>