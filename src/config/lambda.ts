export const LAMBDA_FUNCTION_URLS = {
  creditUsage: "https://arxtmxk6fvzw4s7nyqeqg37gta0qrhzr.lambda-url.ap-northeast-2.on.aws/",
} as const;

export type LambdaFunctionKey = keyof typeof LAMBDA_FUNCTION_URLS;

export const resolveLambdaFunctionUrl = (key: LambdaFunctionKey): string => LAMBDA_FUNCTION_URLS[key];
