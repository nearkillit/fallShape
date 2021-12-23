export { default as Comment } from '../../components/Comment.vue'
export { default as Nav } from '../../components/Nav.vue'
export { default as ArtWork } from '../../components/ArtWork/index.vue'
export { default as Matters } from '../../components/Matters/index.vue'
export { default as CssCommentText } from '../../components/css/CommentText.vue'
export { default as ArtWorkJsArtworkGL } from '../../components/ArtWork/js/ArtworkGL.js'
export { default as ArtWorkJsCopy } from '../../components/ArtWork/js/copy.js'
export { default as MattersJsMatterMethod } from '../../components/Matters/js/matterMethod.js'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
