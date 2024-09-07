export default {
    toMap<K, T>(list: Array<T>, keyMapper: (t: T) => K): Map<K, T> {
        const map = new Map<K, T>();
        list.forEach(item => {
            const keyValue = keyMapper(item);
            map.set(keyValue, item);
        });
        return map;
    },
    grouping<K, T>(list: Array<T>, keyMapper: (t: T) => K): Map<K, Array<T>> {
        const map = new Map<K, Array<T>>();
        list.forEach(item => {
            const keyValue = keyMapper(item);
            if (!map.has(keyValue)) {
                map.set(keyValue, []);
            }
            map.get(keyValue)?.push(item);
        });
        return map;
    },
    convertList<T>(list: Array<any>, converter: (item: any) => T): Array<T> {
        if (!list || list.length === 0) return [];
        return list.map(converter);
    },
    groupingAndThen<T, K, R>(collection: T[], keyMapper: (t: T) => K, finisher: (grouped: Array<T>) => R): Map<K, R> {
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
}
