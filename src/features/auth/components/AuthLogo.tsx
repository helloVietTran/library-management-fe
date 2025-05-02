import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AuthLogo = () => {
  return (
    <div className="readonly__auth__logo">
      <Link href="/">
        <Image
          src="/img/logo/logo.png"
          alt="logo"
          width={220}
          height={40}
          priority
          style={{ objectFit: 'contain' }}
        />
      </Link>
    </div>
  );
};

export default AuthLogo;
