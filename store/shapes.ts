import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Shape } from '~/models/Shape'

const shapesInit: Shape[] = []

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'shapes' })
export default class Shapes extends VuexModule {
  shapes: Shape[] = shapesInit

  public get getShapes(){
    return this.shapes
  }

  @Mutation
  fetch(shapes: Shape[]){
    this.shapes = shapes
  }

}