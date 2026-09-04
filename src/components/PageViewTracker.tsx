"use client";

import { useEffect } from "react";
import { track, type EventName } from "@/lib/analytics";

/**
 * Fires a one-shot page-view conversion event.
 *
 * `offer_page_viewed` and `partners_page_viewed` are funnel steps, not generic
 * pageviews — GA's own pageview already covers the latter. Keeping them as
 * named events is what lets Track A and Track B be reported separately.
 */
export const PageViewTracker = ({ event }: { event: EventName }) => {
  useEffect(() => {
    track(event);
  }, [event]);

  return null;
};
