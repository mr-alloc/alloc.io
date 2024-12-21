import {defineStore} from "pinia";
import Image from "@/classes/implement/Image";
import {toMap} from "@/utils/CollectionUtil";

export const usePhotoViewStatusStore = defineStore('photoViewStatus', () => {
    const isPhotoView = ref<boolean>(false)
    const isFullScreen = ref<boolean>(false)
    const images = ref<Map<number, Image>>(new Map<number, Image>())
    const zoom = ref(1)
    const currentIndex = ref(0)

    const maxZoom = 5
    const minZoom = 1

    function load(toBeLoaded: Array<Image>) {
        clear()
        images.value = toMap<number, Image>(toBeLoaded, (e, i) => i + 1)
        images.value.size > 0 && (currentIndex.value = 1)
    }

    function clear() {
        zoom.value = 1
        isFullScreen.value = false
    }

    function open(index: number) {
        if (images.value.size == 0) return
        currentIndex.value = index
        if (isPhotoView.value) {
            return
        }
        isPhotoView.value = true
        const html = document.querySelector('html')!
        html.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
    }

    function close() {
        isPhotoView.value = false
        const html = document.querySelector('html')!
        html.style.overflow = 'unset'
        document.body.style.overflow = 'unset'

    }

    function zoomIn() {
        maxZoom > zoom.value && zoom.value++
    }

    function zoomOut() {
        minZoom < zoom.value && zoom.value--
    }

    function nextImage() {
        hasNext() && currentIndex.value++
    }

    function hasNext() {
        return images.value.size !== 0 && currentIndex.value < images.value.size
    }

    function beforeImage() {
        hasBefore() && currentIndex.value--
    }

    function hasBefore() {
        return images.value.size !== 0 && currentIndex.value > 1
    }

    function current() {
        return images.value.has(currentIndex.value)
            ? images.value.get(currentIndex.value)
            : new Image('https://placehold.co/200x600', '이미지 불러오는 중')
    }

    function imageList() {
        return [...images.value.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([k, v]) => v)
    }

    function activateFullScreen() {
        isFullScreen.value = true
    }

    function inactivateFullScreen() {
        isFullScreen.value = false
    }

    function imageCount() {
        return images.value.size
    }

    return {
        isPhotoView, isFullScreen, currentIndex, zoom, imageList, load, open,
        imageCount,
        close,
        zoomIn,
        zoomOut,
        beforeImage,
        nextImage,
        current,
        hasNext,
        hasBefore,
        activateFullScreen,
        inactivateFullScreen
    }
})
