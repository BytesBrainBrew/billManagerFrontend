import { AXIOS_INSTANCE } from "./AxiosInstance";

/**
 * Makes a POST request to the specified URL.
 * @param url - The URL to make the request to.
 * @param dto - The data to send in the request body.
 * @param onSuccess - The callback function to execute on successful response.
 * @param config - Additional Axios request configuration.
 * @param onError - The callback function to execute on error.
 */
export function PostAPI(
  url: string,
  dto: any,
  config: {},
  onSuccess: (res: any) => void = () => {},
  onError: (err: any) => void = () => {}
) {
  AXIOS_INSTANCE.post(url, dto, config)
    .then((res: any) => {
      onSuccess(res);
    })
    .catch((err: any) => {
      onError(err);
    });
}


/**
 * Makes a GET request to the specified URL.
 * @param url - The URL to make the request to.
 * @param onSuccess - The callback function to execute on successful response.
 * @param config - Additional Axios request configuration.
 * @param onError - The callback function to execute on error.
 */
export function GetAPI(
  url: string,
  config: {},
  onSuccess: (res: any) => void = () => {},
  onError: (err: any) => void = () => {}
) {
  AXIOS_INSTANCE.get(url, config)
    .then((res: any) => {
      onSuccess(res);
    })
    .catch((err: any) => {
      onError(err);
    });
}
