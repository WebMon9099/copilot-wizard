import { useState } from 'react';
import { c, getDatePreview, p } from '../lib';

const DateInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={c('relative', className)}>
      <img
        alt="calendar icon"
        className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2"
        src={p('icons/calendar_picker.svg')}
      />
      <input
        {...rest}
        className={c(
          'w-full rounded-md border border-theme-light-gray py-3 px-12 text-center font-medium text-theme-extra-dark-gray outline-none placeholder:text-theme-light-gray'
        )}
        type={focused ? 'date' : 'text'}
        onFocus={(e) => {
          if (rest.onFocus) rest.onFocus(e);

          setFocused(true);
        }}
        onTouchStart={(e) => {
          if (rest.onTouchStart) rest.onTouchStart(e);

          setFocused(true);
        }}
        onBlur={(e) => {
          if (rest.onBlur) rest.onBlur(e);

          setFocused(false);
        }}
        value={focused ? rest.value : getDatePreview(rest.value as string)}
      />
    </div>
  );
};

export default DateInput;
