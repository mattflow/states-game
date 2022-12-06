import Container from "./components/Container";
import GuessInput from "./components/GuessInput";
import Header from "./components/Header";
import Score from "./components/Score";

const App = () => {
  return (
    <Container>
      <Header />
      <Score correct={0} remaining={50} />
      <GuessInput />
    </Container>
  );
};

export default App;
