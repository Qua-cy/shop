<template>
   <transition name="product" v-if="isShow">
       <div class="product">
           <product-header></product-header>
           <me-scroll>
               <product-slider :slidersData="productData"></product-slider>
               <product-info :infoData="productData"></product-info>
               <product-rate :rateData="productData"></product-rate>
               <product-store :storeData="productData"></product-store>
           </me-scroll>
            <product-footer class="product-footer" :cartData="productData"></product-footer>
       </div>
   </transition>
</template>

<script>
import ProductHeader from './header';
import ProductSlider from './slider';
import ProductInfo from './info';
import ProductRate from './rate';
import ProductStore from './store';
import ProductFooter from './footer';

import {getProductDetail} from 'api/product'

import MeScroll from 'base/scroll'

export default {
    name:'Product',
    components:{
        ProductHeader,
        ProductSlider,
        ProductInfo,
        ProductRate,
        ProductStore,
        ProductFooter,
        MeScroll
    },
    data(){
        return {
            productData: [],
            isShow: false,
            itemId:''
        }
    },
    methods:{
        goBack(){
            this.$router.push('/home');
        },
        getProduct(){
            this.itemId = this.$route.params.id;

            getProductDetail(this.itemId).then(data => {
                this.productData = data.data;
                // this.sliderImgData = data.data.item.images;
                // this.infoData = JSON.parse(data.data.apiStack[0].value);
                // this.rateData = data.data.rate || [];
                console.log(data);
                // console.log(JSON.parse(data.data.apiStack[0].value));
            })
        }
    },
    created(){
        this.getProduct();
    },
    mounted(){
        this.isShow = true;
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product{
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: $product-z-index;
    width: 100%;
    height: 100%;
    // 要多给出header和footer占据的高度，否则滚动条拉不到底
    padding-bottom: 100px;
    background-color: $bgc-theme;
    .product-footer{
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1000;
        width: 100%;
        background-color: #fff;
    }
}
.product-enter-active,
.product-leave-active {
    transition: all 0.3s;
}

.product-enter,
.product-leave-to {
    transform: translate3d(100%, 0, 0);
}

</style>