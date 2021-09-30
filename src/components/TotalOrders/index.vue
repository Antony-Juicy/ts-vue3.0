<template>
  <common-card
    title="累计订单量"
    :value="orderToday"
  >
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>昨日订单量 </span>
      <span class="emphasis">{{orderLastDay}}</span>
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
        return this.orderTrend.length > 0 ? {
          xAxis: {
            type: 'category',   // 分类的数据  
            show: false,    // x轴隐藏
            boundaryGap: false  // x y 有间隙
          },
          yAxis: {
            show: false    // y轴隐藏
          },
          series: [{ // 图标
            type: 'line',   //则线图
            data: this.orderTrend,  //图标数据 分类
            areaStyle: {
              color: 'purple'  // 颜色
            },
            lineStyle: {
              width: 0
            },
            itemStyle: {
              opacity: 0   // 隐藏线条
            },
            smooth: true  // 线平滑的显示
          }],
          grid: {  //布局样式
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        } : null
      }
    }
  }
</script>
