<script lang="ts">
import Vue from 'vue'
import io from 'socket.io-client'
import type { CommentDOM } from 'models/Comment'
import CommentText from './css/CommentText.vue'

export default Vue.extend({
  components: {
    CommentText,
  },
  data() {
    return {
      comment: '' as string,
      socket: '' as any,
      comments: [] as string[],
      commentsDOM: [] as CommentDOM[],
      count: 0,
    }
  },
  mounted() {
    this.socket = io(`${process.env.APIURL}`, {
      withCredentials: true,
      extraHeaders: {
        'nuxt-comment': 'abcd',
      },
    })
    this.socket.on('chat message', (comment: string) => {
      console.log('get')
      this.createComment(comment)
    })
  },
  methods: {
    sendMessage() {
      this.comment = this.comment.trim()

      if (this.comment) {
        const message = {
          name: this.socket.id,
          text: this.comment,
        }
        // イベント元はブロードキャストを受けないので自分でmessageを追加する
        this.comments.push(message.text)
        // send-commentイベントでmessageをサーバーサイドに投げる
        this.socket.emit('send-comment', message)
        // my create comment
        this.createComment(this.comment)
        this.comment = ''
      }
    },
    createComment(msg: string) {
      const divText = { comment: msg, style: '', id: '' }
      divText.id = 'text' + this.count
      this.count++
      this.commentsDOM.push(divText)
    },
    removeComment(id: string) {
      this.commentsDOM = this.commentsDOM.filter((cd) => cd.id !== id)
      this.commentsDOM.slice(0)
    },
  },
})
</script>

<template>
  <div>
    <div id="comments" ref="comments">
      <div
        v-for="commentDOM in commentsDOM"
        :id="commentDOM.id"
        :key="commentDOM.id"
        :ref="commentDOM.id"
      >
        <CommentText :textid="commentDOM.id" @removeComment="removeComment">
          {{ commentDOM.comment }}
        </CommentText>
      </div>
    </div>
    <v-bottom-navigation>
      <v-text-field v-model="comment" label="コメント" />
      <v-btn elevation="2" @click="sendMessage">送信</v-btn>
    </v-bottom-navigation>
  </div>
</template>
