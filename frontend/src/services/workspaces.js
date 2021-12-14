import { postJson, getJson } from 'utils/utils'

export async function createWorkspace(workspace) {
  return new Promise(resolve => {
    postJson('/workspace/create', { workspace })
      .then(info => {
        resolve(info)
      })
      .catch(err => {
        resolve({})
      })
    // neu failed return {}, success return workspace info
  })
}

export async function getListWorkspace(user) {
  // get tat ca cac workspace user la owner hoac member
  return new Promise(resolve => {
    getJson('/workspace/list', { user })
      .then(list => {
        resolve(list)
      })
      .catch(err => {
        resolve([])
      })
  })
}

export async function currentWorkspace() {
  // neu chua co workspace tra ve {}
  return new Promise(resolve => {
    getJson('/workspace', '')
      .then(info => {
        resolve(info)
      })
      .catch(err => {
        resolve({})
      })
  })
}

export async function getWorkspace(workspaceId) {
  // neu failed return {}
  // neu success return workspace info:
  return new Promise(resolve => {
    getJson('/workspace', { workspaceId })
      .then(info => {
        resolve(info)
      })
      .catch(err => {
        resolve({})
      })
  })
}
