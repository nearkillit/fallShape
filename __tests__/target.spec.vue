<script lang="ts">
import { mount } from '@vue/test-utils'
import Login from '@/pages/Login.vue'

describe('App', () => {
  it('click button count up', async () => {
    const wrapper = mount(Login)

    // DOM更新系は即座にDOMに反映されないのでasync awaitを使う
    // await wrapper.get("v-btn").trigger("click");

    // findからのtextでタグの中身をとってくる
    const contain = await wrapper.findComponent({ ref: 'title' })
    // console.log('contain内容チェック', contain)

    //タグの中身確認
    // expect(contain).toEqual('ログイン画面')
    expect(contain.exists()).toBe(true)
  })
})
</script>
