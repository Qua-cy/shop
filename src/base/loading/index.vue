<template>
    <div class="mine-loading" :class="{'mine-loading-inline': inline}">
        <span class="mine-loading-indicator" v-if="indicator==='on'">
            <slot><img src="./loading.gif" alt="loading"></slot>
        </span>
        <span class="mine-loading-text" v-if="text">{{loadingText}}</span>
    </div>
</template>

<script>
export default {
    name:'MeLoading',
    props:{
        indicator:{
            type:String,
            default: 'on',
            validator(value){
                return ['on','off'].indexOf(value) > -1;
            }
        },
        text:{
            type:String,
            default:'加载中...'
        },
        inline:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            loadingText: this.text
        }
    },
    watch:{
        // watch可以监听接收来自父组件的text是否发生变化，也可以监听本组件的属性数据变化
        // 作用：只要text的值发生变化，这个方法就会被调用
        // 可以有两个参数，第一个是新值，第二个是之前的值
        text(text){
            this.loadingText = text;
        }
    },
    methods:{
        setText(text){
            this.loadingText = text;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
    .mine-loading{
        overflow: hidden;
        width: 100%;
        height: 100%;
        @include flex-center(column);

        &.mine-loading-inline{
            flex-direction: row;
            .mine-loading-indicator ~ .mine-loading-text{
                margin-top: 0px;
                margin-left: 6px;
            }
        }
    }
    .mine-loading-indicator ~ .mine-loading-text{
        margin-top: 6px;
    }

</style>