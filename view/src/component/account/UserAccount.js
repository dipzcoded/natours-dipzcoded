import React from 'react'
import AccountNavbar from './AccountNavbar';
import AccountSettings from './AccountSettings';

const UserAccount = () => {
    return (
        <main className="main">
            <div className="user-view">
            <AccountNavbar />
            <AccountSettings />
            </div>
            
        </main>
    )
}

export default UserAccount
