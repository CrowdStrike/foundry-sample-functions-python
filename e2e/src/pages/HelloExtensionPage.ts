import { Page, expect, FrameLocator } from '@playwright/test';
import { SocketNavigationPage } from './SocketNavigationPage';

/**
 * Page object for testing the "hello" UI extension
 * Extension appears in activity.detections.details socket
 */
export class HelloExtensionPage extends SocketNavigationPage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToExtension(): Promise<void> {
    return this.withTiming(
      async () => {
        // Navigate to endpoint detections (activity.detections.details socket)
        await this.navigateToEndpointDetections();

        // Open first detection to show details panel with extensions
        await this.openFirstDetection();

        // Wait for detection details panel
        await this.page.waitForLoadState('networkidle');

        this.logger.success('Navigated to detection with hello extension');
      },
      'Navigate to Hello Extension'
    );
  }

  async verifyExtensionRenders(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Verifying hello extension renders');

        // Wait for detection details panel to load
        await this.page.waitForLoadState('networkidle');

        // Extensions in detection details are expandable buttons at the bottom
        // Just look for a button named "hello" (it may or may not have aria-expanded)
        const extensionButton = this.page.getByRole('button', { name: 'hello', exact: true });

        // Scroll the button into view if needed
        await extensionButton.scrollIntoViewIfNeeded({ timeout: 10000 });
        this.logger.info('Scrolled to hello extension button');

        // Wait for button to be visible
        await expect(extensionButton).toBeVisible({ timeout: 10000 });
        this.logger.info('Found hello extension button');

        // Check if already expanded, if not click to expand
        const isExpanded = await extensionButton.getAttribute('aria-expanded');
        if (isExpanded === 'false') {
          await extensionButton.click();
          this.logger.info('Clicked to expand hello extension');
        } else {
          this.logger.info('hello extension already expanded');
        }

        // Verify iframe loads
        await expect(this.page.locator('iframe')).toBeVisible({ timeout: 15000 });
        this.logger.info('Extension iframe loaded');

        // Verify iframe content
        const iframe: FrameLocator = this.page.frameLocator('iframe');

        // Check for "Foundry Functions Demo" text
        await expect(iframe.getByText(/Foundry Functions Demo/i)).toBeVisible({ timeout: 10000 });

        // Check for Hello greeting - use .first() to handle multiple matches
        await expect(iframe.getByText(/Hello.*@/i).first()).toBeVisible();

        this.logger.success('hello extension renders correctly with expected content');
      },
      'Verify hello extension renders'
    );
  }
}
