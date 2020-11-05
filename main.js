import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import axios from './node_modules/_axios@0.21.0@axios/lib/axios.js'
import io from './components/socket/weapp.socket.io.js'

Vue.config.productionTip = false

//服务器地址
Vue.prototype.serverUrl='http://localhost:3000'
Vue.prototype.socket=io('http://localhost:8085')


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
