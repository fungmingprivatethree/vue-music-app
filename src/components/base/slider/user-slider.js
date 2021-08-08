import BScroll from '@better-scroll/core'
import Slider from '@better-scroll/slide'

import { onMounted, onUnmounted, ref } from 'vue'

// register Slider component
BScroll.use(Slider)

export default function useSlider(wrapperRef) {
    // write a logic flow to slider to return the data to frontend
    const slider = ref(null)
    const currentPageIndex = ref(0)

    onMounted(() => {
        // wrapperRef is a DOM object in our frontend
        const sliderVal = slider.value = new BScroll(wrapperRef.value, {
            // BScroll components setting feature reference by Official documentation
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: true
        })

        // use slideWillChange(slide) this function to make it move
        sliderVal.on('slideWillChange', (page) => {
            currentPageIndex.value = page.pageX
        })
    })

    // destroy the Object
    onUnmounted(() => {
        slider.value.destroy()
    })

    // return the result after logic processing to slider.vue to deplay in frontend
    return {
        slider,
        currentPageIndex
    }
}
