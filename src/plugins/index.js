import vmPromise from "./vm-promise"; // 引入封装好的组件

// 批量组件注册
const install = function (Vue) {
    Vue.component('vmPromise', vmPromise);
};

export default install; // 这个方法以后再使用的时候可以被use调用