import { LatLng, Payment, VisaInfo } from '~/@types/utils'
import { PaymentCore } from './paymentCore'
import { isEmpty } from 'lodash'

type IPaymentWithVisa = {
  latLng: LatLng
  visaInfo?: VisaInfo
  amount?: number
  order_id?: string
  returnUrl: string
}
export class PaymentWithVisa extends PaymentCore {
  visaInfo?: VisaInfo
  order_id?: string
  amount?: number
  returnUrl?: string
  constructor({ visaInfo, latLng, amount, order_id, returnUrl }: IPaymentWithVisa) {
    super(latLng, {
      baseURL: 'https://ot-device-2.vipn.net/w-payment'
    })
    this.visaInfo = visaInfo
    this.amount = amount
    this.order_id = order_id
    this.returnUrl = returnUrl
  }

  async payment() {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log(this)
      if (!this.amount) throw new Error('amount must be provided')
      if (!this.order_id) throw new Error('order_id must be provided')
      console.log('this.visaInfo: ', this.visaInfo)
      if (!this.visaInfo || isEmpty(this.visaInfo)) throw new Error('visaInfo invalid!')
      this.validateInfoVisa(this.visaInfo)
      const dataPostalCode: Awaited<ReturnType<typeof this.getPostalCode>> = await this.getPostalCode()
      if (!dataPostalCode.address.postcode) throw new Error('Cannot get PostalCode at current location!')
      const dataIP: Awaited<ReturnType<typeof this.getIP>> = await this.getIP()
      const postalCode = dataPostalCode.address.postcode
      const ip = dataIP.ip
      const bodyPayment = this.formatDataSendPayment(postalCode, ip)
      console.log('bodyPayment: ', bodyPayment)
      return
      // const dataPayment: Awaited<ReturnType<typeof this.sendPayment>> = await this.sendPayment(bodyPayment)
      // return dataPayment
      // const dataPayment = {
      //   paymentId: 'pt_1808687745800994817',
      //   redirectToUrl:
      //     'https://payment.moneycollect.com/authentication?type=2&param=eyJwYXltZW50SWQiOiJwdF8xODA4Njg3NzQ1ODAwOTk0ODE3IiwidGhyZWVEc1VybCI6Imh0dHBzOi8vc2FmZXBheS5hc2lhYmlsbC5jb206NDQzL3NlcnZpY2VzL3YzL3RocmVlRHNDaGVjaz90aHJlZURzUGFyYW09YmQ3MzYzYTU2Y2FhZDlhZDBlMWVmMjljOWQ5Y2E1YWEwNTJlMGNkNDRiM2Y5NTllMDE4Nzc5NTNmODMzM2MwNDk1ZmMzMTRkN2Y4ZTZmYmFhZThiMmQ3MzE3ODQxMTVlZmQ3Nzg4NjEwOGNhNDE4ZThhZmFjMTg1MjYzYjNiNTkyYzFkZDY3MjBmM2ExYTFiMWU2YWIyZDBkZjg1MTk5MmU1MjE5MWI2YzBkZmYxZGEwMTc2MGUyNzM0N2Y3ZjVhNTY1OGE0NTRlNTA4ZGM2MGI2Yzk3YTFkYjJlNmQ2NmM4YzhmMDFiMDI5NWZhZGIzZjBjODNlNTBmNzM4NDZhYzM0MTAzNTcxZTgyMTZjMzZhODljMDZiOGIzZDZjYmU0MDVhMWUyMDgwOWNlYmIzYjNmZGQ3MzRjNTY1ZjVjODdmMmViMzg3Y2Y1Mzc3ZmVmODI1MzVhNjkzZDMzMzFkOTNkN2M5ZmQ1MWI0NmRiOTgxODc0NjUzODUwYzU4ZjNjOWU3YWJiMDNkNjNiZTBhZGIzYjZmM2RjNDFjYjJlMDE5M2MzYWU4NWY1NzljYzczODZjNzA4ZmM1NGEwMmI3OWQxYzE4MzA1M2U3MGFjNTBmZWMyNWRhZjI2YWExMTkyOWU3ZDliZmIxNjhhMzYwZTFmMDkyNWZhYjNjNmNjYjE1NGM2MzRiY2E2ZGEwNzNkNmUxM2RjODNiMjNiOWViOGYxZDM1YWEzMTM1NTc0ZmRlZjUyNGYzYjg5OTYxZjM1ODA3OGNkNjA2ZDE4YzQ1MmQzNDEzNzBlYmMwMTYzYWEzMDU1ZTBhYWQ5OGUwOGIyMmU2NDRhMzMzNTM0NzhkZWYyZjYzNWZiZmU3ODliMjkwNzA5ZDhjZTcwZGE3YjcwMzIwM2E4ZmE5NmIxY2ZlNGQ1ZDg1ZjljNTFlZjc4NDUyZmMwNGVmOGU3NDE1OWI5ZTNjOGI1MDczNmIxY2E0ZThmMGI5M2QzMGFmNjFmZTgwNzc5NDMyNGRkNjJiYWQ0ZTY5MzI5MjZhZTllZDQ4OWNjMWYxYzY1ZGY2Mzc5NjMzZDdjOWZkNTFiNDZkYjk4MTg3NDY1Mzg1MGM1OGYzYzVmZDMzNTRhOTgyZjg5MTk3NTJkOGNhY2Q4YjIwYjM0MjUyNzNiNjgzNjdjYmU3MDg0NjNmMTc3ZTM4NGJlNTY2NjIxNDY4N2Q1OGM2ZjA0NzY5ZTY0YjFhMmU1NzdiNzEyMmY1ZmI3ZDY3YTQyODYyYzQzNTJkMWYyOGMwMTE3JnRocmVlRHNUeXBlPTYifQ==',
      //   riskScore: 98
      // }
      // return await this.handleDataPayment(dataPayment)
    } catch (error) {
      throw error
    }
  }

  async handleDataPayment(payment: Payment) {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!payment) throw new Error('payment fail')
      const { redirectToUrl, paymentId, riskScore } = payment
      if (redirectToUrl === '') return
      const dataCheckPayment: Awaited<ReturnType<typeof this.checkPayment>> = await this.checkPayment(
        paymentId,
        riskScore
      )
      console.log('dataCheckPayment', dataCheckPayment)
      if (dataCheckPayment.status !== 1) {
        // if (!this.urlFail)
        //   throw {
        //     message: `Payment fail: status - ${dataCheckPayment.status}`,
        //     status: false
        //   }
        // window.location.href = this.urlFail
        return
      }
      if (dataCheckPayment.amount < 1) {
        // if (!this.urlFail)
        //   throw {
        //     message: `Payment fail: wrong amount`,
        //     status: false
        //   }
        // window.location.href = this.urlFail
        return
      }

      // if (!this.urlSuccess)
      //   return {
      //     status: true,
      //     data: 'Payment success!'
      //   }
      // window.location.href = this.urlSuccess
    } catch (error) {
      throw error
    }
  }

  formatDataSendPayment(postalCode: string, ip: string) {
    if (!this.amount) throw new Error('amount must be provided')
    if (!this.order_id) throw new Error('order_id must be provided')
    if (!this.visaInfo || isEmpty(this.visaInfo)) throw new Error('visaInfo invalid!')
    return {
      number: this.visaInfo.cardNumber,
      name: this.visaInfo.cardName,
      cvc: this.visaInfo.cvv,
      expiry_month: this.calculateExpireYear(this.visaInfo.expirationDate).expiry_month,
      expiry_year: this.calculateExpireYear(this.visaInfo.expirationDate).expiry_year,
      amount: this.amount,
      postalCode,
      lat: this.location.lat,
      lng: this.location.lng,
      order_id: this.order_id,
      ip
    }
  }

  calculateExpireYear(expirationDate: string) {
    let expiry_month: number, expiry_year: number

    if (expirationDate.length === 5) {
      const expireDateSplit = expirationDate.split('/')
      expiry_month = parseInt(expireDateSplit[0])
      expiry_year = parseInt(expireDateSplit[1])
    } else {
      expiry_month = parseInt(expirationDate.substring(0, 2))
      expiry_year = parseInt(expirationDate.substring(2, 4))
    }

    if (expiry_year < 100) {
      expiry_year += 2000
    }

    return {
      expiry_month,
      expiry_year
    }
  }
}
