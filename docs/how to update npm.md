# 发布前准备

1. 添加`plugins`文件夹，将插件全部添加进去
2. 添加`index.js`文件并配置

```javascript
import xxxx from "../plugins/plugins.vue"; // 引入封装好的组件
const coms = [xxxx]; // 将来如果有其它组件,都可以写到这个数组里

// 批量组件注册
const install = function (Vue) {
  coms.forEach((com) => {
    Vue.component(com.name, com);
  });
};

export default install;
```

3. 配置`package.json`
```json
"package": "vue-cli-service build --target lib ./src/plugins/index.js --name pig-ui --dest pig-ui"
```

--target lib: 打包目录
--name: 打包文件名
--dest: 打包文件夹名

4. `npm run package`: 打包
5. `npm init -y`: 进入生成的文件夹运行
6. 根据需要配置文件夹内的 json文件
7. 注册npm账号
8. `npm config set registry=https://registry.npmjs.org` 设置npm源
9. `npm adduser`: 添加npm用户
10. `npm publish` 发布
11. `npm install xxx` : 下载