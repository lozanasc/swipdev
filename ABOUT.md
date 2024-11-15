# ABOUT

A main app where employers can create a project or just look to hire I wanna make it AI first so ideally it'll just be your usual AI chat app they can search for whatever, so in the main app/website they can toggle between Create a Project or Hire a Freelancer (idk the best way to call a freelancer) then they just input what they need, like "I need a software developer who knows python and has trading knowledge" and it would have a fancy loading screen and it would be a swipe right/left like a dating app (both web and mobile) and it would create a final list of applicants that you like and integrate direcly with gmeet to set interviews, so for the create a project route let's add steps like what tech stack (cards of technologies) maybe ask Full-stack app or Backend only, or Frontend only etc... idk up to you, write a description of the feature (ai powered) and suggest tasks to be done associated with the project, then it'll turn into a kanban board automatically

## Technical

* NextJS
* Tailwind
* Zustand
* Supabase

## Refined Requirements

I'll help you break down this Filipino developer-focused freelancing platform into manageable tasks for MVP development. Let me organize this systematically.

## Core Concept Summary

* AI-first freelancing platform focusing on Filipino developers
* Tinder-style interface for matching employers with developers
* Dual-mode: Project Creation & Direct Hiring
* AI-powered project/requirement analysis
* Automated task breakdown and Kanban generation

## Task Breakdown for MVP

1. Authentication & User Management
   * Supabase auth setup with email/social logins
   * User profiles for employers and developers
   * Developer profile creation with:
     * Skills matrix
     * Experience level
     * Portfolio links
     * Availability status
     * Rate range

2. AI Integration Foundation
   * Setup OpenAI/Claude API integration
   * Implement conversation handler for natural language processing
   * Create prompts for:
     * Project requirement analysis
     * Tech stack recommendations
     * Task breakdown generation
     * Developer matching algorithms

3. Project Creation Flow
   * Project type selection (Full-stack/Backend/Frontend)
   * Tech stack selection interface (card-based UI)
   * AI-assisted project description generator
   * Budget and timeline input
   * Automatic task breakdown generation
   * Kanban board generation from tasks

4. Developer Discovery System
   * Search/filter system for developers
   * AI-powered matching algorithm
   * Swipe interface for developer selection
   * Developer card design with key info
   * Matched developers list management

5. Communication & Scheduling
   * Google Meet API integration
   * Interview scheduling system
   * Basic chat/messaging system
   * Notification system for matches/messages

6. Project Management
   * Basic Kanban board implementation
   * Task status management
   * Simple time tracking
   * Progress reporting

7. Core UI/UX Components
   * Responsive layout (mobile-first)
   * Swipe animation system
   * Loading states and animations
   * Dark/light mode
   * Filipino-centric design elements

8. Database Design (Supabase)
   * User profiles table
   * Projects table
   * Matches table
   * Messages table
   * Tasks table
   * Skills/tech stack reference tables

9. API Development
   * RESTful endpoints for all core features
   * Real-time updates using Supabase
   * API rate limiting
   * Error handling

10. MVP Features to Consider for Phase 1:
    * Basic payment system integration
    * Simple review/rating system
    * Basic reporting tools
    * Development time estimation
    * Export functionality for project plans

Suggested Initial Focus (First Sprint):

1. Auth system
2. Basic AI integration
3. Simple project creation flow
4. Basic developer cards with swipe interface
5. Minimal viable Kanban board

Would you like me to elaborate on any of these sections or discuss specific implementation approaches for any particular feature? I can also help prioritize these tasks based on your specific timeline or resources.
