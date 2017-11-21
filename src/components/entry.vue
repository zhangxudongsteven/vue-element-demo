<template>
    <div>
        <el-form ref="formInline" :model="formInline" label-width="80px">
            <el-form-item label="店铺">
                    <el-select v-model="formInline.shop" filterable placeholder="全部店铺">
                        <el-option
                          v-for="item in shopList"
                          :key="item.shop_id"
                          :label="item.shop_name"
                          :value="item.shop_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品">
                    <el-select v-model="formInline.product" filterable placeholder="全部产品">
                        <el-option
                          v-for="item in productList"
                          :key="item.productId"
                          :label="item.productName"
                          :value="item.productId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="发生日期" v-model="formInline.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="售价">
                    <el-input-number v-model="formInline.price" @change="" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input-number v-model="formInline.quantity" @change="" :min="1" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="putOrder">提交</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>


<script>
    
    var moment = require('moment');
    
    export default {
        data() {
            return {
                products: {},
                productList: [],
                shops: {},
                shopList: [],
                formInline: {
                    shop: null,
                    product: null,
                    date: new Date(),
                    price: 0,
                    quantity: 1,
                }
            }
        },

        methods: {
            myNoticeSuccess() {
                this.$notify.success({
                    title: '订单添加成功',
                    message: '',
                    duration: 6000
                });
            },
            myNoticeFail() {
                this.$notify.error({
                    title: '订单添加失败',
                    message: '',
                    duration: 6000
                });
            },
            putOrder() {
                if ((this.formInline.shop==null) || (this.formInline.shop==null)) {
                    this.myNoticeFail();
                } else {
                    var obj = {
                        orderId: (new Date()).toString(),
                        originId: 0,
                        customerId: 0,
                        productId: this.formInline.product,
                        shopId: this.formInline.shop,
                        campaignId: 0,
                        fixPrice: this.products[this.formInline.product]["price"],
                        sellPrice: this.formInline.price,
                        quantity: this.formInline.quantity,
                        createDt: moment(this.formInline.date).format("YYYY-MM-DD"),
                        updateDt: moment(this.formInline.date).format("YYYY-MM-DD"),
                        orderStatus: "Valid"
                    }
                    console.log(obj);
                    this.$http.put('/api/order/', obj).then((data, error) => {
                        if (!error) {
                            this.myNoticeSuccess();
                            this.formInline.product = null;
                            this.formInline.shop = null;
                            this.formInline.date = new Date();
                            this.formInline.price = 0;
                            this.formInline.quantity = 1;
                        } else {
                            this.myNoticeFail();
                        }
                    });
                }
            },
            updateShops() {
                this.$http.get('/api/shops/').then((data, error) => {
                    if (!error) {
                        var items = JSON.parse(data["bodyText"])["data"];
                        this.shopList = [];
                        this.shops = {};
                        for (let item of items) {
                            this.shopList.push(item);
                            this.shops[item["shop_id"]] = item;
                        }
                    }
                });
            },
            updateProducts() {
                this.$http.get('/api/product/all').then((data, error) => {
                    if (!error) {
                        var items = JSON.parse(data["bodyText"]);
                        this.productList = [];
                        this.products = {};
                        for (let item of items) {
                            this.productList.push(item);
                            this.products[item["productId"]] = item;
                        }
                    }
                });
            },
            appInit() {
                console.log("1.0 - 开始加载数据");
                console.log(new Date());
                this.updateShops();
                this.updateProducts();
                console.log("1.1 - 加载数据完成");
            },
        },

        mounted() {
            this.appInit();
        }
    }

</script>
