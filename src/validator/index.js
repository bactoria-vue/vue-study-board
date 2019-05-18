import Vue from 'vue'
import VeeValidate from 'vee-validate';
import ko from './ko'

const config = {
    locale: 'ko',
    dictionary: {
        ko
    }
}

Vue.use(VeeValidate, config)
