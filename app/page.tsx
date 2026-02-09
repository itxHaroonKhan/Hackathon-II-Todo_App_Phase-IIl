'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/shared';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-1000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-muted-foreground mb-8 animate-slide-down">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="animate-pulse-scale">Boost your productivity today</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Organize your tasks
            <br />
            <span className="text-gradient from-indigo-600 to-purple-600">
              with ease
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
            TaskFlow helps you manage your daily tasks efficiently.
            Create, organize, and track your progress all in one place.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12 animate-fade-in animation-delay-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
            <Link href="/signup" prefetch>
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 group transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Get Started Free
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </Link>
            <Link href="/login" prefetch>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 transition-all duration-300 hover:shadow-md hover:border-primary"
                aria-label="Sign in to your account"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <section aria-labelledby="features-heading" className="mt-20">
          <h2 id="features-heading" className="sr-only">Features</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-2xl border border-border bg-card/50 p-6 sm:p-7 shadow-sm backdrop-blur-sm card-hover animate-fade-in animation-delay-300">
              <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 transition-all duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/60 group-hover:scale-110">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-foreground">Easy to Use</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create and manage tasks with just a few clicks. Simple and intuitive interface.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-border bg-card/50 p-6 sm:p-7 shadow-sm backdrop-blur-sm card-hover animate-fade-in animation-delay-500">
              <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/60 group-hover:scale-110">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-foreground">Secure</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your data is protected with strong encryption and secure practices.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-border bg-card/50 p-6 sm:p-7 shadow-sm backdrop-blur-sm card-hover animate-fade-in animation-delay-700">
              <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 transition-all duration-300 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/60 group-hover:scale-110">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-foreground">Fast</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Lightning-fast experience. No delays, no loading — just flow.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <div className="mt-20 max-w-2xl mx-auto text-center animate-fade-in animation-delay-1000">
          <div className="text-lg italic text-muted-foreground mb-4">
            "TaskFlow transformed how our team manages projects. We're 40% more productive!"
          </div>
          <div className="font-semibold text-foreground">Sarah Johnson</div>
          <div className="text-sm text-muted-foreground">Product Manager at TechCorp</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-32 pb-8 text-center text-sm text-muted-foreground animate-fade-in animation-delay-1200">
        <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}