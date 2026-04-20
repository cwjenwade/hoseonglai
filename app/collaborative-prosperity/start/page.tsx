import { redirect } from "next/navigation";

// Deprecated: the primary research participation flow now uses project Google Forms.
// Kept as a route-level guard so legacy email links no longer expose the old token flow UI.
export default function ResearchStartPage() {
  redirect("/collaborative-prosperity");
}
