<template>
  <a-row>
    <a-col offset="3" span="18">
      <v-chart id="pieChart" ref="pieChart" class="chart" :option="option">
      </v-chart>
      <a-card>
        <a-list :data-source="analysis">
          <a-list-item slot="renderItem" slot-scope="a">
            <a-row>
              <a-col offset="3" span="24">
                <h1>{{ a.user.nickname }}</h1>
              </a-col>
              <a-col offset="3" span="24">
                <a-row>
                  <a-descriptions bordered>
                    <a-descriptions-item label="总提交次数">{{ a.total_submission_count }}</a-descriptions-item>
                    <a-descriptions-item label="初次提交时间">{{
                      formatTime(a.first_submission_time)
                    }}
                    </a-descriptions-item>
                    <a-descriptions-item label="初次通过时间">{{ formatTime(a.first_pass_time) }}</a-descriptions-item>
                    <a-descriptions-item label="最后提交时间">{{
                      formatTime(a.last_submission_time)
                    }}
                    </a-descriptions-item>
                    <a-descriptions-item label="总工作时间">{{
                      formatTimeDuration(a.total_work_time)
                    }}
                    </a-descriptions-item>
                  </a-descriptions>
                  <a-card>
                    <a-list :data-source="a.submissions">
                      <a-list-item slot="renderItem" slot-scope="s">
                        <a-descriptions bordered title="提交记录">
                          <a-descriptions-item label="提交语言">{{ s.language }}</a-descriptions-item>
                          <a-descriptions-item label="提交时间">{{ formatTime(s.created_at) }}</a-descriptions-item>
                          <a-descriptions-item label="更新时间">{{ formatTime(s.updated_at) }}</a-descriptions-item>
                          <a-descriptions-item label="提交状态">{{ s.status }}</a-descriptions-item>
                          <a-descriptions-item label="提交分数">{{ s.score }}</a-descriptions-item>
                        </a-descriptions>
                      </a-list-item>
                    </a-list>
                  </a-card>
                </a-row>
              </a-col>
            </a-row>
            <a-button type="primary" @click="showSubmission(a.user.id)">查看提交记录</a-button>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { getProblemSetProblemAnalysis } from '@/api/analysis'
import config from '@/config/config'
import moment from 'moment'
import comparerConf from '@/config/comparerConf'
import languageConf from '@/config/languageConf'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, GridComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'

use([CanvasRenderer,
  TitleComponent,
  GridComponent,
  PieChart,
  UniversalTransition
])

export default {
  name: 'ProblemSetAnalysis',
  components: {
    VChart
  },
  data () {
    return {
      comparerConf,
      languageConf,
      problemSetID: this.$route.params.problemSetID,
      problemID: this.$route.params.problemID,
      config,
      isGuest: this.$store.state.user.info.isGuest,
      user: {
        id: 0,
        username: '',
        nickname: '',
        email: ''
      },
      submissions: {
        id: 0,
        user_id: 0,
        //  user
        problem_id: 0,
        problem_name: '',
        problem_set_id: 0,
        language: '',
        judged: 0,
        score: 0,
        status: '',
        created_at: '',
        updated_at: ''
      },
      analysis: [],
      passedCount: 0,
      chartPie: '',
      option: {}
    }
  },
  created () {
    this.option = {
      title: {
        text: '完成率',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '提交次数',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          data: null,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgb(255,255,255)'
            }
          }
        }
      ]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    formatTime (time) {
      return moment(time).fromNow()
    },
    formatTimeDuration (time) {
      return moment.duration(time, 'seconds').humanize()
    },
    fetch () {
      getProblemSetProblemAnalysis(this.problemSetID, this.problemID)
        .then(data => {
          this.analysis = data.analysis
        })
        .catch(err => {
          this.$error({
            content: '遇到错误' + err.message
          })
          console.error(err)
        })
    }
  },
  watch: {
    analysis: {
      handler () {
        this.passedCount = this.analysis.filter(a => a.highest_score === 100).length
        this.option.series[0].data = [
          {
            value: this.passedCount,
            name: '通过'
          },
          {
            value: this.analysis.length - this.passedCount,
            name: '未通过'
          }
        ]
        this.chartPie = echarts.init(document.getElementById('chartPie'))
        this.chartPie.setOption(this.option)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
