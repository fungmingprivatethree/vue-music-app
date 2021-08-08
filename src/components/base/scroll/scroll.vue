<template>
    <div ref="rootRef">
        <slot></slot>
    </div>
</template>

<script>
    import useScroll from './use-scroll'
    import { ref } from 'vue'

    export default {
        name: 'scroll',
        props: {
            click: { // 一些 betterscroll component 中的屬性係有 default 值的，we will use options to represent it in component
                type: Boolean,
                default: true
            }
        },
        setup(props) {
            const rootRef = ref(null)
            const scroll = useScroll(rootRef, props)
            return {
                rootRef,
                scroll
            }
        }
    }
</script>
