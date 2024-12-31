import CardWithButton from "./shared/CardWithButton";
import notes from "../assets/notes.svg";
import notion from "../assets/notion.svg";
import notionFilled from "../assets/notion-filled.svg";

function Login() {
  return (
    <div className="bg-[#1a1a19] w-full h-full flex">
      <div className="m-auto">
        <CardWithButton
          img={notes}
          body="Enhance learning with active recall!"
          buttonText="Login with Notion"
          buttonIcon={notion}
          buttonActiveIcon={notionFilled}
        />
      </div>
    </div>
  );
}

export default Login;
