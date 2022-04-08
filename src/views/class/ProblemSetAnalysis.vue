<template>
  <a-row>
    <a-col offset='3' span='18'>
      <a-card>
        <a-list :data-source='analysis'>
          <a-list-item slot='renderItem' slot-scope='a'>
            <a-row>
              <a-col offset='3' span='18'>
                <h1>{{ a.user.nickname }}</h1>
              </a-col>
              <a-col offset='3' span='16'>
                <a-card title='基础分析'>
                  <a-row>
                    总提交次数:{{ a.total_submission_count }}
                  </a-row>
                  <a-row>
                    初次提交时间:{{ formatTime(a.first_submission_time) }}
                  </a-row>
                  <a-row>
                    初次通过时间:{{ formatTime(a.first_pass_time) }}
                  </a-row>
                  <a-row>
                    最后提交时间:{{ formatTime(a.last_submission_time) }}
                  </a-row>
                  <a-row>
                    总工作时间:{{ formatTimeDuration(a.total_work_time) }}
                  </a-row>
                </a-card>
              </a-col>
            </a-row>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>

</template>

<script>
import { getProblemSetSpecificProblemAnalysis } from '@/api/analysis'
import config from '@/config/config'
import moment from 'moment'
import comparerConf from '@/config/comparerConf'
import languageConf from '@/config/languageConf'

export default {
  name: 'ProblemSetAnalysis',
  data() {
    return {
      comparerConf,
      languageConf,
      problemSetID: this.$route.params.problemSetID,
      problemID: this.$route.params.problemID,
      classID: this.$route.params.classID,
      config,
      isGuest: this.$store.state.user.info.isGuest,
      user: {
        id: 0,
        username: '',
        nickname: '',
        email: ''
      },
      analysis: []
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    formatTime(time) {
      return moment(time).fromNow()
    },
    formatTimeDuration(time) {
      return moment.duration(time, 'seconds').humanize()
    },
    fetch() {
      getProblemSetSpecificProblemAnalysis({
        problem_set_id: this.problemSetID,
        problem_id: this.problemID
      }).then(data => {
        this.analysis = data.problem_set_specific_problem_analysis_response
      }).catch(err => {
        this.$error({
          content: '遇到错误' + err.message
        })
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
