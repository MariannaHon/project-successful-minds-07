import React, { useRef, useEffect } from "react";

function useClickOutside(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
       onClick()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function ClickOutside({onClick, ...props}) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, onClick);

  return <div ref={wrapperRef}>{props.children}</div>;
}