import type { PrimeVueConfiguration } from "primevue/config";

export const primeVueOptions: PrimeVueConfiguration = {
  pt: {
    inputtext: {
      root: 'bg-[#061321] text-[#dae0f5] py-2.5 px-4 text-base rounded-md border-0 w-full local-inset-shadow disabled:opacity-70 transition-all duration-300 ease-in-out',
    },

    textarea: {
      root: 'bg-[#061321] text-[#dae0f5] py-2.5 px-4 text-base rounded-md border-0 w-full local-inset-shadow disabled:opacity-70 transition-all duration-300 ease-in-out',
    },

    password: {
      root: 'w-full',
    },

    dropdown: {
      root: 'bg-[#061321] w-full rounded-md border-0 local-shadow transition-all duration-300 ease-in-out',
      input: 'text-[#dae0f5]',
      wrapper: 'bg-[#061321] rounded-md mt-2 dropdown-scrollbar',
      panel: 'bg-[#061321]',
      header: 'bg-[#061321]',
      item: 'text-[#A8B7EA] hover:bg-[#071729] text-[15px] py-[0.6rem] px-4 hover:text-white',
      filterInput: 'bg-[#050f1a]',
    },

    button: {
      root: 'bg-[#061321] text-[#A8B7EA] border-0 py-[0.6rem] px-4',
    },

    dialog: {
      root: 'bg-[#061321] mx-4',
    },
    paginator: {
      root: 'bg-[#0E1D2C] local-shadow transition-all duration-300 ease-in-out',
    },

    message: {
      wrapper: 'py-1.5',
      root: 'text-sm mt-0 mb-3',
      text: 'text-sm',
    }
  }
}