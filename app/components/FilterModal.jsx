import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInvoicesStore } from "@/stores/invoices";
import CheckBox from "./CheckBox";

function FilterModal() {
  const [filterData] = useInvoicesStore((state) => [state.filterData]);

  const [selected, setSelected] = useState(["pending", "paid", "draft"]);

  const handleChange = (val) => {
    if (selected.includes(val)) {
      setSelected(selected.filter((i) => i !== val));
    } else {
      setSelected([...selected, val]);
    }
  };

  useEffect(() => {
    filterData(selected);
  }, [selected]);

  return (
    <div className="bg-[#252945] w-full rounded-md p-6">
      <div className="flex justify-start items-center gap-3  "></div>

      <CheckBox
        selected={selected}
        id={"draftCheckbox"}
        checked={selected.includes("draft")}
        onChange={() => handleChange("draft")}
        htmlFor={"draftCheckbox"}
        item={"Draft"}
      />
      <CheckBox
        selected={selected}
        id={"pendingCheckbox"}
        checked={selected.includes("pending")}
        onChange={() => handleChange("pending")}
        htmlFor={"pendingCheckbox"}
        item={"Pending"}
      />
      <CheckBox
        selected={selected}
        id={"paidCheckbox"}
        checked={selected.includes("paid")}
        onChange={() => handleChange("paid")}
        htmlFor={"paidCheckbox"}
        item={"Paid"}
      />
    </div>
  );
}

export default FilterModal;
