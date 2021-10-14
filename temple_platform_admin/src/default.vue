<template>
	<el-row class="container2">
		<el-col :span="24" class="header">
			<el-col :span="8" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				<!-- {{collapsed?'':sysName}} -->
				<a href="javascript:;" class="fs-white" @click="$router.push({path:'/dashboard'})">
					<img src="https://boss.doxinsoft.com/images/wap/logo-default01.jpg"><!-- 有logo读logo，无logo读默认 -->
					<span>{{user.userInfo.company_name}}后台管理系统</span>
				</a>
			</el-col>
			<el-col :span="14">
				<!-- <div class="tools" @click.prevent="collapse">
		  <i class="fa fa-align-justify"></i>
		</div> -->

			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<p class="el-dropdown-link userinfo-inner">
						<span>管理员</span>
						<span><img src="https://hjhp-new.doxinsoft.com/images/admin/user2.png" /></span>
					</p>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="[collapsed?'menu-collapsed':'menu-expanded','left-menu','el-z--dark']" style="background-color: #263F5F;">
				<!--导航菜单-->
				<el-menu :router="true" :default-active="defaultActive+''" class="el-menu-vertical-demo" unique-opened router v-show="!collapsed" background-color="#263F5F" text-color="#ffffff">
					<template v-for="(item,index) in leftMenu" v-if="!item.hidden && index==activeIndex &&  item.isCheck">
						<template v-for="(child,index2) in item.children">
							<div v-if="child.children && !child.hidden && child.isCheck">
								<el-submenu :index="child.path" background-color="#1E324C">
									<template slot="title"><i :class="child.iconCls"></i><span class="fs15">{{child.name}}</span></template>
									<el-menu-item v-for="(grand,index3) in child.children" :index="grand.url+''" @click="checkme(grand.name,index3,grand.url)" :key="grand.url" v-show="!grand.hidden && grand.isCheck">{{grand.name}}</el-menu-item>
								</el-submenu>
							</div>
							<div v-else>
								<el-menu-item :index="child.url+''" @click="checkme(child.name,index2,child.url)" :key="child.url" v-show="!child.hidden && child.isCheck"> <i :class="child.iconCls"></i><span class="fs15">{{child.name}}</span></el-menu-item>
							</div>
						</template>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<div class="breadcrumb-container" v-if="headLink.length>0">
						<div class="row-top">
							<div :class="['p10','row-nav',titleName==v.name ? 'act' :'']" v-for="(v,i) in headLink">
								<span class="nav-dot"></span>
								<span @click="goToHeadLink(v,i)">{{ v.name }}</span>
								<span @click="closeHeadLink(i)" class="pl5"><i class="iconfont icon-off fs-12"></i></span>
							</div>
						</div>
						<!-- <div class="TopTitle ptb10 be-be">
							<span class="name">{{titleName}}</span>
							<el-breadcrumb separator="/" class="breadcrumb-inner" v-if="$route.name!='营业汇总'">
								<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>
							<div class="clear"></div>
						</div> -->
					</div>
					<template v-if="$route.path.indexOf('create')!='-1' || $route.path.indexOf('edit')!='-1'">
						<div class=" pt20 pl20 bg-f">
							<button type="button" class="el-button el-button--primary pull-left" @click="$router.go(-1)">
								<span>返回</span>
							</button>
						</div>
					</template>
					<el-col :span="24" class="content-wrapper">
						<keep-alive > <!-- 后退不刷新 -->
                             <router-view v-if="$route.meta.keepAlive"></router-view>
                            </keep-alive> 
						<router-view v-if="!$route.meta.keepAlive"></router-view>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>
