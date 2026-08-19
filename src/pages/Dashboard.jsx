import { useParams } from 'react-router-dom'
import Container from '../components/layout/Container.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import ProfileCard from '../components/profile/ProfileCard.jsx'
import RepositoryStats from '../components/dashboard/RepositoryStats.jsx'
import RepositoryList from '../components/repositories/RepositoryList.jsx'
import LanguageDistribution from '../components/analytics/LanguageDistribution.jsx'
import ContributionActivity from '../components/analytics/ContributionActivity.jsx'
import DevPulseScore from '../components/analytics/DevPulseScore.jsx'
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import RateLimitState from '../components/common/RateLimitState.jsx'
import UserSwitch from '../components/dashboard/UserSwitch.jsx'
import { useDeveloperData } from '../hooks/useDeveloperData.js'
import { computeRepositoryStats } from '../utils/analytics.js'
import { isNotFoundError, isRateLimitError } from '../api/githubService.js'

export default function Dashboard() {
  const { username } = useParams()
  const { user, repos, events, loading, error, refetch } = useDeveloperData(username)

  const stats = repos.length ? computeRepositoryStats(repos) : null

  return (
    <Container className="py-10">
      <PageHeader
        title={`@${username}`}
        subtitle="GitHub developer analytics dashboard"
        actions={<UserSwitch initialUsername={username} />}
      />

      {loading && <DashboardSkeleton />}

      {!loading && error && (isRateLimitError(error) ? (
        <RateLimitState message={error.message} onRetry={refetch} />
      ) : (
        <ErrorState
          title={isNotFoundError(error) ? 'User not found' : 'Could not load profile'}
          message={error.message}
          onRetry={refetch}
        />
      ))}
      )}

      {!loading && !error && user && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <DevPulseScore user={user} repos={repos} events={events} />
            {stats && <RepositoryStats stats={stats} />}
            <LanguageDistribution repos={repos} />
            <ContributionActivity events={events} />
            <RepositoryList repos={repos} />
          </div>
        </div>
      )}
    </Container>
  )
}
