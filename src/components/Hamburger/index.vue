<template>
	<div style="padding: 0 15px;" @click="toggleClick">
		<i :class="isActive?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
	</div>
</template>

<script>
export default {
	name: 'Hamburger',
	props: {
		isActive: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		toggleClick() {
			this.$emit('toggleClick')
		}
	}
}
</script>

<style scoped>
</style>
