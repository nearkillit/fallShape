import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Users from '~/store/users'
import Shapes from '~/store/shapes'

// eslint-disable-next-line import/no-mutable-exports
let UsersStore: Users
let ShapesStore: Shapes

/**
 * ストアを初期化する（型推論できるモジュールとして取得する）
 * @param store Vuex.Store
 */
function initializeStores(store: Store<any>): void {
  // Users を型推論できるストアモジュール化
  UsersStore = getModule(Users, store)
  ShapesStore = getModule(Shapes, store)
}

export { initializeStores, UsersStore, ShapesStore }