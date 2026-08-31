import React from 'react'

export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
    ]
}

const UserDetails = async ({ params}: { params: Promise<{ id: string}>}) => {
    const { id } = await params;
    return (
        <div>
            <h1>Showing details for user #{id}</h1>
        </div>
    )
}

export default UserDetails