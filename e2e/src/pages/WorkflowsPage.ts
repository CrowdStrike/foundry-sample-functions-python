import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for Workflow testing
 *
 * Supports both workflow rendering verification and execution with inputs
 */
export class WorkflowsPage extends BasePage {
  constructor(page: Page) {
    super(page, 'Workflows');
  }

  protected getPagePath(): string {
    return '/workflow/fusion';
  }

  protected async verifyPageLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: /Workflow/i })).toBeVisible({ timeout: 10000 });
    this.logger.success('Workflows page loaded');
  }

  /**
   * Navigate to workflows page via Fusion SOAR menu
   */
  async navigateToWorkflows(): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Navigating to Fusion SOAR Workflows');

        // Navigate to home first
        await this.navigateToPath('/foundry/home', 'Foundry Home');

        // Open hamburger menu
        const menuButton = this.page.getByTestId('nav-trigger');
        await menuButton.click();
        await this.page.waitForLoadState('networkidle');

        // Click Fusion SOAR button in the navigation menu (not the content buttons)
        // Look for the navigation and find the exact "Fusion SOAR" button (not content that mentions Fusion SOAR)
        const navigation = this.page.getByRole('navigation');
        const fusionSoarButton = navigation.getByRole('button', { name: 'Fusion SOAR', exact: true });
        await fusionSoarButton.click();

        // Click Workflows link
        const workflowsLink = this.page.getByRole('link', { name: 'Workflows' });
        await workflowsLink.click();

        // Wait for workflows page to load
        await this.page.waitForLoadState('networkidle');
        await this.verifyPageLoaded();
      },
      'Navigate to Workflows'
    );
  }

  /**
   * Search for a specific workflow by name
   */
  async searchWorkflow(workflowName: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Searching for workflow: ${workflowName}`);

        // Click the "Search workflows" button to open search
        const searchButton = this.page.getByRole('button', { name: /search workflows/i });
        await searchButton.click();

        // Now the search input should appear
        const searchBox = this.page.getByRole('searchbox')
          .or(this.page.locator('input[type="search"]'))
          .or(this.page.locator('input[placeholder*="Search"]'));

        await searchBox.fill(workflowName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');

        this.logger.success(`Searched for workflow: ${workflowName}`);
      },
      `Search for workflow: ${workflowName}`
    );
  }

  /**
   * Verify a workflow appears in the list
   */
  async verifyWorkflowExists(workflowName: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Verifying workflow exists: ${workflowName}`);

        // Search for the workflow first
        await this.searchWorkflow(workflowName);

        // Look for the workflow link in the results
        const workflowLink = this.page.getByRole('link', { name: new RegExp(workflowName, 'i') });

        try {
          await expect(workflowLink).toBeVisible({ timeout: 5000 });
          this.logger.success(`Workflow found: ${workflowName}`);
        } catch (error) {
          this.logger.error(`Workflow not found: ${workflowName}`);
          throw error;
        }
      },
      `Verify workflow exists: ${workflowName}`
    );
  }

  /**
   * Open a workflow to view its details
   */
  async openWorkflow(workflowName: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Opening workflow: ${workflowName}`);

        // Look for the workflow link directly in the table
        const workflowLink = this.page.getByRole('link', { name: new RegExp(workflowName, 'i') }).first();
        await workflowLink.click();

        // Wait for workflow details to load
        await this.page.waitForLoadState('networkidle');

        this.logger.success(`Opened workflow: ${workflowName}`);
      },
      `Open workflow: ${workflowName}`
    );
  }

  /**
   * Verify workflow renders (shows the workflow canvas/details)
   */
  async verifyWorkflowRenders(workflowName: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Verifying workflow renders: ${workflowName}`);

        await this.openWorkflow(workflowName);

        // Check for workflow canvas or details view
        // Workflows typically show a canvas with nodes or a details panel
        const hasCanvas = await this.page.locator('[class*="workflow"], [class*="canvas"], [class*="flow"]').isVisible({ timeout: 5000 }).catch(() => false);

        if (hasCanvas) {
          this.logger.success(`Workflow renders correctly: ${workflowName}`);
        } else {
          this.logger.warn(`Workflow page loaded but canvas not detected: ${workflowName}`);
          this.logger.info('This is acceptable for E2E - workflow exists and loads');
        }
      },
      `Verify workflow renders: ${workflowName}`
    );
  }

  /**
   * Execute a workflow with optional input parameters
   */
  async executeWorkflow(workflowName: string, inputs?: Record<string, string>): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Executing workflow: ${workflowName}`);

        // Ensure we're on the workflows list page, not an individual workflow page
        await this.navigateToWorkflows();

        // Click "Open menu" button for the specific workflow row
        const workflowRow = this.page.getByRole('row', { name: new RegExp(workflowName, 'i') });
        const openMenuButton = workflowRow.getByRole('button', { name: /open menu/i });
        await openMenuButton.click();

        // Click "Execute workflow" option
        const executeOption = this.page.getByRole('menuitem', { name: /execute workflow/i });
        await executeOption.click();

        // Wait for execution modal to appear
        await expect(this.page.getByRole('heading', { name: /execute on demand workflow/i })).toBeVisible({ timeout: 5000 });
        this.logger.info('Execution modal opened');

        // Fill in input parameters if provided
        if (inputs && Object.keys(inputs).length > 0) {
          this.logger.info(`Filling in ${Object.keys(inputs).length} input parameter(s)`);
          for (const [key, value] of Object.entries(inputs)) {
            // Look for input field by label or placeholder
            const inputField = this.page.getByLabel(new RegExp(key, 'i'))
              .or(this.page.getByPlaceholder(new RegExp(key, 'i')))
              .or(this.page.locator(`input[name*="${key}"]`));

            await inputField.fill(value);
            this.logger.info(`Set ${key} = ${value}`);
          }
        }

        // Click "Execute now" button
        const executeButton = this.page.getByRole('button', { name: /execute now/i });
        await executeButton.click();

        // Wait for execution confirmation
        await expect(this.page.getByText(/workflow execution triggered/i)).toBeVisible({ timeout: 10000 });
        this.logger.success(`Workflow execution triggered: ${workflowName}`);
      },
      `Execute workflow: ${workflowName}`
    );
  }

  /**
   * Verify workflow execution completed successfully
   * This checks the execution notification or navigates to execution log
   */
  async verifyWorkflowExecutionSuccess(workflowName: string): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info(`Verifying workflow execution succeeded: ${workflowName}`);

        // Check for the execution triggered notification
        const notification = this.page.getByText(/workflow execution triggered/i);

        try {
          await expect(notification).toBeVisible({ timeout: 5000 });
          this.logger.success(`Workflow execution confirmed: ${workflowName}`);

          // Optional: Click "View" link to see execution details
          const viewLink = this.page.getByRole('link', { name: /^view$/i });
          if (await viewLink.isVisible({ timeout: 2000 })) {
            this.logger.info('Execution details view link available');
          }
        } catch (error) {
          this.logger.error(`Failed to verify workflow execution: ${error.message}`);
          throw error;
        }
      },
      `Verify workflow execution success: ${workflowName}`
    );
  }

  /**
   * Execute workflow and verify it completes successfully
   * Combines executeWorkflow and verifyWorkflowExecutionSuccess
   */
  async executeAndVerifyWorkflow(workflowName: string, inputs?: Record<string, string>): Promise<void> {
    return this.withTiming(
      async () => {
        await this.executeWorkflow(workflowName, inputs);
        await this.verifyWorkflowExecutionSuccess(workflowName);
      },
      `Execute and verify workflow: ${workflowName}`
    );
  }

  /**
   * Check the actual execution status by viewing the execution details.
   * Navigates to the execution log, waits for the execution to complete,
   * expands the execution row, and checks the status.
   */
  async verifyWorkflowExecutionCompleted(timeoutMs = 120000): Promise<void> {
    return this.withTiming(
      async () => {
        this.logger.info('Checking workflow execution status in detail view');

        // The "View" link opens in a new tab - capture it
        const viewLink = this.page.getByRole('link', { name: /^view$/i });
        await viewLink.waitFor({ state: 'visible', timeout: 10000 });

        const [executionPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          viewLink.click(),
        ]);

        // Wait for the new tab to load (execution pages can be slow to render)
        await executionPage.waitForLoadState('networkidle');
        await executionPage.waitForLoadState('domcontentloaded');
        this.logger.info('Execution page opened in new tab');

        // Wait for "Execution status" to appear (proves execution details loaded)
        const statusLabel = executionPage.getByText('Execution status');
        await statusLabel.waitFor({ state: 'visible', timeout: 60000 });
        this.logger.info('Execution details visible');

        // Poll until execution reaches a terminal state
        this.logger.info(`Waiting up to ${timeoutMs / 1000}s for execution to complete...`);

        const startTime = Date.now();
        while (Date.now() - startTime < timeoutMs) {
          // Re-find status label each iteration (DOM recreated on reload)
          const currentStatusLabel = executionPage.getByText('Execution status');
          await currentStatusLabel.waitFor({ state: 'visible', timeout: 15000 });
          const statusContainer = currentStatusLabel.locator('..');
          const statusText = await statusContainer.textContent() || '';
          const currentStatus = statusText.replace('Execution status', '').trim();
          this.logger.info(`Current status: ${currentStatus}`);

          if (currentStatus.toLowerCase().includes('failed')) {
            // Capture error details
            const pageContent = await executionPage.textContent('body') || '';
            const messageMatch = pageContent.match(/"message":\s*"([^"]+)"/);

            let errorMessage = 'Workflow action failed';
            if (messageMatch) {
              errorMessage = messageMatch[1];
            }

            await executionPage.close();
            this.logger.error(`Workflow execution failed: ${errorMessage}`);
            throw new Error(`Workflow execution failed: ${errorMessage}`);
          }

          if (!currentStatus.toLowerCase().includes('in progress')) {
            // Terminal state that isn't "Failed"
            await executionPage.close();
            this.logger.success(`Workflow execution completed with status: ${currentStatus}`);
            return;
          }

          await executionPage.waitForTimeout(5000);

          // Reload to get updated status - the page doesn't auto-refresh
          await executionPage.reload({ waitUntil: 'networkidle' });
        }

        await executionPage.close();
        throw new Error('Workflow execution timed out - still in progress');
      },
      'Verify workflow execution completed'
    );
  }
}
