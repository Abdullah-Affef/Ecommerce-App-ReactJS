import { useEffect, useState } from "react";
import { Rate } from "antd";
import { useParams } from "react-router";
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb.jsx";
import CommonHead from "../components/CommonHead.jsx";
import { useSelector } from "react-redux";
import SingleFlashCard from "../components/SingleFlashCard.jsx";

const ProductDetails = () => {
  const [productData, setProductData] = useState([]);
  const [buffer, setBuffer] = useState(false);
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(1);
  const [reviewNumber, setReviewNumber] = useState([]);

  const products = useSelector((state) => state.products.value);

  let params = useParams();
  let id = params.id;
  async function apiFetch() {
    await axios.get(`https://dummyjson.com/products/${id}`).then((product) => {
      setProductData(product.data);
      setBuffer(true);
      setImages(product.data.images);
      setRating(product.data.rating);
      setReviewNumber(product.data.reviews);
    });
  }
  useEffect(() => {
    apiFetch();
  }, [id]);
  console.log(productData);
  return (
    <>
      <div className="container pt-20 pb-35">
        <div>
          <BreadCrumb />
        </div>
        <div className="flex gap-10">
          <div className="flex gap-7.5">
            <div className="flex flex-col gap-6">
              {buffer ? (
                images.map((item, idx) => {
                  return (
                    <img
                      key={idx}
                      src={item}
                      alt="console"
                      className="w-42.5 h-46"
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {buffer ? (
              <img
                src={productData.thumbnail}
                alt="console"
                className="w-125 h-150"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="w-100">
            <h1 className="font-inter text-[24px] font-semibold mmb-4">
              {productData.title}
            </h1>
            <div className="flex gap-4 my-4">
              <div className="flex gap-2 pr-4 border-r border-r-black">
                <Rate allowHalf disabled value={rating} />
                <p className="text-[14px] text-black opacity-50">
                  ({reviewNumber.length} Reviews)
                </p>
              </div>
              <p className="text-[14px] text-[#00FF66]">
                {productData.availabilityStatus}
              </p>
            </div>
            <h2 className="font-inter text-2xl font-medium mt-4 mb-6">
              ${productData.price}
            </h2>
            <p className="text-[14px] w-93.25 pb-6">
              {productData.description}
            </p>
            <hr />
          </div>
        </div>
        <div className="suggested-products mt-35">
          <CommonHead content={""} header={"Related Item"} />
          <div className="flex flex-wrap justify-between">
            {products.slice(0, 4).map((item, i) => {
              return (
                <SingleFlashCard
                  key={item.id}
                  image={item.thumbnail}
                  title={item.title}
                  newPrice={item.price}
                  oldPrice={item.price}
                  rating={item.rating}
                  reviews={item.rating}
                  id={item.id}
                  productDetail={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
