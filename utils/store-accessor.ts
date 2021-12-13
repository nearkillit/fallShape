import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'

// eslint-disable-next-line import/no-mutable-exports
let UsersStore: Users

/**
 * ストアを初期化する（型推論できるモジュールとして取得する）
 * @param store Vuex.Store
 */
function initializeStores(store: Store<any>): void {
  // Users を型推論できるストアモジュール化
  UsersStore = getModule(Users, store)
}

export { initializeStores, UsersStore }