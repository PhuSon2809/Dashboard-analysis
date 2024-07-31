import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { isEmpty } from 'lodash'
import { CheckPayment, IP, LatLng, Payment, PostalCode, RequireAtLeastOne, VisaInfo } from '~/@types/utils'

type BodySendPayment = {
  number: string
  name: string
  cvc: string
  expiry_month: number
  expiry_year: number
  amount: number
  postalCode: string
  lat: number
  lng: number
  order_id: string
  ip: string
}
export class PaymentCore {
  client: AxiosInstance
  baseURL: string
  location: LatLng
  baseURLPostalCode: string

  constructor(latLng: LatLng, axiosConfig: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>) {
    const config = {
      headers: {
        referer: axiosConfig.baseURL,
        origin: axiosConfig.baseURL
      },
      timeout: 20000,
      ...axiosConfig
    }
    this.client = axios.create(config)
    this.baseURL = axiosConfig.baseURL
    this.location = latLng
    this.baseURLPostalCode = 'https://nominatim.openstreetmap.org/reverse'
  }

  init() {
    console.log('Payment Core!')
  }
  validateCardName(cardName: string): boolean {
    const nameRegex = /^[a-zA-Z\s]+$/
    cardName = cardName.trim()
    if (!nameRegex.test(cardName)) return false
    const words = cardName.split(/\s+/)
    if (words.length < 2) return false
    return true
  }
  validateCVV(cvv: string): boolean {
    const cvvRegex = /^\d{3}$/
    return cvvRegex.test(cvv)
  }
  validateExpirationDate(expirationDate: string): boolean {
    const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!expDateRegex.test(expirationDate)) return false
    const parts = expirationDate.split('/')
    const month = parseInt(parts[0], 10)
    const year = parseInt(parts[1], 10) + 2000 // Assuming the year is 20YY
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1 // Months are zero-based
    const currentYear = currentDate.getFullYear()
    return year > currentYear || (year === currentYear && month >= currentMonth)
  }
  /**
   * Check visa information before making payment api call
   * @param visaInfo Visa information to check
   * @returns boolean to allow api call to make payment
   */
  validateInfoVisa(visaInfo?: VisaInfo) {
    if (!visaInfo || isEmpty(visaInfo)) throw new Error('visaInfo invalid!')
    if (!this.validateCardName(visaInfo.cardName)) throw new Error('cardName invalid!')
    if (typeof visaInfo.cvv !== 'string') throw new Error('cvv typeof is not string!')
    if (!this.validateCVV(visaInfo.cvv)) throw new Error('cvv invalid!')
    if (!this.validateExpirationDate(visaInfo.expirationDate)) throw new Error('expirationDate invalid!')
    if (!visaInfo.cardNumber) throw new Error('cardNumber invalid!')
  }

  async getPostalCode(): Promise<PostalCode> {
    try {
      const response = await axios.get<PostalCode>(
        `${this.baseURLPostalCode}?lat=${this.location.lat}&lon=${this.location.lng}&format=json`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getIP(): Promise<IP> {
    try {
      const response = await this.client.get<IP>('/trace')
      return response.data
    } catch (error) {
      throw error
    }
  }

  async sendPayment(body: BodySendPayment): Promise<Payment> {
    try {
      const response = await this.client.post<Payment>('/pay', body)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async checkPayment(paymentId: string, paymentSecret: number): Promise<CheckPayment> {
    try {
      const response = await this.client.get<CheckPayment>(`/check/${paymentId}/${paymentSecret}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
