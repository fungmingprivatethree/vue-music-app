import { get } from './base'

export function processSongs(songs) {
    if (!songs.length) {
        return Promise.resolve(songs) // if doesn't exist, return back
    }

    return get('/api/getSongsUrl', {
        mid: songs.map((song) => {
            return song.mid
        })
    }).then((result) => {
        const map = result.map
        return songs.map((song) => {
            // 歌曲的数据结构 : is a Map, so we need to match its request
            song.url = map[song.mid]
            return song
        }).filter((song) => {
            return song.url.indexOf('vkey') > -1 // QQ server use -1 to indentify which songs is failed
        })
    })
}
