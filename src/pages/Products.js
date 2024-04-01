import React from "react";
import Navigation from "../sections/Navigation";
import "./../index.css";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ModalCreate from "../components/ModalCreateProducts";
import ModalEdit from "../components/ModalEditProducts";
import ModalDelete from "../components/ModalDeleteProduct";

const Products = () => {
  const [data, setData] = useState([]);
  const [supplierData, setSupplierData] = useState({
    id: "",
    name: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]); // Add products state
  const [countries, setCountries] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getData();
    getSuppliers();
    getCountries();
    getProduct();
    // eslint-disable-next-line
  }, [page]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/products?page=${page}&limit=20`);
      if (res.status === 200) {
        setData(res.data.posts);
        setTotalPages(Math.ceil(res.data.meta.total / 10));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    setPage((prevPage) => {
      const next = prevPage + 1;
      if (next > totalPages) {
        return prevPage; // return current page if next page is greater than total pages
      }
      return next;
    });
  };

  const prevPage = () => {
    setPage((prevPage) => {
      const prev = Math.max(prevPage - 1, 1);
      if (prev < 1) {
        return prevPage; // return current page if previous page is less than 1
      }
      return prev;
    });
  };

  const getSuppliers = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/suppliers");

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
    }
  };

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/products");

      if (res.status === 200) {
        setProduct(res.data.products);
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

  const getCountries = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/countries");
      if (res.status === 200) {
        setCountries(res.data.countries);
        setIsLoading(false);
      }
      if (res.status === 204) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
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
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
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
                <th>Product Id</th>
                <th>Supplier Name</th>
                <th>Product Name</th>
                <th>Country Code</th>
                <th>Price</th>
                <th className="w-2/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.supplier_name}</td>
                  <td>{product.product_name}</td>
                  <td>{product.country_name}</td>
                  <td>{product.price}</td>
                  <td className="flex gap-5">
                    <button
                      className="text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                      onClick={() => {
                        setDeleteId(product.id);
                        setIsConfirmationOpen(true);
                      }}
                    >
                      <DeleteForeverIcon />
                      <span>Delete</span>
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-600 transition flex items-center gap-1"
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsEdit(true);
                        setProduct(product); // set the selected product to the product state
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
          {/* Pagination controls */}
          <div className="flex justify-end space-x-4 pt-3">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className={`w-24 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 ${
                page === 1 && "cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <span className="text-lg text-blue-500 px-2 pt-1">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={page === totalPages}
              className={`w-24 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 ${
                page === totalPages && "cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </Navigation>
      {/* Modals */}
      <ModalCreate
        isModalOpen={isModalOpen && !isEdit}
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
        suppliers={suppliers} // Pass suppliers data to the modal
        countries={countries} // Pass countries data to the modal
      />
      <ModalEdit
        isModalOpen={isModalOpen && isEdit}
        product={product} // pass the selected product data
        closeModal={() => setIsModalOpen(false)}
        getData={getData}
        suppliers={suppliers} // Pass suppliers data to the modal
        countries={countries} // Pass countries data to the modal
      />
      <ModalDelete
        isModalOpen={isConfirmationOpen && deleteId !== null}
        product={{ id: deleteId }}
        closeModal={() => setIsConfirmationOpen(false)}
        getData={getData}
      />
    </div>
  );
};

export default Products;
