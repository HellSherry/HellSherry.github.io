<template>

  <div style="background-position: center"
       :style="`background-image: url('//pic.sherry.games/assets/image/mobileback/th (${Math.round(Math.random()*30)}).jpg');background-repeat: no-repeat;background-size: cover;  `">
    <div style=" min-height: 100vh;backdrop-filter: blur(20px);padding-top: 1.6vh;padding-bottom: 10px">
      <t-card :bordered="false" hoverShadow style="width: 96%;margin: 0 auto; min-height: 90vh">
        <h2>试题测试</h2>
          <t-collapse expand-mutex>

          <t-collapse-panel v-for="(item, index) in topicList" :value="index">
            <template #header>
              <div v-if="count[index].courseid == 1">Java开发之框架基础技术</div>
              <div v-else>sdafa</div>
            </template>
            <template #default>

<table style="width: 100%">
  <tr>
    <td>{{ item.name }}</td>
    <td><t-progress style="width: 330px;display: inline-block" theme="plump" :percentage="countListAll[index]"/></td>
    <td> <t-button class="but_topic" @click="goToQuestion(item.groupId)">开始测试</t-button></td>
  </tr>
</table>



            </template>
          </t-collapse-panel>


        </t-collapse>


      </t-card>
    </div>
  </div>


  <div>
    <div>
      <div>


        <div v-for="(item, index) in topicList" :key="index">
          <el-collapse accordion style="width: 80%;display: inline-block;margin-left: 200px;">
            <el-collapse-item>
              <template slot="title">
                <div v-if="count[index].courseid == 1">Java开发之框架基础技术</div>
                <div v-else>sdafa</div>
              </template>
              <el-row :gutter="20">
                <el-col :span="4">
                  <div class="grid-content bg-purple"><span>{{ item.name }}</span></div>
                </el-col>
                <el-col :span="16">fdgsdg
                  {{ countListAll[index] }}
                  <div class="grid-content bg-purple">
                    <el-progress :text-inside="true"
                                 style="width: 400px;margin-left: 400px;" :stroke-width="26"
                                 :percentage="countListAll[index]"></el-progress>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <div>
                      <button class="but_topic" @click="goToQuestion(item.groupId)">开始测试</button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useCounterStore} from "@/stores/counter";
import {mapState} from 'pinia'
import TestEcharts from "@/manage/compoments/TestEcharts.vue";
import {DialogPlugin} from "tdesign-vue-next";
import axios1 from "@/axios/axios1";

export default {
  components: {TestEcharts},
  data() {
    return {
      topicList: [],
      count: [],
      countList: [],
      countListAll: [],
      percentList: [],
      groupIdList: [],
      List: [],
      cname: '',
      user: this.$route.query.user,
      password: this.$route.query.password
    };
  }, computed: {
    ...mapState(useCounterStore, ['loginUser'])
  },

  methods: {
    goToQuestion(id) {
       if (this.countListAll[id - 1] >= 100) {
        const confirmDia = DialogPlugin({
          header: '提示',
          body: '你已完成所有题目测试,是否重新测试？',
          confirmBtn: {
            content: '重新测试',
            theme: 'primary',
          },
          cancelBtn: {content: '取消', variant: 'outline'},
          onConfirm: ({e}) => {
            this.$router.push({
              name: 'question',
              query: {id: id}
            })
            confirmDia.hide();
          }
        });
      }else
      this.$router.push({
        name: 'question',
        query: {id: id}
      })
    },
    deleteTopic() {
      axios1.post("/QuestionBank", this.groupIdList, {
        params: {
          user: this.loginUser.sub.username,
          password: 1
        }
      })
          .then((response) => {
            this.countListAll = response.data.result;
            console.log(this.countListAll);
          })
    },

  },
  async created() {
    console.log("user:" + this.user + "password:" + this.password);
    console.log();
    try {
      await axios1.get("/Question")
          .then((response) => {
            console.log(response)
            this.topicList = response.data.result;
            this.count = response.data.result;
            console.log(this.topicList);
            this.topicList.forEach(element => {
              // 将 groupId 添加到数组中
              this.groupIdList.push(element.groupId);
            });
            this.deleteTopic();
          });
    } catch (error) {
      console.error(error);
    }

    try {
      axios1.get("/QuestionCourse")
          .then((response) => {
            this.countList = response.data.result;
            console.log(response.data.result);
          })
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
</style>
 