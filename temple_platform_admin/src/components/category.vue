<!--
使用：
1.components: {
        'my-category':()=>import('xiaozhu/vue/components/admin/category.vue')
    }
2.      <my-category :lists="lists"  actionPrefix="/admin/system" actionUrl="/admin/system" canupload="0" type="0"></my-category>的前缀
 -->
<template>
	<div>
		<table class="table table-hover">
			<thead>
				<tr class="ta_th_tr">
					<th>排序</th>
					<th>出生年份</th>
					<th>看经名称</th>
					<th>券数</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(v,key) in lists" v-if="v.type==type">
					<tr class="active" :id="'tr_'+v.id">
						<td><input type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(v.id,v.sort,'sort')" :id="'sort_'+v.id" v-model="v.sort" /></td>
						<td>
							<i v-if="hasSon" class="float_l ico_sh" :data-id="v.id"  @click="toggleChild(v.id,$event)"><img :src="'https://456.doxinsoft.com/images/arrow_right.png'" /></i>
							<input type="text" name="sort" v-model="v.name" class="form-control input_w300 v_name noborder" @blur="blurField(v.id,v.name,'name')" />
						</td>
						<td>
							<input type="text" name="sort" v-model="v.name2" class="form-control input_w300 v_name noborder" @blur="blurField(v.id,v.name2,'name2')" />
						</td>
						<td><input type="text" name="num" class="form-control input_w50 text_center v_name noborder" @blur="blurField(v.id,v.num,'num')" :id="'num_'+v.id" v-model="v.num" /></td>
						<td>
							<a v-if="canupload" href="javascript:;" class="btn btn-primary" @click="uploadPic(v.id,v.cover)">{{ v.cover ? '已上传图片' :'上传图片' }}</a>
							<a href="javascript:;" class="btn btn-default del_fc" :data-id="v.id" :data-url="actionUrl" @click="delfc(getSiteName+actionUrl,v.id,key)">删除</a>
						</td>
					</tr>
					<template v-if="v.zclass">
						<template v-for="(son,key2) in v.zclass">
							<tr :class="'zclass_'+v.id" :id="'tr_'+son.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
								<td><input type="text" name="sort" class="form-control input_w50 text_center v_name noborder" @blur="blurField(son.id,son.sort,'sort')" v-model="son.sort" /></td>
								<td class="ope01 seclist" style="padding-left:50px;">
									<input type="text" name="sort" class="form-control input_w300 v_name noborder" @blur="blurField(son.id,son.name,'name')" v-model="son.name" />
								</td>
								<td><input type="text" name="num" class="form-control input_w50 text_center v_name noborder" @blur="blurField(son.id,son.num,'num')" :id="'num_'+son.id" v-model="son.price" /></td>
								<td>
									<a href="javascript:;" class="btn btn-default del_zc" :data-id="son.id" :data-url="actionUrl"@click="delzc(getSiteName+actionUrl,son.id,key,key2)">删除子类别</a>
									<a v-if="canupload" href="javascript:;" class="btn btn-primary" @click="uploadPic(son.id,son.cover)">{{ son.cover ? '已上传图片' :'上传图片' }}</a>
								</td>
							</tr>
						</template>
						<!-- 添加子类别 -->
						<tr :class="' zclass_'+v.id" :id="'add_btn_'+v.id" :style="fid ? fid==v.id && show ? '' : 'display:none' : 'display:none' ">
							<td></td>
							<td colspan="2" class="ope01 seclist" style="padding-left:50px;"><a @click="addZc(v.id)" href="javascript:;" class="btn" :data-id="v.id"><span class="glyphicon glyphicon-plus-sign"></span> 新增子类别</a>
							</td>
						</tr>
						<tr :id="type+'add_form_'+v.id" style="display:none">
							<td>
								<input type="text" v-model="sort" name="sort" class="form-control input_w50 text_center" /></td>
							<td class="ope01 seclist" style="padding-left:50px;">
								<input type="text" v-model="name" name="name" class="form-control input_w300" datatype="*" />
							</td>
							<td class="ope01 seclist" style="padding-left:50px;">
								<input type="text" v-model="num" name="num" class="form-control input_w300" datatype="*" />
							</td>
							<td>
								<input class="btn btn-primary" value="提交" @click="addClass(v.id)">
								<input class="btn btn-default" type="button" :data-id="v.id" value="取消" @click="cancelAdd(v.id)">
							</td>
						</tr>
					</template>
				</template>
				<tr :id="type+'add_btn_'">
					<td></td>
					<td colspan="2" class="ope01 seclist" style="padding-left:50px;"><a href="javascript:;" @click="addZc('')" class="btn btn-primary" data-id=""><span class="glyphicon glyphicon-plus-sign"></span> 新增</a>
					</td>
				</tr>
				<tr :id="type+'add_form_'" style="display:none">
					<td>
						<input type="hidden" name="fid" value="0" />
						<input type="text" name="sort" class="form-control input_w50 text_center" v-model="sort" /></td>
					<td class="ope01 seclist" style="padding-left:50px;">
						<input type="text" name="name" class="form-control input_w300" datatype="*" v-model="name" />
					</td>
					<td class="ope01 seclist" style="padding-left:50px;">
						<input type="text" name="name2" class="form-control input_w300" datatype="*" v-model="name2" />
					</td>
					<td class="ope01 seclist" style="padding-left:50px;">
						<input type="text" name="num" class="form-control input_w300" datatype="*" v-model="num" />
					</td>
					<td>
					<input class="btn btn-primary" value="提交" @click="addClass(0)"> <input class="btn btn-default" type="button" data-id="" value="取消" @click="cancelAdd('')"></td>
				</tr>
			</tbody> <!-- 如果不是职称就显示这个内容 -->
		</table>
		<!-- 上传图片 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
			<div class="el-form-item">
				<label class="el-form-item__label" style="width:100px">上传图片</label>
				<my-upload upurl="product" :uploadLength="1" :fileList="fileList" :sizearr="[120]" opentype="ablank"></my-upload>
			</div>
			<span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="uploadsubmit">确 定</el-button>
	  </span>
		</el-dialog>
		<!-- 上传图片结束 -->
	</div>
