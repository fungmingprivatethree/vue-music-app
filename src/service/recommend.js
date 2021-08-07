import { get } from './base'
// Recommand Component : get the scroll picture by our def get function

export function getRecommend() {
    return get('/api/getRecommend')
}
