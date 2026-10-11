// Standard size names. Regular = 8 oz jam / 12 oz pickled goods; Large = 12 oz jam / 16 oz pickled goods.
// Anything else (like the 4 oz specialty jar) keeps its own name.
export const STD = { Jams: { Regular: 8, Large: 12 }, "Pickled goods": { Regular: 12, Large: 16 } };
export function stdSize(category, label) {
  const std = STD[category === "Pickled goods" ? "Pickled goods" : "Jams"];
  const raw = String(label || "").trim().replace(/\s+/g, " ");
  const name = (n) => `${n} (${std[n]} oz)`;
  if (!raw) return name("Regular");
  const m = raw.match(/(\d+(?:\.\d+)?)\s*oz\b/i);
  if (m) {
    const oz = Number(m[1]);
    if (oz === std.Regular) return name("Regular");
    if (oz === std.Large) return name("Large");
    return raw;
  }
  const k = raw.toLowerCase();
  if (k === "regular") return name("Regular");
  if (k === "large") return name("Large");
  return raw;
}
