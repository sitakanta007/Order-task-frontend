import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, selectOrdersWithOrdinal } from "@redux/slices/orderSlice";
import Heading from "@utils/Heading";
import Message from "@utils/Message";

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);
  const orders = useSelector(selectOrdersWithOrdinal);
  const loading = useSelector((s) => s.orders?.loading);
  const error = useSelector((s) => s.orders?.error);
  const user = auth?.user;
  const [expanded, setExpanded] = useState({}); // toggle items

  useEffect(() => {
    if (!user?.id) return;

    dispatch(
    fetchOrders({
        userId: user.id,
        token: auth.token
    })
    );
  }, [user, dispatch, navigate, auth.token]);

  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (!auth?.user?.id) return <Message messageText="Login to view your orders." />
  if (loading) return <Message messageText="Loading your orders..." />
  if (!orders.length) return <Message messageText="You have no orders yet." />
  if (error) return <Message messageText="Failed to load your orders." />

  return (
    <div className="px-6">
      <div className="max-w-6xl mx-auto bg-lightBg dark:bg-darkBg2 p-8 rounded-xl shadow-lg">
        <Heading headingText="Your Orders" />

        <div className="space-y-6">
          {orders.map((order) => {
            const isOpen = expanded[order.id];

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-darkCard border border-lightBorder dark:border-darkBorder p-5 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-lightPrimary dark:text-darkPrimary">
                      Order #{order.orderNumber} {/*   ID: {order.id} */}
                    </p>

                    <p className="text-sm text-lightSecondary dark:text-darkSecondary mt-1">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>

                    <p className="text-md mt-2 font-medium text-lightPrimary dark:text-darkPrimary">
                      Total Paid: ₹{Number(order.total_amount).toFixed(2)}
                    </p>

                    {order.coupon_code && (
                      <>
                      <p className="text-sm text-blue-600 mt-1">
                        Coupon applied: {order.coupon_code}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Saved {order.discount_amount}
                      </p>
                      </>
                      
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="px-4 py-2 rounded-lg bg-lightBg dark:bg-darkBg2 border border-lightBorder dark:border-darkBorder text-lightPrimary dark:text-darkPrimary hover:bg-lightCard dark:hover:bg-darkCard transition"
                  >
                    {isOpen ? "Hide Items" : "View Items"}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-5 border-t pt-4">
                    {order.items?.map((item) => (
                      <div
                        key={item.product_id}
                        className="flex justify-between py-3 border-b last:border-b-0 border-lightBorder dark:border-darkBorder"
                      >
                        <div>
                          <p className="font-medium text-lightPrimary dark:text-darkPrimary">
                            {item.title}
                          </p>
                          <p className="text-sm text-lightSecondary dark:text-darkSecondary">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-lightPrimary dark:text-darkPrimary font-semibold">
                          ₹{Number(item.price_at_time).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
