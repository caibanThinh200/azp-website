import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom";
import Wrapper from "../Component/Wrapper";
import Container from "./Container";

const NotFound = props => {
    const navigate = useNavigate();
    return <Wrapper>
        <Container>
            <Result
                status="404"
                title="404"
                subTitle="Trang này không tồn tại"
                extra={<Button onClick={() => navigate("/")} type="primary">Quay về trang chủ</Button>}
            />
        </Container>
    </Wrapper>
}

export default NotFound;