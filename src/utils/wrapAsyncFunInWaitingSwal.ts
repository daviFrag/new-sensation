import Swal from 'sweetalert2';

export default function wrapAsyncFunInWaitingSwal<R>(
  f: () => Promise<R>,
  callback: (args: R) => void
) {
  Swal.fire({
    title: 'Attendi...',
    html: 'Tra un attimo verrai reindirizzato',
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  f().then((ret) => {
    Swal.close();
    callback(ret);
  });
}
