import { Check } from 'lucide-react';
import Link from 'next/link'

import GradientCursor from '@/components/GradientCursor'
import ThemeToggle from '@/components/ThemeToggle'

const LandingPage = () => {
  const logos = [
    { name: 'Company 1', width: 80 },
    { name: 'Company 2', width: 80 },
    { name: 'Company 3', width: 80 },
    { name: 'Company 4', width: 80 },
    { name: 'Company 5', width: 80 }
  ];

  return (
    <div className="min-h-screen relative text-foreground overflow-hidden">
      <GradientCursor />
      {/* Gradient Background - adjust sizes for different screens */}
      <div className="absolute inset-0 bg-background">
        <div 
          id="gradient-1"
          className="absolute top-0 left-1/2 w-[400px] md:w-[700px] lg:w-[900px] h-[400px] md:h-[700px] lg:h-[900px] rounded-full bg-purple-600/20 dark:bg-purple-600/30 blur-3xl transform-gpu transition-transform duration-[3000ms]" 
        />
        <div 
          id="gradient-2"
          className="absolute bottom-0 left-1/4 w-[350px] md:w-[600px] lg:w-[800px] h-[350px] md:h-[600px] lg:h-[800px] rounded-full bg-purple-800/15 dark:bg-purple-800/25 blur-3xl transform-gpu transition-transform duration-[4000ms]" 
        />
        <div 
          id="gradient-3"
          className="absolute top-1/4 right-1/4 w-[300px] md:w-[500px] lg:w-[700px] h-[300px] md:h-[500px] lg:h-[700px] rounded-full bg-purple-500/15 dark:bg-purple-500/25 blur-3xl transform-gpu transition-transform duration-[3500ms]" 
        />
        <div 
          id="gradient-4"
          className="absolute bottom-1/4 right-1/3 w-[250px] md:w-[450px] lg:w-[600px] h-[250px] md:h-[450px] lg:h-[600px] rounded-full bg-indigo-500/15 dark:bg-indigo-500/25 blur-3xl transform-gpu transition-transform duration-[4500ms]" 
        />
        <div 
          id="gradient-5"
          className="absolute top-1/3 left-1/3 w-[350px] md:w-[550px] lg:w-[750px] h-[350px] md:h-[550px] lg:h-[750px] rounded-full bg-violet-500/15 dark:bg-violet-500/25 blur-3xl transform-gpu transition-transform duration-[5000ms]" 
        />
      </div>

      <div className="relative z-10">
        {/* Responsive header */}
        <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600" />
            <span className="font-medium text-foreground">SwipDev</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 items-center">
            <Link href="/process" className="hover:text-purple-400 transition-colors">Process</Link>
            <Link href="/plans" className="hover:text-purple-400 transition-colors">Plans</Link>
            <Link href="/faq" className="hover:text-purple-400 transition-colors">FAQ</Link>
            <ThemeToggle />
          </nav>
        </header>

        <main className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-16">
          {/* Responsive typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              Unlimited
            </span>
            <br />
            Developer Matching
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg sm:text-xl">
            Expertise you need to take your development team to the next level.
            <br className="hidden sm:block" />
            Unlimited developer matches & hiring support.
          </p>

          {/* Responsive feature list */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-foreground">Flat monthly rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-foreground">No fees, no hassle, no contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
              <span className="text-foreground">Cancel or pause anytime</span>
            </div>
          </div>

          {/* Add CTA button */}
          <div className="mb-12">
            <Link 
              href="/login"
              className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start your journey
            </Link>
          </div>

          {/* Logos section */}
          <div className="mt-16 sm:mt-24 mb-24 sm:mb-32">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">AGENCIES AND STARTUPS I WORKED WITH</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
              {logos.map((logo, i) => (
                <div key={i} className="w-16 sm:w-20 h-8 bg-gray-800/10 dark:bg-gray-800/30 rounded opacity-50" />
              ))}
            </div>
          </div>

          {/* Process section */}
          <section className="text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-foreground">Hiring, without the hassle</h2>
            <div className="relative">
              {/* Timeline line - behind everything */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-800/20 dark:bg-purple-800/30 -z-10" />

              {/* Process steps */}
              {[
                {
                  title: 'Subscribe',
                  description: 'Subscribe and instantly get access to your dedicated hiring dashboard.'
                },
                {
                  title: 'Share your requirements',
                  description: 'List your first task within seconds by specifying the requirements.'
                },
                {
                  title: 'Match with developers',
                  description: 'You will receive your first developer matches within 48 hours.'
                },
                {
                  title: 'Start working',
                  description: 'Begin your project with top developers immediately.'
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mb-16 sm:mb-24">
                  <div className="flex-1 flex justify-center sm:justify-end order-2 sm:order-1">
                    <div className="w-full sm:w-64 h-36 sm:h-48 bg-gray-900/5 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg relative z-10" />
                  </div>
                  <div className="flex-shrink-0 relative z-10 order-1 sm:order-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-2 text-center sm:text-left order-3 relative z-10">
                    <h3 className="font-medium mb-2 text-foreground">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add simplifying revisions text */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
            Simplifying revisions and streamlining development workflows
          </p>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;