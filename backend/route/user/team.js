const router = Router()
import { Router } from 'express'
import _ from 'lodash'
import { HttpUtils } from '../../utils'
import {HTTP_ERROR_CODE, TEXT_VALIDATOR} from '../../config'
import TeamController from '../../service/team/controller'

router.post('/create', (req, res) => {
  const data = {...req.body}
  data.createdBy = req.currentUser.id
  TeamController.create(data).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.put('/:id/rename', (req, res) => {
  TeamController.rename(req.currentUser, req.params.id, req.body).then(() => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.put('/:id/delete', (req, res) => {
  TeamController.delete(req.currentUser, req.params.id).then((data) => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.post('/:id/add-member', (req, res) => {
  TeamController.addMember(req).then((data) => {
    return HttpUtils.jsonResponse(res)
  }).catch((error) => {
    const detailError = _.get(error, 'parent.detail')
    if(detailError && detailError.match(/^Key .* already exists.$/))
      return HttpUtils.errorResponse(
        res,
        new Error(TEXT_VALIDATOR.TEAM_MEMBER_EXISTED),
        HTTP_ERROR_CODE.BAD_REQUEST
      )
    return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
  })
})

router.delete('/:teamId/delete-member/:memberId', (req, res) => {
  const {teamId, memberId} = req.params
  TeamController.deleteMember(req.currentUser, memberId, teamId)
    .then(() => {
      return HttpUtils.jsonResponse(res)
    }).catch((error) => {
      return HttpUtils.errorResponse(res, error, HTTP_ERROR_CODE.BAD_REQUEST)
    })
})

module.exports = router;
