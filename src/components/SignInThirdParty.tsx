interface SignInThirdPartyProps {
  image: string;
  content: string;
  onClickAction?: () => void;
}

const SignInThirdParty = ({
  image,
  content,
  onClickAction,
}: SignInThirdPartyProps) => {
  return (
    <div
      className='flex flex-row gap-2 border-1 px-6 py-3 rounded-full shadow-md hover:bg-slate-200 cursor-pointer'
      onClick={onClickAction}
    >
      <img src={image} alt='google' className='w-7' />
      <h2 className='my-auto text-xl sm:hidden lg:block'>{content}</h2>
    </div>
  );
};

export default SignInThirdParty;
