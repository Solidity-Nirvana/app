"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { AlignStartHorizontal, Video, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";

import {useTranslations} from 'next-intl';

export default function UserDropdown({ session }: { session: Session }) {
  
  const { email, image } = session?.user || {};

  const [openPopover, setOpenPopover] = useState(false);

  const t = useTranslations('Home');

  if (!email) return null;

  return (
    <div className="flex inline-block text-left">
      <Popover
        content={
          <div className="flex w-full rounded-md bg-white p-2 sm:w-100">

            <a href="/episodes">
              <button
                className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              >
                <Video className="h-4 w-4" />
                <p className="text-sm">{t('Episodes')}</p>
              </button>
            </a>
            <br />
            <a href="/dashboard">
              <button
                className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              >
                <AlignStartHorizontal className="h-4 w-4" />
                <p className="text-sm">{t('Dashboard')}</p>
              </button>
            </a>
            <br />
            <button
              className="flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut({callbackUrl: `${window.location.origin}`})}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">{t('Logout')}</p>
            </button>
          </div>
        }
        align={"end"}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
