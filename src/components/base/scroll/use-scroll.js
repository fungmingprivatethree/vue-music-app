import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)

// options is represent to scroll.vue props parameter
export default function useScroll(wrapperRef, options, emit) {
    const scroll = ref(null)

    onMounted(() => {
        const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
            observeDOM: true,
            ...options
        })

        if (options.probeType > 0) {
            scrollVal.on('scroll', (pos) => {
                // how to cross components to pass this positon value to other components ? we can make use of "emit"!!!
                emit('scroll', pos) // use emit to release the variable to cross component
            })
        }
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })
    return scroll
}
