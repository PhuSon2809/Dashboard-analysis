export interface ReportHomeData {
  id: number
  currentVisitors: number
  todayVisitors: number
  unhappyVisitors: number
  reach: number
  engagement: number
  order: number
  payment: number
  unhappyPersons: number
  happyPersons: number
}
export interface ReportData {
  'Levea Menu': number
  'Menu Check Time': number
  todayVisitors: number
  unhappyVisitors: number
  reach: number
  engagement: number
  order: number
  payment: number
  unhappyPersons: number
  happyPersons: number
}

export interface Root {
  ENGAGEMENT: Engagement
  ORDERS: Orders
  "Reaction's Menu": ReactionSMenu
  b: number
  conversionRateEngagement: number
  conversionRateOrder: number
  conversionRatePay: number
  conversionRatePercent1: number
  conversionRatePercent2: number
  conversionRatePercent3: number
  conversionRateReach: number
  currentReactionHappy: number
  currentReactionUnhappy: number
  currentReactions: CurrentReaction[]
  currentViews: number
  currentViewsPercent: number
  currentVisitors: number
  currentVisitorsPercent: number
  hourlyVisitors: HourlyVisitors
  reactionViewerChart: ReactionViewerChart
  realTimeReportTime: RealTimeReportTime
  todayReportsOrder: number
  todayReportsOrderPercent: number
  todayReportsPurchase: number
  todayReportsPurchasePercent: number
  todayReportsViewers: number
  todayReportsViewersPercent: number
  todayReportsVisitors: number
  todayReportsVisitorsPercent: number
  todayVisitors: number
  todayVisitorsPercent: number
  totalViewersChart: TotalViewersChart
}

export interface Engagement {
  'Levea Menu': number
  'Menu Check Time': MenuCheckTime
  'Serve Time Average': ServeTimeAverage
}

export interface MenuCheckTime {
  '1': number
  '2': number
}

export interface ServeTimeAverage {
  '11': number
  '12': number
  '13': number
  '14': number
  '15': number
  '16': number
  '17': number
  '18': number
}

export interface Orders {
  'Best Seller': BestSeller
  Purchases: Purchases
  'Reaction Enjoy Meal': ReactionEnjoyMeal
}

export interface BestSeller {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  '6': number
  '7': number
}

export interface Purchases {
  '1': number
  '2': number
  '3': number
}

export interface ReactionEnjoyMeal {
  '1': number
  '2': number
  '3': number
}

export interface ReactionSMenu {
  '1': N1
  '2': N2
  '3': N3
}

export interface N1 {
  '1': number
  '2': number
  '3': number
}

export interface N2 {
  '1': number
  '2': number
  '3': number
}

export interface N3 {
  '1': number
}

export interface CurrentReaction {
  age: string
  gender: number
  status: number
}

export interface HourlyVisitors {
  '1': number
  '10': number
  '11': number
  '12': number
  '13': number
  '14': number
  '15': number
  '16': number
  '17': number
  '18': number
  '19': number
  '2': number
  '20': number
  '21': number
  '22': number
  '23': number
  '24': number
  '3': number
  '4': number
  '5': number
  '6': number
  '7': number
  '8': number
  '9': number
}

export interface ReactionViewerChart {
  attentive: number
  disinterested: number
  highAttentive: number
  moderatelyAttentive: number
  money: number
}

export interface RealTimeReportTime {
  '10': N10
  '11': N11
  '12': N12
  '13': N13
  '14': N14
  '15': N15
  '16': N16
  '17': N17
  '18': N18
  '7': N7
  '8': N8
  '9': N9
}

export interface N10 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N11 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N12 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N13 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N14 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N15 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N16 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N17 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N18 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N7 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N8 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface N9 {
  realTimeReportReach: number
  realTimeReportEngagement: number
  realTimeReportOrder: number
  realTimePayment: number
}

export interface TotalViewersChart {
  labels: string[]
  xAxis: number[]
  yAxis: YAxis
}

export interface YAxis {
  '1': number[]
  '10': number[]
  '11': number[]
  '12': number[]
  '13': number[]
  '14': number[]
  '15': number[]
  '16': number[]
  '17': number[]
  '18': number[]
  '19': number[]
  '2': number[]
  '20': number[]
  '21': number[]
  '22': number[]
  '23': number[]
  '24': number[]
  '3': number[]
  '4': number[]
  '5': number[]
  '6': number[]
  '7': number[]
  '8': number[]
  '9': number[]
}
