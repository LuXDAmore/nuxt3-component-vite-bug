// Ant Types
import type { Rule as AntRule } from 'ant-design-vue/es/form';

import type { KeyOf } from '~/types';

// Type
type FormDataRulesType<T> = Record<KeyOf<T>, AntRule | AntRule[]>;

// Exports
export type {

    FormDataRulesType,

};
