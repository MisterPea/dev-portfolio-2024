import { useRef, useEffect } from 'react';
// Convenience component to abstract out the hit areas
/*  
This is done so we can move the click action away from the arrow button, and
turn the whole half of the image into a button. The problem is the image size
is dynamic, so to have access we have to create the button on the image layer 
and pass the references to the button action into it (the button). 
*/
interface ClickableAreaProps {
  side: 'left' | 'right';
  elemToModify: any;
  clickHandler: (direction: 'prev' | 'next') => void;
}
const ClickableArea = ({ side, elemToModify, clickHandler }: ClickableAreaProps) => {
  const clickableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const moveTo = side === 'left' ? 1 : -1;
    const hoverOn = () => {
      if (elemToModify.current) {
        elemToModify.current.style.transform = `translateX(${moveTo * 19}px)`;
      }
    };
    const hoverOff = () => {
      if (elemToModify.current) {
        elemToModify.current.style.transform = `translateX(${moveTo * 25}px)`;
      }
    };
    const clickableRefLocal = clickableRef.current;

    if (clickableRefLocal) {
      clickableRefLocal.addEventListener('mouseover', hoverOn);
      clickableRefLocal.addEventListener('mouseout', hoverOff);
    }
    return () => {
      clickableRefLocal?.removeEventListener('mouseover', hoverOn);
      clickableRefLocal?.removeEventListener('mouseout', hoverOff);
    };
  }, [elemToModify, side]);

  const direction = side === 'left' ? 'prev' : 'next';

  return (
    <div
      ref={clickableRef}
      className={`image_text-clickable ${side}`}
      style={{
        flex: 1,
        height: '100%',
        opacity: 0.4,
        zIndex:1,
        cursor:'pointer',
      }}
      onClick={clickHandler.bind(null, direction)}
      role='button'
    />
  );
};

interface ClickableAreasProps {
  /* Left element to animate */
  leftBtnRef: React.RefObject<HTMLDivElement>;
  /* Right element to animate */
  rightBtnRef: React.RefObject<HTMLDivElement>;
  /* On area click - callback */
  clickHandler: (direction: 'prev' | 'next') => void;
}

export default function ClickableAreas({ leftBtnRef, rightBtnRef, clickHandler }: ClickableAreasProps) {
  return (
    <div
      className='button-hold'
      style={{
        position: 'absolute',
        display: 'flex',
        inset: 0,
      }}>
      <ClickableArea side='left' elemToModify={leftBtnRef} clickHandler={clickHandler} />
      <ClickableArea side='right' elemToModify={rightBtnRef} clickHandler={clickHandler} />
    </div>
  );
}
