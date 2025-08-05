import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";


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
