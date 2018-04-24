export default function price(amount) {
  if (amount === 0) return 0
  if (!amount) return null
  let result = ''

  if (`${amount}`.includes('.')) {
    const splitted = `${amount}`.split()
    result = `${splitted[0]} ${splitted[1]}`
  } else {
    result = `${amount} 00`
  }

  return result
}
