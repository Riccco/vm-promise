<template>
  <div class="home">
    <vm-promise @vm-promise-pending="pending" showModel="loading" :promiseData="promiseData">
      <template #pending>
        发送中1
      </template>
      <template #data>
          发送成功
      </template>
      <template #rejected>
        请求失败
      </template>
    </vm-promise>

    <router-link to="resolveDemo" > go </router-link>
  </div>
</template>

<script>
import VmPromise from "@/plugins/vm-promise";
export default {
  components:{
    VmPromise
  },
  data(){
    return{
      promiseData:null
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
    // this.promiseData = getTest()
    setTimeout(()=>{
      // this.promiseData = [getTest('resolve')]
      this.promiseData = getTest()
    },1000)
    // this.promiseData = [getTest('resolve')]

  },
  methods:{
    pending(){
      console.log('发送中')
    }
  }



}
</script>
