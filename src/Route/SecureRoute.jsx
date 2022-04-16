import Wrapper from "../Component/Wrapper";
import Container from "../Page/Container";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const SecureRoute = props => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const routerProps = {
        navigate,
        location
    }

    return <Container {...routerProps}>
        <Outlet context={routerProps}/>
    </Container>
}

export default SecureRoute;