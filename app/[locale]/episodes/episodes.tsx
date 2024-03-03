"use client";

import React, { useRef } from 'react';
import { useState } from "react";
import { Session } from "next-auth";

import ReactPlayer from 'react-player';
import Balancer from "react-wrap-balancer";
import Image from "next/image";

import CardEpisode from "@/components/home/cardEpisode";
import Generic from "@/components/shared/generic";
import CodeBlock from "@/components/shared/codeBlock";
import Turning from "@/components/shared/turning";

import { introEpisodes, easyEpisodes } from "./episodesList";
import "./player.css";

import {useTranslations} from 'next-intl';

export default function Episodes({ 
  session, membership, locale
 }: { session: Session | null, membership: string, locale: string }) {

  const t = useTranslations('Episodes');

  const [difficulty, setDifficulty] = useState(t('Easy'));
  const [episode, setEpisode] = useState('none');
  const [episodeNumber, setEpisodeNumber] = useState('none');
  const [episodeVideo, setEpisodeVideo] = useState('none');
  const [solutionVideo, setSolutionVideo] = useState('none');
  const [image, setImage] = useState('none');
  const [mode, setMode] = useState(t('Episode'));
  const [videoUrl, setVideoUrl] = useState('none');
  const [timestampsEpisode, setTimestampsEpisode] = useState<{ description: string; timestampString: string; timestampNumber: number; }[]>([]);
  const [timestampsSolutions, setTimestampsSolutions] = useState<{ description: string; timestampString: string; timestampNumber: number; }[]>([]);

  const playerRef = useRef<ReactPlayer>(null);
  
  if (!session) return <Generic />;

  const handleSeekTo = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds');
    }
  };

  async function fetchSignedUrl(episodeName: string) {
    const response = await fetch(`/api/signedUrl?episodeName=${episodeName}`);
    const data = await response.json();
    setVideoUrl(data.signedUrl);
  }


  return (
    <>
      <div className="z-10">

        <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 px-5 md:grid-cols-5 xl:px-0">
          <div>
            <div>
              <div
                style={{display: "flex", justifyContent: "center"}}>
                <Image
                  src="/SNLogoClear.png"
                  alt="SN logo"
                  width="150"
                  height="150"
                  className="animate-fade-up"
                  style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
                />
              </div>
              <br />

              <span className="grid h-10 border-black place-content-center border border-slate-500 rounded-lg bg-orange-300 text-x">
                <b>{t('Episodes')}</b>
              </span>

              <ul className="mt-6 space-y-1">
                {/* <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden" onClick={() => {setEpisode('none'); setDifficulty('Introduction'); setMode("Episode");}}>
                    <summary
                      className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-green-200 hover:text-gray-700"
                      style={{backgroundColor: difficulty === 'Introduction' ? '#bbf7d0' : ''}}
                    >
                      <span className="text-sm font-medium"> <b>Introduction</b></span>
                      <Turning />
                    </summary>
                  </details>
                </li> */}

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden" onClick={() => {setEpisode('none'); setDifficulty(t('Easy')); setMode(t('Episode'));}}>
                    <summary
                      className="flex cursor-pointer items-center border border-green-600 justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-green-200 hover:text-gray-700"
                      style={{backgroundColor: difficulty === t('Easy') ? '#bbf7d0' : ''}}
                    >
                      <span className="text-sm font-medium"> <b>{t('Easy')}</b></span>
                      <Turning />
                    </summary>
                  </details>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-4 p-5">

            {episode !== 'none' && <div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Image
                    style={{ borderRadius: '20%', overflow: 'hidden' }}
                    src={image}
                    alt="From Within"
                    width="250"
                    height="250"
                  />
                </div>
                <div className="text-ellipsis">
                  <h2 className="bg-gradient-to-br from-black to-grey-800 bg-clip-text font-display text-xl font-bold text-transparent md:text-1xl md:font-normal">
                    <Balancer>
                      #{episodeNumber} | {difficulty}
                    </Balancer>
                  </h2>
                  <h2 className="bg-gradient-to-br from-black to-green-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-4xl md:font-normal">
                    <Balancer>
                      {episode}
                    </Balancer>
                  </h2>
                  <h2 className="bg-gradient-to-br from-black to-grey-800 bg-clip-text font-display text-xl font-bold text-transparent md:text-2xl md:font-normal">
                    <Balancer>
                      {mode}
                    </Balancer>
                  </h2>
                </div>
                <div>
                </div>
                <div>
                  <div>
                    <button
                      className="float-right group relative inline-block m-2 text-sm font-medium text-green-700 focus:outline-none focus:ring active:text-indigo-500"
                      onClick={() => {setEpisode("none"); setImage("none"); setEpisodeNumber("none"); setMode(t('Episode'))}}
                    >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white px-3 py-2">
                        {t('Back')}
                      </span>
                    </button>
                  </div>
                  
                  {/* <div>
                  {mode === 'Episode' &&
                      <button
                        className="float-right group relative inline-block m-2 text-sm font-medium text-orange-700 focus:outline-none focus:ring active:text-indigo-500"
                        onClick={() => { setMode("Solutions"); setVideoUrl(''); fetchSignedUrl(solutionVideo); }}
                      >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white px-3 py-2">
                         See Solutions
                      </span>
                    </button>
                  }
                  
                  {mode === 'Solutions' &&
                      <button
                        className="float-right group relative inline-block m-2 text-sm font-medium text-green-700 focus:outline-none focus:ring active:text-indigo-500"
                        onClick={() => { setMode("Solutions"); setVideoUrl(''); fetchSignedUrl(episodeVideo); }}
                      >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white px-3 py-2">
                         Watch Episode
                      </span>
                    </button>
                  }
                  </div> */}

                </div>
                
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="player-wrapper">

                {
                  videoUrl !== '' && (mode === t('Episode') || mode === 'Solutions') && <ReactPlayer
                    url={videoUrl}
                    className="react-player"
                    width="100%"
                    height="100%"
                    controls={true}
                    ref={playerRef}
                    config={{ file: { 
                      attributes: {
                        controlsList: 'nodownload'
                      }
                    }}}
                  />
                }
                
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              
              <h2 className="bg-gradient-to-br from-black to-grey-800 bg-clip-text font-display text-xl font-bold text-transparent md:text-1xl md:font-normal">
                <Balancer>
                <i>{mode}</i> | {t('Agenda')}
                </Balancer>
              </h2>
              {
                mode === t('Episode') && timestampsEpisode.map(({ description, timestampString, timestampNumber }, index) => (
                  <span key={index}>
                    <button
                      className="group relative inline-block my-2 text-sm font-medium text-yellow-700 focus:outline-none focus:ring active:text-indigo-500"
                      onClick={() => handleSeekTo(timestampNumber)}
                    >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-yellow-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white text-md p-4 px-4 py-3">
                        <i>{timestampString}</i>
                        <br />
                        {description}
                      </span>
                    </button>
                    {/* {index + 1 !== timestampsEpisode.length && ' ~ ~ ~ '} */}
                  </span>
                ))
              }
              {
                mode === 'Solutions' && timestampsSolutions.map(({ description, timestampString, timestampNumber }, index) => (
                  <span key={index}>
                    <button
                      className="group relative inline-block my-2 text-sm font-medium text-orange-700 focus:outline-none focus:ring active:text-indigo-500"
                      onClick={() => handleSeekTo(timestampNumber)}
                    >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white p-4 px-4 py-3">
                        <b>{index}</b> - {timestampString}
                      </span>
                    </button>
                    {index + 1 !== timestampsSolutions.length && ' ... '}
                  </span>
                ))
              }
              <br />
              <br />

              {/* <h2 className="bg-gradient-to-br from-black to-grey-800 bg-clip-text font-display text-xl font-bold text-transparent md:text-1xl md:font-normal">
                <Balancer>
                  Foundry
                </Balancer>
              </h2>
              <CodeBlock code={'forge test --match "(scenarios)"'}/>
              <CodeBlock code={'forge test --match "(puzzles)"'}/> */}
              
            </div>}
            
            <div className="my-10 grid w-full max-w-screen-xl md:grid-cols-3">
              {difficulty === t('Easy') && episode === 'none' && easyEpisodes.map(({ title, description, image, episodeVideo, solutionsVideo, episodeTimestamps, solutionsTimestamp, premium }, index) => (
                <div key={title} onClick={() => {
                    if (!premium || premium && membership == 'Paid') {
                      setVideoUrl('');
                      setEpisode(title); 
                      setEpisodeVideo(episodeVideo);
                      setSolutionVideo(solutionsVideo);
                      setImage(image); 
                      setEpisodeNumber(String(index + 1));
                      setTimestampsEpisode(episodeTimestamps);
                      setTimestampsSolutions(solutionsTimestamp);
                      fetchSignedUrl(episodeVideo + locale + ".mp4");
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    else {

                    }
                }}>
                  <CardEpisode
                    key={title}
                    title={title}
                    difficulty={difficulty}
                    description={description}
                    episodeNumber={index + 1}
                    image={image}
                    premium={premium}
                    membership={membership}
                    email={session.user.email}
                    freeText={t('Free')}
                    upgradeText={t('Upgrade')}
                    premiumText={t('Premium')}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}