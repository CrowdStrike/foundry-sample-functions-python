# Foundry Sample with Python Functions

This sample is designed to show you how to use Python Functions in Falcon Foundry.

It contains several Python functions that show you how to:

- Integrate with workflows
- Use FalconPy
- Use FalconPy to invoke an API Integration
- Use FalconPy to store data in a collection
- Share code between functions

When you install this app, you will be prompted for ServiceNow credentials. You can create a developer account at <https://developer.servicenow.com>. Your configuration should look similar to the following. 

![ServiceNow Configuration](images/snow.png)

> If you'd rather not create an account, just fill in fake values when installing. You won't be able to test the ServiceNow API integration nor invoke the servicenow function if you use fake values.

After installing the app, go to **Fusion SOAR** > **Workflows** to see the Test workflows for functions. Execute the **Test hello function** workflow to ensure it works. The host-details one won't succeed unless you change its `host_id` value to match a host in your CID. 