<script>
export default {
	data() {
		return {
			sysName: '点餐管理系统',
			collapsed: false,
			sysUserName: '',
			sysUserAvatar: '',
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',

			},
			headLink: [],
			leftMenu: [],
			titleName: '',
			activeIndex: "1",
			defaultActive: window.location.href.split("#")[1],
			user: this.getUser(),
		}
	},
	methods: {
		checkme(name, index2, url) {
            this.$store.state.mutations.refresh = true;
			if(name == "官网编辑"){
				let domain = document.domain;
				if (domain == "localhost" || domain == "192.168.1.52") {
					window.open("/#/website/index");
				} else {
				   window.open("/templateadmin/#/website/index");
				}
				return false;
			}
			// this.$router.push({path:url});
			let that = this;
			if (name) {
				setTimeout(function() {
					$(".title").html(name);
					that.titleName = name;
					$(".el-breadcrumb__item").last().html(name);
				}, 300);

				this.appendHeadLink(name, url);
				this.defaultActive = url;
			}

		},
		handleSelectParent(key, keyPath) {
			this.activeIndex = key.toString();

			var that = this;
			setTimeout(function() {
				var hasChild = $(".el-menu-vertical-demo li ul").length;
				//alert(hasChild);
				if (hasChild) {
					var path = that.$router.options.routes[key].children[0].children[0].url;
					let name = that.$router.options.routes[key].children[0].children[0].name;
					that.$router.push({ path: path });
					that.defaultActive = path;
					that.appendHeadLink(name, path);
				} else {
					that.$router.push({ path: that.$router.options.routes[key].children[0].url });
					that.defaultActive = that.$router.options.routes[key].children[0].url;
					that.appendHeadLink(that.$router.options.routes[key].children[0].name, that.$router.options.routes[key].children[0].url);
				}
			}, 200)

		},
		//退出登录
		logout: function() {
			this.getConfirm("确认退出吗?", () => {
				localStorage.removeItem("userInfo");
				this.$router.push({ path: '/login/index' });
			});
		},
		//折叠导航栏
		collapse: function() {
			this.collapsed = !this.collapsed;
		},
		showMenu(i, status) {
			this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
		},
		getRoute: function() {
			$(".title").html(this.$route.name);
		},
		closeHeadLink: function(i) {
			this.headLink.splice(i, 1);
			this.$router.push({ path: this.headLink[i - 1].url });
			this.titleName = this.headLink[i - 1].name;
		},
		goToHeadLink: function(v, i) {
			this.titleName = v.name;
			this.$router.push({ path: v.url });
		},
		appendHeadLink: function(name, url) {
			let that = this;
			let canAppendHeadLink = true;
			this.headLink.forEach((v, i) => {
				if (v.name == name) {
					that.$router.push({ path: v.url });
					that.titleName = v.name;
					canAppendHeadLink = false;
				}
			});
			if (canAppendHeadLink) {
				this.headLink.push({ name: name, url: url });
				this.titleName = name;
			}
		},
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		"$route": "getRoute"
	},
	mounted() {
		 $("#app").css({background:''})
		 document.title = this.user.userInfo.company_name;
		let user = this.user;
		this.leftMenu = this.$router.options.routes;
		this.makeMenu(user.role_menus, this.leftMenu,'isAdmin');
		var thisUrl = this.$route.path;
		var thisRouterMenus = this.leftMenu;
		var activeIndex = 0;
		for (var i = 0; i < thisRouterMenus.length; i++) {
			if (!thisRouterMenus[i].hidden) {
				for (var j = 0; j < thisRouterMenus[i].children.length; j++) {
					if (!thisRouterMenus[i].children[j].hidden) {
						if (!thisRouterMenus[i].children[j].children) {
							if (thisRouterMenus[i].children[j].url.indexOf(thisUrl) != -1) {
								this.activeIndex = i.toString();
								this.$router.push({ path: thisRouterMenus[i].children[j].url });
								activeIndex = j.toString();
								this.defaultActive = thisRouterMenus[i].children[j].url;

							}
						} else {
							for (var k = 0; k < thisRouterMenus[i].children[j].children.length; k++) {
								if (!thisRouterMenus[i].children[j].children[k].hidden) {
									if (thisRouterMenus[i].children[j].children[k].url.indexOf(thisUrl) != -1) {
										this.activeIndex = i.toString();
										this.$router.push({ path: thisRouterMenus[i].children[j].children[k].url });
										activeIndex = k;
										this.defaultActive = thisRouterMenus[i].children[j].children[k].url;
									}
								}
							}

						}
					}
				}
			}
		}
		console.log(this.defaultActive);

	}
}

