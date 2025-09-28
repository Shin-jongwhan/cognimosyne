export const resolveAppRedirectUri = (): string => {
  if (typeof window === "undefined") {
    return "https://cognimosyne.com/";
  }

  const origin = window.location.origin ?? "https://cognimosyne.com";
  return origin.endsWith("/") ? origin : `${origin}/`;
};
