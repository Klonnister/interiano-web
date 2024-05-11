import type { PrimeVueConfiguration } from "primevue/config";

export const primeVueOptions: PrimeVueConfiguration = {
  pt: {
    inputtext: {
      root: 'bg-[#061321] text-[#A8B7EA] py-2.5 px-5 text-base rounded-md border-0 w-full local-inset-shadow',
    },

    dropdown: {
      root: 'bg-[#061321] text-[#A8B7EA] w-full rounded-md border-0',
      item: 'bg-[#061321] text-[#A8B7EA] text-[15px] py-[0.6rem] px-4',
    },

    button: {
      root: 'bg-[#061321] text-[#A8B7EA] border-0 py-[0.6rem] px-4',
    },

    dialog: {
      root: 'bg-[#061321] mx-4',
    },
  }
}