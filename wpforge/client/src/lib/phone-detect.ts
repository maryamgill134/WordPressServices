import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/max";

export const SITE_DEFAULT_COUNTRY: CountryCode = "PK";

export type PhoneDetection = {
  country?: CountryCode;
  callingCode?: string;
  nationalDisplay: string;
  e164: string;
  valid: boolean;
};

export type CountryOption = {
  iso: CountryCode;
  name: string;
  dial: string;
};

const PINNED_COUNTRIES: CountryCode[] = ["PK", "US", "GB", "IN", "AU"];

function compactNumber(value: string) {
  return value.replace(/[\s().-]/g, "");
}

function toInternationalSource(value: string) {
  const compact = compactNumber(value.trim());
  if (compact.startsWith("00")) return `+${compact.slice(2)}`;
  if (compact.startsWith("+")) return compact;
  return `+${compact}`;
}

function nationalFromFormatted(formatted: string, callingCode: string) {
  return formatted.replace(new RegExp(`^\\+${callingCode}\\s*`), "").trim();
}

export function looksInternational(value: string) {
  const compact = compactNumber(value.trim());
  return compact.startsWith("+") || compact.startsWith("00");
}

export function toCountryCode(iso?: string | null): CountryCode | undefined {
  if (!iso) return undefined;
  const code = iso.toUpperCase();
  return isSupportedCountry(code) ? (code as CountryCode) : undefined;
}

export function countryLabel(country?: CountryCode) {
  if (!country) return "";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(country) ?? country;
  } catch {
    return country;
  }
}

export function emptyPrefix(country: CountryCode): PhoneDetection {
  return {
    country,
    callingCode: getCountryCallingCode(country),
    nationalDisplay: "",
    e164: "",
    valid: true,
  };
}

export function listCountries(): CountryOption[] {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const options: CountryOption[] = [];
  for (const iso of getCountries()) {
    try {
      options.push({
        iso,
        name: names.of(iso) ?? iso,
        dial: getCountryCallingCode(iso),
      });
    } catch {
      continue;
    }
  }
  const pinned = new Set(PINNED_COUNTRIES);
  const head = PINNED_COUNTRIES
    .map((iso) => options.find((item) => item.iso === iso))
    .filter((item): item is CountryOption => Boolean(item));
  const rest = options
    .filter((item) => !pinned.has(item.iso))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...head, ...rest];
}

export function detectInternational(value: string): PhoneDetection {
  const source = toInternationalSource(value);
  if (source === "+" || source === "") {
    return { nationalDisplay: source || value, e164: "", valid: false };
  }

  const typer = new AsYouType();
  const formatted = typer.input(source);
  const country = typer.getCountry();
  const callingCode = typer.getCallingCode();

  if (!callingCode) {
    return { nationalDisplay: formatted || value, e164: "", valid: false };
  }

  const parsed = parsePhoneNumberFromString(source);
  return {
    country,
    callingCode,
    nationalDisplay: nationalFromFormatted(formatted, callingCode),
    e164: parsed?.isValid() ? parsed.number : "",
    valid: parsed?.isValid() ?? false,
  };
}

export function detectLocal(value: string, defaultCountry: CountryCode): PhoneDetection {
  const country = toCountryCode(defaultCountry) ?? SITE_DEFAULT_COUNTRY;
  const callingCode = getCountryCallingCode(country);
  const typer = new AsYouType(country);
  const formatted = typer.input(value);
  const national = typer.getNationalNumber() ?? "";
  const parsed = parsePhoneNumberFromString(value, country);
  const nationalDisplay = national
    ? nationalFromFormatted(new AsYouType().input(`+${callingCode}${national}`), callingCode)
    : formatted || value;
  return {
    country,
    callingCode,
    nationalDisplay,
    e164: parsed?.isValid() ? parsed.number : "",
    valid: parsed?.isValid() ?? false,
  };
}

export function detectLockedNational(national: string, callingCode: string): PhoneDetection {
  return detectInternational(`+${callingCode}${compactNumber(national)}`);
}
