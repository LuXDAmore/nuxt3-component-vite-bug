// Types
export type callbackEventType = {
    listener?: () => Promise<unknown>,
    error?: () => Promise<unknown>,
};

export type GenericEmptyArrowFunctionType = () => void;
export type GenericEmptyPromiseArrowFunctionType = () => Promise<void>;
