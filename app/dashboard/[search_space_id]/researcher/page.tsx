import React from 'react';
import ResearcherClient from '@/components/researcher-client';

interface PageProps {
  params: Promise<{ search_space_id: string }> | { search_space_id: string };
}

const ResearcherPage = async ({ params }: PageProps) => {
  // Ensure params are properly awaited
  const resolvedParams = await Promise.resolve(params);
  const { search_space_id } = resolvedParams;
  
  return <ResearcherClient search_space_id={search_space_id} />;
};

export default ResearcherPage;