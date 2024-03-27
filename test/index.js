
/* IMPORT */

import {describe} from 'fava';
import {explodeStart, explodeEnd} from '../dist/index.js';

/* MAIN */

describe ( 'Zeptomatch Explode', it => {

  it ( 'can explode at the start', t => {

    t.deepEqual ( explodeStart ( '' ), { statics: [], dynamic: '' } );
    t.deepEqual ( explodeStart ( '*' ), { statics: [], dynamic: '*' } );
    t.deepEqual ( explodeStart ( '**/*' ), { statics: [], dynamic: '**/*' } );
    t.deepEqual ( explodeStart ( 'foo' ), { statics: [], dynamic: 'foo' } );
    t.deepEqual ( explodeStart ( 'foo/' ), { statics: [], dynamic: 'foo/' } );
    t.deepEqual ( explodeStart ( '{foo}' ), { statics: [], dynamic: '{foo}' } );
    t.deepEqual ( explodeStart ( '{foo}/' ), { statics: [], dynamic: '{foo}/' } );
    t.deepEqual ( explodeStart ( '{foo,bar}' ), { statics: [], dynamic: '{foo,bar}' } );
    t.deepEqual ( explodeStart ( 'foo?/bar' ), { statics: [], dynamic: 'foo?/bar' } );
    t.deepEqual ( explodeStart ( '/foo' ), { statics: [], dynamic: '/foo' } );
    t.deepEqual ( explodeStart ( '/foo/bar' ), { statics: ['/foo'], dynamic: 'bar' } );

    t.deepEqual ( explodeStart ( 'foo/bar' ), { statics: ['foo'], dynamic: 'bar' } );
    t.deepEqual ( explodeStart ( 'foo/bar/baz' ), { statics: ['foo/bar'], dynamic: 'baz' } );
    t.deepEqual ( explodeStart ( '/foo/bar/baz' ), { statics: ['/foo/bar'], dynamic: 'baz' } );
    t.deepEqual ( explodeStart ( '{foo}/bar' ), { statics: ['foo'], dynamic: 'bar' } );
    t.deepEqual ( explodeStart ( '{foo,bar}/baz' ), { statics: ['foo', 'bar'], dynamic: 'baz' } );
    t.deepEqual ( explodeStart ( '/{foo,bar}/baz' ), { statics: ['/foo', '/bar'], dynamic: 'baz' } );
    t.deepEqual ( explodeStart ( '{foo,bar}/{baz,qux}/file' ), { statics: ['foo/baz', 'foo/qux', 'bar/baz', 'bar/qux'], dynamic: 'file' } );
    t.deepEqual ( explodeStart ( 'pre/{foo,bar}/post/file' ), { statics: ['pre/foo/post', 'pre/bar/post'], dynamic: 'file' } );

    t.deepEqual ( explodeStart ( 'foo/*' ), { statics: ['foo'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( 'foo/bar/*' ), { statics: ['foo/bar'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( '/foo/bar/*' ), { statics: ['/foo/bar'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( '{foo}/*' ), { statics: ['foo'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( '{foo,bar}/*' ), { statics: ['foo', 'bar'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( '/{foo,bar}/*' ), { statics: ['/foo', '/bar'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( '{foo,bar}/{baz,qux}/*' ), { statics: ['foo/baz', 'foo/qux', 'bar/baz', 'bar/qux'], dynamic: '*' } );
    t.deepEqual ( explodeStart ( 'pre/{foo,bar}/post/*' ), { statics: ['pre/foo/post', 'pre/bar/post'], dynamic: '*' } );

    t.deepEqual ( explodeStart ( '**/foo/*' ), { statics: [], dynamic: '**/foo/*' } );
    t.deepEqual ( explodeStart ( '**/foo/bar/*' ), { statics: [], dynamic: '**/foo/bar/*' } );
    t.deepEqual ( explodeStart ( '**/{foo}/*' ), { statics: [], dynamic: '**/{foo}/*' } );
    t.deepEqual ( explodeStart ( '**/{foo,bar}/*' ), { statics: [], dynamic: '**/{foo,bar}/*' } );
    t.deepEqual ( explodeStart ( '**/{foo,bar}/{baz,qux}/*' ), { statics: [], dynamic: '**/{foo,bar}/{baz,qux}/*' } );
    t.deepEqual ( explodeStart ( '**/pre/{foo,bar}/post/*' ), { statics: [], dynamic: '**/pre/{foo,bar}/post/*' } );

  });

  it ( 'can explode at the end', t => {

    t.deepEqual ( explodeEnd ( '' ), { flexibleStart: false, flexibleEnd: false, statics: [], dynamic: '' } );
    t.deepEqual ( explodeEnd ( 'fo?o' ), { flexibleStart: false, flexibleEnd: false, statics: [], dynamic: 'fo?o' } );
    t.deepEqual ( explodeEnd ( 'foo/' ), { flexibleStart: false, flexibleEnd: false, statics: [], dynamic: 'foo/' } );

    t.deepEqual ( explodeEnd ( '*' ), { flexibleStart: true, flexibleEnd: true, statics: [], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '**' ), { flexibleStart: true, flexibleEnd: true, statics: [], dynamic: '**' } );
    t.deepEqual ( explodeEnd ( '**/*' ), { flexibleStart: true, flexibleEnd: true, statics: [], dynamic: '**/*' } );

    t.deepEqual ( explodeEnd ( 'foo' ), { flexibleStart: false, flexibleEnd: false, statics: ['foo'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*foo' ), { flexibleStart: true, flexibleEnd: false, statics: ['foo'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( 'foo*' ), { flexibleStart: false, flexibleEnd: true, statics: ['foo'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*foo*' ), { flexibleStart: true, flexibleEnd: true, statics: ['foo'], dynamic: '*' } );

    t.deepEqual ( explodeEnd ( '{foo,bar}' ), { flexibleStart: false, flexibleEnd: false, statics: ['foo', 'bar'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*{foo,bar}' ), { flexibleStart: true, flexibleEnd: false, statics: ['foo', 'bar'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '{foo,bar}*' ), { flexibleStart: false, flexibleEnd: true, statics: ['foo', 'bar'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*{foo,bar}*' ), { flexibleStart: true, flexibleEnd: true, statics: ['foo', 'bar'], dynamic: '*' } );

    t.deepEqual ( explodeEnd ( 'pre{foo,bar}' ), { flexibleStart: false, flexibleEnd: false, statics: ['prefoo', 'prebar'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*pre{foo,bar}' ), { flexibleStart: true, flexibleEnd: false, statics: ['prefoo', 'prebar'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( 'pre{foo,bar}*' ), { flexibleStart: false, flexibleEnd: true, statics: ['prefoo', 'prebar'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*pre{foo,bar}*' ), { flexibleStart: true, flexibleEnd: true, statics: ['prefoo', 'prebar'], dynamic: '*' } );

    t.deepEqual ( explodeEnd ( '{foo,bar}post' ), { flexibleStart: false, flexibleEnd: false, statics: ['foopost', 'barpost'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*{foo,bar}post' ), { flexibleStart: true, flexibleEnd: false, statics: ['foopost', 'barpost'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '{foo,bar}post*' ), { flexibleStart: false, flexibleEnd: true, statics: ['foopost', 'barpost'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*{foo,bar}post*' ), { flexibleStart: true, flexibleEnd: true, statics: ['foopost', 'barpost'], dynamic: '*' } );

    t.deepEqual ( explodeEnd ( 'pre{foo,bar}post' ), { flexibleStart: false, flexibleEnd: false, statics: ['prefoopost', 'prebarpost'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*pre{foo,bar}post' ), { flexibleStart: true, flexibleEnd: false, statics: ['prefoopost', 'prebarpost'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( 'pre{foo,bar}post*' ), { flexibleStart: false, flexibleEnd: true, statics: ['prefoopost', 'prebarpost'], dynamic: '*' } );
    t.deepEqual ( explodeEnd ( '*pre{foo,bar}post*' ), { flexibleStart: true, flexibleEnd: true, statics: ['prefoopost', 'prebarpost'], dynamic: '*' } );

    t.deepEqual ( explodeEnd ( '**/foo' ), { flexibleStart: false, flexibleEnd: false, statics: ['foo'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*foo' ), { flexibleStart: true, flexibleEnd: false, statics: ['foo'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/foo*' ), { flexibleStart: false, flexibleEnd: true, statics: ['foo'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*foo*' ), { flexibleStart: true, flexibleEnd: true, statics: ['foo'], dynamic: '**/*' } );

    t.deepEqual ( explodeEnd ( '**/{foo,bar}' ), { flexibleStart: false, flexibleEnd: false, statics: ['foo', 'bar'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*{foo,bar}' ), { flexibleStart: true, flexibleEnd: false, statics: ['foo', 'bar'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/{foo,bar}*' ), { flexibleStart: false, flexibleEnd: true, statics: ['foo', 'bar'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*{foo,bar}*' ), { flexibleStart: true, flexibleEnd: true, statics: ['foo', 'bar'], dynamic: '**/*' } );

    t.deepEqual ( explodeEnd ( '**/pre{foo,bar}' ), { flexibleStart: false, flexibleEnd: false, statics: ['prefoo', 'prebar'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*pre{foo,bar}' ), { flexibleStart: true, flexibleEnd: false, statics: ['prefoo', 'prebar'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/pre{foo,bar}*' ), { flexibleStart: false, flexibleEnd: true, statics: ['prefoo', 'prebar'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*pre{foo,bar}*' ), { flexibleStart: true, flexibleEnd: true, statics: ['prefoo', 'prebar'], dynamic: '**/*' } );

    t.deepEqual ( explodeEnd ( '**/{foo,bar}post' ), { flexibleStart: false, flexibleEnd: false, statics: ['foopost', 'barpost'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*{foo,bar}post' ), { flexibleStart: true, flexibleEnd: false, statics: ['foopost', 'barpost'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/{foo,bar}post*' ), { flexibleStart: false, flexibleEnd: true, statics: ['foopost', 'barpost'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*{foo,bar}post*' ), { flexibleStart: true, flexibleEnd: true, statics: ['foopost', 'barpost'], dynamic: '**/*' } );

    t.deepEqual ( explodeEnd ( '**/pre{foo,bar}post' ), { flexibleStart: false, flexibleEnd: false, statics: ['prefoopost', 'prebarpost'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*pre{foo,bar}post' ), { flexibleStart: true, flexibleEnd: false, statics: ['prefoopost', 'prebarpost'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/pre{foo,bar}post*' ), { flexibleStart: false, flexibleEnd: true, statics: ['prefoopost', 'prebarpost'], dynamic: '**/*' } );
    t.deepEqual ( explodeEnd ( '**/*pre{foo,bar}post*' ), { flexibleStart: true, flexibleEnd: true, statics: ['prefoopost', 'prebarpost'], dynamic: '**/*' } );

  });

});
