import { useState } from 'react'
import Container from '../components/layout/Container.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import DeveloperInput from '../components/comparison/DeveloperInput.jsx'
import DeveloperComparison from '../components/comparison/DeveloperComparison.jsx'
import Skeleton from '../components/common/Skeleton.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import RateLimitState from '../components/common/RateLimitState.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useDeveloperData } from '../hooks/useDeveloperData.js'
import { isNotFoundError, isRateLimitError } from '../api/githubService.js'

export default function CompareDevelopers() {
  const [userA, setUserA] = useState('')
  const [userB, setUserB] = useState('')
  const dataA = useDeveloperData(userA || null)
  const dataB = useDeveloperData(userB || null)

  const bothReady =
    dataA.user && dataB.user && !dataA.loading && !dataB.loading && !dataA.error && !dataB.error

  return (
    <Container className="py-10">
      <PageHeader title="Compare Developers" subtitle="Put two GitHub developers side by side." />

      <div className="grid gap-4 md:grid-cols-2">
        <DeveloperInput label="Developer A" onSubmit={setUserA} loading={dataA.loading} />
        <DeveloperInput label="Developer B" onSubmit={setUserB} loading={dataB.loading} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SideStatus data={dataA} />
        <SideStatus data={dataB} />
      </div>

      {bothReady ? (
        <div className="mt-6">
          <DeveloperComparison developerA={dataA} developerB={dataB} />
        </div>
      ) : (
        !dataA.loading &&
        !dataB.loading &&
        !dataA.error &&
        !dataB.error && (
          <EmptyState
            className="mt-6"
            title="Add two developers to compare"
            description="Enter a GitHub username on each side and load both profiles to see a head-to-head comparison."
          />
        )
      )}
    </Container>
  )
}

function SideStatus({ data }) {
  if (data.loading) {
    return (
      <div className="card space-y-3 p-4">
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }
  if (data.error) {
    return isRateLimitError(data.error) ? (
      <RateLimitState message={data.error.message} />
    ) : (
      <ErrorState
        title={isNotFoundError(data.error) ? 'User not found' : 'Could not load profile'}
        message={data.error.message}
      />
    )
  }
  return null
}
