"use client";

class HorrorAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.2;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public startAtmosphere() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isPlaying) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;

      // 1. Deep Sub-Bass Rumbling Drone (48Hz)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = "sine";
      this.droneOsc1.frequency.setValueAtTime(48, now);

      // 2. Detuned Sub Drone (51Hz) creates ominous binaural beating
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = "triangle";
      this.droneOsc2.frequency.setValueAtTime(51.5, now);

      // Lowpass resonant filter for cavernous depth
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(140, now);
      this.filterNode.Q.setValueAtTime(4.0, now);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.35, now);

      this.droneOsc1.connect(this.filterNode);
      this.droneOsc2.connect(this.filterNode);
      this.filterNode.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.droneOsc1.start();
      this.droneOsc2.start();

      // 3. Ambient Fog Whisper (filtered white noise)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(320, now);
      noiseFilter.Q.setValueAtTime(3.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.06, now);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.noiseNode.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Could not start horror audio atmosphere:", e);
    }
  }

  public stopAtmosphere() {
    if (!this.isPlaying) return;
    try {
      if (this.droneOsc1) {
        this.droneOsc1.stop();
        this.droneOsc1.disconnect();
      }
      if (this.droneOsc2) {
        this.droneOsc2.stop();
        this.droneOsc2.disconnect();
      }
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      }
    } catch (err) {
      // Ignored
    }
    this.isPlaying = false;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public playCreepyClick() {
    this.initContext();
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      // safe fallback
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const horrorAudio = new HorrorAudioEngine();
