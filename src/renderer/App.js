const React = require('react');
const { ipcRenderer } = require('electron'); // Import ipcRenderer

function App() {
  const [diagnosticsResult, setDiagnosticsResult] = React.useState('');

  const runDiagnostics = async () => {
    try {
      // Send a request to the main process to run diagnostics
      const result = await ipcRenderer.invoke('run-diagnostics');
      setDiagnosticsResult(result);
    } catch (error) {
      setDiagnosticsResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Hello, Electron!</h1>
      <button onClick={runDiagnostics}>Run Diagnostics</button>
      <pre>{diagnosticsResult}</pre>
    </div>
  );
}

module.exports = App;