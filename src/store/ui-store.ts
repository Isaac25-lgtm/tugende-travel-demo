import { create } from 'zustand';
import type { PersonaType } from '@/types/persona';

interface UIState {
  persona: PersonaType;
  isMobileMenuOpen: boolean;
  isScrolled: boolean;

  setPersona: (persona: PersonaType) => void;
  togglePersona: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setIsScrolled: (scrolled: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  persona: 'international',
  isMobileMenuOpen: false,
  isScrolled: false,

  setPersona: (persona) => set({ persona }),
  togglePersona: () =>
    set((state) => ({
      persona: state.persona === 'international' ? 'ugandan' : 'international',
    })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}));
