import { test as setup } from '../src/fixtures';

setup('install Functions with Python app', async ({ appCatalogPage, appName }) => {
  // Check if app is already installed (this navigates to the app page)
  const isInstalled = await appCatalogPage.isAppInstalled(appName);

  if (!isInstalled) {
    console.log(`App '${appName}' is not installed. Installing...`);
    const installed = await appCatalogPage.installApp(appName);

    if (!installed) {
      throw new Error(
        `Failed to install app '${appName}'. Please install the app manually at:\n` +
        `https://falcon.us-2.crowdstrike.com/foundry/app-catalog/179c33c7963e4b1fb33d1d2734e6c621\n` +
        `This is a known issue - see #ask-foundry for app installation problems.`
      );
    }
  } else {
    console.log(`App '${appName}' is already installed`);
  }
});
