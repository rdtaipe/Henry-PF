import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({data}) => {
  const navigate = useNavigate();

  const { _id, image, name, price, stock } = data;

  const discount = Math.round(Math.random() * 100);
  const priceDiscount = Math.round(price - (price * discount) / 100);
  const stars = Math.round(Math.random() * 5);

  const handleNameClick = () => {
  
    // navigate(`/products/${_id}`);
  };

  return (
    <div className="rounded-lg justify-center items-center min-h-200 bg-stone-300 hover:shadow-xl transition duration-500 ease-in-out">
    <div className="relative h-full">
      <div className="relative h-40">
        <img
          className="relative object-cover w-full h-full rounded-t-lg"
          src={image[0]}
          alt={name}
        />
        {discount && (
          <div className="absolute top-0 right-0 m-2">
            <p className="text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-1">
              {discount}% off
            </p>
          </div>
        )}
        <div className="absolute left-3 bottom-2">
          {/* stars */}
          <div className="flex items-center">
          {[...Array(stars)].map((star, i) => (
              <svg
                key={i}
                className="w-4 h-4 fill-current text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27l-5.18 2.73 1-5.81-4.24-3.73 5.88-.51L12 6.34l2.45 5.51 5.88.51-4.24 3.73 1 5.81z" />
              </svg>
            ))}
            <p className="ml-1 text-xs text-gray-500 dark:text-gray-400">
              ({stars})
            </p>
           </div>

        </div>
      </div>
  
      <div className="w-full h-40 px-3">
        <div className="mt-2 pb-3">
          <p
            className="text-ml font-bold text-gray-900 cursor-pointer"
            onClick={handleNameClick}
            title={name}
          >
            {name.length > 34 ? name.slice(0, 34) + "..." : name}
          </p>
          <p className="text-sm text-gray-700 mb-2 ">
            Stock: {stock}
          </p>
          {/* price */}
          <div className="flex justify-between items-center">
            <p className="text-ms font-semibold text-gray-700">
              {discount ? (
                <>
                  <span className="line-through text-gray-500">
                    ${price}
                  </span>
                  <span className="text-green-500">
                     ${priceDiscount}
                  </span>
                </>
              ) : (
                <span className="text-green-500 dark:text-green-400">
                  ${price}
                </span>
              )}
            </p>
          </div>
          <div className="absolute bottom-3 flex justify-between mt-2">
            <button className="text-sm font-semibold block px-4 text-gray-500  rounded-full ">
              Add to cart
            </button>
            {/* detail buton */}
            <Link to={`/products/${_id}`} className="text-lg font-semibold block px-4 text-green-100 bg-green-400 rounded-full"
              onClick={handleNameClick}
            >
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Card