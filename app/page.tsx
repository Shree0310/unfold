import { MoodboardGenerator } from '@/components/MoodboardGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent tracking-tight">
              Unfold
            </h1>
            <p className="text-lg text-amber-900 max-w-2xl mx-auto leading-relaxed">
              AI reasons, UI streams. Watch your creative vision unfold progressively
              as each design element arrives in real-time.
            </p>
            <p className="text-xs text-amber-700 font-medium tracking-wide">
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
