<template>
    <div class="content">
        <div class="head-pic">
            <i class="iconfont icon-personal"></i>
            <div class="login">
                <span>注册</span>
                <span class="line">|</span>
                <span>登录</span>
            </div>
        </div>
        <div class="my-order">
            <div class="title">
                <div class="left">
                    <i class="iconfont icon-cart"></i>
                    <span>我的订单</span>
                </div>
                <div class="right">
                    <span>查看我的订单</span>
                    <i class="iconfont icon-back"></i>
                </div>
            </div>
            <div class="buy-info">
                <div>
                    <i class="iconfont icon-shop"></i>
                    <span>待付款</span>
                </div>
                <div>
                    <i class="iconfont icon-shop"></i>
                    <span>待收货</span>
                </div>
                <div>
                    <i class="iconfont icon-shop"></i>
                    <span>待评价</span>
                </div>
                <div>
                    <i class="iconfont icon-shop"></i>
                    <span>退货/退款</span>
                </div>
            </div>
        </div>
        <div class="my-money">
            <div class="title">
                <i class="iconfont icon-shop"></i>
                <span>我的资产</span>
            </div>
            <div class="type">
                <span>现金券</span>
                <span>红包</span>
                <span>余额</span>
                <span>礼品卡</span>
            </div>
        </div>
        <div class="other-service">
            <div class="item">
                <div>
                    <i class="iconfont icon-service"></i>
                    <span>售后服务</span>
                </div>
                <i class="iconfont icon-back"></i>
            </div>
            <div class="item">
                <div>
                    <i class="iconfont icon-more"></i>
                    <span>意见反馈</span>
                </div>
                <i class="iconfont icon-back"></i>
            </div>
            <div class="item">
                <div>
                    <i class="iconfont icon-category"></i>
                    <span>收货地址</span>
                </div>
                <i class="iconfont icon-back"></i>
            </div>
            <div class="item">
                <div>
                    <i class="iconfont icon-delete"></i>
                    <span>退出登录</span>
                </div>
                <i class="iconfont icon-back"></i>
            </div>
            <div class="item">
                <div>
                    <i class="iconfont icon-msg"></i>
                    <span>400-123-8888</span>
                </div>
                <i class="iconfont icon-back"></i>
            </div>
        </div>
        <div class="service-num">
            <p>客服热线400-123-8888（8：00 - 22：00）</p>
            <p>拨打前请记录您的UID</p>
        </div>
    </div>    
</template>
<script>
export default {
    name:'PerContent'
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
@mixin rotate-icon(){
    display: inline-block;
    transform: rotateY(180deg);
}
   .content{
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
        .head-pic{
            height: 120px;
            margin-bottom: 10px;
            background-color: $header-bgc-translucent;
            @include flex-center(column);
            .iconfont{
                font-size: 50px;
                margin-bottom: 20px;
                color: #fff;
            }
            .login{
                font-size: 20px;
                color: #fff;
                font-weight: bold;
                .line{
                    margin: 0 20px;
                }
            }
        }
        .my-order{
            background-color: #fff;
            font-size: 14px;
            margin-bottom: 10px;
            .title{  
                display: flex;
                align-items: center;
                padding: 12px 8px;  
                border-bottom: 1px solid #ddd;        
                .left{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    .iconfont{
                        margin-right: 10px;        
                    }
                }
                .right{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .iconfont{
                        @include rotate-icon();
                        margin-left: 10px;
                    }
                }
            }
            .buy-info{
                display: flex;
                justify-content: space-around;
                padding: 20px 0;
                div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .iconfont{
                        font-size: 25px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .my-money{
            background-color: #fff;
            font-size: 14px;
            margin-bottom: 10px;
            .title{
                border-bottom: 1px solid #ddd;
                padding: 12px 8px;
                .iconfont{
                    margin-right: 5px;
                }
            }
            .type{
                display: flex;
                justify-content: space-around;
                padding: 20px 0;
            }
        }
        .other-service{
            background-color: #fff;
            margin-bottom: 10px;
            .item{
                display: flex;
                font-size: 14px;
                justify-content: space-between;
                border-bottom: 1px solid #ddd;
                padding: 12px 8px;
                .icon-back{
                    @include rotate-icon();
                }
                div .iconfont{
                    margin-right: 5px;
                }
            }
        }
        .service-num{
            padding: 10px 8px 20px 8px;
            p{
                font-size: 14px;
                line-height: 20px;
            }
        }
    }
</style>