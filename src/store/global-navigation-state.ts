import { create } from "zustand";

interface GlobalNavigationInterface {
    navigationBarState : boolean,
    ToggleNavigation : () => void,
    CartState : boolean,
    ToggleCartState : () => void,
    whislistState : boolean,
    ToggleWhislistState : () => void,
}


export const UseGlobalNavigationState = create<GlobalNavigationInterface>((set) => ({
    navigationBarState : false,

    ToggleNavigation : () => set((state) => {
        const CurrentNavigationState = state.navigationBarState;
        return {navigationBarState : !CurrentNavigationState}
    }),

    CartState : false,

    ToggleCartState : () => set((state) => {
        const CurrentCartState = state.CartState;
        return {CartState : !CurrentCartState}
    }),

    whislistState : false,

    ToggleWhislistState : () => set((state) => {
        const CurrentWhislistState = state.whislistState;
        return {whislistState : !CurrentWhislistState}
    })
})) 