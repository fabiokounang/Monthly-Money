export default  { // subHttp untuk masing-masing api yang ada (jika api bank, maka dia akan masuk ke master-bank, api user ke master-user, etc)
  'master-signup': {
    'endpoint': 'users/signup'
  },
  'master-login': {
    'endpoint': 'users/login'
  },
  'master-forgot-password': {
    'endpoint': 'users/forgot-password'
  }
}