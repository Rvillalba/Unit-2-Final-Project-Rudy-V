import html2canvas from 'html2canvas';
import { useRef } from "react";
import Button from './Button';

/*This variable is part of the download button disable*/
const CardPreview = ({ data, isDisabled }) => {
    const elementRef = useRef(null);
    const htmlToCanvas = () => {
      if(!elementRef.current) return;
      /*this bit of code utilizes html2canvas for the card download*/
      html2canvas(elementRef.current).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "calling-card.png";
        link.click();
      });
     };

    return(
      <div>
        <div 
          id="business-card"
          ref={elementRef}
        >
          {/*These are where the child component pulls in props from the parent component*/}
            <p>{data.name}</p>
            <p>{data.phone}</p>
            <p>{data.email}</p>
            <p>{data.address1}</p>
            <p>{data.address2}</p><br/>
        </div>
        {/*Download button w/ event listener*/}
            <Button id="btn" label="Download Card" onClick={htmlToCanvas} disabled={isDisabled} />
        </div>
    )
}
export default CardPreview