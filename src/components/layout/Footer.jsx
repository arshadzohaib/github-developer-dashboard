export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>
          DevPulse · GitHub Developer Analytics. Data provided by the{' '}
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-600 hover:underline"
          >
            GitHub REST API
          </a>
          .
        </p>
        <p>Not affiliated with GitHub.</p>
      </div>
    </footer>
  )
}
