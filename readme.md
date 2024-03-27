# Zeptomatch Explode

A little utility for exploding a [`zeptomatch`](https://github.com/fabiospampinato/zeptomatch)-flavored glob into its dynamic and static parts.

The idea is to extract the static parts of a glob, potentially from both ends, for optimization purposes. Which static parts can be detected as such, and which dynamic parts can be resolved into static parts, is an implementation detail.

## Install

```sh
npm install --save zeptomatch-explode
```

## Usage

#### `explodeStart`

This function extracts the static parts of a glob from its start, stopping at the first dynamic part found.

It returns an array of static parts, and the rest of the glob, the dynamic part. The dynamic part is never empty, unless the entire glob is an empty string, so the last part of a glob is never considered static by this function.

The static parts are returned as an array because some simple dynamic starts are resolved into all the static strings that would match them.

The idea is that for example for simple globs that may look like this: `foo/**/*`, instead of searching from the root and then matching against the whole glob, if you extract the static part out of it you can just search for everything inside the `foo` folder, which is potentially faster, as other folders are not searched into and no files need to actually be matched against the glob, in this particular example.

```ts
import {explodeStart} from 'zeptomatch-explode';

const result1 = explodeStart ( 'foo/**/*' );

result1.statics; // => ['foo']
result1.dynamic; // => '**/*'

const result2 = explodeStart ( 'foo{bar,baz}/**/*' );

result2.statics; // => ['foobar', 'foobaz']
result2.dynamic; // => '**/*'

const result3 = explodeStart ( 'foo' );

result3.statics; // => []
result3.dynamic; // => 'foo'
```

#### `explodeEnd`

This function extracts the static part of a glob from its end, stopping at the first slash found.

It returns an array of static parts, and the rest of the glob, the dynamic part. The rest of the glob is never empty, it gets generalized automatically to match against any file.

The static parts are returned as an array because some simple dynamic ends are resolved into all the static strings that would match them.

The idea is that by extracting this information from the end of a glob you can generate optimized matching functions that just check the end of a path, instead of matching the whole path against the glob, very quickly.

```ts
import {explodeEnd} from 'zeptomatch-explode';

const result1 = explodeEnd ( '**/*.js' );

result1.flexibleStart; // => true
result1.flexibleEnd; // => false
result1.statics; // => ['.js']
result1.dynamic; // => '**/*'

const result2 = explodeEnd ( '**/index.{js,ts}' );

result2.flexibleStart; // => false
result2.flexibleEnd; // => false
result2.statics; // => ['index.js', 'index.ts']
result2.dynamic; // => '**/*'

const result3 = explodeEnd ( '**/*.test.*' );

result3.flexibleStart; // => true
result3.flexibleEnd; // => true
result3.statics; // => ['.test.']
result3.dynamic; // => '**/*'
```

## License

MIT © Fabio Spampinato
