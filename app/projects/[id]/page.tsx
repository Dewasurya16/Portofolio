import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProjectDetail from '@/components/ProjectDetail'
import { projects } from '@/data/projects'

type ProjectPageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: String(project.id) }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((item) => item.id === Number(id))

  return project
    ? {
        title: `${project.title} — Dewa Sinar Surya`,
        description: project.description,
      }
    : { title: 'Proyek tidak ditemukan' }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((item) => item.id === Number(id))

  if (!project) notFound()

  return <ProjectDetail project={project} />
}
