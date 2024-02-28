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
      const email = session.user.email;
      const namePart = email.split('@')[0];
      const sanitized = namePart.replace(/[^a-zA-Z]/g, '');
      const response = await fetch('https://marketing.soliditynirvana.com/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: sanitized,
          api_key: process.env.SENDY_KEY,
          email: session.user.email,
          list: process.env.SENDY_LIST,
        }),
      });
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

  const features_a = [
    {
      title: t('21+ Episodes'),
      description: t('We will guide'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/waterfall.png"
              alt="From Within"
              width="200"
              height="200"
            ></Image>
        </div>
      ),
    },
    {
      title: t('Solidity Puzzles'),
      description: t('Foundry-rs'),
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
    {
      title: t('Early Access'),
      description: t('$200 -> $50'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/pose2.png"
              alt="From Within"
              width="200"
              height="200"
            ></Image>
        </div>
      ),
    }
  ];

  const features_b = [
    {
      title: t('10+ Languages'),
      description: t('Multi-language'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/lotus.png"
              alt="From Within"
              width="200"
              height="200"
            ></Image>
        </div>
      ),
    },
    {
      title: t('Discord Community'),
      description: t('Support'),
      demo: (
        <div className="flex items-center justify-center space-x-20">
            <Image
              style={{ borderRadius: '50%', overflow: 'hidden' }}
              src="/class2.png"
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
          className="animate-fade-up bg-gradient-to-br from-black to-green-600 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t('Solidity Nirvana')}</Balancer>
        </h1>


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
            <p className="hidden sm:inline-block">
              <span>Github</span>
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
            <p className="hidden sm:inline-block">
              <span>Twitter</span>
            </p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-400 bg-purple-200 px-5 py-1 text-sm text-slate-600 shadow-md transition-colors hover:bg-purple-300 hover:border-gray-800"
            href="https://discord.gg/uUJkMHYngH"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Discord />
            <p className="hidden sm:inline-block">
              <span>Discord</span>
            </p>
          </a>
        </div>

              <br />

        <div>
          <NextIntlClientProvider messages={messages}>
            <Enroll session={session} membership={member.membership} />
          </NextIntlClientProvider>
        </div>
        {/* <h3
          className="animate-fade-up bg-gradient-to-br from-green-800 uppercase to-black bg-clip-text text-center py-2 md:py-0 font-display text-xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-2xl md:leading-[4rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t('Ultimate')}</Balancer>
        </h3> */}

        {/* <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>
          {t('Enroll')}
          </Balancer>
        </p> */}
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
      <br />
      <br />
      
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 py-5 md:grid-cols-3 xl:px-0">
        {features_a.map(({ title, description, demo }) => (
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
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 py-5 md:grid-cols-2 xl:px-0">
        {features_b.map(({ title, description, demo }) => (
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
    </>
  );
}


