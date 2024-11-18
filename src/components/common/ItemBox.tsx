interface TitleType {
    title: string;
}

export const ItemBox = ({ title }: TitleType) => {
    return (
        <div className="rounded-md border-2
                        p-4
                        ml-4 mt-4">
            {title}
        </div>
    );
};

export default ItemBox;