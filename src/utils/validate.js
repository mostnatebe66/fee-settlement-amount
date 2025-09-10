// claim_id must be a 9-digit number
export function isValidClaimId(claimId) {
  return /^\d{9}$/.test(String(claimId));
}
