<template>
    <div class="content1">
        <p class="tit1">totalContent 滚动区域，高度为所有数据高度总和</p>
        <div class="content2">
            <p class="tit2">
                virtualContent 可视区域，高度为所有可视数据高度总和
            </p>
            <div
                class="item"
                v-for="(item, index) in data"
                :key="index"
                :style="{ transform: `translateY(${(item - 1) * 30}px)` }"
            >
                <span style="padding-right: 20px">hello world !</span>
                <span>transform: translateY( <span style="color: red;">index * height</span> px);</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }
}
</script>
<style scoped leng="less">
.content1 {
    background: #c6edf9;
    width: 500px;
    height: 600px;
    padding-top: 180px;
    margin: 0 auto;
    position: relative;
}
.tit1 {
    font-size: 20px;
    position: absolute;
    top: 15px;
    left: 15px;
}
.content2 {
    background: #8ae7be;
    width: 500px;
    height: 300px;
    position: relative;
    margin: 0 auto;
}
.tit2 {
    font-size: 16px;
    position: absolute;
    top: -25px;
    left: 15px;
}
.item {
    height: 30px;
    line-height: 30px;
    position: absolute;
    width: 100%;
    top:0;
    border: 1px solid;
}
</style>
