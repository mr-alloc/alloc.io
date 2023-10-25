import {defineStore} from "pinia";
import {toKeyMap} from 'utils/settingUtils'
import {Image} from "~/class/implement/Image";

export const usePhotoViewStore = defineStore('photoView', () => {
    const isPhotoView = ref<boolean>(false)
    const images = ref<Map<number, Image>>(new Map())
    const current = ref<Image>(new Image('', '이미지 불러오는 중'))

    function load(toBeLoaded: Array<Image>) {
        images.value = toKeyMap<number, Image>(toBeLoaded, (e, i) => i)
    }

    function open(index: number) {
        if (images.value.size == 0) return
        current.value = images.value.get(index)!
        isPhotoView.value = true
    }

    function close() {
        isPhotoView.value = false
    }

    function hasCurrent(): boolean {
        return current.value !== null
    }

    return {
        isPhotoView,
        current,
        load,
        open,
        close,
        hasCurrent
    }
})
