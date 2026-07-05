import { MoodboardGenerator } from '@/components/MoodboardGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Unfold
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI reasons, UI streams. Watch your creative vision unfold progressively
              as each design element arrives in real-time.
            </p>
            <p className="text-sm text-gray-500">
              Powered by React Server Components + Vercel AI SDK
            </p>
          </div>

          {/* Moodboard Generator */}
          <MoodboardGenerator />
        </div>
      </div>
    </main>
  );
}
