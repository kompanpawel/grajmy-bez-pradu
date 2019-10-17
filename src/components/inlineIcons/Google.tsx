import React from "react";

const SvgGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path fill="#f4511e" d="M24 4a20 20 0 100 40 20 20 0 100-40z" />
    <path fill="#fff" d="M34 19h2v8h-2z" />
    <path
      fill="#fff"
      d="M31 22h8v2h-8zm-3.185.2l-.05-.2H19v3h5.91A5.996 5.996 0 0113 24a6 6 0 016-6c1.5 0 2.868.554 3.92 1.465l2.151-2.106A9 9 0 0010 24c0 4.971 4.029 9 9 9s9-4.029 9-9c0-.617-.066-1.218-.185-1.8z"
    />
  </svg>
);

export default React.memo(SvgGoogle);
