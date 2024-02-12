import React from "react";
import Input from "./Input";
import Image from "next/image";
import SaveChangesButton from "./buttons/SaveChangesButton";
import CancelButton from "./buttons/CancelButton";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import Link from "next/link";
import { useFormik } from "formik";
import { useEffect } from "react";

import { editFormValidator } from "@/util/validationSchema";
import { useStore } from "zustand";
import { useInvoicesStore } from "@/stores/invoices";

function NewForm({ handleAddModal }) {
  const payment = [
    "Net 1 Day",
    "Net 7 Days",
    "Net 14 Days",
    "Net 14 Days",
    "Net 30 Days",
  ];
  const [selected, setSelected] = useState(payment[0]);
  const [addItem, setAddItem] = useState(false);
  const [ItemsArr, setItemsArr] = useState([]);
  const { addData, copyData } = useInvoicesStore();

  const formik = useFormik({
    initialValues: {
      id: Date.now().toString(),

      senderAddress: {
        street: "",
        city: "",
        country: "",
        postCode: "",
      },
      clientAddress: {
        street: "",
        city: "",
        country: "",
        postCode: "",
      },
      items: {},
      clientName: "",
      clientEmail: "",
      status: "pending",
      createdAt: new Date().toISOString().slice(0, 10), // 현재 날짜를 YYYY-MM-DD 형식으로 초기화,      paymentTerms: selected,
      description: "",
      paymentDue: "",
      total: "",
      paymentTerms: selected,
    },
    validationSchema: editFormValidator,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSelect = (value) => {
    formik.setFieldValue("paymentTerms", value);
  };

  const handleAdd = () => {
    if (!addItem) {
      setAddItem(true);
    }
    // formik.setFieldValue("items", );
    let newItem = setItemsArr([
      ...formik.values.items,
      {
        name: "",
        quantity: "",
        price: "",
        total: "",
      },
    ]);
  };

  useEffect(() => {
    formik.setFieldValue("items", ItemsArr);
  }, [ItemsArr]);

  useEffect(() => {
    const selectedDays = Number(selected.trim().slice(3, 5));
    const currentDateInMillis = new Date(formik.values.createdAt).getTime();
    const dueDateInMillis =
      currentDateInMillis + selectedDays * 24 * 60 * 60 * 1000;
    const dueDate = new Date(dueDateInMillis);
    formik.setFieldValue("paymentDue", dueDate.toISOString().slice(0, 10));
  }, [selected, formik.values.createdAt, selected]);
  console.log(formik.values);
  return (
    <form
      className="bg-[#141625]   rounded-r-xl     "
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-5 p-20">
        <h1 className="font-bold text-xl ">New Invoice</h1>
        <p className="text-[#7C5DFA] pb-3">Bill From</p>
        <div>
          <label> Street Address</label>
          <Input
            className={
              formik.touched.senderAddress?.street &&
              formik.errors.senderAddress?.street
                ? "border border-[#EC5757]"
                : ""
            }
            onChange={formik.handleChange}
            id="senderAddress.street"
            name="senderAddress.street"
            type={"text"}
            value={formik.values.senderAddress.street}
          />
        </div>
        <div className="flex gap-3 justify-center items-start">
          <div>
            <label
              htmlFor=""
              className={
                formik.touched.senderAddress?.city &&
                formik.errors.senderAddress?.city
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              City
            </label>
            <Input
              className={
                formik.touched.senderAddress?.city &&
                formik.errors.senderAddress?.city
                  ? "border border-[#EC5757]"
                  : ""
              }
              onChange={formik.handleChange}
              id="senderAddress.city"
              name="senderAddress.city"
              type={"text"}
              value={formik.values.senderAddress.city}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className={
                formik.touched.senderAddress?.postCode &&
                formik.errors.senderAddress?.postCode
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              Post Code
            </label>
            <Input
              className={
                formik.touched.senderAddress?.postCode &&
                formik.errors.senderAddress?.postCode
                  ? "border border-[#EC5757]"
                  : ""
              }
              onChange={formik.handleChange}
              id="senderAddress.postCode"
              name="senderAddress.postCode"
              type={"text"}
              value={formik.values.senderAddress.postCode}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className={
                formik.touched.senderAddress?.country &&
                formik.errors.senderAddress?.country
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              Country
            </label>
            <Input
              className={
                formik.touched.senderAddress?.country &&
                formik.errors.senderAddress?.country
                  ? "border border-[#EC5757]"
                  : ""
              }
              onChange={formik.handleChange}
              id="senderAddress.country"
              name="senderAddress.country"
              type={"text"}
              value={formik.values.senderAddress.country}
            />
          </div>
        </div>
        <p className="text-[#7C5DFA] pt-3">Bill To</p>
        <div>
          <label
            htmlFor=""
            className={
              formik.touched.clientName && formik.errors.clientName
                ? "text-[#EC5757]"
                : ""
            }
          >
            Client's Name
          </label>
          {formik.touched.clientName && formik.errors.clientName ? (
            <p className="font-bold text-[#EC5757] text-xs">
              {formik.errors.clientName}
            </p>
          ) : null}
          <Input
            className={
              formik.touched.clientName && formik.errors.clientName
                ? "border border-[#EC5757]"
                : ""
            }
            onChange={formik.handleChange}
            id={"clientName"}
            name={"clientName"}
            type={"text"}
            value={formik.values.clientName}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className={
              formik.touched.clientEmail && formik.errors.clientEmail
                ? "text-[#EC5757]"
                : ""
            }
          >
            Client's Email
          </label>
          {formik.touched.clientEmail && formik.errors.clientEmail ? (
            <p className="font-bold text-[#EC5757] text-xs">
              {formik.errors.clientEmail}
            </p>
          ) : null}
          <Input
            className={
              formik.touched.clientEmail && formik.errors.clientEmail
                ? "border border-[#EC5757]"
                : ""
            }
            onChange={formik.handleChange}
            id={"clientEmail"}
            name={"clientEmail"}
            type={"email"}
            value={formik.values.clientEmail}
          />
        </div>
        <div>
          <label
            htmlFor=""
            className={
              formik.touched.clientAddress?.street &&
              formik.errors.clientAddress?.street
                ? "text-[#EC5757]"
                : ""
            }
          >
            Streen Address
          </label>
          {formik.touched.clientAddress?.street &&
          formik.errors.clientAddress?.street ? (
            <p className="font-bold text-[#EC5757] text-xs">
              {formik.errors.clientAddress.street}
            </p>
          ) : null}
          <Input
            className={
              formik.touched.clientAddress?.street &&
              formik.errors.clientAddress?.street
                ? "border border-[#EC5757]"
                : ""
            }
            onChange={formik.handleChange}
            id="clientAddress.street"
            name="clientAddress.street"
            type={"text"}
            value={formik.values.clientAddress.street}
          />
        </div>
        <div className="flex justify-center items-start gap-3">
          <div>
            <label
              htmlFor=""
              className={
                formik.touched.clientAddress?.city &&
                formik.errors.clientAddress?.city
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              City
            </label>
            <Input
              className={
                formik.touched.clientAddress?.city &&
                formik.errors.clientAddress?.city
                  ? "border border-[#EC5757]"
                  : ""
              }
              onChange={formik.handleChange}
              id="clientAddress.city"
              name="clientAddress.city"
              type={"text"}
              value={formik.values.clientAddress.city}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className={
                formik.touched.clientAddress?.postCode &&
                formik.errors.clientAddress?.postCode
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              Post Code
            </label>
            <Input
              className={
                formik.touched.clientAddress?.postCode &&
                formik.errors.clientAddress?.postCode
                  ? "border border-[#EC5757]"
                  : ""
              }
              onChange={formik.handleChange}
              id="clientAddress.postCode"
              name="clientAddress.postCode"
              type={"text"}
              value={formik.values.clientAddress.postCode}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className={
                formik.touched.clientAddress?.country &&
                formik.errors.clientAddress?.country
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              Country
            </label>
            <Input
              className={
                formik.touched.clientAddress?.country &&
                formik.errors.clientAddress?.country
                  ? "border border-[#EC5757]"
                  : ""
              }
              onChange={formik.handleChange}
              id="clientAddress.country"
              name="clientAddress.country"
              type={"text"}
              value={formik.values.clientAddress.country}
            />
          </div>
        </div>

        <div className=" flex justify-start items-start gap-3 ">
          <div className="w-1/2">
            <label
              className={
                formik.touched.createdAt && formik.errors.createdAt
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              Invoice Date
            </label>
            <Input
              className={
                formik.touched.createdAt && formik.errors.createdAt
                  ? "border border-[#EC5757]"
                  : "  rounded-lg"
              }
              type={"date"}
              onChange={formik.handleChange}
              id={"createdAt"}
              name={"createdAt"}
              value={formik.values.createdAt}
            />
          </div>
          <div className="w-1/2 flex flex-col relative ">
            <label
              htmlFor=""
              className={
                formik.touched.paymentTerms && formik.errors.paymentTerms
                  ? "text-[#EC5757]"
                  : ""
              }
            >
              Payment Terms
            </label>
            <Listbox value={selected} onChange={setSelected}>
              <Listbox.Button
                onClick={() => handleSelect(selected)}
                className={
                  formik.touched.paymentTerms && formik.errors.paymentTerms
                    ? "bg-[#1E2139]  relative border border-[#EC5757] mb-3 rounded  outline-none text-left  font-bold tracking-[-0.25px] text-white p-3 focus:caret-[#7C5DFA]"
                    : "bg-[#1E2139] mb-3  relative rounded border-none outline-none text-left  font-bold tracking-[-0.25px] text-white p-3  focus:border-[#7C5DFA]"
                }
              >
                {selected}
              </Listbox.Button>
              <Listbox.Options
                className={"absolute top-[100%] bg-[#1E2139] rounded w-full   "}
              >
                {payment.map((payment, index) => (
                  <Listbox.Option
                    key={index}
                    value={payment}
                    className={
                      "border-b border-[#141625]  cursor-pointer hover:text-[#7C5DFA] p-3 pl-6"
                    }
                  >
                    {payment}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>
        <div>
          <label
            htmlFor=""
            className={
              formik.touched.description && formik.errors.description
                ? "text-[#EC5757]"
                : ""
            }
          >
            Project Description
          </label>
          {formik.touched.description && formik.errors.description ? (
            <p className="font-bold text-[#EC5757] text-xs">
              {formik.errors.description}
            </p>
          ) : null}
          <Input
            className={
              formik.touched.description && formik.errors.description
                ? "border border-[#EC5757]"
                : ""
            }
            onChange={formik.handleChange}
            id={"description"}
            name={"description"}
            type={"text"}
            value={formik.values.description}
          />
        </div>
        <p className="text-[#777F98] font-bold">Item List</p>

        <table className="w-full ">
          <tbody>
            <tr className=" ">
              <td>Item Name</td>
              <td>Qty.</td>
              <td>Price</td>
              <td>Total</td>
            </tr>

            {formik.values.items.length > 0 &&
              formik.values?.items?.map((items, index) => {
                return (
                  <tr key={index} className="">
                    <td className="pr-3 w-[30%] ">
                      <Input
                        // className={
                        //   formik.touched.items && formik.errors.items
                        //     ? "border border-[#EC5757]"
                        //     : "border-none"
                        // }
                        onChange={formik.handleChange}
                        id={`items[${index}].name`}
                        name={`items[${index}].name`}
                        type={"text"}
                        value={formik.values.items[index]?.name}
                      />
                    </td>
                    <td className="pr-3 w-[15%]">
                      <Input
                        className={
                          formik.touched.items?.quantity &&
                          formik.errors.items?.quantity
                            ? "border border-[#EC5757]"
                            : ""
                        }
                        onChange={formik.handleChange}
                        id={`items[${index}].quantity`}
                        name={`items[${index}].quantity`}
                        type={"text"}
                        value={formik.values.items[index]?.quantity}
                      />
                    </td>
                    <td className="pr-3 w-[30%]">
                      <Input
                        className={
                          formik.touched.items?.price &&
                          formik.errors.items?.price
                            ? "border border-[#EC5757]"
                            : ""
                        }
                        onChange={formik.handleChange}
                        id={`items[${index}].price`}
                        name={`items[${index}].price`}
                        type={"text"}
                        value={
                          typeof formik.values.items[index]?.price === "number"
                            ? formik.values.items[index].price.toFixed(2)
                            : formik.values.items[index].price
                        }
                      />
                    </td>
                    <td className="pr-3 w-[15%]">
                      <Input
                        onChange={formik.handleChange}
                        id={`items[${index}].total`}
                        name={`items[${index}].total`}
                        type={"text"}
                        value={formik.values.items[index]?.total}
                      />
                      {/* {(
                        formik.values.items[index].price *
                        formik.values.items[index].quantity
                      ).toFixed(2)} */}
                    </td>
                    <td
                      className=" w-[10%]   "
                      onClick={() => {
                        handleDelete(formik.values?.items[index]);
                      }}
                    >
                      <Image
                        src={"/assets/icon-delete.svg"}
                        width={15}
                        height={15}
                        alt="icon"
                        className="m-auto cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button
          type="button"
          className="bg-[#252945] p-3 rounded-full"
          onClick={() => handleAdd()}
        >
          + Add New Item
        </button>
      </div>

      <div className="  p-6 sticky left-0  bottom-0 bg-[#141625]   rounded-r-xl flex gap-10 justify-end items-center">
        <CancelButton onClick={() => handleAddModal()} />

        <SaveChangesButton
          onClick={() => {
            addData(formik.values);
          }}
        />
      </div>
      {(formik.touched.senderAddress && formik.errors.senderAddress) ||
      (formik.touched.clientAddress && formik.errors.clientAddress) ||
      (formik.touched.items && formik.errors.items) ||
      (formik.touched.clientName && formik.errors.clientName) ||
      (formik.touched.clientEmail && formik.errors.clientEmail) ||
      (formik.touched.createdAt && formik.errors.createdAt) ||
      (formik.touched.paymentTerms && formik.errors.paymentTerms) ||
      (formik.touched.description && formik.errors.description) ? (
        <p className="font-bold text-[#EC5757] ">- All fields must be added</p>
      ) : null}
      {formik.touched.items && formik.errors.items ? (
        <p className="font-bold text-[#EC5757] ">- An item must be added</p>
      ) : null}
    </form>
  );
}

export default NewForm;
