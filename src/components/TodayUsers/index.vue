<template>
  <common-card
    title="今日交易用户数"
    :value="orderUser"
  >
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">{{returnRate}}</span>
    </template>
  </common-card>
</template>

<script>
  import commonCardMixin from '../../mixins/commonCardMixin'
  import commonDataMixin from '../../mixins/commonDataMixin'

  export default {
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
      getOptions() {
        return {
          color: ['#3398DB'],  // 柱状图颜色
          tooltip: {},
          series: [{
            name: '用户实时交易量',
            type: 'bar',  // 柱状图
            data: this.orderUserTrend,  // 数据
            barWidth: '60%'  // 柱状图宽度
          }],
          xAxis: {
            type: 'category',
            data: this.orderUserTrendAxis,  //滑上去有值 时间
            show: false
          },
          yAxis: {
            show: false
          },
          grid: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
