# Integration Guide: FingerprintManager in BBQE, CATSUP, RELISH

## Step 1: Update package.json (All 3 Apps)

Add the local dependency to each app's `package.json`:

```json
{
  "dependencies": {
    "@sauc-e/fingerprint-manager": "file:../../../libs/fingerprint-manager",
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  }
}
```

Then run:
```bash
npm install
```

---

## Step 2: Build the Library

From `libs/fingerprint-manager/`:
```bash
npm install
npm run build
```

This generates `dist/` with compiled JS + TypeScript declarations.

---

## Step 3: Integrate into Each App

### BBQE Web (`BBQ_e-(3,6,9)/web/src/`)

Find the component/file that calls `/api/bbqe/usage-status`. Add:

```typescript
import { FingerprintManager } from '@sauc-e/fingerprint-manager';

const fpManager = new FingerprintManager();

// When calling usage-status endpoint
const fingerprint = fpManager.getFingerprint();

const response = await fetch('/api/bbqe/usage-status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fingerprint })
});

const data = await response.json();
// data.usesRemaining will now reflect actual counter, not always 9
```

### CATSUP Web (`CATS_UP (3,6,9)/web/src/`)

Find the component/file that calls `/api/catsup/usage-status`. Add:

```typescript
import { FingerprintManager } from '@sauc-e/fingerprint-manager';

const fpManager = new FingerprintManager();

// When calling usage-status endpoint
const fingerprint = fpManager.getFingerprint();

const response = await fetch('/api/catsup/usage-status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fingerprint })
});

const data = await response.json();
// data.usesRemaining will now reflect actual counter, not always 9
```

### RELISH Web (`RELISH (3,6,9)/web/src/`)

Find the component/file that calls `/api/relish/usage-status`. Add:

```typescript
import { FingerprintManager } from '@sauc-e/fingerprint-manager';

const fpManager = new FingerprintManager();

// When calling usage-status endpoint
const fingerprint = fpManager.getFingerprint();

const response = await fetch('/api/relish/usage-status', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fingerprint })
});

const data = await response.json();
// data.usesRemaining will now reflect actual counter, not always 9
```

---

## Step 4: Test

1. **App 1 (BBQE):** Open in browser → counter shows 9 (or whatever state it's in)
2. **Refresh browser** → counter still shows same value (fingerprint persisted)
3. **Open in new browser/incognito** → counter resets to 9 (new fingerprint)
4. **Mobile:** Open app → counter shows 9 (or saved state)
5. **Close app, reopen** → counter shows same value (fingerprint persisted in localStorage)

---

## Step 5: Verify Backend Is Receiving Fingerprint

Check backend logs or add logging to see:
```
User fingerprint: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
uses_remaining: 8 (or whatever actual value is)
```

If `uses_remaining` is no longer always 9, the fix is working.

---

## Backend Behavior (No Changes Needed)

Backend will work as-is:

1. Receives fingerprint from frontend
2. Queries: `SELECT * FROM sauce_counter_users WHERE fingerprint = $1 AND app_name = $2`
3. If exists → returns existing user's uses_remaining
4. If not exists → creates new user with uses_remaining = 9

---

## Future Apps

For any new SAUC-E app:

1. Add `"@sauc-e/fingerprint-manager": "file:../../../libs/fingerprint-manager"` to package.json
2. Import and call `fpManager.getFingerprint()`
3. Include in API request to `/api/app-name/usage-status`

Done.
