# @sauc-e/fingerprint-manager

Shared device fingerprinting library for SAUC-E applications (BBQE, CATSUP, RELISH).

## Purpose

Generates and persists a unique device fingerprint across browser sessions. Used to maintain consistent user identification for usage counters and API requests.

## Installation

Reference as a local npm package from each app:

```json
{
  "dependencies": {
    "@sauc-e/fingerprint-manager": "file:../../../libs/fingerprint-manager"
  }
}
```

Then:
```bash
npm install
```

## Usage

```typescript
import { FingerprintManager } from '@sauc-e/fingerprint-manager';

// Create instance
const fpManager = new FingerprintManager();

// Get fingerprint (generates once, reuses thereafter)
const fingerprint = fpManager.getFingerprint();

// Send to backend
const response = await fetch('/api/app-name/usage-status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fingerprint })
});

// Clear (for logout, testing)
fpManager.clear();
```

## How It Works

1. **First call**: Generates a unique UUID-based fingerprint
2. **Storage**: Persists in browser's `localStorage` under key `sauc-e-device-fingerprint`
3. **Reuse**: All subsequent calls return the same fingerprint
4. **Persistence**: Survives browser refresh, app restart, device reboot
5. **Reset**: Only cleared if user deletes localStorage or calls `.clear()`

## Build

```bash
npm run build
```

Outputs TypeScript + source maps to `dist/`.

## Future Apps

Any new SAUC-E app can import this library and use the same fingerprinting logic across the platform.
