/**
 * A visible, deliberately conspicuous placeholder for a fact the owner has not
 * supplied yet.
 *
 * The funnel spec (v2, rule 3) is explicit: where a real fact is needed and
 * absent, the `[OWNER: supply]` marker stays in place. It is never filled with
 * a plausible-sounding invention — a fabricated placeholder shipping to
 * production is the reason the spec exists at all.
 *
 * Grep for `OWNER: supply` (or run `npm run check:owner`) to find every one.
 */

export const OwnerSupply = ({
  what,
  block = false,
}: {
  /** What the owner needs to provide, e.g. `price` or `real outcome figure`. */
  what: string;
  /** Render as its own block rather than inline inside a sentence. */
  block?: boolean;
}) => (
  <span
    data-owner-supply
    style={{
      display: block ? "block" : "inline-block",
      padding: block ? "14px 18px" : "2px 10px",
      marginTop: block ? "8px" : 0,
      borderRadius: block ? "12px" : "999px",
      border: "1px dashed rgba(184,157,255,0.55)",
      background: "rgba(142,92,255,0.08)",
      color: "#D8C8FF",
      fontSize: block ? "0.86rem" : "0.9em",
      fontWeight: 500,
      lineHeight: 1.5,
    }}
  >
    [OWNER: supply {what}]
  </span>
);
