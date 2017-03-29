import Vue from 'vue'

const FORM = '@@VUEX-FORM'
const type = name => `${FORM}/${name}`

export default {
  state: {},

  mutations: {
    [type('REGISTER_FORM')]: (state, {form}) => {
      Vue.set(state, form, {
        fields: {},
        values: {},
        defaultValues: {},
        anyTouched: false,
        active: ''
      })
    },
    [type('REGISTER_FIELD')]: (state, {field, form}) => {
      Vue.set(state[form].fields, field, {
        pristine: true,
        dirty: false,

        visited: true,
        active: true,

        touched: false
      })
    },
    [type('CHANGE')]: (state, {form, field, value}) => {
      Vue.set(state[form].values, field, value)
    },
    [type('FOCUS')]: (state, {form, field}) => {
      state[form].fields[field].active = true
      state[form].fields[field].visited = true
    },
    [type('BLUR')]: (state, {form, field}) => {
      state[form].fields[field].active = false
      state[form].fields[field].visited = true
      state[form].fields[field].touched = true
    },
  }
}
