import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
    const scrollRef = ref(null)

    const shortcutList = computed(() => {
        return props.data.map((group) => {
            return group.title
        })
    })

    function onShortcutTouchStart(e) {
        // we can store the value to target properties, make use of target object tp get the properties
        // :data-index="index" 將 index 綁定在 target's properties : data-index
        const anchordIndex = parseInt(e.target.dataset.index)
        // make use of betterScroll method : scrollToElement
        // get the related DOM object
        const targetEl = groupRef.value.children[anchordIndex]
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetEl, 0)
    }

    function onShortcutTouchMove(e) {

    }

    return {
        shortcutList,
        scrollRef,
        onShortcutTouchStart,
        onShortcutTouchMove
    }
}
