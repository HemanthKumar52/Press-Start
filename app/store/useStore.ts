import { create } from 'zustand';

type AppStep = 'landing' | 'boot' | 'account' | 'skills' | 'city' | 'result';

interface UserStats {
  calm: number;
  luck: number;
  energy: number;
  smiles: number;
}

interface UserProfile {
  astroName: string;
  activities: string[];
  precious: string;
  color: string;
  ability: string;
  movie: string;
  song: string;
  habit: string;
  style: string;
  characterMatch: string;
  countries: string[];
  book: string;
  shortStory: string;
  car: string;
  carImage: string; // Placeholder for the image URL
  music: string;
  musicUrl: string; // Placeholder for audio URL
}

interface AppState {
  step: AppStep;
  username: string;
  gender: 'male' | 'female' | 'non-binary' | '';
  avatarId: string;
  stats: UserStats;
  selectedSkills: string[];
  terminalMessage: string;
  generatedProfile: UserProfile | null;

  setStep: (step: AppStep) => void;
  setUsername: (name: string) => void;
  setGender: (gender: 'male' | 'female' | 'non-binary' | '') => void;
  setAvatar: (id: string) => void;
  updateStats: (stat: keyof UserStats, value: number) => void;
  toggleSkill: (skill: string) => void;
  setTerminalMessage: (msg: string) => void;
  setGeneratedProfile: (profile: UserProfile) => void;
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  step: 'landing',
  username: '',
  gender: '',
  avatarId: 'avatar-1',
  stats: {
    calm: 0,
    luck: 0,
    energy: 0,
    smiles: 0,
  },
  selectedSkills: [],
  terminalMessage: '',
  generatedProfile: null,

  setStep: (step) => set({ step }),
  setUsername: (username) => set({ username }),
  setGender: (gender) => set({ gender }),
  setAvatar: (avatarId) => set({ avatarId }),
  updateStats: (stat, value) => set((state) => ({
    stats: { ...state.stats, [stat]: state.stats[stat] + value }
  })),
  toggleSkill: (skill) => set((state) => {
    const skills = state.selectedSkills.includes(skill)
      ? state.selectedSkills.filter((s) => s !== skill)
      : [...state.selectedSkills, skill];
    return { selectedSkills: skills };
  }),
  setTerminalMessage: (terminalMessage) => set({ terminalMessage }),
  setGeneratedProfile: (generatedProfile) => set({ generatedProfile }),
  reset: () => set({
    step: 'landing',
    username: '',
    gender: '',
    avatarId: 'avatar-1',
    stats: { calm: 0, luck: 0, energy: 0, smiles: 0 },
    selectedSkills: [],
    terminalMessage: '',
    generatedProfile: null,
  }),
}));
