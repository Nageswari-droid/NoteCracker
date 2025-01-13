import CardWithButton from "./shared/CardWithButton";
import notes from "../assets/notes.svg";
import notion from "../assets/notion.svg";
import notionFilled from "../assets/notion-filled.svg";
import useLoginWithNotion from "../notion/useLoginWithNotion";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { cardBody, notionLogin } from "../constants/text";

export default function Login() {
  const navigate = useNavigate();
  const session = useSession();
  const login = useLoginWithNotion();
  const { data, isError } = session;

  useEffect(() => {
    if (!isError && data) {
      navigate("/pages");
    }
  }, [data, isError]);

  const loginWithNotion = async () => {
    login.mutateAsync();
  };

  return (
    <div className="bg-[#1a1a19] w-full h-full flex">
      <div className="m-auto">
        <CardWithButton
          img={notes}
          body={cardBody}
          buttonText={notionLogin}
          buttonIcon={notion}
          buttonActiveIcon={notionFilled}
          buttonOnClick={loginWithNotion}
        />
      </div>
    </div>
  );
}
