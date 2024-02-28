"use client";

import { Session } from "next-auth";
import React from 'react';
import { useSignInModal } from "../layout/sign-in-modal";

import {useTranslations} from 'next-intl';

export default function Enroll({ session, membership }: { session: Session | null, membership: string }) {

  const t = useTranslations('Enroll');

  const { SignInModal, setShowSignInModal } = useSignInModal();

  const { email, image } = session?.user || {};

  if (!email) return (
    <div className="relative text-left max-w-xl">
      <SignInModal />
      <div className="text-center">
        <button
          className="mt-4 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-green-700 active:bg-green-700 transition-colors duration-500"
          onClick={() => setShowSignInModal(true)}
        >
          {t('Sign Up - Sign In')}
        </button>
      </div>
    </div>
  );

  else if (membership == 'Free') return (
    <div className="relative text-left max-w-xl">
        <div className="text-center">
          <a
            className="mt-4 inline-block w-full bg-gray-500 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-green-700 active:bg-green-700 transition-colors duration-500"
            href={"/episodes"}
            rel="noreferrer"
          >
            {t('Watch Episodes')}
          </a>
        </div>
        <div className="text-center">
          <a
            className="mt-4 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-yellow-600 active:bg-yellow-600 transition-colors duration-500"
            href={"https://enroll.soliditynirvana.com/b/7sI8zr5mCdDH5GMbIM?prefilled_email=" + email}
            rel="noreferrer"
            target="_blank"
          >
            {t('Early Access - $50')}
          </a>
        </div>
    </div>
  )

  else return (
    <div className="relative text-left max-w-xl">
        <div className="text-center">
          <a
            className="mt-4 inline-block w-full bg-gray-500 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-green-700 active:bg-green-700 transition-colors duration-500"
            href={"/episodes"}
            rel="noreferrer"
          >
            {t('Watch Episodes')}
          </a>
        </div>
    </div>
  )

}
