async function postData (url = '', data = {}) {
  const response = await window.fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const login = async (email, password) => {
  return postData('/api/login', { email, password })
}

const getArtifactoryData = async (entity) => {
  const response = await window.fetch('/api/' + entity)
  const json = await response.json()
  return json.map(({ fields }) => fields)
}
export const getUsers = async () => getArtifactoryData('users')

export const getQuestions = async () => getArtifactoryData('questions')
