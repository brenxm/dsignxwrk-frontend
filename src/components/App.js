import React from "react"

export default function App(){
    return  <>
        <TopNavMenu />
            </>
}

function TopNavMenu(){
    return <div className="top-nav-menu">
        {/* Top left logo button */}
        <button>
            logo
        </button>

        {/* Top right shopping cart button */}
        <button>
            sc button
        </button>
    </div>
}