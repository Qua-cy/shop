<template>
    <div class="home">
        <header class="g-header-container">
            <home-header :class="{'header-transition':isheaderTransition}" ref="header"></home-header>
        </header>
        <me-scroll 
            :data="recommends"
            pullDown
            pullUp
            @pull-down="pullToRefresh"
            @pull-up="pullToReLoadMore"
            @scroll="scroll"
            @scroll-end="scrollEnd"
            @pull-down-transition-end="PullDownTransitionEnd"
            ref="scroll"
        >
            <home-slider ref="slider"></home-slider>
            <home-nav></home-nav>
            <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
        </me-scroll>
        <div class="g-backtop-container">
            <me-backtop :visible="isBacktopVisible" @backtop="backToTop"></me-backtop>
        </div>
        <!-- 二级路由product在此切换 -->
        <router-view></router-view>
    </div>
</template>

<script>
import MeScroll from 'base/scroll'
import MeBacktop from 'base/backtop'
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import {HEADER_TRANSITION_HEIGHT} from './config'
export default {
    name:'Home',
    components:{
        MeScroll,
        MeBacktop,
        HomeHeader,
        HomeSlider,
        HomeNav,
        HomeRecommend
    },
    data(){
        return {
            recommends:[],
            isBacktopVisible:false,
            isheaderTransition:false
        }
    },

    methods:{
        updateScroll(){

        },
        getRecommends(recommends){
            this.recommends = recommends;
        },
        pullToRefresh(end){
            // 执行子组件Homeslider下定义的update方法
            this.$refs.slider.update().then(end);
            // setTimeout(() =>  {
            //     console.log('下拉刷新');
            //     end();
            // },1000)
        },
        pullToReLoadMore(end){
            this.$refs.recommend.update().then(end).catch(err => {
                if(err){
                    console.log(err);
                }
                end();
            });

            // setTimeout(() =>  {
            //     console.log('上拉');
            //     end();
            // },1000)
        },
        scroll(translate){
            this.changeHeaderStatus(translate);
        },
        scrollEnd(translate, scroll,pulling){
            // console.log(translate);
            if(!pulling){
                this.changeHeaderStatus(translate);
            }
            this.isBacktopVisible = translate < 0 && -translate > scroll.height;
            
        },
        PullDownTransitionEnd(){
            this.$refs.header.show();
        },
        backToTop(){
            // 点击返回顶部按钮触发backToTop事件，调用MeScroll组件的scrollToTop()方法返回顶部
            this.$refs.scroll && this.$refs.scroll.scrollToTop();
        },
        changeHeaderStatus(translate){
            if(translate > 0){
                this.$refs.header.hide();
                return;
            }

            this.$refs.header.show();

            this.isheaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

    .home{
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
    }
</style>