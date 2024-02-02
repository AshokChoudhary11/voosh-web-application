import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./index.css";
import { UserContext } from "../../context";

export const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [newOrder, setNewOrder] = useState({});
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { token } = useContext(UserContext);

  const loadOrders = () => {
    setError("");
    setLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/get-order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        if (res.error) {
          toast.error(res.error);
          setError(res.error);
        } else {
          setOrderList(res.orders);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to load");
        setError("Failed to load");
      });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/add-order`, {
      method: "POST",
      body: JSON.stringify({
        sub_total: newOrder.sub_total || 0,
        phone_number: newOrder.phone,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setNewOrder({
          ...newOrder,
          loading: true,
        });
        if (res.error) {
          toast.error(res.error);
          setNewOrder({
            ...newOrder,
            loading: false,
            error: res.error,
          });
        } else {
          setNewOrder({ sub_total: "", phone_number: "" });
          setShowNewOrderForm(false);
          loadOrders();
        }
      })
      .catch((err) => {
        setNewOrder({
          ...newOrder,
          loading: false,
          error: "Failed to load",
        });
        toast.error("Failed to load");
      });
  };
  return (
    <div className="order-container">
      <div className="order-button-container">
        <button
          className="add-order-button"
          onClick={() => setShowNewOrderForm(true)}
        >
          Add Order
        </button>
      </div>
      {showNewOrderForm && (
        <div
          className="modal"
          onClick={() => {
            setShowNewOrderForm(false);
          }}
        >
          <div className="page">
            <div className="container" onClick={(e) => e.stopPropagation()}>
              <h2>New Order</h2>
              <form>
                <label htmlFor="sub total">Sub Total:</label>
                <input
                  type="number"
                  id="Sub Total"
                  value={newOrder?.sub_total}
                  placeholder="please enter sub total amount"
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      sub_total: parseInt(e.target.value),
                    })
                  }
                />
                <label htmlFor="Phone Number">Phone Number:</label>
                <input
                  type="number"
                  id="phone_number"
                  value={newOrder.phone}
                  placeholder="please enter your phone number"
                  onChange={(e) =>
                    setNewOrder({
                      ...newOrder,
                      phone: parseInt(e.target.value),
                    })
                  }
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={newOrder.loading}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {!!loading && "loading..."}
      {!!error && <div>{error}</div>}
      {!!orderList?.length && (
        <div className="order-list-container">
          {orderList.map((order) => (
            <div className="order">
              <div>
                <h4>Sub Total</h4> {order.sub_total}
              </div>
              <div>
                <h4>Phone</h4> {order.phone_number}
              </div>
            </div>
          ))}
        </div>
      )}
      {orderList.length === 0 && !error && !loading && "No Orders"}
    </div>
  );
};
