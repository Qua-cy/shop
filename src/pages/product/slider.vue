<template>
    <div class="product-slider">
        <me-loading v-if="!sliders.length"></me-loading>
        <me-slider 
            :interval="interval" 
            :loop="loop"
            :data="sliders"
            v-else
        >
            <swiper-slide v-for="(item, index) in sliders" :key="index">
                <img :src="item" alt="" class="slider-img">
            </swiper-slide>
        </me-slider>
    </div>
</template>
<script>
import MeLoading from 'base/loading';
import MeSlider from 'base/slider';
import {swiperSlide} from 'vue-awesome-swiper';
export default {
    name:'ProductSlider',
    components:{
        MeLoading,
        MeSlider,
        swiperSlide
    },
    data(){
        return {
            sliders:'',
            interval: 0,
            loop:true
        }
    },
    props:{
        slidersData:{
            type:[Array, Object],
            default:[]
        }
    },
    watch:{
        slidersData(value){      
            this.sliders = value.item.images;
        }
    }
}
</script>
<style lang="scss" scoped>
    .product-slider{
        height: 320px;
        .slider-img{
            width: 100%;
            height: 100%;
        }
    }
</style>