import SwalConfigs from '../../utils/swal-configs.js'

export default {
    actions: {
        toast({}, payload) {
            SwalConfigs.toast(payload.title, payload.text, payload.type, payload.timer)
        }
    }
}