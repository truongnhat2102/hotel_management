const CardInfo = (props) => {
  const { title, imageUrl, description } = props;
  return (
    <div className="bg-white">
      <img src={imageUrl} alt="" />
      <div className="p-[24px] flex flex-col gap-[20px] items-center">
        <p>{title}</p>
        <div className="w-[40px] h-[3px] text-center bg-orange-300"></div>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};

export default CardInfo;
