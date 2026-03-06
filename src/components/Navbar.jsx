import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../redux/productSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Shop | Exclusive";
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        const products = res.data.products;

        dispatch(setProducts(res.data.products));
        setData(products);
        {
          products ? console.log("api fetched successfully.") : "fetching...";
        }
      })
      .catch(console.error);
  }, [dispatch]);

  const navigate = useNavigate();
  const cart = useSelector((state) => state.products.cart);
  const wishList = useSelector((state) => state.products.wishList);
  const allProducts = useSelector((state) => state.products.value);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
    { title: "Sign Up", path: "/sign-up" },
  ];

  const handleCartNavigate = () => {
    navigate("/cart");
  };

  const handleSearch = (e) => {
    const userInput = e.target.value.toLowerCase().trim();

    if (!userInput) return setSearchedProducts([]);

    setSearchValue(userInput);
    const filteredProducts = allProducts.filter((item) =>
      item.title.toLowerCase().includes(userInput),
    );
    setSearchedProducts(filteredProducts);
  };


  return (
    <div className="pb-7">
      <div className="container pt-7 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        {/* Desktop Nav (lg+) */}
        <ul className="hidden lg:flex gap-12 font-poppins">
          {navLinks.map((e, i) => (
            <li
              key={i}
              className="relative inline-block
                before:content-['']
                before:absolute
                before:left-0
                before:-bottom-1
                before:w-0
                before:h-0.5
                before:bg-black
                before:transition-all
                before:duration-300
                hover:before:w-full"
            >
              <Link to={e.path}>{e.title}</Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search (lg+) */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-inputbg py-1.75 pr-3 pl-5 shadow-sm w-60.75 placeholder:text-[12px] outline-0 rounded-md"
              onChange={handleSearch}
              value={searchValue}
            />
            <div className="absolute top-10 left-0 z-50 max-h-105 overflow-hidden rounded-lg w-60.75">
              <ul>
                {searchedProducts.map((item) => (
                  <li
                    key={item.id}
                    className="bg-inputbg shadow-lg px-4 py-4 border-b border-b-gray-300 flex gap-2 items-center cursor-pointer"
                    onClick={() => {
                      navigate(`product-details/${item.id}`);
                      setSearchValue("");
                      setSearchedProducts([]);
                    }}
                  >
                    <span className="w-10">
                      <img src={item.thumbnail} alt="product-image" />
                    </span>
                    {item.title.slice(0, 14)}
                  </li>
                ))}
              </ul>
            </div>
            <button className="absolute right-3.5 top-2 text-xl">
              <FiSearch />
            </button>
          </div>

          <button
            onClick={() => navigate("/wishlist")}
            className="cursor-pointer relative"
          >
            <FaRegHeart className="text-2xl hidden lg:block" />
            {wishList.length > 0 ? (
              <span className="absolute text-xs px-0.75 py-0.5 text-white bg-red-primary rounded-full -top-2.5 -right-2">
                {wishList.length}
              </span>
            ) : (
              <></>
            )}
          </button>
          <button
            onClick={handleCartNavigate}
            className="cursor-pointer relative"
          >
            <AiOutlineShoppingCart className="text-3xl hidden lg:block" />
            {cart.length > 0 ? (
              <span className="absolute text-xs px-1 py-px text-white bg-red-primary rounded-full -top-1 -right-1">
                {cart.length}
              </span>
            ) : (
              <></>
            )}
          </button>

          {/* Hamburger (sm + md) */}
          <button className="lg:hidden text-3xl" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-5 px-6 font-poppins">
          {navLinks.map((e, i) => (
            <li key={i} onClick={() => setOpen(false)}>
              <Link to={e.path} className="block py-2 border-b">
                {e.title}
              </Link>
            </li>
          ))}

          <div className="flex gap-6 pt-4">
            <FaRegHeart className="text-2xl" />
            <button className="cursor-pointer" onClick={handleCartNavigate}>
              <AiOutlineShoppingCart className="text-3xl" />
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
