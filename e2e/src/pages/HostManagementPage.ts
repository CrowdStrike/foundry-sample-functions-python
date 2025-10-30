import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for Host Management
 *
 * Used to retrieve host IDs for workflow testing
 */
export class HostManagementPage extends BasePage {
  constructor(page: Page) {
    super(page, 'Host Management');
  }

  protected getPagePath(): string {
    return '/hosts/hosts';
  }

  protected async verifyPageLoaded(): Promise<void> {
    // Check for either "Host management" heading or "Host setup and management"
    const heading = this.page.getByRole('heading', { name: /host.*management/i }).first();
    await expect(heading).toBeVisible({ timeout: 10000 });
    this.logger.success('Host management page loaded');
  }

  /**
   * Navigate to host management page
   */
  async navigateToHostManagement(): Promise<void> {
    return this.withTiming(
      async () => {
        await this.navigateToPath(this.getPagePath(), 'Host management page');
        await this.verifyPageLoaded();
      },
      'Navigate to Host Management'
    );
  }

  /**
   * Get the first available host ID from the host list
   * Returns null if no hosts are found
   */
  async getFirstHostId(): Promise<string | null> {
    return this.withTiming(
      async () => {
        this.logger.info('Retrieving first host ID from host management');

        await this.navigateToHostManagement();

        // Wait for host table to load
        await this.page.waitForLoadState('networkidle');

        // Wait for the hostname column to appear
        await this.page.getByText('Hostname').first().waitFor({ state: 'visible', timeout: 10000 });

        // Look for any text content matching the 32-character hex ID pattern
        try {
          // Use evaluate to search the DOM for text matching host ID pattern
          const hostId = await this.page.evaluate(() => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            const pattern = /^[a-f0-9]{32}$/i;

            let node;
            while (node = walker.nextNode()) {
              const text = node.textContent?.trim() || '';
              if (pattern.test(text)) {
                return text;
              }
            }
            return null;
          });

          if (hostId) {
            this.logger.success(`Found host ID: ${hostId}`);
            return hostId;
          }

          this.logger.warn('No valid host ID found on page');
          return null;
        } catch (error) {
          this.logger.warn(`Failed to find host ID: ${error.message}`);
          this.logger.info('This may indicate no hosts are available in the CID');
          return null;
        }
      },
      'Get first host ID'
    );
  }

  /**
   * Check if any hosts exist in the CID
   */
  async hasHosts(): Promise<boolean> {
    return this.withTiming(
      async () => {
        await this.navigateToHostManagement();

        // Check for "no hosts" message or empty table
        const noHostsMessage = this.page.getByText(/no hosts found|no data/i);
        const hasNoHostsMessage = await noHostsMessage.isVisible({ timeout: 3000 }).catch(() => false);

        if (hasNoHostsMessage) {
          this.logger.info('No hosts found in CID');
          return false;
        }

        // Check if table has rows
        const hostRows = this.page.locator('tbody tr');
        const rowCount = await hostRows.count();

        if (rowCount > 0) {
          this.logger.success(`Found ${rowCount} host(s) in CID`);
          return true;
        } else {
          this.logger.info('No hosts found in CID');
          return false;
        }
      },
      'Check if hosts exist'
    );
  }
}
