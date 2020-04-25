<template>
  <div id="app">
    <!-- 会被缓存的视图组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不被缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="css" scoped>
#app {
  height: 100%;
}
</style>