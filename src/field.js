// TODO: Remove this. This has to be a component which
// renders the passed field with correct props

// In the future we might not be able to use mixins
// so we wrap it in a function
export default component => {
  const mixins = component.mixins || []
  const mixin = {
    inject: ['input', 'meta'],
    created () {
      this.meta.register(this.name)
      console.log('Name', this.name)
    }
  }

  mixins.push(mixin)

  return Object.assign({}, component, {mixins})
}
