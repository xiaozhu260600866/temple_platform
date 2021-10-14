<!-- 图片 -->
<template>
	<section>
		<el-form :model="ruleFormNew" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="样式选择" prop="picType"><span class="fs12 font_666">(切换样式将导致当前的内容丢失)</span></el-form-item>
			<div  class="chose_box">
				<div  :class="['items',ruleFormNew.type == 0 ? 'is-active' : '' ]" @click="editType(0,1)">
					<div  class="r_style_box">
					<img  src="https://website.doxinsoft.com/images/website/pic5.png"alt=""></div> 
					<span >单图文</span>
				</div> 
				<div  :class="['items',ruleFormNew.type == 1 ? 'is-active' : '' ]" @click="editType(1,2)">
					<div  class="r_style_box">
					<img  src="https://website.doxinsoft.com/images/website/pic6.png"alt=""></div> 
					<span >列表图文</span>
				</div>
				<div  :class="['items',ruleFormNew.type == 2 ? 'is-active' : '' ]" @click="editType(2,3)">
					<div  class="r_style_box">
					<img  src="https://website.doxinsoft.com/images/website/pic6.gif"alt=""></div> 
					<span >滑动块文</span>
				</div> 
				<div  :class="['items',ruleFormNew.type == 3 ? 'is-active' : '' ]" @click="editType(3,4)">
					<div  class="r_style_box">
					<img  src="https://website.doxinsoft.com/images/website/pic7.png"alt=""></div> 
					<span >宫格图文</span>
				</div> 
			</div>
			<div v-if="ruleFormNew.type == 3" class="mb20">
				<span class="pr10">行数</span>
				<el-input-number v-model="ruleForm.rowNum" controls-position="right" :min="1" :max="4" @change="changeNum"></el-input-number>
				<span class="pl20 pr10">列数</span>
				<el-input-number v-model="ruleForm.columnNum" controls-position="right" :min="2" :max="4" @change="changeNum"></el-input-number>
			</div>					
			<div class="edit-item" v-for="(children,index) in ruleForm.children">
				<div class="auth text-right" v-if="ruleForm.children.length>1">
					<a href="javascript:;" class="iconfont icon-arrow-down fs20 pr20" v-if="index != ruleForm.children.length -1" @click="toDown(index)"></a>
					<a href="javascript:;" class="iconfont icon-arrow-up fs20 pr20" v-if="index != 0" @click="toUp(index)"></a>
					<a href="javascript:;" class="iconfont icon-off fs20" @click="del(children,index)"></a>
				</div>
			
			<!-- 如果是单图文 -->	
				<div v-if="ruleFormNew.type == 0">

						<my-cropUpload source="delImage" v-model="children.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:5.79}}" message="最佳尺寸：690*400px" label="封面"></my-cropUpload>
						<el-form-item label="文字位置:" prop="newType0Position"></el-form-item>
						<div  class="chose_box">
							<div  :class="['items',children.newType0Position == 'top' ? 'is-active' : '' ]" @click="children.newType0Position = 'top'">
								<div  class="r_style_box">
								<img  src="https://website.doxinsoft.com/images/website/pic8.png"alt=""></div> 
								<span >上图下文</span>
							</div> 
							<div  :class="['items',children.newType0Position == 'down' ? 'is-active' : '' ]" @click="children.newType0Position = 'down'">
								<div  class="r_style_box">
								<img  src="https://website.doxinsoft.com/images/website/pic9.png"alt=""></div> 
								<span >上文下图</span>
							</div>
						</div>
				</div>
			<!-- 如果是单图文结束 -->
			<!-- 如果是列表图文开始 -->
				<div v-if="ruleFormNew.type == 1">
					<my-cropUpload source="delImage"  v-model="children.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:7.87}}" message="最佳尺寸：188*148px" label="封面"></my-cropUpload>
					<el-form-item label="文字位置:" prop="newType0Position"></el-form-item>
					<div  class="chose_box">
						<div  :class="['items',children.newType0Position == 'top' ? 'is-active' : '' ]" @click="children.newType0Position = 'top'">
							<div  class="r_style_box">
							<img  src="https://website.doxinsoft.com/images/website/pic9.png"alt=""></div> 
							<span >图片左方</span>
						</div> 
						<div  :class="['items',children.newType0Position == 'down' ? 'is-active' : '' ]" @click="children.newType0Position = 'down'">
							<div  class="r_style_box">
							<img  src="https://website.doxinsoft.com/images/website/pic10.png"alt=""></div> 
							<span >图片右方</span>
						</div>
					</div>
				</div>
				<!-- 滑动块文 -->
				<div v-if="ruleFormNew.type == 2">
					<my-cropUpload source="delImage"  v-model="children.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:5.77}}" message="最佳尺寸：450*260px" label="封面"></my-cropUpload>
				</div>

					<!-- 如果 是宫格图 -->
				<div v-if="ruleFormNew.type == 3">
					
					<my-cropUpload source="delImage"  v-model="children.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:7.78}}" message="最佳尺寸：188*148px" label="封面" v-if="ruleForm.columnNum == 2"></my-cropUpload>

					<my-cropUpload source="delImage"  v-model="children.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:10}}" message="最佳尺寸：220*220px" label="图片" v-if="ruleForm.columnNum == 3"></my-cropUpload>
					
					<my-cropUpload source="delImage"  v-model="children.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:10}}" message="最佳尺寸：162*162px" label="图片" v-if="ruleForm.columnNum == 4"></my-cropUpload>
				</div>

			<!-- 如果是列表图文结束 -->
				<el-form-item label="内容显示：" prop="titleType">
					 <el-checkbox-group v-model="children.titleType" @change="changeTitleType(children)">
					    <el-checkbox label="主标题"></el-checkbox>
					    <el-checkbox label="副标题"></el-checkbox>
					    <el-checkbox label="介绍"></el-checkbox>
	  				</el-checkbox-group>
				</el-form-item>
				<el-form-item label="文字对齐位置：" v-if="children.type !=1">
					 <el-radio v-model="children.textAlign" label="left">左侧对齐</el-radio>
	  				 <el-radio v-model="children.textAlign" label="center">水平居中</el-radio>
				</el-form-item>
				<el-form-item label="主标题：" prop="title" v-if="in_array('主标题', children.titleType)">
					<el-input v-model="children.title" style="width:60%" maxlength="32"> </el-input>
				</el-form-item>
				<el-form-item label="副标题：" prop="title2" v-if="in_array('副标题', children.titleType)">
					<el-input v-model="children.title2" style="width:60%" maxlength="32"> </el-input>
				</el-form-item>
				<el-form-item label="介绍" v-if="in_array('介绍', children.titleType) && children.type != 1">
					<el-input type="textarea" v-model="children.content" :autosize="{ minRows: 10, maxRows: 11}"></el-input>
				</el-form-item>		

			</div>
			
		</el-form>
	</section>
