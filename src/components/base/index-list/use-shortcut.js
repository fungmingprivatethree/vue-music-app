import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
    const ANCHOR_HEIGHT = 18
    const scrollRef = ref(null)

    const shortcutList = computed(() => {
        return props.data.map((group) => {
            return group.title
        })
    })

    const touch = {}

    function onShortcutTouchStart(e) {
        // we can store the value to target properties, make use of target object tp get the properties
        // :data-index="index" 將 index 綁定在 target's properties : data-index
        const anchordIndex = parseInt(e.target.dataset.index)
        // make use of betterScroll method : scrollToElement
        // get the related DOM object
        touch.y1 = e.touches[0].pageY
        // we can store the anchordIndex value in touch object. Then, it can be passed to cross function
        touch.anchordIndex = anchordIndex

        scrollTo(anchordIndex)
    }

    function onShortcutTouchMove(e) {
        touch.y2 = e.touches[0].pageY
        const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
        const anchorIndex = touch.anchordIndex + delta

        scrollTo(anchorIndex)
    }

    function scrollTo(index) {
        if (isNaN(index)) {
            return
        }
        // prevent the width is over and throw error : annot read property 'offsetWidth' of undefined
        index = Math.max(0, Math.min(shortcutList.value.length - 1, index))

        const targetEl = groupRef.value.children[index]
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetEl, 0)
    }

    return {
        shortcutList,
        scrollRef,
        onShortcutTouchStart,
        onShortcutTouchMove
    }
}
