"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { AlignStartHorizontal, Video } from "lucide-react";

import {useTranslations} from 'next-intl';

export default function NavBar({ session }: { session: Session | null }) {

  const t = useTranslations('Home');

  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/SNLogoClear.png"
              alt="SN logo"
              width="45"
              height="45"
              className="mr-2 rounded-sm"
            ></Image>
            <p>{t('Solidity Nirvana')}</p>
          </Link>
          <div className="flex items-center justify-between">

            <div className="m-2">
              {session && (
                <span className="hidden sm:inline-block">
                  <a
                  className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-green-100 px-3 py-1 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:bg-green-300"
                  href="/episodes"
                >
                  <Video className="h-4 w-4" />
                  <p>
                    <span className="hidden sm:inline-block">{t('Episodes')}</span>
                  </p>
                </a>
                </span>
              )}
            </div>  

            <div className="m-3">
            {session && (
                <span className="hidden sm:inline-block">
                  <a
                  className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-orange-100 px-3 py-1 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:bg-orange-300"
                  href="/dashboard"
                >
                  <AlignStartHorizontal className="h-4 w-4" />
                  <p>
                    <span className="hidden sm:inline-block">{t('Dashboard')}</span>
                  </p>
                </a>
                </span>
              )}
            </div>  
            <div className="m-3">
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                {t('Sign In')}
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
