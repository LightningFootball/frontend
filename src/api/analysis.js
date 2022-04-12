import api from '@/api/api'

const analysisApi = {
  GetProblemSetProblemUserAnalysis: '/api//analysis/problem-set/:problem_set_id/problem/:problem_id/user/:user_id',
  GetProblemSetProblemAnalysis: '/api//analysis/problem-set/:problem_set_id/problem/:problem_id'
}

export function getProblemSetProblemUserAnalysis(problemSetId, problemId, userId) {
  return api({
    url: analysisApi.GetProblemSetProblemUserAnalysis.replace(':problem_set_id', problemSetId).replace(':problem_id', problemId).replace(':user_id', userId),
    method: 'get'
  })
}

export function getProblemSetProblemAnalysis(problemSetId, problemId) {
  return api({
    url: analysisApi.GetProblemSetProblemAnalysis.replace(':problem_set_id', problemSetId).replace(':problem_id', problemId),
    method: 'get'
  })
}
