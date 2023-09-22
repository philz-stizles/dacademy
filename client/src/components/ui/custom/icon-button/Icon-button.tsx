type IconButtonProps = {
  rounded?: boolean;
  outlined?: boolean;
  icon: any;
};

const IconButton = ({ icon, rounded = true, outlined = false}: IconButtonProps) => {
  return <button className={`border border-neutral-900 p-2 flex flex-col justify-center items-center
  ${rounded ? 'rounded-full': ''} 
  ${outlined ? 'bg-white': 'bg-neutral-900'}
  ${outlined ? 'text-neutral-900': 'text-white'}`
}>{icon}</button>;
};

export default IconButton;
