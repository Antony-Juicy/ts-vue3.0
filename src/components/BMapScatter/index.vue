<template>
  <ve-bmap
    :settings="chartSettings"
    :title="title"
    :tooltip="{}"
    :series="chartSeries"
    height="100%"
  ></ve-bmap>
</template>

<script>
  import commonDataMixin from '../../mixins/commonDataMixin'

  const convertData = function (data, geo) {
    const res = []
    data.forEach(item => {
      const { name, value } = item
      const coord = geo[name]
      res.push({
        name,
        value: [...coord, value]
      })
    })
    return res
  }

  /* eslint-disable */
  export default {
    mixins: [commonDataMixin],
    data() {
      return {
        title: {
          text: '慕课外卖销售数据大盘',
          subtext: '销售趋势统计',
          sublink: 'https://www.imooc.com',
          left: 'center'
        },
        chartSettings: {
          key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb',
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,  // 缩放比例
            roam: false,  // 地图 可以修改位置 移动
            mapStyle: {
              styleJson: [{
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                  'color': '#f3f3f3'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'color': '#fdfdfd'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'label',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#999999'
                }
              }]
            }
          }
        },
        chartSeries: []
      }
    },
    watch: {
      mapData() {
        const { data, geo } = this.mapData
        this.chartSeries = [
          {
            name: '销售额',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data, geo),
            encode: {
              value: 2
            },
            itemStyle: {
              color: 'purple'
            },
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              show: false,
              position: 'right',
              formatter: function (v) {
                return `${v.data.name} - ${v.data.value[2]}`
              }
            },
            emphasis: {
              label: {
                show: true  // 移上 显示信息
              }
            }
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
              return b.value - a.value
            }), geo).slice(0, 10),   // 前十的数据
            symbolSize: function (val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: function (v) {
                return `${v.data.name} - ${v.data.value[2]}`
              },
              position: 'right',
              show: true
            },
            hoverAnimation: true,  // 动画
            rippleEffect: {
              brushType: 'stroke'  // 波纹
            },
            itemStyle: {
              color: 'purple',
              shadowBlur: 10,  // 阴影
              shadowColor: '#333'
            }
          }
        ]
      }
    }
  }
</script>
