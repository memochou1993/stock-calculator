import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      srcDir: './src',
      manifest: {
        short_name: '台股交易試算器',
        name: '台股交易試算器',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/favicon-1240x600.png',
            sizes: '1240x600',
            type: 'image/png',
            form_factor: 'wide',
            label: '台股交易試算器',
          },
        ],
      },
      injectManifest: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
      },
      workbox: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}'],
      },
      devOptions: {
        enabled: true,
        suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
        type: 'module',
        navigateFallback: '/',
      },
    }),
  ],
};

export default config;
