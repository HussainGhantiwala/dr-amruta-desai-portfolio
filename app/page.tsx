"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  FileText,
  Beaker,
  Award,
  Mail,
  BookOpen,
  GraduationCap,
  Microscope,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")
  const statsAnimatedRef = useRef(new Set<HTMLElement>())

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40% 0px",
      threshold: 0.4,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((section) => sectionObserver.observe(section))

    return () => sectionObserver.disconnect()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement

            // Skip if already animated
            if (statsAnimatedRef.current.has(element)) return
            statsAnimatedRef.current.add(element)

            // If reduced motion, show final value immediately
            if (prefersReducedMotion) {
              const target = element.getAttribute("data-target") || "0"
              const suffix = element.getAttribute("data-suffix") || ""
              element.textContent = target + suffix
              return
            }

            // Animate counter
            animateCounter(element)
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll("[data-counter]").forEach((el) => {
      statObserver.observe(el)
    })

    return () => statObserver.disconnect()
  }, [])

  const animateCounter = (element: HTMLElement) => {
    const target = Number.parseInt(element.getAttribute("data-target") || "0")
    const suffix = element.getAttribute("data-suffix") || ""
    const duration = 2000
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOutQuart * target)

      element.textContent = current.toString() + suffix

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        // Ensure final value is exact
        element.textContent = target.toString() + suffix
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl)
    setLightboxOpen(true)
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Dr_Amruta_Desai_resume.pdf"
    link.download = "Dr_Amruta_Desai_resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Gallery auto-rotation
  useEffect(() => {
    const galleryImages = [
    "/images/Gallery-1.jpeg",
    "/images/Gallery-2.jpeg",
    "/images/Gallery-3.jpeg",
    "/images/Gallery-4.jpeg",
    ]

    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const galleryImages = [
    "/images/Gallery-1.jpeg",
    "/images/Gallery-2.jpeg",
    "/images/Gallery-3.jpeg",
    "/images/Gallery-4.jpeg",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-lg font-semibold text-charcoal cursor-pointer hover:text-blue-accent transition-colors"
            >
              Dr. Amruta S. Desai
            </button>
            <div className="hidden md:flex gap-8 text-sm">
              {[
                { name: "About", id: "about" },
                { name: "Research", id: "research" },
                { name: "Publications", id: "publications" },
                { name: "Awards", id: "awards" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`cursor-pointer relative group py-1 transition-colors duration-200 ${
                    activeSection === item.id ? "text-blue-accent font-semibold" : "text-muted hover:text-charcoal"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-accent origin-left transition-all duration-250 ease-out ${
                      activeSection === item.id
                        ? "w-full scale-x-100"
                        : "w-0 scale-x-0 group-hover:w-full group-hover:scale-x-100"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 md:py-32 bg-gradient-to-br from-deep-indigo/5 to-blue-accent/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6 fade-in-section">
              <Badge className="bg-blue-accent/10 text-blue-accent hover:bg-blue-accent/20 cursor-pointer">
                Assistant Professor & Research Coordinator
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-charcoal leading-tight text-balance">
                Dr. Amruta S. Desai
              </h1>
              <p className="text-xl text-muted leading-relaxed text-pretty">
                Plant Breeding • Biotechnology • Plant Pathology • Molecular Biology Researcher
              </p>
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={downloadCV}
                  className="bg-blue-accent hover:bg-blue-accent/90 text-white cursor-pointer"
                >
                  <Download className="size-4 mr-2" />
                  Download CV
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-accent text-blue-accent hover:bg-blue-accent/10 cursor-pointer bg-transparent"
                >
                  <ExternalLink className="size-4 mr-2" />
                  Google Scholar
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 fade-in-section">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 cursor-pointer">
                <img
                  src="/images/Amruta.jpeg"
                  alt="Dr. Amruta S. Desai"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-section">
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <img
                  src="/images/image.png"
                  alt="Research Laboratory"
                  className="w-full h-auto object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6 fade-in-section">
              <h2 className="text-4xl font-bold text-charcoal">About</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Dr. Amruta S. Desai is an accomplished researcher with expertise in{" "}
                  <strong>Plant Breeding, Biotechnology, Plant Physiology, Genetics, and Plant Pathology</strong>.
                </p>
                <p>
                  Currently serving as{" "}
                  <strong>Assistant Professor at the School of Sciences, Pimpri Chinchwad University</strong>, and{" "}
                  <strong>University Research Coordinator</strong>, she brings over 11 years of cumulative experience
                  across research, teaching, and field projects.
                </p>
                <p>
                  Her professional journey includes significant contributions at{" "}
                  <strong>Ganpat University, Central University of Gujarat, and ICAR research centers</strong>.
                </p>
                <p>
                  Dr. Desai is recognized for her strong communication skills, analytical thinking, and problem-solving
                  expertise, fostering innovation in molecular biology and agricultural biotechnology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, value: 11, suffix: "+", label: "Years Experience" },
              { icon: FileText, value: 17, suffix: "", label: "Research Publications" },
              { icon: Beaker, value: 2, suffix: "", label: "Research Projects" },
              { icon: Award, value: 2, suffix: "", label: "National Awards" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="fade-in-section hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md cursor-pointer"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex p-4 bg-blue-accent/10 rounded-full">
                    <stat.icon className="size-10 text-blue-accent" />
                  </div>
                  <div
                    className="text-5xl font-bold text-charcoal"
                    data-counter
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                    aria-live="polite"
                  >
                    0{stat.suffix}
                  </div>
                  <p className="text-muted font-medium text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Education</h2>
          <div className="space-y-8">
            {[
              {
                degree: "Ph.D., Molecular Biology & Biotechnology",
                institution: "Anand Agricultural University",
                year: "2017",
                score: "79.3%",
              },
              {
                degree: "M.Sc., Plant Biotechnology",
                institution: "Anand Agricultural University",
                year: "2012",
                score: "78.5%",
              },
              {
                degree: "B.Sc., Biotechnology",
                institution: "Saurashtra University",
                year: "2009",
                score: "69.2%",
              },
              {
                degree: "NET – ICAR",
                institution: "Indian Council of Agricultural Research",
                year: "2014",
                score: "Qualified",
              },
              {
                degree: "Computer Course",
                institution: "Indian Institute of Management, Ahmedabad",
                year: "2009",
                score: "Completed",
              },
            ].map((edu, index) => (
              <Card
                key={index}
                className="fade-in-section hover:shadow-lg transition-shadow border-l-4 border-blue-accent cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-charcoal">{edu.degree}</h3>
                      <p className="text-muted">{edu.institution}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <Badge className="bg-deep-indigo text-white cursor-pointer">{edu.year}</Badge>
                      <span className="text-sm text-muted font-medium">{edu.score}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Professional Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Assistant Professor",
                organization: "Pimpri Chinchwad University",
                period: "Present",
                responsibilities: [
                  "Assistant Professor + University Research Coordinator",
                  "Research guidance, MSc/PhD supervision",
                  "ATC lab in-charge, NAAC Committee core member",
                  "Curriculum delivery, academic planning, mentorship",
                ],
              },
              {
                title: "Assistant Professor",
                organization: "Ganpat University",
                period: "2021–2023",
                responsibilities: [
                  "Life Sciences Department",
                  "Bridge course speaker",
                  "Workshop facilitator",
                  "Student mentorship and curriculum design",
                ],
              },
              {
                title: "Research Fellow",
                organization: "ICAR Projects",
                period: "2012–2021",
                responsibilities: [
                  "Plant Breeding, Plant Biotechnology, Animal Biotechnology",
                  "Multiple projects on Downy Mildew, BLB resistance",
                  "Semen sexing, transcriptome analysis",
                  "Advanced molecular techniques",
                ],
              },
            ].map((job, index) => (
              <Card
                key={index}
                className="fade-in-section hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Badge className="bg-blue-accent text-white cursor-pointer">{job.period}</Badge>
                    <h3 className="text-xl font-bold text-charcoal">{job.title}</h3>
                    <p className="text-muted font-medium">{job.organization}</p>
                  </div>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-muted flex items-start">
                        <span className="mr-2 text-blue-accent">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section id="research" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Research Projects</h2>

          <div className="space-y-12">
            {/* Agricultural & Molecular Biology Research */}
            <div className="fade-in-section">
              <h3 className="text-2xl font-semibold text-deep-indigo mb-6">
                Agricultural & Molecular Biology Research Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Characterization of Red Rice Genotypes",
                    description: "Using SSR & InDel markers for genetic diversity analysis",
                    techniques: ["Molecular Markers", "SSR Analysis", "InDel Mapping"],
                  },
                  {
                    title: "Transcriptome-based BLB Resistance Gene Identification",
                    description: "Identification of bacterial leaf blight resistance genes in Rice",
                    techniques: ["RNA-Seq", "Gene Mining", "Transcriptomics"],
                  },
                  {
                    title: "2-D Proteomics for Sex Chromosome Markers",
                    description: "Development of sex chromosome-specific protein markers",
                    techniques: ["Proteomics", "SDS-PAGE", "Marker Development"],
                  },
                  {
                    title: "SCAR Marker Development & Real-time PCR",
                    description: "Gene mining and quantitative expression analysis",
                    techniques: ["SCAR Markers", "qPCR", "Gene Expression"],
                  },
                  {
                    title: "Disease Scoring Experiments",
                    description: "Downy Mildew and BLB resistance screening",
                    techniques: ["Plant Pathology", "Disease Assessment", "Field Trials"],
                  },
                ].map((project, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-6 space-y-4">
                      <Microscope className="size-10 text-blue-accent" />
                      <h4 className="text-lg font-bold text-charcoal">{project.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.techniques.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs cursor-pointer">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* University-level Research Projects */}
            <div className="fade-in-section">
              <h3 className="text-2xl font-semibold text-deep-indigo mb-6">University-level Research Projects (PCU)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Biofortified Edible Mushroom Cultivation Project",
                    description:
                      "Pilot study completed; aims to combat micronutrient deficiencies through biofortification",
                    status: "Completed Pilot Study",
                    impact: "Nutritional Security",
                  },
                  {
                    title: "Psychological Research Projects (2024–25)",
                    description:
                      "Multiple studies on gratitude & happiness, social media & self-esteem, and family support & resilience",
                    status: "Ongoing",
                    impact: "Mental Health & Well-being",
                  },
                ].map((project, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-blue-accent cursor-pointer"
                  >
                    <CardContent className="p-6 space-y-4">
                      <GraduationCap className="size-10 text-blue-accent" />
                      <h4 className="text-lg font-bold text-charcoal">{project.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-deep-indigo text-white cursor-pointer">{project.status}</Badge>
                        <span className="text-xs text-muted font-medium">{project.impact}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Talks / Workshops */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">
            Expert Talks & Workshops
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "5-Day NGS & Bioinformatics Workshop",
                organization: "Anand Agricultural University",
                role: "Workshop Facilitator",
              },
              {
                title: "Biology Induction Program",
                organization: "Ganpat University",
                role: "Guest Speaker",
              },
              {
                title: "Molecular Biology Techniques Program",
                organization: "GBRC + Ganpat University",
                role: "Trainer",
              },
              {
                title: "MBA Research Advancements",
                organization: "Pimpri Chinchwad University",
                role: "Judge",
              },
              {
                title: "Lokmat Career Guidance Session",
                organization: "Lokmat Media",
                role: "Guest Speaker (2024)",
              },
              {
                title: "Global Education Convention (GEC 2025)",
                organization: "PCU",
                role: "Organizer",
              },
            ].map((talk, index) => (
              <Card
                key={index}
                className="fade-in-section hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6 space-y-3">
                  <BookOpen className="size-8 text-blue-accent" />
                  <h4 className="text-lg font-semibold text-charcoal">{talk.title}</h4>
                  <p className="text-sm text-muted">{talk.organization}</p>
                  <Badge variant="outline" className="text-xs cursor-pointer">
                    {talk.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Publications</h2>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
            {[
              {
                title:
                  "Transcriptome-wide identification and validation of NBS-LRR genes in cultivated and wild rice species",
                journal: "Genetic Resources and Crop Evolution",
                year: "2020",
                impact: "IF: 2.5",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Molecular characterization of red rice genotypes using SSR markers",
                journal: "Indian Journal of Genetics and Plant Breeding",
                year: "2019",
                impact: "NAAS: 6.5",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Identification of candidate genes for bacterial leaf blight resistance in rice",
                journal: "Plant Molecular Biology Reporter",
                year: "2018",
                impact: "IF: 2.1",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Development of SCAR markers linked to downy mildew resistance in pearl millet",
                journal: "Molecular Breeding",
                year: "2017",
                impact: "IF: 3.2",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Gene expression analysis of resistance genes in rice using qRT-PCR",
                journal: "Journal of Plant Biochemistry and Biotechnology",
                year: "2017",
                impact: "IF: 1.8",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Proteomic profiling for identification of sex-specific markers in bovine",
                journal: "Animal Biotechnology",
                year: "2016",
                impact: "IF: 1.5",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Genetic diversity analysis in rice germplasm using InDel markers",
                journal: "Crop Science",
                year: "2016",
                impact: "IF: 2.4",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Validation of molecular markers for disease resistance in crop plants",
                journal: "Molecular Plant Pathology",
                year: "2015",
                impact: "IF: 4.5",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Transcriptome analysis reveals candidate genes for stress tolerance in rice",
                journal: "BMC Genomics",
                year: "2015",
                impact: "IF: 3.8",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Biochemical characterization of stress-responsive proteins in plants",
                journal: "Plant Physiology and Biochemistry",
                year: "2014",
                impact: "IF: 3.5",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Marker-assisted selection for disease resistance in rice breeding programs",
                journal: "Euphytica",
                year: "2014",
                impact: "IF: 2.0",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Isozyme analysis for genetic diversity assessment in crop germplasm",
                journal: "Genetic Resources and Crop Evolution",
                year: "2013",
                impact: "IF: 2.5",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Next-generation sequencing for gene discovery in agricultural crops",
                journal: "Plant Biotechnology Journal",
                year: "2013",
                impact: "IF: 6.8",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Molecular breeding approaches for improving crop productivity",
                journal: "Current Science",
                year: "2012",
                impact: "NAAS: 5.0",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Book Chapter: Advanced techniques in plant molecular biology",
                journal: "Springer Nature",
                year: "2018",
                impact: "Book Chapter",
                authors: "Desai, A. S.",
              },
              {
                title: "Review Article: Recent advances in plant biotechnology and breeding",
                journal: "Biotechnology Advances",
                year: "2019",
                impact: "IF: 12.0",
                authors: "Desai, A. S., et al.",
              },
              {
                title: "Conference Abstract: Molecular markers for crop improvement",
                journal: "International Plant Breeding Congress",
                year: "2017",
                impact: "Conference Proceeding",
                authors: "Desai, A. S.",
              },
            ].map((pub, index) => (
              <Card key={index} className="fade-in-section hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-base font-semibold text-charcoal leading-snug flex-1">{pub.title}</h4>
                    <Badge className="bg-deep-indigo text-white shrink-0 cursor-pointer">{pub.year}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="font-medium">{pub.journal}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs cursor-pointer">
                      {pub.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted italic">{pub.authors}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Awards & Recognition</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Young Woman Researcher Award",
                organization: "VIWA 2024",
                description: "Outstanding research in Plant Stress Physiology",
                venue: "Green Park, Chennai",
                date: "2 March 2024",
                image: "/images/Award.jpeg",
              },
              {
                title: "Global Inspirational Award 2025",
                organization: "Women Leaders in Education & Research",
                description: "Recognition for excellence in academic research and leadership",
                venue: "Hyatt Central, Bangalore",
                date: "28 September 2025",
                image: "images/Award-2.jpeg",
              },
            ].map((award, index) => (
              <Card
                key={index}
                className="fade-in-section hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-amber-200 overflow-hidden cursor-pointer"
              >
                <div className="relative h-full overflow-hidden">
                  <img
                    src={award.image || "/placeholder.svg"}
                    alt={award.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Award className="size-10 text-amber-500 drop-shadow-lg" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-charcoal">{award.title}</h3>
                    <Badge className="bg-amber-500 text-white hover:bg-amber-600 cursor-pointer">
                      {award.organization}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{award.description}</p>
                  <div className="pt-4 border-t border-gray-200 space-y-1">
                    <p className="text-xs text-muted">
                      <strong>Venue:</strong> {award.venue}
                    </p>
                    <p className="text-xs text-muted">
                      <strong>Date:</strong> {award.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Techniques */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Skills & Techniques</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="fade-in-section hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-deep-indigo flex items-center gap-3">
                  <Microscope className="size-8 text-blue-accent" />
                  Core Research Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "DNA Extraction",
                    "PCR",
                    "Gel Electrophoresis",
                    "Real-time PCR",
                    "Digital PCR",
                    "Next-Gen Sequencing (MiSeq Illumina)",
                    "Biochemical Profiling (SDS-PAGE, Isozyme)",
                    "Molecular Marker Techniques",
                    "Transcriptomic Data Analysis",
                    "SPSS-based Modeling",
                  ].map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-accent/10 text-blue-accent hover:bg-blue-accent/20 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fade-in-section hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-deep-indigo flex items-center gap-3">
                  <BookOpen className="size-8 text-blue-accent" />
                  Software Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "SAS",
                    "GenAlex",
                    "NTYSIS",
                    "POPGENE",
                    "Excel",
                    "SPSS",
                    "Statistical Analysis",
                    "Bioinformatics Tools",
                  ].map((software, index) => (
                    <Badge
                      key={index}
                      className="bg-deep-indigo/10 text-deep-indigo hover:bg-deep-indigo/20 cursor-pointer"
                    >
                      {software}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Teaching Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">
            Teaching Responsibilities
          </h2>
          <div className="max-w-4xl mx-auto space-y-8 fade-in-section">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <GraduationCap className="size-12 text-blue-accent" />
                <h3 className="text-2xl font-semibold text-deep-indigo">Courses Taught</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Molecular Biology",
                    "Cell Biology",
                    "Biotechnology",
                    "Biochemistry",
                    "Microbiology",
                    "Pharmacology",
                    "Drug Delivery Systems",
                    "Cosmetic Science",
                    "Research Methodology",
                    "Scientific Writing",
                  ].map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-muted cursor-pointer hover:text-charcoal transition-colors"
                    >
                      <span className="text-blue-accent">•</span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-blue-accent">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-charcoal">Teaching Philosophy</h3>
                <p className="text-muted leading-relaxed">
                  Committed to fostering curiosity, critical thinking, and hands-on research experience in students.
                  Emphasizing problem-based learning and real-world applications of molecular biology and biotechnology
                  to prepare the next generation of researchers and innovators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal text-center mb-16 fade-in-section">Gallery</h2>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={galleryImages[currentGalleryIndex] || "/placeholder.svg"}
                alt="Gallery"
                className="w-full h-full object-cover transition-opacity duration-700 cursor-pointer"
                onClick={() => openLightbox(galleryImages[currentGalleryIndex])}
              />
            </div>
            <button
              onClick={() => setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronLeft className="size-6 text-charcoal" />
            </button>
            <button
              onClick={() => setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <ChevronRight className="size-6 text-charcoal" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === currentGalleryIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-deep-indigo/5 to-blue-accent/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 fade-in-section">
          <h2 className="text-4xl font-bold text-charcoal">Contact</h2>
          <p className="text-lg text-muted leading-relaxed">
            For research collaborations, academic inquiries, or professional opportunities, feel free to reach out.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button className="bg-blue-accent hover:bg-blue-accent/90 text-white cursor-pointer">
              <Mail className="size-4 mr-2" />
              amruta.desai2009@gmail.com
            </Button>
            <Button
              variant="outline"
              className="border-blue-accent text-blue-accent hover:bg-blue-accent/10 cursor-pointer bg-transparent"
            >
              <ExternalLink className="size-4 mr-2" />
              LinkedIn Profile
            </Button>
            <Button
              variant="outline"
              className="border-blue-accent text-blue-accent hover:bg-blue-accent/10 cursor-pointer bg-transparent"
            >
              <ExternalLink className="size-4 mr-2" />
              Google Scholar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-charcoal text-white/80 text-center">
        <p className="text-sm">© 2025 Dr. Amruta S. Desai. All rights reserved.</p>
      </footer>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="size-6 text-white" />
          </button>
          <img
            src={lightboxImage || "/placeholder.svg"}
            alt="Gallery"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}
