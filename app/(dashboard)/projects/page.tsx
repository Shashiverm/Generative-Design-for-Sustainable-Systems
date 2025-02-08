import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, ArrowRight } from "lucide-react"

const projects = [
  { id: 1, name: "Eco Office Tower", location: "New York, NY", sustainabilityScore: 8.5 },
  { id: 2, name: "Green Residential Complex", location: "San Francisco, CA", sustainabilityScore: 9.2 },
  { id: 3, name: "Sustainable Shopping Center", location: "Chicago, IL", sustainabilityScore: 7.8 },
  { id: 4, name: "Eco-Friendly School", location: "Austin, TX", sustainabilityScore: 8.9 },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button>
          <Building className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription>{project.location}</CardDescription>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-bold">{project.sustainabilityScore}</span>
                <Link href={`/projects/${project.id}`}>
                  <Button variant="ghost" size="sm">
                    View <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

