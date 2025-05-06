'use client';

const AuthLayout = ({ children }: Readonly) => {
  return (
    <div className="m-h-100vh overflow-scroll">
      <div className="flex h-full">
        <div className="flex w-full justify-center bg-white lg:w-7/12">
          <div className="auth-left py-10">{children}</div>
        </div>
        <div className="hidden lg:flex lg:w-5/12">
          <div
            className="auth-right h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/img/bg/auth-bg.png'), linear-gradient(90deg, #2d499d, #3f5491)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
