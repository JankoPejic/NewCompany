import React, { useState, useEffect } from "react";
import Navigation from "../sections/Navigation";
import axiosInstance from "../services/axiosInstance";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ModalCreate from "../components/ModalCreateCustomer";
import ModalEdit from "../components/ModalEditCustomer";
import ModalDelete from "../components/ModalDeleteCustomer";

const Suppliers = () => {
  const [data, setData] = useState([]);
  const [supplierData, setSupplierData] = useState({
    name: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Moved here

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/customers");

      if (res.status === 200) {
        setData(res.data.customers);

        setIsLoading(false);
      }

      if (res.status === 204) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation>
        <div className="table-container pt-[100px] pl-[70px] pr-[70px]">
          <div className="w-full pb-4 flex justify-between">
            <div className="flex items-center gap-3 relative">
              <label htmlFor="search-suppliers-input">Suppliers:</label>
              <input
                id="search-suppliers-input"
                type="search"
                className="h-10 border-2 rounded-xl py-1 pl-2 outline-none border-gray-400"
                placeholder="Search for suppliers..."
              ></input>
            </div>
            <div>
              <button
                id="create-supplier-button"
                color="white"
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEdit(false);
                }}
              >
                Create Customer
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th className="w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>

                    <td className="flex gap-5">
                      <button
                        className="text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                        onClick={() => {
                          setDeleteId(customer.id);
                          setIsConfirmationOpen(true);
                        }}
                      >
                        <DeleteForeverIcon />
                        <span>Delete</span>
                      </button>{" "}
                      <button
                        id="edit-customer-button"
                        color="white"
                        className="text-blue-500 hover:text-blue-600 transition flex items-center gap-1"
                        onClick={() => {
                          setIsModalOpen(true);
                          setIsEdit(true);
                          setSupplierData({
                            id: customer.id,
                            name: customer.name,
                            address: customer.address, // Added address here
                          });
                        }}
                      >
                        <EditIcon />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Navigation>
      <ModalCreate
        isModalOpen={isModalOpen && !isEdit}
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
      />
      <ModalEdit
        isModalOpen={isModalOpen && isEdit}
        customer={supplierData} // Changed from supplier to customer
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
      />
      <ModalDelete
        isModalOpen={isConfirmationOpen && deleteId !== null}
        customer={{ id: deleteId }} // Changed from supplier to customer
        closeModal={() => setIsConfirmationOpen(false)}
        getData={getData}
      />
    </div>
  );
};

export default Suppliers;
