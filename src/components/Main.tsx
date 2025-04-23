import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({
    children
}) => {
    return (
        <div className='min-h-screen bg-main-bg ml-[300px] p-6'>
            {children}
        </div>
    )
}

export default Main