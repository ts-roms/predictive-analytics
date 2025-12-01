import Dashboard from "./features/home/dashboard/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-linear-to-br from-blue-50 to-indigo-100">
      <Dashboard />
    </main>
  );
}