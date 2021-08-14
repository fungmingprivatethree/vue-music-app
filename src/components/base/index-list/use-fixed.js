import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed(props) {
    const groupRef = ref(null)
    const listHeights = ref([])
    const scrollY = ref(0) // Y-coordinate when sroll it down
    const currentIndex = ref(0)

    const fixedTitle = computed(() => {
        if (scrollY.value < 0) {
            return ''
        }
        const currentGroup = props.data[currentIndex.value]
        return currentGroup ? currentGroup.title : ''
    })

    watch(() => props.data, async () => {
        // if you write as this, dom haven't changed yet. after nextTick(), dom will change
        await nextTick()
        calculate()
    })

    // keep check the change of y coordinate
    watch(scrollY, (newY) => {
        // Compare the value of newY, it is in which region
        const listHeightsVal = listHeights.value
        for (let i = 0; i < listHeightsVal.length - 1; i++) {
            const heightTop = listHeightsVal[i]
            const heightBottom = listHeightsVal[i + 1]
            if (newY >= heightTop && newY <= heightBottom) {
                currentIndex.value = i // get the title of the region
            }
        }
    })

    function calculate() {
        // need to calcuate the length of List, so need to define the variable in html <>
        // if you want to get the list data, first locate DOM object
        const list = groupRef.value.children
        const listHeightsVal = listHeights.value
        let height = 0 // initial the starting point

        listHeightsVal.length = 0
        listHeightsVal.push(height) // push the starting heigh to list

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightsVal.push(height) // accumulate the height
        }
    }

    function onScroll(pos) {
        scrollY.value = -pos.y // because you scroll down, the coordinate of Y is negative
    }

    return {
        groupRef,
        onScroll,
        fixedTitle
    }
}
