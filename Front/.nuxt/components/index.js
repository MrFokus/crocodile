export { default as Message } from '../../components/message.vue'
export { default as LobbyGradientBackground } from '../../components/lobby/GradientBackground.vue'
export { default as LobbyHiddenWord } from '../../components/lobby/HiddenWord.vue'
export { default as LobbyScoreTable } from '../../components/lobby/ScoreTable.vue'
export { default as LobbySelectTeam } from '../../components/lobby/SelectTeam.vue'
export { default as SettingsGameMode } from '../../components/settings-game/GameMode.vue'
export { default as SettingsGameJoiningLobby } from '../../components/settings-game/JoiningLobby.vue'

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
