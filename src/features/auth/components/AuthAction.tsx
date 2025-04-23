import Link from 'next/link'
import React from 'react'

interface AuthActionProps {
    primaryLabel: string;
    primaryHref: string;
    primaryDescription: string;
    secondaryLabel?: string;
    secondaryHref?: string;

}

const AuthAction: React.FC<AuthActionProps> = ({
    primaryLabel,
    primaryHref,
    secondaryHref,
    secondaryLabel,
    primaryDescription
}) => {
    return (
        <div className="auth-action text-center mt-5 text-base text-gray-600">
            <p>{primaryDescription}
                <Link href={primaryHref} className="font-semibold">{" " + primaryLabel}
                </Link>
            </p>
            {
                secondaryHref ?
                    <p><Link
                        href={secondaryHref}
                        className="font-semibold"
                    >
                        {secondaryLabel}
                    </Link>
                    </p>
                    :
                    <></>
            }
        </div>
    )
}

export default AuthAction