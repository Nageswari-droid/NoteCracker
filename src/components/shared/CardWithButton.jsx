import ButtonWithImage from "./ButtonWithIcon";

export default function CardWithButton({
  img,
  body,
  buttonIcon,
  buttonActiveIcon,
  buttonText,
}) {
  return (
    <div className="w-full border-0 m-auto h-3/4 max-[500px]:h-3/4 lg:h-3/4 sm:h-2/3 flex justify-center rounded-md bg-slate-100 gap-10 p-6">
      <div className={`flex flex-row justify-center mx-auto`}>
        <img src={img} className="select-none mx-auto w-60 h-60" />
      </div>
      <div className="w-full xl:w-3/4 lg:w-3/4 md:w-3/4 border-l-2 border-gray-200 flex flex-col items-center justify-evenly">
        <div className="text-center">{body}</div>
        <div className="w-full flex justify-center">
          <ButtonWithImage
            icon={buttonIcon}
            activeIcon={buttonActiveIcon}
            label={buttonText}
          />
        </div>
      </div>
    </div>
  );
}
