import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import "./Section1.css";

const Section1 = () => {
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [all, setAll] = useState(true);
  const [skin, setSkin] = useState(false);
  const [mask, setMask] = useState(false);
  const [cle, setCle] = useState(false);
  const navigator = useNavigate();

  // 탭창 관련해서 데이터 가져오기
  // 스킨헤어
  let productSkin = [];
  for (let i = 0; i < getAllProduct.length; i++) {
    if (getAllProduct[i].tag === "스킨헤어") {
      productSkin.push(getAllProduct[i]);
    }
  }

  // 마스크
  let productMask = [];
  for (let i = 0; i < getAllProduct.length; i++) {
    if (getAllProduct[i].tag === "마스크") {
      productMask.push(getAllProduct[i]);
    }
  }

  // 클렌징
  let productCle = [];
  for (let i = 0; i < getAllProduct.length; i++) {
    if (getAllProduct[i].tag === "클렌징") {
      productCle.push(getAllProduct[i]);
    }
  }

  const AllProduct = async () => {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time", "desc"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
      });

      return () => data;
    } catch (error) {
      console.log("Section1.jsx AllProduct() : ", error);
    }
  };

  const ClickAll = () => {
    setAll(true);
    setSkin(false);
    setMask(false);
    setCle(false);
  };

  const ClickSkin = () => {
    setAll(false);
    setSkin(true);
    setMask(false);
    setCle(false);
  };

  const ClickMask = () => {
    setAll(false);
    setSkin(false);
    setMask(true);
    setCle(false);
  };

  const ClickCle = () => {
    setAll(false);
    setSkin(false);
    setMask(false);
    setCle(true);
  };

  useEffect(() => {
    AllProduct();
  }, []);

  {
    /* 
         <option value="ALL">ALL</option>
         <option value="스킨헤어">스킨헤어</option>
         <option value="마스크">마스크</option>
         <option value="클렌징">클렌징</option> 
         */
  }
  {
    /* 
     tag: "",
     productImageUr: "",
     title: "",
     description: "",
     price: "",
     sale: "", 
     */
  }
  return (
    <div className="section1">
      <div className="section1__box">
        <h2 className="section1__box__title">등록한 상품이 보여집니다.</h2>

        <div className="section1__tag">
          <ul>
            <li>
              <button
                type="button"
                className={all ? "active" : ""}
                onClick={ClickAll}
              >
                ALL
              </button>
            </li>

            <li>
              <button
                type="button"
                className={skin ? "active" : ""}
                onClick={ClickSkin}
              >
                스킨헤어
              </button>
            </li>
            <li>
              <button
                type="button"
                className={mask ? "active" : ""}
                onClick={ClickMask}
              >
                마스크
              </button>
            </li>
            <li>
              <button
                type="button"
                className={cle ? "active" : ""}
                onClick={ClickCle}
              >
                클렌징
              </button>
            </li>
          </ul>
        </div>

        <div className="all__box">
          {all ? (
            <div>
              <div className="section1__product">
                {getAllProduct.slice(0, 8).map((item, index) => {
                  const {
                    id,
                    tag,
                    productImageUrl,
                    title,
                    description,
                    price,
                    sale,
                  } = item;

                  return (
                    <div key={index}>
                      {tag === "ALL" || "스킨헤어" || "마스크" || "클렌징" ? (
                        <div
                          className="all__box__flex"
                          onClick={() => {
                            navigator(`/productbuy/${id}`);
                          }}
                        >
                          <div className="all__product__img__box">
                            <img
                              src={productImageUrl}
                              alt={title}
                              className="section1__product__img"
                            />
                          </div>

                          <div className="all__center">
                            <div>
                              <p className="title">{title}</p>
                            </div>

                            <div>
                              <p className="description">{description}</p>
                            </div>

                            <div className="price">
                              {price
                                .toString()
                                .split(".")[0]
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </div>

                            <div>
                              <span className="sale">
                                {sale <= 0 ? "" : sale + "%"}
                              </span>
                              &nbsp; &nbsp; &nbsp;
                              <span className="price__sale">
                                {sale <= 0
                                  ? ""
                                  : (price / sale)
                                      .toString()
                                      .split(".")[0]
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                    "원"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="skon__box">
          {skin ? (
            <div>
              <div className="section1__product">
                {productSkin.slice(0, 8).map((item, index) => {
                  const {
                    id,
                    tag,
                    productImageUrl,
                    title,
                    description,
                    price,
                    sale,
                  } = item;

                  return (
                    <div key={index}>
                      {tag === "스킨헤어" ? (
                        <div
                          className="skin__box__flex"
                          onClick={() => {
                            navigator(`/productbuy/${id}`);
                          }}
                        >
                          <div>
                            <img
                              src={productImageUrl}
                              alt={title}
                              className="section1__product__img"
                            />
                          </div>

                          <div className="skin__center">
                            <div className="title">
                              <p>{title}</p>
                            </div>

                            <div className="description">
                              <p>{description}</p>
                            </div>

                            <div className="price">
                              {price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </div>

                            <div className="sale">
                              <span>{sale <= 0 ? "" : sale + "%"}</span>
                              &nbsp; &nbsp; &nbsp;
                              <span className="price__sale">
                                {sale <= 0
                                  ? ""
                                  : (price / sale)
                                      .toString()
                                      .split(".")[0]
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                    "원"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="mask__box">
          {mask ? (
            <div>
              <div className="section1__product">
                {productMask.map((item, index) => {
                  const {
                    id,
                    tag,
                    productImageUrl,
                    title,
                    description,
                    price,
                    sale,
                  } = item;

                  return (
                    <div key={index}>
                      {tag === "마스크" ? (
                        <div
                          className="mask__flex"
                          onClick={() => {
                            navigator(`/productbuy/${id}`);
                          }}
                        >
                          <div>
                            <img
                              src={productImageUrl}
                              alt={title}
                              className="section1__product__img"
                            />
                          </div>

                          <div className="mask__center">
                            <div className="title">
                              <p>{title}</p>
                            </div>

                            <div className="description">
                              <p>{description}</p>
                            </div>

                            <div className="price">
                              {price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </div>

                            <div className="sale">
                              <span>{sale <= 0 ? "" : sale + "%"}</span>
                              &nbsp; &nbsp; &nbsp;
                              <span className="price__sale">
                                {sale <= 0
                                  ? ""
                                  : (price / sale)
                                      .toString()
                                      .split(".")[0]
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                    "원"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="cle__box">
          {cle ? (
            <div>
              <div className="section1__product">
                {productCle.map((item, index) => {
                  const {
                    id,
                    tag,
                    productImageUrl,
                    title,
                    description,
                    price,
                    sale,
                  } = item;

                  return (
                    <div key={index}>
                      {tag === "클렌징" ? (
                        <div
                          className="cle__flex"
                          onClick={() => {
                            navigator(`/productbuy/${id}`);
                          }}
                        >
                          <div>
                            <img
                              src={productImageUrl}
                              alt={title}
                              className="section1__product__img"
                            />
                          </div>

                          <div className="cle__center">
                            <div className="title">
                              <p>{title}</p>
                            </div>

                            <div className="description">
                              <p>{description}</p>
                            </div>

                            <div className="price">
                              <p>
                                {price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                원
                              </p>
                            </div>

                            <div className="sale">
                              <span>{sale <= 0 ? "" : sale + "%"}</span>
                              &nbsp; &nbsp; &nbsp;
                              <span className="price__sale">
                                {sale <= 0
                                  ? ""
                                  : (price / sale)
                                      .toString()
                                      .split(".")[0]
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                    "원"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section1;
