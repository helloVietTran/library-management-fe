import Link from 'next/link';
import React from 'react';

interface AuthNavigationProps {
  primaryLabel: string;
  primaryHref: string;
  primaryDescription: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const AuthNavigation: React.FC = ({
  primaryLabel,
  primaryHref,
  secondaryHref,
  secondaryLabel,
  primaryDescription,
}) => {
  return (
    <div className="auth-action pt-4 text-center text-base text-gray-600">
      <p>
        {primaryDescription}
        <Link href={primaryHref} className="!text-primary font-semibold">
          {' ' + primaryLabel}
        </Link>
      </p>
      {secondaryHref ? (
        <p>
          <Link href={secondaryHref} className="text-primary font-semibold">
            {secondaryLabel}
          </Link>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AuthNavigation;
