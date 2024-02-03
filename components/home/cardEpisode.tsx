import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import Turning from "../shared/turning";

export default function CardEpisode({
  title,
  episodeNumber,
  difficulty,
  description,
  image,
  large,
  premium,
  membership,
  email,
  freeText,
  upgradeText,
  premiumText
}: {
  title: string;
  difficulty: string;
  episodeNumber: Number;
  description: string;
  image: string;
  large?: boolean;
  premium: boolean;
  membership: string;
  email: string;
  freeText: string;
  upgradeText: string;
  premiumText: string;
}) {
  return (
    /// transition duration-500 hover:rotate-6
    <div
      className={`relative col-span-1 h-80 p-8 hover:border hover:border-green-600 overflow-hidden rounded-xl bg-transparent hover:bg-green-200 transition duration-500 ${
        large ? "md:col-span-2" : ""
      } ${
        !premium ? "hover:border hover:border-green-600 hover:bg-green-200 hover:rotate-6" : 
        premium && membership === 'Paid' ? "hover:border hover:border-green-600 hover:bg-green-200 hover:rotate-6" : 
        "hover:bg-gray-200 hover:border hover:border-gray-400"
      }`}
    >
      <div className="mx-auto max-w-md text-center pb-2">
        <h2 className="bg-gradient-to-br from-black to-zinc-400 bg-clip-text font-display text-xl font-bold text-transparent md:text-xl md:font-normal">
          <Balancer>
            #{String(episodeNumber)} - {difficulty} {premium ? '| ' + premiumText : '| ' + freeText}
          </Balancer>
        </h2>
      </div>
      <div className="flex pb-2 items-center justify-center">
        <Image
          style={{ borderRadius: '20%', overflow: 'hidden' }}
          src={image}
          alt="From Within"
          width="150"
          height="150"
        />  
      </div>
      <div className="mx-auto max-w-md text-center">
        <h2 className="bg-gradient-to-br from-black to-green-600 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>
            {title}
          </Balancer>
        </h2>
        <div className="leading-normal text-gray-700 text-sm">
          {description}
        </div>
      </div>
      {premium && membership !== 'Paid' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 bg-green-700 opacity-100 md:opacity-0 hover:opacity-100 transition-opacity duration-500 p-4">
          <span className="text-white font-bold text-4xl mb-4">{premiumText}</span>
          <a target="_blank" rel="noreferrer noopener" href={"https://enroll.soliditynirvana.com/b/7sI8zr5mCdDH5GMbIM?prefilled_email=" + email} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {upgradeText}
          </a>
        </div>
      )}
    </div>
  );
}
