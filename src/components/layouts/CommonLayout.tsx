import type { ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";


interface IProps {
    children: ReactNode // we can use ReactElements as well but this only accepts tsx or jsx 
}

export default function CommonLayout({ children }: IProps) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
