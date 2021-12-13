import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { User } from '~/models/User'
import { $axios } from '~/utils/api'

const UserAPI = "http://127.0.0.1:7000/"

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'users' })
export default class Users extends VuexModule {
  user: User = {id:0,username:"",password:"",email:"",createdAt:"",updatedAt:""}

  /**
   * Todo の done（完了状態）を切り替える
   * @param todo 完了状態を切り替える対象の Todo インスタンス
   */
  @Mutation
  fetch(user: User) {
    this.user = user
  }

  @Action({ rawError: true })
  public async fetchUser() {
    let data = await $axios.$get<User>(`${UserAPI}`)    
    this.fetch(data)    
  }
}