<template>
    <section v-if="data.show">
        <el-col :span="24" class="toolbar t-search fs13">
            <table class="table table-bordered order-info">
                <tbody>
                    <tr>
                        <td class="active" width="30%">
                            <p class="ltitle">
                                订单信息
                            </p>
                            <ul class="order-info-left">
                                <li>
                                    <table width="100%">
                                        <tbody>
                                            <tr>
                                                <td class="lname"> 订单编号： </td>
                                                <td> {{ data.detail.order_no}}</td>
                                            </tr>
                                            <tr>
                                                <td class="lname">订单总价：</td>
                                                <td>
                                                    ￥{{ data.detail.amount }}<b class="price_color font_s16" id="order_amount"> {{ data.detail.order_no }}</b>
                                                    <button class="btn btn-info btn-xs fs13" id="modifyAmount" type="submit" @click="changePrice" v-if="data.detail.status<3">修改价格</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="lname">会员：</td>
                                                <td>{{ data.detail.addr_name }}</td>
                                            </tr>
                                            <tr>
                                                <td class="lname">付款方式</td>
                                                <td>{{ data.detail.payMethod }}</td>
                                            </tr>
                                            <tr>
                                                <td class="lname">收货地址：</td>
                                                <td>
                                                    <span id="order_address">{{ data.detail.addr_name }}，{{ data.detail.addr_phone }}，<br>
                                                    {{ data.detail.addr_province }} {{ data.detail.addr_city }} {{ data.detail.addr_area }}{{ data.detail.addr_address }}</span>
                                                    <br>
                                                    <button class="btn btn-info btn-xs fs13" id="modifyAddress" type="submit" @click="changeAddress" v-if="data.detail.status<5">修改收货地址</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="lname">送货方式：</td>
                                                <td>{{ data.detail.getShipping }}</td>
                                            </tr>
                                            <tr>
                                                <td class="lname"> 客户留言：</td>
                                                <td>{{ data.detail.remark }} </td>
                                            </tr>
                                            <tr>
                                                <td>订单日期</td>
                                                <td>{{ data.detail.created_at }}</td>
                                            </tr>
                                            <tr v-if="data.detail.is_bill">
                                                <td>发票</td>
                                                <td>单位：{{ data.detail.unit_name }}
                                                    <br> 纳税人识别号：{{ data.detail.bill_no }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </ul>
                        </td>
                        <td class="right-td" width="70%">
                            <p class="rtitle">
                                <span class="glyphicon glyphicon-exclamation-sign"></span> 当前订单状态：
                                <span class="green_color">{{ data.detail.status_message }}</span>
                            </p>
                            <p class="rope">
                                您可以：
                                <button type="button" class="btn btn-info btn-xs toExpress fs12" v-if="data.detail.status==2 || data.detail.status==3" @click="changeDelivery">发货</button>
                                <button class="btn btn-danger btn-xs toClose fs12" type="button" @click="changeStatus(0)" v-if="data.detail.status!=0">
                                    关闭订单
                                </button>
                                <button class="btn btn-info btn-xs" @click="changeStatus(9)" v-if="data.detail.status == 5">收货</button>
                            </p>
                            <div class="order-timer">
                                <ul>
                                    <li v-for="(v,key) in data.detail.systemLog">
                                        <font class="dark_color"> [{{ v.created_at }}]</font>
                                        [{{ v.content }}]
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-bordered" v-if="data.detail.products">
                <thead>
                    <tr class="active">
                        <th align="center" width="50%">购买商品</th>
                        <th align="center" width="20%">商品积分</th>
                        <th align="center" width="10%"> 数量</th>
                        <th align="center" width="20%"> 小计</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td width="50%">
                            <div class="pull-left" style="padding-right:10px;">
                                <img height="60" :src="data.detail.products.firstCover" width="60" />
                            </div>
                            <p style="line-height:18px;height:36px;">
                                {{ data.detail.products.name }}
                            </p>
                            <p>
                                <font style="color:#666;">
                                    产品编号：{{ data.detail.products.id }}
                                </font>
                            </p>
                        </td>
                        <td align="center" width="20%">￥{{ data.detail.products.integral }}</td>
                        <td align="center" width="10%">{{ data.detail.num }}</td>
                        <td align="center" width="20%"> {{ data.detail.integral }}分</td>
                    </tr>
                </tbody>
            </table>
        </el-col>
        <info ref="info" :type="type" :title="title" :ruleForm="data.detail" formAction="/admin/shop/integral/modify"></info>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/shop/integral/info',
            data: this.formatData(this),
            title: '',
            type: 0,
            siteName: this.getSiteName()
        }
    },
    mounted() {
        this.ajax();
    },
    methods: {
        ajax() {
            this.getAjax(this, { id: this.getOptions('id') }, msg => {});
        },
        changeStatus(status) {
            let title = status == 0 ? '关闭订单' : '确认收货';
            this.getConfirm(title, () => {
                this.postAjax("/admin/shop/integral/change-order-status", { id: this.data.detail.id, status: status }, msg => {
                    if (msg.data.status == 2) {
                        this.ajax();
                    }
                });
            });
        },
        changePrice() {
            this.type = 0;
            this.$refs.info.ajax();
            this.title = "修改价格";
        },
        changeAddress() {
            this.type = 1;
            this.$refs.info.ajax();
            this.title = "修改地址";
        },
        changeDelivery() {
            this.type = 2;
            this.$refs.info.ajax();
            this.title = "发货";
        },
        goodsAfter(item) {
            this.$refs.goodsAfter.dialogVisible = true;
            item.type = item.type == 1 ? '退货' : '退货';
            this.$refs.goodsAfter.ruleForm = item;
            if (item.pic) this.$refs.goodsAfter.fileList = splitCover(item.pic, "product");
            console.log(this.$refs.goodsAfter.ruleForm);

        },
    },
    components: {
        "info": resolve => require(['./layouts/info'], resolve),
    }
}

</script>
</script>
