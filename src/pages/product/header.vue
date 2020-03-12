<template>
    <div class="header">
        <me-navbar title="商品详情" class="product-header">
            <i class="iconfont icon-back" slot="left" @click="goBack"></i>
            <i class="iconfont icon-cart" slot="right" @click="goToCart"></i>
        </me-navbar>
    </div>
</template>
<script>
import MeNavbar from 'base/navbar'
export default {
    name:'ProductHeader',
    components:{
        MeNavbar
    },
    methods:{
        goBack(){
            this.$router.push('/home');
        },
        goToCart(){
            this.$router.push('/cart');
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.header{
    .product-header{
        background-color: $header-bgc-translucent;
        color: #fff;
    }
    .iconfont{
        font-size: 20px;
    }
}
</style>