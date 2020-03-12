<template>
    <div class="personal">
        <per-header></per-header>
        <me-scroll>
            <per-content></per-content>
        </me-scroll>
    </div>
</template>

<script>
import MeScroll from 'base/scroll'
import PerHeader from './header'
import PerContent from './content'
export default {
    name:'Personal',
    components:{
        MeScroll,
        PerHeader,
        PerContent
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.personal{
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 要多给出header和footer占据的高度，否则滚动条拉不到底 */
    padding-bottom: 100px;
    }
</style>