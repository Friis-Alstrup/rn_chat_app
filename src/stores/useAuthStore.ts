import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {create} from 'zustand';

interface AuthStore {
  user: FirebaseAuthTypes.User | null;
  login: (user: FirebaseAuthTypes.User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  login: (user: FirebaseAuthTypes.User) => set({user}),
  logout: () => set({user: null}),
}));

export default useAuthStore;
