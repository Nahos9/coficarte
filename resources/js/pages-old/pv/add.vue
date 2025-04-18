<!-- eslint-disable camelcase -->
<script setup>
import GuaranteeEdit from '@/views/pv/GuaranteeEdit.vue'

definePage({
  meta: {
    action: 'create',
    subject: 'pv',
  },
})
import { ref } from 'vue'
import { VAlert, VTextarea } from 'vuetify/lib/components/index.mjs';

const router = useRouter()

const pvData = ref({
  committee_id: "",
  committee_date: "",
  caf_id: 12,
  civility: "",
  applicant_first_name: "",
  applicant_last_name: "",
  account_number: "",
  activity: "",
  purpose_of_financing: "",
  type_of_credit_id: 1,
  amount: 15000000,
  duration: 22,
  periodicity: "",
  administrative_fees_percentage: 10,
  taf: 10,
  tax_fee_interest_rate: 14,
  credit_admin_id: 5,
  credit_analyst_id: 2,
  reserve: "",
  entity_name: "",
  release_type: "",
  guarantees: [{
    type_of_guarantee_id: 1,
    comment: "...",
  }]
})

const getResetPvError = () => {
  return {
    committee_id: "",
    committee_date: "",
    caf_id: "",
    civility: "",
    applicant_first_name: "",
    applicant_last_name: "",
    account_number: "",
    activity: "",
    purpose_of_financing: "",
    type_of_credit_id: "",
    amount: "",
    duration: "",
    periodicity: "",
    administrative_fees_percentage: "",
    taf: "",
    tax_fee_interest_rate: "",
    credit_admin_id: "",
    credit_analyst_id: "",
    reserve: "",
    entity_name: "",
    release_type: "",
  }
}

const pvError = ref(getResetPvError())


const civilityItemList = [
  { value: "Mr", title: 'Mr' },
  { value: "Mme", title: 'Mme' },
  { value: "Mlle", title: 'Mlle' },
]

const periodicityItemList = [
  { value: "mensual", title: 'Mensuelle' },
  { value: "quarterly", title: 'Trimestrielle' },
  { value: "semi-annual", title: 'Semestrielle' },
  { value: "annual", title: 'Annuelle' },
  { value: "in-fine", title: 'A la fin' },
]

const {
  data: typeOfCreditListData,
} = await useApi(createUrl('/type-of-credit', {
  query: {
    "paginate": 0,
  },
}))

const typeOfCreditList = computed(() => typeOfCreditListData.value.data)

const {
  data: cafListData,
} = await useApi(createUrl('/user', {
  query: {
    "paginate": 0,
    "profile": "caf",
  },
}))
const cafList = computed(() => cafListData.value.data)

const {
  data: creditAdminListData,
} = await useApi(createUrl('/user', {
  query: {
    "paginate": 0,
    "profile": "credit_admin",
  },
}))
const creditAdminList = computed(() => creditAdminListData.value.data)

const {
  data: creditAnalystListData,
} = await useApi(createUrl('/user', {
  query: {
    "paginate": 0,
    "profile": "credit_analyst",
  },
}))
const creditAnalystList = computed(() => creditAnalystListData.value.data)

