requirejs.config({
    baseUrl: '/assets/js/',
    paths: {
        vue: 'lib/vue',
        axios: 'lib/axios',
        jweixin: 'lib/jweixin-1.0.0',
        base: 'common/base'
    },
    shim: {
        'base': {
            exports: 'base'
        }
    },
    urlArgs: 'v=201708141045'
});