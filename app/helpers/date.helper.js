import moment from 'moment'

export default function format(date) {
  if (!date) return null

  return moment(date).format('Do MMM YYYY HH:mm')
}
