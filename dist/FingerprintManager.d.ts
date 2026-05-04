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
export declare class FingerprintManager {
    private storageKey;
    private fingerprint;
    constructor(storageKey?: string);
    /**
     * Get the device fingerprint.
     * Returns existing fingerprint if available, otherwise generates and stores a new one.
     *
     * @returns Device fingerprint string (UUID-based, persisted)
     */
    getFingerprint(): string;
    /**
     * Clear the stored fingerprint (for logout, testing, etc.)
     */
    clear(): void;
    /**
     * Generate a unique fingerprint
     * Format: UUID + timestamp (base36) + random string
     *
     * @returns Generated fingerprint string
     */
    private generate;
    /**
     * Generate a UUID v4-style identifier
     *
     * @returns UUID string
     */
    private generateUUID;
    /**
     * Retrieve fingerprint from localStorage
     */
    private getFromStorage;
    /**
     * Store fingerprint in localStorage
     */
    private setInStorage;
    /**
     * Remove fingerprint from localStorage
     */
    private removeFromStorage;
}
//# sourceMappingURL=FingerprintManager.d.ts.map