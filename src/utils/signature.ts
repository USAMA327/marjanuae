// utils/signature.ts
import CryptoJS from "crypto-js";

export function generateSignature(
  merchantPublicKey: string,
  amount: number,
  currency: string,
  merchantReferenceId: string,
  apiPassword: string,
  timestamp: string
): string {
  const amountStr = amount.toFixed(2); // Format amount to 2 decimal places
  const data = `${merchantPublicKey}${amountStr}${currency}${merchantReferenceId}${timestamp}`;
    const hash = CryptoJS.HmacSHA256(data, apiPassword);
    console.log(CryptoJS.enc.Base64.stringify(hash))
  return CryptoJS.enc.Base64.stringify(hash);
}