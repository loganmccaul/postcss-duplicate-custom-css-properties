const postcss = require('postcss')

module.exports = postcss.plugin(
  'postcss-duplicate-custom-properties',
  ({ values, duplicate }) => {
    // Work with options here

    if (!values) {
      return null
    }

    return root => {
      root.walkDecls(decl => {
        if (values.some(value => value === decl.value)) {
          decl.cloneAfter({
            prop: decl.prop,
            value: duplicate(decl.value)
          })
        }
      })
    }
  }
)
