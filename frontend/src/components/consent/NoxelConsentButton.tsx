import type { ButtonHTMLAttributes } from 'react';

export type ConsentCategory = 'necessary' | 'preferences' | 'analytics' | 'marketing';
export interface ConsentReceipt {
  schema: number; policyVersion: string; origin: string; createdAt: number; expiresAt: number;
  action: string; language: string; categories: Record<ConsentCategory, boolean>;
}
declare global {
  interface Window {
    NoxelConsent?: {
      open(): void; close(): void; acceptAll(): void; rejectAll(): void;
      has(category: ConsentCategory): boolean; getReceipt(): ConsentReceipt | null;
      register(service: {id: string; category: Exclude<ConsentCategory,'necessary'>; start(): void | (() => void); stop?(): void}): () => void;
      refresh(): Promise<void>; version: string;
      /** 1.1.0 : ajoute le choix courant à une adresse vers un autre site NOXEL. */
      relayUrl?(url: string): string;
    };
  }
}

/** The vanilla component must first be installed in Vite's index.html. */
export function NoxelConsentButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" data-noxel-consent-settings>
    {props.children || 'Préférences de confidentialité'}
  </button>;
}
