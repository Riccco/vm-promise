<template>
  <div>
    <div>
      {{computedModel}}
      <template v-if="showModel === 'loading' || showModel === 'skeleton'">
      <template v-if="pending">
        <slot name="pending"></slot>
      </template>

      <template v-if="data || showModel === 'loading' && !rejected">
      <slot  :data="data" name="data"></slot>
      </template>


      <template v-if="rejected">
        <slot name="rejected"></slot>
      </template>

      </template>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    promiseData:[Promise,Array,null],
    showModel:{
      type:String,
      default:'loading'
    }
  },
  data(){
    return{
      pending:null,
      data:null,
      rejected:null,
      errorTips:'Function is not Promise Type, CheckOut propsMethods',
      errorModelTips:'Model is not true String,please checkout you props'
    }
  },
  computed:{
    // eslint-disable-next-line vue/return-in-computed-property
    computedModel(){
      if(this.showModel !== "loading" && this.showModel !==  "skeleton"){
        throw new Error(this.errorModelTips)
      }
    }
  },
  created() {
    if(this.promiseData !== null)this.checkoutType()
  },
  watch:{
    promiseData:'promiseFun',
    deep:true,
    pending(newVal){
      if(newVal)this.$emit('vm-promise-pending',)
    },
  },
  methods:{
    isPromise(fun){
      const isObject = fun instanceof Object
      const isFunction = fun.then instanceof Function && fun.catch instanceof Function
      return isObject && isFunction
    },
    checkoutType(){
      const checkPromise = this.isPromise(this.promiseData)
      if(this.promiseData !== null && checkPromise){
          this.promiseFun(this.promiseData)
      }else if(this.promiseData !== null && this.promiseData instanceof Array){
          this.promiseArray()
      }else if(this.promiseData !== null){
        throw new Error(this.errorTips)
      }
    },
    promiseFun(fun = this.promiseFun){
      console.log('运行')
      this.pending = true
      fun.then((r) => {
        this.$emit('vm-promise-resolve',this.data)
        this.pending = null
        this.data = r
        console.log(r)
      }).catch((error) => {
        this.$emit('vm-promise-reject',error)
        this.pending = null
        this.rejected = true
      })
    },
    promiseArray(){
        let arr = this.promiseData
        let isPromise = true
        arr.forEach(e=>{
          isPromise = this.isPromise(e)
        })

      if(isPromise){
        let arrPromise =Promise.all([...arr])
        this.promiseFun(arrPromise)
      }else{
        throw new Error(this.errorTips)
      }
    }
  }
}
</script>
