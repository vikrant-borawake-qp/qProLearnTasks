import {PurchaseSubscriptionDto} from '../dtos/PurchaseSubscriptionDto'

export const validateInputs = (
  purchaseSubscriptionDto: PurchaseSubscriptionDto,
): string | null => {
  const {name, cardCvv, cardExpiry, cardNumber} = purchaseSubscriptionDto
  const cardRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2131|1800|35\d{3})\d{11}$/
  const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/

  if (!name) return 'Name of the card holder should be present'
  if (!cardCvv) return 'Card CVV is required'
  if (!cardExpiry) return 'Card Expiry Date is required'
  if (cardExpiryRegex.test(cardExpiry))
    return 'Card Expiry Date should be in MM/YY format'
  if (!cardNumber) return 'Card Number is required'
  if (cardNumber.length !== 16)
    return 'Card Number is invalid, please enter your 16 digit card number'
  if (cardCvv.length !== 3) return 'Invalid CVV'
  if (!cardRegex.test(cardNumber)) return 'Invalid card number'
  return null
}
