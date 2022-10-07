import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGrinStars } from "@fortawesome/free-regular-svg-icons";

const Box = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  padding: 10px;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  font-size: 25px;
  color: white;
  cursor: pointer;
`;

function Widget() {
  const [isDark, setDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDark((current) => !current);

  return (
    <Box>
      <Button>
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
      </Button>
      <Button onClick={toggleDarkAtom}>
        {isDark ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </Button>
    </Box>
  );
}

export default Widget;
