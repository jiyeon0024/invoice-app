import { create } from "zustand";

export const useInvoicesStore = create((set) => ({
  data: [],
  copyData: [],
  paid: false,
  // fetchData: s

  setCopyData: (newData) => set({ copyData: newData }),
  setPaid: (id, paid) => {
    set((state) => {
      const updatedCopyData = state.copyData.map((i) => {
        if (i.id === id) {
          return { ...i, status: paid };
        }
        return i;
      });

      if (updatedCopyData) {
        localStorage.setItem("invoices", JSON.stringify(updatedCopyData));
      }
      console.log(updatedCopyData);

      return { copyData: updatedCopyData };
    });
  },
  filterData: (val) =>
    set((state) => {
      // val.includes(d.status)

      let arr = state.data.filter((d) => val.includes(d.status));

      return { copyData: arr };
    }),

  deleteData: (val) => {
    console.log("Deleting data:", val);
    set((state) => {
      const _invoice = state.copyData.filter((i) => i.id !== val.id);
      console.log("Deleted Data:", _invoice);
      return { copyData: _invoice };
    });
  },

  editData: (val, data) => {
    set((state) => {
      let _invoice = state.copyData;

      let arr = _invoice.map((i) => {
        if (i.id === val.id) {
          return { ...i, ...data };
        }
        return i;
      });
      console.log(arr);
      // localStorage.setItem('invoices')
      return { copyData: arr };
    });
  },

  addData: (val) => {
    set((state) => {
      let newArr = state.copyData;
      let add = [...newArr, val];
      console.log("addddd");
      return { copyData: add };
    });
  },
  fetchData: async () => {
    try {
      if (localStorage.getItem("invoices")) {
        let invoices = localStorage.getItem("invoices");
        return set((state) => ({
          data: JSON.parse(invoices),
          copyData: JSON.parse(invoices),
        }));
      }
      const res = await fetch("/data.json");
      const val = await res.json();
      // console.log(val);
      return set((state) => ({ data: val, copyData: val }));
    } catch (error) {
      console.log(error);
    }
  },
}));
