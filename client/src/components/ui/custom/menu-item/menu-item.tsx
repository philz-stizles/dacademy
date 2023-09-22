import { PropsWithChildren } from "react";

type MenuItemProps = {
    label?: string;
    onClick?: () => void;
}

const MenuItem = ({label, onClick, children}: PropsWithChildren<MenuItemProps>) => {
  return (
    <div className="px-4 py-3 font-semibold transition hover:bg-neutral-100" onClick={onClick}>{children || label}</div>
  )
}

export default MenuItem