// In Next.js, this file would be called: app/providers.jsx
"use client"

// Corrected import statement
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Utility function to create a new QueryClient instance
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

// Initialize the browser query client
let browserQueryClient: QueryClient | undefined = undefined;

// Define `isServer` to check if the code is running on the server or browser
const isServer = typeof window === 'undefined';

// Function to get the appropriate QueryClient instance
function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Define the Props type for TypeScript
type Props = {
  children: React.ReactNode;
};

// QueryProvider component
export function QueryProvider({ children }: Props) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
