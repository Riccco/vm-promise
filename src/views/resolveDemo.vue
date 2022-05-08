<template>
<div>


   <vm-promise @vm-promise-resolve="resolve" showModel="skeleton" :promiseData="promiseData" @vm-promise-pending="pending">
      <template #data>
          <div class="h1-type">加载成功</div>
      </template>

  </vm-promise>

</div>
</template>

<script>
import { Loading } from 'element-ui';
import vmPromise from "@/plugins/vm-promise";
export default {
  components:{
    vmPromise
  },
  data() {
    return {
      fullscreenLoading: false,
      promiseData:null,
      options:{

      }
    }
  },
  created() {

    function getTest(data){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          if(data === 'resolve'){
            resolve(data)
          }else{
            reject('请求失败')
          }
        },2000)
      })
    }
    this.promiseData = getTest('resolve')
  },
  methods: {
    pending(){
      Loading.service();
    },
    resolve(r){
      console.log(r)
      let loadingInstance = Loading.service();
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
    },

  }
}
</script>

<style lang="scss">
  .h1-type{
    color: pink;
    font-size: 30px;
  }
</style>