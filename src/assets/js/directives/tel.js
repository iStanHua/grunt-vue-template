define([
    'vue'
], function (Vue) {
    'use strict';
    Vue.directive('tel', {
        inserted: function (el) {
            el.focus();
        },
        update: function (el, binding, vnode) {
            var _reg = /1(3|4|5|7|8|9)\d{9}/
            if (el.value) {
                if (!_reg.test(el.value)) {
                    el.classList.add('error')
                    el.setAttribute('placeholder', '格式错误')
                }
            }
        }
    });
});