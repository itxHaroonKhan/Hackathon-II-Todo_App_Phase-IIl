'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/shared';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background/40 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-all"
          >
            <div className="
              w-9 h-9 rounded-xl 
              bg-gradient-to-br from-primary via-primary/90 to-secondary
              flex items-center justify-center
              shadow-lg shadow-primary/20
              group-hover:shadow-xl group-hover:shadow-primary/30
              group-hover:scale-[1.04]
              transition-all duration-300
            ">
              <svg
                className="w-5 h-5 text-primary-foreground group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>

            <span className="
              text-2xl font-extrabold tracking-tight
              bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent
              group-hover:from-primary/90 group-hover:to-secondary/90
              transition-all duration-300
            ">
              TaskFlow
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2.5 sm:gap-4">

            <ThemeToggle />

            {user ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="
                      text-base font-medium px-5
                      hover:bg-muted/70 hover:text-foreground
                      transition-colors duration-200
                    "
                  >
                    Dashboard
                  </Button>
                </Link>

                <div className="
                  hidden sm:flex items-center gap-2
                  px-4 py-1.5 rounded-full
                  bg-muted/60 border border-border/40
                  text-sm text-muted-foreground/90 font-medium
                ">
                  {user.email}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="
                    border-border/70 px-5
                    hover:border-primary/40 hover:bg-primary/5 hover:text-primary
                    hover:shadow-sm
                    transition-all duration-250 font-medium
                  "
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="
                      px-5 text-base font-medium
                      hover:bg-muted/70
                      transition-colors duration-200
                    "
                  >
                    Log in
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button
                    size="sm"
                    className="
                      px-6 min-w-[110px]
                      bg-gradient-to-r from-primary to-primary/90
                      hover:from-primary/95 hover:to-primary
                      shadow-md shadow-primary/25
                      hover:shadow-lg hover:shadow-primary/35
                      active:scale-[0.97]
                      transition-all duration-250
                      font-medium text-base
                    "
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}