import {shallowRef, triggerRef} from 'vue'

type Setter<T> = (v: T | ((prev?: T) => T)) => T;
type Options = { equals?: boolean };
type signal<T> = [get: Accessor<T>, set: Setter<T>];
type Accessor<T> = () => T;

export function createSignal<T>(initialValue: T, options?: Options): signal<T> {
    const r = shallowRef(initialValue)
    const get: Accessor<T> = () => r.value
    const set: Setter<T> = (v) => {
        r.value = typeof v === 'function' ? (v as (prev?: T) => T)(r.value) : v
        // r.value = typeof v === 'function' ? v(r.value) : v
        if (options?.equals === false) triggerRef(r)
        return r.value;
    }
    return [get, set]
}
