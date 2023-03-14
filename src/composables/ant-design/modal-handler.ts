// Types
import type { GenericEmptyArrowFunctionType, callbackEventType } from '~/types';

// Types
type AntModalHandlerType = {
    onModalSubmit: (
        onCloseModal: GenericEmptyArrowFunctionType,
        toggleModalLoading: GenericEmptyArrowFunctionType,
        callback?: callbackEventType,
    ) => Promise<boolean>
};

// useAntModal
const useAntModal = (): AntModalHandlerType => {

    const onModalSubmit = async(
        onCloseModal: GenericEmptyArrowFunctionType,
        toggleModalLoading: GenericEmptyArrowFunctionType,
        callback?: callbackEventType,
    ): Promise<boolean> => {

        if( ! callback?.listener ) {

            onCloseModal();

            return true;

        }

        try {

            toggleModalLoading();

            await callback.listener();

            onCloseModal();

            return true;

        } catch( exception ) {

            console.error(
                { exception }
            );

            await callback?.error?.();

            return false;

        } finally {

            toggleModalLoading();

        }

    };

    return { onModalSubmit };

};

// Exports
export { useAntModal };
