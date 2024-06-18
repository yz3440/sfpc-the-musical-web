"use client";

import Link from "next/link";

import { api } from "@/trpc/server";

import * as Tone from "tone";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useMemo, useState } from "react";

import { useMainStore } from "@/store/main-store";
import { AudioWaveform } from "lucide-react";

import { useSpring, animated } from "@react-spring/three";
import Scene from "./_components/scene";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const mainStore = useMainStore();

  const filter = useMemo(() => {
    return new Tone.Filter(200, "lowpass").toDestination();
  }, []);

  const synth = useMemo(() => {
    return new Tone.Synth().connect(filter);
  }, [filter]);

  const osc = useMemo(() => {
    return new Tone.Oscillator(440, "sine").connect(filter);
  }, [filter]);

  const toggleOsc = () => {
    if (osc.state === "started") {
      osc.stop();
    } else {
      osc.start();
    }
  };

  useEffect(() => {
    mainStore.setSynth(synth);
    mainStore.setOsc(osc);
    // return () => {
    //   synth.dispose();
    //   osc.dispose();
    // };
  }, [synth, osc]);

  const playTone = () => {
    synth.triggerAttackRelease("C4", "8n");
  };

  const sampler = useMemo(() => {
    return new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-gradient-to-br from-red-600 to-green-400">
      <div className="fixed bottom-0 z-10 flex flex-row items-center justify-center gap-12 px-4 py-2">
        <Button onClick={playTone}>Play tone</Button>
        {/* toggle osc */}
        <Toggle onClick={toggleOsc} className="bg-black text-white" size={"lg"}>
          <AudioWaveform size={32} />
        </Toggle>

        <Button onClick={() => sampler.triggerAttackRelease("A1", 0.5)}>
          Play Sampler
        </Button>
      </div>
      <div id="canvas-container" className="absolute h-screen w-screen">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </main>
  );
}
