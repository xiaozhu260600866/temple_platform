<template>
	<div class="phone-model">
		<div class="phone-screen">
			<div class="design-preview">
				<div class="wp-config">
					<img  src="../../../../../assets/a.png" alt="">{{ appointmentTitle }}</div>
					<div class="design-content white_theam" style="min-height: 544px;">
						<div id="edit-coms" class="edit-coms">
							<div class="noOne" v-if="lists.length == 0">
								<div class="stic_block">
									<noData></noData>
								</div>
							</div>
							<div class="edit-content" style="position: relative; min-height: 544px;" v-if="lists.length >0">
								<div v-for="(v,index) in lists" style="position:relative" :key="index" @mouseover="v.authDiag = true" @mouseout="v.authDiag = false" class="edit-coms-item" @click="edit(v,index)" :draggable='canSort' @drop='drop($event,index,-1)' @dragstart='drag($event,index)' @dragover='allowDrop($event)'>
									<titleLists v-if="v.type == '标题' " :v="v"></titleLists>
									<textLists v-if="v.type == '文本' " :v="v"></textLists>
									<textareaLists v-if="v.type == '多行文本' " :v="v"></textareaLists>
									<dateLists v-if="v.type == '时间' " :v="v"></dateLists>
									<timeLists v-if="v.type == '日期' " :v="v"></timeLists>
									<radioLists v-if="v.type == '单项选择' " :v="v"></radioLists>
									<checkboxLists v-if="v.type == '多项选择' " :v="v"></checkboxLists>
									<selectLists v-if="v.type == '下拉框' " :v="v"></selectLists>
									<uploadLists v-if="v.type == '上传图片' " :v="v"></uploadLists>
									<addressLists v-if="v.type == '地址' " :v="v"></addressLists>
									<div class="auth" v-if="v.authDiag">
										<div class="down-auth flex-middle flex-center" v-if="index != 0" @click="toUp(index)">
											<i class="iconfont icon-arrow-down fs20 fs-white"></i>
										</div>
										<div class="down-auth flex-middle flex-center" v-if="index != lists.length -1" @click="toDown(index)">
											<i class="iconfont   icon-arrow-up fs20 fs-white"></i>
										</div>
										<div class="down-auth flex-middle flex-center" style="background:#1F2D3D" @click="del(v,index)">
											<i class="iconfont icon-off fs20 fs-white"></i>
										</div>
									</div>
									<div class="mask_compo" v-if="!v.checked"></div>
								</div>
								<div  class="submit-btn flex-center flex-middle" draggable="false" style="position:relative;height:60px">
									<div  class="mask_compo"></div> <button class="dx-btn dx-btn-green" style="width:80%">立即提交</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<style type="text/css" scoped="">
.mask_compo {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.68);
	z-index: 11;
}

.edit-coms-item .auth {
	width: 45px;
	position: absolute;
	top: 0;
	right: -45px;
	background: #324057;
	flex-flow: column;
	display: flex;
	z-index: 90;
}

.edit-coms-item .auth .down-auth {
	width: 100%;
	flex: 1;
	height: 45px;
}

.edit-coms-item :hover {
	cursor: pointer;
}

</style>
<script type="text/javascript">
import titleLists from "./title.vue";
import textLists from "./text.vue";
import textareaLists from "./textarea.vue";
import dateLists from "./date.vue";
import timeLists from "./time.vue";
import radioLists from "./ratio.vue";
import checkboxLists from "./checkbox.vue";
import selectLists from "./select.vue";
import uploadLists from "./upload.vue";
import addressLists from "./address.vue";

