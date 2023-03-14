// Types
type KeyOf<T, K =string> = Extract<keyof T, K>;

type RecordOfStringAsKey<T extends string, K> = { [Property in KeyOf<T>]?: K; };
type RecordOfStringAsKeyValueType<T, K> = RecordOfStringAsKey<KeyOf<T>, K>;

// Exports
export {

    KeyOf,

    RecordOfStringAsKey,
    RecordOfStringAsKeyValueType,

};
