
/* IMPORT */

import type {ExplodedStart} from './types';

/* HELPERS */

const SIMPLE_RE = /(\/?)([ a-zA-Z0-9._-]*)(?:\{([ a-zA-Z0-9._-]+(?:,[ a-zA-Z0-9._-]+)*)\})?([ a-zA-Z0-9._-]*)(\/(?=.))/gsy;

/* MAIN */

//TODO: Account for more things, like classes, ranges, escapes, optionals, etc.

const explodeStart = ( glob: string ): ExplodedStart => {

  let index = 0;
  let length = glob.length;
  let statics: string[] = [];

  while ( index < length ) {

    SIMPLE_RE.lastIndex = index;

    const match = SIMPLE_RE.exec ( glob );

    if ( !match ) break;

    const [_, slash, prefix, multiple, suffix] = match;

    if ( !prefix && !multiple && !suffix ) break;

    const values = multiple ? multiple.split ( ',' ).map ( value => `${slash}${prefix}${value}${suffix}` ) : [`${slash}${prefix}${suffix}`];

    statics = statics.length ? statics.flatMap ( prefix => values.map ( value => `${prefix}/${value}` ) ) : values;
    index = SIMPLE_RE.lastIndex;

  }

  const dynamic = index ? glob.slice ( index ) : glob;

  return { statics, dynamic };

};

/* EXPORT */

export default explodeStart;
