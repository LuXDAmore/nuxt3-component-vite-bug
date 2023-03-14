<template>
    <div class="layout">
        <a-config-provider :form="{ validateMessages: FORM_VALIDATION_MESSAGES_TRANSLATED }" :locale="locale">
            <a-layout class="layout__ant-wrapper">

                <a-layout-header class="header">
                    <a-row
                        align="middle"
                        justify="start"
                    >

                        <a-col>
                            <a-button
                                size="large"
                                type="link"
                                @click="toggleIsCollapsed"
                            >
                                <template #icon>
                                    <menu-outlined />
                                </template>
                            </a-button>
                        </a-col>

                        <a-col v-if="pageTitle">
                            <nuxt-link
                                exact
                                to="/"
                            >
                                <a-typography-title
                                    class="title"
                                    :level="4"
                                    strong
                                >
                                    {{ pageTitle }}
                                </a-typography-title>
                            </nuxt-link>
                        </a-col>

                    </a-row>
                </a-layout-header>

                <a-layout has-sider>

                    <a-layout-sider
                        v-model:collapsed="isCollapsed"
                        class="sidebar"
                        collapsed-width="0"
                        collapsible
                        default-collapsed
                        :trigger="null"
                        width="15%"
                    >
                        <nav class="sidebar-navigation">
                            <a-menu mode="vertical">

                                <a-menu-item
                                    key="empty"
                                    class="sidebar-navigation__empty"
                                    :selectable="false"
                                />

                                <a-menu-item v-for="item in sidebarMenu" :key="item.key">
                                    <nuxt-link
                                        exact
                                        :to="item.slug"
                                        @click="toggleIsCollapsed"
                                    >
                                        {{ item.label }}
                                    </nuxt-link>
                                </a-menu-item>

                            </a-menu>
                        </nav>
                    </a-layout-sider>
                    <a-layout-content>

                        <slot />

                    </a-layout-content>

                </a-layout>

            </a-layout>
        </a-config-provider>
    </div>
</template>

<script lang="ts">

    // AntDesign - Icons
    import { MenuOutlined } from '@ant-design/icons-vue';

    // AntDesign - Components
    import {
        Button,
        Col,
        ConfigProvider,
        Layout,
        LayoutContent,
        LayoutHeader,
        LayoutSider,
        Menu,
        MenuItem,
        Row,
        TypographyTitle,
    } from 'ant-design-vue';

    // AntDesign - Configuration
    import itIT from 'ant-design-vue/es/locale/it_IT';

    import { locale } from 'dayjs';
    import 'dayjs/locale/it'; // eslint-disable-line import/no-unassigned-import

    // Built-in
    import {
        defineComponent,
        ref,
        useRuntimeConfig,
    } from '#imports';

    // Constants
    import { FORM_VALIDATION_MESSAGES_TRANSLATED } from '~/constants';

    // UseStore
    import { useCssStore } from '~/store';

    // Config
    locale( 'it' );

    // Layout
    export default defineComponent(
        {
            name: 'default',
            components: {
                // Component
                'a-button': Button,
                'a-col': Col,
                'a-config-provider': ConfigProvider,
                'a-layout': Layout,
                'a-layout-content': LayoutContent,
                'a-layout-header': LayoutHeader,
                'a-layout-sider': LayoutSider,
                'a-menu': Menu,
                'a-menu-item': MenuItem,
                'a-row': Row,
                'a-typography-title': TypographyTitle,
                // Icons
                'menu-outlined': MenuOutlined,
            },
            setup() {

                // Define AntVars
                const locale = itIT
                      // CSS
                      , { variables: cssVariables } = useCssStore()
                      , primaryColor = cssVariables[ 'color-primary' ]
                      // Define Vars
                      , { application } = useRuntimeConfig()
                      , pageTitle = application?.meta?.title || ''
                      , isCollapsed = ref<boolean>( true )
                      , sidebarMenu = [
                          {
                              key: 'affidamenti',
                              label: 'Affidamenti',
                              slug: '/affidamenti',
                          },
                          {
                              key: 'lotti',
                              label: 'Lotti',
                              slug: '/lotti',
                          },
                          {
                              key: 'anagrafica',
                              label: 'Anagrafica',
                              slug: '/anagrafica',
                          },
                      ]
                ;

                // Colors
                ConfigProvider.config(
                    { theme: { primaryColor } },
                );

                /**
                 *
                 */
                function toggleIsCollapsed(): void {

                    isCollapsed.value = ! isCollapsed.value;

                }

                return {

                    FORM_VALIDATION_MESSAGES_TRANSLATED,

                    isCollapsed,
                    locale,
                    pageTitle,
                    sidebarMenu,
                    toggleIsCollapsed,

                };

            },
        }
    );

</script>

<style src="ant-design-vue/dist/antd.variable.min.css"></style>

<style
    lang="scss"
    src="./default.global.scss"
></style>

<style
    scoped
    lang="scss"
    src="./default.scss"
></style>
