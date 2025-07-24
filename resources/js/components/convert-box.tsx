import React, { useState } from 'react';

const ConvertBox: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const [convertedData, setConvertedData] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  // Fungsi untuk mengonversi data menjadi format koma
  const handleConvert = () => {
    setIsConverting(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const lines = inputData
        .split('\n') // Pecah berdasarkan baris
        .map(line => line.trim()) // Trim tiap baris
        .filter(line => line !== ''); // Hapus baris kosong

      setConvertedData(lines.join(',')); // Gabungkan dengan koma
      setIsConverting(false);
    }, 200);
  };

  // Fungsi untuk menyalin ke clipboard dengan fallback
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(convertedData)
        .then(() => {
          // Create a temporary notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm z-50 animate-fade-in';
          notification.textContent = 'Copied to clipboard!';
          document.body.appendChild(notification);
          
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
        })
        .catch(err => console.error('Gagal menyalin:', err));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = convertedData;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      // Fallback notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm z-50';
      notification.textContent = 'Copied!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 2000);
    }
  };

  const handleClear = () => {
    setInputData('');
    setConvertedData('');
  };

  return (
    <div className="h-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Text Converter</h2>
        <p className="text-gray-600 text-sm">Convert line-separated text to comma-separated format</p>
      </div>

      <div className="space-y-4">
        {/* Input Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">
            Input Data
          </label>
          <textarea
            className="w-full h-32 px-3 py-2 bg-gray-50 border border-gray-300 text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 resize-none"
            placeholder="Enter your data here...&#10;One item per line"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <p className="text-gray-500 text-xs">Enter each item on a new line</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
            onClick={handleConvert}
            disabled={!inputData.trim() || isConverting}
          >
            {isConverting ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Converting</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>Convert</span>
              </div>
            )}
          </button>
          
          {(inputData || convertedData) && (
            <button
              className="px-3 py-2 bg-gray-400 text-white text-sm font-medium hover:bg-gray-500 transition-all duration-200"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>

        {/* Output Section */}
        {convertedData && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">
                Converted Result
              </label>
              <button
                className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                onClick={handleCopy}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
            
            <div className="bg-gray-50 border border-gray-300 p-3 max-h-32 overflow-y-auto">
              <p className="text-sm text-gray-900 break-all leading-relaxed font-mono">
                {convertedData}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {convertedData.split(',').length} items converted
              </span>
              <span>
                {convertedData.length} characters
              </span>
            </div>
          </div>
        )}

        {/* Usage Guide */}
        {!inputData && !convertedData && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">How to use:</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Enter each item on a separate line</li>
              <li>• Click "Convert" to join them with commas</li>
              <li>• Use "Copy" to copy the result to clipboard</li>
            </ul>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `
      }} />
    </div>
  );
};

export default ConvertBox;