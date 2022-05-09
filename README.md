# vm-promise 异步视图工具
  一个异步视图工具,使用该工具后无需关心数据的变化,框架会在合适的时机返回

`npm install vm-promise`


使用
```js
import vmPromise from "vm-promise";
Vue.use(vmPromise)
```
```vue
<vm-promise>
  // ...
</vm-promise>
```

# 使用前

```Vue
<template>
  <div>
    <div v-if="resolve">
<!--     show     -->
    </div>
    
    <div v-else-if="pending">
<!--    show    -->
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      RequestHttp().
      then(r=>{
        // do ...
      }).
      catch(error=>{
        // do ...
      })
    }
  }
</script>
```
  需要手动为每一个异步方法做判断处理


# 使用后

```vue
<div>
   <vm-promise @vm-promise-resolve="resolve" showModel="skeleton" :promiseData="promiseData" @vm-promise-pending="pending">
      <template #data>
          <div>加载成功</div>
      </template>

  </vm-promise>
</div>

<script>
export default {
  data() {
    return {
      promiseData:null,
    }
  }
}
</script>
```

 如代码所示,通过vm-promise的回调我们无需再关心异步的状态,在不同的回调做一些事情即可。
 
# API

* `promiseData` : 接受一个 `null` | `Promise` | `Array`
* `showModel` (String) : 骨架屏模式`skeleton`或加载模式`loading`, 默认为`loading`, 
* `pending` : `<template #pending>` : 当数据为pending状态时你可以做些什么
* `resolve` : `<template #data="data">` : 当数据为pending状态时你可以做些什么并返回一个return的参数
* `resolve` : `<template #resolve>` : 当数据为resolve状态时你可以做些什么
* `@vm-promise-pending` : 一个pending的回调 无参数
* `@vm-promise-resolve` : 一个resolve的回调 返回一个data
* `@vm-promise-reject`  : 一个reject的回调 返回一个error

# 使用案例

```vue
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

export default {
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
```

# 注意

* 当你传递的`promiseData`为 Array时,必须每个数据都为promise,否则返回Error 示例: `[fun(),fun()]`
* 骨架屏模式默认展示为先展示`pending`后展示 `data`,而加载模式默认同时展示`pending` & `data`
