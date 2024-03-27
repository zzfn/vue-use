import { shallowRef } from 'vue'

export function signal(initialValue) {
    const r = shallowRef(value)
    const get = () => r.value
    const set = (v) => {
        r.value = typeof v === 'function' ? v(r.value) : v
        if (options?.equals === false) triggerRef(r)
    }
    return [get, set]
}
