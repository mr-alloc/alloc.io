export function  toMap<K, T>(list: Array<T>, keyMapper: (element: T, index: number) => K): Map<K, T> {
    const map = new Map<K, T>();
    for (let i = 0;i < list.length;i++) {
        const key: K = keyMapper(list[i], i);
        if (map.has(key)) {
            throw Promise.reject(`Can\'t Mapped by duplicated key '${key}'`);
        }
        map.set(key, list[i]);
    }
    return map;
}
export function grouping<K, T>(list: Array<T>, keyMapper: (t: T) => K): Map<K, Array<T>> {
    const map = new Map<K, Array<T>>();
    list.forEach(item => {
        const keyValue = keyMapper(item);
        if (!map.has(keyValue)) {
            map.set(keyValue, []);
        }
        map.get(keyValue)?.push(item);
    });
    return map;
}

export function groupingAndThen<T, K, R>(collection: T[], keyMapper: (t: T) => K, finisher: (grouped: Array<T>) => R): Map<K, R> {
    const group = new Map<K, Array<T>>();
    collection.forEach((t) => {
        const key = keyMapper(t);
        if (!group.has(key)) {
            group.set(key, []);
        }
        group.get(key)?.push(t);
    });

    const result = new Map<K, R>();
    group.forEach((value, key) => {
        result.set(key, finisher(value));
    });
    return result;
}

export function toValueMap<T, K, V>(
    contents: T[],
    keyMapper: (content: T) => K,
    valueMapper: (content: T, index: number) => V
): Map<K, V> {
    const map = new Map<K, V>()
    for (let i = 0;i < contents.length;i++) {
        const key: K = keyMapper(contents[i])
        if (map.has(key)) {
            throw Promise.reject(`Can\'t Mapped by duplicated key '${key}'`)
        }
        map.set(key, valueMapper(contents[i], i))
    }
    return map
}
