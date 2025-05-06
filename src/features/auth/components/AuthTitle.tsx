import React from 'react';

interface AuthTitle {
  label: string;
}

const AuthTitle: React.FC = ({ label }) => {
  return <h1 className="text-primary py-6 text-3xl font-bold">{label}</h1>;
};

export default AuthTitle;
