<template>
	<section>
		<div class="picSec">

		   <div class="picSec-m1 p15" v-if="v.picType == 0">
				<div class="item_pic" :style="'background: url('+cover.url+') center center / cover'" v-for="cover in v.cover_pic" @click="previewImage(v.cover_pic[0].name,'website')"></div>
			</div>
			<!-- <div class="sketch-model-3" v-if="v.picType == 1">
				<div class="item" v-for="cover in v.cover_pic"  @click="previewImage(cover.name,'website')">
					<div class="item_d single" :style="'background: url('+cover.url+') center center / cover'"></div>
				</div>
			</div> -->

			<scroll-view scroll-x="true" style="white-space: nowrap; display: block" v-if="v.picType == 1">
				<div class="picSec-m2 ptb15 pl15 bgf" :style="source == 'app' ? 'overflow:visible' :''">
					<div class="item pr15" v-for="cover in v.cover_pic"  @click="previewImage(cover.name,'website')">
						<div class="item_pic" :style="'background: url('+cover.url+') center center / cover'"></div>
					</div>
				</div>
			</scroll-view>

			<div class="picSec-m3 p15" v-if="v.picType == 2">
				<div class="item left_i" v-if="v.cover_pic[0]">
					<div class="item_pic" :style="'background: url('+v.cover_pic[0].url+') center center / cover'" @click="previewImage(v.cover_pic[0].name,'website')"></div>
				</div>
				<div class="item right_i" >
					<div class="item_pic mb12" :style="'background: url('+v.cover_pic[1].url+') center center / cover'" v-if="v.cover_pic[1]"  @click="previewImage(v.cover_pic[1].name,'website')"></div>
					<div class="item_pic" :style="'background: url('+v.cover_pic[2].url+') center center / cover'" v-if="v.cover_pic[2]"  @click="previewImage(v.cover_pic[2].name,'website')"></div>
				</div>
			</div>

			<div class="picSec-m4 pl15 pr3 pt0" v-if="v.picType == 3" :style="source !='app' ? 'overflow:hidden' : ''">
				<div :class="['item','pb12','pr12','item_'+v.columnNum]" v-for="cover in v.cover_pic"  @click="previewImage(cover.name,'website')">
					<div class="item_pic" :style="'background: url('+cover.url+') #fff center center / cover;'"></div>
				</div>
			</div>

			<div class="picSec-m5" v-if="v.picType == 4"  v-for="cover in v.cover_pic">
				<img class="img" :src="cover.url"  @click="previewImage(cover.name,'website')" mode="widthFix">
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default{
	props:["v","source"]
}	
</script>
<style type="text/css" scoped="">

.picSec .item_pic{border-radius: 6px;}

.picSec-m1 .item_pic{width: 100%;height: 217px;}

.picSec-m2{display: flex;}
.picSec-m2 .item{display: flex;}
.picSec-m2 .item .item_pic{width: 220px;height: 130px;}

.picSec-m3{display: flex;justify-content: space-between;}
.picSec-m3 .left_i{width: 64%;padding-right: 6px;}
.picSec-m3 .right_i{width: 36%;padding-left: 6px;}
.picSec-m3 .item .item_pic{width: 100%;}
.picSec-m3 .left_i .item_pic{height: 180px;}
.picSec-m3 .right_i .item_pic{height: 84px;}

.picSec-m4{display: flex;flex-wrap: wrap;}
.picSec-m4 .item{height: auto;}
.picSec-m4 .item_1{width: 100%;}
.picSec-m4 .item_2{width: 50%;}
.picSec-m4 .item_3{width: 33.33%;}
.picSec-m4 .item_4{width: 25%;}
.picSec-m4 .item_1 .item_pic{height: 351px;}
.picSec-m4 .item_2 .item_pic{height: 124px;}
.picSec-m4 .item_3 .item_pic{height: 103px;}
.picSec-m4 .item_4 .item_pic{height: 72.75px;}

.picSec-m5 .img{width: 100%;}

</style>