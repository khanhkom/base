import URL from "@app/services/api/url"
import { apiLocation } from "../apiLocation"
export interface IProvince {
  _id: string
  name: string
  slug: string
  type: "tinh"
  name_with_type: string
  code: string
  isDeleted: boolean
}
export interface IDistrict {
  _id: string
  name: string
  type: "quan"
  slug: string
  name_with_type: string
  path: string
  path_with_type: string
  code: string
  parent_code: string
  isDeleted: boolean
}
export interface IWard {
  _id: string
  name: string
  type: "xa"
  slug: string
  name_with_type: string
  path: string
  path_with_type: string
  code: string
  parent_code: string
  isDeleted: boolean
}
console.log("apiLocation_apiLocation", apiLocation.config.url)
export const getProvincesByPage = (body: {
  q: string
  cols: string
  page: number
  limit: number
}): Promise<{ data: { data: { data: IProvince[] } } }> =>
  apiLocation.apisauce
    .get(URL.PROVINCES_GET_ALL, body)
    .then((res) => res)
    .catch((err) => err)
export const getDistrictByProvince = (body: {
  q: string
  cols: string
  provinceCode: string
  page: number
  limit: number
}) =>
  apiLocation.apisauce
    .get(URL.DISTRICTS_GET_BY_PROVINCE, body)
    .then((res) => res)
    .catch((err) => err)
export const getWardsByDistrict = (body: {
  q: string
  cols: string
  districtCode: string
  page: number
  limit: number
}) =>
  apiLocation.apisauce
    .get(URL.WARDS_GET_BY_DISTRICT, body)
    .then((res) => res)
    .catch((err) => err)
