import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Cap the largest generated width at 1920.
     *
     * Next's default `deviceSizes` tops out at 3840, and for a `fill` image it
     * also writes that largest candidate into the `src` attribute as the
     * no-srcset fallback — which is why every portfolio card was shipping
     * `?w=3840` in its markup.
     *
     * Nothing on this site is ever displayed anywhere near that wide. The
     * portfolio grid is capped at `max-w-7xl` (1280px) and a card is at most
     * ~390px; the widest image on the site is the case-study hero at 740px CSS.
     * Even at DPR 3 that is ~2220px, and a 1920 source upscaled a fraction on a
     * 3x phone is indistinguishable — while a 3840 candidate is roughly four
     * times the bytes of the 1920 one for the same visible result.
     *
     * Removing it shrinks every `srcset` attribute in the HTML and removes the
     * possibility of a browser ever fetching a 3840px render of a 390px card.
     *
     * (The default list is 640, 750, 828, 1080, 1200, 1920, 2048, 3840.)
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],

    /**
     * Serve modern formats. AVIF first, WebP second, original as fallback —
     * Next negotiates via the Accept header, so there is no risk to older
     * clients. AVIF is typically 20–30% smaller than WebP on photographic
     * content, which is what every portfolio screenshot is.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
