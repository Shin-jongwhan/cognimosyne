export type LoginLanguageStrings = {
  login: string;
  signup: string;
  logout: string;
  languageSelectorLabel: string;
};

export type LandingPageFeatureCard = {
  title: string;
  description: string;
};

export type LandingPageFeaturesSection = {
  title: string;
  description: string;
  cards: LandingPageFeatureCard[];
};

export type LandingPageValueCard = {
  title: string;
  description: string;
};

export type LandingPageValuesSection = {
  title: string;
  description: string;
  cards: LandingPageValueCard[];
};

export type LandingPagePolicyLink = {
  label: string;
  href: string;
};

export type LandingPageFooter = {
  businessLines: string[];
  policyHeading: string;
  policies: LandingPagePolicyLink[];
};

export type LandingPageCopy = {
  featuresSection: LandingPageFeaturesSection;
  valuesSection: LandingPageValuesSection;
  footer: LandingPageFooter;
};

export type UserDashboardItem = {
  key: string;
  title: string;
  description: string;
  ctaPath?: string;
  isAvailable?: boolean;
};

export type UserDashboardNavGroup = {
  key: string;
  label: string;
  items: UserDashboardItem[];
};

export type UserDashboardCopy = {
  title: string;
  subtitle?: string;
  navGroups: UserDashboardNavGroup[];
  actions: {
    open: string;
    comingSoon: string;
  };
};

export type LoginLanguageDefinition = {
  code: string;
  label: string;
  strings: LoginLanguageStrings;
  landingPage: LandingPageCopy;
  userDashboard?: UserDashboardCopy;
};



