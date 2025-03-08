import React from 'react';
import ResearcherClient from '@/components/researcher-client';

interface PageProps {
  params: { search_space_id: string };
}

const ResearcherPage = ({ params }: PageProps) => {
  const search_space_id = params.search_space_id;
  
  return <ResearcherClient search_space_id={search_space_id} />;
};

export default ResearcherPage;