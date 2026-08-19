"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Globe, Search } from "lucide-react";
import { getCountryCallingCode, type CountryCode } from "libphonenumber-js/max";
import {
  SITE_DEFAULT_COUNTRY,
  countryLabel,
  detectInternational,
  detectLocal,
  detectLockedNational,
  emptyPrefix,
  listCountries,
  looksInternational,
  toCountryCode,
  type PhoneDetection,
} from "@/lib/phone-detect";

function flagUrl(country: CountryCode) {
  return `https://flagcdn.com/w40/${country.toLowerCase()}.png`;
}

const countries = listCountries();

export function PhoneField({
  name = "phone",
  resetKey,
  onValidityChange,
}: {
  name?: string;
  resetKey?: number;
  onValidityChange?: (valid: boolean) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const pickedRef = useRef(false);
  const selectedRef = useRef<CountryCode>(SITE_DEFAULT_COUNTRY);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(SITE_DEFAULT_COUNTRY);
  const [inputValue, setInputValue] = useState("");
  const [detection, setDetection] = useState<PhoneDetection>(() => emptyPrefix(SITE_DEFAULT_COUNTRY));
  const [mode, setMode] = useState<"idle" | "local" | "international">("idle");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [finished, setFinished] = useState(false);

  const hasNumber = Boolean(inputValue.trim());
  const valid = !hasNumber || detection.valid;
  const showError = finished && !valid;
  const displayCountry = detection.country ?? selectedCountry;
  const displayCode = detection.callingCode ?? getCountryCallingCode(selectedCountry);
  selectedRef.current = selectedCountry;

  useEffect(() => {
    onValidityChange?.(valid);
  }, [valid, onValidityChange]);

  useEffect(() => {
    setInputValue("");
    setDetection(emptyPrefix(selectedRef.current));
    setMode("idle");
    setOpen(false);
    setQuery("");
    setFinished(false);
    pickedRef.current = false;
  }, [resetKey]);

  useEffect(() => {
    let active = true;
    fetch("https://ipwho.is/")
      .then((response) => response.json())
      .then((data: { country_code?: string }) => {
        if (!active || pickedRef.current || inputRef.current?.value.trim()) return;
        const country = toCountryCode(data.country_code);
        if (!country) return;
        setSelectedCountry(country);
        setDetection(emptyPrefix(country));
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const markFinished = () => setFinished(true);
    form.addEventListener("submit", markFinished, true);
    return () => form.removeEventListener("submit", markFinished, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointer = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return countries;
    return countries.filter((item) =>
      item.name.toLowerCase().includes(term)
      || item.dial.includes(term.replace("+", ""))
      || item.iso.toLowerCase().includes(term),
    );
  }, [query]);

  function applyDetection(next: PhoneDetection, nextMode: "idle" | "local" | "international", display: string) {
    setDetection(next);
    setMode(nextMode);
    setInputValue(display);
    if (next.country) setSelectedCountry(next.country);
  }

  function handleChange(value: string) {
    if (focused) setFinished(false);

    if (!value.trim()) {
      applyDetection(emptyPrefix(selectedRef.current), "idle", "");
      return;
    }

    if (looksInternational(value)) {
      const next = detectInternational(value);
      applyDetection(next, "international", next.nationalDisplay);
      return;
    }

    if (mode === "international" && detection.callingCode) {
      const next = detectLockedNational(value, detection.callingCode);
      applyDetection(next, "international", next.nationalDisplay);
      return;
    }

    const next = detectLocal(value, selectedRef.current);
    applyDetection(next, "local", next.nationalDisplay);
  }

  function selectCountry(iso: CountryCode) {
    pickedRef.current = true;
    setSelectedCountry(iso);
    setOpen(false);
    setQuery("");
    if (!inputValue.trim() || looksInternational(inputValue)) {
      applyDetection(emptyPrefix(iso), "idle", "");
      return;
    }
    const next = detectLocal(inputValue, iso);
    applyDetection(next, "local", next.nationalDisplay);
  }

  return (
    <div className={`phone-field-wrap${showError ? " is-invalid" : ""}`} ref={rootRef}>
      <div className={`phone-field${open || focused ? " is-open" : ""}${showError ? " is-invalid" : ""}`}>
        <button
          className="phone-field-trigger"
          type="button"
          aria-label={`Select country code, ${countryLabel(displayCountry)} +${displayCode}`}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((value) => !value)}
        >
          {detection.callingCode && !detection.country ? (
            <Globe />
          ) : (
            <img src={flagUrl(displayCountry)} alt="" width={20} height={14} />
          )}
          <span>+{displayCode}</span>
          <ChevronDown />
        </button>
        <span className="phone-field-divider" aria-hidden="true" />
        <input
          ref={inputRef}
          className="phone-field-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Enter a Valid WhatsApp Number"
          value={inputValue}
          aria-invalid={showError}
          aria-describedby={showError ? "phone-field-error" : undefined}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (hasNumber) setFinished(true);
          }}
        />
        {open && (
          <div className="phone-field-menu" role="listbox" aria-label="Country codes">
            <div className="phone-field-search">
              <Search />
              <input
                ref={searchRef}
                type="search"
                autoComplete="off"
                placeholder="Search country..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.preventDefault();
                }}
              />
            </div>
            <ul>
              {filtered.map((item) => (
                <li key={item.iso}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={item.iso === displayCountry}
                    onClick={() => selectCountry(item.iso)}
                  >
                    <img src={flagUrl(item.iso)} alt="" width={20} height={14} />
                    <span>{item.name}</span>
                    <small>+{item.dial}</small>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="phone-field-empty">No countries found</li>}
            </ul>
          </div>
        )}
      </div>
      {showError && (
        <p className="phone-field-error" id="phone-field-error">
          Please enter a valid WhatsApp number.
        </p>
      )}
      <input type="hidden" name={name} value={valid ? detection.e164 : ""} />
    </div>
  );
}
