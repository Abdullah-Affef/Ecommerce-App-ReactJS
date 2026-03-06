import Breadcrumb from "../components/BreadCrumb";
import CartRow from "../components/CartRow";
import keyboard from "../assets/keyboard.png";
import CommonButton from "../components/CommonButton.jsx";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.products.cart);

  // Calculate subtotal from all cart items
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Shipping is free (0)
  const shipping = 0;

  // Total = subtotal + shipping
  const total = subtotal + shipping;
  return (
    <section id={"cart"}>
      <div className="container">
        <Breadcrumb className={"mt-20"} />
        {/*     Row 1   */}
        <div className="cart-header flex items-center justify-between px-10 py-6 shadow-lg mt-20">
          <div className="w-2/5">Product</div>
          <div className="w-1/5 text-center">Price</div>
          <div className="w-1/5 text-center">Quantity</div>
          <div className="w-1/5 text-center">Subtotal</div>
        </div>

        {/*     Row 2   */}
        {cart.length === 0 ? (
          <h2 className="text-center mt-20">Your cart is empty</h2>
        ) : (
          cart.map((item) => (
            <CartRow
              key={item.id}
              id={item.id}
              img={item.thumbnail}
              name={item.title}
              price={item.price}
              quantity={item.quantity}
              subtotal={item.price * item.quantity}
            />
          ))
        )}
        {/*     Row-3   */}
        <div
          className={"return-update-row mt-6 flex justify-between items-center"}
        >
          <button
            className={
              "font-medium px-12 py-4 border-2 border-gray-400/50 rounded-md cursor-pointer"
            }
          >
            Return To Shop
          </button>
          <button
            className={
              "font-medium px-12 py-4 border-2 border-gray-400/50 rounded-md cursor-pointer"
            }
          >
            Update Cart
          </button>
        </div>
        {/*   Row 4     */}
        <div className={"flex justify-between mt-20 mb-35"}>
          <div className={"coupon"}>
            <form className={"flex gap-4"}>
              <input
                className={
                  "border border-black outline-0 px-6 py-4 w-75 rounded-md"
                }
                placeholder={"Coupon Code"}
              />
              <CommonButton name={"Apply Coupon"} className={"common-button"} />
            </form>
          </div>
          <div
            className={
              "cart-total px-6 py-8 w-117.5 h-81 border-2 border-gray-800 rounded-md"
            }
          >
            <h2 className={"text-xl font-semibold mb-6"}>Cart Total</h2>
            <div
              className={
                "subtotal flex justify-between items-center pb-4 border-b-2 border-gray-400/50"
              }
            >
              <h2 className={"text-black"}>Subtotal:</h2>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div
              className={
                "shipping mt-4 flex justify-between items-center pb-4 border-b-2 border-gray-400/50"
              }
            >
              <h2 className={"text-black"}>Shipping:</h2>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div
              className={"total mt-4 flex justify-between items-center pb-4"}
            >
              <h2 className={"text-black"}>Total:</h2>
              <span>${total.toFixed(2)}</span>
            </div>
            <CommonButton
              name={"Proceed to checkout"}
              className={"common-button mt-4 mx-auto block cursor-pointer"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
