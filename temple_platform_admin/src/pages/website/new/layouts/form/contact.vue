<!-- 管理团队 -->
<template>
	<section>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="组件标题：" prop="title">
				<el-input v-model="ruleForm.title" style="width:60%" maxlength="32"> </el-input>
			</el-form-item>
			<el-form-item label="选择图标：">
				<el-col :span="18">
					<div class="ivu-input-wrapper ivu-input-type" v-for="(v,key) in 10">
						<div :class="['config-out', 'config-out-click', (key+1) == ruleForm.icon ?  'checkedIcon' :'']" @click="ruleForm.icon = (key+1)">
							<img :src="siteName+'/images/website/chooseIcon'+(key+1)+'.png'" class="config-icon">
               				</div>
						</div>
				</el-col>
			</el-form-item>
			<div class="edit-item" v-for="(v,index) in ruleForm.children">
				<div class="auth text-right" v-if="ruleForm.children.length>1">
					<a href="javascript:;" class="iconfont down fs20 pr20" v-if="index != ruleForm.children.length -1" @click="toDown(index)"></a>
					<a href="javascript:;" class="iconfont up fs20 pr20" v-if="index != 0" @click="toUp(index)"></a>
					<a href="javascript:;" class="iconfont del fs20" @click="del(v,index)"></a>
				</div>
				<el-form-item label="控件名称" prop="name">
					<el-input v-model="v.name" style="width:60%" maxlength="32"> </el-input>
				</el-form-item>
				<el-form-item :label="v.type == 0 ? '详情地址' : '联系电话'">
					<el-input v-model="v.value" style="width:60%" maxlength="32"></el-input>
					<el-button @click.prevent="chooseLocation(index)" v-if="v.type == 0" style="padding: 12px 10px;">重新定位</el-button>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" @click="add(0)">添加地址</el-button>
				<el-button type="primary" @click="add(1)">添加电话</el-button>
			</el-form-item>
		</el-form>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</section>
</template>
<script type="text/javascript">
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
export default {
	props: ["ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
			selectKey: -1,
		}
	},
	methods: {
		chooseLocation(selectKey) {
			this.selectKey = selectKey;
			this.$refs.chooseLocation.ajax();
		},
		del(v, index) {
			this.getConfirm("是否删除?", msg => {
				this.ruleForm.children.splice(index, 1);
			});
		},
		add(type) {
			if (type == 0) {
				var data = { name: '地址', value: '人民路', type: 0, location_x: '', location_y: '' };
			} else {
				var data = { name: '电话', value: '133', type: 1 };
			}
			this.ruleForm.children.push(data);
		},
		locationCallBack(res) {

			this.$refs.chooseLocation.handleClose();
			this.ruleForm.children[this.selectKey].value = res.poiaddress;
			this.ruleForm.children[this.selectKey].location_x = res.latlng.lng;
			this.ruleForm.children[this.selectKey].location_y = res.latlng.lat;
			console.log(this.ruleForm.children);
		},
		toDown(index) {
			let temp = this.ruleForm.children[index + 1];
			this.$set(this.ruleForm.children, index + 1, this.ruleForm.children[index]);
			this.$set(this.ruleForm.children, index, temp);
		},
		toUp(index) {
			let temp = this.ruleForm.children[index - 1];
			this.$set(this.ruleForm.children, index - 1, this.ruleForm.children[index]);
			this.$set(this.ruleForm.children, index, temp);
		}
	},
	components: {
		chooseLocation
	}
}

</script>
