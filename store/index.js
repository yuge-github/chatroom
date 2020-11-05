import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  user:''
  },
  mutations: {
	  signin(state,res){
		  console.log(res)
		  state.user=res;
		  
	  }
  },
  actions: {
	  
	 
  },
  modules: {
  }
})