import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../headers/url'
import { transformRequest, transformResponse } from '../headers/data'
import { processHeaders } from '../headers/headers'

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  /**
   * 设置URL
   * 主要针对params参数
   * 如GET请求参数拼接
   */
  config.url = transfromURL(config)

  /**
   * 设置请求头
   * 当data为Object时应设置默认的Content-Type
   * 否则后端有可能接收不到data参数
   */
  config.headers = transformHeaders(config)

  /**
   * 设置data
   * 当data为普通object时，将其转为字符串
   *
   */
  config.data = transformRequestData(config)
}

function transfromURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
