
/* MAIN */

type ExplodedStart = {
  statics: string[],
  dynamic: string
};

type ExplodedEnd = {
  flexibleStart: boolean,
  flexibleEnd: boolean,
  statics: string[],
  dynamic: string
};

/* EXPORT */

export type {ExplodedStart, ExplodedEnd};
