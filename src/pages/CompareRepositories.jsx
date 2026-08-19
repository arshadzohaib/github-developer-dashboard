import { useState } from 'react'
import Container from '../components/layout/Container.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import RepositoryInput from '../components/comparison/RepositoryInput.jsx'
import RepositoryComparison from '../components/comparison/RepositoryComparison.jsx'
import Skeleton from '../components/common/Skeleton.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import RateLimitState from '../components/common/RateLimitState.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import { useRepositoryData } from '../hooks/useRepositoryData.js'
import { isNotFoundError, isRateLimitError } from '../api/githubService.js'

export default function CompareRepositories() {
  const [slugA, setSlugA] = useState('')
  const [slugB, setSlugB] = useState('')
  const dataA = useRepositoryData(slugA || null)
  const dataB = useRepositoryData(slugB || null)

  const bothReady =
    dataA.repo && dataB.repo && !dataA.loading && !dataB.loading && !dataA.error && !dataB.error

  return (
    <Container className="py-10">
      <PageHeader title="Compare Repositories" subtitle="Put two repositories side by side." />

      <div className="grid gap-4 md:grid-cols-2">
        <RepositoryInput label="Repository A" onSubmit={setSlugA} loading={dataA.loading} />
        <RepositoryInput label="Repository B" onSubmit={setSlugB} loading={dataB.loading} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <SideStatus data={dataA} />
        <SideStatus data={dataB} />
      </div>

      {bothReady ? (
        <div className="mt-6">
          <RepositoryComparison repositoryA={dataA} repositoryB={dataB} />
        </div>
      ) : (
        !dataA.loading &&
        !dataB.loading &&
        !dataA.error &&
        !dataB.error && (
          <EmptyState
            className="mt-6"
            title="Add two repositories to compare"
            description="Enter each repository as owner/repo (e.g. facebook/react) and load both to see a head-to-head comparison."
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
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }
  if (data.error) {
    return isRateLimitError(data.error) ? (
      <RateLimitState message={data.error.message} />
    ) : (
      <ErrorState
        title={isNotFoundError(data.error) ? 'Repository not found' : 'Could not load repository'}
        message={data.error.message}
      />
    )
  }
  return null
}
