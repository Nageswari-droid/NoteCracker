import React, { useState, useEffect } from "react";
import Button from "./shared/Button";
import TextBox from "./shared/TextBox";
import {
  configurations,
  supabaseKeyLabel,
  supabaseURL,
  openAiKeyLabel,
  submit,
} from "../constants/text";

export default function ConfigPage({ setHasConfigurations }) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [openAiKey, setOpenAiKey] = useState("");

  useEffect(() => {
    if (supabaseUrl && supabaseKey && openAiKey) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [supabaseUrl, supabaseKey, openAiKey]);

  const handleSubmit = () => {
    if (isFormValid) {
      localStorage.setItem("supabaseUrl", supabaseUrl);
      localStorage.setItem("supabaseKey", supabaseKey);
      localStorage.setItem("openAiKey", openAiKey);

      setHasConfigurations(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#1a1a19]">
      <div className="bg-white p-6 rounded shadow-md xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-10/12 w-11/12">
        <div className="text-xl font-bold mb-4">{configurations}</div>
        <div>
          <TextBox
            label={supabaseURL}
            value={supabaseUrl}
            changeHandler={(value) => setSupabaseUrl(value)}
          />
          <TextBox
            label={supabaseKeyLabel}
            value={supabaseKey}
            changeHandler={(value) => setSupabaseKey(value)}
          />
          <TextBox
            label={openAiKeyLabel}
            value={openAiKey}
            changeHandler={(value) => setOpenAiKey(value)}
          />
          <div className="w-full flex items-center">
            <Button
              text={submit}
              isDisabled={!isFormValid}
              clickHandler={handleSubmit}
              widthStyle={"w-1/3 mx-auto text-center"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
