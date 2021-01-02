<template>
  <div>
    <Title size="4" class="mb-5">Schreibe uns eine Nachricht</Title>
    <div>
      <div class="mb-5">
        <Input
          v-model="formData.name"
          :placeholder="i18n.FORM_LABEL_NAME"
          :label="i18n.FORM_LABEL_NAME"
          required
          :isError="invalidField('name')"
          :errorMessage="i18n.FORM_VALIDATION_REQUIRED_FIELD"
        />

        <Input
          v-model="formData.mail"
          type="mail"
          :placeholder="i18n.FORM_LABEL_MAIL"
          :label="i18n.FORM_LABEL_MAIL"
          required
          :isError="invalidField('mail')"
          :errorMessage="`${
            !$v.formData.mail.email
              ? i18n.FORM_VALIDATION_EMAIL
              : i18n.FORM_VALIDATION_REQUIRED_FIELD
          }`"
        />

        <TextArea
          v-model="formData.message"
          :placeholder="i18n.FORM_LABEL_MESSAGE"
          :label="i18n.FORM_LABEL_MESSAGE"
          fixedSize
          required
          :isError="invalidField('message')"
          :errorMessage="i18n.FORM_VALIDATION_REQUIRED_FIELD"
        />

        <Input v-model="tribe" type="hidden" required />
      </div>

      <p class="mb-5 is-size-7">{{ i18n.FORM_REQUIRED }}</p>

      <Notification v-if="sendStatus === status.ready" isSuccess class="mb-5">
        {{ i18n.FORM_MESSAGE_SUCCESS }}
      </Notification>

      <Notification v-if="sendStatus === status.error" isError class="mb-5">
        {{ i18n.FORM_MESSAGE_ERROR }}
      </Notification>

      <Button @click="sendForm" :isLoading="sendStatus === status.loading">
        {{ i18n.FORM_SEND_LABEL }}
      </Button>
    </div>
  </div>
</template>

<script>
import { required, email, maxLength } from 'vuelidate/lib/validators';
import requestStatus from '@/data/requestStatus';
import { mapGetters } from 'vuex';
import mattermostApi from '@/api/mattermostApi';
import dateHelper from '@/helper/dateHelper';

export default {
  name: 'ContactForm',
  data() {
    return {
      formData: {
        name: null,
        mail: null,
        message: null,
      },
      sendStatus: null,
      timeStampStart: null,
      tribe: null,
    };
  },
  validations: {
    formData: {
      name: {
        required,
      },
      mail: {
        required,
        email,
      },
      message: {
        required,
      },
    },
    tribe: {
      maxLength: maxLength(0),
    },
  },
  methods: {
    sendForm() {
      this.sendStatus = requestStatus.loading;
      if (this.validForm()) {
        this.sendData();
      } else {
        this.sendStatus = requestStatus.error;
      }
    },

    invalidField(name) {
      return this.sendStatus === requestStatus.error && this.$v.formData[name].$invalid;
    },

    validTimeSpan(now) {
      return now - this.timeStampStart > 5000;
    },

    sendData() {
      mattermostApi
        .send(this.formBody)
        .then(() => {
          this.sendStatus = requestStatus.ready;
          this.resetForm();
        })
        .catch(() => {
          this.sendStatus = requestStatus.error;
        });
    },

    validForm() {
      return this.validTimeSpan(new Date().getTime()) && !this.$v.$invalid;
    },

    resetForm() {
      this.formData = {
        name: null,
        mail: null,
        message: null,
        tribe: null,
      };
    },
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),

    status() {
      return requestStatus;
    },

    formBody() {
      return {
        username: this.formData.name,
        text: `Neue Mail von [${this.formData.name}](mailto:${this.formData.mail})`,
        props: {
          card: `Datum: ${dateHelper(new Date(), 'dateTime')} \n\n Von: ${this.formData.name} <${
            this.formData.mail
          }> \n\n ${this.formData.message}`,
        },
      };
    },
  },
  mounted() {
    this.sendStatus = requestStatus.init;
    this.timeStampStart = new Date().getTime();
  },
};
</script>
