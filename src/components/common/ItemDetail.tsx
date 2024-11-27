import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabase";

interface ItemDetail {
  isModal: boolean; // true: 수정, false: 상세
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product_no?: number;
}

const ItemDetail = ({ setModalOpen, isModal, product_no }: ItemDetail) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const [count, setCount] = useState<number>();
  const [position, setPosition] = useState<number>(1);
  const [memo, setMemo] = useState<string>("");

  // 아이템 등록/수정 API
  const onClickSaveItem = async () => {
    if (title === "") {
      alert("이름을 입력해주세요!");
      setTitle("");
      return;
    }

    if (expireDate === "") {
      alert("유통기한을 입력해주세요!");
      setExpireDate("");
      return;
    }

    if (!count) {
      alert("수량을 입력해주세요!");
      setCount(0);
      return;
    }

    if (!position) {
      alert("보관 위치를 번호로 입력해주세요!");
      setCount(0);
      return;
    }

    try {
      // 모달인 경우 - 수정
      if (isModal) {
        console.log("expireDate type:", typeof expireDate);
        const { data, error } = await supabase
          .from("product")
          .update({
            title,
            expire_date: expireDate,
            memo,
            count,
            position,
          })
          .eq("idx", product_no)
          .select();

        setModalOpen(false);
      } else {
        const { data, error } = await supabase
          .from("product")
          .insert([
            {
              title,
              expire_date: expireDate,
              memo,
              count,
              position,
            },
          ])
          .select();
        navigate(`/compartment?position=${position}`);
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  // 개별 아이템 상세 조회
  const getDetailItem = async () => {
    let { data: _product, error } = await supabase
      .from("product")
      .select("*")
      .eq("idx", product_no)
      .eq("is_deleted", "N");

    if (_product) {
      const product = _product[0];
      setTitle(product.title);
      setExpireDate(product.expire_date);
      setCount(product.count);
      setPosition(product.position);
      setMemo(product.memo);
    }
  };

  useEffect(() => {
    if (isModal) {
      getDetailItem();
    }
  }, [isModal]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
      <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="mb-5 text-center text-xl font-bold">
          {isModal ? "음식 정보 수정하기" : "음식을 추가해보세요!"}
        </h1>
        <div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="px-5 py-7">
            <label
              htmlFor="title"
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              이름
            </label>
            <input
              type="text"
              id="title"
              value={title}
              className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="expire"
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              유통기한
            </label>
            <input
              type="date"
              id="expire"
              value={expireDate}
              className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              onChange={(e) => setExpireDate(e.target.value)}
            />
            <label
              htmlFor="count"
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              수량
            </label>
            <input
              type="number"
              id="count"
              value={count}
              className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <label
              htmlFor="count"
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              보관 위치
            </label>
            <select
              value={position}
              className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              onChange={(e) => setPosition(parseInt(e.target.value))}
            >
              <option value="2">[냉장] 중앙</option>
              <option value="1">[냉장] 날개 (L)</option>
              <option value="3">[냉장] 날개 (R)</option>
              <option value="5">[냉동] 중앙</option>
              <option value="4">[냉동] 날개 (L)</option>
              <option value="6">[냉동] 날개 (R)</option>
            </select>
            <label
              htmlFor="memo"
              className="block pb-1 text-sm font-semibold text-gray-600"
            >
              메모
            </label>
            <input
              type="string"
              id="memo"
              value={memo}
              className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              onChange={(e) => setMemo(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-block w-full rounded-lg bg-slate-400 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 hover:shadow-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() =>
                  `${isModal ? setModalOpen(false) : navigate(-1)}`
                }
              >
                <span className="mr-2 inline-block">취소</span>
              </button>
              <button
                type="button"
                className="inline-block w-full rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 hover:shadow-md focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={onClickSaveItem}
              >
                <span className="mr-2 inline-block">저장</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
