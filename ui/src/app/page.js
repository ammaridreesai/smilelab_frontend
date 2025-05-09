"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  getAllCategory,
  getAllCustomer,
  getDoctorByCustomer,
  getProductsByCategory,
} from "./apis";

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [],
      stages: [],
    },
  });
  const [selectedClinicInfo, setSelectedClinicInfo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [majorCategories, setMajorCategories] = useState([]);
  const [productOptionsByCategory, setProductOptionsByCategory] = useState({});
  const [tempAmount, setTempAmount] = useState();
  const [clinicNames, setClinicNames] = useState([]);
  const [doctorsNames, setDoctorsNames] = useState([]);

  useEffect(() => {
    getAllCategory().then((response) => {
      if (response) {
        setMajorCategories(response);
      }
    });
    getAllCustomer().then((response) => {
      if (response) {
        setClinicNames(response);
      }
    });
  }, []);

  const products = watch("products");
  const handleClinicChange = (event) => {
    const selectedId = parseInt(event.target.value);
    getDoctorByCustomer(selectedId).then((response) => {
      if (response) {
        setDoctorsNames(response);
      }
    });
    const selectedClinic = clinicNames.find(
      (clinic) => clinic.id === selectedId
    );
    setSelectedClinicInfo(selectedClinic ? selectedClinic.town : "");
  };

  const calculateProductTotal = (product) => {
    const basePrice = parseFloat(product.basePrice) || 0;
    return basePrice;
  };

  const overallTotal = products.reduce((sum, product) => {
    return sum + calculateProductTotal(product);
  }, 0);

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };
  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  const {
    fields: stageFields,
    append: appendStage,
    remove: removeStage,
  } = useFieldArray({
    control,
    name: "stages",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const stageOptions = [
    { id: 1, name: "Stage A" },
    { id: 2, name: "Stage B" },
    { id: 3, name: "Stage C" },
  ];

  // const clinicNames = [
  //   {
  //     id: 1,
  //     name: "Clinic A",
  //     info: "lorem lorem lorem lorem lorem lorem lorem Clinic A",
  //   },
  //   {
  //     id: 2,
  //     name: "Clinic B",
  //     info: "lorem lorem lorem lorem lorem lorem lorem Clinic B",
  //   },
  //   {
  //     id: 3,
  //     name: "Clinic C",
  //     info: "lorem lorem lorem lorem lorem lorem lorem Clinic C",
  //   },
  // ];

  // const doctorsNames = [
  //   { id: 1, name: "Doctor A" },
  //   { id: 2, name: "Doctor B" },
  //   { id: 3, name: "Doctor C" },
  // ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    getProductsByCategory(category).then((response) => {
      if (response) {
        setProductOptionsByCategory((prevState) => ({
          ...prevState,
          [category]: response,
        }));
      }
    });
    appendProduct({
      product: "",
      units: "",
      discount: "",
      basePrice: "",
      category: category,
    });
    setShowCategoryDropdown(false);
  };

  const handleProductSelect = (index, productName, category) => {
    const selectedProduct = productOptionsByCategory[category].find(
      (p) => p.productName === productName
    );
    if (selectedProduct) {
      setValue(`products.${index}.basePrice`, selectedProduct.basePrice);
    }
  };

  const updatebasePrice = (index, discount) => {
    const product = products[index];
    const selectedProduct = productOptionsByCategory[product.category].find(
      (p) => p.productName === product.product
    );
    if (selectedProduct) {
      const originalbasePrice = tempAmount
        ? tempAmount
        : parseFloat(selectedProduct.basePrice);
      const discountAmount = originalbasePrice * (parseFloat(discount) / 100);
      const newbasePrice = originalbasePrice - discountAmount;
      setValue(`products.${index}.basePrice`, newbasePrice.toFixed(2));
    }
  };

  const updatebasePriceByUnit = (index, units) => {
    const product = products[index];
    const selectedProduct = productOptionsByCategory[product.category].find(
      (p) => p.productName === product.product
    );
    if (selectedProduct) {
      const originalbasePrice = parseFloat(selectedProduct.basePrice);
      const tempAmount = originalbasePrice * units;
      setTempAmount(tempAmount);
      setValue(`products.${index}.basePrice`, tempAmount.toFixed(2));
    }
  };
  return (
    <>
      <div className="">
        <div className="main-content flex-grow-1">
          <Navbar />
          <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
              <h1>New Work</h1>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="section-1 bg-light p-3">
                    <div className="row">
                      <div className="col-6">
                        <div>
                          <label htmlFor="clinic">Customer:</label>
                        </div>
                        <select
                          id="customer"
                          {...register("customer", {
                            required: "Customer selection is required",
                          })}
                          className="w-100"
                          onChange={handleClinicChange} // Update selected clinic info on change
                        >
                          <option value="">Select a customer</option>
                          {clinicNames.map((clinic) => (
                            <option key={clinic.id} value={clinic.id}>
                              {clinic.customerName}
                            </option>
                          ))}
                        </select>
                        {errors.customer && (
                          <p className="error">{errors.customer.message}</p>
                        )}
                      </div>
                      <div className="col-6">
                        {selectedClinicInfo && (
                          <div>
                            <strong>Clinic Info:</strong>
                            <p>{selectedClinicInfo}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="section-2 bg-light p-3 mt-5">
                    <div className="row">
                      <div className="col-3">
                        <div>
                          <label htmlFor="clinic">Work Code:</label>
                        </div>
                        <input
                          id="workCode"
                          {...register("workCode", {
                            required: "Work Code is required",
                          })}
                          className="w-100"
                        />

                        {errors.workCode && (
                          <p className="error">{errors.workCode.message}</p>
                        )}
                      </div>
                      <div className="col-3">
                        <div>
                          <label htmlFor="clinic">Box Number:</label>
                        </div>
                        <input
                          id="boxNumber"
                          {...register("boxNumber", {
                            required: "Box Number is required",
                          })}
                          className="w-100"
                        />

                        {errors.boxNumber && (
                          <p className="error">{errors.boxNumber.message}</p>
                        )}
                      </div>
                      <div className="col-3">
                        <div>
                          <label htmlFor="clinic">Doctor:</label>
                        </div>
                        <select
                          id="doctor"
                          {...register("doctor", {
                            required: "Doctor selection is required",
                          })}
                          className="w-100"
                        >
                          <option value="">Select a doctor</option>
                          {doctorsNames.map((clinic) => (
                            <option key={clinic.id} value={clinic.id}>
                              {clinic.name}
                            </option>
                          ))}
                        </select>

                        {errors.doctor && (
                          <p className="error">{errors.doctor.message}</p>
                        )}
                      </div>
                      <div className="col-3">
                        <div>
                          <label htmlFor="clinic">Job Type:</label>
                        </div>
                        <select
                          id="jobType"
                          {...register("jobType", {
                            required: "Job Type selection is required",
                          })}
                          className="w-100"
                        >
                          <option value="">Select a Job Type</option>
                          <option value="">Private</option>
                          <option value="">Independent</option>
                          <option value="">NHS</option>
                        </select>

                        {errors.jobType && (
                          <p className="error">{errors.jobType.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-3">
                        <div>
                          <label htmlFor="clinic">Patient Name:</label>
                        </div>
                        <input
                          id="patientName"
                          {...register("patientName", {
                            required: "Patient Name is required",
                          })}
                          className="w-100"
                        />

                        {errors.patientName && (
                          <p className="error">{errors.patientName.message}</p>
                        )}
                      </div>
                      <div className="col-3">
                        <div>
                          <label htmlFor="dateOfBirth">Date of Birth:</label>
                        </div>
                        <input
                          id="dateOfBirth"
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          {...register("dateOfBirth", {
                            required: "Date of Birth is required",
                            onChange: (e) => {
                              const today = new Date();
                              const birthDate = new Date(e.target.value);
                              let age =
                                today.getFullYear() - birthDate.getFullYear();
                              const monthDiff =
                                today.getMonth() - birthDate.getMonth();
                              if (
                                monthDiff < 0 ||
                                (monthDiff === 0 &&
                                  today.getDate() < birthDate.getDate())
                              ) {
                                age--;
                              }
                              setValue("age", age);
                            },
                          })}
                          className="w-100"
                        />
                        {errors.dateOfBirth && (
                          <p className="error">{errors.dateOfBirth.message}</p>
                        )}
                      </div>
                      <div className="col-3">
                        <div>
                          <label htmlFor="age">Age:</label>
                        </div>
                        <input
                          id="age"
                          {...register("age", {
                            // required: "Age is required",
                          })}
                          className="w-100"
                          readOnly
                        />
                        {/* {errors.age && (
                          <p className="error">{errors.age.message}</p>
                        )} */}
                      </div>
                      <div className="col-3">
                        <div>
                          <label htmlFor="clinic">Gender:</label>
                        </div>
                        <select
                          id="gender"
                          {...register("gender", {
                            required: "Gender selection is required",
                          })}
                          className="w-100"
                        >
                          <option value="">Select a gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>

                        {errors.gender && (
                          <p className="error">{errors.gender.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="section-3 bg-light p-3 mt-5">
                    <div className="section mt-5">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Units</th>
                            <th>Discount%</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productFields.map((field, index) => (
                            <tr key={field.id}>
                              <td>
                                <select
                                  {...register(`products.${index}.product`, {
                                    required: "Product is required",
                                  })}
                                  className="w-100"
                                  onChange={(e) =>
                                    handleProductSelect(
                                      index,
                                      e.target.value,
                                      field.category
                                    )
                                  }
                                >
                                  <option value="">Select a product</option>
                                  {productOptionsByCategory[
                                    field.category
                                  ]?.map((product) => (
                                    <option
                                      key={product.id}
                                      value={product.productName}
                                    >
                                      {product.productName}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input
                                  {...register(`products.${index}.units`)}
                                  className="w-100"
                                  onChange={(e) =>
                                    updatebasePriceByUnit(index, e.target.value)
                                  }
                                  min="1"
                                  max="100"
                                />
                              </td>
                              <td>
                                <div className="input-group">
                                  <input
                                    type="number"
                                    {...register(
                                      `products.${index}.discount`,
                                      {}
                                    )}
                                    className="form-control"
                                    onChange={(e) =>
                                      updatebasePrice(index, e.target.value)
                                    }
                                    min="0"
                                    max="100"
                                  />
                                  <span className="input-group-text">%</span>
                                </div>
                              </td>
                              <td>
                                <div className="input-group">
                                  <span className="input-group-text">£</span>
                                  <input
                                    type="text"
                                    {...register(`products.${index}.basePrice`)}
                                    className="form-control"
                                  />
                                </div>
                              </td>
                              {/* <td>
                                <div className="input-group">
                                  <span className="input-group-text">£</span>
                                  <input
                                    type="text"
                                    {...register(`products.${index}.totalbasePrice`)}
                                    className="form-control"
                                    readOnly
                                  />
                                </div>
                              </td> */}
                              <td>
                                <button
                                  type="button"
                                  onClick={() => removeProduct(index)}
                                  className="btn btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-1 row">
                      <div className="col-2">
                        {showCategoryDropdown ? (
                          <div className="dropdown">
                            <select
                              className="form-select"
                              onChange={(e) =>
                                handleCategorySelect(e.target.value)
                              }
                            >
                              <option value="">Select a category</option>
                              {majorCategories.map((category) => (
                                <option
                                  key={category.id}
                                  value={category.categoryCode}
                                >
                                  {category.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowCategoryDropdown(true)}
                            className="btn btn-dark w-100"
                          >
                            Add Product
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 text-end">
                      <strong>Overall Total: £{overallTotal.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="section-4 bg-light p-3 mt-5">
                    <div className="section mt-5">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Stages</th>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stageFields.map((field, index) => (
                            <React.Fragment key={field.id}>
                              <tr>
                                <td>
                                  <select
                                    {...register(`stages.${index}.stages`, {
                                      required: "Stages is required",
                                    })}
                                    className="w-100"
                                  >
                                    <option value="">Select a product</option>
                                    {stageOptions.map((product) => (
                                      <option
                                        key={product.id}
                                        value={product.name}
                                      >
                                        {product.name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    {...register(`stages.${index}.details`)}
                                    className="w-100"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    {...register(`stages.${index}.date`)}
                                    className="w-100"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    {...register(`stages.${index}.hours`, {
                                      required: "basePrice is required",
                                    })}
                                    className="w-100"
                                  />
                                </td>

                                <td>
                                  {appendStage.length >= 0 && (
                                    <button
                                      type="button"
                                      onClick={() => removeStage(index)}
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>

                      {/* Add Product Button */}
                    </div>
                    <div className="mt-1 row">
                      <div className="col-2">
                        <button
                          type="button"
                          onClick={() =>
                            appendStage({
                              stage: "",
                              details: "",
                              date: "",
                              hour: "",
                            })
                          }
                          className="btn btn-dark w-100"
                        >
                          Add Check
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="section-5 bg-light p-3 mt-5">
                    <div className="row">
                      <div className="col-6">
                        <div>
                          <label>Observations:</label>
                          <Controller
                            name="observations"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <div>
                                <ReactQuill
                                  id="observations"
                                  theme="snow"
                                  modules={modules}
                                  formats={formats}
                                  placeholder="Add observations here ..."
                                  onChange={onChange}
                                  value={value}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div>
                          <label>Private Notes:</label>
                          <Controller
                            name="privateNotes"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <div>
                                <ReactQuill
                                  id="privateNotes"
                                  theme="snow"
                                  modules={modules}
                                  formats={formats}
                                  placeholder="Add private notes here ..."
                                  onChange={onChange}
                                  value={value}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section-6 bg-light p-3 mt-5">
                    <div className="row">
                      <div className="col-12">
                        <div>
                          <label>Medical Prescription:</label>
                          <Controller
                            name="medicalPrescription"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <div>
                                <ReactQuill
                                  id="medicalPrescription"
                                  theme="snow"
                                  modules={modules}
                                  formats={formats}
                                  placeholder="Add medical prescription here ..."
                                  onChange={onChange}
                                  value={value}
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="section-7 bg-light p-3 mt-5">
                    <div className="row">
                      <div className="col-6">
                        <div>
                          <label htmlFor="file">Upload File:</label>
                          <input
                            id="file"
                            type="file"
                            {...register("file", {
                              required: "File is required",
                            })}
                            className="w-100"
                          />
                          {errors.file && (
                            <p className="error">{errors.file.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 d-flex gap-2">
                    <div>
                      <button className="btn btn-dark" type="submit">
                        Create and accept
                      </button>
                    </div>
                    <div>
                      <button className="btn btn-dark">Save draft</button>
                    </div>
                    <div>
                      <button className="btn btn-dark">Create and send</button>
                    </div>
                    <div>
                      <button className="btn btn-dark">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
