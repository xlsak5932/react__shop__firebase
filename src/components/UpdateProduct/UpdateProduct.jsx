import React, { useContext, useState, useEffect } from "react";
import { fireDB, fireStorage } from "../../firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router";
import {
  Timestamp,
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    tag: "",
    productImageUrl: "",
    title: "",
    description: "",
    price: "",
    sale: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const { id } = useParams();
  const [getAllProduct, setGetAllProduct] = useState([]);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(fireStorage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(storageRef);

      setProduct({
        ...product,
        productImageUrl: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getProductFunction = async () => {
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();

      setProduct({
        tag: product?.tag,
        productImageUrl: product?.productImageUrl,
        title: product?.title,
        description: product?.description,
        price: product?.price,
        sale: product?.sale,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
    } catch (error) {
      console.log("UpdateProduct.jsx : ", error);
    }
  };

  const UpdateProductFunction = async () => {
    try {
      await setDoc(doc(fireDB, "products", id), product);

      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];

        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllProduct(productArray);
      });

      navigate("/Admin");

      return () => data;
    } catch (error) {
      console.log("UpdateProduct.jsx : ", error);
    }
  };

  const AdminMove = () => {
    navigate("/Admin");
  };

  useEffect(() => {
    if (id) {
      getProductFunction(id);
    }
  }, [id]);
  return (
    <div className="add__product">
      <h2>상품 등록 수정하기</h2>
      <div className="add__product__box">
        {/* 1. 상품 태그, 이미지, 상품 제목, 상품 설명, 가격, 할인 가격 */}
        {/* 2. 태그: ALL / 스킨케어 / 마스크 / 클렌징 */}
        <div className="add__tag">
          <select
            onChange={(e) => {
              setProduct({ ...product, tag: e.target.value });
            }}
            value={product.tag}
          >
            <option value="상품 태그를 선택해주세요">
              상품 태그를 선택해주세요
            </option>
            <option value="ALL">ALL</option>
            <option value="스킨헤어">스킨헤어</option>
            <option value="마스크">마스크</option>
            <option value="클렌징">클렌징</option>
          </select>
        </div>

        <div className="add__image">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="fileInput"
          />
        </div>

        <div className="add__title">
          <input
            type="text"
            placeholder="상품 제목을 입력해주세요"
            onChange={(e) => {
              setProduct({ ...product, title: e.target.value });
            }}
            value={product.title}
          />
        </div>
        <div className="add__description">
          <input
            type="text"
            placeholder="상품 설명을 입력해주세요"
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
            value={product.description}
          />
        </div>

        <div className="add__price">
          <input
            type="number"
            placeholder="상품 가격을 숫자로 입력해주세요"
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
            value={product.price}
          />
        </div>

        <div className="add__sale">
          <input
            type="number"
            placeholder="세일 가격을 숫자로 입력해주세요"
            onChange={(e) => {
              setProduct({ ...product, sale: e.target.value });
            }}
            value={product.sale}
          />
        </div>

        <div className="add__btn__box">
          <button type="button" onClick={UpdateProductFunction}>
            상품 수정하기
          </button>
        </div>
        <div className="add__admin__btn__box">
          <button type="button" onClick={AdminMove}>
            관리 페이지로 이동하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
