import React from 'react';
import Link from 'next/link';

const AuthLogo = () => {
    return (
        <div className="auth-logo mb-8">
            <Link href="/">
                <img src="/img/logo/logo.png" alt='logo'/>
            </Link>
        </div>
    )
}

export default AuthLogo;