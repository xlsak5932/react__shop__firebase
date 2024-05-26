import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import "./Admin.css";

const Admin = () => {
  const [getAllUser, setGetAllUser] = useState([]);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [userBtn, setUserBtn] = useState(true);
  const [addProductBtn, setAddProductBtn] = useState(false);
  const navigator = useNavigate();
  const [all, setAll] = useState(true);
  const [skin, setSkin] = useState(false);
  const [mask, setMask] = useState(false);
  const [cle, setCle] = useState(false);

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

  function JoinUser() {
    try {
      const q = query(collection(fireDB, "user"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
      });

      return () => data;
    } catch (error) {
      console.log("Admin.jsx의 JoinUser() : ", error);
    }
  }

  function AdminProduct() {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllProduct(productArray);
      });

      return () => data;
    } catch (error) {
      console.log("Admin.jsx의 AdminProduct() : ", error);
    }
  }

  function UserFunc() {
    setUserBtn(true);

    if (addProductBtn === true) {
      setAddProductBtn(false);
    }
  }

  function AddProduct() {
    setAddProductBtn(true);

    if (userBtn === true) {
      setUserBtn(false);
    }
  }

  function ProductRegister() {
    navigator("/addproduct");
  }

  const ProductDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "products", id));

      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
      });
      return () => data;
    } catch (error) {
      console.log("Admin.jsx의 ProductDelete() : ", error);
    }
  };

  const AllClick = () => {
    console.log("AllClick" + all);
    setAll(true);
    setSkin(false);
    setMask(false);
    setCle(false);
  };

  const SkinClick = () => {
    console.log("SkinClick" + skin);
    setAll(false);
    setSkin(true);
    setMask(false);
    setCle(false);
  };

  const MaskClick = () => {
    setAll(false);
    setSkin(false);
    setMask(true);
    setCle(false);
  };

  const CleClick = () => {
    setAll(false);
    setSkin(false);
    setMask(false);
    setCle(true);
  };

  useEffect(() => {
    JoinUser();
    AdminProduct();
  }, []);

  return (
    <div className="admin">
      <div className="admin__box">
        <h2>상품 등록 및 관리 / 가입 유저 관리</h2>

        <div className="admin__flex">
          <div className="admin__user">
            <div className="admin__manager">
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={UserFunc}
                    className={userBtn ? "active" : ""}
                  >
                    가입 유저 관리
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={AddProduct}
                    className={addProductBtn ? "active" : ""}
                  >
                    상품 등록 및 관리
                  </button>
                </li>
              </ul>
            </div>

            {userBtn ? (
              <div className="user__list">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>이메일</th>
                      <th>가입 유저 종류</th>
                      <th>가입연도</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getAllUser.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value.email}</td>
                          <td>{value.role}</td>
                          <td>{value.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <></>
            )}
          </div>

          {addProductBtn ? (
            <div className="admin__product__register">
              <div className="product__description">
                <button
                  type="button"
                  className="product__register"
                  onClick={ProductRegister}
                >
                  상품 등록하기
                </button>
              </div>
              <div className="admin__product__tab">
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={AllClick}
                      className={all ? "active" : ""}
                    >
                      ALL
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={SkinClick}
                      className={skin ? "active" : ""}
                    >
                      스킨헤어
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={MaskClick}
                      className={mask ? "active" : ""}
                    >
                      마스크
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={CleClick}
                      className={cle ? "active" : ""}
                    >
                      클렌징
                    </button>
                  </li>
                </ul>
              </div>
              {/* productSkin productMask productCle */}
              {/* admin__all__btn__click */}
              <div className="admin__all__btn__click">
                {all ? (
                  getAllProduct.slice(0, 1).map((item, index) => {
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
                          <div className="user__list">
                            <table>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>상품 태그</th>
                                  <th>이미지</th>
                                  <th>상품 제목</th>
                                  <th>상품 설명</th>
                                  <th>상품 가격</th>
                                  <th>상품 세일</th>
                                  <th>상품 삭제</th>
                                  <th>상품 수정</th>
                                </tr>
                              </thead>

                              <tbody>
                                {
                                  //  tag: "",
                                  //  productImageUrl: "",
                                  //  title: "",
                                  //  description: "",
                                  //  price: "",
                                  //  sale: "",
                                  getAllProduct.map((item, index) => {
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
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{tag}</td>
                                        <td>
                                          <img
                                            src={productImageUrl}
                                            alt={title}
                                            className="add__product__img"
                                          />
                                        </td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>
                                          {price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}
                                          원
                                        </td>
                                        <td>{sale}%</td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              ProductDelete(item.id)
                                            }
                                            className="admin__product__delete"
                                          >
                                            삭제
                                          </button>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              navigator(`/updateproduct/${id}`)
                                            }
                                            className="admin__product__update"
                                          >
                                            수정
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>

              <div className="admin__skin__btn__click">
                {skin ? (
                  productSkin.slice(0, 1).map((item, index) => {
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
                        {tag == "스킨헤어" ? (
                          <div className="user__list">
                            <table>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>상품 태그</th>
                                  <th>이미지</th>
                                  <th>상품 제목</th>
                                  <th>상품 설명</th>
                                  <th>상품 가격</th>
                                  <th>상품 세일</th>
                                  <th>상품 삭제</th>
                                  <th>상품 수정</th>
                                </tr>
                              </thead>

                              <tbody>
                                {
                                  //  tag: "",
                                  //  productImageUrl: "",
                                  //  title: "",
                                  //  description: "",
                                  //  price: "",
                                  //  sale: "",
                                  productSkin.map((item, index) => {
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
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{tag}</td>
                                        <td>
                                          <img
                                            src={productImageUrl}
                                            alt={title}
                                            className="add__product__img"
                                          />
                                        </td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>
                                          {price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}
                                          원
                                        </td>
                                        <td>{sale}%</td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              ProductDelete(item.id)
                                            }
                                            className="admin__product__delete"
                                          >
                                            삭제
                                          </button>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              navigator(`/updateproduct/${id}`)
                                            }
                                            className="admin__product__update"
                                          >
                                            수정
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>

              <div className="admin__mask__btn__click">
                {mask ? (
                  productMask.slice(0, 1).map((item, index) => {
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
                        {tag == "마스크" ? (
                          <div className="user__list">
                            <table>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>상품 태그</th>
                                  <th>이미지</th>
                                  <th>상품 제목</th>
                                  <th>상품 설명</th>
                                  <th>상품 가격</th>
                                  <th>상품 세일</th>
                                  <th>상품 삭제</th>
                                  <th>상품 수정</th>
                                </tr>
                              </thead>

                              <tbody>
                                {
                                  //  tag: "",
                                  //  productImageUrl: "",
                                  //  title: "",
                                  //  description: "",
                                  //  price: "",
                                  //  sale: "",
                                  productMask.map((item, index) => {
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
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{tag}</td>
                                        <td>
                                          <img
                                            src={productImageUrl}
                                            alt={title}
                                            className="add__product__img"
                                          />
                                        </td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>
                                          {price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}
                                          원
                                        </td>
                                        <td>{sale}%</td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              ProductDelete(item.id)
                                            }
                                            className="admin__product__delete"
                                          >
                                            삭제
                                          </button>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              navigator(`/updateproduct/${id}`)
                                            }
                                            className="admin__product__update"
                                          >
                                            수정
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>

              <div className="admin__cle__btn__click">
                {cle ? (
                  productCle.slice(0, 1).map((item, index) => {
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
                        {tag == "클렌징" ? (
                          <div className="user__list">
                            <table>
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>상품 태그</th>
                                  <th>이미지</th>
                                  <th>상품 제목</th>
                                  <th>상품 설명</th>
                                  <th>상품 가격</th>
                                  <th>상품 세일</th>
                                  <th>상품 삭제</th>
                                  <th>상품 수정</th>
                                </tr>
                              </thead>

                              <tbody>
                                {
                                  //  tag: "",
                                  //  productImageUrl: "",
                                  //  title: "",
                                  //  description: "",
                                  //  price: "",
                                  //  sale: "",
                                  productCle.map((item, index) => {
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
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{tag}</td>
                                        <td>
                                          <img
                                            src={productImageUrl}
                                            alt={title}
                                            className="add__product__img"
                                          />
                                        </td>
                                        <td>{title}</td>
                                        <td>{description}</td>
                                        <td>
                                          {price
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                            )}
                                          원
                                        </td>
                                        <td>{sale}%</td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              ProductDelete(item.id)
                                            }
                                            className="admin__product__delete"
                                          >
                                            삭제
                                          </button>
                                        </td>
                                        <td>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              navigator(`/updateproduct/${id}`)
                                            }
                                            className="admin__product__update"
                                          >
                                            수정
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
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

export default Admin;
