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

export default function Episodes({ session, membership }: { session: Session | null, membership: string }) {

  const [difficulty, setDifficulty] = useState('Introduction');
  const [episode, setEpisode] = useState('none');
  const [episodeNumber, setEpisodeNumber] = useState('none');
  const [image, setImage] = useState('none');
  const [video, setVideo] = useState('Episode');
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

              <span className="grid h-10 place-content-center rounded-lg bg-orange-300 text-x">
                <b>Episodes - {membership}</b>
              </span>

              <ul className="mt-6 space-y-1">
                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden" onClick={() => {setEpisode('none'); setDifficulty('Introduction'); setVideo("Episode");}}>
                    <summary
                      className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-green-200 hover:text-gray-700"
                      style={{backgroundColor: difficulty === 'Introduction' ? '#bbf7d0' : ''}}
                    >
                      <span className="text-sm font-medium"> <b>Introduction</b></span>
                      <Turning />
                    </summary>
                  </details>
                </li>

                <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden" onClick={() => {setEpisode('none'); setDifficulty('Easy'); setVideo("Episode");}}>
                    <summary
                      className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-green-200 hover:text-gray-700"
                      style={{backgroundColor: difficulty === 'Easy' ? '#bbf7d0' : ''}}
                    >
                      <span className="text-sm font-medium"> <b>Easy</b></span>
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
                      {video}
                    </Balancer>
                  </h2>
                </div>
                <div>
                </div>
                <div>
                  <div>
                    <button
                      className="float-right group relative inline-block m-2 text-sm font-medium text-green-700 focus:outline-none focus:ring active:text-indigo-500"
                      onClick={() => {setEpisode("none"); setImage("none"); setEpisodeNumber("none"); setVideo("Episode")}}
                    >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white px-3 py-2">
                         Back
                      </span>
                    </button>
                  </div>
                  
                  <div>
                  {video === 'Episode' &&
                      <button
                        className="float-right group relative inline-block m-2 text-sm font-medium text-orange-700 focus:outline-none focus:ring active:text-indigo-500"
                        onClick={() => setVideo("Solutions")}
                      >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white px-3 py-2">
                         See Solutions
                      </span>
                    </button>
                  }
                  
                  {video === 'Solutions' &&
                      <button
                        className="float-right group relative inline-block m-2 text-sm font-medium text-green-700 focus:outline-none focus:ring active:text-indigo-500"
                        onClick={() => setVideo("Episode")}
                      >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white px-3 py-2">
                         Watch Episode
                      </span>
                    </button>
                  }
                  </div>

                </div>
                
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="player-wrapper">
                {
                  video === 'Episode' && <ReactPlayer
                    url={videoUrl}
                    className="react-player"
                    playing
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
                {
                  video === 'Solutions' && <ReactPlayer
                    url={videoUrl}
                    className="react-player"
                    playing
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
                {video} Agenda
                </Balancer>
              </h2>
              {
                video === 'Episode' && timestampsEpisode.map(({ description, timestampString, timestampNumber }, index) => (
                  <span key={index}>
                    <button
                      className="group relative inline-block my-2 text-sm font-medium text-green-700 focus:outline-none focus:ring active:text-indigo-500"
                      onClick={() => handleSeekTo(timestampNumber)}
                    >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white p-4 px-4 py-3">
                        <b>{description}</b> - {timestampString}
                      </span>
                    </button>
                    {index + 1 !== timestampsEpisode.length && ' ... '}
                  </span>
                ))
              }
              {
                video === 'Solutions' && timestampsSolutions.map(({ description, timestampString, timestampNumber }, index) => (
                  <span key={index}>
                    <button
                      className="group relative inline-block my-2 text-sm font-medium text-orange-700 focus:outline-none focus:ring active:text-indigo-500"
                      onClick={() => handleSeekTo(timestampNumber)}
                    >
                      <span
                        className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-orange-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
                      ></span>
                      <span className="relative block border border-current bg-white p-4 px-4 py-3">
                        <b>{description}</b> - {timestampString}
                      </span>
                    </button>
                    {index + 1 !== timestampsSolutions.length && ' ... '}
                  </span>
                ))
              }
              <br />
              <br />

              <h2 className="bg-gradient-to-br from-black to-grey-800 bg-clip-text font-display text-xl font-bold text-transparent md:text-1xl md:font-normal">
                <Balancer>
                  Foundry
                </Balancer>
              </h2>
              <CodeBlock code={'forge test --match "(scenarios)"'}/>
              <CodeBlock code={'forge test --match "(puzzles)"'}/>
              
            </div>}
            
            <div className="my-10 grid w-full max-w-screen-xl md:grid-cols-3">
              {difficulty === 'Introduction' && episode === 'none' && introEpisodes.map(({ title, description, image, episodeUrl, episodeTimestamps, solutionsTimestamp }, index) => (
                <div key={title} onClick={() => {
                  setEpisode(title); 
                  setImage(image); 
                  setEpisodeNumber(String(index + 1));
                  setVideoUrl(episodeUrl);
                  setTimestampsEpisode(episodeTimestamps);
                  setTimestampsSolutions(solutionsTimestamp);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  <CardEpisode
                    key={title}
                    title={title}
                    difficulty={difficulty}
                    description={description}
                    episodeNumber={index + 1}
                    image={image}
                  />
                </div>
              ))}

              {difficulty === 'Easy' && episode === 'none' && easyEpisodes.map(({ title, description, image, episodeUrl, episodeTimestamps, solutionsTimestamp }, index) => (
                <div key={title} onClick={() => {
                  setEpisode(title); 
                  setImage(image); 
                  setEpisodeNumber(String(index + 1));
                  setVideoUrl(episodeUrl);
                  setTimestampsEpisode(episodeTimestamps);
                  setTimestampsSolutions(solutionsTimestamp);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  <CardEpisode
                    key={title}
                    title={title}
                    difficulty={difficulty}
                    description={description}
                    episodeNumber={index + 1}
                    image={image}
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