import {shallowRef, triggerRef} from 'vue'

type Setter<T> = (v: T | ((prev: T) => T)) => T;
type Options = { equals?: boolean };
type signal<T> = [get: Accessor<T>, set: Setter<T>];
type Accessor<T> = () => T;

export function createSignal<T>(initialValue?: T, options?: Options): signal<T> {
    const r = shallowRef(initialValue)
    const getter: Accessor<T> = () => r.value
    const setter: Setter<T> = (v: unknown) => {
        r.value = typeof v === 'function' ? v(r.value) : v
        if (options?.equals === false) triggerRef(r)
        return r.value;
    }
    return [getter, setter]
}
