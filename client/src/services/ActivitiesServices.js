import Api from '@/services/Api'

export default {
  addActivities (credentials) {
    return Api().post('activities', credentials)
  },
  getActivities (credentials) {
    return Api().get('goals',credentials)
  },
  deleteActivity (credentials) {
    return Api().delete('goals',credentials)
  }
}