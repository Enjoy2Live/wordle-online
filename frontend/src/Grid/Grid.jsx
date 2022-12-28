import GridItem from "./GridItem";
import Row from "./Row";

const Grid = (props) => {
  return (
    <div className="grid grid-rows-6 gap-5 p3 justify-center">
      <Row>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </Row>
      <Row>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </Row>
      <Row>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </Row>
      <Row>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </Row>
      <Row>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </Row>
      <Row>
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
        <GridItem />
      </Row>
    </div>
  );
};

export default Grid;
