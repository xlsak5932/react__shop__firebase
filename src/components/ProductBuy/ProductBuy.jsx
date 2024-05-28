import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Layout from "../Layout/Layout";
import { addToCart, deleteFromCart } from "../Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./ProductBuy.css";

const ProductBuy = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const [plus, setPlus] = useState(1);

  // 아이템 영역
  const GetProduct = async () => {
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));

      const productData = productTemp.data();
      productData.id = productTemp.id;

      // Timestamp 객체를 밀리초로 변환
      if (productData.time) {
        productData.time = productData.time.toMillis();
      }

      setProduct(productData);
      // setProduct({ ...productTemp.data(), id: productTemp.id });
    } catch (error) {
      console.log("ProductBuy.jsx : ", error);
    }
  };

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      newValue = 1; // 기본값 설정
    }
    if (newValue < 1) {
      newValue = 1;
    } else if (newValue > 99) {
      newValue = 99;
    }
    setPlus(newValue);
  };

  const CountUp = () => {
    setPlus((prevPlus) => {
      const newPlus = prevPlus + 1;
      return newPlus > 99 ? 99 : newPlus;
    });
  };

  const CountDown = () => {
    setPlus((prevPlus) => {
      const newPlus = prevPlus - 1;
      return newPlus < 1 ? 1 : newPlus;
    });
  };

  // Cart 영역
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = () => {
    const itemToAdd = { ...product, plus };
    dispatch(addToCart(itemToAdd));
    alert("카트에 추가되었습니다.");
  };

  const deleteCart = () => {
    dispatch(deleteFromCart(product, plus));
    alert("카트에 제거되었습니다.");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    GetProduct();
  }, []);

  return (
    <Layout>
      <div className="product__buy">
        <h2>구매 페이지</h2>
        <div className="product__buy__box">
          <div className="buy__img__box">
            <img src={product.productImageUrl} alt={product.title} />
          </div>

          <div className="buy__product__center">
            <div className="buy__tag__box">
              <p className="buy__tag">{product.tag}</p>
            </div>

            <div className="buy__title__box">
              <p className="buy__title">{product.title}</p>
            </div>

            <div className="buy__description__box">
              <p className="buy__description">{product.description}</p>
            </div>

            {/* buy__price */}
            <div className="buy__price__box">
              <span>상품 가격 : </span>
              <span
                className={
                  product.sale <= 0 ? "buy__price__true" : "buy__price"
                }
              >
                {product.sale <= 0
                  ? (product.price * plus)
                      .toString().split(".")[0]
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : product.price
                  ? product.price
                      .toString().split(".")[0]
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : ""}
                원
              </span>
            </div>

            <div className="buy__sale__box">
              <span>{product.sale <= 0 ? "" : "할인 : "}</span>
              <span className="buy__sale">
                {product.sale <= 0 ? "" : product.sale + "%"}
              </span>
              &nbsp; &nbsp; &nbsp;
              <span>{product.sale <= 0 ? "" : "최종 가격 : "}</span>
              <span className="buy__price__sale">
                {product.sale <= 0
                  ? ""
                  : ((product.price / product.sale) * plus)
                      .toString().split(".")[0]
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
              </span>
            </div>

            <div className="buy__count">
              <button type="button" className="buy__plus" onClick={CountUp}>
                +
              </button>

              <input
                type="number"
                value={plus}
                onChange={handleChange}
                placeholder="1"
              />

              <button
                type="button"
                className="buy__subtraction"
                onClick={CountDown}
              >
                -
              </button>
            </div>

            <div className="buy__cart__box">
              {cartItems.some((p) => p.id === product.id) ? (
                <button
                  type="button"
                  onClick={deleteCart}
                  className="buy__cart__btn"
                >
                  카트에서 삭제
                </button>
              ) : (
                <button
                  type="button"
                  onClick={addCart}
                  className="buy__cart__btn"
                >
                  카트에 담기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductBuy;
