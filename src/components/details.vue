<template>
    <div>
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
                <el-form-item label="起始">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.start" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="截至">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.end" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <hr>
        <div>
            <el-table :data="items" border show-summary style="width: 100%">
                <el-table-column prop="createDt" label="日期" width="200px"></el-table-column>
                <el-table-column prop="shopName" label="店铺" width="200px"></el-table-column>
                <el-table-column prop="productName" label="商品"></el-table-column>
                <el-table-column prop="productType" label="商品类别"></el-table-column>
                <el-table-column prop="sellPrice" sortable label="单价"></el-table-column>
                <el-table-column prop="quantity" sortable label="销量"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
var moment = require('moment');
    
export default {
    data () {
        return {
            msg: 'Mobvoi 销售订单查询',
            orders: [],
            items: [],
            products: {},
            productList: [],
            shops: {},
            shopList: [],
            formInline: {
                shop: null,
                product: null,
                start: new Date(),
                end: new Date(),
                page: 1,
                size: 50
            }
        }
    },

    methods: {
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
                    this.updateProducts();
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
                    this.getOrders();
                }
            });
        },
        getOrders() {
            var shopArg = this.formInline.shop == null ? null : [this.formInline.shop];
            var productArg = this.formInline.product == null ? null : [this.formInline.product];
            var query = {
                shop_id: shopArg,
                product_id: productArg,
                start_date: moment(this.formInline.start).format("YYYY-MM-DD"),
                end_date: moment(this.formInline.end).format("YYYY-MM-DD"),
                page: this.formInline.page,
                size: this.formInline.size
            };
            console.log(query);
            this.$http.post('/api/orders/', query).then((data, error) => {
                if (!error) {
                    var items = JSON.parse(data["bodyText"])["data"];
                    this.orders = items;
                    this.updateItems();
                    this.formInline.shop = null;
                    this.formInline.product = null;
                } else {
                    console.log(error);
                }
            });
        },
        updateItems() {
            this.items = this.orders.filter(x => x != null).map(x => {
                x["productName"] = this.products[x["productId"]]["productName"];
                x["productType"] = this.products[x["productId"]]["productType"];
                x["shopName"] = this.shops[x["shopId"]]["shop_name"];
                return x;
            });
        },
        appInit() {
            console.log("1.0 - 开始加载数据");
            console.log(new Date());
            this.updateShops();
            console.log("1.1 - 加载数据完成");
        },
        onSubmit() {
            this.getOrders();
        }
    },
    
    mounted() {
        this.appInit();
    }
}
</script>
