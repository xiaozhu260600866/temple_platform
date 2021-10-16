const myfun = function() {};
myfun.install = (Vue, options) => {
	Vue.prototype.getAmount=(amount)=>{
		return parseInt(amount);	
	}
	Vue.prototype.updateHistory=()=>{
	   return 1;
	}
	Vue.prototype.formatName=(name)=>{
			let newStr;
			if (name.length === 2) {
				newStr = name.substr(0, 1) + '*';
			} else if (name.length > 2) {
			  let char = '';
			  for (let i = 0, len = name.length - 2; i < len; i++) {
				char += '*';
			  }
			  newStr = name.substr(0, 1) + '*' + name.substr(2);
			} else {
			  newStr = name;
			}
		
			return newStr;
	 }


	Vue.prototype.shareData = (path, user_id, to_userid, title) => {
			return {
				title: title,
				path: path,
				success: res => {
					console.log('a');
					Vue.prototype.getError("1" + user_id);
					Vue.prototype.getError("1" + to_userid);
					Vue.prototype.postAjax("/user/card/create", {
						user_id: user_id,
						to_userid: to_userid,
						type: 3
					}, msg => {

					});
				},
				fail: res => {
					console.log(res);
				}
			}
		},
		Vue.prototype.toIndex = () => {

			let role_type = uni.getStorageSync('role_type');
			if (role_type == 0) {
				return Vue.prototype.goto("/pages/cardLists/index");
			}
			if (role_type == 1) {
				return Vue.prototype.goto("/pages/user/website/products/lists/index", 2);
			}
			if (role_type == 2) {

				return Vue.prototype.goto("/pages/shop/index/index", 2);
			}
			if (role_type == 3) {
				return Vue.prototype.goto("/pages/cardLists/index");
			}
			if (role_type == 4) {
				return Vue.prototype.goto("/pages/index/index", 2);
			}


		}
	Vue.prototype.checkMerchant = (url, user) => {
		console.log(url);
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				if (res.data && res.data.is_bing && user.role == 5) {
					if (user.status == 1) Vue.prototype.goto(url, 1);
					else Vue.prototype.goto("/pages/business/register/success/main");
					return false;
				} else {
					Vue.prototype.goto("/pages/user/login/main", 1);
					return false;
				}
			},
			fail(res) {
				Vue.prototype.goto("/pages/user/login/main", 1);
				return false;
			}
		})
	}
	Vue.prototype.checkUser = (url, type) => {
		console.log(url);
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				if (res.data && res.data.is_bing) {
					Vue.prototype.goto(url, type);
					return false;
				} else {
					Vue.prototype.goto("/pages/user/login/main", 1);
					return false;
				}
			},
			fail(res) {
				Vue.prototype.goto("/pages/user/login/main", 1);
				return false;
			}
		})
	}

}

export default myfun;
