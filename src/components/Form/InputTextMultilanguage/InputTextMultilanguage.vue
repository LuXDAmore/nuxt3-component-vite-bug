<template>
    <div class="input-text-multilanguage">
        <template v-if="textarea">
            <a-radio-group v-model:value="languageValue">
                <a-radio-button
                    v-for="( { label, value }, index ) in languages"
                    :key="index"
                    :value="value"
                >
                    {{ label }}
                </a-radio-button>
            </a-radio-group>
            <a-textarea
                v-model:value="inputValue[ languageValue ]"
                allow-clear
                :autofocus="autofocus"
                :placeholder="placeholder"
                @change="onInput"
            />
        </template>
        <a-input
            v-else
            v-model:value="inputValue[ languageValue ]"
            allow-clear
            :autofocus="autofocus"
            :placeholder="placeholder"
            @change="onInput"
        >
            <template #addonBefore>
                <a-select
                    v-model:value="languageValue"
                    class="input-text-multilanguage-select"
                    :options="languages"
                />
            </template>
        </a-input>
    </div>
</template>

<script lang="ts">

    // AntDesign - Components
    import { Input, Select, Textarea } from 'ant-design-vue';
    import type { SelectProps } from 'ant-design-vue';

    // Types
    import type { LanguagesToStringType, LanguagesValuesType } from '~/types';
    import { LanguagesType } from '~/types';

    import type { PropType } from 'vue';

    // Built-in
    import {
        defineComponent,
        ref,
        toRefs,
        watch,
    } from '#imports';

    // Component
    export default defineComponent(
        {
            name: 'input-text-multilanguage',
            components: {
                'a-input': Input,
                'a-select': Select,
                'a-textarea': Textarea,
            },
            inheritAttrs: false,
            props: {
                autofocus: {
                    type: Boolean,
                    default: false,
                },
                defaultLang: {
                    type: String as PropType<LanguagesType>,
                    default: LanguagesType.IT,
                },
                en: {
                    type: String,
                    default: '',
                },
                es: {
                    type: String,
                    default: '',
                },
                it: {
                    type: String,
                    default: '',
                },
                placeholder: {
                    type: String,
                    default: '',
                },
                textarea: {
                    type: Boolean,
                    default: false,
                },
            },
            emits: [
                'update:en',
                'update:es',
                'update:it',
            ],
            setup( props, { emit } ) {

                const // Props
                    {
                        en,
                        es,
                        it,
                    } = toRefs( props )
                    // Languages
                    , languageValue = ref<LanguagesToStringType>( props.defaultLang )
                    , inputValue = ref<LanguagesValuesType>(
                        {
                            [ LanguagesType.EN ]: props.en,
                            [ LanguagesType.ES ]: props.es,
                            [ LanguagesType.IT ]: props.it,
                        }
                    )
                    , languages = ref<SelectProps['options']>(
                        [
                            {
                                label: LanguagesType.IT.toUpperCase(),
                                value: LanguagesType.IT,
                            },
                            {
                                label: LanguagesType.EN.toUpperCase(),
                                value: LanguagesType.EN,
                            },
                            {
                                label: LanguagesType.ES.toUpperCase(),
                                value: LanguagesType.ES,
                            },
                        ]
                    )
                    // Events
                    , onInput = ( event: typeof Input[ 'onChange' ] ): void => {

                        emit(
                            `update:${ languageValue.value }`,
                            event.target.value || ''
                        );

                    }
                ;

                watch(
                    [
                        en,
                        it,
                        es,
                    ],
                    (
                        [
                            valueEn,
                            valueIt,
                            valueEs,
                        ]
                    ) => {

                        inputValue.value[ LanguagesType.EN ] = valueEn;
                        inputValue.value[ LanguagesType.ES ] = valueEs;
                        inputValue.value[ LanguagesType.IT ] = valueIt;

                    }
                );

                return {

                    inputValue,

                    languageValue,
                    languages,

                    onInput,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./InputTextMultilanguage.scss"
></style>
