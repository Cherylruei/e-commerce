interface InputProps {
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  autoComplete,
  placeholder,
  onChange,
}) => {
  return (
    <div className='mt-2'>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete || 'off'}
        placeholder={placeholder}
        required
        className='block w-full h-8 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs lg:text-sm sm:leading-6 lg:h-12'
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
