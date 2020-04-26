<template>
	<section>
		<el-button type="default" @click="back" round>返回列表</el-button>
	</section>
</template>

<script>
export default {
  name: "goodsDetail",
  data() {
    return {};
  },
  methods: {
    //返回列表
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
