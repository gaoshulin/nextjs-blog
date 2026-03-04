function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
      {/* Tags */}
      <div className="flex gap-2">
        <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
      {/* Title */}
      <div className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
      {/* Excerpt */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-24 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
      {/* Header */}
      <header className="mb-8">
        <div className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-28 rounded mt-3 bg-gray-100 dark:bg-gray-800" />
      </header>

      {/* Search input */}
      <div className="h-10 w-full rounded-xl bg-gray-100 dark:bg-gray-800" />

      {/* Card grid */}
      <ul className="grid gap-6 sm:grid-cols-2 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i}>
            <CardSkeleton />
          </li>
        ))}
      </ul>
    </main>
  );
}
