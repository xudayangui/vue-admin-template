<template>
  <el-menu
    :collapse="false"
    :router="true"
    :default-active="$route.fullPath"
    class="nav-menu"
    mode="vertical"
    @select="handleSelect"
    background-color="#202c3a"
    text-color="#fff"
    active-text-color="#ffd04b"
  ></el-menu>
</template>
<script>
export default {
	name: "navMenu",
	methods: {
		handleSelect(key, keyPath) {}
	}
};
</script>
<style lang="less" scoped>
.nav-menu {
	width: 200px;
	height: 100%;
	.fixed-text {
		position: absolute;
		left: 0;
		bottom: 80px;
		width: 100%;
		line-height: 20px;
		text-align: center;
		font-size: 12px;
		color: #999;
	}
}
</style>
<style lang="css">
.el-submenu .el-menu {
	border: none;
	overflow: hidden;
}
</style>