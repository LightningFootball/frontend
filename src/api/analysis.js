import api from '@/api/api'

const analysisApi = {
  GetSubmissionsBasicAnalysis: '/api/analysis/basic',
  GetProblemSetSpecificProblemAnalysis: '/api/analysis/ProblemSetSpecificProblem'
}

export function getSubmissionsBasicAnalysis(req) {
  return api({
    url: analysisApi.GetSubmissionsBasicAnalysis,
    method: 'get',
    params: req
  })
}

export function getProblemSetSpecificProblemAnalysis(req) {
  return api({
    url: analysisApi.GetProblemSetSpecificProblemAnalysis,
    method: 'get',
    params: req
  })
}
