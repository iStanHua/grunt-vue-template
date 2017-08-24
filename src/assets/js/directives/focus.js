define([
    'vue'
], function (Vue) {
    'use strict';
    Vue.directive('focus', {
        // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
        bind: function (el, binding, vnode) {
            var s = JSON.stringify
            el.innerHTML =
                'name: ' + s(binding.name) + '<br>' +
                'value: ' + s(binding.value) + '<br>' +
                'expression: ' + s(binding.expression) + '<br>' +
                'argument: ' + s(binding.arg) + '<br>' +
                'modifiers: ' + s(binding.modifiers) + '<br>' +
                'vnode keys: ' + Object.keys(vnode).join(', ')
        },
        // 当绑定元素插入到 DOM 中。
        inserted: function (el) {
            el.focus();
        },
        // 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前
        update: function (el, binding, vnode, oldVnode) {

        },
        // 所在组件的 VNode 及其孩子的 VNode 全部更新时调用
        componentUpdated: function (el, binding, vnode, oldVnode) {

        },
        // 只调用一次， 指令与元素解绑时调用
        unbind: function (el) {

        }
    });
});