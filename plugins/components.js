import Vue from 'vue'

//componentsファイルにあるグローバルにしたいコンポーネントをimport
import Comment from '~/components/Comment'
//それを今回は'Button'というコンポーネント名で設定。
Vue.component('Comment', Comment)
