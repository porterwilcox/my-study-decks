import Swal from "sweetalert2";

let SwalConfigs = {}

SwalConfigs['toast'] = (title, text, type) => {
    return Swal.fire({
        title,
        text,
        type,
        showConfirmButton: false,
        timer: 1500,
        position: 'top-right',
        toast: true,
    })
}

export default SwalConfigs