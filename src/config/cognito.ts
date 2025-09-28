export const COGNITO = {
  region: "ap-northeast-2",
  userPoolId: "ap-northeast-2_2Qo22vonR",
  identityPoolId: "ap-northeast-2:7df13efa-997b-44f0-80db-97fb9e6e52c9",
  userPoolWebClientId: "6le4d5j955jnmr8h4pe4vjs7ci",
  hostedUiDomain: "https://ap-northeast-22qo22vonr.auth.ap-northeast-2.amazoncognito.com",
};

// Issuer/로그인 키(= Identity Pool Logins 키)로 쓰는 값
export const COGNITO_ISSUER = `https://cognito-idp.${COGNITO.region}.amazonaws.com/${COGNITO.userPoolId}`;

// Cognito IdP API 호출용 기본 엔드포인트
export const COGNITO_IDP_ENDPOINT = `https://cognito-idp.${COGNITO.region}.amazonaws.com/`;
