import { test, expect } from '../src/fixtures';

test.describe('Functions with Python - E2E Tests', () => {
  test('should render Hello UI extension', async ({ helloExtensionPage }) => {
    await helloExtensionPage.navigateToExtension();
    await helloExtensionPage.verifyExtensionRenders();
  });

  test('should execute Test hello function workflow', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.executeAndVerifyWorkflow('Test hello function');
  });

  test('should execute Test log-event function workflow', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.executeAndVerifyWorkflow('Test log-event function');
  });

  test('should execute Test host-details function workflow', async ({ workflowsPage, hostManagementPage }) => {
    // Get first available host ID
    const hostId = await hostManagementPage.getFirstHostId();

    if (!hostId) {
      test.skip(true, 'Skipping: No hosts available in CID');
      return;
    }

    // Execute workflow with host ID parameter
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.executeAndVerifyWorkflow('Test host-details function', {
      'Host ID': hostId
    });
  });

  test('should render Test servicenow function workflow (without execution)', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.verifyWorkflowRenders('Test servicenow function');
  });
});
