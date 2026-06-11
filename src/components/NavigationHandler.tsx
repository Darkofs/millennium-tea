"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NavigationHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // We push a state to trap the first back click on our website
    const currentState = window.history.state || {};
    if (!currentState.isMillennium) {
      window.history.replaceState({ ...currentState, isMillennium: true, step: 0 }, "");
      window.history.pushState({ ...currentState, isMillennium: true, step: 1 }, "");
    }

    const handlePopState = (e: PopStateEvent) => {
      // If the back button is clicked and we hit our initial trap state (step: 0)
      if (e.state && e.state.isMillennium && e.state.step === 0) {
        if (pathname === "/") {
          // Smooth scroll to the top of the homepage
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          // Go to the main starting page
          router.push("/");
        }

        // Push step 1 back so the trap remains set for subsequent back clicks
        const state = window.history.state || {};
        window.history.pushState({ ...state, isMillennium: true, step: 1 }, "");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, router]);

  return null;
}
