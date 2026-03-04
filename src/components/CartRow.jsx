import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/productSlice";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function CartRow({ img, name, price, quantity, subtotal, id }) {
  const dispatch = useDispatch();

  const slicedTitle =
    name?.length > 15 ? name.slice(0, 15) + "..." : name || "";

  const increase = () =>
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  const decrease = () =>
    dispatch(updateQuantity({ id, quantity: quantity - 1 }));

  return (
    <div className="cart-row flex items-center justify-between px-10 py-6 shadow-lg mt-4 relative group">
      {/* Product */}
      <RxCross2
        onClick={() => dispatch(removeFromCart(id))}
        className="group-hover:opacity-100 opacity-0 cursor-pointer p-px text-white rounded-full bg-red-primary absolute top-9.5 left-11"
      />
      <div className="flex items-center w-2/5 gap-4">
        <img src={img} alt="cart-item" className="w-20 h-20 object-contain" />
        <span>{slicedTitle}</span>
      </div>

      {/* Price */}
      <div className="w-1/5 text-center">${price}</div>

      {/* Quantity */}
      <div className="flex items-center justify-center w-1/5 gap-2 border-2 border-gray-400 rounded-lg px-3 py-1.5">
        <span>{quantity}</span>
        <div className="flex flex-col">
          <button onClick={increase} className="cursor-pointer ">
            <MdOutlineKeyboardArrowUp />
          </button>
          <button onClick={decrease} className="cursor-pointer ">
            <MdOutlineKeyboardArrowDown />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="w-1/5 text-center">${(price * quantity).toFixed(2)}</div>
    </div>
  );
}

export default CartRow;
