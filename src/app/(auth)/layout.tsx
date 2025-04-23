"use client";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='auth-layout m-h-100vh overflow-scroll'>
            <div className="flex h-full">

                <div className="lg:w-6/12 w-full flex justify-center bg-white">
                    <div className="auth-left py-10">
                        {children}
                    </div>
                </div>
                <div className="lg:w-6/12 hidden lg:flex">
                    <div
                        className="auth-right w-full h-full bg-cover bg-no-repeat bg-center"
                        style={{
                            backgroundImage: `url('/img/bg/auth-bg.png'), linear-gradient(90deg, #2d499d, #3f5491)`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
