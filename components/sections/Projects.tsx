'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code } from 'lucide-react'
import { projectsData } from '@/data/projects'
import { personalInfo } from '@/data/personal'

export default function Projects() {
  const { projects } = personalInfo
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            <span>
              {projects.heading.split(' ').slice(0, -1).join(' ')}{' '}
            </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              {projects.heading.split(' ').slice(-1)[0]}
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-16 text-lg">
            {projects.subheading}
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, i) => {
              const isExpanded = expandedId === project.id

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-xl"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />

                    {/* Fallback */}
                    <div
                      className={`hidden absolute inset-0 bg-gradient-to-br ${project.gradient} items-center justify-center`}
                    >
                      <Code className="w-16 h-16 text-white/50" />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-cyan-500 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description (Expandable) */}
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 72 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {(isExpanded
                          ? project.description
                          : project.description.slice(0, 2)
                        ).map((point, idx) => (
                          <li
                            key={`${project.id}-${idx}-${point.slice(0, 10)}`}
                          >
                            • {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Read More / Less */}
                    {project.description.length > 2 && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : project.id)
                        }
                        className="mt-3 text-sm font-medium text-cyan-500 hover:text-cyan-600 transition"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 mb-4">
                      {project.tags.slice(0, 4).map((tag, j) => (
                        <span
                          key={`${project.id}-tag-${j}`}
                          className="px-3 py-1 text-xs font-medium bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full border border-cyan-200 dark:border-cyan-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Live Link */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm font-medium"
                      >
                        View Project <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
