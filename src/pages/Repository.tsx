
import React from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { RepositoryContent } from "@/components/repository/RepositoryContent";

export default function Repository() {
  return (
    <MainLayout pageTitle="Repository">
      <RepositoryContent />
    </MainLayout>
  );
}
