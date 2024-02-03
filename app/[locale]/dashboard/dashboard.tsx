"use client";

import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { Session } from "next-auth";
import Generic from "@/components/shared/generic";

import {useTranslations} from 'next-intl';

export default function Dashboard({ session, membership }: { session: Session | null, membership: string }) {

  const { email, image } = session?.user || {};

  const t = useTranslations('Home');

  const locales = ['en', 'ar', 'fr', 'es', 'zh', 'de', 'hi', 'id', 'pt', 'ru', 'tr']

  const localesFull = [
    'English', // en
    'العربية', // ar (Arabic)
    'Français', // fr (French)
    'Español', // es (Spanish)
    '中文',     // zh (Chinese)
    'Deutsch', // de (German)
    'हिन्दी',   // hi (Hindi)
    'Bahasa Indonesia', // id (Indonesian)
    'Português', // pt (Portuguese)
    'Русский', // ru (Russian)
    'Türkçe' // tr (Turkish)
  ];

  if (!session) return <Generic />;

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/SNLogoClear.png"
            alt="SN logo"
            width="300"
            height="300"
          ></Image>
        </div>
        <br />
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-green-600 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationFillMode: "forwards" }}
        >
          <Balancer>{t('Solidity Nirvana')}</Balancer>
        </h1>
        <h3
          // className="animate-fade-up bg-gradient-to-br from-green-800 to-black bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-3xl md:leading-[5rem]"
          className="animate-fade-up bg-gradient-to-br from-green-800 to-black bg-clip-text text-center font-display text-sm sm:text-2xl"
          style={{ animationFillMode: "forwards" }}
        >
          <Balancer>{email}</Balancer>
        </h3>
        <br />
        <br />
        <div
          className="flex grid grid-cols-3 mt-6 gap-3 animate-fade-up items-center justify-center opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          {localesFull.map((locale, index) => <a
            className="flex items-center justify-center space-x-2 rounded-full border border-gray-400 bg-amber-100 px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:bg-amber-300"
            key={locale}
            href={"/" + locales[index]}
          >
            <p>
              <span className="sm:inline-block">{locale}</span>
            </p>
          </a>)}
        </div>
      </div>
    </>
  );
}