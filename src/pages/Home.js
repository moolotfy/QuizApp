import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, CardDeck, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col, Progress } from "reactstrap";

function Home(props) {
  const {
    quiz: { quizzes },
  } = props;

  return (
    <>
      <Container>
        <h1 className="border-bottom pb-2 mt-4 d-flex justify-content-between align-items-center">
          Quizzes
          <Button to="/create" tag={Link}>
            Create Quiz
          </Button>
        </h1>
        <CardDeck tag={Row}>
          {(() => {
            if (quizzes?.length === 0) {
              return (
                <div className="d-inline-flex align-items-baseline justify-content-between">
                  <p>Create you first Quiz</p>
                  <Button className="ml-2 d-inline" size="sm" to="/create" tag={Link}>
                    Create Quiz
                  </Button>
                </div>
              );
            } else {
              return quizzes?.map((quiz) => (
                <Card tag={Col} md="4" className="mb-3" key={quiz?.id}>
                  <CardBody>
                    <Link to={`/quiz/${quiz?.id}`}>
                      <CardTitle tag="h4">{quiz?.title}</CardTitle>
                    </Link>
                    <CardText>{quiz?.desc}</CardText>
                    {(() => {
                      if (quiz?.url) {
                        return (
                          <CardSubtitle tag="a" href={quiz?.url}>
                            {quiz?.url}
                          </CardSubtitle>
                        );
                      }
                    })()}
                    <Button tag={Link} to={`/quiz/${quiz?.id}/questions`} block>
                      Start
                    </Button>
                    {(() => {
                      if (quiz?.score !== null) {
                        return <Progress animated color="success" striped value={quiz?.score} />;
                      }
                    })()}
                  </CardBody>
                </Card>
              ));
            }
          })()}
        </CardDeck>
      </Container>
    </>
  );
}

export default connect((state) => state, {})(Home);
