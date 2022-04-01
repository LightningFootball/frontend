import api from '@/api/api'

const analysisApi = {
  GetSubmissionsBasicAnalysis: '/api/analysis/basic'
}

export function getSubmissionsBasicAnalysis (req) {
  return api({
    url: analysisApi.GetSubmissionsBasicAnalysis,
    method: 'get',
    params: req
  })
}
