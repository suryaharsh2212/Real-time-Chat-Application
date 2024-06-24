import { create } from 'zustand';

const useUserStore = create((set) => ({
  fullName: '',
  id: '',
  token : '',
  updateToken :(newToken=>{set({token:newToken})}),
  updateFullName: (newFullName) => set({ fullName: newFullName }),
  updateId: (newId) => set({ id: newId }), 
}));

export default useUserStore;
