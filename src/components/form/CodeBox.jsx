import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";

export default function CodeBox({ title, code }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [open]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="w-full rounded-md mb-0 mt-4 bg-[#1e1e1e] text-left">

      {/* 헤더 */}
      <div className="flex w-full justify-between items-center px-4 py-2 border-b border-[#2c2c2c]">
        <h3 className="font-semibold text-base text-gray-200">{title}</h3>

        <div className="flex gap-2">
          <Button
            text
            label={open ? "코드닫기" : "코드보기"}
            onClick={() => setOpen(!open)}
            className="p-button-sm text-xs"
          />
          <Button
            text
            icon="pi pi-copy"
            onClick={copyToClipboard}
            className="p-button-sm"
            tooltip="Copy"
          />
        </div>
      </div>

      {/* 코드 영역 */}
      {open && (
       <pre className="w-full p-4 overflow-auto text-base leading-6 bg-black-800 text-white rounded-b-md m-0 border-0 text-left">
        <code  className="whitespace-pre text-white  text-ms">
            {code}
        </code>
       </pre>
      )}
    </div>
  );
}
