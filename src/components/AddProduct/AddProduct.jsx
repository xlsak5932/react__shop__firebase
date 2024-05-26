import React, { useContext, useState } from "react";
import { fireDB, fireStorage } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import "./AddProduct.css";

const AddProduct = () => {
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

  const addProductFunction = async () => {
    if (
      product.productImageUrl === "" ||
      product.title === "" ||
      product.description === "" ||
      product.price === "" ||
      product.sale === ""
    ) {
      alert("내용을 전부 입력 해주세요");
      return;
    }
    if (!product.tag) {
      alert("상품 태그를 선택해주세요");
      return;
    }

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);

      setProduct({
        tag: "",
        productImageUr: "",
        title: "",
        description: "",
        price: "",
        sale: "",
      });

      alert("상품이 등록되었습니다.");

      navigate("/Admin");
    } catch (error) {
      console.log("AddProduct.jsx : ", error);
    }
  };

  const AdminMove = () => {
    navigate("/Admin");
  };

  return (
    <div className="add__product">
      <h2>상품 등록하기</h2>
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
            {/* <option value="ALL">ALL</option> */}
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
          <button type="button" onClick={addProductFunction}>
            상품 등록하기
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

export default AddProduct;
