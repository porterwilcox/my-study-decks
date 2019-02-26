import Swal from "sweetalert2";

let SwalConfigs = {}

SwalConfigs['toast'] = (title, text, type, timer = 1500) => {
    return Swal.fire({
        title,
        text,
        type,
        timer,
        showConfirmButton: false,
        position: 'top-right',
        toast: true,
    })
}

export default SwalConfigs