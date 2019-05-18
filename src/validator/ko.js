import ko from 'vee-validate/dist/locale/ko.js'

ko.messages.email = (field) => '올바른 이메일 형식이 아닙니다.'
ko.messages.required = (field) => `${field}가 비어있습니다.`
ko.messages.min = (field, val) => `${field}은/는 ${val}자리 이상이어야 합니다.`
ko.messages.max = (field, val) => `${field}은/는 ${val}자리 이하여야 합니다.`

export default ko
