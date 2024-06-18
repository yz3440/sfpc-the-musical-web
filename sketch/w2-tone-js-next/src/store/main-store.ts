import { create } from "zustand";
import * as Tone from "tone";

export interface MainStore {
  synth: Tone.Synth | null;
  setSynth: (synth: Tone.Synth) => void;
  osc: Tone.Oscillator | null;
  setOsc: (osc: Tone.Oscillator) => void;
}

export const useMainStore = create<MainStore>((set) => ({
  synth: null,
  setSynth: (synth: Tone.Synth) => set({ synth }),
  osc: null,
  setOsc: (osc: Tone.Oscillator) => set({ osc }),
}));