const refForm = ref()

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      const res = await $api('/verbal-trial', {
        method: 'POST',
        body: {
          committee_id: pvData.value.committee_id,
          committee_date: pvData.value.committee_date,
          caf_id: pvData.value.caf_id,
          civility: pvData.value.civility,
          applicant_first_name: pvData.value.applicant_first_name,
          applicant_last_name: pvData.value.applicant_last_name,
          account_number: pvData.value.account_number,
          activity: pvData.value.activity,
          purpose_of_financing: pvData.value.purpose_of_financing,
          type_of_credit_id: pvData.value.type_of_credit_id,
          amount: pvData.value.amount,
          duration: pvData.value.duration,
          periodicity: pvData.value.periodicity,
          administrative_fees_percentage: pvData.value.administrative_fees_percentage,
          taf: pvData.value.taf,
          tax_fee_interest_rate: pvData.value.tax_fee_interest_rate,
          guarantees: pvData.value.guarantees,
          credit_admin_id: pvData.value.credit_admin_id,
          credit_analyst_id: pvData.value.credit_analyst_id,
          reserve: pvData.value.reserve,
          release_type: pvData.value.release_type,
          entity_name: pvData.value.entity_name,
        },
      })

      let nextRoute = "/pv";
      pvError.value = getResetPvError()
      if (res.status == 201) {
        pvData.value.guarantees.forEach(guarantee => {
          if (guarantee.type_of_guarantee_id == 9) {
            nextRoute = '/pv/without-notification'
          }
        })
        router.push(nextRoute)
      } else {
        for (const key in res.errors) {
          res.errors[key].forEach(message => {
            pvError.value[key] += message + "\n"
          })
        }
      }
      nextTick(() => {
        // refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const removeGuaranteeItem = id => {
  pvData.value.guarantees.splice(id, 1)
}

const addGuaranteeItem = () => {
  pvData.value.guarantees.push({
    type_of_guarantee_id: 1,
    expiration_date: "",
    value: "",
    comment: "",
  })
}

</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Ajouter un nouveau PV
        </h4>
        <span>Procès verbal pour un nouveau crédit</span>
      </div>
    </div>
    <VForm ref="refForm" @submit.prevent="onSubmit">
      <VRow>
        <VCol md="12">
          <!-- 👉 PV Information -->
          <VCard class="mb-6" title="Information du pv">
            <VCardText>
              <VRow>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.committee_id" :error-messages="pvError.committee_id"
                    label="Numéro du comitée" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppDateTimePicker v-model="pvData.committee_date" :error-messages="pvError.committee_date"
                    label="Date du comitée" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.entity_name" :error-messages="pvError.entity_name"
                    label="Nom de l'entitié" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppAutocomplete v-model="pvData.caf_id" :items="cafList" :error-messages="pvError.caf_id"
                    label="Chargé d'affaire" item-title="full_name" item-value="id" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppAutocomplete v-model="pvData.credit_admin_id" :items="creditAdminList"
                    :error-messages="pvError.credit_admin_id" label="Administrateur Crédit" item-title="full_name"
                    item-value="id" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppAutocomplete v-model="pvData.credit_analyst_id" :items="creditAnalystList"
                    :error-messages="pvError.credit_analyst_id" label="Analyste Crédit" item-title="full_name"
                    item-value="id" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppSelect v-model="pvData.civility" :items="civilityItemList" :error-messages="pvError.civility"
                    label="Civilité" placeholder="Ex: Mr" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.applicant_first_name" :error-messages="pvError.applicant_first_name"
                    label="Prénom du demandeur" placeholder="Ex: Cesar" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.applicant_last_name" :error-messages="pvError.applicant_last_name"
                    label="Nom du demandeur" placeholder="Ex: Endure" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.account_number" :error-messages="pvError.account_number"
                    label="Numéro de compte" placeholder="Ex: 251012345678" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.activity" :error-messages="pvError.activity" label="Activé"
                    placeholder="Ex: Homme d'affaire" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.purpose_of_financing" :error-messages="pvError.purpose_of_financing"
                    label="Objet du financement" placeholder="Ex: Achat nouveau locaux" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppAutocomplete v-model="pvData.type_of_credit_id" :items="typeOfCreditList"
                    :error-messages="pvError.type_of_credit_id" label="Type de credit"
                    placeholder="Ex: Avance sur salaire" item-title="full_name" item-value="id"
                    :rules="[requiredValidator]" />
                </VCol>

                <VCol cols="12" md="6" lg="8">
                  <AppTextField v-model="pvData.amount" type="number" :error-messages="pvError.amount" label="Montant"
                    placeholder="Ex: 15 000 000" :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppTextField v-model="pvData.duration" type="number" :error-messages="pvError.duration"
                    label="Durée du crédit en mois" placeholder="Ex: 18" append-inner-icon="tabler-calendar"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppSelect v-model="pvData.periodicity" :items="periodicityItemList"
                    :error-messages="pvError.periodicity" label="Periodicité" placeholder="Ex: Mensuelle"
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6" lg="4">
                  <AppSelect v-model="pvData.release_type"
                    :items="[{ value: 'non-progressive', title: 'Non Progressif' }, { value: 'progressive', title: 'Progressif' }]"
                    :error-messages="pvError.release_type" label="Type de deblocage" placeholder=""
                    :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12">
                  <VSlider v-model="pvData.taf" label="TAF(%)" :error-messages="pvError.taf" :thumb-size="15"
                    thumb-label="always" :rules="[requiredValidator]" step="0.25" readonly>
                    <template #append>
                      <VTextField v-model="pvData.taf" :error-messages="pvError.taf" type="number" style="width:100px"
                        density="compact" hide-details variant="outlined" suffix="%" readonly />
                    </template>
                  </VSlider>
                </VCol>
                <VCol cols="12">
                  <VSlider v-model="pvData.administrative_fees_percentage" label="Frais de dossier(%)"
                    :error-messages="pvError.administrative_fees_percentage" :thumb-size="15" thumb-label="always"
                    :rules="[requiredValidator]" step="0.25">
                    <template #append>
                      <VTextField v-model="pvData.administrative_fees_percentage"
                        :error-messages="pvError.administrative_fees_percentage" type="number" style="width:100px"
                        density="compact" hide-details variant="outlined" suffix="%" />
                    </template>
                  </VSlider>
                </VCol>
                <VCol cols="12">
                  <VSlider v-model="pvData.tax_fee_interest_rate" label="Taux d'intérêt HT(%)"
                    :error-messages="pvError.tax_fee_interest_rate" :thumb-size="15" thumb-label="always"
                    :rules="[requiredValidator]" step="0.25">
                    <template #append>
                      <VTextField v-model="pvData.tax_fee_interest_rate" :error-messages="pvError.tax_fee_interest_rate"
                        type="number" style="width:100px" density="compact" hide-details variant="outlined" suffix="%" />
                    </template>
                  </VSlider>
                </VCol>
                <VCol cols="12">
                  <AppTextarea v-model="pvData.reserve" rows="5" label="Reserve" placeholder="" />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
          <VCard class="mb-6" title="Information des cautions">
            <VCardText class="add-products-form">
              <div v-for="(guarantee, index) in pvData.guarantees" class="my-4 ma-sm-4">
                <GuaranteeEdit :id="index" :data="guarantee" @remove-guarantee="removeGuaranteeItem" />
              </div>

              <div class="mt-4 ma-sm-4">
                <VBtn prepend-icon="tabler-plus" @click="addGuaranteeItem">
                  Ajouter
                </VBtn>
              </div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12">
          <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
            <div class="d-flex flex-column justify-center" />
            <div class="d-flex gap-4 align-center flex-wrap">
              <VBtn type="reset" variant="tonal" color="primary">
                <VIcon start icon="tabler-circle-minus" />
                Effacer
              </VBtn>
              <VBtn type="submit" class="me-3">
                Enregistrer
                <VIcon end icon="tabler-checkbox" />
              </VBtn>
            </div>
          </div>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
.drop-zone {
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 6px;
}
</style>

<style lang="scss">
.inventory-card {

  .v-radio-group,
  .v-checkbox {
    .v-selection-control {
      align-items: start !important;

      .v-selection-control__wrapper {
        margin-block-start: -0.375rem !important;
      }
    }

    .v-label.custom-input {
      border: none !important;
    }
  }

  .v-tabs.v-tabs-pill {
    .v-slide-group-item--active.v-tab--selected.text-primary {
      h6 {
        color: #fff !important
      }
    }
  }

}

.ProseMirror {
  p {
    margin-block-end: 0;
  }

  padding: 0.5rem;
  outline: none;

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
}
</style>
