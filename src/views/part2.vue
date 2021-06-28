<template>
    <div
        class="virtualContent"
        style="max-height: 400px; overflow: auto"
        ref="table"
        @scroll.passive="syncScroll"
    >
        <div class="totalContent" :style="scrollerStyle">
            <div
                class="item virtualItem"
                v-for="line in dataList"
                :key="line.item.name"
                :style="{ transform: `translateY(${line.top}px)` }"
                @click="onClick(line.item)"
            >
                <input type="checkbox" :checked="line.isChecked" />
                <!-- <span>{{ index }}</span> -->
                <span>{{ line.item.name }}</span>
                <span>{{ line.item.age }}</span>
                <span>{{ line.item.sex }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [], // 虚拟滚动原始数据
            dataList: [], // 虚拟滚动可视数据
            maxHeight: 400 // 可视范围的高度
        }
    },
    computed: {
        itemHeight() {
            // 每一行高度
            return 40
        },
        totalSize() {
            // 所有数据总数量
            return this.data.length
        },
        virtualContentNum() {
            // 可视区域的数据数量 4条是不固定的，根据实际开发调整，作为缓冲数据，如果不设置或过小，会有延迟滚动问题
            return 5 + Math.ceil(this.maxHeight / this.itemHeight)
        },
        totalHeight() {
            // 所有数据的总高度
            return this.totalSize * this.itemHeight
        },
        scrollerStyle() {
            const { totalHeight } = this
            return {
                position: 'relative',
                height: totalHeight + 'px',
                overflow: 'hidden'
            }
        }
    },
    watch: {
        data: {
            handler: function (val) {
                this.updateTable()
            },
            deep: true
        }
    },
    methods: {
        syncScroll() {
            this.updateTable()
        },
        updateTable() {
            const { itemHeight, virtualContentNum } = this
            const currentIndex = Math.floor(
                // 拿到滚动区域的滚动距离除以行高，获得当前可视区域第一条数据的索引值
                this.$refs.table.scrollTop / itemHeight
            )
            // 第一条数据的索引值
            const startIndex = currentIndex
            // 最后一条数据的索引值
            const endIndex = startIndex + virtualContentNum
            this.updateScrollData(startIndex, endIndex)
        },
        updateScrollData(startIndex, endIndex) {
            const { data, itemHeight } = this
            // 根据可视区域的首位数据索引，对原始数据进行切片，赋值给可视数据，从而达到更新
            const newData = data
                .slice(startIndex, endIndex)
                .map((item, index) => ({
                    item,
                    top: startIndex * itemHeight, // 传递给transform的值
                    abc: startIndex++, // 注意每计算完一个top值，需要让 startIndex + 1，否则top值会一致造成堆叠
                    // index: startIndex,
                    isChecked: item.isChecked,
                    word: item.word
                }))
            this.dataList = newData
        },
        onClick(item) {
            const index = this.data.findIndex(d => d.name === item.name)
            this.$set(
                this.data[index],
                'isChecked',
                !this.data[index].isChecked
            )
        }
    },
    mounted() {
        const data = []
        for (let i = 0; i < 100000; i++) {
            const oTestData = {
                name: 'John Brown' + i,
                age: 18,
                sex: '男',
                isChecked: false
            }
            data.push(oTestData)
        }
        this.data = data
        // 渲染表格;
        this.$nextTick(this.updateTable)
    }
}
</script>
<style scoped leng="less">
.item {
    width: 50%;
    margin: 0 atuo;
}
.item span {
    width: 100px;
    display: inline-block;
}
.virtualItem {
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.delBtn{
    cursor: pointer;
}
</style>