</template>
<style type="text/css" scoped="">
.el-input-number{width: 150px;}
</style>
<script type="text/javascript">
export default {
	props: ["lists","ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
			ruleFormNew:{},
		}
	},
	mounted(){
		this.getRuleFormNew();
	},
	updated(){
		this.getRuleFormNew();
	},
	methods:{
		changeTitleType(v){
			let titleArr = v.titleType;
			if(!this.in_array("主标题",titleArr)){
				v.title = "";
			}
			if(!this.in_array("副标题",titleArr)){
				v.title2 = "";
			}
			if(!this.in_array("介绍",titleArr)){
				v.content = "";
			}


		},
		getRuleFormNew(){
			this.ruleForm.children.forEach((v,i)=>{
				if(v.checked){
					this.ruleFormNew =v;
				}
			});
		},
		del(v, index) {
			this.getConfirm("是否删除?", msg => {
				this.ruleForm.children.splice(index, 1);
			});
		},
		add(){
			let data = {cover: 'pic.png', cover_pic:[ {name:'pic.png',url:'https://website.doxinsoft.com//upload/images/website/pic.png'}], type: 1,newType0Position:'top',textAlign:'left',checked: false,titleType:['主标题', '副标题','介绍'],title: '主标题', title2: '副标题'};
			data.type = this.ruleFormNew.type;
			this.ruleForm.children.push(data);
		},
		toDown(index){
			let temp = this.ruleForm.children[index+1];
			this.$set(this.ruleForm.children,index+1,this.ruleForm.children[index]);
			this.$set(this.ruleForm.children,index,temp);
		},
		toUp(index){
			let temp = this.ruleForm.children[index-1];
			this.$set(this.ruleForm.children,index-1,this.ruleForm.children[index]);
			this.$set(this.ruleForm.children,index,temp);
		},
		editType(type,num){
			this.getConfirm("切换样式将导致当前的图片丢失",()=>{
				this.ruleFormNew.type  = type;
				if(this.ruleForm.children.length > num){
					for (let i = this.ruleForm.children.length ; i >= num; i--) {
						  this.ruleForm.children.splice(i);
					}
				}
				this.ruleForm.children.forEach((v,i)=>{
					v.type = type;
				});
				for (let i =this.ruleForm.children.length; i < num; i++) {
					let data = {cover: 'pic.png', cover_pic: [{name:'pic.png',url:'https://website.doxinsoft.com//upload/images/website/pic.png'}], type: type,newType0Position:'top',textAlign:'left',checked: false,titleType:['主标题', '副标题','介绍'],title: '主标题', title2: '副标题'};
					
					this.ruleForm.children.push(data);
				}
			});
		},
		changeNum() {
			let num = this.ruleForm.rowNum * this.ruleForm.columnNum;
			this.editType(3,num);
  		 },
	}
	
}

</script>
