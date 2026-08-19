import Container from '../components/layout/Container.jsx'
import UserSearch from '../components/search/UserSearch.jsx'

export default function Home() {
  return (
    <Container className="relative overflow-hidden py-16 sm:py-24">
      <div
        className="absolute inset-0 -z-10 bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url('/icons8-github-400.png')` }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-2xl text-center">
        <span className="badge bg-brand-100 text-brand-700">GitHub Developer Analytics</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Understand any developer's footprint
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Search a GitHub username to get a detailed analytics dashboard — profile stats, language
          distribution, repository health, and a DevPulse score.
        </p>
      </div>

      <div className="mt-10">
        <UserSearch />
      </div>
    </Container>
  )
}
