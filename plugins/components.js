import Vue from 'vue'

//componentsファイルにあるグローバルにしたいコンポーネントをimport
import Signup from '~/components/Signup'
import Comment from '~/components/Comment'
//それを今回は'Button'というコンポーネント名で設定。
Vue.component('Comment', Comment)
Vue.component('Signup', Signup)
