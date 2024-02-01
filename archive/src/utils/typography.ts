export const shortenText = (text: string, max: number) => {
    return text.length > max ? `${text.substring(0, max)}...` : text;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};