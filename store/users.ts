import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
// import axios from 'axios';
// import { $axios } from '~/utils/api'
import { User } from '~/models/User'

// const UserAPI = "http://localhost:7000"
const userInit = {
  id: 0,
  goal: 0,
  username: '',
  password: '',
  email: '',
  created_at: new Date('1960/1/1'),
  updated_at: new Date('1960/1/1'),
  put_at: null,
  goal_at: null,
}

// function timeConvert(datetime: string){

// }

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'users' })
export default class Users extends VuexModule {
  user: User = userInit

  public get getUsers() {
    return this.user
  }

  @Mutation
  fetch(user: User) {
    const newUser: User = {
      id: user.id,
      goal: user.goal,
      username: user.username,
      password: user.password,
      email: user.email,
      created_at: new Date('1960/1/1'),
      updated_at: new Date('1960/1/1'),
      put_at: user.put_at,
      goal_at: user.goal_at,
    }
    if (user.updatedAt) newUser.updated_at = new Date(user.updatedAt)
    if (user.createdAt) newUser.created_at = new Date(user.createdAt)
    if (user.put_at) newUser.put_at = new Date(user.put_at)
    if (user.goal_at) newUser.goal_at = new Date(user.goal_at)
    this.user = Object.assign({}, newUser)
  }

  @Mutation
  fetchPutAt(putAt: Date) {
    this.user.put_at = putAt
    this.user = Object.assign({}, this.user)
  }

  @Mutation
  fetchGoalAt(goalAt: Date) {
    this.user.goal_at = goalAt
    this.user = Object.assign({}, this.user)
  }

  @Mutation
  incrementGoal() {
    this.user.goal = this.user.goal + 1
    this.user = Object.assign({}, this.user)
  }

  @Mutation
  logout() {
    this.user = userInit
  }

  // @Action({ rawError: true })
  // public async login(loginData: LoginData) {
  //   try{
  //     const { data } = await axios.post(`${UserAPI}/login`,loginData,{
  //       withCredentials: true,
  //       headers: {'Content-Type': 'application/json',
  //     }})
  //     if(data === "Failure") this.user_status = "Failure"
  //     this.fetch(data)
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // @Action({ rawError: true })
  // public async signUp(signUpData: SignUpData) {
  //   try{
  //     const { data } = await axios.post(`${UserAPI}/signup`,signUpData,{
  //       withCredentials: true,
  //       headers: {'Content-Type': 'application/json',
  //     }})
  //     this.fetch(data)
  //   }catch(err){
  //     console.log(err);
  //   }
  // }
}
