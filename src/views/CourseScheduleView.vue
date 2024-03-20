<script setup lang="jsx">
import {ref} from "vue";
import {useCounterStore} from "@/stores/counter";
import dayjs from "dayjs";
import ToHtml from "@/components/answer-correlation/ToHtml.vue";
import service from "@/axios/service";
import ChatTrueView from "@/views/ChatTrueView.vue";

const askDetail = ref();
const message = ref();
service.get('/message/getAll').then(res => {
  message.value = res.data
})


initDetail();

function initDetail() {
  if (false) {
    console.log(1)
    setTimeout(() => {
      initDetail()
    }, 100)
    return;
  }
  service.get('/askQuestion/getReply').then(res => {
    askDetail.value = res.data
  })

}
const getChineseDay = (num) => {
  switch (num)
    {
      case 0:
        return '星期一'
      case 1:
        return '星期二'
      case 2:
        return '星期三'
      case 3:
        return '星期四'
      case 4:
        return '星期五'
      case 5:
        return '星期六'
      case 6:
        return '星期天'
      default:
        return 'day'+num
    }
}

const store = useCounterStore();
const menuItemActive = ref('回复我的');
</script>

<template>
  <div style="background-position: center"
       :style="`background-image: url('${store.darkT? `//pic.sherry.games/assets/image/mobileback/th (${Math.round(Math.random()*30)}).jpg`:`//pic.sherry.games/assets/image/mobileback/th (${Math.round(Math.random()*30)}).jpg`}');background-repeat: no-repeat;background-size: cover;  `">
    <div :class="store.darkT?'boxdark':'box'"
         style=" min-height: 100vh;backdrop-filter: blur(20px);padding-top: 12px">
      <t-layout :class="store.darkT?'boxdark':'box'" style="margin: 0 auto ;width: 90%; ">
        <t-aside style="background-color: #0000">
          <t-menu :class="store.darkT?'tem':'box'" v-model="menuItemActive" :theme="store.darkT?'dark':'light' "
                  default-value="item1" height="550px">
            <template #logo>
              <t-icon style="font-size: 18px" name="send"/> &nbsp;

              课程安排
            </template>
            <t-menu-item value="回复我的"> 回复我的</t-menu-item>
            <t-menu-item value="系统通知"> 系统通知</t-menu-item>
            <t-menu-item value="我的消息"> 我的消息</t-menu-item>

          </t-menu>
        </t-aside>
        <t-content>
          <t-card size="small" style="width: 98%;margin: 8px  auto 0 auto;">

            <h3 style="line-height: 0px">
              {{ menuItemActive }}
            </h3>
          </t-card>
          <t-space :size="8" style=" margin:8px 1%;width: 99%; height: 82vh;overflow: auto;" direction="vertical">

            <t-card style="height: 82vh" v-if="menuItemActive==='回复我的'" size="small">
              <div v-if="askDetail!= undefined && askDetail.length==0">
                <nut-empty description="暂时没有数据哦"></nut-empty>
              </div>
              <div>
                <t-table
                    ref="tableRef"
                    row-key="id"
                    :columns="
                    [

            { colKey: 'day' ,align: 'center' },

            { colKey: 'lesson_1', title: '第一节课\n8:30-9:15',align: 'center' },
            { colKey: 'lesson_2', title: '第二节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'lesson_3', title: '第三节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'lesson_4', title: '第四节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'lesson_5', title: '第五节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'lesson_6', title: '第六节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'lesson_7', title: '第七节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'lesson_8', title: '第八节课\n8:30-9:15' ,align: 'center'},
            { colKey: 'eveningSelfStudy', title: '晚自习\n8:30-9:15' ,align: 'center'},
             ]"
                    :data="[
                        {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },  {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },  {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },  {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },     {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },     {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },     {
                          lesson_1:1,
                          lesson_2:2,
                          lesson_3:3,
                          lesson_4:4,
                          lesson_5:5,
                          lesson_6:6,
                          lesson_7:7,
                          lesson_8:8,
                          eveningSelfStudy:9
                          },

                    ]"

                    :scroll="{ type: 'virtual', rowHeight: 48, bufferSize: 10 }"
                    :bordered="true"
                    lazy-load
                >
                  <template #day="{   rowIndex }">
                    <div style="line-height: 40px">
                      {{  getChineseDay(rowIndex)}}
                    </div>

                  </template>n
                </t-table>
              </div>

            </t-card>


          </t-space>


        </t-content>
      </t-layout>

    </div>
  </div>

</template>

<style scoped>
.box {
  background-color: rgba(255, 255, 255, .48);
}

.tem {
  background-color: rgba(0, 0, 0, .2);
}

.boxdark {
  background-color: rgba(0, 0, 0, .48);
}
</style>