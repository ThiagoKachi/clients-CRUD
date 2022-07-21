/* eslint-disable prettier/prettier */
export const phoneNumber = /\([1-9]{2}\) 9[1-9]\d{3}-\d{4}/;

export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return '';

  return value
  .replace(/[\D]/g, '')
  .replace(/(\d{2})(\d)/, '($1) $2')
  .replace(/(\d{5})(\d)/, '$1-$2')
  .replace(/(-\d{4})(\d+?)/, '$1')
}