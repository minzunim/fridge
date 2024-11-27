import axios from "axios";
import ItemBox from "./ItemBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { supabase } from "../../config/supabase";
import PWAInstallPrompt from "../PWAInstallPrompt";
// import { supabase } from "../../config/supabase";

interface Item {
  idx: number;
  title: string;
  expire_date: string;
  register_date: string;
  modify_date: null;
  memo: string;
  register: number;
  count: number;
  position: number;
  is_deleted: "N" | "Y";
}

const Compart = () => {
  const location = useLocation();
  let position = parseInt(location.search.split("=")[1]);

  const navigate = useNavigate();

  const [itemList, setItemList] = useState<Item[]>([]);
  const [arrow, setArrow] = useState<"left" | "right">();

  // 아이템 리스트 조회
  const getItemList = async () => {
    // position 지정

    if (arrow) {
      if (arrow === "left") {
        if (position === 2) {
          position = 1;
        } else if (position === 3) {
          position = 2;
        } else if (position === 5) {
          position = 4;
        } else if (position === 6) {
          position = 5;
        }
      } else {
        if (position === 1) {
          position = 2;
        } else if (position === 2) {
          position = 3;
        } else if (position === 4) {
          position = 5;
        } else if (position === 5) {
          position = 6;
        }
      }
    }

    navigate(`/compartment?position=${position}`);

    let { data: item_list, error } = await supabase
      .from("product")
      .select("*")
      .eq("position", position)
      .eq("is_deleted", "N");

    if (error) {
      throw error;
    }

    if (item_list) {
      setItemList(item_list);
      setArrow(undefined);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  useEffect(() => {
    getItemList();
  }, [arrow]);

  return (
    <div>
      <PWAInstallPrompt />
      <div className="flex h-[calc(80vh-40px)] items-baseline justify-start bg-slate-300">
        {/* 왼쪽 화살표 */}
        {(position === 2 ||
          position === 3 ||
          position === 5 ||
          position === 6) && (
          <IoIosArrowDropleftCircle
            className="m-auto h-9 w-9 text-slate-400"
            onClick={() => {
              setArrow("left");
            }}
          />
        )}
        <div className="h-[calc(80vh-40px)] w-full bg-slate-300 p-4">
          <div className="flex h-full w-full flex-wrap content-start rounded-md bg-slate-200">
            {itemList.map((item, idx) => (
              <ItemBox
                key={idx}
                product_no={item.idx}
                title={item.title}
                expire_date={item.expire_date}
              />
            ))}
          </div>
        </div>
        {/* 오른쪽 화살표 */}
        {(position === 1 ||
          position === 2 ||
          position === 4 ||
          position === 5) && (
          <IoIosArrowDroprightCircle
            className="m-auto h-9 w-9 text-slate-400"
            onClick={() => setArrow("right")}
          />
        )}
      </div>
    </div>
  );
};

export default Compart;
