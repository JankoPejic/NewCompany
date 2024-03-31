import React, { useState, useEffect } from "react";
import Navigation from "../sections/Navigation";
import axiosInstance from "../services/axiosInstance";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ModalCreate from "../components/ModalCreate";
import ModalEdit from "../components/ModalEdit";
import ModalDelete from "../components/ModalDelete";

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
      const res = await axiosInstance.get("/suppliers");

      if (res.status === 200) {
        setData(res.data.suppliers);

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
                Create Supplier
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th className="w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>

                    <td className="flex gap-5">
                      <button
                        className="text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                        onClick={() => {
                          setDeleteId(supplier.id);
                          setIsConfirmationOpen(true);
                        }}
                      >
                        <DeleteForeverIcon />
                        <span>Delete</span>
                      </button>{" "}
                      <button
                        id="edit-supplier-button"
                        color="white"
                        className="text-blue-500 hover:text-blue-600 transition flex items-center gap-1"
                        onClick={() => {
                          setIsModalOpen(true);
                          setIsEdit(true);
                          setSupplierData({
                            id: supplier.id,
                            name: supplier.name,
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
        supplier={supplierData}
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
      />
      <ModalDelete
        isModalOpen={isConfirmationOpen && deleteId !== null}
        supplier={{ id: deleteId }}
        closeModal={() => setIsConfirmationOpen(false)}
        getData={getData}
      />
    </div>
  );
};

export default Suppliers;
