import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Utility page object for navigating to detection pages with socket extensions
 *
 * Uses menu-based navigation to ensure reliability when URLs change.
 *
 * Supports testing Foundry extensions that appear in detection sockets:
 * - activity.detections.details (Endpoint Detections)
 * - xdr.detections.panel (XDR Detections)
 * - ngsiem.workbench.details (NGSIEM Incidents)
 */
export class SocketNavigationPage extends BasePage {
  constructor(page: Page) {
    super(page, 'Socket Navigation');
  }

  protected getPagePath(): string {
    throw new Error('Socket navigation does not have a direct path - use menu navigation');
  }

  protected async verifyPageLoaded(): Promise<void> {
  }

  /**
   * Navigate to Endpoint Detections page (activity.detections.details socket)
   * Uses menu navigation: Menu → Endpoint security → Monitor → Endpoint detections
   */
  async navigateToEndpointDetections(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to Endpoint Detections page');

        // Open the hamburger menu
        const menuButton = this.page.getByRole('button', { name: 'Menu' });
        await menuButton.click();
        await this.page.waitForLoadState('networkidle');

        // Click "Endpoint security"
        const endpointSecurityButton = this.page.getByRole('button', { name: /Endpoint security/i });
        await endpointSecurityButton.click();
        await this.waiter.delay(500);

        // Click "Monitor" to expand submenu (if not already expanded)
        const monitorButton = this.page.getByRole('button', { name: /^Monitor$/i });
        const isExpanded = await monitorButton.getAttribute('aria-expanded');
        if (isExpanded !== 'true') {
          await monitorButton.click();
          await this.waiter.delay(500);
        }

        // Click "Endpoint detections" link
        const endpointDetectionsLink = this.page.getByRole('link', { name: /Endpoint detections/i });
        await endpointDetectionsLink.click();

        // Wait for page to load
        await this.page.waitForLoadState('networkidle');

        // Verify we're on the detections page by looking for the page heading
        const pageTitle = this.page.locator('h1, h2').filter({ hasText: /Detections/i }).first();
        await expect(pageTitle).toBeVisible({ timeout: 10000 });

        this.logger.success('Navigated to Endpoint Detections page');
      },
      'Navigate to Endpoint Detections'
    );
  }

  /**
   * Navigate to XDR Detections page (xdr.detections.panel socket)
   * Uses menu navigation: Menu → Next-Gen SIEM → appropriate submenu → XDR detections
   * Note: Requires XDR SKU - may not be available in all environments
   */
  async navigateToXDRDetections(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to XDR Detections page (Incidents)');

        // Navigate to Foundry home first to ensure menu is available
        await this.navigateToPath('/foundry/home', 'Foundry home');
        await this.page.waitForLoadState('networkidle');

        // Open the hamburger menu
        const menuButton = this.page.getByRole('button', { name: 'Menu' });
        await menuButton.click();
        await this.page.waitForLoadState('networkidle');

        // Click "Next-Gen SIEM" in the menu (not the home page card)
        const ngsiemButton = this.page.getByTestId('popout-button').filter({ hasText: /Next-Gen SIEM/i });
        await ngsiemButton.click();
        await this.waiter.delay(500);

        // Click "Incidents" - use section-link selector to avoid the learn card
        
        const incidentsLink = this.page.getByTestId('section-link').filter({ hasText: /Incidents/i });
        await incidentsLink.click();

        await this.page.waitForLoadState('networkidle');

        const pageTitle = this.page.locator('h1, [role="heading"]').first();
        await expect(pageTitle).toBeVisible({ timeout: 10000 });

        this.logger.success('Navigated to XDR Detections page (Incidents)');
      },
      'Navigate to XDR Detections'
    );
  }

  /**
   * Navigate to NGSIEM Incidents page (ngsiem.workbench.details socket)
   * Uses menu navigation: Menu → Next-Gen SIEM → Incidents
   */
  async navigateToNGSIEMIncidents(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to NGSIEM Incidents page');

        // Navigate to Foundry home first to ensure menu is available
        await this.navigateToPath('/foundry/home', 'Foundry home');
        await this.page.waitForLoadState('networkidle');

        // Open the hamburger menu
        const menuButton = this.page.getByRole('button', { name: 'Menu' });
        await menuButton.click();
        await this.page.waitForLoadState('networkidle');

        // Click "Next-Gen SIEM" in the menu (not the home page card)
        const ngsiemButton = this.page.getByTestId('popout-button').filter({ hasText: /Next-Gen SIEM/i });
        await ngsiemButton.click();
        await this.waiter.delay(500);

        // Click "Incidents" - use section-link selector to avoid the learn card
        const incidentsLink = this.page.getByTestId('section-link').filter({ hasText: /Incidents/i });
        await incidentsLink.click();

        await this.page.waitForLoadState('networkidle');

        const pageTitle = this.page.locator('h1, [role="heading"]').first();
        await expect(pageTitle).toBeVisible({ timeout: 10000 });

        this.logger.success('Navigated to NGSIEM Incidents page');
      },
      'Navigate to NGSIEM Incidents'
    );
  }

  async openFirstDetection(): Promise<void> {
    return this.withTiming(
      async () => {
        await this.page.waitForLoadState('networkidle');

        // In the new Endpoint Detections UI, detections are represented as buttons in the table
        // Look for process/host information buttons
        const firstDetectionButton = this.page.locator('[role="gridcell"] button').first();
        await firstDetectionButton.waitFor({ state: 'visible', timeout: 10000 });
        await firstDetectionButton.click();

        // Wait for detection details to load
        await this.page.waitForLoadState('networkidle');
      },
      'Open first detection'
    );
  }

  async verifyExtensionInSocket(extensionName: string): Promise<void> {
    return this.withTiming(
      async () => {
        const extension = this.page.getByRole('tab', { name: new RegExp(extensionName, 'i') });
        await expect(extension).toBeVisible({ timeout: 10000 });
      },
      `Verify extension "${extensionName}" in socket`
    );
  }

  async clickExtensionTab(extensionName: string): Promise<void> {
    return this.withTiming(
      async () => {
        const extension = this.page.getByRole('tab', { name: new RegExp(extensionName, 'i') });
        await extension.click({ force: true });
      },
      `Click extension tab "${extensionName}"`
    );
  }
}
