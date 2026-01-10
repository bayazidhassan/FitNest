type Props = {
  text: string;
};

const NoOrders = ({ text }: Props) => {
  return (
    <div className="flex justify-center items-center h-[40vh]">
      <p className="text-gray-500 text-lg text-center px-4">{text}</p>
    </div>
  );
};

export default NoOrders;
