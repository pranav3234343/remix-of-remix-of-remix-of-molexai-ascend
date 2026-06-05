import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MolexAI — AI-Powered Drug Discovery Platform | Powered by NVIDIA" },
      {
        name: "description",
        content:
          "MolexAI compresses drug discovery from 12 years to 18 months using generative AI and NVIDIA BioNeMo.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020818",
        color: "#7DF9C8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Loading MolexAI…
    </div>
  );
}
