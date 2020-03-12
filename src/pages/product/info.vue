<template>
    <div class="product-info">
        <div class="price">
            <span>¥<i>{{price}}</i></span>
            <span>{{saleCount}}件已售</span>
        </div>
        <div class="title">{{title}}</div>
        <div class="salecount">
            <span>{{postage}}</span>
            <span>月销量{{saleCount}}件</span>
            <span>{{address}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProductInfo',
    props:{
        infoData:{
            type:[Object,Array]
        }
    },
    data(){
        return{
            info:'',
            price: null,
            title:null,
            postage:null,
            saleCount:null,
            address:null,
        }
    },
    watch:{
        infoData(value){
            this.info = JSON.parse(value.apiStack[0].value)

            this.price = this.info.price.price.priceText;
            this.title = this.info.item.title;
            this.postage = this.info.delivery.postage;
            this.saleCount = this.info.item.vagueSellCount;
            this.address = this.info.delivery.from;

        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.product-info{
    background-color: #fff;
    .price{
        height: 30px;
        background-image: linear-gradient(to right, #ef338f , #ef3648);;
        @include flex-between();
        padding: 0 10px;

        span{
            display: block;
            color: #fff;
            i{
                font-size: 20px;
            }
        }
    }
    .title{
        padding: 10px 10px;
        font-size: 14px;
        line-height: 1.3;
        color: #000;
    }
    .salecount{
        @include flex-between();
        padding: 7px 10px;
        color: #bbb;
    }

}

</style>