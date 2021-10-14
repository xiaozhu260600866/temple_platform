<template>
	<section>
		<div class="phone-screen" style="margin:50px 0px">
			<div data-v-41f3c5c2="" class="wp-config">官网<img data-v-41f3c5c2="" src="../../../../assets/a.png" alt=""></div>
				<div class="design-content">
					<div class="edit-coms-item">
						<div :style="v.type == '占位符' ? 'padding:0':'' " :class="['module-companyinfo', 'module_m',v.background == 1 ? '' :'bgf']" @mouseover="v.authDiag = true" @mouseout="v.authDiag = false" v-for="(v,index) in lists" :draggable='canSort' @drop='drop($event,index,-1)' @dragstart='drag($event,index)' @dragover='allowDrop($event)'>
							<div class="mod-shop-companyinfo" @click="edit(v,index)">
								<div class="title primary_title limit_line" v-if="v.title && v.type != '文本' && v.type != '视频'"><img :src="siteName+'/images/website/chooseIcon'+v.icon+'.png'" class="title-icon" draggable="false"> <span class="fs16">{{ v.title }} </span></div>
								<div v-if="v.type == '文本'">
									<textLists :v="v"></textLists>
								</div>
								<div v-if="v.type == '图文'">
									<newsLists :v="v"></newsLists>
								</div>
								<div v-if="v.type == '图片'">
									<picLists :v="v"></picLists>
								</div>
								<div v-if="v.type == '轮播图'">
									<swiperLists :v="v"></swiperLists>
								</div>
								<div v-if="v.type == '占位符'">
									<div class="module-white  module-placeholder">
										<div class="mod-shop-white" :style="'height: '+v.content+'px; '"></div>
									</div>
								</div>
								<div class="p15 pt0 companyInfo" v-if="v.type == '企业简介'">
									<div class="con fs15 ptb10 plr15 bgf">{{ v.content }}</div>
								</div>
								<div v-if="v.type == '企业资讯'">
									<qyzxLists :v="v"></qyzxLists>
								</div>
								<div v-if="v.type == '管理团队'">
									<teamLists :v="v"></teamLists>
								</div>
								<div v-if="v.type == '合作伙伴'">
									<partnerLists :v="v"></partnerLists>
								</div>
								<div v-if="v.type == '视频'">
									<videoLists :v="v"></videoLists>
								</div>
								<div v-if="v.type == '联系我们'" class="module-companylink">
									<contactLists :v="v"></contactLists>
								</div>
								<div v-if="v.type == '企业招聘'" class="module-companyintv">
									<recruitmentLists :v="v"></recruitmentLists>
								</div>
							</div>
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
							<div class="mask_compo" v-if="!v.checked" @click="edit(v,index)"></div>
						</div>
						<noData v-if="lists.length == 0"></noData>
					</div>
				</div>
			</div>
	</section>
</template>
<style type="text/css" scoped="">
.bgf {
	background: white !important
}

</style>
<script type="text/javascript">
import picLists from '../layouts/lists/pic'
import textLists from '../layouts/lists/text'
import qyzxLists from '../layouts/lists/qyzx'
import teamLists from '../layouts/lists/team'
import contactLists from '../layouts/lists/contact'
import recruitmentLists from '../layouts/lists/recruitment'
import partnerLists from '../layouts/lists/partner'
import newsLists from '../layouts/lists/news'
import swiperLists from '../layouts/lists/swiper'
import videoLists from '../layouts/lists/video'

export default {
	props: ["lists"],
	data() {
		return {
			siteName: this.getSiteName(),
			canSort: true,
			drapStartKey: -1,
		}
	},
	methods: {
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

				//this.$set(this.lists, endkey, this.lists[this.drapStartKey]);
				//this.$set(this.lists, this.drapStartKey, temp);
			}
		},
		allowDrop(ev) {
			ev.preventDefault();
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
		edit(v, chooseKey) {
			this.chooseLists(chooseKey);
			this.$parent.ruleForm = v;
		},
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
		add(type) {
			if (type == "企业简介") {
				this.lists.push({ background: 1, title: '企业简介', icon: 1, content: '请填写企业简介', type: '企业简介', authDiag: false, checked: true });
			} else if (type == '企业资讯') {
				this.lists.push({
					background: 1,
					title: '企业资讯',
					icon: 1,
					type: '企业资讯',
					authDiag: false,
					checked: true,
					children: [
						{ title: '公司资讯标题', cover: 'noData.png', status: 1, published_at: this.getDate(new Date()), cover_pic: this.splitCover("noData.png", "website") }
					]
				});
			} else if (type == "管理团队") {
				this.lists.push({
					background: 1,
					title: '管理团队',
					icon: 1,
					type: '管理团队',
					authDiag: false,
					checked: true,
					children: [
						{ name: '姓名', cover: 'noData.png', cover_pic: this.splitCover("noData.png", "website"), content: '简介', position: '职位' }
					]
				});
			} else if (type == "合作伙伴") {
				this.lists.push({
					background: 1,
					title: '合作伙伴',
					icon: 1,
					type: '合作伙伴',
					authDiag: false,
					styleType: 0,
					checked: true,
					cover: "noData.png",
					cover_pic: this.splitCover("noData.png", "website"),
				});
			} else if (type == "联系我们") {
				this.lists.push({
					background: 1,
					title: '联系我们',
					icon: 1,
					type: '联系我们',
					authDiag: false,
					checked: true,
					children: [

					]
				});
			} else if (type == "企业招聘") {
				this.lists.push({
					background: 1,
					title: '企业招聘',
					icon: 1,
					type: '企业招聘',
					authDiag: false,
					checked: true,
					children: [

					]
				});
			} else if (type == "标题") {
				this.lists.push({ title: '标题栏', icon: 1, type: '标题', authDiag: false, checked: true, background: 1 });
			} else if (type == "文本") {
				this.lists.push({ background: 1, titleType: ['主标题', '副标题'], type: '文本', textAlign: 'left', authDiag: false, checked: true, title: '主标题', title2: '副标题', content: '' });
			} else if (type == '图片') {
				this.lists.push({ background: 1, type: '图片', authDiag: false, checked: true, cover: 'pic.png', cover_pic: this.splitCover("pic.png", "website"), picType: 0, rowNum: 2, columnNum: 2, });
			} else if (type == "图文") {
				this.lists.push({
					background: 1,
					type: '图文',
					checked: true,
					authDiag: false,
					rowNum: 2,
					columnNum: 2,
					children: [
						{ cover: 'pic.png', cover_pic: this.splitCover("pic.png", "website"), type: 0, newType0Position: 'top', textAlign: 'left', checked: true, titleType: ['主标题', '副标题', '介绍'], title: '主标题', title2: '副标题', }
					]
				});
			} else if (type == "轮播图") {
				this.lists.push({ type: '轮播图', authDiag: false, checked: true, cover: 'pic99.png,pic99.png', cover_pic: this.splitCover("pic99.png,pic99.png", "website") });
			} else if (type == "视频") {
				this.lists.push({ background: 1, type: '视频', title: '视频标题1', authDiag: false, checked: true, cover: 'pic.png', cover_pic: this.splitCover("pic.png", "website"), url: 'https://v.qq.com/' });
			} else if (type == "占位符") {
				this.lists.push({ type: '占位符', content: '30', authDiag: false, checked: true, background: 1, });
			}

			this.chooseLists(this.lists.length - 1);
		},
	},
	components: {
		picLists,
		textLists,
		qyzxLists,
		teamLists,
		contactLists,
		recruitmentLists,
		partnerLists,
		newsLists,
		swiperLists,
		videoLists

	}
}

</script>
