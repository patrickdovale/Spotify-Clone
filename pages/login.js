import React from 'react'
import {getProviders, signIn} from 'next-auth/react'

function login(props) {
    return (
        <div>
            <h1>Essa é a página de login</h1>
        </div>
    )
}

export default login;

export async function getServerSideProps(){
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}
