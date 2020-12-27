export default {
  zipCodeGermany: new RegExp(/^[0-9]{4,6}$/),
  email: new RegExp(/.+@.+\..+/),
  routerLink: new RegExp(/(routerlink.)[A-Za-z0-9_.]+$/gm),
};
