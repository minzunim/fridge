import moment from "moment";

interface Iprops {
    title: string;
    expire_date: string;
}

export const ItemBox = ({ title, expire_date }: Iprops) => {

    // 날짜 비교
    const today = moment();
    const _expire_date = moment(expire_date);
    const diff = today.diff(_expire_date, "days");

    // 오늘 + 4일인 경우 -> 파란색 (신선)
    // 오늘 포함 + 3일인 경우 -> 빨간색 (경고)
    // 오늘 이전인 경우 -> 검은색 (썩음)
    const checkExpire = () => {
        if (diff > 0) {
            return 'bg-slate-600';
        } else if (diff >= -3 && diff <= -1) {
            return 'bg-red-500';
        } else {
            return 'bg-sky-400';
        }
    };

    return (
        <div className={`rounded-md
                        ${checkExpire()}
                        text-stone-50
                        p-3
                        ml-4 mt-4
                        `}>
            {title}
        </div>
    );
};

export default ItemBox;