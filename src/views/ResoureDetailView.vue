<script setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import service from "@/axios/service";
import dayjs from "dayjs";
import {useCounterStore} from "@/stores/counter";
import {MessagePlugin} from "tdesign-vue-next";
import ToHtml from "@/components/answer-correlation/ToHtml.vue";

const store = useCounterStore();

const router = useRouter();
const id = router.currentRoute.value.params.id
const resourceItem = ref();

const askDetail = ref();
if (sessionStorage.getItem(`resource-${id} `) != null) {
  resourceItem.value = JSON.parse(sessionStorage.getItem(`resource-${id} `))
} else {
  service.get('/public/soft/getDetail?id=' + id).then(res => {
    resourceItem.value = res.data
  })
}
initDetail()

const addDialog = ref(false);
const addInput = ref('');
function addAsk() {
  if (addInput.value.trim()=='') {
    MessagePlugin.error("请输入内容");
    addInput.value=''
    return;
  }
  service.get("/public/soft/addRes?context="+addInput.value+"&askId="+id+"&askUser="+resourceItem.value.creatorUser).then((res) => {
    addDialog.value=false;
initDetail()
  })
}
function initDetail() {
  if (resourceItem.value == null) {
    console.log(1)
    setTimeout(() => {
      initDetail()
    }, 100)
    return;
  }
  service.get('/public/soft/getDetail?id=' + id).then(res => {
    askDetail.value = res.data
  })

}


</script>

<template>
  <t-dialog :visible="addDialog" :close-btn="true" confirm-btn="提交" cancel-btn="取消"
            :onConfirm="addAsk"
            :on-close="()=>{addDialog=false}">
    <template #header>解答问题</template>
    <template #body>
      <t-textarea
          style="margin-bottom: -10px"
          v-model="addInput"
          placeholder="请输入解答"
          name="description"
          :autosize="{ minRows: 1, maxRows: 5 }"
      />
    </template>
  </t-dialog>

  <div style="background-image: url('//pic.sherry.games/assets/image/back.jpg');">
    <div :class="store.darkT?'boxdark':'box'" style=" min-height: 100vh;backdrop-filter: blur(10PX);padding-top:16px">

      <t-layout style="max-width: 1080px;margin:  0 auto;background-color: #0000">
        <t-content>

          <t-card v-if="resourceItem!=null" style="border-radius: 12px;min-height: 90vh; height: 90%;margin-bottom: 2%;width: 99%;" header-bordered>
            <template #title>
              <t-button style="margin-right: 4px" shape="circle" variant="outline" theme="primary">
                <template #icon> <t-icon @click="this.$router.go(-1);" name="chevron-left" /></template>
              </t-button>
 软件详情

            </template>
            <template #actions>   <t-button @click="addDialog=true"  shape="round">立即下载</t-button></template>


<div style="margin-left: 40px;margin-top: 20px">
  <t-avatar
      v-bind:image=" resourceItem.icon"
      shape="round"
      style="margin: 4px;border: 1.2px solid #0052d9;margin-right: 20px;border-radius: 12px" size="160px">
  </t-avatar>
  <div style=" display: inline-block;height: 160px;vertical-align: middle">
    <h2 style="line-height: 10px">{{ resourceItem.name }}</h2>
<p>{{resourceItem.company}}</p>
    <div style="margin-top: -4px;margin-bottom: 12px">
      <t-tag size="small" >
        <t-icon name="animation" />

        {{resourceItem.size}}M</t-tag>
      <t-tag  size="small" style="margin-left: 6px" >
        <t-icon name="cloud-download" />

        {{resourceItem.quantity}} </t-tag>


      <t-tag  size="small" style="margin-left: 6px" >
        <t-icon name="time" />
        {{
          dayjs(resourceItem.addtime).format('YYYY-MM-DD HH:mm:ss')
        }}
      </t-tag>
    </div>
    <t-button size="large">

      立即下载
      <t-icon style="padding-left: 8px;padding-top: 2px;margin-right: -8px" name="download" />

    </t-button>
  </div>
</div>

<!--            <div >  <nut-empty description="暂时没有问题哦"></nut-empty></div>-->
<div style="width: 90%;margin: 10px auto">
  <h2>简介</h2>
  <p style="font-size: 16px;font-weight: 200">
    {{ resourceItem.particulars  }}
  </p>


</div>


          </t-card>

        </t-content>
      </t-layout>


    </div>
  </div>

</template>

