import {shallowRef, triggerRef} from 'vue'
import {produce} from "immer"

type Setter<T> = (v: T | ((prev: T) => T | void)) => T;
type Options = { equals?: boolean };
type Signal<T> = [get: Accessor<T>, set: Setter<T>];
type Accessor<T> = () => T;

export function createSignal<T>(initialValue?: T, options?: Options): Signal<T> {
    const r = shallowRef(initialValue)
    const getter: Accessor<T> = () => r.value
    const setter: Setter<T> = (v: unknown) => {
        r.value = typeof v === 'function' ? produce<T>(r.value, v) : v
        if (options?.equals === false) triggerRef(r)
        return r.value;
    }
    return [getter, setter]
}
