import { useMemo } from "react";

type UploadButtonProps = {
  className?: string;
  onClick: () => void;
};

export default function UploadFileDialogButton(props: UploadButtonProps) {
  const cls = useMemo(() => {
    let cls = `bg-primary px-6 py-3 rounded-full hover:bg-accent hover:cursor-pointer transition duration-[300ms]`;
    if (cls) {
      cls += ` ${props.className}`;
    }
    return cls;
  }, [props.className]);
  return (
    <button className={cls} onClick={props.onClick}>
      Enviar arquivo
    </button>
  );
}
