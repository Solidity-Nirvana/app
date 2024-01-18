"use client";

import Image from "next/image";
import { Session } from "next-auth";
import React, { useState } from 'react';
import { imageSequence_01 } from "./enrollRotation";
import { useSignInModal } from "../layout/sign-in-modal";

import {useTranslations} from 'next-intl';

export default function Enroll({ session, membership }: { session: Session | null, membership: string }) {

  const t = useTranslations('Enroll');

  const { SignInModal, setShowSignInModal } = useSignInModal();

  const [width, setWidth] = useState(150)
  const [height, setHeight] = useState(150)

  const [currentIndex0, setCurrentIndex0] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [currentIndex5, setCurrentIndex5] = useState(0);
  const [currentIndex6, setCurrentIndex6] = useState(0);
  const [currentIndex7, setCurrentIndex7] = useState(0);

  const { email, image } = session?.user || {};

  if (!email) return (
    <div className="relative text-left max-w-xl">
      <SignInModal />
      <section className="overflow-hidden rounded-lg shadow-2xl drop-shadow-2xl md:grid md:grid-cols-4">
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex0]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex2]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex3]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />

        <div className="p-4 text-center sm:p-6 md:col-span-4 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest">
            {t('2 Free')}
          </p>

          <h2 className="mt-6 font-black uppercase">
            <span className="text-4-xl bg-gradient-to-r from-orange-400 via-orange-600 to-yellow-800 bg-clip-text font-extrabold text-transparent sm:text-5xl">
            {t('Solidity Nirvana')}
            </span>
          </h2>

          <button
            className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-orange-500 active:bg-orange-500 transition-colors duration-500"
            onClick={() => setShowSignInModal(true)}
          >
            {t('Enroll')}
          </button>

          <p className="mt-8 text-xs font-medium uppercase text-gray-400">
            {t('Awaken')}
          </p>
        </div>

        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex4]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex5]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex6]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[currentIndex7]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
      </section>
    </div>
  );


  // else if (membership == 'Free') return (

  else return (
    <div className="relative text-left max-w-xl">
      <section className="overflow-hidden rounded-lg shadow-2xl drop-shadow-2xl md:grid md:grid-cols-4">
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />

        <div className="p-4 text-center sm:p-6 md:col-span-4 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest">
            {t('Welcome')}
          </p>

          <h2 className="mt-6 font-black uppercase">
            <span className="text-4-xl bg-gradient-to-r from-orange-400 via-orange-600 to-yellow-800 bg-clip-text font-extrabold text-transparent sm:text-5xl">
              {t('Solidity Nirvana')}
            </span>
          </h2>

          <a
            className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-orange-500 active:bg-orange-500 transition-colors duration-500"
            href={"/episodes"}
            rel="noreferrer"
          >
            {t('Begin')}
          </a>

          <p className="mt-8 text-xs font-medium uppercase text-gray-400">
            {t('AwakenLess')}
          </p>
        </div>

        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
        <Image
          alt="Trainer"
          src={imageSequence_01.rotation[1]}
          className="h-32 w-full object-cover md:h-full"
          width={width}
          height={height}
        />
      </section>
    </div>
  )

  // else if (email.includes('.edu')) return (
  //   <div className="relative text-left max-w-xl">
  //     <section className="overflow-hidden rounded-lg shadow-2xl drop-shadow-2xl md:grid md:grid-cols-4">
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex0]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex1]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex2]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex3]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />

  //       <div className="p-4 text-center sm:p-6 md:col-span-4 lg:p-8">
  //         <p className="text-sm font-semibold uppercase tracking-widest">
  //           Enroll Today
  //         </p>

  //         <h2 className="mt-6 font-black uppercase">
  //           <span className="text-4-xl bg-gradient-to-r from-orange-400 via-orange-600 to-yellow-800 bg-clip-text font-extrabold text-transparent sm:text-5xl">
  //             SOLIDITY NIRVANA
  //           </span>
  //         </h2>

  //         <a
  //           className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-orange-500 active:bg-orange-500 transition-colors duration-500"
  //           href={"https://enroll.soliditynirvana.com/b/7sI8zr5mCdDH5GMbIM?prefilled_email=" + email}
  //           target="_blank"
  //           rel="noreferrer"
  //         >
  //           ENROLL
  //         </a>

  //         <p className="mt-8 text-xs font-medium uppercase text-gray-400">
  //           Awaken your mind. Realize your potential.
  //         </p>
  //       </div>

  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex4]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex5]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex6]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex7]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //     </section>
  //   </div>
  // );
  
  // else return (
  //   <div className="relative text-left max-w-xl">
  //     <section className="verflow-hidden rounded-lg shadow-2xl drop-shadow-2xl md:grid md:grid-cols-4">
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex0]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex1]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex2]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex3]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />

  //       <div className="p-4 text-center sm:p-6 md:col-span-4 lg:p-8">
  //         <p className="text-sm font-semibold uppercase tracking-widest">
  //           Enroll Today
  //         </p>

  //         <h2 className="mt-6 font-black uppercase">
  //           <span className="text-4xl bg-gradient-to-r from-orange-400 via-orange-600 to-yellow-800 bg-clip-text font-extrabold text-transparent sm:text-5xl">
  //             SOLIDITY NIRVANA
  //           </span>
  //         </h2>

  //         <a
  //           className="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-orange-500 active:bg-orange-500 transition-colors duration-500"
  //           href={"https://enroll.soliditynirvana.com/b/7sI8zr5mCdDH5GMbIM?prefilled_email=" + email}
  //           target="_blank"
  //           rel="noreferrer"
  //         >
  //           ENROLL
  //         </a>

  //         <p className="mt-8 text-xs font-medium uppercase text-gray-400">
  //           Awaken your mind. Realize your potential.
  //         </p>
  //       </div>

  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex4]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex5]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex6]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //       <Image
  //         alt="Trainer"
  //         src={imageSequence_01.rotation[currentIndex7]}
  //         className="h-32 w-full object-cover md:h-full"
  //         width={width}
  //         height={height}
  //       />
  //     </section>
  //   </div>
  // );

}
