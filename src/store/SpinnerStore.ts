import { defineStore } from 'pinia'

export const useSpinnerStore = defineStore('spinnerSwitch', () => {
    const isOn = ref(false)

    function on() {
        isOn.value = true
    }
    function off() {
        isOn.value = false
    }

    return { isOn, on, off }
})
