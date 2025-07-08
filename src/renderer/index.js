const { ipcRenderer } = require('electron');

// Create a dropdown for commands
const commandSelect = document.createElement('select');
commandSelect.innerHTML = `
  <option value="brew --version">Check Brew Version</option>
  <option value="node --version">Check Node Version</option>
  <option value="git --version">Check Git Version</option>
  <option value="python --version">Check Python Version</option>
`;
commandSelect.style.marginBottom = '20px';

// Create a button to run the selected command
const button = document.createElement('button');
button.textContent = 'Run Diagnostics';
button.style.padding = '10px 20px';
button.style.fontSize = '16px';
button.style.backgroundColor = '#007bff';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.marginBottom = '20px';

// Create a pre element to display the result
const resultElement = document.createElement('pre');
resultElement.style.whiteSpace = 'pre-wrap';

// Create a loading spinner
const spinner = document.createElement('div');
spinner.textContent = 'Loading...';
spinner.style.display = 'none'; // Hide by default

// Add a click event listener to the button
button.addEventListener('click', async () => {
  const command = commandSelect.value; // Get the selected command
  try {
    // Show the spinner
    spinner.style.display = 'block';
    resultElement.textContent = ''; // Clear previous result

    const result = await ipcRenderer.invoke('run-diagnostics', command);
    resultElement.textContent = result;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  } finally {
    // Hide the spinner
    spinner.style.display = 'none';
  }
});

// Append the dropdown, button, spinner, and result element to the root element
const rootElement = document.getElementById('root');
rootElement.appendChild(commandSelect);
rootElement.appendChild(button);
rootElement.appendChild(spinner);
rootElement.appendChild(resultElement);