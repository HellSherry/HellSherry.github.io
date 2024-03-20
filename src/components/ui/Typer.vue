<script>
import EasyTyper from 'easy-typer-js'

export default {
  name: 'home',
  data() {
    return {
      obj: {
        output: '',
        isEnd: false,
        speed: 80,
        singleBack: false,
        sleep: 0,
        type: 'normal',
        backSpeed: 40,
        sentencePause:false
  }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.fetchData()
    }
    ,
    initTyped(input, fn, hooks)
    {
      const obj = this.obj
      const typed = new EasyTyper(obj, input, fn, hooks)
    },
    fetchData() {
      // 一言Api进行打字机循环输出效果
      fetch('https://v1.hitokoto.cn')
          .then(res => {
            return res.json()
          })
          .then(({hitokoto}) => {
                this.initTyped(hitokoto)
                    .catch(err => {
                      console.error(err)
                    })
              })
    }
  }
}

</script>

<template>
  <div>
    {{ obj.output }}
    <span class="easy-typed-cursor"></span>
  </div>
</template>

<style scoped>

</style>