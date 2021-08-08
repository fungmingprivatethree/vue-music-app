import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './components/base/loading/directive'

// import global template
import '@/assets/scss/index.scss'

// global register LazyPlugin in our project
// global import loadingDirective components
createApp(App).use(store).use(router).use(lazyPlugin, {
    loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).mount('#app')
