import React, { useState, useContext } from 'react';
import { FalconApiContext } from '../contexts/falcon-api-context';
import { Link } from '../components/link';
import { SlInput } from '@shoelace-style/shoelace/dist/react';

function Home() {
  const { falcon } = useContext(FalconApiContext);

  // Extract user's first name from the username (assuming format: firstname.lastname)
  const username = falcon?.data?.user?.username || '';
  const firstName = username.split('.')[0] || '';
  const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const [name, setName] = useState(capitalizedFirstName);
  const [greeting, setGreeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGreeting = async () => {
    if (!name.trim()) {
      setError("Please enter a name first");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Call the hello function
      const helloFunction = falcon.cloudFunction({
        name: 'hello'
      });

      const response = await helloFunction.path('/hello')
        .post({ name: name });

      if (response.status_code !== 200) {
        throw new Error(`Function call failed: ${response.status_code} ${response.errors}`);
      }

      // Set the greeting from the response
      setGreeting(response.body.greeting);
    } catch (error) {
      console.error('Error calling function', error);
      const errorMessages = error.errors?.map(err => err.message || String(err)).join(', ');
      setError(`Error: ${errorMessages || 'Failed to get greeting'}`);
      setGreeting(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in the input field
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await fetchGreeting();
    }
  };

  return (
    <sl-card>
      <div slot="header">
        <strong>Foundry Functions Demo</strong>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p className="text-primary">
          👋 Hello, {username}!
        </p>

        <div>
          <label htmlFor="name-input" style={{display: 'block', marginBottom: '8px'}}>
            What name do you want to send to the function?
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <SlInput
              id="name-input"
              placeholder="Enter your name"
              value={name}
              onSlChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
              clearable
              style={{ flex: 1 }}
            ></SlInput>
            <sl-button
              variant="primary"
              onClick={fetchGreeting}
              disabled={loading}
            >
              {loading ?
                <sl-spinner></sl-spinner> :
                <sl-icon name="chat-square-text" slot="prefix"></sl-icon>
              }
              Say Hello
            </sl-button>
          </div>
        </div>

        {error && (
          <sl-alert variant="danger" open>
            <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
            {error}
          </sl-alert>
        )}

        {greeting && (
          <sl-card style={{ background: 'var(--sl-color-neutral-50)', border: '1px solid var(--sl-color-neutral-200)' }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <sl-icon name="chat-square-heart" style={{ marginRight: '8px' }}></sl-icon>
              {greeting}
            </div>
          </sl-card>
        )}

        <sl-divider></sl-divider>

        <div>
          <p style={{ marginBottom: '8px' }}>Explore more Falcon features:</p>
          <Link useFalconNavigation={true} to="/cloud-security">
            <sl-button variant="neutral" size="small">
              <sl-icon slot="prefix" name="cloudy"></sl-icon>
              Cloud Security
            </sl-button>
          </Link>
          <Link useFalconNavigation={true} to="/unified-detections">
            <sl-button variant="neutral" size="small" style={{ marginLeft: '8px' }}>
              <sl-icon slot="prefix" name="database"></sl-icon>
              Next-Gen SIEM
            </sl-button>
          </Link>
        </div>
      </div>

      <div slot="footer">
        <small>Powered by Falcon Foundry</small>
      </div>
    </sl-card>
  );
}

export { Home };
