import React from "react";
import { getProviders, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <div className="flex bg-black min-h-screen max-w-screen flex-col justify-center items-center">
      <img
        src="https://links.papareact.com/9xl"
        className="w-52 mb-5"
        alt="Logo Spotify"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Logar com {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
}
