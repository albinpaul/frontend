import { atom } from "recoil";

import { recoilPersist } from 'recoil-persist'

// const localStorage = typeof window !== `undefined` ? window.localStorage : null

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: window.localStorage
})

export const userAtom = atom<{
    loading: boolean;
    user?: {
        email: string;
        accessToken: string;
        displayName: string,
    }
}>({
    key: "userAtom",
    default: {
        loading: true
    },
    effects_UNSTABLE: [persistAtom]
})