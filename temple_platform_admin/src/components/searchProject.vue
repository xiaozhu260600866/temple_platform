<template id="search_member">
	<div class="search_box" style="">
	   <el-input v-model="searchMemberVal" @keyup.enter.native="searchMember($event,'keyup')" autocomplete="false" @click.native="selectAll($event)" :class="myclass">
			<span class="el-input__icon el-icon-caret-bottom" @click="searchMember($event,'click')" slot="append"></span>
		</el-input>
		<!-- 搜索结果层 -->
		<div class="memberInfo" :style="{width:width}" v-show="memberInfoDig">
			<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading" @row-click="selectMemberNew">
				<el-table-column prop="name" label="项目名称"> </el-table-column>
				<el-table-column prop="created_at" label="时间"> </el-table-column>
			</el-table>
			<el-col :span="24" class="toolbar" style='margin:10px 0'>
				<el-pagination  @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[60]" :page-size="60" layout="total, sizes, prev, pager, next, jumper" :total="data.total" style='float: right'></el-pagination>
			</el-col>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	props:["ismember","source",'width','isunit','myclass'],
	data() {
		return {
			searchMemberVal: '',
			formAction: '/admin/project/lists?online=0',
			memberInfo: {},
			data: this.formatData(this),
			memberData: [],
			listLoadingMember: false,
			memberInfoDig: false,
			page: 1,
			lists:[]
		}
	},
	methods: {
		selectAll(event) {
			var obj = event.currentTarget;
			$(obj).select();
		},
		searchMember(event,type) {
			console.log(event.key);
			if (type == "click") this.memberInfoDig = !this.memberInfoDig;
			else this.memberInfoDig = true;
		  
			if (this.memberInfoDig) {
				this.ajax();
			}

		},
		ajax() {
			var this_ = this;
			var val = this.searchMemberVal;
			this.postAjax(this.formAction,{role:2,cashier:true,content:this.searchMemberVal,page:this.page},'','notLoading').then(msg=>{
				  this.data.thisPage = msg.data.lists.current_page;
				  this.data.total = msg.data.lists.total;
				  this.data.lists = msg.data.lists.data;
				  for (var i in msg.data) {
					  if (i != "lists") {
						  this.$set(this.data, i, msg.data[i]);
					  }
				  }
				  this.data.listLoading = false;
			});


		},
		handleCurrentChange(val) {
			this.page = val;
			this.ajax();
		},
		selectMemberNew(item) {
		   this.$emit('callback', item);
		   this.searchMemberVal = item.username;
		   this.memberInfoDig = false;
			
		}
	},
}

</script>
<style type="text/css">
.search_box {position: relative;width: 100%;}
.search_box>.el-input .el-input__inner{padding: 0 5px!important;font-size: 15px;color: #333;}
.search_box>.el-input .el-input-group__append{padding: 0 10px!important;border: 0!important;border-radius: 0!important;}

.icon {
	position: absolute;
	top: 0;
	right: -10px;
	z-index: 999;
	display: inline-block;
	width: 18px;
	height: 34px;
	line-height: 34px;
	background: #f3f3f3;
	text-align: center;
}

.memberInfo {min-height: 60px;width: 61vw;background-color: #F5F5F5;padding: 10px;position: absolute;top: 35px;z-index: 99;padding: 0;-moz-box-shadow: 1px 2px 8px #ddd;-webkit-box-shadow: 1px 2px 8px #ddd;box-shadow: 1px 2px 8px #ddd;}
.table {margin-bottom: 0;}
.memberInfo tr:hover {cursor: pointer}

</style>
