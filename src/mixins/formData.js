import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters('i18n', ['i18n']),

    gender() {
      return [
        { text: this.i18n.FORM_GENDER_FEMALE, value: 'female' },
        { text: this.i18n.FORM_GENDER_MALE, value: 'male' },
        { text: this.i18n.FORM_GENDER_NON_BINARY, value: 'noGender' },
      ];
    },

    salutation() {
      return [
        { text: this.i18n.FORM_TITLE_DOCTOR, value: this.i18n.FORM_TITLE_DOCTOR },
        { text: this.i18n.FORM_TITLE_PROFESSOR, value: this.i18n.FORM_TITLE_PROFESSOR },
        {
          text: this.i18n.FORM_TITLE_PROFESSOR_DOCTOR,
          value: this.i18n.FORM_TITLE_PROFESSOR_DOCTOR,
        },
      ];
    },
  },
};
