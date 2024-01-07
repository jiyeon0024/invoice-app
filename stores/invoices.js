import { create } from "zustand";

export const useInvoicesStore = create((set) => ({
  data: [],
  copyData: [],

  setCopyData: (newData) => set({ copyData: newData }),
  filterData: (val) =>
    set((state) => {
      // val.includes(d.status)

      // let arr = state.data.filter((d) => d.status === val);
      let arr = state.data.filter((d) => val.includes(d.status));
      console.log(arr);

      return { copyData: arr };
    }),

  fetchData: async () => {
    try {
      if (localStorage.getItem("invoices")) {
        let invoices = localStorage.getItem("invoices");
        return JSON.parse(invoices);
      }
      const res = await fetch("/data.json");
      const val = await res.json();
      console.log(val);
      return set((state) => ({ data: val, copyData: val }));
    } catch (error) {
      console.log(error);
    }
  },
}));
