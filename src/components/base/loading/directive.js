import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'

const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(Loading) // Loading 這個 <loading></loading> 標簽，係根節點
        const instance = app.mount(document.createElement('div'))
        el.instance = instance
        const title = binding.arg
        if (typeof title !== 'undefined') {
            instance.setTitle(title)
        }
        if (binding.value) {
            append(el)
        }
    },
    updated(el, binding) {
        const title = binding.arg
        if (typeof title !== 'undefined') {
            el.instance.setTitle(title)
        }
        if (binding.value !== binding.oldValue) { // e.g. 上面 mounted 中的 binding.value 係 true 和以前不同了，一定需要做一些添加或移除操作
            binding.value ? append(el) : remove(el) // binding.value 現在為 true 就 append, 現在的值為 false 就 remove
        }
    }
}

function append(el) {
    const style = getComputedStyle(el)
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) { // 不要這 3 個其中一個的，就要幫佢地加上。position: relative;
        addClass(el, relativeCls)
    }
    el.appendChild(el.instance.$el) // $el element value
}

function remove(el) {
    removeClass(el, relativeCls)
    el.removeChild(el.instance.$el)
}

export default loadingDirective
