import Image from "next/image";
import Link from "next/link";


export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-12 animate-fade-in">
        Employee Performance Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Card: Train Model */}
        <TrainingModelCard />

        {/* Card: Predict Performance */}
        <PredictPerformanceCard />

      </div>
    </div>
  )
}

function TrainingModelCard() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Image
        src="/train-model-icon.svg" // Create this SVG or use another icon
        alt="Train Model"
        width={120}
        height={120}
        className="mb-6 opacity-80"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Train New Predictive Model
      </h2>
      <p className="text-gray-600 mb-6">
        Upload historical data to train a new AI model for performance prediction.
      </p>
      <Link href="/train-model">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg">
          Upload & Train Data
        </button>
      </Link>
    </div>
  )
}

function PredictPerformanceCard() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Image
        src="/predict-icon.svg" // Create this SVG or use another icon
        alt="Predict Performance"
        width={120}
        height={120}
        className="mb-6 opacity-80"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Get Employee Performance Prediction
      </h2>
      <p className="text-gray-600 mb-6">
        Input current employee metrics for an instant performance forecast.
      </p>
      <Link href="/predict-performance">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg">
          Predict Performance Score
        </button>
      </Link>
    </div>
  )
}