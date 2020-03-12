<template>
    <div class="product-store">
        <a :href="shopUrl" class="seller">
            <img :src="shopIcon" alt="">
            <div class="name">
                <h4>{{shopName}}</h4>
                <span>天猫</span>
            </div>
        </a>
        <div class="desc">
            <span v-for="(item, index) in evaluates" :key="index">{{item.title}} <i>{{item.score}}</i></span>
        </div>
        <div class="inshop">
            <a :href="shopUrl">全部宝贝</a>
            <a :href="shopUrl">进店逛逛</a>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProductStore',
    props:{
        storeData:{
            type:[Array, Object]
        }
    },
    data(){
        return{
            storeInfo:'',
            shopIcon:'',
            shopName:'',
            evaluates:'',
            shopUrl:''
        }
    },
    watch:{
        storeData(value){
            this.storeData = value;
            this.shopIcon = this.storeData.seller.shopIcon;
            this.shopName = this.storeData.seller.shopName;
            this.evaluates = this.storeData.seller.evaluates;
            this.shopUrl = this.storeData.seller.taoShopUrl;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product-store{
    background-color: #fff;
    margin-top: 8px;
    padding: 10px;
    .seller{
        display: flex;
        img{
            width: 40px;
            height: 40px;
            border: 1px solid #ddd;
            margin-right: 5px;
            // border-radius: 5px;
        }
        .name{
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 16px;
            span{
                width: 30px;
                font-size: 10px;
                padding: 2px 0;
                text-align: center;
                margin-top: 5px;
                background-color: red;
                color: #fff;
                border-radius: 10px;
            }
        }
    }
    .desc{
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        color: #bbb;
        span i{
            color: #ee8d0f;
        }
    }
    .inshop{
        display: flex;
        margin-top: 15px;
        justify-content: center;
        a{
            // background-color: red;
            border: 1px solid #e63e3e;
            color: #e63e3e;
            padding: 5px 20px;
            margin-right: 10px;

            border-radius: 12px;
        }
    }

}
</style>