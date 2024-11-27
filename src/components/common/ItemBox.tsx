import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ItemDetail from "./ItemDetail";
import { supabase } from "../../config/supabase";

interface Iprops {
  product_no: number;
  title: string;
  expire_date: string;
}

export const ItemBox = ({ product_no, title, expire_date }: Iprops) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalBackground = useRef<HTMLDivElement>(null);

  // 날짜 비교
  const today = moment();
  const _expire_date = moment(expire_date);
  const diff = today.diff(_expire_date, "days");

  // 오늘 + 4일인 경우 -> 파란색 (신선)
  // 오늘 포함 + 3일인 경우 -> 빨간색 (경고)
  // 오늘 이전인 경우 -> 검은색 (썩음)
  const checkExpire = () => {
    if (diff > 0) {
      return "bg-slate-600";
    } else if (diff >= -3 && diff <= 0) {
      return "bg-red-500";
    } else {
      return "bg-sky-400";
    }
  };

  // 상품 삭제 API
  const onClickDeleteHandler = async (product_no: number) => {
    if (window.confirm("아이템을 삭제하시겠습니까?")) {
      const { data, error } = await supabase
        .from("product")
        .update({ is_deleted: "Y" })
        .eq("idx", product_no)
        .select();

      window.location.reload();
    }
  };

  return (
    <>
      <div
        className={`rounded-md ${checkExpire()} relative m-3 p-3 text-stone-50`}
        onClick={() => setModalOpen(true)}
      >
        {title}

        {/* 아이템 삭제 x 버튼 */}
        <div
          className="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-none bg-slate-400 font-bold text-white"
          onClick={(e) => {
            e.stopPropagation();
            onClickDeleteHandler(product_no);
          }}
        >
          &times;
        </div>
      </div>
      {modalOpen && (
        <>
          <div
            className="fixed left-0 top-0 z-40 h-full w-full bg-slate-500 opacity-70"
            ref={modalBackground}
            onClick={(e) => {
              e.stopPropagation();
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          ></div>
          <div className="fixed left-1/2 z-50 h-3/4 max-h-[calc(100vh-200px)] w-4/5 -translate-x-1/2 overflow-auto rounded-md border bg-white text-black">
            <ItemDetail
              isModal={true}
              setModalOpen={setModalOpen}
              product_no={product_no}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ItemBox;
