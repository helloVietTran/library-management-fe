import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const Loader = () => {
  return (
    <div className="flex h-20 items-center justify-center">
      <FadeLoader color="#445ebf" speedMultiplier={1.2} />
    </div>
  );
};

export default Loader;
