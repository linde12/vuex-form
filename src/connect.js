import {FORM} from './util'

const getComponentName = comp =>
  comp.options && comp.options._Ctor ? comp.options.name : comp.name

const commit = (store, event, ...args) =>
  store.commit(`${FORM}/${event}`, ...args)

export default (opts = {}) => {
  const form = opts.name
  return component => {
    const componentName = getComponentName(component)
    return {
      name: 'vf-' + componentName,
      provide () {
        return {
          // TODO: These should be accessible on a field level
          // and not here. Add new `Field` component
          input: {
            id: `${componentName}-${Math.random()}`,
            onChange: (field, value) => {
              commit(this.$store, 'CHANGE', {field, value, form})
              console.log('change')
            },
            onFocus: (field) => {
              commit(this.$store, 'FOCUS', {field, form})
              console.log('focus')
            },
            onBlur: (field) => {
              commit(this.$store, 'BLUR', {field, form})
              console.log('blur')
            }
          },
          meta: {
            valid: true,
            invalid: false,
            submitting: false,
            register: field => commit(this.$store, 'REGISTER_FIELD', {field, form})
          }
        };
      },

      created () {
        commit(this.$store, 'REGISTER_FORM', {form})
      },

      render (h) {
        // TODO: Remove. This is temporary
        return h(component, {
          props: {
            submitting: false,
            submit: () => {
              const errors = opts.validate({abc: 123})
              const valid = Object.keys(errors).length === 0

              if (valid) {
                console.log('Submitting...')
              } else {
                console.log('Errors', errors)
              }
            },
          },
        })
      },
    }
  }
}
