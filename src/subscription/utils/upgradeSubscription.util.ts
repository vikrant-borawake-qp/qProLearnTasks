import { PurchaseSubscriptionDto } from '../dtos/PurchaseSubscriptionDto';

export const validateInputs = (
  purchaseSubscriptionDto: PurchaseSubscriptionDto,
): string[] => {
  const {
    name,
    cardCvv,
    cardExpiryMonth,
    cardExpiryYear,
    cardNumber,
    subscriptionId,
    userId,
  } = purchaseSubscriptionDto;
  const validationErrors: string[] = [];
  const cardRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2131|1800|35\d{3})\d{11}$/;

  if (!subscriptionId) validationErrors.push('No subscription id provided');
  if (!subscription) validationErrors.push('Invalid subscription id');
  if (!userId) validationErrors.push('No user id provided');

  if (!name) validationErrors.push('Name of the card holder should be present');
  if (!cardCvv) validationErrors.push('Card CVV is required');
  if (cardExpiryMonth < 1 || cardExpiryMonth > 12)
    validationErrors.push('Please enter a valid card expiry month');
  if (cardExpiryYear < new Date().getFullYear() + 1)
    validationErrors.push('Your card is expired');
  if (!cardNumber) validationErrors.push('Card Number is required');
  if (cardNumber.length !== 16)
    validationErrors.push(
      'Card Number is invalid, please enter your 16 digit card number',
    );
  if (cardCvv.length !== 3) validationErrors.push('Invalid CVV');
  if (!cardRegex.test(cardNumber)) validationErrors.push('Invalid card number');

  return [];
};