</script>
<style scoped lang="scss">
.border {
	border: 1px solid red
}

.el-menu-demo {
	background-color: #1d1725
}

.el-menu-demo .el-menu-item span {
	font-size: 16px
}

.slide-fade-enter-active {
	transition: all .1s ease;
}

.slide-fade-leave-active {
	transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */

{
	transform: translateX(10px);
	opacity: 0;
}

.container2 {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	min-width: 1200px;
	.header {
		height: 60px;
		line-height: 60px;
		background: #263F5F;
		color: #fff;
		position: relative;
		z-index: 50;
		.userinfo {
			text-align: right;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;

			img {
				float: left;
				margin-top: 10px;
				height: 40px;
				border-radius: 4px;
				margin-right: 10px;
			}
			.txt {
				color: #fff;
			}
			span{
				font-size: 24px;
				color: #fff;
			}
			a:hover{
				text-decoration: none;
				color: #fff;
			}
		}
		.logo-width {

		}
		.logo-collapse-width {
			width: 60px
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.main {
		display: flex; // background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		aside {
			flex: 0 0 230px;
			width: 230px; // position: absolute;
			// top: 0px;
			// bottom: 0px;
			.el-menu {
				height: 100%;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
		}
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
		}
		.menu-expanded {
			flex: 0 0 180px;
			width: 180px;
		}
		.content-container {
			// background: #f1f2f7;
			flex: 1; // position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			overflow-y: auto;
			.breadcrumb-container {
				//margin-bottom: 15px;
				padding: 10px 0 5px;
				//border-bottom: 1px solid #409EFF;
				.row-top{
					min-height: 36px;line-height:36px;
					padding: 0 16px;
					.row-nav{
						display:inline-block;
						border-radius: 3px;
						border: 1px #d4dfe5 solid;
						//border-bottom: 0;
						height: 36px;
						line-height: 16px;
						margin-left: 5px;
						margin-bottom: 5px;
						cursor: pointer;
						color: #30404f;
						background: #fff;
						.iconfont{
							color: #aaa;
							font-size: 12px;
						}
						.nav-dot{
							display: inline-block;
							width: 12px;
							height: 12px;
							margin-right: 8px;
							border-radius: 50%;
							background: #d4dfe5;
							position: relative;
							top: 1px;
						}
					}
					.act{
						background: #fff;
						//border-color: #409EFF;
						//border-bottom: 1px solid #fff;
						//color: #409EFF;
						height: 36px;
						margin-bottom: 0;
						.iconfont{
							//color: #409EFF;
						}
						.nav-dot{
							background: #5295e7;
						}
					}
				}
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {

				box-sizing: border-box;
				//padding: 0 20px;
				section{
					background-color: #fff;
					padding: 0 20px 20px;
				}
			}
		}
	}
}
.el-menu{border: 0;}
.el-submenu{}
.el-submenu .el-menu{background: #1E324C!important;}
.el-menu-item:focus, .el-menu-item:hover{background-color: #fff!important;color: #30404f!important;}
.el-menu-item:focus .iconfont, .el-menu-item:hover .iconfont{color: #fff;}

.el-submenu__title:focus, .el-submenu__title:hover{background-color: #fff!important;}
.el-dropdown-menu__item--divided:first-child{margin-top: 1px;border-top: 0;}
.el-dropdown-menu__item--divided:first-child:before{height: 0;}
.el-dropdown-menu__item--divided:hover{color: #409EFF;background: #fff;}



</style>
