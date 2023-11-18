import Swal from 'sweetalert2';
import { ApiResponse } from '../services/api';
import { ApiResult } from '../services/api/api';
import wrapAsyncFunInWaitingSwal from './wrapAsyncFunInWaitingSwal';

export default function wrapApiCallInWaitingSwal<T>(
  apiFn: () => Promise<ApiResponse<T>>,
  successCallback: (response: ApiResult<T>) => void
) {
  wrapAsyncFunInWaitingSwal(apiFn, (response) => {
    if (response.status !== 'success') {
      console.error(response.message);
      Swal.fire({
        icon: 'error',
        title: "Qualcosa e' andato storto",
        html: `${response.message}`,
      });
    } else {
      successCallback(response);
    }
  });
}
