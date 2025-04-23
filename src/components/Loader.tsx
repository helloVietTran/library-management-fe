import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-20">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></span>
        </div>
    )
}

export default Loader