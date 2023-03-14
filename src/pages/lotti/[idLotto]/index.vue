<template>
    <div class="page single-lot">

        <div v-if="isPageLoading" class="loading">
            Loading ...
        </div>

        <template v-else>
            <!-- TODO: Da finire il form quando sono chiari i campi -->
            <a-form
                id="editSidebarFormData"
                class="single-lot__main-form"
                :label-col="{ span: 8 }"
                layout="horizontal"
                :model="single"
                @submit.prevent="() => updateLotDetails()"
            >

                <a-layout has-sider>

                    <a-layout-sider
                        class="p--16-24"
                        :collapsed-width="0"
                        :trigger="null"
                        width="40%"
                    >

                        <a-row align="middle" :wrap="false">

                            <nuxt-link to="/lotti">

                                <left-outlined :style="{ fontSize: '1.36rem' }" />

                            </nuxt-link>

                            <span class="spacer" />

                            <a-button
                                class="text--primary"
                                type="text"
                                @click="isModalEditStatusOpened = ! isModalEditStatusOpened"
                            >

                                <template #icon>
                                    <form-outlined />
                                </template>

                                Modifica stato

                            </a-button>

                            <a-button
                                :disabled="!isSidebarFormDataModified"
                                html-type="submit"
                                :loading="loading"
                                type="primary"
                            >

                                <template #icon>
                                    <save-outlined />
                                </template>

                                Salva

                            </a-button>

                            <a-dropdown>
                                <a-button
                                    class="text--primary"
                                    title="Actions"
                                    type="text"
                                    @click.prevent
                                >

                                    <template #icon>
                                        <more-outlined />
                                    </template>

                                </a-button>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>
                                            <a-button
                                                class="text--primary"
                                                title="Actions"
                                                type="text"
                                            >

                                                <template #icon>
                                                    <copy-outlined />
                                                </template>

                                                Duplica lotto

                                            </a-button>
                                        </a-menu-item>
                                        <a-menu-item>
                                            <a-button
                                                class="text--primary"
                                                title="Actions"
                                                type="text"
                                            >

                                                <template #icon>
                                                    <delete-outlined />
                                                </template>

                                                Elimina lotto

                                            </a-button>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>

                        </a-row>

                        <br>

                        {{ single.codiceLotto }}

                        <!-- TODO: Da finire il form quando sono chiari i campi -->
                        <a-form-item v-if="single.nomeLotto" has-feedback>
                            <input-text-multilanguage
                                v-model:en="editSidebarFormData.nomeLotto.en"
                                v-model:es="editSidebarFormData.nomeLotto.es"
                                v-model:it="editSidebarFormData.nomeLotto.it"
                                placeholder="Nome"
                                size="small"
                            />
                        </a-form-item>

                        <a-row style="padding: 10px 0">
                            <a-col :span="12">
                                <span
                                    v-for="stato in LOT_STATUS_OPTIONS"
                                    :key="stato.value"
                                >
                                    <a-tag
                                        v-if="single.statoLotto === stato.value"
                                        :color="stato.color"
                                    >
                                        {{ stato.label }}
                                    </a-tag>
                                </span>
                            </a-col>
                            <a-col :span="12" style="text-align: right">
                                Completato
                                <a-switch
                                    v-model:checked="editSidebarFormData.livelloCompletamento"
                                    :checked-value="LotsCompletionEnum.FULL"
                                    size="small"
                                    :un-checked-value="LotsCompletionEnum.LIGHT"
                                />
                            </a-col>
                        </a-row>

                        <a-divider
                            class="opacity--0"
                            style="margin:12px 0"
                        />

                        <a-form-item
                            has-feedback
                            label="Affidamento"
                        >
                            <select-credit-lines
                                v-model:value="editSidebarFormData.idAffidamento"
                                :default-options="[{
                                    codiceAffidamento: single.codiceAffidamento,
                                    idAffidamento: single.idAffidamento || ''
                                }]"
                                show-preview-link
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            v-if="single.dataAffido"
                            label="Data affido"
                        >
                            {{ new Date( single.dataAffido ).toLocaleDateString( 'it-IT' ) }}
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Categoria"
                        >
                            <select-category-tree
                                v-model:value="editSidebarFormData.idNanoCategoria"
                                size="small"
                            />
                        </a-form-item>

                        <a-divider />

                        <a-form-item
                            has-feedback
                            label="Tribunale"
                        >
                            <select-tribunals
                                v-model:value="editSidebarFormData.idTribunale"
                                :default-options="[{
                                    idTribunale: single.idTribunale,
                                    nomeTribunale: single.nomeTribunale
                                }]"
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Tag"
                        >
                            <select-tag-lots
                                v-model:value="editSidebarFormData.listaIdTag"
                                :default-options="single.listaTag"
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            v-if="single.sorgente"
                            label="Sorgente"
                        >
                            {{ single.sorgente }}
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Affidamenti aggiuntivi"
                        >
                            <select-credit-lines
                                v-model:value="editSidebarFormData.idAffidamentiAggiuntivi"
                                :default-options="single.affidamentiAggiuntivi"
                                mode="multiple"
                                :omit-options="editSidebarFormData.idAffidamento"
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Dimensione"
                        >
                            <select-filter
                                v-model:value="editSidebarFormData.dimensione"
                                :options="LOT_DIMENSIONS_OPTIONS"
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Salesman"
                        >
                            <a-input
                                v-model:value="editSidebarFormData.idSalesman"
                                disabled
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Asset manager"
                        >
                            <a-input
                                v-model:value="editSidebarFormData.idAssetManagerMandante"
                                disabled
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Referente proprietà"
                        >
                            <a-input
                                v-model:value="editSidebarFormData.idReferentePropMandante"
                                disabled
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="Gestore broker"
                        >
                            <a-input
                                v-model:value="editSidebarFormData.idGestoreBroker"
                                disabled
                                size="small"
                            />
                        </a-form-item>

                        <a-form-item
                            has-feedback
                            label="ID lotto"
                        >
                            <a-input
                                v-model:value="editSidebarFormData.idEsternoLotto"
                                size="small"
                            />
                        </a-form-item>

                    </a-layout-sider>

                    <a-layout>
                        <a-layout-content>

                            <a-tabs
                                v-model:activeKey="activeTab"
                                class="p--16-24"
                                type="card"
                                @change="onTabChanged"
                            >

                                <a-tab-pane key="dati" tab="Dati">
                                    <!-- ? Questo per mantenere Ant con le sue classi nei form -->
                                    <div class="ant-form-vertical h--full">
                                        <p v-if="isDraftStatus">
                                            Il lotto è in stato di Bozza.<br>
                                            Modificare lo stato per visualizzare i dati
                                        </p>
                                        <a-tabs
                                            v-else
                                            v-model:activeKey="activeTabDati"
                                            tab-position="left"
                                            @change="onTabChanged"
                                        >

                                            <a-tab-pane key="caratteristiche" tab="Caratteristiche">
                                                <a-form-item label="Dettagli lotto">
                                                    <a-textarea autofocus size="small" />
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Stato occupazionale">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Locali">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Piani ingresso">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Piani totali edificio">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Ingresso">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_ENTRANCE_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Tipo di cucina">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="N. Bagni">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="N. Camere da letto">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="N. Terrazzi">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="6">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="N. Balconi">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Pavimentazione prevalente">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Pavimentazione prevalente zona giorno">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Pavimentazione prevalente zona notte">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Cancello carrabile">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_GATE_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Cancello carrabile dimensioni">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Cancello pedonale">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_GATE_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Cancello pedonale dimensioni">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryProduttivo" label="Altezza libera interna">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Altezza massima interna">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale" label="Posto auto / garage">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_PARKING_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale">
                                                            <a-checkbox>Giardino comune</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale">
                                                            <a-checkbox>Giardino privato</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni">
                                                            <a-checkbox>Ascensore</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isNanoCategoryResidenziale">
                                                            <a-checkbox>Cantina</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item v-if="isAssetCategoryImmobiliare">
                                                    <a-checkbox>Parcheggio privato</a-checkbox>
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Altri servizi accessori">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_EXTRA_SERVICES_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                            </a-tab-pane>

                                            <a-tab-pane key="storico-e-conformità" tab="Storico e conformità">
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="8">
                                                        <a-form-item v-if="! isNanoCategoryTerreni" label="Anno di costruzione">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="16">
                                                        <a-form-item v-if="! isNanoCategoryTerreni" label="Anno di ristrutturazione">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Tipo di costruzione">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item>
                                                    <a-checkbox v-if="isAssetCategoryImmobiliare">
                                                        Conformità catastale
                                                    </a-checkbox>
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Costo per aggiornamento catastale">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Tempi aggiornamento catastale">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item v-if="isAssetCategoryImmobiliare" label="Note conformità catastale">
                                                    <a-textarea size="small" />
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Costo stimato per sanatoria">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Costo per sanatoria">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Tempi sanatoria">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item v-if="isAssetCategoryImmobiliare" label="Azioni per sanatoria">
                                                    <a-textarea size="small" />
                                                </a-form-item>
                                                <a-form-item v-if="isAssetCategoryImmobiliare">
                                                    <a-checkbox>Conformità edilizia urbanistica</a-checkbox>
                                                </a-form-item>
                                                <a-form-item v-if="! isNanoCategoryTerreni">
                                                    <a-checkbox v-model:value="datiFormData.difformita">
                                                        Presenza di difformità
                                                    </a-checkbox>
                                                </a-form-item>
                                                <template v-if="datiFormData.difformita">
                                                    <a-form-item label="Difformità Rilevate">
                                                        <a-textarea size="small" />
                                                    </a-form-item>
                                                    <a-form-item label="Difformità Rilevate onsite">
                                                        <a-textarea size="small" />
                                                    </a-form-item>
                                                    <a-form-item label="Danni rilevati">
                                                        <a-textarea size="small" />
                                                    </a-form-item>
                                                </template>
                                            </a-tab-pane>

                                            <a-tab-pane key="stato-manutentivo" tab="Stato manutentivo">
                                                <a-form-item v-if="isAssetCategoryImmobiliare">
                                                    <a-checkbox>Presenza materiale da smaltire</a-checkbox>
                                                </a-form-item>
                                                <a-form-item v-if="isAssetCategoryImmobiliare">
                                                    <a-checkbox>Presenza di amianto /materiali tossici </a-checkbox>
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Costi smaltimento">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item v-if="isAssetCategoryImmobiliare">
                                                    <a-checkbox>Beni mobili inclusi</a-checkbox>
                                                </a-form-item>
                                            </a-tab-pane>

                                            <a-tab-pane key="perizia" tab="Perizia">
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Data perizia">
                                                            <a-date-picker size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item label="Valore perizia">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="8">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Mq perizia">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="16">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Mq superficie commerciale">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                            </a-tab-pane>

                                            <a-tab-pane key="posizione" tab="Posizione">
                                                <a-form-item label="Indirizzo">
                                                    <a-input size="small" />
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">

                                                    <a-col :span="12">
                                                        <a-form-item label="Stato">
                                                            <a-select
                                                                v-model:value="datiFormData.stato"
                                                                :options="[{ label: 'Italia', value: 'Italia', },{ label: 'Estero', value: 'Estero', }]"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>

                                                    <template v-if="datiFormData.stato === 'Italia'">
                                                        <a-col :span="12">
                                                            <a-form-item label="Città">
                                                                <a-select size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Provincia">
                                                                <a-select size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Regione">
                                                                <a-select size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                    </template>

                                                    <a-col :span="12">
                                                        <a-form-item label="Coordinate Maps">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Qualità posizionale">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_LOCATION_QUALITY_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Esposizione">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_COMPASS_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Contesto">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_CONTEXT_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item>
                                                    <a-checkbox>Cartello apposto</a-checkbox>
                                                </a-form-item>
                                            </a-tab-pane>

                                            <a-tab-pane key="caratteristiche-energetiche" tab="Caratteristiche energetiche">
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Riscaldamento">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_HEATING_SYSTEM_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Impianto">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_RIG_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Generatore di calore">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_RIG_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Climatizzazione">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_HEATING_SYSTEM_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare && ! isNanoCategoryTerreni" label="Classe energetica">
                                                            <a-select size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare">
                                                            <a-checkbox>Batteria accumulo</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Capacità batteria">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Presenza APE">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_APE_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Data stima ricezione APE">
                                                            <a-date-picker size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item v-if="isAssetCategoryImmobiliare">
                                                    <a-checkbox>Impianto fotovoltaico</a-checkbox>
                                                </a-form-item>
                                                <a-form-item v-if="isAssetCategoryImmobiliare" label="KW impianto fotovoltaico">
                                                    <a-input-number size="small" />
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare">
                                                            <a-checkbox>Impianto solare termico</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare">
                                                            <a-checkbox>Cappotto termico</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Materiali infissi">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Vetro infissi">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare">
                                                            <a-checkbox>Locale pompe</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare">
                                                            <a-checkbox>Impianto allarme</a-checkbox>
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                            </a-tab-pane>

                                            <a-tab-pane key="info-condominiali" tab="Info condominiali">
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isMicroCategoryResidenzialeDirezionaleOrCommerciale" label="Spese condominiali ordinarie">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isMicroCategoryResidenzialeDirezionaleOrCommerciale" label="Spese condominiali straordinarie">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>

                                                <template v-if="isMicroCategoryResidenzialeDirezionaleOrCommerciale">

                                                    <br>

                                                    <strong>Amministratore condominiale</strong>
                                                    <a-row align="middle" :gutter="[ 24, 0 ]">
                                                        <a-col :span="12">
                                                            <a-form-item label="Nome">
                                                                <a-input size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Cognome">
                                                                <a-input size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Telefono">
                                                                <a-input size="small" type="tel" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Email">
                                                                <a-input size="small" type="email" />
                                                            </a-form-item>
                                                        </a-col>
                                                    </a-row>

                                                </template>

                                            </a-tab-pane>

                                            <a-tab-pane key="accesso-e-ritiro" tab="Accesso e ritiro">
                                                <a-form-item>
                                                    <a-checkbox>Possesso chiavi</a-checkbox>
                                                </a-form-item>
                                                <a-form-item label="Posizione chiavi">
                                                    <a-textarea size="small" />
                                                </a-form-item>
                                                <a-form-item label="Riferimenti per chiavi">
                                                    <a-textarea size="small" />
                                                </a-form-item>
                                                <a-form-item label="Note chiavi">
                                                    <a-textarea size="small" />
                                                </a-form-item>

                                                <template v-if="isAssetCategoryImmobiliare">

                                                    <br>

                                                    <strong>Referente per accesso</strong>
                                                    <a-row align="middle" :gutter="[ 24, 0 ]">
                                                        <a-col :span="12">
                                                            <a-form-item label="Nome">
                                                                <a-input size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Cognome">
                                                                <a-input size="small" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Telefono">
                                                                <a-input size="small" type="tel" />
                                                            </a-form-item>
                                                        </a-col>
                                                        <a-col :span="12">
                                                            <a-form-item label="Email">
                                                                <a-input size="small" type="email" />
                                                            </a-form-item>
                                                        </a-col>
                                                    </a-row>

                                                </template>

                                            </a-tab-pane>

                                            <a-tab-pane key="fiscalità-e-passaggio" tab="Fiscalità e passaggio">
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item label="Aliquota IVA">
                                                            <a-input size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                                <a-form-item label="Note tassazione">
                                                    <a-textarea size="small" />
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item label="Tipologia passaggio proprietà">
                                                            <select-filter
                                                                default-option-label="Scegli"
                                                                :options="LOT_TRANSFER_OWNER_OPTIONS"
                                                                size="small"
                                                            />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                            </a-tab-pane>

                                            <a-tab-pane key="locazione" tab="Locazione">
                                                <a-form-item v-if="isAssetCategoryImmobiliare" label="Informazioni locazione">
                                                    <a-textarea size="small" />
                                                </a-form-item>
                                                <a-row align="middle" :gutter="[ 24, 0 ]">
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Canone mensile">
                                                            <a-input-number size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                    <a-col :span="12">
                                                        <a-form-item v-if="isAssetCategoryImmobiliare" label="Scadenza contratto locazione">
                                                            <a-date-picker size="small" />
                                                        </a-form-item>
                                                    </a-col>
                                                </a-row>
                                            </a-tab-pane>

                                        </a-tabs>
                                    </div>
                                </a-tab-pane>

                                <a-tab-pane key="allegati" tab="Allegati">
                                    <a-table
                                        :columns="tableAllegatiColumns"
                                        :data-source="tableAllegatiRows"
                                        row-key="id"
                                        :show-header="tableAllegatiShowHeader"
                                        size="small"
                                    />
                                </a-tab-pane>

                                <a-tab-pane key="beni" tab="Beni">
                                    <page-layout-table
                                        v-model:isCreateModalOpenedProps="isModalCreateOpened"
                                        bulk-modal-text-button="Modifica beni"
                                        bulk-modal-title="Modifica lotto dei beni"
                                        compact
                                        :create-modal-confirm-button-text="createGoodConfirmButtonText"
                                        create-modal-text-button="Crea bene"
                                        :create-modal-title="createGoodTitleModal"
                                        :is-bulk-modal-enabled="tableGoodsIsRowSelected"
                                        :is-create-modal-form-data-modified="isGoodsFormDataModified"
                                        :is-table-loading="tableGoodsIsLoading"
                                        @click:bulk-modal-button-cancel="() => bulkFormReset()"
                                        @click:create-modal-button-cancel="onHandleCloseCreateModal"
                                    >

                                        <!-- Extra button -->
                                        <template
                                            v-if="tableGoodsIsRowSelected"
                                            #table-operations-right-start
                                        >
                                            <a-button
                                                :loading="tableGoodsIsLoading"
                                                size="small"
                                                type="link"
                                                @click="() => deleteGoods( tableGoodsSelectedRows as LotGoodsItemType['idBene'][] )"
                                            >
                                                <template #icon>
                                                    <delete-outlined />
                                                </template>
                                                Elimina beni
                                            </a-button>
                                        </template>

                                        <!-- Table -->
                                        <a-table
                                            v-if="tableGoodsRows.length"
                                            :columns="tableGoodsColumns"
                                            :data-source="tableGoodsRows"
                                            :loading="tableGoodsIsLoading"
                                            :pagination="tableGoodsPagination"
                                            row-key="idBene"
                                            :row-selection="{
                                                onChange: tableGoodsOnRowSelection,
                                                selectedRowKeys: tableGoodsSelectedRows,
                                            }"
                                            :show-header="tableGoodsIsShowColumnHeader"
                                            size="small"
                                            @change="tableGoodsOnChange"
                                        >
                                            <template #bodyCell="{ column, record }">

                                                <span
                                                    v-if="column.dataIndex === 'nomeBene'"
                                                >
                                                    <a-button
                                                        size="small"
                                                        type="link"
                                                        @click="() => onOpenCreateModal( record.idBene )"
                                                    >
                                                        {{ record.nomeBene }}
                                                    </a-button>
                                                </span>

                                                <a-button
                                                    v-if="column.dataIndex === 'actions'"
                                                    size="small"
                                                    title="Actions"
                                                    type="text"
                                                >

                                                    <a-dropdown :trigger="['click']">

                                                        <more-outlined />

                                                        <template #overlay>
                                                            <a-menu>
                                                                <a-menu-item>
                                                                    <a-button
                                                                        title="Duplica"
                                                                        type="link"
                                                                        @click="() => duplicateGood( record.idBene )"
                                                                    >

                                                                        <template #icon>
                                                                            <copy-outlined />
                                                                        </template>

                                                                        Duplica bene

                                                                    </a-button>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <a-button
                                                                        title="Elimina"
                                                                        type="link"
                                                                        @click="() => deleteGoods( [ record.idBene ] )"
                                                                    >

                                                                        <template #icon>
                                                                            <delete-outlined />
                                                                        </template>

                                                                        Elimina bene

                                                                    </a-button>
                                                                </a-menu-item>
                                                            </a-menu>
                                                        </template>
                                                    </a-dropdown>

                                                </a-button>

                                            </template>
                                        </a-table>
                                        <div v-else>
                                            Non ci sono beni assegnati a questo lotto.
                                        </div>

                                        <!-- Create Form -->
                                        <template #create-modal-form="{ createModalFormName, onHandleCreateFormSubmit } : { createModalFormName: string, onHandleCreateFormSubmit: Function }">
                                            <goods-single-form
                                                :create-modal-form-name="createModalFormName"
                                                :id-bene="idBeneEdit"
                                                :id-lotto="idLotto"
                                                :is-goods-modal-open="isModalCreateOpened"
                                                :on-handle-create-form-submit="onHandleCreateFormSubmit"
                                                :stato-lotto="single.statoLotto"
                                                @form:refresh-goods-after-submit="onHandleCloseCreateModal"
                                                @is-goods-form-data-modified="value => isGoodsFormDataModified = value"
                                                @nome-bene="value => nomeBeneEdit = value"
                                            />
                                        </template>

                                        <!-- Bulk operation -->
                                        <template #bulk-modal-form="{ bulkModalFormName, onHandleBulkFormSubmit } : { bulkModalFormName: string, onHandleBulkFormSubmit: Function }">
                                            <a-form
                                                :id="bulkModalFormName"
                                                layout="vertical"
                                                :model="bulkFormData"
                                                @submit.prevent="() => onHandleBulkFormSubmit(
                                                    {
                                                        listener: bulkFormOnSubmit,
                                                    }
                                                )"
                                            >
                                                <p>
                                                    Associa i beni selezionati al lotto scelto.
                                                </p>

                                                <a-form-item
                                                    has-feedback
                                                    label="Cerca lotto"
                                                    :rules="bulkFormDataRules.idLottoDestinazione"
                                                    v-bind="bulkFormDataValidated.idLottoDestinazione"
                                                >
                                                    <select-lots
                                                        v-model:value="bulkFormData.idLottoDestinazione"
                                                        :omit-options="idLotto"
                                                        show-preview-link
                                                    />
                                                </a-form-item>

                                            </a-form>
                                        </template>

                                    </page-layout-table>
                                </a-tab-pane>

                                <a-tab-pane key="schede-commerciali" tab="Schede commerciali">
                                    <a-table
                                        :columns="tableSchedeCommercialiColumns"
                                        :data-source="tableSchedeCommercialiRows"
                                        row-key="id"
                                        :show-header="tableSchedeCommercialiShowHeader"
                                        size="small"
                                    />
                                </a-tab-pane>

                            </a-tabs>

                        </a-layout-content>
                    </a-layout>

                </a-layout>

            </a-form>

            <!-- Edit Status - Modal -->
            <a-modal
                v-model:visible="isModalEditStatusOpened"
                centered
                closable
                :keyboard="false"
                :mask-closable="false"
                :ok-button-props="{
                    // @ts-expect-error: This error is reported from AntDesignSystem, not expecting buttons has a form property.
                    form: 'modalFormData',
                    htmlType: 'submit',
                }"
                ok-text="Modifica"
                title="Modifica stato"
                @ok="() => updateLotStatus()"
            >
                <a-form
                    id="modalFormData"
                    layout="vertical"
                    :model="modalFormData"
                    @submit.prevent="() => updateLotStatus()"
                >
                    <a-row :gutter="[ 32, 32 ]">
                        <a-col :span="12">

                            <a-form-item
                                has-feedback
                                label="Seleziona lo stato di destinazione"
                                :rules="modalFormDataRules.statoLotto"
                                v-bind="modalFormDataValidated.statoLotto"
                            >
                                <a-select
                                    v-model:value="modalFormData.statoLotto"
                                    :options="statoDestinazioneOptions"
                                    placeholder="Seleziona stato"
                                    show-search
                                    size="small"
                                    @change="onUpdateStatoDestinazione"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col
                            v-if="modalFormData.statoLotto === LotsStatusEnum.USCITO_DAL_PORTAFOGLIO"
                            :span="12"
                        >
                            <a-form-item
                                has-feedback
                                label="Seleziona la motivazione"
                                :rules="modalFormDataRules.motivazioneStato"
                                v-bind="modalFormDataValidated.motivazioneStato"
                            >
                                <select-filter
                                    v-model:value="modalFormData.motivazioneStato"
                                    no-empty-option
                                    :options="LOT_MOTIVATION_STATUS_OPTIONS"
                                    size="small"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-modal>

        </template>

    </div>
