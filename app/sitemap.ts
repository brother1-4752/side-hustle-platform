import type { MetadataRoute } from 'next'
import hustleData from '@/data/side-hustles.json'
import type { SideHustle } from '@/types'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://side-hustle-platform.vercel.app'

const hustles = hustleData as SideHustle[]

export default function sitemap(): MetadataRoute.Sitemap {
  const hustleEntries: MetadataRoute.Sitemap = hustles.map((h) => ({
    url: `${BASE_URL}/side-hustle/${h.slug}`,
    lastModified: new Date(h.lastUpdated),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...hustleEntries,
  ]
}