export default {
	props: ['lists','appointmentTitle'],
	data() {
		return {
			canSort: true,
			drapStartKey: -1,
		}
	},
	methods: {
		chooseLists(chooseKey) {
			this.lists.forEach((v, i) => {
				if (i == chooseKey) {
					v.checked = true;
					this.$parent.ruleForm = v;
				} else {
					v.checked = false;
				}
			});
		},

		toDown(index) {
			let temp = this.lists[index + 1];
			this.$set(this.lists, index + 1, this.lists[index]);
			this.$set(this.lists, index, temp);

		},
		toUp(index) {
			let temp = this.lists[index - 1];
			this.$set(this.lists, index - 1, this.lists[index]);
			this.$set(this.lists, index, temp);

		},
		del(v, index) {
			this.getConfirm("是否删除" + v.title + '模块 ?', msg => {
				this.lists.splice(index, 1);
				if (this.lists.length) {
					this.chooseLists(this.lists.length - 1);
				} else {
					this.$parent.ruleForm = {};
				}
			});
		},
		add(type) {
			if (type == '标题') {
				this.lists.push({ title: '标题', icon: 1, type: '标题', authDiag: false, checked: true, background: 1 });
			}
			if (type == '文本') {
				this.lists.push({ title: '姓名', icon: 1, type: '文本', isRequire: 1, datatype: 'name', authDiag: false, checked: true, background: 1 });
			}
			if (type == '多行文本') {
				this.lists.push({ title: '文本内容', icon: 1, type: '多行文本', isRequire: 1, authDiag: false, checked: true, background: 1 });
			}
			if (type == '时间') {
				this.lists.push({ title: '时间', icon: 1, type: '时间', isRequire: 1, authDiag: false, checked: true, background: 1 });
			}
			if (type == '日期') {
				this.lists.push({ title: '日期', icon: 1, type: '日期', isRequire: 1, authDiag: false, checked: true, background: 1 });
			}
			if (type == '地址') {
				this.lists.push({ title: '地址', icon: 1, type: '地址', isRequire: 1, authDiag: false, checked: true, background: 1 });
			}
			if (type == '上传图片') {
				this.lists.push({ title: '上传图片', icon: 1, type: '上传图片', isRequire: 1, allowUploadNum: 1, authDiag: false, checked: true, background: 1 });
			}
			if (type == '单项选择') {
				this.lists.push({
					title: '单项选择',
					icon: 1,
					type: '单项选择',
					isRequire: 1,
					authDiag: false,
					checked: true,
					background: 1,
					children: [
						{ label: '选项一', value: '选项一' },
						{ label: '选项二', value: '选项二' },
						{ label: '选项三', value: '选项三' },
					]
				});
			}
			if (type == '多项选择') {
				this.lists.push({
					title: '多项选择',
					icon: 1,
					type: '多项选择',
					isRequire: 1,
					authDiag: false,
					checked: true,
					background: 1,
					children: [
						{ label: '选项一', value: '选项一' },
						{ label: '选项二', value: '选项二' },
						{ label: '选项三', value: '选项三' },
					]
				});
			}
			if (type == '下拉框') {
				this.lists.push({
					title: '下拉框',
					icon: 1,
					type: '下拉框',
					isRequire: 1,
					authDiag: false,
					checked: true,
					background: 1,
					children: [
						{ label: '选项一', value: '选项一' },
						{ label: '选项二', value: '选项二' },
						{ label: '选项三', value: '选项三' },
					]
				});
			}
			this.chooseLists(this.lists.length - 1);
		},
		edit(v, chooseKey) {
			this.chooseLists(chooseKey);
			this.$parent.ruleForm = v;
		},
		drag(ev, key) {
			this.chooseLists(key);
			this.$parent.ruleForm = this.lists[key];
			this.drapStartKey = key;

		},
		drop(ev, endkey) {
			if (this.canSort) {
				let temp = this.lists[this.drapStartKey];
				this.lists.splice(this.drapStartKey, 1);
				this.lists.splice(endkey, 0, temp);
			}
		},
		allowDrop(ev) {
			ev.preventDefault();
		},

	},
	components: {
		titleLists,
		textLists,
		textareaLists,
		dateLists,
		timeLists,
		radioLists,
		checkboxLists,
		selectLists,
		uploadLists,
		addressLists
	}
}

</script>