</template>
<style type="text/css">
textarea,
input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="datetime-local"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"] {
	border-radius: 0 !important;
	color: #858585;
	padding: 5px 4px;
	line-height: 1.2;
	font-size: 14px;
	font-family: inherit;
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
	-webkit-transition-duration: .1s;
	transition-duration: .1s;
}

.hidd {
	display: none
}

.table thead tr.ta_th_tr {
	background: #EEF1F9;
	border: 0;
	height: 50px;
}

.btn-primary,
.btn-primary:focus {
	background-color: #409EFF !important;
	border-color: #409EFF;
	color: white
}

.btn-default,
.btn-default:focus {
	background-color: #abbac3 !important;
	border-color: #abbac3;
	color: white
}

</style>
<script type="text/javascript">
export default {
	data: function() {
		return {
			name: "",
			sort: 0,
			jiaoyan_score: 0,
			keyan_score: 0,
			getSiteName: this.getSiteName(),
			fid: '',
			num:'',
			show: false,
			name2:'',
			uploadId: 0,
			dialogVisible: false,
			fileList: [],
		}
	},
	updated: function() {

	},
	mounted: function() {
		setTimeout(this.nameFocus, 1500);
	},
	props: ['actionUrl', 'lists', 'canupload', 'type', 'actionPrefix', 'hasSon'], //父类的数据
	methods: {
		addClass: function(pid) {
			var url = this.actionUrl + "/class";
			var that = this;
			this.postAjax(url, { _token: $("#token").val(), num:this.num,name2:this.name2,name: this.name, sort: this.sort, fid: pid, type: this.type, jiaoyan_score: this.jiaoyan_score, keyan_score: this.keyan_score }, function(msg) {
				if (msg.data.status == 2) {
					that.lists = msg.data.lists;
					$("#" + that.type + "add_form_" + pid).hide();
					$("#" + that.type + "add_btn_" + pid).show();
					$('#' + that.type + 'add_form_').hide();
					$("#" + that.type + "add_btn_").show();
					/*$(".add_zc").show();*/
					that.name = "";
					that.sort = 0;
					that.fid = pid;
					that.show = true;
				}
			});
		},

		nameFocus: function() {
			//alert($(".v_name").length);
			$(".v_name").focus(function() {
				$(this).removeClass('noborder');
			});
		},
		addZc: function(id) {
			$("#" + this.type + "add_btn_" + id).hide();
			$("#" + this.type + "add_form_" + id).show();
		},
		cancelAdd: function(id) {
			if (!id) {
				$("#" + this.type + "add_btn_" + id).show();
				$("#" + this.type + "add_form_" + id).hide();
			} else {

				$("#" + this.type + "add_btn_" + id).show();
				$("#" + this.type + "add_form_" + id).hide();
			}

		},
		delzc: function(url, id, parentKey, childrenKey) {
			let that = this;
			if (!confirm("确认要删除吗？")) {
				return false;
			} else {
				var url = this.actionUrl + "/ajaxclass";
				var dataid = id;
				this.postAjax(url, { type: 'del_zc', v: dataid }, msg => {
					that.lists[parentKey].zclass.splice(childrenKey, 1);
				});

			}
		},
		/*删除子类结束*/
		delfc: function(url, id, key) { /*删除父类开始*/
			let that = this;
			if (!confirm("确认要删除吗？")) {
				return false;
			} else {
				var dataid = id;
				var url = this.actionUrl + "/ajaxclass";
				this.postAjax(url, { type: 'del_fc', v: dataid }, msg => {
					that.lists.splice(key, 1);
				});
			}
		},
		/*删除父类结束*/
		blurField: function(id, name, type) {
			var dataid = id;
			var datat = name;
			var datatype = type;
			var value = name;
			var url = this.actionUrl + "/ajaxclass";
			this.postAjax(url, { type: 'update_class', t: datatype, id: id, v: value }, msg => {

			}, "notloading");
			$("#tr_" + id).find("input").addClass('noborder');
		},
		toggleChild: function(fid, event) {
			$(".zclass_" + fid).toggle();
			let obj = event.currentTarget;
			if ($(".zclass_" + fid).is(':hidden')) {
				$(obj).find('img').attr('src',  'https://456.doxinsoft.com/images/arrow_right.png');
			} else {
				$(obj).find('img').attr('src',  'https://456.doxinsoft.com/images/arrow_down.png');
			}
		},
		handleClose(done) {
			this.dialogVisible = false;
		},
		uploadPic(id, cover) {

			this.dialogVisible = true;
			this.uploadId = id;
			if (cover) this.fileList = this.splitCover(cover, "product");
			else this.fileList = [];
		},
		uploadsubmit() {
			var cover = this.implodeCover(this.fileList);
			this.postAjax(this.actionUrl + "/uploadpic", { cover: cover, id: this.uploadId }, msg => {
				this.dialogVisible = false;
				this.lists = msg.data.lists;
			})
		},

	},

	components: {

	}


}

</script>
