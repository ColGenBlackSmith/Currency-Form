export interface ValuteData {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}

export interface Valute {
  [key: string]: ValuteData;
  AUD: ValuteData;
  AZN: ValuteData;
  GBP: ValuteData;
  AMD: ValuteData;
  BYN: ValuteData;
  BGN: ValuteData;
  BRL: ValuteData;
  HUF: ValuteData;
  VND: ValuteData;
  HKD: ValuteData;
  GEL: ValuteData;
  DKK: ValuteData;
  AED: ValuteData;
  USD: ValuteData;
  EUR: ValuteData;
  EGP: ValuteData;
  INR: ValuteData;
  IDR: ValuteData;
  KZT: ValuteData;
  CAD: ValuteData;
  QAR: ValuteData;
  KGS: ValuteData;
  CNY: ValuteData;
  MDL: ValuteData;
  NZD: ValuteData;
  NOK: ValuteData;
  PLN: ValuteData;
  RON: ValuteData;
  XDR: ValuteData;
  SGD: ValuteData;
  TJS: ValuteData;
  THB: ValuteData;
  TRY: ValuteData;
  TMT: ValuteData;
  UZS: ValuteData;
  UAH: ValuteData;
  CZK: ValuteData;
  SEK: ValuteData;
  CHF: ValuteData;
  RSD: ValuteData;
  ZAR: ValuteData;
  KRW: ValuteData;
  JPY: ValuteData;
}

export interface ResponseData {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: Valute;
}
