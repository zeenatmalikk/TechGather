//client side component because its interactive and needs to handle user clicks
//if it has onclick its a client component, if it doesnt have onclick its a server component, if it has both its a client component, if it has neither its a server component
'use client';

import Image from "next/image";

const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log('CLICK')}>
            <a href="#events" >
                Explore Events
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
            </a>
        </button>
    )
}

export default ExploreBtn