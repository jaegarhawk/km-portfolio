'use client';

import { PiCaretCircleDoubleDownFill } from "react-icons/pi";

const ExploreBtn = () => {
    return (
        <button className="justify-center" onClick={() => console.log('CLICK')}><PiCaretCircleDoubleDownFill size={40} /></button>
    )
}

export default ExploreBtn