</template>

<script lang="ts">

    // AntDesign - Icons
    import {
        CopyOutlined,
        DeleteOutlined,
        ExclamationCircleOutlined,
        FormOutlined,
        LeftOutlined,
        MoreOutlined,
        SaveOutlined,
    } from '@ant-design/icons-vue';

    // AntDesign - Components
    import {
        Button,
        Col,
        DatePicker,
        Divider,
        Dropdown,
        Form,
        FormItem,
        Input,
        InputNumber,
        Layout,
        LayoutContent,
        LayoutSider,
        Modal,
        Row,
        Select,
        TabPane,
        Tabs,
        Tag,
        Textarea,
        message,
    } from 'ant-design-vue';

    // Third Party
    import isEqual from 'lodash/isEqual';

    // Vue
    import { createVNode } from 'vue';

    import {
        CategoryTreeType,
        FormDataRulesType,
        LotCategoryEnum,
        LotGoodsItemType,
        LotItemType,
        LotStatusTypes,
        LotsCompletionEnum,
        LotsMotivationStatusEnum,
        LotsStatusEnum,
        OptionsApiDataPatchType,
    } from '~/types';

    // Built-in
    import {
        computed,
        defineComponent,
        reactive,
        ref,
        useAntTableFilteringAndSorting,
        useApiDataPatch,
        useLazyAsyncData,
        useRoute,
        useRouter,
        useSingleLotApi,
        useSingleLotSingleGoodApi,
        useSingleLotsGoodsApi,
        watch,
    } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // Custom - Components
    import SelectFilter from '~/components/Filters/SelectFilter/SelectFilter.vue';
    import InputTextMultilanguage from '~/components/Form/InputTextMultilanguage/InputTextMultilanguage.vue';
    import SelectCategoryTree from '~/components/Form/SelectCategoryTree/SelectCategoryTree.vue';
    import SelectCreditLines from '~/components/Form/SelectCreditLines/SelectCreditLines.vue';
    import SelectLots from '~/components/Form/SelectLots/SelectLots.vue';
    import SelectTagLots from '~/components/Form/SelectTagLots/SelectTagLots.vue';
    import SelectTribunals from '~/components/Form/SelectTribunals/SelectTribunals.vue';
    import GoodsSingleForm from '~/components/Goods/GoodsSingleForm.vue';

    // Constants
    import {
        LOT_APE_OPTIONS,
        LOT_COMPASS_OPTIONS,
        LOT_CONTEXT_OPTIONS,
        LOT_DIMENSIONS_OPTIONS,
        LOT_ENERGETIC_CLASS_OPTIONS,
        LOT_ENTRANCE_OPTIONS,
        LOT_EXTRA_SERVICES_OPTIONS,
        LOT_GATE_OPTIONS,
        LOT_HEATING_SYSTEM_OPTIONS,
        LOT_LOCATION_QUALITY_OPTIONS,
        LOT_MOTIVATION_STATUS_OPTIONS,
        LOT_PARKING_OPTIONS,
        LOT_RIG_OPTIONS,
        LOT_STATUS_OPTIONS,
        LOT_TRANSFER_OWNER_OPTIONS,
    } from '~/constants';

    // UseStore
    import { useCategoriesTreeStore } from '~/store';

    // AntDesign - Form utilities
    const useForm = Form.useForm;

    // Page
    export default defineComponent(
        {
            name: 'page-single-lot',
            components: {
                // Ant
                'a-button': Button,
                'a-col': Col,
                'a-date-picker': DatePicker,
                'a-divider': Divider,
                'a-dropdown': Dropdown,
                'a-form': Form,
                'a-form-item': FormItem,
                'a-input': Input,
                'a-input-number': InputNumber,
                'a-layout': Layout,
                'a-layout-content': LayoutContent,
                'a-layout-sider': LayoutSider,
                'a-modal': Modal,
                'a-row': Row,
                'a-select': Select,
                'a-tab-pane': TabPane,
                'a-tabs': Tabs,
                'a-tag': Tag,
                'a-textarea': Textarea,
                // Icons
                'copy-outlined': CopyOutlined,
                'delete-outlined': DeleteOutlined,
                'form-outlined': FormOutlined,
                'input-text-multilanguage': InputTextMultilanguage,
                'left-outlined': LeftOutlined,
                'more-outlined': MoreOutlined,
                'save-outlined': SaveOutlined,
                // Custom - Components
                'goods-single-form': GoodsSingleForm, // eslint-disable-line vue/sort-keys
                'select-category-tree': SelectCategoryTree,
                'select-credit-lines': SelectCreditLines,
                'select-filter': SelectFilter,
                'select-lots': SelectLots,
                'select-tag-lots': SelectTagLots,
                'select-tribunals': SelectTribunals,
            },
            setup() {

                const
                    // Route
                    { params: { idLotto: idLottoParameters }, query: { tabs: queryParameterTab } } = useRoute()
                    , idLotto = Array.isArray( idLottoParameters ) ? idLottoParameters[ 0 ] : idLottoParameters
                    , $router = useRouter()
                    , loading = ref<boolean>( false )
                    // Lot
                    , { pending, data, refresh } = useLazyAsyncData( 'single-lot', () => useSingleLotApi( { id: idLotto } ) )
                    , single = computed<LotItemType>( () => data?.value?.data ?? {} as LotItemType )
                    // Sidebar
                    , sidebarMenuCollapsed = ref<boolean>( false )
                    // Modal
                    , isModalEditStatusOpened = ref<boolean>( false )
                    //   Tabs
                    , [ mainTab, secondaryTab ] = ( ( Array.isArray( queryParameterTab ) ? queryParameterTab?.[ 0 ] : queryParameterTab ) || 'dati,caratteristiche' ).split( ',' )
                    , activeTab = ref<string>( mainTab )
                    , activeTabDati = ref<string>( secondaryTab )
                    , onTabChanged = async(): Promise<void> => {

                        const tabs = (
                            activeTab.value === 'dati'
                                ? [ activeTab.value, activeTabDati.value ].filter( Boolean ).join( ',' )
                                : activeTab.value
                        );

                        tabs && $router.push( { query: { tabs } } );

                        switch( activeTab.value ) {
                            case 'beni': {

                                await goodsRefresh();

                                break;

                            }
                            default:
                        }

                    }
                    //   Tables
                    //   Goods
                    , {
                        refresh: goodsRefresh,
                        tableColumns: tableGoodsColumns,
                        tableHandleReset: tableGoodsHandleReset,
                        tableIsLoading: tableGoodsIsLoading,
                        tableIsShowColumnHeader: tableGoodsIsShowColumnHeader,
                        tableIsRowSelected: tableGoodsIsRowSelected,
                        tableOnChange: tableGoodsOnChange,
                        tableOnRowSelection: tableGoodsOnRowSelection,
                        tablePagination: tableGoodsPagination,
                        tableRows: tableGoodsRows,
                        tableSelectedRows: tableGoodsSelectedRows,
                    } = useAntTableFilteringAndSorting<LotGoodsItemType>(
                        {
                            columns: [
                                {
                                    id: 'codiceBene',
                                    title: 'Codice bene',
                                },
                                {
                                    id: 'nomeBene',
                                    title: 'Nome',
                                },
                                {
                                    id: 'nomeNanoCategoria',
                                    title: 'Categoria',
                                },
                                {
                                    id: 'actions',
                                    sorter: false,
                                    title: '',
                                },
                            ],
                            service: useSingleLotsGoodsApi,
                            serviceConfigurations: { id: idLotto },
                            sorting: { sort_field: 'codiceBene' },
                        }
                    )
                    , idBeneEdit = ref<string>( )
                    , nomeBeneEdit = ref<string>( )
                    , isGoodsFormDataModified = ref<boolean>( true )
                    , createGoodTitleModal = computed( () => ( idBeneEdit.value ? nomeBeneEdit.value : 'Crea bene' ) )
                    , createGoodConfirmButtonText = computed( () => ( idBeneEdit.value ? 'Modifica' : 'Crea' ) )
                    // Attachments
                    , tableAllegatiColumns = ref( [] )
                    , tableAllegatiRows = ref( [] )
                    , tableAllegatiShowHeader = computed<boolean>( () => !! ( tableAllegatiColumns.value.length && tableAllegatiRows.value.length ) )
                    // Schede commerciali
                    , tableSchedeCommercialiColumns = ref( [] )
                    , tableSchedeCommercialiRows = ref( [] )
                    , tableSchedeCommercialiShowHeader = computed<boolean>( () => !! ( tableSchedeCommercialiColumns.value.length && tableSchedeCommercialiRows.value.length ) )
                    // Dati form data
                    , datiFormData = ref<Record<string, string>>( {} )
                    // Modal form data
                    , modalFormData = ref<Pick<LotItemType, 'statoLotto' | 'motivazioneStato'>>( {
                        motivazioneStato: LotsMotivationStatusEnum.NESSUNA_MOTIVAZIONE,
                        statoLotto: undefined,
                    } )
                    , modalFormDataRules = reactive<FormDataRulesType<Pick<LotItemType, 'statoLotto' | 'motivazioneStato'>>>(
                        {
                            motivazioneStato: [
                                {
                                    message: 'Devi selezionare una motivazione valida!',
                                    required: true,
                                    type: 'string',
                                    validator: ( rule, value: LotsMotivationStatusEnum ) => {

                                        if( modalFormData.value.statoLotto === LotsStatusEnum.USCITO_DAL_PORTAFOGLIO && value === LotsMotivationStatusEnum.NESSUNA_MOTIVAZIONE )
                                            return Promise.reject( rule.message );

                                        return Promise.resolve();

                                    },
                                },
                            ],
                            statoLotto: [
                                {
                                    message: 'Campo obbligatorio!',
                                    required: true,
                                    type: 'string',
                                },
                            ],
                        }
                    )
                    , { validate: validateModalFormSubmit, validateInfos: modalFormDataValidated } = useForm( modalFormData, modalFormDataRules )
                    // Edit Form data
                    , editSidebarFormData = ref<LotItemType | Record<string, never>>( { } )
                    , backupSidebarFormData = ref<LotItemType | Record<string, never>>( { } )
                    // TODO: Mancano le rules per i vari form
                    , editSidebarFormDataRules = reactive<FormDataRulesType<LotItemType> | Record<string, never>>( {} )
                    , { validate: validateEditSidebarFormSubmit, validateInfos: editSidebarFormDataValidated } = useForm( editSidebarFormData, editSidebarFormDataRules )
                    , isSidebarFormDataModified = computed<boolean>( () => ( ! isEqual( editSidebarFormData.value, backupSidebarFormData.value ) ) )
                    // New Form data
                    // Stato Destinazione
                    , statoDestinazioneOptions = computed<LotStatusTypes[]>(
                        () => {

                            let availableDestinations: LotStatusTypes['destinations'] = [];
                            const availableOptions: LotStatusTypes[] = [];

                            for( const stato of LOT_STATUS_OPTIONS ) {

                                if( stato.value !== single.value.statoLotto )
                                    continue;

                                availableDestinations = stato.destinations;

                                continue;

                            }

                            for( const stato of LOT_STATUS_OPTIONS ) {

                                if( ! availableDestinations.includes( stato.value ) )
                                    continue;

                                availableOptions.push( stato );
                                continue;

                            }

                            return availableOptions;

                        }
                    )
                    // Form Events
                    , updateLotDetails = async(): Promise<boolean> => {

                        loading.value = true;

                        try {

                            await validateEditSidebarFormSubmit();

                            await useSingleLotApi(
                                {
                                    body: {
                                        ... editSidebarFormData.value,
                                        // ?: Serve per escludere l'affidamento principale dagli affidamenti aggiuntivi
                                        idAffidamentiAggiuntivi: editSidebarFormData.value.idAffidamentiAggiuntivi?.filter( affidamento => affidamento !== editSidebarFormData.value.idAffidamento ),
                                    },
                                    id: idLotto,
                                    method: 'PATCH',
                                }
                            );

                            await refresh();

                            return true;

                        } catch( exception ) {

                            console.error(
                                { exception }
                            );

                            return false;

                        } finally {

                            loading.value = false;

                        }

                    }
                    , updateLotStatus = async(): Promise<boolean> => {

                        loading.value = true;

                        try {

                            await validateModalFormSubmit();

                            await useSingleLotApi(
                                {
                                    body: modalFormData.value,
                                    id: idLotto,
                                    idChild: 'stato',
                                    method: 'PATCH',
                                }
                            );

                            await refresh();

                            isModalEditStatusOpened.value = false;

                            return true;

                        } catch( exception ) {

                            console.error(
                                { exception }
                            );

                            return false;

                        } finally {

                            loading.value = false;

                        }

                    }
                    , onUpdateStatoDestinazione = () => {

                        modalFormData.value.motivazioneStato = LotsMotivationStatusEnum.NESSUNA_MOTIVAZIONE;

                    }
                    , onHandleCloseCreateModal = async() => {

                        idBeneEdit.value = undefined;
                        nomeBeneEdit.value = undefined;

                        await tableGoodsHandleReset();

                    }
                    , isModalCreateOpened = ref<boolean>( false )
                    , onOpenCreateModal = ( id: string ) => {

                        idBeneEdit.value = id;
                        isModalCreateOpened.value = true;

                    }
                    , duplicateGood = ( idBene: LotGoodsItemType['idBene'] ): void => {

                        const except: string[] = [
                            LotsStatusEnum.ATTIVO,
                            LotsStatusEnum.FINALIZZAZIONE_IN_CORSO,
                            LotsStatusEnum.USCITO_DAL_PORTAFOGLIO,
                        ];

                        // Check if valid
                        if( single.value.statoLotto && except.includes( single.value.statoLotto ) ) {

                            message.error( `Impossibile procedere: il lotto è in stato "${ single.value.statoLotto }".` );
                            return;

                        }

                        // Confirm operation
                        Modal.confirm(
                            {
                                cancelText: 'Annulla',
                                content: 'Sei sicuro di voler duplicare questo elemento?',
                                icon: createVNode( ExclamationCircleOutlined ),
                                okText: 'Duplica',
                                async onOk() {

                                    try {

                                        loading.value = true;

                                        // Get the good
                                        const { data } = await useSingleLotSingleGoodApi(
                                            {
                                                id: idLotto,
                                                idChild: idBene,
                                            }
                                        );

                                        if( ! data )
                                            throw new Error();

                                        // Transform data for BE
                                        const single = useApiDataPatch<LotGoodsItemType>(
                                            data,
                                            {
                                                omitKey: [
                                                    'assetClassNanoCategoria',
                                                    'codiceBene',
                                                    'idBene',
                                                    'nomeNanoCategoria',
                                                ],
                                            }
                                        );

                                        // Create
                                        await useSingleLotsGoodsApi(
                                            {
                                                body: single,
                                                id: idLotto,
                                                method: 'POST',
                                            }
                                        );

                                        message.success( 'Bene correttamente duplicato!' );

                                    } catch( exception ) {

                                        console.error( { exception } );

                                        // TODO: La gestione dei messaggi di errore è da implementare
                                        message.error( 'Errore! Non è possibile duplicare questo bene.' );

                                    } finally {

                                        loading.value = false;

                                        await tableGoodsHandleReset();

                                    }

                                },
                                title: 'Attenzione',
                            }
                        );

                    }
                    , deleteGoods = ( goods: LotGoodsItemType['idBene'][] ): void => {

                        const isMulti: boolean = goods.length > 1;

                        Modal.confirm( {
                            cancelText: 'Annulla',
                            content: 'Non puoi annullare questa operazione.',
                            icon: createVNode( ExclamationCircleOutlined ),
                            okText: `Elimina ${ isMulti ? 'gli elementi' : "l'elemento" }`,
                            async onOk() {

                                await useSingleLotSingleGoodApi( {
                                    body: { idBeni: goods },
                                    id: idLotto,
                                    idChild: 'cancella',
                                    method: 'POST',
                                } );

                                await tableGoodsHandleReset();

                            },
                            title: `Sei sicuro di voler eliminare ${ isMulti ? 'questi elementi' : 'questo elemento' }?`,
                        } );

                    }
                    // Store
                    // Categories
                    , categoriesTreeStore = useCategoriesTreeStore()
                    , { getCategoriesTreeItems, getCategoriesParentTree } = categoriesTreeStore
                    , { isLoading: loadingCategoriesTree } = storeToRefs( categoriesTreeStore )
                    // FIXME: Le categorie non hanno il valore SHARED (shared è dentro l'affidamento), ma sono IMMATERIALE per le categorie
                    , lotAssetCategory = ref<CategoryTreeType>( {} )
                    , isAssetCategoryImmobiliare = computed<boolean>( () => ( lotAssetCategory.value?.ASSET_CLASS?.nomeCategoria || '' ).toUpperCase() === LotCategoryEnum.IMMOBILIARE.toUpperCase() )
                    , isAssetCategoryMobiliare = computed<boolean>( () => ( lotAssetCategory.value?.ASSET_CLASS?.nomeCategoria || '' ).toUpperCase() === LotCategoryEnum.MOBILIARE.toUpperCase() )
                    , isAssetCategoryImmateriale = computed<boolean>( () => ( lotAssetCategory.value?.ASSET_CLASS?.nomeCategoria || '' ).toUpperCase() === LotCategoryEnum.IMMATERIALE.toUpperCase() )
                    , isMicroCategoryResidenzialeDirezionaleOrCommerciale = computed<boolean>(
                        () => {

                            const name = ( lotAssetCategory.value?.MICRO?.nomeCategoria || '' ).toUpperCase();

                            return ( name === 'RESIDENZIALE' || name === 'DIREZIONALE ' || name === 'COMMERCIALE' );

                        }
                    )
                    , isNanoCategoryProduttivo = computed<boolean>( () => ( lotAssetCategory.value?.NANO?.nomeCategoria || '' ).toUpperCase() === 'Produttivo'.toUpperCase() )
                    , isNanoCategoryTerreni = computed<boolean>( () => ( lotAssetCategory.value?.NANO?.nomeCategoria || '' ).toUpperCase() === 'Terreni'.toUpperCase() )
                    , isNanoCategoryResidenziale = computed<boolean>( () => ( lotAssetCategory.value?.NANO?.nomeCategoria || '' ).toUpperCase() === 'Residenziale'.toUpperCase() )
                    // Bulk
                    , bulkFormInitialValue: Pick<LotGoodsItemType, 'idLottoDestinazione'> = (
                        { idLottoDestinazione: [] }
                    )
                    , bulkFormData = ref<Pick<LotGoodsItemType, 'idLottoDestinazione'>>(
                        { ... bulkFormInitialValue }
                    )
                    , bulkFormDataRules = reactive<FormDataRulesType<Pick<LotGoodsItemType, 'idLottoDestinazione'>>>(
                        {
                            idLottoDestinazione: [
                                {
                                    message: 'Campo obbligatorio!',
                                    required: true,
                                    trigger: [ 'change', 'blur' ],
                                    type: 'string',
                                },
                            ],
                        }
                    )
                    , { validate: validateBulkFormSubmit, validateInfos: bulkFormDataValidated } = useForm( bulkFormData, bulkFormDataRules )
                    , bulkFormOnSubmit = async() => {

                        await validateBulkFormSubmit();

                        await useSingleLotSingleGoodApi( {
                            body: {
                                ... bulkFormData.value,
                                idBeni: tableGoodsSelectedRows.value,
                            },
                            id: idLotto,
                            idChild: 'sposta',
                            method: 'PATCH',
                        } );

                        bulkFormReset();

                        await tableGoodsHandleReset();

                    }
                    , bulkFormReset = () => {

                        bulkFormData.value = structuredClone( bulkFormInitialValue );

                    }
                    // Tab Dati
                    , isDraftStatus = computed<boolean>( () => !! ( single.value?.statoLotto && single.value.statoLotto === LotsStatusEnum.BOZZA ) )
                    , isPageLoading = computed<boolean>( () => loadingCategoriesTree.value || pending.value )
                ;

                watch(
                    single,
                    async newSingleValue => {

                        const optionsApiData: OptionsApiDataPatchType<LotItemType> = {
                            arrayFields: [
                                {
                                    id: 'idAffidamento',
                                    key: 'affidamentiAggiuntivi',
                                },
                                {
                                    id: 'idTag',
                                    key: 'listaTag',
                                },
                            ],
                            omitKey: [
                                'codiceAffidamento',
                                'codiceLotto',
                                'dataAffido',
                                'idLotto',
                                'motivazioneStato',
                                'nomeAssetManagerMandante',
                                'nomeGestoreBroker',
                                'nomeNanoCategoria',
                                'nomeReferentePropMandante',
                                'nomeSalesman',
                                'nomeTribunale',
                                'sorgente',
                                'statoLotto',
                            ],
                            renamedKey: {
                                affidamentiAggiuntivi: 'idAffidamentiAggiuntivi',
                                listaTag: 'listaIdTag',
                            },
                        };

                        backupSidebarFormData.value = useApiDataPatch<LotItemType>( newSingleValue, optionsApiData );

                        editSidebarFormData.value = {
                            ... backupSidebarFormData.value,
                            infoAggiuntive: { ... backupSidebarFormData.value.infoAggiuntive },
                            nomeLotto: { ... backupSidebarFormData.value.nomeLotto },
                        };
                        modalFormData.value = {
                            motivazioneStato: LotsMotivationStatusEnum.NESSUNA_MOTIVAZIONE,
                            statoLotto: undefined,
                        };

                        if( ! newSingleValue.idNanoCategoria )
                            return;

                        await getCategoriesTreeItems();

                        lotAssetCategory.value = getCategoriesParentTree( { idNanoCategoria: newSingleValue.idNanoCategoria } );

                    }
                );

                // Return
                return {

                    // Const && Enum
                    LOT_APE_OPTIONS,
                    LOT_COMPASS_OPTIONS,
                    LOT_CONTEXT_OPTIONS,
                    LOT_DIMENSIONS_OPTIONS,
                    LOT_ENERGETIC_CLASS_OPTIONS,
                    LOT_ENTRANCE_OPTIONS,
                    LOT_EXTRA_SERVICES_OPTIONS,
                    LOT_GATE_OPTIONS,
                    LOT_HEATING_SYSTEM_OPTIONS,
                    LOT_LOCATION_QUALITY_OPTIONS,
                    LOT_MOTIVATION_STATUS_OPTIONS,
                    LOT_PARKING_OPTIONS,
                    LOT_RIG_OPTIONS,
                    LOT_STATUS_OPTIONS,
                    LOT_TRANSFER_OWNER_OPTIONS,

                    LotsCompletionEnum,
                    LotsStatusEnum,

                    activeTab,
                    activeTabDati,

                    bulkFormData,
                    bulkFormDataRules,
                    bulkFormDataValidated,
                    bulkFormOnSubmit,
                    bulkFormReset,

                    createGoodConfirmButtonText,
                    createGoodTitleModal,

                    datiFormData,

                    deleteGoods,
                    duplicateGood,

                    editSidebarFormData,
                    editSidebarFormDataRules,
                    editSidebarFormDataValidated,

                    idBeneEdit,
                    idLotto,

                    isAssetCategoryImmateriale,
                    isAssetCategoryImmobiliare,
                    isAssetCategoryMobiliare,

                    isDraftStatus,

                    isGoodsFormDataModified,

                    isMicroCategoryResidenzialeDirezionaleOrCommerciale,

                    isModalCreateOpened,
                    isModalEditStatusOpened,

                    isNanoCategoryProduttivo,
                    isNanoCategoryResidenziale,
                    isNanoCategoryTerreni,

                    isPageLoading,
                    isSidebarFormDataModified,

                    loading,
                    lotAssetCategory,
                    modalFormData,
                    modalFormDataRules,
                    modalFormDataValidated,

                    nomeBeneEdit,

                    onHandleCloseCreateModal,
                    onOpenCreateModal,
                    onTabChanged,
                    onUpdateStatoDestinazione,

                    sidebarMenuCollapsed,
                    single,
                    statoDestinazioneOptions,

                    // Attachments
                    tableAllegatiColumns,
                    tableAllegatiRows,
                    tableAllegatiShowHeader,

                    // Goods
                    tableGoodsColumns,
                    tableGoodsHandleReset,
                    tableGoodsIsLoading,
                    tableGoodsIsRowSelected,
                    tableGoodsIsShowColumnHeader,
                    tableGoodsOnChange,
                    tableGoodsOnRowSelection,
                    tableGoodsPagination,
                    tableGoodsRows,
                    tableGoodsSelectedRows,

                    // Schede commerciali
                    tableSchedeCommercialiColumns,
                    tableSchedeCommercialiRows,
                    tableSchedeCommercialiShowHeader,

                    updateLotDetails,
                    updateLotStatus,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./index.scss"
></style>
