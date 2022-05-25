import { isEmpty } from 'lodash-es'
import { DateTime, DateTimeOptions, LocaleOptions } from 'luxon'

export function formatISODate(
  string?: string,
  format = DateTime.DATE_FULL,
  options?: {
    dateTime?: DateTimeOptions
    locale?: LocaleOptions
  }
) {
  const { dateTime, locale } = options ?? {}
  if (isEmpty(string) || string == null) return null
  return DateTime.fromISO(string, dateTime).toLocaleString(format, locale)
}
