// app/train-model/page.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function TrainModelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [trainingResult, setTrainingResult] = useState<{ accuracy: number; features: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setTrainingResult(null); // Reset result on new file selection
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
      setTrainingResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('data', file);

    try {
      const response = await fetch(`${BACKEND_URL}/ml/train`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to train model');
      }

      const data = await response.json();
      setTrainingResult(data);
      toast.success('Model trained successfully!');
    } catch (error: any) {
      console.error('Training error:', error);
      toast.error(error.message || 'Error training model.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
         fileInputRef.current.value = ''; // Clear file input
      }
      setFile(null); // Clear selected file
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-linear-to-br from-purple-50 to-pink-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Train New Predictive Model
        </h1>

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200 mb-6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
          />
          {file ? (
            <p className="text-lg text-gray-700 font-medium">
              Selected file: <span className="text-blue-600">{file.name}</span>
            </p>
          ) : (
            <p className="text-lg text-gray-500">
              Drag & drop your CSV/Excel file here, or{' '}
              <span className="text-blue-600 font-medium">click to browse</span>
            </p>
          )}
          <p className="text-sm text-gray-400 mt-2">
            Supported formats: .csv, .xls, .xlsx | Max file size: 10MB
          </p>
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm mb-2">Data Requirements:</p>
          <ul className="list-disc list-inside text-left inline-block text-gray-500 text-sm">
            <li>File must be CSV or Excel (XLSX).</li>
            <li>Must contain columns: PAA, KSM, TS, CM, AL, GO, GEN AVG.</li>
            <li>GEN AVG column will be predicted.</li>
            <li>At least 100 rows of historical data recommended.</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-200"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Training Model...' : 'Start Training Model'}
          </button>
        </div>

        {trainingResult && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Training Complete!</h2>
            <p className="text-xl font-bold text-blue-700">Accuracy: {trainingResult.accuracy.toFixed(2)}%</p>
            <p className="text-gray-600 mt-2">Model trained successfully based on provided data.</p>
            <p className="text-gray-500 text-sm mt-1">Features used: {trainingResult.features.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}