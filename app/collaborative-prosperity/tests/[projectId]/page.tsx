import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

// Deprecated: the primary research participation flow now uses project Google Forms.
// Direct legacy assessment links are routed back to the project information page.
export default async function TestProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const safeProjectId = encodeURIComponent(projectId || "");

  redirect(safeProjectId ? `/collaborative-prosperity/${safeProjectId}` : "/collaborative-prosperity");
}
