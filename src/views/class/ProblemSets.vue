<template>
  <a-row>
    <a-col span="18" offset="3">
      <a-card title="作业" :loading="loading">
        <a-list :data-source="klass.problem_sets" bordered style="margin-top: 20px">
          <a-list-item slot="renderItem" slot-scope="problem_set">
            <a-list-item-meta>
              <template slot="title">{{ problem_set.name }}</template>
            </a-list-item-meta>
            {{ problem_set.start_time.format('lll') }}
            ~
            {{ problem_set.end_time.format('lll') }}
            <div class="toolbar-row">
              <div class="space"></div>
              <router-link :to="{name: 'class.problemSet.problems', params: {classID: klass.id, problemSetID: problem_set.id}}" v-if="started(problem_set)">
                <a-button type="link">
                  查看题目
                </a-button>
              </router-link>
              <a-tooltip v-else>
                <template slot="title">
                  作业还未开放！
                </template>
                <a-button type="link" disabled>
                  查看题目
                </a-button>
              </a-tooltip>
              <router-link :to="{name: 'class.problemSet.submissions', params: {classID: klass.id, problemSetID: problem_set.id}}" v-if="started(problem_set)">
                <a-button type="link">
                  查看提交
                </a-button>
              </router-link>
              <a-tooltip v-else>
                <template slot="title">
                  作业还未开放！
                </template>
                <a-button type="link" disabled>
                  查看提交
                </a-button>
              </a-tooltip>
              <!--              <router-link :to="{name: 'class.problemSet.analysis', params: {problemSetID: problem_set.id,problemID: this.$route.params.problem_id}}" v-if="started(problem_set)">-->
              <!--                <a-button type="link">-->
              <!--                  查看分数-->
              <!--                </a-button>-->
              <!--              </router-link>-->
              <!--              <a-tooltip v-else>-->
              <!--                <template slot="title">-->
              <!--                  分析数据获取错误！-->
              <!--                </template>-->
              <!--                <a-button type="link" disabled>-->
              <!--                  查看分数-->
              <!--                </a-button>-->
              <!--              </a-tooltip>-->
            </div>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import Avatar from '@/components/Avatar'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  methods: {
    started (p) {
      return p.start_time.isBefore(moment())
    },
    available (p) {
      return p.end_time.isAfter(moment()) && p.start_time.isBefore(moment())
    }
  },
  components: {
    Avatar
  },
  inject: ['refreshClass'],
  data () {
    return {
      loading: true,
      klass: {
        problemSets: []
      }
    }
  },
  watch: {
    storeClass: {
      handler (val) {
        if (val) {
          this.loading = false
          if (val.problem_sets) {
            val.problem_sets = val.problem_sets.map(p => {
              p.start_time = moment(p.start_time)
              p.end_time = moment(p.end_time)
              return p
            })
          }
          this.klass = val
          this.loading = false
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      storeClass: 'class'
    })
  },
  mounted () {
  }
}
</script>

<style lang="sass" scoped>
.ant-list-item-meta
  align-items: center
.ant-space-horizontal
  width: 100%
  justify-content: center
.toolbar-row
  display: flex
  width: 100%
  :not(:last-child)
    margin-right: 5px
  .space
    flex: 1
</style>
