<template>
	<section class="mod-shop-sketch news-sec">
		<div class="sec-item" v-for="(children,childrenIndex) in v.children" v-if="children.type == 1 || children.type == 0">
			<!-- 单图片 -->
			<div v-if="children.type == 0" class="p15 oneImg">
				<div class="oneImg-box box-shadow">
					<div class="downBox">
						<div class="sec_txt ptb10 plr15" v-if="children.newType0Position == 'down'">
							<div :class="[children.textAlign == 'center' ? 'text-center' : '']">
								<p class="p mainTitle" v-if="source == 'app' ? children.title : in_array('主标题', children.titleType)">{{ children.title }}</p>
								<p class="p subTitle" v-if="source == 'app' ? children.title2 : in_array('副标题', children.titleType)">{{ children.title2 }}</p>
								<p class="p con mt10" v-if="source == 'app' ? children.content : in_array('介绍', children.titleType)">{{ children.content }}</p>
							</div>
						</div>
						<div :class="['box-img',children.newType0Position == 'down' ? 'br-bl' : 'br-tr']" v-for="pic in children.cover_pic">
							<img class="img" :src="pic.url"  @click="previewImage(pic.name,'website')" mode="widthFix" />
						</div>
					</div>
					<div class="sec_text ptb10 plr15" v-if="children.newType0Position == 'top'">
						<div :class="[children.textAlign == 'center' ? 'text-center' : '']">	
							<p class="p mainTitle" v-if="source == 'app' ? children.title : in_array('主标题', children.titleType)">{{ children.title }}</p>
							<p class="p subTitle" v-if="source == 'app' ? children.title2 : in_array('副标题', children.titleType)">{{ children.title2 }}</p>
							<p class="p con mt15" v-if="source == 'app' ? children.content : in_array('介绍', children.titleType)">{{ children.content }}</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 单图片 -->

			<!-- 列表图文 -->
			<div v-if="children.type == 1">
				<div class="txtPic-list">
					<div class="list-item p15" v-for="pic in children.cover_pic">
						<div class="item-group p15 box-shadow">
							<div class="item-img mr15" :style='"background: url("+pic.url+") center center / cover;"' v-if="children.newType0Position == 'top'" @click="previewImage(pic.name,'website')"></div>
							<div :class="['item-con',children.textAlign == 'center' ? 'text-center' : '']" >
								<p class="p mainTitle nowrap fs16 mb5" v-if="source == 'app' ? children.title : in_array('主标题', children.titleType)">{{ children.title }}</p>
								<p class="p subTitle fs14 font_grey" v-if="source == 'app' ? children.title2 : in_array('副标题', children.titleType)">{{ children.title2 }}</p>
							</div>
							<div class="item-img ml15" :style='"background: url("+pic.url+") center center / cover;"' v-if="children.newType0Position == 'down'" @click="previewImage(pic.name,'website')"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 滚动图文 -->
		<scroll-view scroll-x="true" style="display: block" v-if="v.children.length && v.children[0].type == 2">
			<div class="sliderPic p15 pr0" :style="source == 'app' ? 'overflow:visible' :''">
				<div class="item box-shadow mr12" v-for="(children,childrenIndex) in v.children" v-if="children.type == 2">
					<div class="item-img box-shadow" :style='"background: url("+pic.url+") center center / cover;border-radius: 4px;position: relative;padding-left: 1px"' v-for="pic in children.cover_pic"  @click="previewImage(pic.name,'website')">
					</div>
					<div :class="['item-info', 'p10',children.textAlign == 'center' ? 'text-center' : '']">
						<p class="p mainTitle nowrap fs16" v-if="source == 'app' ? children.title : in_array('主标题', children.titleType)">{{ children.title }}</p>
						<p class="p subTitle fs14 font_grey mtb5" v-if="source == 'app' ? children.title2 : in_array('副标题', children.titleType)">{{ children.title2 }}</p>
						<p class="p con fs14" v-if="source == 'app' ? children.content : in_array('介绍', children.titleType)">{{ children.content }}</p>
					</div>
				</div>
			</div>
		</scroll-view>

		<!-- 宫格图文 -->
		<div class="palace pl15 pb15 pr3" v-if="v.children.length && v.children[0].type == 3">
			<div :class="['pl-box','pr12','pt12','pl-box'+v.columnNum]" v-for="(children,childrenIndex) in v.children" v-if="children.type == 3">
				<div class="pl-item box-shadow">
					<div class="item-img" :style='"background: url("+pic.url+") center center / cover;"' v-for="pic in children.cover_pic"  @click="previewImage(pic.name,'website')">
					</div>
					<div :class="['item-info','p10',children.textAlign == 'center' ? 'text-center' : '']">
						<p class="p mainTitle nowrap fs16" v-if="source == 'app' ? children.title : in_array('主标题', children.titleType)">{{ children.title }}</p>
						<p class="p subTitle fs14 font_grey mt5" v-if="source == 'app' ? children.title2 : in_array('副标题', children.titleType)">{{ children.title2 }}</p>
						<p class="p con fs14 mt5" v-if="source == 'app' ? children.content : in_array('介绍', children.titleType)">{{ children.content }}</p>
					</div>
				</div>
			</div>
		</div>

	</section>
</template>
<script type="text/javascript">
export default {
	props: ["v", "source"],
	methods: {

	}
}

</script>
<style type="text/css" scoped="">

.news-sec .text-center .p{text-align: center;}

/* 单图文 */
.oneImg .box-img .img{width: 100%;display: flex;}
.oneImg .br-tr .img{border-radius: 6px 6px 0 0;}
.oneImg .br-bl .img{border-radius: 0 0 6px 6px;}
.oneImg .mainTitle{font-size: 16px;}
.oneImg .subTitle{font-size: 14px;color: #666;}
.oneImg .con{font-size: 15px;line-height: 1.8;text-align: justify;}

/* 列表图文 */
.txtPic-list{}
.txtPic-list .item-group{width: 100%;display: flex;}
.txtPic-list .item-group .item-img{width: 90px;height: 70px;}
.txtPic-list .item-group .item-con{width: 100%;flex: 1;overflow: hidden;}
.txtPic-list .item-group .item-con .mainTitle{line-height: 20px;}
.txtPic-list .item-group .item-con .subTitle{line-height: 20px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}

/* 滑块图文 */
.sliderPic {display: flex;overflow: hidden;}
.sliderPic .item{width: 180px;}
.sliderPic .item .item-img{height: 100px;}
.sliderPic .item .item-info{width: 100%}
.sliderPic .item .con{text-align: justify;}

/* 宫格图文 */
.palace{display: flex;flex-wrap: wrap;}
.palace .pl-box:first-child,.palace .pl-box:nth-child(2){padding-top: 0!important;}
.palace .pl-box2{width: 50%;}
.palace .pl-box3{width: 33.33%;}
.palace .pl-box4{width: 25%;}
.palace .pl-item{width: 100%;border: 1px #ddd solid;border-radius: 6px;}
.palace .pl-item .item-img{height: 127px;border-radius: 6px 6px 0 0;}

</style>