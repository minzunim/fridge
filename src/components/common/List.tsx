
interface FridgeItemModel {
    count: number;
    expire_date: string;
    idx: number;
    is_deleted: "N" | "Y";
    memo: string;
    modify_date: null | string;
    position: number;
    register: number;
    register_date: string;
    title: string;
}

interface FrigeItemListModel {
    list: FridgeItemModel[];
}

const ItemList = ({ list }: FrigeItemListModel) => {
    return (
        <>
            {list.map((item: FridgeItemModel, index: number) => (
                <div
                    key={index}
                    className="box-border border-4 rounded-lg">
                    <li>{item.title}&nbsp;&nbsp;|&nbsp;&nbsp;{item.count}개&nbsp;&nbsp;|&nbsp;&nbsp;{item.register_date}</li>
                </div>
            ))}
        </>
    );
};

export default ItemList;