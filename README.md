# PostSCSS Duplicate Property

[PostCSS] plugin that duplicates custom properties to provide a fallback for older browsers.

[postcss]: https://github.com/postcss/postcss

```js
const duplicateProps = require('postcss-duplicate-property')

module.exports = {
  plugins: [
    duplicateProps({
      values: ['$text-color'],
      duplicate: value => `$custom-property-${value.slice(1)}`
    })
  ]
}
```

```scss
.foo {
  color: $text-color;
}
```

```scss
.foo {
  color: $text-color;
  color: $custom-property-text-color;
}
```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
const duplicateProps = require('postcss-duplicate-property');
module.exports = {
  plugins: [
+   duplicateProps({values: [ /* values to duplicate */ ], duplicate: value =>  /* duplicated value */}),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
