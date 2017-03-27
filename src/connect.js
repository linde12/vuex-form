const getComponentName = comp =>
  comp.options && comp.options._Ctor ? comp.options.name : comp.name

export default (opts = {}) => {

  return component => {
    const componentName = getComponentName(component)
    return {
      name: 'vf-' + componentName,
      provide () {
        return {
          input: {
            touched: false,
            visited: false,
            active: false,
            id: `${componentName}-${Math.random()}`,
            onChange () {
              console.log('change')
            },
            onFocus () {
              console.log('focus')
            },
            onBlur () {
              console.log('blur')
            },
          },
          meta: {
            valid: true,
            invalid: false,
            submitting: false,
          },
        };
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
