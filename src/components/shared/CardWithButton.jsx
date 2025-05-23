import ButtonWithImage from "./ButtonWithIcon";

export default function CardWithButton({
  img,
  body,
  buttonIcon,
  buttonActiveIcon,
  buttonText,
  buttonOnClick
}) {
  return (
    <div className="w-full border-0 m-auto h-3/4 max-[500px]:h-3/4 lg:h-3/4 sm:h-2/3 max-[600px]:w-11/12 max-[550px]:w-full max-[500px]:w-11/12 flex flex-row max-[550px]:flex-col justify-center rounded-md bg-slate-100 gap-10 p-6">
      <div className={`flex flex-row justify-center mx-auto`}>
        <img src={img} className="select-none mx-auto w-60 h-60 max-[600px]:w-30 max-[600px]:h-30 max-[550px]:w-25 max-[550px]:h-25" />
      </div>
      <div className="w-full xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-1/2 border-l-2 max-[550px]:border-l-0 border-gray-200 flex flex-col items-center justify-evenly">
        <div className="text-center max-[600px]:w-1/2 max-[500px]:w-2/3 max-[600px]:text-sm max-[550px]:mb-4">{body}</div>
        <div className="w-full flex justify-center">
          <ButtonWithImage
            icon={buttonIcon}
            activeIcon={buttonActiveIcon}
            label={buttonText}
            onClickHandler={buttonOnClick}
          />
        </div>
      </div>
    </div>
  );
}
