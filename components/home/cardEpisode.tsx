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
  membership
}: {
  title: string;
  difficulty: string;
  episodeNumber: Number;
  description: string;
  image: string;
  large?: boolean;
  premium: boolean;
  membership: string;
}) {
  return (
    /// transition duration-500 hover:rotate-6
    <div
      className={`relative col-span-1 h-80 p-8 hover:border hover:border-green-600 overflow-hidden rounded-xl bg-transparent hover:bg-green-200 transition duration-500 hover:rotate-6${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="mx-auto max-w-md text-center pb-2">
        <h2 className="bg-gradient-to-br from-black to-zinc-400 bg-clip-text font-display text-xl font-bold text-transparent md:text-xl md:font-normal">
          <Balancer>
            #{String(episodeNumber)} | {difficulty}
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
          {description} {membership}
        </div>
      </div>
    </div>
  );
}
