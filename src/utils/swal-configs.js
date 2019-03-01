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

SwalConfigs['confirm'] = (title, text, type, confirmButtonText = 'Ok', cancelButtonText = 'Cancel') => {
    return Swal.fire({
        title,
        text,
        type,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        allowOutsideClick: false
    }).then(res => res.value)
}

export default SwalConfigs