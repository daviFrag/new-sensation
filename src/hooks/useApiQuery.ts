import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { ApiResponse } from '../services/api';
import { useCustomUserContext } from '@/app/context/userStore';

type apiQueryLoading = {
  data: undefined;
  is_loading: true;
  is_error: false;
  invalidateQuery: () => void;
};

type apiQueryError = {
  data: undefined;
  is_loading: false;
  is_error: true;
  invalidateQuery: () => void;
};

type apiQuerySuccess<T> = {
  data: T;
  is_loading: false;
  is_error: false;
  invalidateQuery: () => void;
};

export type apiQueryResponse<T> =
  | apiQueryLoading
  | apiQueryError
  | apiQuerySuccess<T>;

const loading_response: apiQueryLoading = {
  data: undefined,
  is_loading: true,
  is_error: false,
  invalidateQuery: () => {},
};

const error_response: apiQueryError = {
  data: undefined,
  is_loading: false,
  is_error: true,
  invalidateQuery: () => {},
};

export default function useApiQuery<T>(
  query_key: string,
  queryFn: (query_key: string, access_token?: string) => Promise<ApiResponse<T>>
): apiQueryResponse<T> {
  const router = useRouter();
  const query_client = useQueryClient();
  const { accessToken } = useCustomUserContext();
  const {
    data,
    isLoading: is_loading,
    fetchStatus: fetch_status,
  } = useQuery([query_key, accessToken], () => queryFn(query_key, accessToken ?? undefined), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    console.debug(`fetched key ${query_key}`);
    console.debug(data)

    // * If api failed, we inform the user
    // * we need to check fetch_status, otherwise the error may be caused by an old cached error
    if (data && data.status !== 'success' && fetch_status !== 'fetching') {
      if (data.code === 401 ) {
        return redirect("/api/auth/login?returnTo=" + (window.location.href ?? "/"));
      }
      Swal.fire({
        title: "Qualcosa &eacute; andato storto",
        html: data.message,
        icon: 'error',
        allowOutsideClick: false,
      }).then(() => {
        query_client.invalidateQueries([query_key]);
      });
    }
  }, [data, router, query_client, query_key, fetch_status]);

  if (is_loading) return loading_response;

  if (!data || data.status !== 'success') {
    if (fetch_status === 'fetching') return loading_response;
    else return error_response;
  }

  return {
    data: data.data!,
    is_loading,
    is_error: false,
    invalidateQuery: () => query_client.invalidateQueries([query_key]),
  };
}
