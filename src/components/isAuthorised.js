import Cookies from 'js-cookie'

export default () => Cookies.get('sessionId') && Cookies.get('sessionId').length
