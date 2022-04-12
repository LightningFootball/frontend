<template>
  <a-row>
    <a-col offset='3' span='18'>
      <a-card>
        <a-list :data-source='analysis'>
          <a-list-item slot='renderItem' slot-scope='a'>
            <a-row>
              <a-col offset='3' span='24'>
                <h1>{{ a.user.nickname }}</h1>
              </a-col>
              <a-col offset='3' span='24'>
                <a-row>
                  <a-descriptions bordered>
                    <a-descriptions-item label='总提交次数'>{{ a.total_submission_count }}</a-descriptions-item>
                    <a-descriptions-item label='初次提交时间'>{{ formatTime(a.first_submission_time) }}</a-descriptions-item>
                    <a-descriptions-item label='初次通过时间'>{{ formatTime(a.first_pass_time) }}</a-descriptions-item>
                    <a-descriptions-item label='最后提交时间'>{{ formatTime(a.last_submission_time) }}</a-descriptions-item>
                    <a-descriptions-item label='总工作时间'>{{ formatTimeDuration(a.total_work_time) }}</a-descriptions-item>
                  </a-descriptions>
                  <a-card>
                    <a-list :data-source='a.submissions'>
                      <a-list-item slot='renderItem' slot-scope='s'>
                        <a-descriptions bordered title='提交记录'>
                          <a-descriptions-item label='提交语言'>{{ s.language }}</a-descriptions-item>
                          <a-descriptions-item label='提交时间'>{{ formatTime(s.created_at) }}</a-descriptions-item>
                          <a-descriptions-item label='更新时间'>{{ formatTime(s.updated_at) }}</a-descriptions-item>
                          <a-descriptions-item label='提交状态'>{{ s.status }}</a-descriptions-item>
                          <a-descriptions-item label='提交分数'>{{ s.score }}</a-descriptions-item>
                        </a-descriptions>
                      </a-list-item>
                    </a-list>
                  </a-card>
                </a-row>
              </a-col>
            </a-row>
            <a-button type='primary' @click='showSubmission(a.user.id)'>查看提交记录</a-button>
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

export default {
  name: 'ProblemSetAnalysis',
  data() {
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
  }
}
</script>

<style scoped>
</style>
