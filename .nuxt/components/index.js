export const Comment = () => import('../../components/Comment.vue' /* webpackChunkName: "components/comment" */).then(c => wrapFunctional(c.default || c))
export const Nav = () => import('../../components/Nav.vue' /* webpackChunkName: "components/nav" */).then(c => wrapFunctional(c.default || c))
export const ArtWork = () => import('../../components/ArtWork/index.vue' /* webpackChunkName: "components/art-work" */).then(c => wrapFunctional(c.default || c))
export const Matters = () => import('../../components/Matters/index.vue' /* webpackChunkName: "components/matters" */).then(c => wrapFunctional(c.default || c))
export const CssCommentText = () => import('../../components/css/CommentText.vue' /* webpackChunkName: "components/css-comment-text" */).then(c => wrapFunctional(c.default || c))
export const ArtWorkJsArtworkGL = () => import('../../components/ArtWork/js/ArtworkGL.js' /* webpackChunkName: "components/art-work-js-artwork-g-l" */).then(c => wrapFunctional(c.default || c))
export const ArtWorkJsCopy = () => import('../../components/ArtWork/js/copy.js' /* webpackChunkName: "components/art-work-js-copy" */).then(c => wrapFunctional(c.default || c))
export const MattersJsMatterMethod = () => import('../../components/Matters/js/matterMethod.js' /* webpackChunkName: "components/matters-js-matter-method" */).then(c => wrapFunctional(c.default || c))

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
