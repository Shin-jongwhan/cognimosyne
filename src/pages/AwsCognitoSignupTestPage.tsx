import { FormEvent, useMemo, useState } from "react";
import { COGNITO, COGNITO_ENDPOINT } from "../config/cognito";

type SignupForm = {
  email: string;
  country: string;
  name: string;
  phone: string;
};

type CognitoError = {
  message?: string;
  __type?: string;
};

const REQUIRED_FIELDS: Array<keyof SignupForm> = ["email", "country", "name", "phone"];

function generateSecurePassword() {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%^&*()_+";
  const pick = (pool: string) => pool[Math.floor(Math.random() * pool.length)] ?? "";
  const base = [pick(upper), pick(lower), pick(digits), pick(symbols)];
  const all = upper + lower + digits + symbols;
  for (let i = base.length; i < 12; i += 1) {
    base.push(pick(all));
  }
  return base
    .sort(() => Math.random() - 0.5)
    .join("");
}

async function callCognito<T>(target: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(COGNITO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": `AWSCognitoIdentityProviderService.${target}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || (data as CognitoError).__type) {
    const error = data as CognitoError;
    throw new Error(error.message ?? error.__type ?? "Cognito request failed");
  }

  return data as T;
}

function normalisePhoneNumber(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("0")) {
    return `+82${trimmed.slice(1)}`;
  }
  return `+82${trimmed}`;
}

export default function AwsCognitoSignupTestPage() {
  const [form, setForm] = useState<SignupForm>({
    email: "",
    country: "",
    name: "",
    phone: "",
  });
  const [code, setCode] = useState("");
  const [latestPassword, setLatestPassword] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false);

  const isSignupDisabled = useMemo(
    () => REQUIRED_FIELDS.some((key) => form[key].trim().length === 0) || isSigningUp,
    [form, isSigningUp],
  );

  const isConfirmDisabled = useMemo(
    () => code.trim().length === 0 || isConfirming,
    [code, isConfirming],
  );

  const handleChange = (key: keyof SignupForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSignupDisabled) return;

    setError(null);
    setStatus(null);
    setIsSigningUp(true);

    try {
      const generatedPassword = generateSecurePassword();
      await callCognito("SignUp", {
        ClientId: COGNITO.userPoolWebClientId,
        Username: form.email.trim(),
        Password: generatedPassword,
        UserAttributes: [
          { Name: "email", Value: form.email.trim() },
          { Name: "name", Value: form.name.trim() },
          { Name: "phone_number", Value: normalisePhoneNumber(form.phone) },
          { Name: "custom:country", Value: form.country.trim() },
        ],
      });

      setLatestPassword(generatedPassword);
      setIsAwaitingConfirmation(true);
      setStatus("Verification code sent. Check your email and confirm below.");
    } catch (signupError) {
      const message = signupError instanceof Error ? signupError.message : "Failed to sign up.";
      setError(message);
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleConfirm = async () => {
    if (isConfirmDisabled) return;

    setError(null);
    setStatus(null);
    setIsConfirming(true);

    try {
      await callCognito("ConfirmSignUp", {
        ClientId: COGNITO.userPoolWebClientId,
        Username: form.email.trim(),
        ConfirmationCode: code.trim(),
      });
      setStatus("Signup confirmed. You can now log in with the generated password.");
      setIsAwaitingConfirmation(false);
    } catch (confirmError) {
      const message = confirmError instanceof Error ? confirmError.message : "Failed to confirm signup.";
      setError(message);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-10 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">AWS Cognito Sign Up Test</h1>
          <p className="text-sm text-slate-400">
            Fill in the fields and submit to trigger Cognito sign up. A verification code will be emailed via SES because MFA is enabled.
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(event) => handleChange("email")(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              placeholder="example@domain.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="country">
              국가
            </label>
            <input
              id="country"
              type="text"
              required
              value={form.country}
              onChange={(event) => handleChange("country")(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              placeholder="South Korea"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(event) => handleChange("name")(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              placeholder="홍길동"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium" htmlFor="phone">
              번호
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(event) => handleChange("phone")(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              placeholder="+821012345678"
            />
            <p className="text-xs text-slate-500">
              Numbers are normalised to international format. Leading 0 is replaced with +82 by default.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSignupDisabled}
            className="w-full rounded-lg bg-emerald-500 py-2 font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {latestPassword && (
          <div className="rounded-lg border border-emerald-500 bg-emerald-950/40 p-4 text-sm text-emerald-200">
            <p className="font-medium">Generated temporary password</p>
            <p className="font-mono break-all">{latestPassword}</p>
            <p className="mt-2 text-xs">
              Save this value. You will need it to complete the first sign-in after confirming the account.
            </p>
          </div>
        )}

        {isAwaitingConfirmation && (
          <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-950 p-6">
            <p className="text-sm text-slate-300">입력한 이메일로 발송된 확인 코드를 입력하세요.</p>
            <div className="space-y-2">
              <label className="block text-sm font-medium" htmlFor="code">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
                placeholder="6-digit code"
              />
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
              className="w-full rounded-lg bg-indigo-500 py-2 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isConfirming ? "Confirming..." : "Confirm Sign Up"}
            </button>
          </div>
        )}

        {status && <p className="text-sm text-emerald-300">{status}</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </main>
  );
}
