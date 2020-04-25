let postcss = require('postcss')

let plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('duplicates css properties that match provided values', async () => {
  await run(
    'a { background: $ui-01; color: red; }',
    'a { background: $ui-01; background: $css-custom-property-ui-01; color: red; }', // eslint-disable-line max-len
    {
      values: ['$ui-01'],
      duplicate: value => `$css-custom-property-${ value.slice(1) }`
    }
  )
})

it('makes no changes if no values are provided', async () => {
  await run(
    'a { background: $ui-01; color: red; }',
    'a { background: $ui-01; color: red; }',
    {
      values: [],
      duplicate: value => `$css-custom-property-${ value.replace('$', '') }`
    }
  )
})
