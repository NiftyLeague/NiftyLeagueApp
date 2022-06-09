export const BASE_API_URL =
  'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod';

export const MY_PROFILE_API_URL = `${BASE_API_URL}/stats/profile`;

// Degen API url
export const DEGEN_BASE_API_URL = 'https://nifty-league.s3.amazonaws.com';
export const DEGEN_BASE_BACKGROUND_URL = 'https://api.nifty-league.com';
export const DEGEN_BASE_IMAGE_URL = `${DEGEN_BASE_API_URL}/degens`;

// Rentals API url
export const DISABLE_RENT_API_URL = `${BASE_API_URL}/rentals/rentable/`;
export const DEGEN_ASSETS_DOWNLOAD_URL = `${BASE_API_URL}/assets/degen`;
export const MY_RENTAL_API_URL = `${BASE_API_URL}/rentals/my-rentals?active=true`;
export const ALL_RENTAL_API_URL = `${BASE_API_URL}/rentals/all-rentals?active=true`;
export const RENTED_FROM_ME_API_URL = `${BASE_API_URL}/rentals/rented-from-me`;
export const TERMINATE_RENTAL_API_URL = `${BASE_API_URL}/rentals/rental/terminate`;
export const RENAME_RENTAL_API_URL = `${BASE_API_URL}/rentals/rental/rename`;
export const RENTAL_PASS_INVENTORY_URL = `${BASE_API_URL}/accounts/account/inventory?id=rental-pass-base`;
export const RENTAL_RENAME_URL = (rentalId: string): string =>
  `${BASE_API_URL}/rentals/rental/rename?id=${encodeURIComponent(rentalId)}`;
export const RENT_URL = `${BASE_API_URL}/rentals/rent`;
export const GET_DEGEN_DETAIL_URL = (degenId: string): string =>
  `${BASE_API_URL}/rentals/rentables?degen_id=${encodeURIComponent(degenId)}`;

// Gamer Account API
export const GAMER_ACCOUNT_API = `${BASE_API_URL}/accounts/account`;
export const WITHDRAW_NFTL_LIST = `${BASE_API_URL}/accounts/withdrawals`;
export const WITHDRAW_NFTL_SIGN = `${BASE_API_URL}/accounts/withdraw/sign`;
export const WITHDRAW_NFTL_CONFIRM = `${BASE_API_URL}/accounts/withdraw/confirm`;
export const WITHDRAW_NFTL_REFRESH = `${BASE_API_URL}/accounts/withdraw/refresh/2`;
export const WITHDRAW_NFTL_AVAILABILITY = `${BASE_API_URL}/accounts/withdraw/availability`;

// Gamer Profile API
const GAMER_PROFILE_BASE = 'profiles/profile';
export const GET_GAMER_PROFILE_API = `${BASE_API_URL}/${GAMER_PROFILE_BASE}?include_stats=true`;
export const PROFILE_RENAME_API = `${BASE_API_URL}/${GAMER_PROFILE_BASE}/rename`;
export const GET_PROFILE_AVATARS_AND_COST_API = `${BASE_API_URL}/${GAMER_PROFILE_BASE}/avatars`;
export const UPDATE_PROFILE_AVATAR_API = `${BASE_API_URL}/${GAMER_PROFILE_BASE}/avatar`;
