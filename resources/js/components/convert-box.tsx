import React, { useState } from 'react';

const ConvertBox: React.FC = () => {
  const [inputData, setInputData] = useState('');
  const [convertedData, setConvertedData] = useState('');

  // Fungsi untuk mengonversi data menjadi format koma
  const handleConvert = () => {
    const lines = inputData
      .split('\n') // Pecah berdasarkan baris
      .map(line => line.trim()) // Trim tiap baris
      .filter(line => line !== ''); // Hapus baris kosong

    setConvertedData(lines.join(',')); // Gabungkan dengan koma
  };

  // Fungsi untuk menyalin ke clipboard dengan fallback
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(convertedData)
        .then(() => alert('Hasil berhasil disalin ke clipboard!'))
        .catch(err => console.error('Gagal menyalin:', err));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = convertedData;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Copied');
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Convert Box</h2>
      <textarea
        className="w-full h-40 p-2 border rounded text-sm"
        placeholder="Masukkan data Anda di sini..."
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleConvert}
      >
        Convert
      </button>

      {convertedData && (
        <div className="mt-4 p-3 bg-gray-100 border rounded relative">
          <button
            className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-700"
            onClick={handleCopy}
          >
            Copy
          </button>
          <strong>Hasil:</strong>
          <p className="whitespace-pre-wrap break-words max-h-40 overflow-y-auto">{convertedData}</p>
        </div>
      )}
    </div>
  );
};

export default ConvertBox;
