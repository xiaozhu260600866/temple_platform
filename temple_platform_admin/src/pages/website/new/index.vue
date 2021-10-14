<template>
	<section class="websiteIndex">
		<div class="header flex">
			<div class="logoImg flex-middle">
				<img  src="http://resource.aijiatui.com/15019426815/company/website/81178dabf5287083e633b7f57a23e351.png" alt="logo" class="logo">
				<h1>官网编辑-{{ title }}</h1>
				<div class="auth" style="position: absolute; right: 20px;">
					<button style=" cursor: pointer;" @click="submit(1)">发布</button>
					<button class="" style="cursor: pointer;" @click="preview()">预览</button>
					<button style=" cursor: pointer;" @click="submit(0)">保存</button>
					<button style="cursor: pointer;width: auto;padding: 0 16px;">更换模板</button>
				</div>
			</div>
		</div>
		<div class="content flex">
			<div class="left">
				<div class="nav flex">
					<a :class="['flex-middle', 'flex-center', showType == 0 ? 'ivu-tabs-tab-active' :'']" @click="showType=0" href="javascript:;">模板组件</a>
					<a :class="['flex-middle', 'flex-center', showType == 1 ? 'ivu-tabs-tab-active' :'']" @click="showType=1" href="javascript:;">基本组件</a>
				</div>
				<div data-v-41f3c5c2="" class="ivu-tabs-tabpane">
					<div data-v-41f3c5c2="" class="coms-list">
						<!-- 模板组件 -->
						<div data-v-41f3c5c2="" id="modular1" v-if="showType == 0">
							<div data-v-41f3c5c2="" class="coms-item" @click="add('企业简介')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-aboutus"></i> <h3 data-v-41f3c5c2="" data-type="1">企业简介</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('企业资讯')"><i data-v-41f3c5c2="" data-type="25" alt="" class="icon-temp  iconfont icon-news"></i> <h3 data-v-41f3c5c2="" data-type="25">企业资讯</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('管理团队')"><i data-v-41f3c5c2="" data-type="4" alt=""class="icon-temp  iconfont icon-team"></i> <h3 data-v-41f3c5c2="" data-type="4">管理团队</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('合作伙伴')"><i data-v-41f3c5c2="" data-type="5" alt="" class="icon-temp  iconfont icon-partner"></i> <h3 data-v-41f3c5c2="" data-type="5">合作伙伴</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('联系我们')"><i data-v-41f3c5c2="" data-type="28" alt="" class="icon-temp  iconfont icon-contactus"></i> <h3 data-v-41f3c5c2="" data-type="28">联系我们</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('企业招聘')"><i data-v-41f3c5c2="" data-type="6" alt="" class="icon-temp  iconfont icon-hire"></i> <h3 data-v-41f3c5c2="" data-type="6">企业招聘</h3>
							</div>
						</div>
						<!-- 基本组件 -->
						<div data-v-41f3c5c2="" id="modular1" v-if="showType == 1">
							<div data-v-41f3c5c2="" class="coms-item" @click="add('标题')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-title"></i> <h3 data-v-41f3c5c2="" data-type="1">标题</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('文本')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-txt"></i> <h3 data-v-41f3c5c2="" data-type="1">文本</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('图片')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-pic"></i> <h3 data-v-41f3c5c2="" data-type="1">图片</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('轮播图')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-swiper"></i> <h3 data-v-41f3c5c2="" data-type="1">轮播图</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('图文')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-picTxt"></i> <h3 data-v-41f3c5c2="" data-type="1">图文</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('视频')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-video"></i> <h3 data-v-41f3c5c2="" data-type="1">视频</h3>
							</div>
							<div data-v-41f3c5c2="" class="coms-item" @click="add('占位符')"><i data-v-41f3c5c2="" data-type="1" alt="" class="icon-temp  iconfont icon-placeholder"></i> <h3 data-v-41f3c5c2="" data-type="1">占位符</h3>
							</div>
							
						</div>

					</div>
				</div>
			</div>
			<div class="center flex-center" @click.self.prevent="noChecked">
				<authLists :lists="lists" ref="authLists"></authLists>
			</div>
			<div class="right">
				<authForm :ruleForm="ruleForm" :lists="lists"></authForm>
			</div>
		</div>
		<previewQrocde ref="previewQrocde"></previewQrocde>
	</section>
</template>
<script type="text/javascript">
import "@/public/css/website.css";
import authLists from './layouts/lists';
import authForm from './layouts/AuthForm';
import previewQrocde from './previewQrocde';
export default {
	data() {
		return {
			ruleForm: { /*title: '管理团队', icon: 1, type: '管理团队', authDiag: false, checked: true,children:[]*/ },
			siteName: this.getSiteName(),
			showType:0,
			title:'',
			formAction: '/admin/website/lists',
			data: this.formatData(this),
			lists: [/*{ title: '管理团队', icon: 1, type: '管理团队', authDiag: false, checked: true,children:[] }*/]
		}
	},
	mounted() {
		this.ajax();
	
		this.ruleForm = this.lists.length > 0 ? this.lists[0] : {};
	},
	methods: {
		preview(){
			this.$refs.previewQrocde.ajax();
		},
		noChecked(){
			this.lists.forEach((v,i)=>{
				v.checked = true;
			});
		},
		ajax() {
            this.getAjax(this, { }, msg => {
            	this.title = msg.siteConfig.web_name
            	document.title = this.title;
            	if (msg.lists.length > 0) {
					msg.lists.forEach((v, i) => {
						if (v.children) {
							v.children = JSON.parse(v.children);
							v.children.forEach((children,childrenKey)=>{
								 if(children.cover_pic){
								 	children.cover_pic = this.splitCover(children.cover_pic, "website");
								 }	
							});
						}
						if (v.cover_pic) {
							v.cover_pic = this.splitCover(v.cover_pic, "website");


						}
						if (v.titleType) {
							v.titleType = JSON.parse(v.titleType);
						}
						if(v.checked){
							this.ruleForm = v;
						}
					});
					this.lists = msg.lists;
					console.log(this.lists);
				} 
            });
        },
		add(type) {
			this.$refs.authLists.add(type);
		},
		submit(status){
			this.postAjax("/admin/website/create",{formData:this.lists,status:status},msg=>{
				this.ajax();
			});
		}

	},
	components: {
		authLists,
		authForm,
		previewQrocde
	}
}

</script>
<style type="text/css" scoped="">
</style>
