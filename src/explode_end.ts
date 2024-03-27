
/* IMPORT */

import type {ExplodedEnd} from './types';

/* HELPERS */

const SIMPLE_RE = /(^|\/)(\*?)([ a-zA-Z0-9._-]*)(?:\{([ a-zA-Z0-9._-]+(?:,[ a-zA-Z0-9._-]+)*)\})?([ a-zA-Z0-9._-]*)(\*?)$/;

/* MAIN */

//TODO: Account for more things, like classes, ranges, escapes, optionals, etc.

const explodeEnd = ( glob: string ): ExplodedEnd => {

  const match = SIMPLE_RE.exec ( glob );

  if ( match ) {

    const [_, slash, starStart, prefix, multiple, suffix, starEnd] = match;

    if ( prefix || multiple || suffix ) {

      const flexibleStart = !!starStart;
      const flexibleEnd = !!starEnd;
      const statics = multiple ? multiple.split ( ',' ).map ( value => `${prefix}${value}${suffix}` ) : [`${prefix}${suffix}`];

      const head = glob.slice ( 0, match.index );
      const dynamic = head ? `${head}/*` : '*';

      return { flexibleStart, flexibleEnd, statics, dynamic };

    } else if ( starStart || starEnd ) {

      const flexibleStart = true;
      const flexibleEnd = true;
      const statics: string[] = [];
      const dynamic = glob;

      return { flexibleStart, flexibleEnd, statics, dynamic };

    }

  }

  return { flexibleStart: false, flexibleEnd: false, statics: [], dynamic: glob };

};

/* EXPORT */

export default explodeEnd;
