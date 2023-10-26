export const validatePhoneNumber = (phone: string): boolean => {
  const numberConvert = phone.replace(/[^0-9]/g, "")
  const firstString = phone?.[0] ?? ""
  const lenghtValid = firstString === "0" ? 10 : 9
  return numberConvert.length === lenghtValid
}
