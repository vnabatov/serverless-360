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
