<!-- 企业招聘 -->
<template>
	<section>
		<!-- 如果是列表 -->
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" v-if="showType == 'lists'">
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
			<h2>资讯列表：</h2>
			<el-table :data="ruleForm.children" style="width: 100%">
				<el-table-column prop="position" label="招聘职位"></el-table-column>
				<el-table-column prop="salary" label="工资"></el-table-column>
				<el-table-column prop="need" label="经验要求"></el-table-column>
				<el-table-column label="状态">
					<template scope="scope">
						<el-switch v-model="scope.row.status" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="90">
					<template scope="scope">
						<el-button-group>
							<el-button icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
							<el-button size="mini" icon="el-icon-delete" @click="del(scope.row,scope.$index)"></el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<el-form-item class="mt20">
				<el-button type="primary" @click="add()">添加资讯</el-button>
			</el-form-item>
		</el-form>
		<!-- 如果是列表end -->
		<!-- 如果是createOrEdit -->
		<el-dialog title="添加招聘" :visible.sync="dialogFormVisible" top="141px" width="780px" :before-close="handleClose">
			<el-form :model="ruleFormCreateOrEdit" ref="ruleFormCreateOrEdit" label-width="100px" class="demo-ruleForm" :inline="true">
				<el-form-item label="招聘职位:" prop="position" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-input v-model="ruleFormCreateOrEdit.position"></el-input>
				</el-form-item>
				<el-form-item label="职位薪资:" prop="salary" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-input v-model="ruleFormCreateOrEdit.salary"></el-input>
				</el-form-item>
				<el-form-item label="工作城市:" prop="work_city" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-input v-model="ruleFormCreateOrEdit.work_city"></el-input>
				</el-form-item>
				<el-form-item label="经验要求:" prop="need" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-select v-model="ruleFormCreateOrEdit.need" placeholder="请选择经验要求">
						<el-option label="应届毕业生" value="应届毕业生"></el-option>
						<el-option label="3年及以下" value="3年及以下"></el-option>
						<el-option label="3-5年" value="3-5年"></el-option>
						<el-option label="5-10年" value="5-10年"></el-option>
						<el-option label="10年以上" value="10年以上"></el-option>
						<el-option label="不限" value="不限"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学历要求:" prop="need2" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-select v-model="ruleFormCreateOrEdit.need2" placeholder="请选择学历要求">
						<el-option label="大专" value="大专"></el-option>
						<el-option label="本科" value="本科"></el-option>
						<el-option label="研究生" value="研究生"></el-option>
						<el-option label="硕士" value="硕士"></el-option>
						<el-option label="不限" value="不限"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="结束日期:" prop="end_date" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-date-picker type="date" placeholder="选择日期" v-model="ruleFormCreateOrEdit.end_date"></el-date-picker>
				</el-form-item>
				<el-form-item label="详细地址:" prop="address" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-input v-model="ruleFormCreateOrEdit.address" style="width: 382px;"></el-input>
					<el-button @click.prevent="chooseLocation()">重新定位</el-button>
				</el-form-item>
				<div class="el-form-item" style="padding-left: 100px;width: 100%;">
					<div class="el-form-item__content" style="width:100%">
						<myeditor :content="ruleFormCreateOrEdit.content ? ruleFormCreateOrEdit.content : ''" ref="editor"></myeditor>
					</div>
				</div>
				<el-form-item style="padding-left: 100px;">
					<el-button type="primary" @click="submitForm('ruleFormCreateOrEdit')">立即创建</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
	</section>
</template>
<script type="text/javascript">
import myeditor from "@/components/editor.vue";
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
export default {
	props: ["ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
			showType: 'lists',
			auth: 'add',
			dialogFormVisible: false,
			ruleFormCreateOrEdit: {}
		}
	},
	methods: {
		edit(row) {
			this.auth = "edit";
			this.ruleFormCreateOrEdit = row;
			this.dialogFormVisible = true;
			setTimeout(() => {
				this.$refs.editor.setContent(row.content);
			}, 500)
		},
		changeStatus(row) {
			console.log(row);
		},
		add() {
			this.auth = "add";
			this.dialogFormVisible = true;
			this.ruleFormCreateOrEdit = { position: '', salary: '', status: 0, published_at: this.getDate(new Date()), work_city: '', need: '', address: '', need2: '', end_date: '', location_x: '', location_y: '' }
			this.ruleForm.children.push(this.ruleFormCreateOrEdit);
			setTimeout(() => {
				this.$refs.editor.setContent("");
			}, 500)
		},
		del(v, index) {
			this.getConfirm("是否删除?", msg => {
				this.ruleForm.children.splice(index, 1);
			});
		},
		handleClose() {
			this.dialogFormVisible = false;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.ruleFormCreateOrEdit.content = this.$refs.editor.getContent();
					/*if(this.auth == "edit"){
						 this.ruleForm.children[this.ruleForm.children.length-1]=this.ruleFormCreateOrEdit;
					}else{
						 this.ruleForm.children.push(this.ruleFormCreateOrEdit);
					}*/

					this.dialogFormVisible = false;
				}
			});
		},
		chooseLocation() {
			this.$refs.chooseLocation.ajax();
		},
		locationCallBack(res) {
			this.$refs.chooseLocation.handleClose();
			this.ruleFormCreateOrEdit.address = res.poiaddress;
			this.ruleFormCreateOrEdit.location_x = res.latlng.lng;
			this.ruleFormCreateOrEdit.location_y = res.latlng.lat;

		},
	},
	components: {
		myeditor,
		chooseLocation
	}
}

</script>
