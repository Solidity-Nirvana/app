import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { Github, Twitter, Discord } from "@/components/shared/icons";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import Enroll from "@/components/home/enroll";

import dbConnect from 'lib/dbConnect'
import User from "models/User";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getTranslations } from 'next-intl/server';

import {getLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';

async function fetchData() {

  await dbConnect();
  
  // Get the session from the context
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.name) {
    return { status: false, membership: 'Free' };
  }

  /* find data based on session.username in our database */
  const result = await User.findOne({ email: session.user.email });

  if (!result) {

    // User not found, create and insert a new user
    const newUser = new User({
      email: session.user.email,
      membership: 'Free'
    });

    try {
      const savedUser = await newUser.save();
      return { status: false, membership: savedUser.membership };
    } catch (error) {
      console.error('Error creating and saving user:', error);
      return { status: false, membership: 'Free' };
    }

  }
  else {
    return {status: false, membership: result.membership};
  }

}

export default async function Home() {

  const locale = await getLocale();
  const messages = (await import(`../../messages/${locale}.json`))

  const t = await getTranslations('Home');
  const member = await fetchData();
  const session = await getServerSession(authOptions);

  const features = [
    {
      title: t('Worldclass Expertise'),
      description: t('From developers'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/knowledge.png"
              alt="From Within"
              width="200"
              height="200"
            ></Image>
        </div>
      ),
    },
    {
      title: t('Slow & Steady'),
      description: t('We will guide'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/nature.png"
              alt="From Within"
              width="200"
              height="200"
            ></Image>
        </div>
      ),
    },
    {
      title: t('Student Discounts'),
      description: t('Students are eligible'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/school.png"
              alt="From Within"
              width="200"
              height="200"
            ></Image>
        </div>
      ),
    },
  ];

  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/solidity-nirvana/easy",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 12 hours
      next: { revalidate: 86400 / 2 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

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
            className="animate-fade-up"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          ></Image>
        </div>
        <br />
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-green-600 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t('Solidity Nirvana')}</Balancer>
        </h1>
        <h3
          className="animate-fade-up bg-gradient-to-br from-green-800 to-black bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-3xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t('Ultimate')}</Balancer>
        </h3>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-400 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:bg-gray-100"
            href="https://github.com/Solidity-Nirvana/Easy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="hidden sm:inline-block">Github</span>
              {/* {' '}
              <span className="font-semibold">{nFormatter(stars)} ⭐</span> */}
            </p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-400 bg-sky-200 px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-sky-300 hover:text-gray-900 hover:border-gray-800"
            href="https://twitter.com/soliditynirvana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
            <p>
              <span className="hidden sm:inline-block">Twitter</span>
            </p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-400 bg-green-200 px-5 py-1 text-sm text-slate-600 shadow-md transition-colors hover:bg-green-300 hover:border-gray-800"
            href="https://discord.gg/uUJkMHYngH"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Discord />
            <p>
              <span className="hidden sm:inline-block">Discord</span>
            </p>
          </a>
        </div>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>
          {t('Enroll')}
          </Balancer>
        </p>
        {/* <br />
        <a
          href="https://twitter.com/SolidityNirvana"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-gray-200 px-7 py-2 transition-colors hover:bg-blue-300"
        >
          <Twitter className="h-5 w-5 text-[#000]" />
          <p className="text-sm font-semibold text-[#000]">
            @SolidityNirvana
          </p>
        </a> */}
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 py-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
          />
        ))}
      </div>
      <br />
      <br />
      <div>
        <NextIntlClientProvider messages={messages}>
          <Enroll session={session} membership={member.membership} />
        </NextIntlClientProvider>
      </div>
    </>
  );
}

