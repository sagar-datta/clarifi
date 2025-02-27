/**
 * Supabase Client Configuration
 *
 * Provides a type-safe, singleton instance of Supabase client.
 * Configured with environment variables and proper error handling.
 *
 * Usage:
 * import { supabase } from '@/lib/supabase'
 * const { data, error } = await supabase.from('table').select()
 */

import { createClient } from '@supabase/supabase-js';
import config from '../config/env.js';

// Type-safe database schema definition
export type Database = {
  // We'll add table definitions here as we create them
};

// Create a single instance of Supabase client
export const supabase = createClient<Database>(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      persistSession: false, // We're using Clerk for auth
      autoRefreshToken: false,
    },
    // Global error handler for database operations
    global: {
      fetch: async (url, options = {}) => {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'x-custom-timestamp': new Date().toISOString(),
          },
        });

        // Log failed requests in development
        if (!response.ok && config.nodeEnv === 'development') {
          console.error(`Supabase request failed: ${url}`, {
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response;
      },
    },
  },
);
