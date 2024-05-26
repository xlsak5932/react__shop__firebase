import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../Cart/CartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 총 결제 정보를 위한 것들
  // 총가격(할인X)
  let productPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    productPrice += cartItems[i].price * cartItems[i].plus;
  }

  // 총 할인 금액
  let productSale = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const price = parseInt(item.price) || 0; // price가 유효하지 않으면 기본값 0 설정
    const plus = parseInt(item.plus) || 1; // plus가 유효하지 않으면 기본값 1 설정
    const sale = parseInt(item.sale) > 0 ? parseInt(item.sale) : 1; // sale이 유효하지 않거나 0 이하이면 기본값 1 설정

    productSale += price * plus - (price * plus) / sale;
  }

  // 총 결제 금액 계산
  let productTotalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const { price, sale, plus } = cartItems[i];
    productTotalPrice += sale <= 0 ? price * plus : (price / sale) * plus;
  }
  productTotalPrice = productTotalPrice
    .toString()
    .split(".")[0]
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const deleteItem = (item) => {
    dispatch(deleteFromCart(item));
  };

  return (
    <div className="cart">
      <div className="cart__box2">
        <div className="cart__left">
          {cartItems.length == 0 ? (
            <p className="cart__add__plase">상품을 장바구니에 담아주세요</p>
          ) : (
            cartItems.map((item, index) => {
              const {
                id,
                title,
                price,
                sale,
                productImageUrl,
                plus,
                tag,
                quantity,
              } = item;

              return (
                <div key={index} className="cart__left__flex">
                  <div className="cart__img">
                    <img src={productImageUrl} alt={title} />
                  </div>
                  <div className="cart__tag__title">
                    <p>{tag}</p>
                    <p>{title}</p>
                  </div>
                  <div className="cart__count">
                    <p>{plus}</p> {/* plus 대신 quantity 사용 */}
                  </div>
                  <div className="cart__price">
                    <p>
                      {sale <= 0
                        ? price
                          ? (price * plus)
                              .toString()
                              .split(".")[0]
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : ""
                        : ((price / sale) * plus)
                            .toString()
                            .split(".")[0]
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </p>
                  </div>
                  <button
                    onClick={() => deleteItem(item)}
                    className="cart__left__delete"
                  >
                    X
                  </button>
                </div>
              );
            })
          )}
          {}
        </div>
        <div className="cart__right">
          <p className="right__information">결제정보</p>

          <div className="cart__product__price">
            <p className="right__price">총 상품금액</p>
            <p>
              {productPrice
                .toString()
                .split(".")[0]
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </p>
          </div>

          <div className="cart__product__total__sale__price">
            <p className="right__total__sale">총 할인금액</p>
            <p>
              {productSale
                .toString()
                .split(".")[0]
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </p>
          </div>

          <div className="cart__product__total__price">
            <p className="right__total__price">결제 예정 금액</p>
            <p className="total__price">{productTotalPrice}원</p>
          </div>

          <div className="cart__right__btn">
            <button type="button" onClick={() => alert("상품을 구매했습니다.")}>
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
