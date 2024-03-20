<template>
  <div class="centre">
<!--    <div class="centre-div-top">-->
<!--      <a class="centre-span">分类自测</a>-->
<!--      <a class="centre-span">本班排行</a>-->
<!--      <a class="centre-span">分类自测</a>-->
<!--      <a class="centre-span">分类自测</a>-->
<!--    </div>-->
    <div >
      <div class="ck"  style="margin-top: 20px" >
        <span>每日刷题</span>
      </div>
      <div class="like"  style="text-align: center; " >
        <t-row style="margin: 40px auto" justify="space-around">
          <t-col :span="2">
       <span class="centre-span-two">累计答题数:{{ Accumulative }}</span>

          </t-col>
          <t-col :span="2">
      <span class="centre-span-two">实际答题数:{{ practical }}</span>

          </t-col>
          <t-col :span="2">        <span class="centre-span-two">正确率:{{ calculateCorrectRate }}</span>


          </t-col>
        </t-row>
      </div>
      <div class="ck">
        <span>测试</span>
      </div>
      <t-row  style="text-align: center;margin: 40px auto "   justify="space-around">
        <t-col v-for="i in 3" :span="2">
<div  class="img_container" >
          <img src="//pic.sherry.games/assets/image/logo.jpeg" class="test_list_img centre_img round"   /><br>
          <h3 style="line-height: 0px"    class="span-centre">试题测试</h3>
          <span class="span-centre-but"><t-button class="centre-but" @click="showPopup">进入测试</t-button></span>
        </div>
        </t-col>

      </t-row>

    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      Accumulative: 0,
      practical: 0,
      ishowPopup: false,
      user: this.$route.query.name,
      password: this.$route.query.password
    };
  },
  created() {
    console.log(this.user);
    console.log(this.password);
  },
  methods: {
    showPopup() {
      this.$router.push({
        name: 'topic',
        query: { user:this.user,password:this.password}
      })
    }
  },

  computed: {
    calculateCorrectRate: function () {
      if (this.practical === 0) {
        return "0%";
      }
      return (this.Accumulative / this.practical).toFixed(2) + "%";
    },
  }
};
</script>
 
<style scoped>
img{
  width: 100px;
}
</style>