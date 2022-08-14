import Header from './Header/Header';
import { FC, ReactNode } from "react";
import Footer from './Footer/Footer';

type layoutProps = {
  children: ReactNode,
}

const Layout: FC<layoutProps> = ({ children }) => (
  <>
    <Header />
    { children }
    <Footer/>
  </>
)

export default Layout;