import React from 'react'

interface AuthTitle{
    label: string
}

const AuthTitle : React.FC<AuthTitle> = ({
    label
}) => {
  return (
    <h1 className='auth-title text-3xl mb-8 font-bold text-primary'>
        {label}
    </h1>
  )
}

export default AuthTitle;