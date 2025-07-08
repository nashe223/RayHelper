import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

const SystemDiagnostics = () => {
  const [diagnosticsResult, setDiagnosticsResult] = useState('');

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">System Diagnostics</h2>
      <button
        onClick={runDiagnostics}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Run Diagnostics
      </button>
      <div className="mt-4">
        <pre className="bg-gray-100 p-4 rounded">{diagnosticsResult}</pre>
      </div>
    </div>
  );
};

export default SystemDiagnostics;

