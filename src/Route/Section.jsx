import Wrapper from "../Component/Wrapper";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import SecureRoute from "./SecureRoute";
import Layout from "../Page";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Section = (props) => {
    AOS.init();
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<SecureRoute />}>
                <Route path="" element={<Layout.HomePage/>} />
            </Route>
            <Route path="/san-pham" element={<SecureRoute />}>
                <Route path="" element={<Layout.ProductList/>} />
            </Route>
            <Route path="/san-pham/:slug" element={<SecureRoute />}>
                <Route path="" element={<Layout.ProductDetail/>} />
            </Route>
            <Route path="/checkout" element={<SecureRoute />}>
                <Route path="" element={<Layout.Checkout/>} />
            </Route>
            <Route path="/checkout/:id" element={<SecureRoute />}>
                <Route path="" element={<Layout.PaymentResult/>} />
            </Route>
            <Route path="*" element={<Layout.NotFound/>}>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Section;