import React from 'react';
import Navigation from '../sections/Navigation';
import './../index.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ModalCreate from '../components/ModalCreateProducts';
import ModalEdit from '../components/ModalEditProducts';

const Products = () => {
  const [data, setData] = useState([]);
  const [supplierData, setSupplierData] = useState({
    name: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    getData();
    getSuppliers();
    // eslint-disable-next-line
  }, []);
  console.log(supplierData, 'supplierData');
  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/products');

      if (res.status === 200) {
        setData(res.data);
        setIsLoading(false);
      }

      if (res.status === 204) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      // eslint-disable-next-line
      // @ts-ignore
      //   toast.error(error?.response?.data.message ?? 'Error getting data');
    }
  };
  const getSuppliers = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/suppliers');

      if (res.status === 200) {
        setSuppliers(res.data.suppliers);
        setIsLoading(false);
      }

      if (res.status === 204) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      // eslint-disable-next-line
      // @ts-ignore
      //   toast.error(error?.response?.data.message ?? 'Error getting data');
    }
  };

  const handleAddOrEditSupplier = async () => {
    try {
      setIsLoading(true);

      let res;

      if (isEdit) {
        // For editing an existing supplier
        res = await axiosInstance.put(
          `/suppliers/${supplierData.id}`,
          supplierData
        );
      } else {
        // For adding a new supplier
        const newSupplierData = { name: supplierData.name }; // Extract only the name field
        res = await axiosInstance.post('/suppliers', newSupplierData);
      }

      if (res.status === 200 || res.status === 201) {
        setIsModalOpen(false);
        setIsLoading(false);
        setSupplierData({
          name: '',
        });
        // toast.success(
        //   isEdit
        //     ? 'Supplier edited successfully'
        //     : 'Supplier added successfully'
        // );
        setIsEdit(false);

        getData();
      }
    } catch (error) {
      setIsEdit(false);
      setIsLoading(false);
      console.error(error);
      //   toast.error(error?.response?.data.message ?? 'There has been an error');
    }
  };

  console.log(supplierData, 'test');
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.delete(`/suppliers/${id}`);

      if (res.status === 200) {
        setIsConfirmationOpen(false);
        setIsLoading(false);
        setSupplierData({
          id: '',
        });
        // toast.success('Supplier deleted successfully');

        getData();
      }
    } catch (error) {
      setSupplierData({
        name: '',
      });
      setIsConfirmationOpen(false);
      setIsLoading(false);
      console.error(error);
      // eslint-disable-next-line
      // @ts-ignore
      //   toast.error(error?.response?.data.message ?? 'There has been an error');
    }
  };

  return (
    <div>
      <Navigation>
        <div className="table-container pt-[100px] pl-[70px] pr-[70px]">
          <div className="w-full pb-4 flex justify-between">
            <div className="flex items-center gap-3 relative">
              <label for="search-suppliers-input">Suppliers:</label>
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
                className="bg-blue-500 px-2 py-1 rounded-lg text-white hover:bg-blue-600 transition"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEdit(false);
                }}
              >
                New Product
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Supplier Name</th>
                <th>Customer Name</th>
                <th>Location</th>
                <th>Price</th>
                <th className="w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length
                ? data.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.product_name}</td>
                      <td>{supplier.supplier_name}</td>
                      <td>{supplier.customer_name}</td>
                      <td>{supplier.country_name}</td>
                      <td>{supplier.price}</td>
                      <td className="flex gap-5">
                        <button
                          className="text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                          onClick={() => handleDelete(supplier.id)}
                        >
                          <DeleteForeverIcon />
                          <span>Delete</span>
                        </button>{' '}
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
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </Navigation>
      <ModalCreate
        isModalOpen={isModalOpen && !isEdit}
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
        suppliers={suppliers}
      />
      <ModalEdit
        isModalOpen={isModalOpen && isEdit}
        supplier={supplierData}
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
      />
    </div>
  );
};

export default Products;
