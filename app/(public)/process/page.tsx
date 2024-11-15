import React from 'react';
import { Code2, Users, Brain, MessageSquare, Rocket, Clock } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const ProcessPage = () => {
  const steps = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description: "Our AI analyzes your project requirements and tech stack to find the perfect developer matches from our pre-vetted talent pool.",
      details: [
        "Tech stack compatibility analysis",
        "Experience level matching",
        "Culture fit assessment",
        "Availability alignment"
      ]
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Project Analysis",
      description: "We break down your project into clear, manageable tasks using AI to ensure accurate scope and timeline estimation.",
      details: [
        "Task breakdown generation",
        "Timeline estimation",
        "Budget recommendations",
        "Tech stack suggestions"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Developer Selection",
      description: "Browse through curated matches and select your ideal developers using our Tinder-style interface.",
      details: [
        "Profile reviews",
        "Skill verification",
        "Portfolio assessment",
        "Instant matching"
      ]
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Initial Contact",
      description: "Connect with your matched developers through our integrated meeting system to discuss project details.",
      details: [
        "Automated scheduling",
        "Video conferencing",
        "Project scope discussion",
        "Timeline alignment"
      ]
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Project Kickoff",
      description: "Start working immediately with your selected developers using our built-in project management tools.",
      details: [
        "Kanban board setup",
        "Task assignment",
        "Progress tracking",
        "Team collaboration"
      ]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Ongoing Support",
      description: "Get continuous support and easily manage your project with our comprehensive tools and features.",
      details: [
        "24/7 support access",
        "Regular progress updates",
        "Performance monitoring",
        "Resource adjustment"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/20 dark:bg-purple-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-800/10 dark:bg-purple-800/20 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600" />
            <Link href="/" className="font-medium text-foreground">SwipDev</Link>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex gap-8 text-foreground">
              <Link href="/process" className="text-purple-400">Process</Link>
              <Link href="/plans" className="hover:text-purple-400 transition-colors">Plans</Link>
              <Link href="/faq" className="hover:text-purple-400 transition-colors">FAQ</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center pt-24 pb-16 px-4">
          <h1 className="text-6xl font-bold text-foreground mb-6">
            How
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text"> SwipDev </span>
            Works
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-16">
            Our streamlined process helps you find and work with the perfect developers for your project.
          </p>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-600">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Start your journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;