<template>
	<section>
		<noData v-if="!$parent.lists.length"></noData>
		<div class="edit-carousel edit-images" v-if="$parent.lists.length">
			<div class="edit-shop-header flex-middle flex-center"><h3>{{ ruleForm.type }}设置</h3>
			</div>
		</div>
		<div class="edit-shop-content" v-if="$parent.lists.length" style="padding: 15px 30px;border:none">
			<div class="el-form-item mb10" v-if="ruleForm.background">
				<label for="title" class="el-form-item__label">背景色：</label>
				<div class="el-form-item__content">
					 <el-radio v-model="ruleForm.background" :label="1">灰色</el-radio>
  				      <el-radio v-model="ruleForm.background" :label="2">白色</el-radio>
				</div>
			</div>
			<!-- 企业简介start -->
			<div v-if="ruleForm.title && ruleForm.type == '企业简介'">
				<qyjj :ruleForm="ruleForm"></qyjj>
			</div>
			<!-- 企业简介end -->
			<div v-if="ruleForm.title && ruleForm.type == '企业资讯'">
				<qyzx :ruleForm="ruleForm"></qyzx>
			</div>
			<!-- 企业简介end -->
			<div v-if="ruleForm.title && ruleForm.type == '管理团队'">
				<team :ruleForm="ruleForm"></team>
			</div>
			<!-- 合作伙伴end -->
			<div v-if="ruleForm.title && ruleForm.type == '合作伙伴'">
				<partner :ruleForm="ruleForm"></partner>
			</div>
			<div v-if="ruleForm.title && ruleForm.type == '联系我们'">
				<contact :ruleForm="ruleForm"></contact>
			</div>
			<div v-if="ruleForm.title && ruleForm.type == '企业招聘'">
				<recruitment :ruleForm="ruleForm"></recruitment>
			</div>
			<div v-if="ruleForm.type == '标题'">
				<myTitle :ruleForm="ruleForm"></myTitle>
			</div>
			<div v-if=" ruleForm.type == '文本'">
				<myText :ruleForm="ruleForm"></myText>
			</div>
			<div v-if="ruleForm.type == '图片'">
				<myPic :ruleForm="ruleForm"></myPic>
			</div>
			<div v-if="ruleForm.type == '图文'">
				<myNews :lists="lists" :ruleForm="ruleForm"></myNews>
			</div>
			<div v-if="ruleForm.type == '轮播图'">
				<mySwiper :ruleForm="ruleForm"></mySwiper>
			</div>
			<div v-if="ruleForm.type == '视频'">
				<myVideo :ruleForm="ruleForm"></myVideo>
			</div>
			<div v-if="ruleForm.type == '占位符'">
				<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
					<el-form-item label="高度：" prop="content">
						<el-input v-model="ruleForm.content" style="width:70%"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
import qyzx from "./form/qyzx";
import qyjj from "./form/qyjj";
import team from "./form/team";
import partner from "./form/partner";
import contact from "./form/contact";
import recruitment from "./form/recruitment";
import myTitle from "./form/title";
import myText from "./form/text";
import myPic from "./form/pic";
import myNews from "./form/news";
import mySwiper from "./form/swiper";
import myVideo from "./form/video";
export default {
	props: ["ruleForm", "lists"],
	data() {
		return {
			siteName: this.getSiteName(),
		}
	},
	components: {
		qyzx,
		qyjj,
		team,
		partner,
		contact,
		recruitment,
		myTitle,
		myText,
		myPic,
		myNews,
		mySwiper,
		myVideo
	}
}

</script>
