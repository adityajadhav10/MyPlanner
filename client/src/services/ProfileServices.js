import Api from '@/services/Api'

export default {
  updateProfile (additionalinfo) {
    return Api().put('profile', additionalinfo)
  }
}