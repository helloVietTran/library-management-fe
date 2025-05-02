'use client';
import AuthorList from '@/features/author-list/AuthorList';
import withAuth from '@/HOC/withAuth';

const page = () => {
  return <AuthorList />;
};

export default page;
