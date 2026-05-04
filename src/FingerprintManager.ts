/**
 * FingerprintManager.ts
 *
 * Generates and persists a unique device fingerprint across sessions.
 * Used by all SAUC-E apps to maintain consistent user identification.
 *
 * Fingerprint is stored in localStorage and survives:
 * - Browser refresh
 * - App restart
 * - Device reboot
 *
 * Fingerprint is reset only if:
 * - User clears browser localStorage
 * - User calls .clear()
 */

export class FingerprintManager {
  private storageKey: string;
  private fingerprint: string | null = null;

  constructor(storageKey: string = 'sauc-e-device-fingerprint') {
    this.storageKey = storageKey;
  }

  /**
   * Get the device fingerprint.
   * Returns existing fingerprint if available, otherwise generates and stores a new one.
   *
   * @returns Device fingerprint string (UUID-based, persisted)
   */
  public getFingerprint(): string {
    // Return cached value if available
    if (this.fingerprint) {
      return this.fingerprint;
    }

    // Check localStorage
    const stored = this.getFromStorage();
    if (stored) {
      this.fingerprint = stored;
      return stored;
    }

    // Generate and store new fingerprint
    const newFingerprint = this.generate();
    this.setInStorage(newFingerprint);
    this.fingerprint = newFingerprint;

    return newFingerprint;
  }

  /**
   * Clear the stored fingerprint (for logout, testing, etc.)
   */
  public clear(): void {
    this.removeFromStorage();
    this.fingerprint = null;
  }

  /**
   * Generate a unique fingerprint
   * Format: UUID + timestamp (base36) + random string
   *
   * @returns Generated fingerprint string
   */
  private generate(): string {
    const uuid = this.generateUUID();
    const timestamp = Date.now().toString(36); // Compact timestamp
    const random = Math.random().toString(36).substring(2, 15);

    return `${uuid}-${timestamp}-${random}`;
  }

  /**
   * Generate a UUID v4-style identifier
   *
   * @returns UUID string
   */
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Retrieve fingerprint from localStorage
   */
  private getFromStorage(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (err) {
      console.warn('[FingerprintManager] Failed to read from localStorage:', err);
      return null;
    }
  }

  /**
   * Store fingerprint in localStorage
   */
  private setInStorage(fingerprint: string): void {
    try {
      localStorage.setItem(this.storageKey, fingerprint);
    } catch (err) {
      console.warn('[FingerprintManager] Failed to write to localStorage:', err);
    }
  }

  /**
   * Remove fingerprint from localStorage
   */
  private removeFromStorage(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (err) {
      console.warn('[FingerprintManager] Failed to remove from localStorage:', err);
    }
  }
}
